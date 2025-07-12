const express = require('express');
const router = express.Router();
const { getInmuebleCompleto } = require('../controllers/getInmuebleCompleto');
 const verifyToken = require('../middlewares/verifyToken');


// Ruta para obtener toda la información relacionada de un inmueble
router.get('/completo/:id', verifyToken, getInmuebleCompleto);

module.exports = router;