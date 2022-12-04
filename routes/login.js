const express = require("express");
const { loginView, registerView, registerUser, loginUser } = require('../controllers/loginController');
const { dashboardView } = require('../controllers/dashboardController');
const { protectRoute } = require('../auth/protect');

const router = express.Router();

// Redirect to register and login pages
router.get('/register', registerView);
router.get('/login', loginView);

// Redirect to dashboard page
router.get('/dashboard', protectRoute, dashboardView)

// Handle Request
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;