// import express from 'express';
// import {
//     getAllCiudades,
//     getCiudadById,
//     createCiudad,
//     updateCiudad,
//     deleteCiudad
// } from '../controllers/ciudad.js';

// const router = express.Router();

// router.get('/', getAllCiudades);
// router.get('/:id', getCiudadById);
// router.post('/', createCiudad);
// router.put('/:id', updateCiudad);
// router.delete('/:id', deleteCiudad);

// export default router;

const express = require('express');
const CiudadController = require('../controllers/CiudadController');
const router = express.Router();

router.get('/', CiudadController.findAll);
router.get('/:id', CiudadController.findById);
router.post('/', CiudadController.create);
router.put('/:id', CiudadController.update);
router.delete('/:id', CiudadController.delete);

module.exports = router;