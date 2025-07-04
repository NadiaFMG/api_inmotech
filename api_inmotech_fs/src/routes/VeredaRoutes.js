// import express from 'express';
// import {
//     getAllVeredas,
//     getVeredaById,
//     createVereda,
//     updateVereda,
//     deleteVereda
// } from '../controllers/vereda.js';

// const router = express.Router();

// router.get('/', getAllVeredas);
// router.get('/:id', getVeredaById);
// router.post('/', createVereda);
// router.put('/:id', updateVereda);
// router.delete('/:id', deleteVereda);

// export default router;

const express = require('express');
const VeredaController = require('../controllers/VeredaController');
const router = express.Router();

router.get('/', VeredaController.findAll);
router.get('/:id', VeredaController.findById);
router.post('/', VeredaController.create);
router.put('/:id', VeredaController.update);
router.delete('/:id', VeredaController.delete);

module.exports = router;