// import express from 'express';
// import {
//     getAllCorregimientos,
//     getCorregimientoById,
//     createCorregimiento,
//     updateCorregimiento,
//     deleteCorregimiento
// } from '../controllers/corregimiento.js';

// const router = express.Router();

// router.get('/', getAllCorregimientos);
// router.get('/:id', getCorregimientoById);
// router.post('/', createCorregimiento);
// router.put('/:id', updateCorregimiento);
// router.delete('/:id', deleteCorregimiento);

// export default router;

const express = require('express');
const CorregimientoController = require('../controllers/CorregimientoController');
const router = express.Router();

router.get('/', CorregimientoController.findAll);
router.get('/:id', CorregimientoController.findById);
router.post('/', CorregimientoController.create);
router.put('/:id', CorregimientoController.update);
router.delete('/:id', CorregimientoController.delete);

module.exports = router;