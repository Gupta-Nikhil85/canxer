const mongoose = require('mongoose');
const { Schema } = mongoose;

const EndpointSchema = new Schema({
  projectId: {
    type: Schema.Types.ObjectId,  // Linking to the Projects collection
    ref: 'Project',
    required: true
  },
  endpointUrl: {
    type: String,
    required: true,
    unique: true,  // Ensures the URL is unique
  },
  workflowId: {
    type: Schema.Types.ObjectId,  // Linking to the Workflow collection
    ref: 'Workflow',
    required: true
  },
  requestMethod: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // Restricting to common HTTP methods
    required: true
  },
  headers: {
    type: Map,  // Stores key-value pairs for headers
    of: String
  },
  queryParams: {
    type: Map,  // Stores query parameters as key-value pairs
    of: String
  },
  version: {
    type: String,  // Version number for the endpoint
    required: true,
    default: '1.0'
  },
  body: {
    type: Object  // Used to define the body content for POST/PUT requests
  },
  responseSchema: {
    type: Object  // Expected response format for the endpoint
  },
  description: {
    type: String,  // Additional details about the endpoint
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically sets the creation date
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,  // Field to activate/deactivate the endpoint
    default: true
  }
});

// Middleware to update 'updatedAt' on document update
EndpointSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Endpoint = mongoose.model('Endpoint', EndpointSchema);

module.exports = Endpoint;
