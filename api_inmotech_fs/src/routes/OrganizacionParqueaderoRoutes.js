// import express from 'express';
// import {
//     getAllOrganizacionParqueadero,
//     getOrganizacionParqueaderoById,
//     createOrganizacionParqueadero,
//     updateOrganizacionParqueadero,
//     deleteOrganizacionParqueadero
// } from '../controllers/organizacion_parqueadero.js';

// const router = express.Router();

// router.get('/', getAllOrganizacionParqueadero);
// router.get('/:id', getOrganizacionParqueaderoById);
// router.post('/', createOrganizacionParqueadero);
// router.put('/:id', updateOrganizacionParqueadero);
// router.delete('/:id', deleteOrganizacionParqueadero);

// export default router;

const express = require('express');
const OrganizacionParqueaderoController = require('../controllers/OrganizacionParqueaderoController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, OrganizacionParqueaderoController.findAll);
router.get('/:id', verifyToken, OrganizacionParqueaderoController.findById);
router.post('/', verifyToken, OrganizacionParqueaderoController.create);
router.put('/:id', verifyToken, OrganizacionParqueaderoController.update);
router.delete('/:id', verifyToken, OrganizacionParqueaderoController.delete);

module.exports = router;