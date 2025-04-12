const express = require('express')
const { authenticate } = require('../middleware/auth')
const {
    registerUser,
    loginUser,
    getAllUsers
} = require('../controllers/userController')
const router = express.Router()




// Public endpoints
router.post('/register', registerUser)
router.post('/login', loginUser)

// Protected
router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` })
})


router.get('/profile', authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` })
})

// Get all users (protected route)
router.get('/', getAllUsers)

module.exports = router
