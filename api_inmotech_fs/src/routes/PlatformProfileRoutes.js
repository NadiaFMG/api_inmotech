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

// al hacer login
//crear el perfil del logueado
router.post('/by-user', PlatformProfileController.createByUser);
// ver el perfil del que hizo login
router.get('/by-user', PlatformProfileController.findByUser);
//actualizar el perfil del que hizo login
router.put('/by-user', PlatformProfileController.updateByUser);

router.get('/', PlatformProfileController.findAll);
router.get('/:id', PlatformProfileController.findById);
router.post('/', PlatformProfileController.create);
router.put('/:id', PlatformProfileController.update);
router.delete('/:id', PlatformProfileController.delete);


module.exports = router;