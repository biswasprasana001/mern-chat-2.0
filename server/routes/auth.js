const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path as necessary

// Secret key for JWT signing and encryption
// Store this key in an environment variable in a real-world application
const secretKey = 'Your_Secret_Key';

// User registration endpoint
router.post('/register', async (req, res) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user instance and save it to the database
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        });

        const savedUser = await newUser.save();

        // Respond with the newly created user (excluding the password)
        res.status(201).json({ user: { id: savedUser._id, email: savedUser.email, username: savedUser.username } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    try {
        // Check for user
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        // Validate password
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Generate a token
            const token = jwt.sign({ _id: user._id }, secretKey);

            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;