const Endpoint = require('../models/Endpoint');  // Assuming Endpoint model is in the models folder

// Create a new endpoint
exports.createEndpoint = async (req, res) => {
    try {
        const newEndpoint = new Endpoint(req.body);  // Create a new Endpoint instance
        const savedEndpoint = await newEndpoint.save();  // Save it to the database
        res.status(201).json(savedEndpoint);  // Return the created endpoint
    } catch (error) {
        res.status(500).json({ message: 'Error creating endpoint', error: error.message });
    }
};

// Get all endpoints by projectId
exports.getEndpointsByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;  // Extract projectId from URL params
        const endpoints = await Endpoint.find({ projectId });  // Find endpoints by projectId

        if (!endpoints.length) {
            return res.status(404).json({ message: 'No endpoints found for this project' });
        }

        res.status(200).json(endpoints);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching endpoints', error: error.message });
    }
};


// Get an endpoint by ID
exports.getEndpointById = async (req, res) => {
    try {
        const endpoint = await Endpoint.findById(req.params.id);  // Find by document ID
        if (!endpoint) return res.status(404).json({ message: 'Endpoint not found' });
        res.status(200).json(endpoint);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching endpoint', error: error.message });
    }
};


// Update an endpoint
exports.updateEndpoint = async (req, res) => {
    try {
        const updatedEndpoint = await Endpoint.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Find by ID and update
        if (!updatedEndpoint) return res.status(404).json({ message: 'Endpoint not found' });
        res.status(200).json(updatedEndpoint);
    } catch (error) {
        res.status(500).json({ message: 'Error updating endpoint', error: error.message });
    }
};

// Delete an endpoint
exports.deleteEndpoint = async (req, res) => {
    try {
        const deletedEndpoint = await Endpoint.findByIdAndDelete(req.params.id);  // Find by ID and delete
        if (!deletedEndpoint) return res.status(404).json({ message: 'Endpoint not found' });
        res.status(200).json({ message: 'Endpoint deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting endpoint', error: error.message });
    }
};
