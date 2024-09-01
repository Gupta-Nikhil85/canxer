const mongoose = require('mongoose');

const OrganisationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    industry: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Organisation', OrganisationSchema);
