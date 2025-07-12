// import express from 'express';
// import {
//     getAllDesignadoresCardinales,
//     getDesignadorCardinalById,
//     createDesignadorCardinal,
//     updateDesignadorCardinal,
//     deleteDesignadorCardinal
// } from '../controllers/designador_cardinal.js';

// const router = express.Router();

// router.get('/', getAllDesignadoresCardinales);
// router.get('/:id', getDesignadorCardinalById);
// router.post('/', createDesignadorCardinal);
// router.put('/:id', updateDesignadorCardinal);
// router.delete('/:id', deleteDesignadorCardinal);

// export default router;

const express = require('express');
const DesignadorCardinalController = require('../controllers/DesignadorCardinalController');
 const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, DesignadorCardinalController.findAll);
router.get('/:id', verifyToken, DesignadorCardinalController.findById);
router.post('/', verifyToken, DesignadorCardinalController.create);
router.put('/:id', verifyToken, DesignadorCardinalController.update);
router.delete('/:id', verifyToken, DesignadorCardinalController.delete);

module.exports = router;