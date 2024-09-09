const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendResetEmail, sendWelcomeEmail } = require('../utils/email');
const { generateResetToken, hashResetToken } = require('../utils/generatePassword');

// Admin Only
exports.register = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const organisation = req.params.orgId;
        const existingUser = await User.findOne({ email, organisation });
        if(existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const resetToken = generateResetToken();
        const hashedToken = hashResetToken(resetToken);
        const user = new User({ name, email, password, role, organisation});
        user.resetPasswordToken = hashedToken; 
        user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; //  60 minutes
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;
        await sendWelcomeEmail(user.email, resetUrl);

        res.status(201).json({ success: true, data: "User created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const organisation = req.params.orgId;
        const { email, password } = req.body;
        const user = await User.findOne({ email, organisation });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ success: true, data: token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const organisation = req.params.orgId;
        const user = await User.findOne({ email, organisation });

        if (!user) {
            return res.status(404).json({ error: 'No user found.' });
        }

        const resetToken = generateResetToken();
        user.resetPasswordToken = hashResetToken(resetToken);
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

        await sendResetEmail(user.email, resetUrl);

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = hashResetToken(req.params.token);
        const {email} = req.body;
        const user = await User.findOne({
            email,
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ success: true, data: token});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all Org Users (Only Admin)
exports.getUsers = async (req, res) => {
    try {
        const {limit, page} = req.query;
        const organisation = req.params.orgId;
        const users = await User.find({organisation}).limit(limit * 1).skip((page - 1) * limit);
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User by ID (Only Admin)
exports.getUser = async (req, res) => {
    try {
        const organisation = req.params.orgId;
        const user = await User.findOne({ _id: req.params.userId, organisation });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User by ID (Only Admin)
exports.updateUser = async (req, res) => {
    try {
        const organisation = req.params.orgId;
        const user = await User.findOneAndUpdate({ _id: req.params.userId, organisation }, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete User by ID (Only Admin)
exports.deleteUser = async (req, res) => {
    try {
        const organisation = req.params.orgId;
        await User.findOne({ _id: req.params.userId, organisation });
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Current Logged in User
exports.getCurrentUser = async (req, res) => {
    try {
        const organisation = req.params.orgId;
        const user = await User.findOne({ _id: req.user.id, organisation }).select('-password');
        res.status(200).json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};