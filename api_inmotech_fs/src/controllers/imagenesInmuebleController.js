// import ImagenesInmueble from '../models/imagenesInmuebleModel.js'; // Asegúrate de que esta ruta sea correcta

// // Obtener todas las imágenes de inmuebles
// export async function getAllImagenesInmueble(req, res) {
//   try {
//     const allImagenesInmueble = await ImagenesInmueble.findAll();
//     res.json(allImagenesInmueble);
//   } catch (error) {
//     console.error("Error al obtener todas las imágenes de inmuebles:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

// // Obtener una imagen de inmueble por ID
// export async function getImagenesInmuebleById(req, res) {
//   try {
//     const imagenInmueble = await ImagenesInmueble.findByPk(req.params.id);
//     if (imagenInmueble) {
//       res.json(imagenInmueble);
//     } else {
//       res.status(404).json({ message: 'Imagen de inmueble no encontrada' });
//     }
//   } catch (error) {
//     console.error("Error al obtener imagen de inmueble por ID:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

// // Crear una nueva imagen de inmueble
// // El ID (Imagenes_inmueble_id) se auto-incrementa, por lo que no se espera en el cuerpo para la creación.
// export async function createImagenesInmueble(req, res) {
//   try {
//     // Se extraen los campos del cuerpo de la solicitud
//     const { Imagenes, Nombre, URL } = req.body;
//     const newImagenInmueble = await ImagenesInmueble.create({
//       Imagenes,
//       Nombre,
//       URL,
//     });
//     res.status(201).json(newImagenInmueble);
//   } catch (error) {
//     console.error("Error al crear imagen de inmueble:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

// // Actualizar una imagen de inmueble
// export async function updateImagenesInmueble(req, res) {
//   try {
//     const { Imagenes, Nombre, URL } = req.body;
//     const updatedImagenInmueble = await ImagenesInmueble.update(
//       { Imagenes, Nombre, URL },
//       {
//         where: { Imagenes_inmueble_id: req.params.id },
//       }
//     );
//     if (updatedImagenInmueble[0]) { // updatedImagenInmueble[0] es el número de filas afectadas
//       res.json({ message: 'Imagen de inmueble actualizada' });
//     } else {
//       res.status(404).json({ message: 'Imagen de inmueble no encontrada' });
//     }
//   } catch (error) {
//     console.error("Error al actualizar imagen de inmueble:", error);
//     res.status(500).json({ error: error.message });
//   }
// }

// // Eliminar una imagen de inmueble
// export async function deleteImagenesInmueble(req, res) {
//   try {
//     const deletedImagenInmueble = await ImagenesInmueble.destroy({
//       where: { Imagenes_inmueble_id: req.params.id },
//     });
//     if (deletedImagenInmueble) { // deletedImagenInmueble es 1 si se eliminó, 0 si no se encontró
//       res.json({ message: 'Imagen de inmueble eliminada' });
//     } else {
//       res.status(404).json({ message: 'Imagen de inmueble no encontrada' });
//     }
//   } catch (error) {
//     console.error("Error al eliminar imagen de inmueble:", error);
//     res.status(500).json({ error: error.message });
//   }
// }
const db = require('../models');
const ImagenesInmueble = db.ImagenesInmueble;

const ImagenesInmuebleController = {
  async create(req, res) {
    try {
      const imagen = await ImagenesInmueble.create(req.body);
      res.status(201).json(imagen);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const imagenes = await ImagenesInmueble.findAll();
      res.json(imagenes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const imagen = await ImagenesInmueble.findByPk(req.params.id);
      if (!imagen) return res.status(404).json({ error: 'No encontrado' });
      res.json(imagen);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await ImagenesInmueble.update(req.body, {
        where: { Imagenes_inmueble_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const imagen = await ImagenesInmueble.findByPk(req.params.id);
      res.json(imagen);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ImagenesInmueble.destroy({
        where: { Imagenes_inmueble_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Imagen de inmueble eliminada' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ImagenesInmuebleController;