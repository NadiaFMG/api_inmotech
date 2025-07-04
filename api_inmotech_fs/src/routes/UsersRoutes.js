// import express from 'express';
// import { authenticateToken } from '../middlewares/authMiddleware.js';
// import {
//     getAllUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
// } from '../controllers/usersController.js';

// const router = express.Router();

// router.get('/', authenticateToken, getAllUsers);
// router.get('/:id', authenticateToken, getUserById);
// router.post('/', createUser);
// router.put('/:id', authenticateToken, updateUser);
// router.delete('/:id', authenticateToken, deleteUser);

// export default router;

const express = require('express');
const UsersController = require('../controllers/UsersController');
const router = express.Router();

router.get('/', UsersController.findAll);
router.get('/:id', UsersController.findById);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

module.exports = router;