const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { swaggerUi, swaggerDocument } = require('./docs/swagger')
const CSS_URL =
  'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css'

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use(
  cors({
    origin: ['https://app-fashion-hub.vercel.app', 'http://localhost:5173'], // Allow frontend to communicate with the backend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)
// Routes
// Swagger UI
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL
  })
)

app.use('/api/user', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

const path = require('path')

// Serve static files (like images)
app.use(
  '/images',
  express.static(path.join(__dirname, 'public/images/products'))
)

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
