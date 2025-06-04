import express from 'express';
import {
    getAllCorregimientos,
    getCorregimientoById,
    createCorregimiento,
    updateCorregimiento,
    deleteCorregimiento
} from '../controllers/corregimiento.js';

const router = express.Router();

router.get('/', getAllCorregimientos);
router.get('/:id', getCorregimientoById);
router.post('/', createCorregimiento);
router.put('/:id', updateCorregimiento);
router.delete('/:id', deleteCorregimiento);

export default router;
