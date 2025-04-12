import express from 'express';
import {
    getAllEstadosPago,
    getEstadoPagoById,
    createEstadoPago,
    updateEstadoPago,
    deleteEstadoPago
} from '../controllers/estado_pago.js';

const router = express.Router();

router.get('/', getAllEstadosPago);
router.get('/:id', getEstadoPagoById);
router.post('/', createEstadoPago);
router.put('/:id', updateEstadoPago);
router.delete('/:id', deleteEstadoPago);

export default router;
