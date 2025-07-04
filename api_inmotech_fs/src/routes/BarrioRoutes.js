// import express from 'express';
// import {
//     getAllBarrios,
//     getBarrioById,
//     createBarrio,
//     updateBarrio,
//     deleteBarrio
// } from '../controllers/barrio.js';

// const router = express.Router();

// router.get('/', getAllBarrios);
// router.get('/:id', getBarrioById);
// router.post('/', createBarrio);
// router.put('/:id', updateBarrio);
// router.delete('/:id', deleteBarrio);

// export default router;

const express = require('express');
const BarrioController = require('../controllers/BarrioController');
const router = express.Router();

router.get('/', BarrioController.findAll);
router.get('/:id', BarrioController.findById);
router.post('/', BarrioController.create);
router.put('/:id', BarrioController.update);
router.delete('/:id', BarrioController.delete);

module.exports = router;