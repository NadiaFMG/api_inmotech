// import express from 'express';
// import {
//     getAllLocalizaciones,
//     getLocalizacionById,
//     createLocalizacion,
//     updateLocalizacion,
//     deleteLocalizacion
// } from '../controllers/localizacion.js';

// const router = express.Router();

// router.get('/', getAllLocalizaciones);
// router.get('/:id', getLocalizacionById);
// router.post('/', createLocalizacion);
// router.put('/:id', updateLocalizacion);
// router.delete('/:id', deleteLocalizacion);

// export default router;

const express = require('express');
const LocalizacionController = require('../controllers/LocalizacionController');
const router = express.Router();

router.get('/', LocalizacionController.findAll);
router.get('/:id', LocalizacionController.findById);
router.post('/', LocalizacionController.create);
router.put('/:id', LocalizacionController.update);
router.delete('/:id', LocalizacionController.delete);

module.exports = router;