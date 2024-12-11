const express = require('express');
const signupController = require('../controllers/signupController');

const router = express.Router();

// Route for signing up
router.post('/', signupController.signUp);

module.exports = router;
