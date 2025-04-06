import express from 'express';
import {
    getAllOrganizacionParqueadero,
    getOrganizacionParqueaderoById,
    createOrganizacionParqueadero,
    updateOrganizacionParqueadero,
    deleteOrganizacionParqueadero
} from '../controllers/organizacion_parqueadero.js';

const router = express.Router();

router.get('/', getAllOrganizacionParqueadero);
router.get('/:id', getOrganizacionParqueaderoById);
router.post('/', createOrganizacionParqueadero);
router.put('/:id', updateOrganizacionParqueadero);
router.delete('/:id', deleteOrganizacionParqueadero);

export default router;