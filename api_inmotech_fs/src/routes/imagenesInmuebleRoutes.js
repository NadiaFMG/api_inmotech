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
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, ImagenesInmuebleController.findAll);
router.get('/:id', verifyToken, ImagenesInmuebleController.findById);
router.post('/', verifyToken, ImagenesInmuebleController.create);
router.put('/:id', verifyToken, ImagenesInmuebleController.update);
router.delete('/:id', verifyToken, ImagenesInmuebleController.delete);

module.exports = router;