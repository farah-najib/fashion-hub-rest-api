const User = require('../models/User')
const bcrypt = require('bcryptjs')

// Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (userExists)
            return res.status(400).json({ message: 'User already exists' })

        const user = new User({ username, email, password })
        await user.save()
        res.status(201).json({ message: 'User registered' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: 'User not found' })

        const isMatch = await user.comparePassword(password)
        if (!isMatch)
            return res.status(400).json({ message: 'Invalid credentials' })

        res.status(200).json({ message: 'Login successful' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
