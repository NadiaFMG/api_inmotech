const express = require('express');
const InmuebleController = require('../controllers/fc5Controller');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/busqueda', verifyToken, InmuebleController.getFilteredInmueblesFull);

module.exports = router;