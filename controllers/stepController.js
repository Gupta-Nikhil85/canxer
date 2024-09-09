const Step = require('../models/Step');

// Create a new step linked to a workflow
exports.createStep = async (req, res) => {
    try {
        const { stepName, stepType, parameters, workflowId } = req.body;

        const newStep = new Step({
            stepName,
            stepType,
            parameters,
            workflowId  // Link the step to the workflow
        });

        const savedStep = await newStep.save();
        res.status(201).json(savedStep);
    } catch (error) {
        res.status(500).json({ message: 'Error creating step', error: error.message });
    }
};

// Get a step by ID
exports.getStepById = async (req, res) => {
    try {
        const step = await Step.findById(req.params.id).populate('workflowId');
        if (!step) {
            return res.status(404).json({ message: 'Step not found' });
        }
        res.status(200).json(step);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching step', error: error.message });
    }
};


// Update a step
exports.updateStep = async (req, res) => {
    try {
        const { stepName, stepType, parameters, isActive, workflowId } = req.body;

        const updatedStep = await Step.findByIdAndUpdate(
            req.params.id,
            {
                stepName,
                stepType,
                parameters,
                isActive,
                workflowId
            },
            { new: true }
        );

        if (!updatedStep) {
            return res.status(404).json({ message: 'Step not found' });
        }
        res.status(200).json(updatedStep);
    } catch (error) {
        res.status(500).json({ message: 'Error updating step', error: error.message });
    }
};

// Delete a step
exports.deleteStep = async (req, res) => {
    try {
        const deletedStep = await Step.findByIdAndDelete(req.params.id);
        if (!deletedStep) {
            return res.status(404).json({ message: 'Step not found' });
        }
        res.status(200).json({ message: 'Step deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting step', error: error.message });
    }
};

// Get steps by workflowId
exports.getStepsByWorkflowId = async (req, res) => {
    try {
        const { workflowId } = req.params;
        const steps = await Step.find({ workflowId });

        if (!steps.length) {
            return res.status(404).json({ message: 'No steps found for this workflow' });
        }

        res.status(200).json(steps);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching steps', error: error.message });
    }
};
