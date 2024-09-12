const express = require('express');
const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    getUserProjects,
    addUserAccess,
} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const checkOrgAdminMiddleware = require('../middleware/checkOrgAdminMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProject); // Create a project
router.get('/organisation', checkOrgAdminMiddleware, getProjects); // Get all projects for an organisation
router.get('/user', authMiddleware, getUserProjects); // Get all projects where a user has access
router.get('/:id', authMiddleware, getProjectById); // Get a specific project by ID
router.put('/:id', authMiddleware, updateProject); // Update a project
router.post('/:id', authMiddleware, addUserAccess); // Add a user to a project
router.delete('/:id', authMiddleware, deleteProject); // Delete a project

module.exports = router;
