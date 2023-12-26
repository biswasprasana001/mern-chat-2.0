const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/signup to register a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists' });
            const newUser = new User({
                username,
                email,
                password
            });
            newUser.save()
                .then(user => {
                    res.status(201).json({
                        message: "User created successfully!",
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email
                        }
                    });
                })
                .catch(err => res.status(500).json({ error: err.message }));
        });
});

router.post('/login', async (req, res) => {
    try {
        // Retrieve user data from request
        const { email, password } = req.body;

        // Check for existing user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Continue to token creation...
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 3600 });
    res.json({
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
});

module.exports = router;