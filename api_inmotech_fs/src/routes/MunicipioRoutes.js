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
const router = express.Router();

router.get('/', MunicipioController.findAll);
router.get('/:id', MunicipioController.findById);
router.post('/', MunicipioController.create);
router.put('/:id', MunicipioController.update);
router.delete('/:id', MunicipioController.delete);

module.exports = router;