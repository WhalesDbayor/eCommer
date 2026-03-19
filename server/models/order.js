const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            name: String,
            quantity: Number,
            price: Number // The price at the moment of purchase
        }
    ],
    totalAmount: { type: Number, required: true },
    address: {
        street: String,
        city: String,
        state: String
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Paid', 'Failed'], 
        default: 'Pending' 
    },
    orderStatus: { 
        type: String, 
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Processing' 
    },
    paymentReference: { type: String, required: true }, // From Paystack
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);