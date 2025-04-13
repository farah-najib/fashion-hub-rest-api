const express = require('express')
const {
    createOrder,
    getOrders,
    getOrderById
} = require('../controllers/orderController')
const router = express.Router()


router.get('/all', getOrders)
router.get('/:id', getOrderById)


router.post('/', createOrder)
module.exports = router
