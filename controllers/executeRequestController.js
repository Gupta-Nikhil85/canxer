const Workflow = require("../models/Workflow");
const {executeWorkflow} = require('../utils/workflowExecutor');

const executeRequest = async (req, res) => {
    try {
        // Since validateEndpoint attaches the found endpoint to the request object, you can access it here
        const endpoint = req.endpoint;

        // Getting the workflow for the endpoint
        const workflow = await Workflow.findOne({ endpointId: endpoint._id, isActive: true }).populate('steps');
        
        console.log('Workflow:', workflow);

        if (!workflow) {
            return res.status(404).json({ message: 'Active workflow not found' });
        }

        // Execute the workflow
        const result = await executeWorkflow(workflow, req);

        // Return result to the client
        console.log(result);

        return res.status(200).json(result);
        
    } catch (error) {
        console.error('Error executing workflow:', error);
        res.status(500).send('An error occurred during execution');
    }
}

module.exports = {executeRequest};