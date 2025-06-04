import express from 'express';
import {
    getAllAcercaEdificacion,
    getAcercaEdificacionById,
    createAcercaEdificacion,
    updateAcercaEdificacion,
    deleteAcercaEdificacion
} from '../controllers/acerca_edificacion.js';

const router = express.Router();

router.get('/', getAllAcercaEdificacion);
router.get('/:id', getAcercaEdificacionById);
router.post('/', createAcercaEdificacion);
router.put('/:id', updateAcercaEdificacion);
router.delete('/:id', deleteAcercaEdificacion);

export default router;