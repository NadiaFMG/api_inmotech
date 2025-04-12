import express from 'express';
import {
    getAllLocalizaciones,
    getLocalizacionById,
    createLocalizacion,
    updateLocalizacion,
    deleteLocalizacion
} from '../controllers/localizacion.js';

const router = express.Router();

router.get('/', getAllLocalizaciones);
router.get('/:id', getLocalizacionById);
router.post('/', createLocalizacion);
router.put('/:id', updateLocalizacion);
router.delete('/:id', deleteLocalizacion);

export default router;
