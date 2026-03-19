const axios = require('axios');

exports.initializePayment = async (email, amount) => {
    try {
        const params = JSON.stringify({
            "email": email,
            "amount": amount * 100 // Paystack expects Kobo (Naira * 100)
        });
        const response = await axios.post('https://api.paystack.co/transaction/initialize', params, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(`Payment init failed: ${err.message}`);
    }
};

exports.verifyPayment = async (reference) => {
    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` }
        });
        return response.data;
    } catch (err) {
        throw new Error(`Verify failed: ${err.message}`);
    }
};
