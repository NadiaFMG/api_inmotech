import express from 'express';
import {
  getAllTipoDocumento,
  getTipoDocumentoById,
  createTipoDocumento,
  updateTipoDocumento,
  deleteTipoDocumento,
} from '../controllers/tipoDocumentoController.js'; 

const router = express.Router();


router.get('/', getAllTipoDocumento);
router.get('/:id', getTipoDocumentoById);
router.post('/', createTipoDocumento);
router.put('/:id', updateTipoDocumento);
router.delete('/:id', deleteTipoDocumento);

export default router;
