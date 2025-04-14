const Order = require('../models/Order')
var ObjectId = require('mongoose').Types.ObjectId

exports.createOrder = async (req, res) => {
    const { user, products, totalAmount } = req.body

    console.log('order payload:', req.body)

    try {
        const order = new Order({ user, products, totalAmount })
        await order.save()
        res.status(201).json(order)
    } catch (error) {
        console.error('Error creating order:', error)
        res.status(500).json({ message: error.message })
    }
}

exports.getOrderById = async(req, res)=>{
    try{
        const order = await Order.findById(new ObjectId(req.params.id))
        res.status(200).json(order)

    } catch(error){
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
