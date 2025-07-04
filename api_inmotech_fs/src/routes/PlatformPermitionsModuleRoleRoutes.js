const express = require('express');
const PlatformPermitionsModuleRoleController = require('../controllers/PlatformPermitionsModuleRoleController');
const router = express.Router();

router.get('/', PlatformPermitionsModuleRoleController.findAll);
router.get('/:id', PlatformPermitionsModuleRoleController.findById);
router.post('/', PlatformPermitionsModuleRoleController.create);
router.put('/:id', PlatformPermitionsModuleRoleController.update);
router.delete('/:id', PlatformPermitionsModuleRoleController.delete);

module.exports = router;