const express = require('express');
const PlatformModuleController = require('../controllers/PlatformModuleController');
const router = express.Router();

router.get('/', PlatformModuleController.findAll);
router.get('/:id', PlatformModuleController.findById);
router.post('/', PlatformModuleController.create);
router.put('/:id', PlatformModuleController.update);
router.delete('/:id', PlatformModuleController.delete);

module.exports = router;

