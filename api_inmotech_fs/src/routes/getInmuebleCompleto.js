const express = require('express');
const router = express.Router();
const { getInmuebleCompleto } = require('../controllers/getInmuebleCompleto');

// Ruta para obtener toda la información relacionada de un inmueble
router.get('/completo/:id', getInmuebleCompleto);

module.exports = router;