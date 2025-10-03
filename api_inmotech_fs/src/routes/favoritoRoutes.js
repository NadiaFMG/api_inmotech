const express = require('express');
const router = express.Router();
const UserFavoritoController = require('../controllers/UserFavoritoController');

// ✅ RUTAS PARA FAVORITOS POR USUARIO
// Verificar si un inmueble es favorito para un usuario
router.get('/usuario/:userId/inmueble/:inmuebleId', UserFavoritoController.esFavorito);

// Toggle favorito (agregar/quitar)
router.patch('/usuario/:userId/inmueble/:inmuebleId/toggle', UserFavoritoController.toggleFavorito);

// Obtener todos los favoritos de un usuario
router.get('/usuario/:userId', UserFavoritoController.getFavoritosUsuario);

// Obtener todos los inmuebles con estado de favorito para un usuario
router.get('/usuario/:userId/inmuebles-con-favoritos', UserFavoritoController.getInmueblesConFavoritos);

// Eliminar favorito específico
router.delete('/usuario/:userId/inmueble/:inmuebleId', UserFavoritoController.eliminarFavorito);

module.exports = router;