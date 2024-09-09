const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkflowSchema = new Schema({
    workflowName: {
        type: String,
        required: true
    },
    endpointId: {
        type: Schema.Types.ObjectId,
        ref: 'Endpoint',  // Linking to the Endpoint schema
        required: true
    },
    steps: [{
        type: Schema.Types.ObjectId,
        ref: 'Step'  // Referencing the Step schema
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

// Middleware to update 'updatedAt' on document update
WorkflowSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Workflow = mongoose.model('Workflow', WorkflowSchema);

module.exports = Workflow;
