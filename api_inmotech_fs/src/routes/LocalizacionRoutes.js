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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, LocalizacionController.findAll);
router.get('/:id', verifyToken, LocalizacionController.findById);
router.post('/', verifyToken, LocalizacionController.create);
router.put('/:id', verifyToken, LocalizacionController.update);
router.delete('/:id', verifyToken, LocalizacionController.delete);

module.exports = router;