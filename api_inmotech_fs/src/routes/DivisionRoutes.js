// import express from 'express';
// import {
//     getAllDivisions,
//     getDivisionById,
//     createDivision,
//     updateDivision,
//     deleteDivision
// } from '../controllers/division.js';

// const router = express.Router();

// router.get('/', getAllDivisions);
// router.get('/:id', getDivisionById);
// router.post('/', createDivision);
// router.put('/:id', updateDivision);
// router.delete('/:id', deleteDivision);

// export default router;

const express = require('express');
const DivisionController = require('../controllers/DivisionController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, DivisionController.findAll);
router.get('/:id', verifyToken, DivisionController.findById);
router.post('/', verifyToken, DivisionController.create);
router.put('/:id', verifyToken, DivisionController.update);
router.delete('/:id', verifyToken, DivisionController.delete);

module.exports = router;