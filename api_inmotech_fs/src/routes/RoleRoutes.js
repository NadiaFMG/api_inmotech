// import express from 'express';
// import {
//     getAllRoles,
//     getRoleById,
//     createRole,
//     updateRole,
//     deleteRole
// } from '../controllers/rolesController.js';

// const router = express.Router();

// router.get('/', getAllRoles);
// router.get('/:id', getRoleById);
// router.post('/', createRole);
// router.put('/:id', updateRole);
// router.delete('/:id', deleteRole);

// export default router;

const express = require('express');
const RoleController = require('../controllers/RoleController');
const router = express.Router();

router.get('/', RoleController.findAll);
router.get('/:id', RoleController.findById);
router.post('/', RoleController.create);
router.put('/:id', RoleController.update);
router.delete('/:id', RoleController.delete);

module.exports = router;