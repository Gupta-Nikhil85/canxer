const express = require('express');
const validateEndpoint = require('../middleware/validateEndpoint');
const {executeRequest} = require('../controllers/executeRequestController');

const router = express.Router();

router.all('/' , validateEndpoint, executeRequest);

module.exports = router;