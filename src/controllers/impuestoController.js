import Impuesto from '../models/impuestoModel.js'; // Asegúrate de que esta ruta sea correcta

// Obtener todos los impuestos
export async function getAllImpuesto(req, res) {
  try {
    const allImpuesto = await Impuesto.findAll();
    res.json(allImpuesto);
  } catch (error) {
    console.error("Error al obtener todos los impuestos:", error);
    res.status(500).json({ error: error.message });
  }
}

// Obtener un impuesto por ID
// Esta función espera el ID en los parámetros de la URL (ej. /impuesto/1)
export async function getImpuestoById(req, res) {
  try {
    const impuesto = await Impuesto.findByPk(req.params.id);
    if (impuesto) {
      res.json(impuesto);
    } else {
      res.status(404).json({ message: 'Impuesto no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener impuesto por ID:", error);
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo impuesto
// El impuesto_id NO se espera en el cuerpo de la solicitud para la creación;
// la base de datos lo generará automáticamente (auto-incremental).
export async function createImpuesto(req, res) {
  try {
    // Se extraen los campos del cuerpo. impuesto_id ya no se espera aquí.
    const { impuesto, TipodeImpuesto, Porcentaje, Columna } = req.body;

    const newImpuesto = await Impuesto.create({
      // impuesto_id no se incluye aquí; la base de datos lo manejará.
      impuesto: impuesto,       // Campo obligatorio
      TipodeImpuesto: TipodeImpuesto,
      Porcentaje: Porcentaje,
      Columna: Columna,
    });
    res.status(201).json(newImpuesto);
  } catch (error) {
    console.error("Error al crear impuesto:", error);
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un impuesto
// Esta función espera el ID en los parámetros de la URL (ej. /impuesto/1)
export async function updateImpuesto(req, res) {
  try {
    // Se extraen los campos actualizables del cuerpo. impuesto_id del cuerpo se ignora aquí.
    const { impuesto, TipodeImpuesto, Porcentaje, Columna } = req.body;
    const updatedImpuesto = await Impuesto.update(
      { impuesto, TipodeImpuesto, Porcentaje, Columna },
      {
        where: { Impuesto_id: req.params.id }, // El ID para actualizar se toma de la URL
      }
    );
    if (updatedImpuesto[0]) {
      res.json({ message: 'Impuesto actualizado' });
    } else {
      res.status(404).json({ message: 'Impuesto no encontrado' });
    }
  } catch (error) {
    console.error("Error al actualizar impuesto:", error);
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un impuesto
// Esta función espera el ID en los parámetros de la URL (ej. /impuesto/1)
export async function deleteImpuesto(req, res) {
  try {
    const deletedImpuesto = await Impuesto.destroy({
      where: { Impuesto_id: req.params.id }, // El ID para eliminar se toma de la URL
    });
    if (deletedImpuesto) {
      res.json({ message: 'Impuesto eliminado' });
    } else {
      res.status(404).json({ message: 'Impuesto no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar impuesto:", error);
    res.status(500).json({ error: error.message });
  }
}