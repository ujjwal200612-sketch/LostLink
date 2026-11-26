const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an item title'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please describe the item and where it was lost or found'],
      trim: true,
    },
    type: {
      type: String,
      enum: {
        values: ['lost', 'found'],
        message: 'Type must be either lost or found',
      },
      required: [true, 'Please specify if the item is lost or found'],
    },
    category: {
      type: String,
      required: [true, 'Please choose a category'],
      enum: [
        'Electronics',
        'Wallets & Bags',
        'Keys',
        'ID & Documents',
        'Clothing & Accessories',
        'Jewelry',
        'Pets',
        'Other',
      ],
      default: 'Other',
    },
    location: {
      type: String,
      required: [true, 'Please specify the location or vicinity'],
      trim: true,
    },
    dateOccurred: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['open', 'claimed', 'resolved'],
      default: 'open',
    },
    contactName: {
      type: String,
      default: '',
    },
    contactEmail: {
      type: String,
      default: '',
    },
    contactPhone: {
      type: String,
      default: '',
    },
    reward: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrl: {
      type: String,
      default: '',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexing for search queries
itemSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Item', itemSchema);
