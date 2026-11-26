const express = require('express');

const {
  getItems,
  getRecentItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  createInquiry,
  getMyInquiries,
} = require('../controllers/itemController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getItems);
router.get('/recent', getRecentItems);
router.get('/:id', getItemById);

// Protected routes
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);
router.post('/:itemId/inquiries', protect, createInquiry);
router.get('/my/inquiries', protect, getMyInquiries);

module.exports = router;