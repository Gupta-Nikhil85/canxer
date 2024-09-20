const mongoose = require('mongoose');
const { Schema } = mongoose;
const {StepTypes} = require('../utils/enums');  // Import the StepTypes enum

const StepSchema = new Schema({
    stepName: {
        type: String,
        required: true
    },
    stepType: {
        type: String,
        enum: Object.values(StepTypes),  // Use the enum here for allowed step types
        required: true
    },
    dependsOn: {
        type: String,
        default: null  // Step ID that this step depends on
    },
    config: {
        type: mongoose.Schema.Types.Mixed,  // Configuration for the step (API params, condition, etc.)
        required: true
    },
    onSuccess: {
        continue: {
            type: Boolean,
            default: true
        },
        nextStepId: {
            type: String,
            default: null  // The step to continue if this step is successful
        }
    },
    onFailure: {
        retry: {
            type: Boolean,
            default: false
        },
        fallbackStepId: {
            type: String,
            default: null  // Fallback step if this step fails
        }
    },
    isActive: {
        type: Boolean,
        default : true
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
