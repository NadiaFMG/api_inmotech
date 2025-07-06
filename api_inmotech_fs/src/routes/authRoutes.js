const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para login
router.post('/login', authController.login);

// Ruta para registro
router.post('/register', authController.register);

module.exports = router;
