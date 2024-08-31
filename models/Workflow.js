const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
    name: { type: String, required: true },
    steps: { type: [mongoose.Schema.Types.Mixed], required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workflow', workflowSchema);
