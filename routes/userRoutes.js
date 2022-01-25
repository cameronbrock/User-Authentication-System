
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Profile

router.get('/:userHandle', userController.viewprofile);

module.exports = router;
