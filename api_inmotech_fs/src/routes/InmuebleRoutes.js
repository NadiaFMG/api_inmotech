const express = require('express');
const InmuebleController = require('../controllers/InmuebleController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// Ruta para subir imágenes
router.post('/upload-imagen', InmuebleController.uploadImagen);

// 1. Obtener todos los inmuebles
router.get('/', verifyToken, InmuebleController.findAll);

// 2. Obtener un inmueble por ID
router.get('/:id', verifyToken, InmuebleController.findById);

// 3. Crear inmueble simple
router.post('/', verifyToken, InmuebleController.create);

// 4. Crear inmueble anidado (con todas las relaciones)
router.post('/anidado', /*verifyToken,*/ InmuebleController.crearInmuebleAnidado);

// 5. Actualizar inmueble simple
router.put('/update1/:id', verifyToken, InmuebleController.update1);

// 6. Eliminar inmueble simple
router.delete('/delete1/:id', verifyToken, InmuebleController.delete1);

// 7. Actualizar inmueble anidado (con todas las relaciones)
router.put('/:id', /*verifyToken,*/ InmuebleController.update1);

// 8. Eliminar inmueble anidado (con todas las relaciones)
router.delete('/:id', /*verifyToken,*/ InmuebleController.delete1);

module.exports = router;