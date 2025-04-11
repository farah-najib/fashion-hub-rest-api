const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Product = require('./models/Product')
const User = require('./models/User')
const Order = require('./models/Order')
const connectDB = require('./config/db')
const data = require('./data.json') // This should be your JSON data

// Connect to MongoDB
connectDB()

// Seed function
async function seed() {
    try {
        // Clear existing data
        await Product.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        // Insert products
        const products = await Product.insertMany(data.products)

        // Insert users with hashed passwords
        const users = await Promise.all(
            data.users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10)
                return User.create({ ...user, password: hashedPassword })
            })
        )

        // Insert orders with mapped product and user IDs
        for (const order of data.orders) {
            const user = users.find((u) => u.email === order.userEmail)
            const orderProducts = order.products.map((op) => {
                const product = products.find((p) => p.name === op.productName)
                return {
                    product: product._id,
                    quantity: op.quantity,
                    price: op.price
                }
            })

            await Order.create({
                user: user._id,
                products: orderProducts,
                totalAmount: order.totalAmount,
                orderStatus: order.orderStatus
            })
        }

        console.log('✅ Seed data inserted successfully')
        mongoose.connection.close()
    } catch (err) {
        console.error('❌ Error inserting seed data:', err)
        mongoose.connection.close()
    }
}

// Run the seed function
seed()
