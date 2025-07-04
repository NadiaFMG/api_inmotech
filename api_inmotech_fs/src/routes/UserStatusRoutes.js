// import express from 'express';
// import {
//     getAllUserStatus,
//     getUserStatusById,
//     createUserStatus,
//     updateUserStatus,
//     deleteUserStatus,
// } from '../controllers/userStatusController.js';

// const router = express.Router();

// router.get('/', getAllUserStatus);
// router.get('/:id', getUserStatusById);
// router.post('/', createUserStatus);
// router.put('/:id', updateUserStatus);
// router.delete('/:id', deleteUserStatus);

// export default router;

const express = require('express');
const UserStatusController = require('../controllers/UserStatusController');
const router = express.Router();

router.get('/', UserStatusController.findAll);
router.get('/:id', UserStatusController.findById);
router.post('/', UserStatusController.create);
router.put('/:id', UserStatusController.update);
router.delete('/:id', UserStatusController.delete);

module.exports = router;