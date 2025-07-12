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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, CiudadController.findAll);
router.get('/:id', verifyToken, CiudadController.findById);
router.post('/', verifyToken, CiudadController.create);
router.put('/:id', verifyToken, CiudadController.update);
router.delete('/:id', verifyToken, CiudadController.delete);

module.exports = router;