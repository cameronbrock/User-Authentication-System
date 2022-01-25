
const express = require('express');
const indexController = require('../controllers/indexController.js');

const router = express.Router();

router.get('/', indexController.landingpage);
router.get('/home', indexController.homepage);

module.exports = router;
