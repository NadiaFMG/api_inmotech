// import express from 'express';
// import {
//     getAllProfiles,
//     getProfileById,
//     createProfile,
//     updateProfile,
//     deleteProfile
// } from '../controllers/profilesController.js';

// const router = express.Router();

// router.get('/', getAllProfiles);
// router.get('/:id', getProfileById);
// router.post('/', createProfile);
// router.put('/:id', updateProfile);
// router.delete('/:id', deleteProfile);

// export default router;

const express = require('express');
const PlatformProfileController = require('../controllers/PlatformProfileController');
const router = express.Router();

router.get('/', PlatformProfileController.findAll);
router.get('/:id', PlatformProfileController.findById);
router.post('/', PlatformProfileController.create);
router.put('/:id', PlatformProfileController.update);
router.delete('/:id', PlatformProfileController.delete);

module.exports = router;