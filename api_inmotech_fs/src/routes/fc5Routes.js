const express = require('express');
const InmuebleController = require('../controllers/fc5Controller');
const router = express.Router();

router.get('/busqueda', InmuebleController.getFilteredInmueblesFull);

module.exports = router;