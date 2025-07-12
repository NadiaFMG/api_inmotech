// import express from 'express';
// import {
//   getAllTipoEdificacion,
//   getTipoEdificacionById,
//   createTipoEdificacion,
//   updateTipoEdificacion,
//   deleteTipoEdificacion,
// } from '../controllers/tipoEdificacionController.js';

// const router = express.Router();

// // Cambia las rutas para que sean relativas a la base '/tipo_edificacion'
// // definida en app.js
// router.get('/', getAllTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion
// router.get('/:id', getTipoEdificacionById); // Ahora esto se alcanzará en /tipo_edificacion/:id
// router.post('/', createTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion
// router.put('/:id', updateTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion/:id
// router.delete('/:id', deleteTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion/:id

// export default router;

const express = require('express');
const TipoEdificacionController = require('../controllers/TipoEdificacionController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, TipoEdificacionController.findAll);
router.get('/:id', verifyToken, TipoEdificacionController.findById);
router.post('/', verifyToken, TipoEdificacionController.create);
router.put('/:id', verifyToken, TipoEdificacionController.update);
router.delete('/:id', verifyToken, TipoEdificacionController.delete);

module.exports = router;