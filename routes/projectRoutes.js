const express = require('express');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProject); // Create a project
router.get('/organisation/:organisationId', authMiddleware, getProjects); // Get all projects for an organisation
router.get('/:id', authMiddleware, getProjectById); // Get a specific project by ID
router.put('/:id', authMiddleware, updateProject); // Update a project
router.delete('/:id', authMiddleware, deleteProject); // Delete a project

module.exports = router;
