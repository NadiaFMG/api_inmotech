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
const router = express.Router();

router.get('/', ValorController.findAll);
router.get('/:id', ValorController.findById);
router.post('/', ValorController.create);
router.put('/:id', ValorController.update);
router.delete('/:id', ValorController.delete);

module.exports = router;