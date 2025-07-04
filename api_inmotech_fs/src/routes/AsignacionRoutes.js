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

const router = express.Router();

router.get('/', AsignacionController.findAll);
router.get('/:id', AsignacionController.findById);
router.post('/', AsignacionController.create);
router.put('/:id', AsignacionController.update);
router.delete('/:id', AsignacionController.delete);

module.exports = router;