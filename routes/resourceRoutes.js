const express = require('express');
const {
    createResource,
    getResource,
    updateResource,
    deleteResource
} = require('../controllers/resourceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createResource);
router.get('/:id', authMiddleware, getResource);
router.put('/:id', authMiddleware, updateResource);
router.delete('/:id', authMiddleware, deleteResource);

module.exports = router;
