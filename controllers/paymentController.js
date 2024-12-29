const Cashfree = require('cashfree-sdk');

exports.initiatePayment = async (req, res) => {
    const { userId, totalAmount } = req.body;
    const cashfree = new Cashfree({
        appId: process.env.CASHFREE_APP_ID,
        secretKey: process.env.CASHFREE_SECRET_KEY,
    });

    try {
        const response = await cashfree.orders.createOrder({
            orderId: `order_${Date.now()}`,
            orderAmount: totalAmount,
            customerEmail: req.body.email,
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
