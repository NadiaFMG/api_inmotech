// import express from 'express';
// import {
//     getAllPermitions,
//     getPermitionById,
//     createPermition,
//     updatePermition,
//     deletePermition
// } from '../controllers/permitionsController.js';

// const router = express.Router();

// router.get('/', getAllPermitions);
// router.get('/:id', getPermitionById);
// router.post('/', createPermition);
// router.put('/:id', updatePermition);
// router.delete('/:id', deletePermition);

// export default router;

const express = require('express');
const PermitionsController = require('../controllers/permitionsController');
const router = express.Router();

router.get('/', PermitionsController.findAll);
router.get('/:id', PermitionsController.findById);
router.post('/', PermitionsController.create);
router.put('/:id', PermitionsController.update);
router.delete('/:id', PermitionsController.delete);

module.exports = router;