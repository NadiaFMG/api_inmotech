const express = require('express');
const PlatformProfileController = require('../controllers/PlatformProfileController');
const router = express.Router();

// al hacer login
//crear el perfil del logueado
router.post('/by-user', PlatformProfileController.createByUser);
// ver el perfil del que hizo login
router.get('/by-user', PlatformProfileController.findByUser);
//actualizar el perfil del que hizo login
router.put('/by-user', PlatformProfileController.updateByUser);

router.get('/', PlatformProfileController.findAll);
router.get('/:id', PlatformProfileController.findById);
router.post('/', PlatformProfileController.create);
router.put('/:id', PlatformProfileController.update);
router.delete('/:id', PlatformProfileController.delete);


module.exports = router;