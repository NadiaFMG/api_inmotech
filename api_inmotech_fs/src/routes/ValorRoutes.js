// import express from 'express';
// import {
//     getAllValores,
//     getValorById,
//     createValor,
//     updateValor,
//     deleteValor
// } from '../controllers/valor.js';

// const router = express.Router();

// router.get('/', getAllValores);
// router.get('/:id', getValorById);
// router.post('/', createValor);
// router.put('/:id', updateValor);
// router.delete('/:id', deleteValor);

// export default router;

const express = require('express');
const ValorController = require('../controllers/ValorController');
 const verifyToken = require('../middlewares/verifyToken');
 
const router = express.Router();

router.get('/', verifyToken, ValorController.findAll);
router.get('/:id', verifyToken, ValorController.findById);
router.post('/', verifyToken, ValorController.create);
router.put('/:id', verifyToken, ValorController.update);
router.delete('/:id', verifyToken, ValorController.delete);

module.exports = router;