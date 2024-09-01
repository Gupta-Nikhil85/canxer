const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    organisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Organisation' },
    userAccess: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            accessLevel: { type: String, enum: ['admin', 'write', 'read', 'none'], default: 'none' },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Project', ProjectSchema);
