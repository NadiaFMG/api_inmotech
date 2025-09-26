const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/google', authController.loginWithGoogle); // <-- agrega esta línea

router.get('/check-usuario', authController.checkUsuario);
router.get('/check-correo', authController.checkCorreo);

module.exports = router;