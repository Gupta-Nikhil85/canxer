const express = require('express');
const { createOrganisation, getOrganisation, updateOrganisation } = require('../controllers/organisationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', createOrganisation);
router.get('/:id', authMiddleware, getOrganisation);
router.put('/:id', authMiddleware, updateOrganisation);

module.exports = router;
