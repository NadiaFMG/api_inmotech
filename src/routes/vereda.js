import express from 'express';
import {
    getAllVeredas,
    getVeredaById,
    createVereda,
    updateVereda,
    deleteVereda
} from '../controllers/vereda.js';

const router = express.Router();

router.get('/', getAllVeredas);
router.get('/:id', getVeredaById);
router.post('/', createVereda);
router.put('/:id', updateVereda);
router.delete('/:id', deleteVereda);

export default router;