const express = require('express');
const { createDatabaseMetadata, getDatabaseMetadata, getAllDatabasesByProjectId, addDBField, deleteField, updateDatabaseName, deleteDatabase, editField } = require('../controllers/databaseMetadataController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectWrite, checkProjectRead } = require('../middleware/projectAccessMiddleware');

const router = express.Router();

router.post('/database', authMiddleware, checkProjectWrite, createDatabaseMetadata);
router.get('/database/:id',authMiddleware, checkProjectRead, getDatabaseMetadata);
router.get('/database/project/:projectId',authMiddleware,checkProjectRead, getAllDatabasesByProjectId);
router.post('/database/:id/field',authMiddleware, checkProjectWrite,addDBField);
router.put('/database/:id/field/:fieldId',authMiddleware, checkProjectWrite, editField);
router.delete('/database/:id/field/:fieldId',authMiddleware, checkProjectWrite, deleteField);
router.put('/database/:id',authMiddleware, checkProjectWrite, updateDatabaseName);
router.delete('/database/:id',authMiddleware, checkProjectWrite, deleteDatabase);

module.exports = router;