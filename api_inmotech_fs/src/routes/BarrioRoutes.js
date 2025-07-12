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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, BarrioController.findAll);
router.get('/:id', verifyToken, BarrioController.findById);
router.post('/', verifyToken, BarrioController.create);
router.put('/:id', verifyToken, BarrioController.update);
router.delete('/:id', verifyToken, BarrioController.delete);

module.exports = router;