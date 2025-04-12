import express from 'express';
import {
    getAllDivisions,
    getDivisionById,
    createDivision,
    updateDivision,
    deleteDivision
} from '../controllers/division.js';

const router = express.Router();

router.get('/', getAllDivisions);
router.get('/:id', getDivisionById);
router.post('/', createDivision);
router.put('/:id', updateDivision);
router.delete('/:id', deleteDivision);

export default router;
