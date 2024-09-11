const crypto = require('crypto');

exports.generateRandomPassword = () => {
    return Math.random().toString(36).slice(-8);
};

exports.generateResetToken  = () => {
    return crypto.randomBytes(20).toString('hex');
}

exports.hashResetToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
}