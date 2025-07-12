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
 const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', verifyToken, NdapController.findAll);
router.get('/:id', verifyToken, NdapController.findById);
router.post('/', verifyToken, NdapController.create);
router.put('/:id', verifyToken, NdapController.update);
router.delete('/:id', verifyToken, NdapController.delete);

module.exports = router;