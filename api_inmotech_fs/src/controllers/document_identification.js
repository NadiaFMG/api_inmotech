import documentIdentification from '../models/document_identification.js';

// Obtener todos los documentos de identificación
export async function getAllDocumentIdentifications(req, res) {
    try {
        const allDocumentIdentifications = await documentIdentification.findAll();
        res.json(allDocumentIdentifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un documento de identificación por ID
export async function getDocumentIdentificationById(req, res) {
    try {
        const documentIdentificationItem = await documentIdentification.findByPk(req.params.id);
        if (documentIdentificationItem) {
            res.json(documentIdentificationItem);
        } else {
            res.status(404).json({ message: 'Documento de identificación no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo documento de identificación
export async function createDocumentIdentification(req, res) {
    try {
        const newDocumentIdentification = await documentIdentification.create(req.body);
        res.status(201).json(newDocumentIdentification);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un documento de identificación
export async function updateDocumentIdentification(req, res) {
    try {
        const updatedDocumentIdentification = await documentIdentification.update(req.body, {
            where: { Document_identification_id: req.params.id },
        });
        if (updatedDocumentIdentification[0]) {
            res.json({ message: 'Documento de identificación actualizado' });
        } else {
            res.status(404).json({ message: 'Documento de identificación no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Eliminar un documento de identificación
export async function deleteDocumentIdentification(req, res) {
    try {
        const deletedDocumentIdentification = await documentIdentification.destroy({
            where: { Document_identification_id: req.params.id },
        });
        if (deletedDocumentIdentification) {
            res.json({ message: 'Documento de identificación eliminado' });
        } else {
            res.status(404).json({ message: 'Documento de identificación no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
