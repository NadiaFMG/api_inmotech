import express from 'express';
import {
    getAllDocumentIdentifications,
    getDocumentIdentificationById,
    createDocumentIdentification,
    updateDocumentIdentification,
    deleteDocumentIdentification
} from '../controllers/document_identification.js';

const router = express.Router();

router.get('/', getAllDocumentIdentifications);
router.get('/:id', getDocumentIdentificationById);
router.post('/', createDocumentIdentification);
router.put('/:id', updateDocumentIdentification);
router.delete('/:id', deleteDocumentIdentification);

export default router;
