// import express from 'express';
// import {
//   getAllTipoDocumento,
//   getTipoDocumentoById,
//   createTipoDocumento,
//   updateTipoDocumento,
//   deleteTipoDocumento,
// } from '../controllers/tipoDocumentoController.js'; 

// const router = express.Router();


// router.get('/', getAllTipoDocumento);
// router.get('/:id', getTipoDocumentoById);
// router.post('/', createTipoDocumento);
// router.put('/:id', updateTipoDocumento);
// router.delete('/:id', deleteTipoDocumento);

// export default router;

const express = require('express');
const PlatformIdentityDocumentController = require('../controllers/PlatformIdentityDocumentController');
const router = express.Router();

router.get('/', PlatformIdentityDocumentController.findAll);
router.get('/:id', PlatformIdentityDocumentController.findById);
router.post('/', PlatformIdentityDocumentController.create);
router.put('/:id', PlatformIdentityDocumentController.update);
router.delete('/:id', PlatformIdentityDocumentController.delete);

module.exports = router;