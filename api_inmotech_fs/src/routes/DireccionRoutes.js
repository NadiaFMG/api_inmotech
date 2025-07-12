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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, DireccionController.findAll);
router.get('/:id', verifyToken, DireccionController.findById);
router.post('/', verifyToken, DireccionController.create);
router.put('/:id', verifyToken, DireccionController.update);
router.delete('/:id', verifyToken, DireccionController.delete);

module.exports = router;