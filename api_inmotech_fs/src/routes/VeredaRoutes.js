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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, VeredaController.findAll);
router.get('/:id', verifyToken, VeredaController.findById);
router.post('/', verifyToken, VeredaController.create);
router.put('/:id', verifyToken, VeredaController.update);
router.delete('/:id', verifyToken, VeredaController.delete);

module.exports = router;