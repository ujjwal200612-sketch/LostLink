// API Base URL configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Helper to make API requests with Authorization header
 */
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('lostlink_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Request failed with status ${response.status}`);
    }
    return data;
  } catch (error) {
    // If backend isn't responding, log and rethrow or handle gracefully
    console.warn(`[LostLink API] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}

// Fallback items in case backend isn't running during initial frontend preview
const fallbackItems = [
  {
    _id: 'sample_item_1',
    title: 'Samsung Galaxy S24 (Onyx Black, 256GB)',
    description: 'Black Samsung Galaxy S24 in a transparent Spigen case with college ID inserted in the back cover. Left near Table #4 in library.',
    type: 'lost',
    category: 'Electronics',
    location: 'HKBK College Library, Bengaluru',
    dateOccurred: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Rahul Sharma',
    contactEmail: 'rahul.sharma@hkbk.edu.in',
    contactPhone: '+91 98765 43210',
    reward: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_2',
    title: 'HP Pavilion 15 Laptop (Silver)',
    description: 'Silver HP Pavilion laptop in a dark grey Targus backpack. Has a Bengaluru Tech Summit sticker on lid. Misplaced in CS Block.',
    type: 'lost',
    category: 'Electronics',
    location: 'HKBK College, 2nd Floor CS Block, Bengaluru',
    dateOccurred: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Priya Patel',
    contactEmail: 'priya.patel@hkbk.edu.in',
    contactPhone: '+91 98450 12345',
    reward: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_3',
    title: 'Black Leather Bi-fold Wallet',
    description: 'WildHorn black leather wallet found on a park bench near the bandstand. Contains SBI debit card, Namma Metro card, and Driving License.',
    type: 'found',
    category: 'Wallets & Bags',
    location: 'Cubbon Park, Bengaluru',
    dateOccurred: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Vikram Singh',
    contactEmail: 'vikram.singh@example.in',
    contactPhone: '+91 98230 45678',
    reward: 0,
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_4',
    title: 'Honda Activa Smart Key with Red Keychain',
    description: 'Single Honda Activa key with remote smart sensor attached to a red Royal Enfield braided keychain. Dropped near two-wheeler bay.',
    type: 'lost',
    category: 'Keys',
    location: 'College Parking Area, HKBK Campus, Bengaluru',
    dateOccurred: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Rohan Verma',
    contactEmail: 'rohan.v@example.in',
    contactPhone: '+91 97410 88990',
    reward: 500,
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_5',
    title: 'HKBK College Student ID Card',
    description: '3rd Year CSIT Department student identity card with blue university lanyard and library barcode. Turned in at canteen desk.',
    type: 'found',
    category: 'ID & Documents',
    location: 'HKBK College Canteen, Bengaluru',
    dateOccurred: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Campus Helpdesk',
    contactEmail: 'helpdesk@hkbk.edu.in',
    contactPhone: '+91 80 2544 1722',
    reward: 300,
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_6',
    title: 'boAt Rockerz 550 Wireless Headphones',
    description: 'Matte black over-ear bluetooth headphones left on a passenger seating bench near Platform 2 ticketing counter.',
    type: 'found',
    category: 'Electronics',
    location: 'Indiranagar, Bengaluru Metro Station',
    dateOccurred: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Namma Metro Helpdesk',
    contactEmail: 'transit.desk@bmrc.in',
    contactPhone: '+91 80 2519 1234',
    reward: 0,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_7',
    title: 'Friendly Golden Retriever (Leo)',
    description: 'Friendly golden retriever with red nylon collar and brass bell. Found roaming safely near food street shops. In temporary care.',
    type: 'found',
    category: 'Pets',
    location: 'Commercial Street, Bengaluru',
    dateOccurred: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    contactName: 'Bengaluru Animal Rescue',
    contactEmail: 'rescue.blr@example.in',
    contactPhone: '+91 99001 23456',
    reward: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: 'sample_item_8',
    title: 'Ray-Ban Classic Aviator Sunglasses',
    description: 'Gold-framed green polarized classic aviator sunglasses in original brown leather case. Lost on walkway.',
    type: 'lost',
    category: 'Clothing & Accessories',
    location: 'MG Road, Bengaluru',
    dateOccurred: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'claimed',
    contactName: 'Ananya Rao',
    contactEmail: 'ananya.rao@example.in',
    contactPhone: '+91 98860 54321',
    reward: 1000,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const itemService = {
  async getItems(filters = {}) {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.category && filters.category !== 'All') params.append('category', filters.category);
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const queryString = params.toString() ? `?${params.toString()}` : '';
    try {
      return await request(`/items${queryString}`);
    } catch {
      // Return filtered fallback items
      let items = [...fallbackItems];
      if (filters.type) items = items.filter(i => i.type.toLowerCase() === filters.type.toLowerCase());
      if (filters.category && filters.category !== 'All') {
        const catLower = filters.category.toLowerCase();
        items = items.filter(i => {
          const itemCat = (i.category || '').toLowerCase();
          return itemCat === catLower || itemCat.includes(catLower) || catLower.includes(itemCat);
        });
      }
      if (filters.status) items = items.filter(i => i.status.toLowerCase() === filters.status.toLowerCase());
      if (filters.search) {
        const q = filters.search.toLowerCase();
        items = items.filter(i => i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.location.toLowerCase().includes(q));
      }
      return { success: true, count: items.length, items, isFallback: true };
    }
  },

  async getRecentItems() {
    try {
      return await request('/items/recent');
    } catch {
      return { success: true, items: fallbackItems.slice(0, 6), isFallback: true };
    }
  },

  async getItemById(id) {
    try {
      return await request(`/items/${id}`);
    } catch {
      const item = fallbackItems.find(i => i._id === id);
      if (item) return { success: true, item, isFallback: true };
      throw new Error('Item not found');
    }
  },


  async createItem(itemData) {
    return await request('/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    });
  },
  async createInquiry(itemId, message) {
    return await request(`/items/${itemId}/inquiries`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
  async getMyInquiries() {
    return await request('/items/my/inquiries');
  },


  async updateItem(id, itemData) {
    return request(`/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    });
  },

  async deleteItem(id) {
    return request(`/items/${id}`, {
      method: 'DELETE',
    });
  },
};

export const authService = {
  async login(credentials) {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (res.token && res.user) {
      localStorage.setItem('lostlink_token', res.token);
      localStorage.setItem('lostlink_user', JSON.stringify(res.user));
    }

    return res;
  },

  async register(userData) {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (res.token && res.user) {
      localStorage.setItem('lostlink_token', res.token);
      localStorage.setItem('lostlink_user', JSON.stringify(res.user));
    }

    return res;
  },

  getCurrentUser() {
    const user = localStorage.getItem('lostlink_user');
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem('lostlink_token');
    localStorage.removeItem('lostlink_user');
  },

  async getHealth() {
    return request('/health');
  },
};
