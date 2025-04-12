const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

// Routes


app.use('/api/user', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const path = require('path')

// Serve static files (like images)
app.use('/images', express.static(path.join(__dirname, 'public/images')))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
