const express = require('express');
const PlatformRoleController = require('../controllers/PlatformRoleController');
const router = express.Router();

router.get('/', PlatformRoleController.findAll);
router.get('/:id', PlatformRoleController.findById);
router.post('/', PlatformRoleController.create);
router.put('/:id', PlatformRoleController.update);
router.delete('/:id', PlatformRoleController.delete);

module.exports = router;