const express = require('express');
const router = express.Router();
const {createWorkflow, getWorkflowById, updateWorkflow, deleteWorkflow, getWorkflowsByEndpointId} = require('../controllers/workflowController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectWrite, checkProjectRead } = require('../middleware/projectAccessMiddleware');

// Create a new workflow
router.post('/',  authMiddleware, checkProjectWrite, createWorkflow);

// Get workflow by ID
router.get('/:id', authMiddleware, checkProjectRead, getWorkflowById);

// Update a workflow
router.put('/:id', authMiddleware, checkProjectWrite, updateWorkflow);

// Delete a workflow
router.delete('/:id', authMiddleware, checkProjectWrite, deleteWorkflow);

// Get workflows by endpointId
router.get('/endpoint/:endpointId', authMiddleware, checkProjectRead, getWorkflowsByEndpointId);

module.exports = router;
