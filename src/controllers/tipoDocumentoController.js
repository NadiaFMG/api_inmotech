import TipoDocumento from '../models/tipoDocumentoModel.js';

// Obtener todos los tipos de documento
export async function getAllTipoDocumento(req, res) {
  try {
    const allTipoDocumento = await TipoDocumento.findAll();
    res.json(allTipoDocumento);
  } catch (error) {
    console.error("Error al obtener todos los tipos de documento:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function getTipoDocumentoById(req, res) {
  try {
    const tipoDocumento = await TipoDocumento.findByPk(req.params.id);
    if (tipoDocumento) {
      res.json(tipoDocumento);
    } else {
      res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener tipo de documento por ID:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function createTipoDocumento(req, res) {
  try {
    
    const { Tipo_documento_id, Tipo_documento_name, Tipo_documento_acronym, firstName, lastName } = req.body;

    const newTipoDocumento = await TipoDocumento.create({
      
      Tipo_documento_id: Tipo_documento_id,
      Tipo_documento_name: Tipo_documento_name,
      Tipo_documento_acronym: Tipo_documento_acronym,
      firstName: firstName,
      lastName: lastName,
    });
    res.status(201).json(newTipoDocumento);
  } catch (error) {
    console.error("Error al crear tipo de documento:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function updateTipoDocumento(req, res) {
  try {
   
    const { Tipo_documento_name, Tipo_documento_acronym, firstName, lastName } = req.body;
    const updatedTipoDocumento = await TipoDocumento.update(
      { Tipo_documento_name, Tipo_documento_acronym, firstName, lastName },
      {
        where: { Tipo_documento_id: req.params.id },
      }
    );
    if (updatedTipoDocumento[0]) {
      res.json({ message: 'Tipo de documento actualizado' });
    } else {
      res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }
  } catch (error) {
    console.error("Error al actualizar tipo de documento:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function deleteTipoDocumento(req, res) {
  try {
    const deletedTipoDocumento = await TipoDocumento.destroy({
      where: { Tipo_documento_id: req.params.id },
    });
    if (deletedTipoDocumento) {
      res.json({ message: 'Tipo de documento eliminado' });
    } else {
      res.status(404).json({ message: 'Tipo de documento no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar tipo de documento:", error);
    res.status(500).json({ error: error.message });
  }
}
