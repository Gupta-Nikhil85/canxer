const Workflow = require('../models/Workflow');

// Create a new workflow
exports.createWorkflow = async (req, res) => {
    try {
        const { workflowName, endpointId, stepIds } = req.body;
        const newWorkflow = new Workflow({
            workflowName,
            endpointId
        });

        const savedWorkflow = await newWorkflow.save();
        res.status(201).json(savedWorkflow);
    } catch (error) {
        res.status(500).json({ message: 'Error creating workflow', error: error.message });
    }
};

// Get a workflow by ID
exports.getWorkflowById = async (req, res) => {
    try {
        const workflow = await Workflow.findById(req.params.id).populate('steps');
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workflow', error: error.message });
    }
};

// Update a workflow
exports.updateWorkflow = async (req, res) => {
    try {
        const updatedWorkflow = await Workflow.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('steps');

        if (!updatedWorkflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json(updatedWorkflow);
    } catch (error) {
        res.status(500).json({ message: 'Error updating workflow', error: error.message });
    }
};

// Delete a workflow
exports.deleteWorkflow = async (req, res) => {
    try {
        const deletedWorkflow = await Workflow.findByIdAndDelete(req.params.id);
        if (!deletedWorkflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json({ message: 'Workflow deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting workflow', error: error.message });
    }
};

// Get workflows by endpointId
exports.getWorkflowsByEndpointId = async (req, res) => {
    try {
        const { endpointId } = req.params;
        const workflows = await Workflow.find({ endpointId }).populate('steps');
        if (!workflows.length) {
            return res.status(404).json({ message: 'No workflows found for this endpoint' });
        }
        res.status(200).json(workflows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching workflows', error: error.message });
    }
};
