const Resource = require('../models/Resource');

exports.createResource = async (req, res) => {
    const { name, schema } = req.body;
    try {
        const resource = await Resource.create({ name, schema, user: req.user._id });
        res.status(201).json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Error creating resource' });
    }
};

exports.getResource = async (req, res) => {
    try {
        const resource = await Resource.findById(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching resource' });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json(resource);
    } catch (error) {
        res.status(400).json({ message: 'Error updating resource' });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const resource = await Resource.findByIdAndDelete(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: 'Resource not found' });
        }
        res.status(200).json({ message: 'Resource deleted' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting resource' });
    }
};
