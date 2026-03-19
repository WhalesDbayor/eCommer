const router = require('express').Router();
const Order = require('../models/order');
const { auth } = require('../middleware/auth');
const { initializePayment, verifyPayment } = require('../controllers/paymentController');

// 1. Start Checkout
router.post('/checkout', auth, async (req, res) => {
    const { items, totalAmount } = req.body;
    try {
        const paymentData = await initializePayment(req.user.email, totalAmount);
        
        const newOrder = new Order({
            userId: req.user.id,
            items,
            totalAmount,
            paymentReference: paymentData.data.reference,
            paymentStatus: 'Pending',
            orderStatus: 'Processing'
        });
        await newOrder.save();
        
        res.status(200).json(paymentData.data); // Send URL to frontend
    } catch (err) { 
      console.error('Checkout error:', err.message);
      res.status(500).json({ message: 'Server error' }); 
    }
});

// 2. Verify Payment (Called after user pays) - rate limited
router.get('/verify/:reference', async (req, res) => {
    try {
        const verification = await verifyPayment(req.params.reference);
        if (verification.data.status === 'success') {
            await Order.findOneAndUpdate(
                { paymentReference: req.params.reference },
                { paymentStatus: 'Paid' }
            );
            res.send("Payment Successful");
        } else {
            res.status(400).send("Payment Failed");
        }
    } catch (err) { 
      console.error('Verify error:', err.message);
      res.status(500).json({ message: 'Server error' }); 
    }
});
