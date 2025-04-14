const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken') // Import jwt

// Register User
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists)
            return res.status(400).json({ message: 'User already exists' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password: hashedPassword })

        await user.save()
        res.status(201).json({ message: 'User registered' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }


        const passwordMatch = await user.comparePassword(password)

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        const token = jwt.sign({   userId: user._id,
        username: user.username,
        email: user.email,
        age: user.age }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })

        res.status(200).json({ token })
    } catch (error) {
        console.error('Login Error:', error)
        res.status(500).json({ message: error.message })
    }
}

// Get all users (protected route)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
