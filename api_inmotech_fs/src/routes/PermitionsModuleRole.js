// import express from 'express';
// import {
//     getAllPermitionsModuleRoles,
//     getPermitionsModuleRoleById,
//     createPermitionsModuleRole,
//     updatePermitionsModuleRole,
//     deletePermitionsModuleRole
// } from '../controllers/permitionsModuleRoleController.js';

// const router = express.Router();

// router.get('/', getAllPermitionsModuleRoles);
// router.get('/:id', getPermitionsModuleRoleById);
// router.post('/', createPermitionsModuleRole);
// router.put('/:id', updatePermitionsModuleRole);
// router.delete('/:id', deletePermitionsModuleRole);

// export default router;

const express = require('express');
const PermitionsModuleRoleController = require('../controllers/PermitionsModuleRoleController');
const router = express.Router();

router.get('/', PermitionsModuleRoleController.findAll);
router.get('/:id', PermitionsModuleRoleController.findById);
router.post('/', PermitionsModuleRoleController.create);
router.put('/:id', PermitionsModuleRoleController.update);
router.delete('/:id', PermitionsModuleRoleController.delete);

module.exports = router;