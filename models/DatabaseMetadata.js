const mongoose = require('mongoose');
const { Schema } = mongoose;

const databaseMetadataSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    version: {
        type: Number,
        required: true,
        default: 1  // Initial version number
    },
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Project'  // Reference to the Project model
    },
    organisationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Organisation'  // Reference to the Organisation model
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Reference to the User model for the creator
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'  // Reference to the User model for the last updater
    },
    attributes: [{
        type: Schema.Types.ObjectId,
        ref: 'Attribute'  // Reference to the Attribute model
    }]
}, {
    timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

const DatabaseMetadata = mongoose.model('DatabaseMetadata', databaseMetadataSchema);

module.exports = DatabaseMetadata;
