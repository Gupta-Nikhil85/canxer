const Workflow = require('../models/Workflow');
const executeWorkflow = require('../utils/workflowExecutor');

exports.createWorkflow = async (req, res) => {
    const { resource, name, steps } = req.body;

    try {
        const workflow = await Workflow.create({ resource, name, steps });
        res.status(201).json(workflow);
    } catch (error) {
        res.status(400).json({ message: 'Error creating workflow' });
    }
};

exports.getWorkflow = async (req, res) => {
    try {
        const workflow = await Workflow.findById(req.params.id);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        res.status(200).json(workflow);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching workflow' });
    }
};

exports.executeWorkflow = async (req, res) => {
    try {
        const workflow = await Workflow.findById(req.params.id);
        if (!workflow) {
            return res.status(404).json({ message: 'Workflow not found' });
        }
        const result = await executeWorkflow(workflow, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: 'Error executing workflow' });
    }
};
