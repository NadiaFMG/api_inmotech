// import express from 'express';
// import {
//     getAllNdaps,
//     getNdapById,
//     createNdap,
//     updateNdap,
//     deleteNdap
// } from '../controllers/ndap.js';

// const router = express.Router();

// router.get('/', getAllNdaps);
// router.get('/:id', getNdapById);
// router.post('/', createNdap);
// router.put('/:id', updateNdap);
// router.delete('/:id', deleteNdap);

// export default router;

const express = require('express');
const NdapController = require('../controllers/NdapController');
const router = express.Router();

router.get('/', NdapController.findAll);
router.get('/:id', NdapController.findById);
router.post('/', NdapController.create);
router.put('/:id', NdapController.update);
router.delete('/:id', NdapController.delete);

module.exports = router;