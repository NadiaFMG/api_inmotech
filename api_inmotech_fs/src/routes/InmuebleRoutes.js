const express = require('express');
const router = express.Router();
const InmuebleController = require('../controllers/InmuebleController');

// ✅ RUTAS ESPECÍFICAS PRIMERO (muy importante el orden)
router.post('/anidado', InmuebleController.crearInmuebleAnidado);
router.put('/anidado/:id', InmuebleController.actualizarInmuebleAnidado); // ← Esta debe estar aquí
router.delete('/anidado/:id', InmuebleController.eliminarInmuebleAnidado);

// ✅ RUTA DE UPLOAD ESPECÍFICA
router.post('/upload-imagen', InmuebleController.uploadImagen);

// ✅ RUTAS GENÉRICAS AL FINAL (para evitar que /:id capture 'anidado')
router.post('/', InmuebleController.create);
router.get('/', InmuebleController.findAll);
router.get('/:id', InmuebleController.findById);
router.put('/:id', InmuebleController.update1);
router.delete('/:id', InmuebleController.delete1);

module.exports = router;