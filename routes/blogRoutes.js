
const express = require('express');
const blogController = require('../controllers/blogController');

const router = express.Router();

// Profile

router.get('/view/:userHandle', blogController.viewblog);
router.get('/:userHandle', (req, res) => res.redirect('/blog/view/' + req.params.userHandle));

module.exports = router;
