const User = require('../models/User')
const bcrypt = require('bcryptjs')


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


// registerUser function with password hashing
// exports.registerUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     try {
//         // Check if user already exists
//         const userExists = await User.findOne({ email });
//         if (userExists)
//             return res.status(400).json({ message: 'User already exists' });

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user with the hashed password
//         const user = new User({ username, email, password: hashedPassword });

//         // Save the user
//         await user.save();
//         res.status(201).json({ message: 'User registered' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


exports.loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            console.log('User not found')
            return res.status(404).json({ message: 'User not found' })
        }

        // Log found user data
        console.log('Found User:', user)

        // Compare password
        const passwordMatch = await user.comparePassword(password)
        console.log('Password Match:', passwordMatch)

        if (!passwordMatch) {
            console.log('Password mismatch')
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Generate JWT token if password matches
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1h'
        })
        console.log('Generated Token:', token)
        res.status(200).json({ token })
    } catch (error) {
        console.error('Login Error:', error)
        res.status(500).json({ message: error.message })
    }
}




exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password') // exclude password
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
