const router = require('express').Router();
const Product = require('../models/product');
const { auth, admin } = require('../middleware/auth');

// Add New Product
router.post('/products', auth, admin, async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;
        if (!name || !category || price <= 0 || stock < 0) {
            return res.status(400).json({ message: 'Invalid product data' });
        }
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ message: "Product Added" });
    } catch (err) {
        console.error('Admin add product error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Stock
router.put('/products/:id', auth, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.json({ message: "Product Updated" });
    } catch (err) {
        console.error('Admin update product error:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});
