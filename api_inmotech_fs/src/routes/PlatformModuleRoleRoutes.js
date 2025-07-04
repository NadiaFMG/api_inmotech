const express = require('express');
const PlatformModuleRoleController = require('../controllers/PlatformModuleRoleController');
const router = express.Router();

router.get('/', PlatformModuleRoleController.findAll);
router.get('/:id', PlatformModuleRoleController.findById);
router.post('/', PlatformModuleRoleController.create);
router.put('/:id', PlatformModuleRoleController.update);
router.delete('/:id', PlatformModuleRoleController.delete);

module.exports = router;