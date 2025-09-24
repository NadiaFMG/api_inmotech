const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Ruta para login
router.post('/login', authController.login);

// Ruta para registro
router.post('/register', authController.register);

// Endpoint para validar usuario único
router.get('/check-usuario', authController.checkUsuario);

// Endpoint para validar correo único
router.get('/check-correo', authController.checkCorreo);

module.exports = router;
