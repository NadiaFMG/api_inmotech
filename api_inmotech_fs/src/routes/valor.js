import express from 'express';
import {
    getAllValores,
    getValorById,
    createValor,
    updateValor,
    deleteValor
} from '../controllers/valor.js';

const router = express.Router();

router.get('/', getAllValores);
router.get('/:id', getValorById);
router.post('/', createValor);
router.put('/:id', updateValor);
router.delete('/:id', deleteValor);

export default router;
