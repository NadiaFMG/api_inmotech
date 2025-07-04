// import express from 'express';
// import {
//     getAllModuleRoles,
//     getModuleRoleById,
//     createModuleRole,
//     updateModuleRole,
//     deleteModuleRole,
// } from '../controllers/moduleRoleController.js';

// const router = express.Router();

// router.get('/', getAllModuleRoles);
// router.get('/:id', getModuleRoleById);
// router.post('/', createModuleRole);
// router.put('/:id', updateModuleRole);
// router.delete('/:id', deleteModuleRole);

// export default router;

const express = require('express');
const ModuleRoleController = require('../controllers/ModuleRoleController');
const router = express.Router();

router.get('/', ModuleRoleController.findAll);
router.get('/:id', ModuleRoleController.findById);
router.post('/', ModuleRoleController.create);
router.put('/:id', ModuleRoleController.update);
router.delete('/:id', ModuleRoleController.delete);

module.exports = router;