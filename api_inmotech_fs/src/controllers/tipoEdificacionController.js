import TipoEdificacion from '../models/tipoEdificacionModel.js';

// Obtener todos los tipos de edificación
// Esta función no "pide" un ID específico, ya que devuelve todos los registros.
export async function getAllTipoEdificacion(req, res) {
  try {
    const allTipoEdificacion = await TipoEdificacion.findAll();
    res.json(allTipoEdificacion);
  } catch (error) {
    console.error("Error al obtener todos los tipos de edificación:", error);
    res.status(500).json({ error: error.message });
  }
}

// Obtener un tipo de edificación por ID
// Esta función "pide" el ID a través de los parámetros de la URL (req.params.id).
export async function getTipoEdificacionById(req, res) {
  try {
    // El ID se obtiene de la URL, por ejemplo, /tipo_edificacion/1
    const tipoEdificacion = await TipoEdificacion.findByPk(req.params.id);
    if (tipoEdificacion) {
      res.json(tipoEdificacion);
    } else {
      res.status(404).json({ message: 'Tipo de edificación no encontrado' });
    }
  } catch (error) {
    console.error("Error al obtener tipo de edificación por ID:", error);
    res.status(500).json({ error: error.message });
  }
}

// Crear un nuevo tipo de edificación
// Por defecto, el ID no se "pide" al cliente para la creación, ya que suele ser auto-incremental.
// Sin embargo, si se proporciona un ID en el cuerpo de la solicitud, esta versión lo usará.
// ¡ADVERTENCIA!: Usar un ID proporcionado por el cliente para un campo auto-incremental
// puede causar problemas (ej. duplicados) si no se maneja cuidadosamente en la base de datos.
export async function createTipoEdificacion(req, res) {
  try {
    // Se extrae la descripción y, opcionalmente, el ID del cuerpo de la solicitud.
    const { Tipo_edificacion_id, Tipo_edificacion_descripcion } = req.body;

    const newTipoEdificacion = await TipoEdificacion.create({
      // Si Tipo_edificacion_id se proporciona, se usa; de lo contrario, la DB lo auto-generará si está configurado así.
      Tipo_edificacion_id: Tipo_edificacion_id,
      Tipo_edificacion_descripcion: Tipo_edificacion_descripcion,
    });
    res.status(201).json(newTipoEdificacion);
  } catch (error) {
    console.error("Error al crear tipo de edificación:", error);
    res.status(500).json({ error: error.message });
  }
}

// Actualizar un tipo de edificación
// Esta función "pide" el ID del registro a actualizar a través de los parámetros de la URL (req.params.id).
export async function updateTipoEdificacion(req, res) {
  try {
    // Se extrae la descripción del cuerpo de la solicitud.
    const { Tipo_edificacion_descripcion } = req.body;
    // El ID para saber qué registro actualizar se obtiene de la URL.
    const updatedTipoEdificacion = await TipoEdificacion.update(
      { Tipo_edificacion_descripcion: Tipo_edificacion_descripcion },
      {
        where: { Tipo_edificacion_id: req.params.id },
      }
    );
    if (updatedTipoEdificacion[0]) { // updatedTipoEdificacion[0] es el número de filas afectadas
      res.json({ message: 'Tipo de edificación actualizado' });
    } else {
      res.status(404).json({ message: 'Tipo de edificación no encontrado' });
    }
  } catch (error) {
    console.error("Error al actualizar tipo de edificación:", error);
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un tipo de edificación
// Esta función "pide" el ID del registro a eliminar a través de los parámetros de la URL (req.params.id).
export async function deleteTipoEdificacion(req, res) {
  try {
    // El ID para saber qué registro eliminar se obtiene de la URL.
    const deletedTipoEdificacion = await TipoEdificacion.destroy({
      where: { Tipo_edificacion_id: req.params.id },
    });
    if (deletedTipoEdificacion) { // deletedTipoEdificacion es 1 si se eliminó, 0 si no se encontró
      res.json({ message: 'Tipo de edificación eliminado' });
    } else {
      res.status(404).json({ message: 'Tipo de edificación no encontrado' });
    }
  } catch (error) {
    console.error("Error al eliminar tipo de edificación:", error);
    res.status(500).json({ error: error.message });
  }
}
