const express = require('express');
const PlatformUserStatusController = require('../controllers/PlatformUserStatusController');
const router = express.Router();

router.get('/', PlatformUserStatusController.findAll);
router.get('/:id', PlatformUserStatusController.findById);
router.post('/', PlatformUserStatusController.create);
router.put('/:id', PlatformUserStatusController.update);
router.delete('/:id', PlatformUserStatusController.delete);

module.exports = router;