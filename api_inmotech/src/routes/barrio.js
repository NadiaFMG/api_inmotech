import express from 'express';
import {
    getAllBarrios,
    getBarrioById,
    createBarrio,
    updateBarrio,
    deleteBarrio
} from '../controllers/barrio.js';

const router = express.Router();

router.get('/', getAllBarrios);
router.get('/:id', getBarrioById);
router.post('/', createBarrio);
router.put('/:id', updateBarrio);
router.delete('/:id', deleteBarrio);

export default router;
