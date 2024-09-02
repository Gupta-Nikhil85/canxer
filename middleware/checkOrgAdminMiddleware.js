const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkOrgAdminMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        if(req.user.role !=="admin" || req.user.organisation.toString() !== req.params.id) {
            return res.status(403).json({ error: 'Not authorized' });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = checkOrgAdminMiddleware;
