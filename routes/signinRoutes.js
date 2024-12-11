const express = require('express');
const signinController = require('../controllers/signinController');

const router = express.Router();

// Route for signing in
router.post('/', signinController.signIn);

module.exports = router;
