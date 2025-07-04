
// import express from 'express';
// import {
//     getAllModules,
//     getModuleById,
//     createModule,
//     updateModule,
//     deleteModule
// } from '../controllers/modulesController.js';

// const router = express.Router();

// router.get('/', getAllModules);
// router.get('/:id', getModuleById);
// router.post('/', createModule);
// router.put('/:id', updateModule);
// router.delete('/:id', deleteModule);

// export default router;

const express = require('express');
const ModuleController = require('../controllers/ModuleController');
const router = express.Router();

router.get('/', ModuleController.findAll);
router.get('/:id', ModuleController.findById);
router.post('/', ModuleController.create);
router.put('/:id', ModuleController.update);
router.delete('/:id', ModuleController.delete);

module.exports = router;