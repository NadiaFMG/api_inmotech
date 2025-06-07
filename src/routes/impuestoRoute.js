import express from 'express';
import {
  getAllImpuesto,
  getImpuestoById,
  createImpuesto,
  updateImpuesto,
  deleteImpuesto,
} from '../controllers/impuestoController.js'; // Asegúrate de que esta ruta sea correcta

const router = express.Router();

// Las rutas se definen relativas a la ruta base que usarás en app.js
router.get('/', getAllImpuesto);
router.get('/:id', getImpuestoById);
router.post('/', createImpuesto);
router.put('/:id', updateImpuesto);
router.delete('/:id', deleteImpuesto);

export default router;
