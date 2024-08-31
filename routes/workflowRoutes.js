const express = require('express');
const {
    createWorkflow,
    getWorkflow,
    executeWorkflow
} = require('../controllers/workflowController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createWorkflow);
router.get('/:id', authMiddleware, getWorkflow);
router.post('/:id/execute', authMiddleware, executeWorkflow);

module.exports = router;
