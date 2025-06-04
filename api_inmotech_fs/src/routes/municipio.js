import express from 'express';
import {
    getAllMunicipios,
    getMunicipioById,
    createMunicipio,
    updateMunicipio,
    deleteMunicipio
} from '../controllers/municipio.js';

const router = express.Router();

router.get('/', getAllMunicipios);
router.get('/:id', getMunicipioById);
router.post('/', createMunicipio);
router.put('/:id', updateMunicipio);
router.delete('/:id', deleteMunicipio);

export default router;
