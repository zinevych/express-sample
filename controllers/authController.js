const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { roles } = require('../config/roles');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const defaultRole = roles.AUTHOR;

    try {
        const newUser = await User.register(username, email, hashedPassword, defaultRole);
        const { id, password_hash, created_at, role, ...registeredUser } = newUser;

        res.status(201).json({ user: registeredUser });
    } catch (error) {
        res.status(400).json({ error: 'Registration failed' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        const { id, password_hash, created_at, role, ...loggedInUser } = user;

        res.status(200).json({
            user: loggedInUser,
            token
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Login failed' });
    }
};
