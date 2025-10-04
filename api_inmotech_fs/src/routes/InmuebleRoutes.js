// const express = require('express');
// const router = express.Router();
// const InmuebleController = require('../controllers/InmuebleController');

// // ✅ RUTAS ESPECÍFICAS PRIMERO (muy importante el orden)
// router.post('/anidado', InmuebleController.crearInmuebleAnidado);
// router.put('/anidado/:id', InmuebleController.actualizarInmuebleAnidado); // ← Esta debe estar aquí
// router.delete('/anidado/:id', InmuebleController.eliminarInmuebleAnidado);

// // ✅ RUTA DE UPLOAD ESPECÍFICA
// router.post('/upload-imagen', InmuebleController.uploadImagen);

// // ✅ RUTAS GENÉRICAS AL FINAL (para evitar que /:id capture 'anidado')
// router.post('/', InmuebleController.create);
// router.get('/', InmuebleController.findAll);
// router.get('/:id', InmuebleController.findById);
// router.put('/:id', InmuebleController.update1);
// router.delete('/:id', InmuebleController.delete1);

// module.exports = router;

const express = require('express');
const router = express.Router();
const InmuebleController = require('../controllers/InmuebleController');

// ✅ RUTAS ESPECÍFICAS PRIMERO
router.post('/anidado', InmuebleController.crearInmuebleAnidado);
router.put('/anidado/:id', InmuebleController.actualizarInmuebleAnidado);
router.delete('/anidado/:id', InmuebleController.eliminarInmuebleAnidado);

// ✅ NUEVAS RUTAS PARA FAVORITOS
router.get('/favoritos', InmuebleController.getFavoritos); // Obtener todos los favoritos
router.get('/:id/favorito', InmuebleController.getFavorito); // Obtener estado favorito de un inmueble
router.patch('/:id/favorito/toggle', InmuebleController.toggleFavorito); // Toggle favorito (cambiar estado)
router.put('/:id/favorito', InmuebleController.setFavorito); // Establecer favorito con valor específico

// ✅ NUEVA RUTA PARA INMUEBLES POR USUARIO
router.get('/usuario/:userId', InmuebleController.findByUserId); // Obtener inmuebles por ID de usuario

// ✅ RUTA DE UPLOAD
router.post('/upload-imagen', InmuebleController.uploadImagen);

// ✅ RUTAS GENÉRICAS AL FINAL
router.post('/', InmuebleController.create);
router.get('/', InmuebleController.findAll);
router.get('/:id', InmuebleController.findById);
router.put('/:id', InmuebleController.update1);
router.delete('/:id', InmuebleController.delete1);

module.exports = router;