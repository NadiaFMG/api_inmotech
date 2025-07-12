// import express from 'express';
// import {
//     getAllMunicipios,
//     getMunicipioById,
//     createMunicipio,
//     updateMunicipio,
//     deleteMunicipio
// } from '../controllers/municipio.js';

// const router = express.Router();

// router.get('/', getAllMunicipios);
// router.get('/:id', getMunicipioById);
// router.post('/', createMunicipio);
// router.put('/:id', updateMunicipio);
// router.delete('/:id', deleteMunicipio);

// export default router;

const express = require('express');
const MunicipioController = require('../controllers/MunicipioController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, MunicipioController.findAll);
router.get('/:id', verifyToken, MunicipioController.findById);
router.post('/', verifyToken, MunicipioController.create);
router.put('/:id', verifyToken, MunicipioController.update);
router.delete('/:id', verifyToken, MunicipioController.delete);

module.exports = router;