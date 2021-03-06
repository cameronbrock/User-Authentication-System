
const express = require('express');
const loginController = require('../controllers/loginController.js');

const router = express.Router();

router.post('/', loginController.authenticateUser);

module.exports = router;
