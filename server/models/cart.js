const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            productId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product', 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                min: [1, 'Quantity cannot be less than 1.'],
                default: 1 
            },
            price: { type: Number, required: true } // Price at the time of adding to cart
        }
    ],
    bill: { 
        type: Number, 
        required: true, 
        default: 0 
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);