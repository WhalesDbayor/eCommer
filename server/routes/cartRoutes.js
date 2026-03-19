const router = require('express').Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const { auth } = require('../middleware/auth');
const { addToCart } = require('../controllers/cartController');

// Add item to cart
router.post('/add', auth, addToCart);

// Get cart
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    res.json(cart || { items: [], bill: 0 });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
