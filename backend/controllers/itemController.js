const supabase = require('../config/supabase');

// Upload item photos to Supabase Storage. The bucket is created on first use.
const uploadItemPhoto = async ({ imageData, imageContentType, userId }) => {
  if (!imageData) return '';
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(imageContentType)) {
    throw new Error('Photo must be JPG, PNG, or WEBP.');
  }

  const base64 = imageData.includes(',') ? imageData.split(',').pop() : imageData;
  const buffer = Buffer.from(base64, 'base64');
  if (!buffer.length || buffer.length > 5 * 1024 * 1024) {
    throw new Error('Photo must be smaller than 5 MB.');
  }

  const bucket = 'item-images';
  const { error: bucketError } = await supabase.storage.createBucket(bucket, {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: allowedTypes,
  });
  if (bucketError && !/already exists|duplicate/i.test(bucketError.message || '')) {
    // A concurrent first upload may have created the bucket; verify before failing.
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    if (listError || !buckets?.some((entry) => entry.name === bucket)) throw bucketError;
  }

  const extension = imageContentType.split('/')[1] === 'jpeg' ? 'jpg' : imageContentType.split('/')[1];
  const filePath = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, buffer, {
    contentType: imageContentType,
    upsert: false,
  });
  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

// Convert Supabase database columns into frontend-friendly fields
const formatItem = (item) => ({
  _id: item.id,
  title: item.title,
  description: item.description,
  type: item.type,
  category: item.category,
  location: item.location,
  imageUrl: item.image_url || '',
  status: item.status || 'open',
  dateOccurred: item.date_occurred,
  contactName: item.contact_name || '',
  contactEmail: item.contact_email || '',
  contactPhone: item.contact_phone || '',
  reward: Number(item.reward) || 0,
  user: item.user_id,
  createdAt: item.created_at,
});

// GET all items
const getItems = async (req, res, next) => {
  try {
    const { type, category, status, search } = req.query;

    let query = supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (type) query = query.eq('type', type.toLowerCase());

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    if (status) query = query.eq('status', status.toLowerCase());

    const { data, error } = await query;

    if (error) throw error;

    let items = (data || []).map(formatItem);

    if (search) {
      const normalize = value =>
        String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');

      const searchTerm = normalize(search);

      items = items.filter(item =>
        normalize(item.title).includes(searchTerm) ||
        normalize(item.description).includes(searchTerm) ||
        normalize(item.location).includes(searchTerm)
      );
    }

    res.json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    next(error);
  }
};

// GET recent items
const getRecentItems = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;

    res.json({
      success: true,
      items: (data || []).map(formatItem),
    });
  } catch (error) {
    next(error);
  }
};

// GET reports submitted by the logged-in user
const getMyReports = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      count: data.length,
      items: data.map(formatItem),
    });
  } catch (error) {
    next(error);
  }
};

// GET one item
const getItemById = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', req.params.id)
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Item not found',
      });
    }

    res.json({
      success: true,
      item: formatItem(data),
    });
  } catch (error) {
    next(error);
  }
};

// CREATE item
const createItem = async (req, res, next) => {
  try {
    const {
      title,
      description,
      type,
      category,
      location,
      dateOccurred,
      contactName,
      contactEmail,
      contactPhone,
      reward,
      imageUrl,
      imageData,
      imageContentType,
    } = req.body;

    if (!title || !description || !type || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, description, type and location',
      });
    }

    if (!['lost', 'found'].includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: 'Type must be lost or found',
      });
    }

    const uploadedImageUrl = imageData
      ? await uploadItemPhoto({ imageData, imageContentType, userId: req.user.id })
      : (imageUrl || '');

    const { data, error } = await supabase
      .from('items')
      .insert({
        user_id: req.user.id,
        title,
        description,
        type: type.toLowerCase(),
        category: category || 'Other',
        location,
        date_occurred: dateOccurred || new Date().toISOString(),
        status: 'open',
        contact_name: contactName || '',
        contact_email: contactEmail || '',
        contact_phone: contactPhone || '',
        reward: Number(reward) || 0,
        image_url: uploadedImageUrl,
      })
      .select('*')
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Item reported successfully',
      item: formatItem(data),
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE item
const updateItem = async (req, res, next) => {
  try {
    const allowedFields = {
      title: 'title',
      description: 'description',
      type: 'type',
      category: 'category',
      location: 'location',
      dateOccurred: 'date_occurred',
      status: 'status',
      contactName: 'contact_name',
      contactEmail: 'contact_email',
      contactPhone: 'contact_phone',
      reward: 'reward',
      imageUrl: 'image_url',
    };

    const updates = {};

    for (const [frontendField, databaseField] of Object.entries(allowedFields)) {
      if (req.body[frontendField] !== undefined) {
        updates[databaseField] = req.body[frontendField];
      }
    }

    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select('*')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Item not found or you do not have permission to update it',
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      item: formatItem(data),
    });
  } catch (error) {
    next(error);
  }
};

// DELETE item
const deleteItem = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('items')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .select('id')
      .maybeSingle();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Item not found or you do not have permission to delete it',
      });
    }

    res.json({
      success: true,
      message: 'Item removed successfully',
    });
  } catch (error) {
    next(error);
  }
};
// CREATE inquiry
const createInquiry = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { itemId } = req.params;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please enter an inquiry message',
      });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        item_id: itemId,
        sender_id: req.user.id,
        message: message.trim(),
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Inquiry sent successfully',
      inquiry: data,
    });
  } catch (error) {
    next(error);
  }
};
// GET inquiries received on the logged-in user's items
const getMyInquiries = async (req, res, next) => {
  try {
    const { data: userItems, error: itemsError } = await supabase
      .from('items')
      .select('id, title')
      .eq('user_id', req.user.id);

    if (itemsError) throw itemsError;

    if (!userItems || userItems.length === 0) {
      return res.json({ success: true, inquiries: [] });
    }

    const itemIds = userItems.map(item => item.id);

    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .in('item_id', itemIds)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const inquiries = data.map(inquiry => ({
      ...inquiry,
      itemTitle: userItems.find(item => item.id === inquiry.item_id)?.title || 'Unknown Item',
    }));

    res.json({ success: true, inquiries });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getItems,
  getRecentItems,
  getMyReports,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createInquiry,
  getMyInquiries,
};