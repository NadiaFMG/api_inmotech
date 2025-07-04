const express = require('express');
const PlatformPermitionsController = require('../controllers/PlatformPermitionsController');
const router = express.Router();

router.get('/', PlatformPermitionsController.findAll);
router.get('/:id', PlatformPermitionsController.findById);
router.post('/', PlatformPermitionsController.create);
router.put('/:id', PlatformPermitionsController.update);
router.delete('/:id', PlatformPermitionsController.delete);

module.exports = router;