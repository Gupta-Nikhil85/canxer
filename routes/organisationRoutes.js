const express = require('express');
const { createOrganisation, getOrganisationById, updateOrganisation, deleteOrganisation } = require('../controllers/organisationController');
const authMiddleware = require('../middleware/authMiddleware');
const checkOrgAdminMiddleware = require('../middleware/checkOrgAdminMiddleware');
const router = express.Router();

router.post('/', createOrganisation);
router.get('/:id', authMiddleware, getOrganisationById);
router.put('/:id', checkOrgAdminMiddleware, updateOrganisation);
router.delete('/:id', checkOrgAdminMiddleware, deleteOrganisation);
module.exports = router;
