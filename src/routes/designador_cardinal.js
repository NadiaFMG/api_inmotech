import express from 'express';
import {
    getAllDesignadoresCardinales,
    getDesignadorCardinalById,
    createDesignadorCardinal,
    updateDesignadorCardinal,
    deleteDesignadorCardinal
} from '../controllers/designador_cardinal.js';

const router = express.Router();

router.get('/', getAllDesignadoresCardinales);
router.get('/:id', getDesignadorCardinalById);
router.post('/', createDesignadorCardinal);
router.put('/:id', updateDesignadorCardinal);
router.delete('/:id', deleteDesignadorCardinal);

export default router;
