const express = require('express');
const router = express.Router();
const {createStep,getStepById, updateStep, deleteStep, getStepsByWorkflowId} = require('../controllers/stepController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectWrite, checkProjectRead } = require('../middleware/projectAccessMiddleware');

// Create a new step
router.post('/', authMiddleware, checkProjectWrite, createStep);

// Get step by ID
router.get('/:id', authMiddleware, checkProjectRead, getStepById);

// Update a step
router.put('/:id', authMiddleware, checkProjectWrite, updateStep);

// Delete a step
router.delete('/:id', authMiddleware, checkProjectWrite, deleteStep);

// Get steps by workflowId
router.get('/workflow/:workflowId', authMiddleware, checkProjectRead, getStepsByWorkflowId);

module.exports = router;
