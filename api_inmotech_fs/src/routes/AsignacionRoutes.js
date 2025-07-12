// import express from 'express';
// import {
//     getAllAsignacion,
//     getAsignacionById,
//     createAsignacion,
//     updateAsignacion,
//     deleteAsignacion
// } from '../controllers/asignacion.js';

// const router = express.Router();

// router.get('/', getAllAsignacion);
// router.get('/:id', getAsignacionById);
// router.post('/', createAsignacion);
// router.put('/:id', updateAsignacion);
// router.delete('/:id', deleteAsignacion);

// export default router;

const express = require('express');
const AsignacionController = require('../controllers/AsignacionController');
 const verifyToken = require('../middlewares/verifyToken');


const router = express.Router();

router.get('/', verifyToken, AsignacionController.findAll);
router.get('/:id', verifyToken, AsignacionController.findById);
router.post('/', verifyToken, AsignacionController.create);
router.put('/:id', verifyToken, AsignacionController.update);
router.delete('/:id', verifyToken, AsignacionController.delete);

module.exports = router;