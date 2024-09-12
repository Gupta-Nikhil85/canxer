const express = require('express');
const { createDatabaseMetadata, getDatabaseMetadata, getAllDatabasesByProjectId, addDBField, deleteField, updateDatabaseName, deleteDatabase, editField } = require('../controllers/databaseMetadataController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkProjectWrite, checkProjectRead } = require('../middleware/projectAccessMiddleware');

const router = express.Router();

router.post('/', authMiddleware, checkProjectWrite, createDatabaseMetadata);
router.get('/project',authMiddleware,checkProjectRead, getAllDatabasesByProjectId);
router.get('/:id',authMiddleware, checkProjectRead, getDatabaseMetadata);
router.post('/:id/field',authMiddleware, checkProjectWrite,addDBField);
router.put('/:id/field/:fieldId',authMiddleware, checkProjectWrite, editField);
router.delete('/:id/field/:fieldId',authMiddleware, checkProjectWrite, deleteField);
router.put('/:id',authMiddleware, checkProjectWrite, updateDatabaseName);
router.delete('/:id',authMiddleware, checkProjectWrite, deleteDatabase);

module.exports = router;