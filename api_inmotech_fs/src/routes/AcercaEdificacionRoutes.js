// import express from 'express';
// import {
//     getAllAcercaEdificacion,
//     getAcercaEdificacionById,
//     createAcercaEdificacion,
//     updateAcercaEdificacion,
//     deleteAcercaEdificacion
// } from '../controllers/acerca_edificacion.js';

// const router = express.Router();

// router.get('/', getAllAcercaEdificacion);
// router.get('/:id', getAcercaEdificacionById);
// router.post('/', createAcercaEdificacion);
// router.put('/:id', updateAcercaEdificacion);
// router.delete('/:id', deleteAcercaEdificacion);

// export default router;

const express = require('express');
const AcercaEdificacionController = require('../controllers/AcercaEdificacionController');

const router = express.Router();

router.get('/', AcercaEdificacionController.findAll);
router.get('/:id', AcercaEdificacionController.findById);
router.post('/', AcercaEdificacionController.create);
router.put('/:id', AcercaEdificacionController.update);
router.delete('/:id', AcercaEdificacionController.delete);

module.exports = router;