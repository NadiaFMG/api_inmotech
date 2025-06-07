import ResolucionFactura from '../models/resolucion_facturaModel.js'; 


export async function getAllResolucionFactura(req, res) {
  try {
    const allResolucionFactura = await ResolucionFactura.findAll();
    res.json(allResolucionFactura);
  } catch (error) {
    console.error("Error al obtener todas las resoluciones de factura:", error);
    res.status(500).json({ error: error.message });
  }
}

// Obtener una resolución de factura por ID
export async function getResolucionFacturaById(req, res) {
  try {
    const resolucionFactura = await ResolucionFactura.findByPk(req.params.id);
    if (resolucionFactura) {
      res.json(resolucionFactura);
    } else {
      res.status(404).json({ message: 'Resolución de factura no encontrada' });
    }
  } catch (error) {
    console.error("Error al obtener resolución de factura por ID:", error);
    res.status(500).json({ error: error.message });
  }
}


export async function createResolucionFactura(req, res) {
  try {
    const { Resolucion_facturacion_NO, Fecha_resolucion, Fecha_vencimiento } = req.body;
    const newResolucionFactura = await ResolucionFactura.create({
      Resolucion_facturacion_NO,
      Fecha_resolucion: Fecha_resolucion || DataTypes.NOW,
      Fecha_vencimiento: Fecha_vencimiento || DataTypes.NOW,
    });
    res.status(201).json(newResolucionFactura);
  } catch (error) {
    console.error("Error al crear resolución de factura:", error);
    res.status(500).json({ error: error.message });
  }
}

// Actualizar una resolución de factura
export async function updateResolucionFactura(req, res) {
  try {
    const { Resolucion_facturacion_NO, Fecha_resolucion, Fecha_vencimiento } = req.body;
    const updatedResolucionFactura = await ResolucionFactura.update(
      { Resolucion_facturacion_NO, Fecha_resolucion, Fecha_vencimiento },
      {
        where: { Resolucion_factura_id: req.params.id },
      }
    );
    if (updatedResolucionFactura[0]) { 
      res.json({ message: 'Resolución de factura actualizada' });
    } else {
      res.status(404).json({ message: 'Resolución de factura no encontrada' });
    }
  } catch (error) {
    console.error("Error al actualizar resolución de factura:", error);
    res.status(500).json({ error: error.message });
  }
}

// Eliminar una resolución de factura
export async function deleteResolucionFactura(req, res) {
  try {
    const deletedResolucionFactura = await ResolucionFactura.destroy({
      where: { Resolucion_factura_id: req.params.id },
    });
    if (deletedResolucionFactura) { // deletedResolucionFactura es 1 si se eliminó, 0 si no se encontró
      res.json({ message: 'Resolución de factura eliminada' });
    } else {
      res.status(404).json({ message: 'Resolución de factura no encontrada' });
    }
  } catch (error) {
    console.error("Error al eliminar resolución de factura:", error);
    res.status(500).json({ error: error.message });
  }
}
