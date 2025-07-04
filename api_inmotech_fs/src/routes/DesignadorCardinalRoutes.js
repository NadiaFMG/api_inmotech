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
const router = express.Router();

router.get('/', DesignadorCardinalController.findAll);
router.get('/:id', DesignadorCardinalController.findById);
router.post('/', DesignadorCardinalController.create);
router.put('/:id', DesignadorCardinalController.update);
router.delete('/:id', DesignadorCardinalController.delete);

module.exports = router;