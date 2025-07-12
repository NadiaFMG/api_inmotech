// import express from 'express';
// import {
//     getAllBarriosCiudadesCorregimientosVeredas,
//     getBarrioCiudadCorregimientoVeredaById,
//     createBarrioCiudadCorregimientoVereda,
//     updateBarrioCiudadCorregimientoVereda,
//     deleteBarrioCiudadCorregimientoVereda
// } from '../controllers/barrio_ciudad_corregimiento_vereda.js';

// const router = express.Router();

// router.get('/', getAllBarriosCiudadesCorregimientosVeredas);
// router.get('/:id', getBarrioCiudadCorregimientoVeredaById);
// router.post('/', createBarrioCiudadCorregimientoVereda);
// router.put('/:id', updateBarrioCiudadCorregimientoVereda);
// router.delete('/:id', deleteBarrioCiudadCorregimientoVereda);

// export default router;

const express = require('express');
const BarrioCiudadCorregimientoVeredaController = require('../controllers/BarrioCiudadCorregimientoVeredaController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, BarrioCiudadCorregimientoVeredaController.findAll);
router.get('/:id', verifyToken, BarrioCiudadCorregimientoVeredaController.findById);
router.post('/', verifyToken, BarrioCiudadCorregimientoVeredaController.create);
router.put('/:id', verifyToken, BarrioCiudadCorregimientoVeredaController.update);
router.delete('/:id', verifyToken, BarrioCiudadCorregimientoVeredaController.delete);

module.exports = router;