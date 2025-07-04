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
const router = express.Router();

router.get('/', DivisionController.findAll);
router.get('/:id', DivisionController.findById);
router.post('/', DivisionController.create);
router.put('/:id', DivisionController.update);
router.delete('/:id', DivisionController.delete);

module.exports = router;