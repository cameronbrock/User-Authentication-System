
const express = require('express');
const signupController = require('../controllers/signupController.js');

const router = express.Router();

router.get('/', signupController.index);

router.post('/create_account', signupController.createAccount);

module.exports = router;
