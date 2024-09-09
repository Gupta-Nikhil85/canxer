const express = require('express');
const {createEndpoint, getEndpointsByProjectId, getEndpointById, updateEndpoint, deleteEndpoint} = require('../controllers/endpointController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectWrite, checkProjectRead } = require('../middleware/projectAccessMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkProjectWrite, createEndpoint);
router.get('/project/:projectId', authMiddleware, checkProjectRead, getEndpointsByProjectId);
router.get('/:id', authMiddleware, checkProjectRead, getEndpointById);
router.put('/:id', authMiddleware, checkProjectWrite, updateEndpoint);
router.delete('/:id', authMiddleware, checkProjectWrite, deleteEndpoint);

module.exports = router;
