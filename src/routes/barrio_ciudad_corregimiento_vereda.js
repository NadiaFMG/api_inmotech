import express from 'express';
import {
    getAllBarriosCiudadesCorregimientosVeredas,
    getBarrioCiudadCorregimientoVeredaById,
    createBarrioCiudadCorregimientoVereda,
    updateBarrioCiudadCorregimientoVereda,
    deleteBarrioCiudadCorregimientoVereda
} from '../controllers/barrio_ciudad_corregimiento_vereda.js';

const router = express.Router();

router.get('/', getAllBarriosCiudadesCorregimientosVeredas);
router.get('/:id', getBarrioCiudadCorregimientoVeredaById);
router.post('/', createBarrioCiudadCorregimientoVereda);
router.put('/:id', updateBarrioCiudadCorregimientoVereda);
router.delete('/:id', deleteBarrioCiudadCorregimientoVereda);

export default router;
