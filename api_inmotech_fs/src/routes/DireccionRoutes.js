// import express from 'express';
// import {
//     getAllDirecciones,
//     getDireccionById,
//     createDireccion,
//     updateDireccion,
//     deleteDireccion
// } from '../controllers/direccion.js';

// const router = express.Router();

// router.get('/', getAllDirecciones);
// router.get('/:id', getDireccionById);
// router.post('/', createDireccion);
// router.put('/:id', updateDireccion);
// router.delete('/:id', deleteDireccion);

// export default router;

const express = require('express');
const DireccionController = require('../controllers/DireccionController');
const router = express.Router();

router.get('/', DireccionController.findAll);
router.get('/:id', DireccionController.findById);
router.post('/', DireccionController.create);
router.put('/:id', DireccionController.update);
router.delete('/:id', DireccionController.delete);

module.exports = router;