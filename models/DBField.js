const mongoose = require('mongoose');
const { Schema } = mongoose;

const DBFieldSchema = new Schema({
    name: {
        type: String,  // Specifies the name of the field
        required: true
    },
    type: {
        type: String,  // Specifies the type of the field
        required: true
    },
    required: {
        type: Boolean,  // Indicates if the field is mandatory
        default: false
    },
    default: {
        type: Schema.Types.Mixed  // Default value for the field, can be any type
    },
    unique: {
        type: Boolean,  // Ensures the field value is unique
        default: false
    },
    index: {
        type: Boolean,  // Creates an index for the field
        default: false
    },
    sparse: {
        type: Boolean,  // Sparse index, ignoring documents without this field
        default: false
    },
    select: {
        type: Boolean,  // Specifies whether to include this field in queries
        default: true
    },
    validate: {
        type: Schema.Types.Mixed,  // Custom validation logic
        default: null
    },
    enum: {
        type: [String],  // Array of allowed values
        default: undefined
    },
    min: {
        type: Number,  // Minimum value or length
        default: null
    },
    max: {
        type: Number,  // Maximum value or length
        default: null
    },
    match: {
        type: String,  // Regular expression pattern as a string
        default: null
    },
    immutable: {
        type: Boolean,  // Prevents the field from being changed
        default: false
    },
    trim: {
        type: Boolean,  // Trims whitespace from string fields
        default: false
    },
    lowercase: {
        type: Boolean,  // Converts string field to lowercase
        default: false
    },
    uppercase: {
        type: Boolean,  // Converts string field to uppercase
        default: false
    },
    set: {
        type: String,  // Function as a string to modify value before setting
        default: null
    },
    get: {
        type: String,  // Function as a string to modify value before getting
        default: null
    },
    alias: {
        type: String,  // Alias name for the field
        default: null
    },
    ref: {
        type: String,  // Model name this field refers to
        default: null
    },
    autopopulate: {
        type: Boolean,  // Automatically populates references
        default: false
    },
    transform: {
        type: String,  // Function as a string to transform the field
        default: null
    }
}, {
    timestamps: true,  // Adds createdAt and updatedAt timestamps
});

const DBField = mongoose.model('DBField', DBFieldSchema);

module.exports = DBField;
