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
const router = express.Router();

router.get('/', OrganizacionParqueaderoController.findAll);
router.get('/:id', OrganizacionParqueaderoController.findById);
router.post('/', OrganizacionParqueaderoController.create);
router.put('/:id', OrganizacionParqueaderoController.update);
router.delete('/:id', OrganizacionParqueaderoController.delete);

module.exports = router;