import express from 'express';
import {
  getAllTipoEdificacion,
  getTipoEdificacionById,
  createTipoEdificacion,
  updateTipoEdificacion,
  deleteTipoEdificacion,
} from '../controllers/tipoEdificacionController.js';

const router = express.Router();

// Cambia las rutas para que sean relativas a la base '/tipo_edificacion'
// definida en app.js
router.get('/', getAllTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion
router.get('/:id', getTipoEdificacionById); // Ahora esto se alcanzará en /tipo_edificacion/:id
router.post('/', createTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion
router.put('/:id', updateTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion/:id
router.delete('/:id', deleteTipoEdificacion); // Ahora esto se alcanzará en /tipo_edificacion/:id

export default router;