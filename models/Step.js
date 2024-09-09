const mongoose = require('mongoose');
const { Schema } = mongoose;

const StepSchema = new Schema({
    stepName: {
        type: String,
        required: true
    },
    stepType: {
        type: String,  // Example types: 'API_CALL', 'DATA_TRANSFORM', 'CONDITIONAL', etc.
        required: true
    },
    parameters: {
        type: Map,  // Key-value pairs for the step configuration
        of: String,
        default: {}
    },
    body : {
        type: Object
    },
    isActive: {
        type: Boolean,
        default: true
    },
    workflowId: {
        type: Schema.Types.ObjectId,
        ref: 'Workflow',  // Reference to the Workflow schema
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update 'updatedAt' on document update
StepSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Step = mongoose.model('Step', StepSchema);

module.exports = Step;
