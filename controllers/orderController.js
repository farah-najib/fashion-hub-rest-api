const Order = require('../models/Order')

// Create an order
exports.createOrder = async (req, res) => {
    const { user, products, totalAmount } = req.body
    try {
        const order = new Order({ user, products, totalAmount })
        await order.save()
        res.status(201).json(order)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
