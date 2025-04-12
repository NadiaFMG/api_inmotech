import express from 'express';
import {
    getAllAsignacion,
    getAsignacionById,
    createAsignacion,
    updateAsignacion,
    deleteAsignacion
} from '../controllers/asignacion.js';

const router = express.Router();

router.get('/', getAllAsignacion);
router.get('/:id', getAsignacionById);
router.post('/', createAsignacion);
router.put('/:id', updateAsignacion);
router.delete('/:id', deleteAsignacion);

export default router;