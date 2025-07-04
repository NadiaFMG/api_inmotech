// import express from 'express';
// import {
//   getAllImagenesInmueble,
//   getImagenesInmuebleById,
//   createImagenesInmueble,
//   updateImagenesInmueble,
//   deleteImagenesInmueble,
// } from '../controllers/imagenesInmuebleController.js'; 
// const router = express.Router();


// router.get('/', getAllImagenesInmueble);
// router.get('/:id', getImagenesInmuebleById);
// router.post('/', createImagenesInmueble);
// router.put('/:id', updateImagenesInmueble);
// router.delete('/:id', deleteImagenesInmueble);

// export default router;

const express = require('express');
const ImagenesInmuebleController = require('../controllers/ImagenesInmuebleController');
const router = express.Router();

router.get('/', ImagenesInmuebleController.findAll);
router.get('/:id', ImagenesInmuebleController.findById);
router.post('/', ImagenesInmuebleController.create);
router.put('/:id', ImagenesInmuebleController.update);
router.delete('/:id', ImagenesInmuebleController.delete);

module.exports = router;