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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, CorregimientoController.findAll);
router.get('/:id', verifyToken, CorregimientoController.findById);
router.post('/', verifyToken, CorregimientoController.create);
router.put('/:id', verifyToken, CorregimientoController.update);
router.delete('/:id', verifyToken, CorregimientoController.delete);

module.exports = router;