import express from 'express';
import {
  getAllResolucionFactura,
  getResolucionFacturaById,
  createResolucionFactura,
  updateResolucionFactura,
  deleteResolucionFactura,
} from '../controllers/resolucion_facturaController.js'; 
const router = express.Router();

router.get('/', getAllResolucionFactura);
router.get('/:id', getResolucionFacturaById);
router.post('/', createResolucionFactura);
router.put('/:id', updateResolucionFactura);
router.delete('/:id', deleteResolucionFactura);

export default router;


