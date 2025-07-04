// import express from 'express';
// import {
//     getAllEstadosPago,
//     getEstadoPagoById,
//     createEstadoPago,
//     updateEstadoPago,
//     deleteEstadoPago
// } from '../controllers/estado_pago.js';

// const router = express.Router();

// router.get('/', getAllEstadosPago);
// router.get('/:id', getEstadoPagoById);
// router.post('/', createEstadoPago);
// router.put('/:id', updateEstadoPago);
// router.delete('/:id', deleteEstadoPago);

// export default router;

const express = require('express');
const EstadoPagoController = require('../controllers/EstadoPagoController');
const router = express.Router();

router.get('/', EstadoPagoController.findAll);
router.get('/:id', EstadoPagoController.findById);
router.post('/', EstadoPagoController.create);
router.put('/:id', EstadoPagoController.update);
router.delete('/:id', EstadoPagoController.delete);

module.exports = router;