// controllers/inmuebleGeneralFiltersController.js

import Inmueble from '../models/inmueble.js';         // Asegúrate de que esta ruta sea correcta //NO ESTA EL MODELO
import TipoEdificacion from '../models/tipoEdificacionModel.js'; 

/**
 * @function getInmueblesByEdificacionType
 * @description Obtiene inmuebles filtrados por la categoría de tipo de edificación.
 * Corresponde a la consulta SQL "1. Inmuebles por Tipo de Edificación".
 * @param {Object} req - Objeto de solicitud de Express. Espera `tipo_edificacion_categoria` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByEdificacionType(req, res) {
  try {
    const { tipo_edificacion_categoria } = req.query;

    if (!tipo_edificacion_categoria || typeof tipo_edificacion_categoria !== 'string' || tipo_edificacion_categoria.trim() === '') {
      return res.status(400).json({ message: 'La categoría de edificación es requerida y debe ser una cadena no vacía.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: {
        Estado: 'disponible',
        '$tipoEdificacion.Tipo_edificacion_categoria$': tipo_edificacion_categoria,
      },
      include: [{
        model: TipoEdificacion,
        as: 'tipoEdificacion', // Alias de la relación definido en el modelo Inmueble
        attributes: ['Tipo_edificacion_categoria'],
      }],
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles para la categoría de edificación especificada.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por tipo de edificación:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByTransactionMotivo
 * @description Obtiene inmuebles filtrados por el motivo de transacción (Venta/Arriendo/Anticrético).
 * Corresponde a la consulta SQL "2. Inmuebles por Motivo de Transacción".
 * @param {Object} req - Objeto de solicitud de Express. Espera `motivo_transaccion` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByTransactionMotivo(req, res) {
  try {
    const { motivo_transaccion } = req.query;

    if (!motivo_transaccion || typeof motivo_transaccion !== 'string' || motivo_transaccion.trim() === '') {
      return res.status(400).json({ message: 'El motivo de transacción es requerido y debe ser una cadena no vacía.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: {
        Estado: 'disponible',
        Motivo_VoA: motivo_transaccion,
      },
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el motivo de transacción especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por motivo de transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByPriceRange
 * @description Obtiene inmuebles filtrados por un rango de precio (mínimo y/o máximo).
 * Corresponde a la consulta SQL "3. Inmuebles por Rango de Precio".
 * @param {Object} req - Objeto de solicitud de Express. Espera `precio_min` y `precio_max` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByPriceRange(req, res) {
  try {
    const { precio_min, precio_max } = req.query;

    const whereConditions = {
      Estado: 'disponible',
    };

    if (precio_min !== undefined) {
      const minVal = parseFloat(precio_min);
      if (isNaN(minVal) || minVal < 0) {
        return res.status(400).json({ message: 'El precio mínimo debe ser un número positivo válido.' });
      }
      whereConditions.Valor = { [Op.gte]: minVal };
    }

    if (precio_max !== undefined) {
      const maxVal = parseFloat(precio_max);
      if (isNaN(maxVal) || maxVal < 0) {
        return res.status(400).json({ message: 'El precio máximo debe ser un número positivo válido.' });
      }
      whereConditions.Valor = { ...whereConditions.Valor, [Op.lte]: maxVal };
    }

    // Si no se proporcionó ningún rango, puedes decidir si devolver un error o todos los disponibles
    if (precio_min === undefined && precio_max === undefined) {
      return res.status(400).json({ message: 'Debe especificar al menos un precio mínimo o máximo.' });
    }
    
    const inmuebles = await Inmueble.findAll({
      where: whereConditions,
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el rango de precio especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por rango de precio:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByAreaRange
 * @description Obtiene inmuebles filtrados por un rango de área (mínimo y/o máximo).
 * Corresponde a la consulta SQL "4. Inmuebles por Rango de Área".
 * @param {Object} req - Objeto de solicitud de Express. Espera `area_min` y `area_max` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByAreaRange(req, res) {
  try {
    const { area_min, area_max } = req.query;

    const whereConditions = {
      Estado: 'disponible',
    };

    if (area_min !== undefined) {
      const minVal = parseFloat(area_min);
      if (isNaN(minVal) || minVal < 0) {
        return res.status(400).json({ message: 'El área mínima debe ser un número positivo válido.' });
      }
      whereConditions.Area = { [Op.gte]: minVal };
    }

    if (area_max !== undefined) {
      const maxVal = parseFloat(area_max);
      if (isNaN(maxVal) || maxVal < 0) {
        return res.status(400).json({ message: 'El área máxima debe ser un número positivo válido.' });
      }
      whereConditions.Area = { ...whereConditions.Area, [Op.lte]: maxVal };
    }

    if (area_min === undefined && area_max === undefined) {
        return res.status(400).json({ message: 'Debe especificar al menos un área mínima o máxima.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: whereConditions,
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el rango de área especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por rango de área:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByAntiguedad
 * @description Obtiene inmuebles filtrados por antigüedad, manejando categorías como "Nueva" o rangos.
 * Corresponde a la consulta SQL "5. Inmuebles por Antigüedad".
 * @param {Object} req - Objeto de solicitud de Express. Espera `antiguedad` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByAntiguedad(req, res) {
  try {
    const { antiguedad } = req.query;

    if (!antiguedad || typeof antiguedad !== 'string' || antiguedad.trim() === '') {
      return res.status(400).json({ message: 'El parámetro de antigüedad es requerido y debe ser una cadena no vacía.' });
    }

    const whereConditions = {
      Estado: 'disponible',
    };

    switch (antiguedad.toLowerCase()) {
      case 'nueva':
        whereConditions.Antiguedad = 0;
        break;
      case 'menos de 5 años':
        whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
        break;
      case '5-10 años':
        whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
        break;
      case 'mas de 10 años':
        whereConditions.Antiguedad = { [Op.gt]: 10 };
        break;
      default:
        // Si no coincide con las categorías, intenta parsear como un número exacto
        const exactAntiguedad = parseInt(antiguedad, 10);
        if (isNaN(exactAntiguedad) || exactAntiguedad < 0) {
          return res.status(400).json({ message: 'El valor de antigüedad no es válido o la categoría no es reconocida.' });
        }
        whereConditions.Antiguedad = exactAntiguedad;
        break;
    }

    const inmuebles = await Inmueble.findAll({
      where: whereConditions,
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles con la antigüedad especificada.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por antigüedad:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByStatus
 * @description Obtiene inmuebles filtrados por su estado (ej. 'disponible', 'vendido').
 * Corresponde a la consulta SQL "6. Inmuebles por Estado del Inmueble".
 * @param {Object} req - Objeto de solicitud de Express. Espera `estado_inmueble` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByStatus(req, res) {
  try {
    const { estado_inmueble } = req.query;

    if (!estado_inmueble || typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
      return res.status(400).json({ message: 'El estado del inmueble es requerido y debe ser una cadena no vacía.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: {
        Estado: estado_inmueble,
      },
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles con el estado especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por estado:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesByInternalCode
 * @description Obtiene inmuebles filtrados por su código interno.
 * Corresponde a la consulta SQL "7. Inmuebles por Código Interno".
 * @param {Object} req - Objeto de solicitud de Express. Espera `codigo_interno` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByInternalCode(req, res) {
  try {
    const { codigo_interno } = req.query;

    if (!codigo_interno || typeof codigo_interno !== 'string' || codigo_interno.trim() === '') {
      return res.status(400).json({ message: 'El código interno del inmueble es requerido y debe ser una cadena no vacía.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: {
        // Puedes quitar 'Estado: 'disponible'' aquí si quieres buscar sin importar el estado
        Estado: 'disponible',
        Codigo_interno: codigo_interno,
      },
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontró un inmueble disponible con el código interno especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por código interno:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

/**
 * @function getInmueblesWithAllGeneralFilters
 * @description Controlador unificado para obtener inmuebles aplicando todos los filtros generales de forma opcional.
 * Corresponde a la "Consulta SQL Unificada para Filtros Generales de Inmuebles".
 * @param {Object} req - Objeto de solicitud de Express. Espera parámetros como `estado_inmueble`,
 * `tipo_edificacion_categoria`, `motivo_transaccion`, `precio_min`, `precio_max`,
 * `area_min`, `area_max`, `antiguedad`, `codigo_interno` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesWithAllGeneralFilters(req, res) {
  try {
    const {
      estado_inmueble,
      tipo_edificacion_categoria,
      motivo_transaccion,
      precio_min,
      precio_max,
      area_min,
      area_max,
      antiguedad,
      codigo_interno,
    } = req.query;

    const whereConditions = {};
    let includeConditions = [];

    // --- Filtro base: Estado del inmueble (opcional, por defecto 'disponible') ---
    if (estado_inmueble) {
      if (typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
        return res.status(400).json({ message: 'El estado del inmueble debe ser una cadena no vacía.' });
      }
      whereConditions.Estado = estado_inmueble;
    } else {
      whereConditions.Estado = 'disponible'; // Valor por defecto si no se especifica
    }

    // --- 1. Filtro por Tipo de Edificación (Categoría) ---
    if (tipo_edificacion_categoria) {
      if (typeof tipo_edificacion_categoria !== 'string' || tipo_edificacion_categoria.trim() === '') {
        return res.status(400).json({ message: 'La categoría de edificación debe ser una cadena no vacía.' });
      }
      includeConditions.push({
        model: TipoEdificacion,
        as: 'tipoEdificacion',
        attributes: ['Tipo_edificacion_categoria'],
        where: { Tipo_edificacion_categoria: tipo_edificacion_categoria },
        required: true, // INNER JOIN: solo inmuebles que tengan esta categoría
      });
    } else {
        // Si no se filtra por categoría, aún necesitamos el JOIN para el SELECT si lo deseas
        includeConditions.push({
            model: TipoEdificacion,
            as: 'tipoEdificacion',
            attributes: ['Tipo_edificacion_categoria'],
            required: false, // LEFT JOIN si solo se necesita la categoría en la salida
        });
    }


    // --- 2. Filtro por Motivo de Transacción ---
    if (motivo_transaccion) {
      if (typeof motivo_transaccion !== 'string' || motivo_transaccion.trim() === '') {
        return res.status(400).json({ message: 'El motivo de transacción debe ser una cadena no vacía.' });
      }
      whereConditions.Motivo_VoA = motivo_transaccion;
    }

    // --- 3. Filtro por Rango de Precio ---
    if (precio_min || precio_max) {
      whereConditions.Valor = {};
      if (precio_min !== undefined) {
        const minVal = parseFloat(precio_min);
        if (isNaN(minVal) || minVal < 0) {
          return res.status(400).json({ message: 'El precio mínimo debe ser un número positivo válido.' });
        }
        whereConditions.Valor[Op.gte] = minVal;
      }
      if (precio_max !== undefined) {
        const maxVal = parseFloat(precio_max);
        if (isNaN(maxVal) || maxVal < 0) {
          return res.status(400).json({ message: 'El precio máximo debe ser un número positivo válido.' });
        }
        whereConditions.Valor[Op.lte] = maxVal;
      }
    }

    // --- 4. Filtro por Rango de Área ---
    if (area_min || area_max) {
      whereConditions.Area = {};
      if (area_min !== undefined) {
        const minVal = parseFloat(area_min);
        if (isNaN(minVal) || minVal < 0) {
          return res.status(400).json({ message: 'El área mínima debe ser un número positivo válido.' });
        }
        whereConditions.Area[Op.gte] = minVal;
      }
      if (area_max !== undefined) {
        const maxVal = parseFloat(area_max);
        if (isNaN(maxVal) || maxVal < 0) {
          return res.status(400).json({ message: 'El área máxima debe ser un número positivo válido.' });
        }
        whereConditions.Area[Op.lte] = maxVal;
      }
    }

    // --- 5. Filtro por Antigüedad ---
    if (antiguedad) {
        if (typeof antiguedad !== 'string' || antiguedad.trim() === '') {
            return res.status(400).json({ message: 'El parámetro de antigüedad debe ser una cadena no vacía.' });
        }
        switch (antiguedad.toLowerCase()) {
            case 'nueva':
                whereConditions.Antiguedad = 0;
                break;
            case 'menos de 5 años':
                whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
                break;
            case '5-10 años':
                whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
                break;
            case 'mas de 10 años':
                whereConditions.Antiguedad = { [Op.gt]: 10 };
                break;
            default:
                const exactAntiguedad = parseInt(antiguedad, 10);
                if (isNaN(exactAntiguedad) || exactAntiguedad < 0) {
                    return res.status(400).json({ message: 'El valor de antigüedad no es válido o la categoría no es reconocida.' });
                }
                whereConditions.Antiguedad = exactAntiguedad;
                break;
        }
    }

    // --- 6. Filtro por Código Interno ---
    if (codigo_interno) {
      if (typeof codigo_interno !== 'string' || codigo_interno.trim() === '') {
        return res.status(400).json({ message: 'El código interno debe ser una cadena no vacía.' });
      }
      whereConditions.Codigo_interno = codigo_interno;
      // Nota: Si se especifica codigo_interno, la condición 'Estado: disponible' ya está en whereConditions.
    }

    const inmuebles = await Inmueble.findAll({
      where: whereConditions,
      include: includeConditions,
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles que coincidan con los filtros especificados.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles con filtros generales:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// Claro, aquí tienes los controladores para las consultas de filtrado por tipo de inmueble y características generales que me proporcionaste. Al igual que antes, voy a crear un archivo inmuebleGeneralFiltersController.js (o puedes integrarlo en tu inmuebleController.js existente si lo prefieres) que contenga todas estas funciones.

// Para que estos controladores funcionen correctamente con Sequelize, es crucial que tengas tus modelos definidos y las asociaciones necesarias configuradas. Especialmente, la relación entre Inmueble y TipoEdificacion es vital para el primer filtro y la consulta unificada.

// Controladores para Filtros Generales de Inmuebles
// JavaScript

// // controllers/inmuebleGeneralFiltersController.js

// import Inmueble from '../models/inmueble.js';         // Asegúrate de que esta ruta sea correcta
// import TipoEdificacion from '../models/tipo_edificacion.js'; // Asegúrate de que esta ruta sea correcta
// import { Op } from 'sequelize'; // Para usar operadores como Op.gte, Op.lte, Op.or, etc.

// /**
//  * @function getInmueblesByEdificacionType
//  * @description Obtiene inmuebles filtrados por la categoría de tipo de edificación.
//  * Corresponde a la consulta SQL "1. Inmuebles por Tipo de Edificación".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `tipo_edificacion_categoria` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByEdificacionType(req, res) {
//   try {
//     const { tipo_edificacion_categoria } = req.query;

//     if (!tipo_edificacion_categoria || typeof tipo_edificacion_categoria !== 'string' || tipo_edificacion_categoria.trim() === '') {
//       return res.status(400).json({ message: 'La categoría de edificación es requerida y debe ser una cadena no vacía.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         Estado: 'disponible',
//         '$tipoEdificacion.Tipo_edificacion_categoria$': tipo_edificacion_categoria,
//       },
//       include: [{
//         model: TipoEdificacion,
//         as: 'tipoEdificacion', // Alias de la relación definido en el modelo Inmueble
//         attributes: ['Tipo_edificacion_categoria'],
//       }],
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles para la categoría de edificación especificada.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por tipo de edificación:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByTransactionMotivo
//  * @description Obtiene inmuebles filtrados por el motivo de transacción (Venta/Arriendo/Anticrético).
//  * Corresponde a la consulta SQL "2. Inmuebles por Motivo de Transacción".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `motivo_transaccion` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByTransactionMotivo(req, res) {
//   try {
//     const { motivo_transaccion } = req.query;

//     if (!motivo_transaccion || typeof motivo_transaccion !== 'string' || motivo_transaccion.trim() === '') {
//       return res.status(400).json({ message: 'El motivo de transacción es requerido y debe ser una cadena no vacía.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         Estado: 'disponible',
//         Motivo_VoA: motivo_transaccion,
//       },
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el motivo de transacción especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por motivo de transacción:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByPriceRange
//  * @description Obtiene inmuebles filtrados por un rango de precio (mínimo y/o máximo).
//  * Corresponde a la consulta SQL "3. Inmuebles por Rango de Precio".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `precio_min` y `precio_max` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByPriceRange(req, res) {
//   try {
//     const { precio_min, precio_max } = req.query;

//     const whereConditions = {
//       Estado: 'disponible',
//     };

//     if (precio_min !== undefined) {
//       const minVal = parseFloat(precio_min);
//       if (isNaN(minVal) || minVal < 0) {
//         return res.status(400).json({ message: 'El precio mínimo debe ser un número positivo válido.' });
//       }
//       whereConditions.Valor = { [Op.gte]: minVal };
//     }

//     if (precio_max !== undefined) {
//       const maxVal = parseFloat(precio_max);
//       if (isNaN(maxVal) || maxVal < 0) {
//         return res.status(400).json({ message: 'El precio máximo debe ser un número positivo válido.' });
//       }
//       whereConditions.Valor = { ...whereConditions.Valor, [Op.lte]: maxVal };
//     }

//     // Si no se proporcionó ningún rango, puedes decidir si devolver un error o todos los disponibles
//     if (precio_min === undefined && precio_max === undefined) {
//       return res.status(400).json({ message: 'Debe especificar al menos un precio mínimo o máximo.' });
//     }
    
//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el rango de precio especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por rango de precio:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByAreaRange
//  * @description Obtiene inmuebles filtrados por un rango de área (mínimo y/o máximo).
//  * Corresponde a la consulta SQL "4. Inmuebles por Rango de Área".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `area_min` y `area_max` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByAreaRange(req, res) {
//   try {
//     const { area_min, area_max } = req.query;

//     const whereConditions = {
//       Estado: 'disponible',
//     };

//     if (area_min !== undefined) {
//       const minVal = parseFloat(area_min);
//       if (isNaN(minVal) || minVal < 0) {
//         return res.status(400).json({ message: 'El área mínima debe ser un número positivo válido.' });
//       }
//       whereConditions.Area = { [Op.gte]: minVal };
//     }

//     if (area_max !== undefined) {
//       const maxVal = parseFloat(area_max);
//       if (isNaN(maxVal) || maxVal < 0) {
//         return res.status(400).json({ message: 'El área máxima debe ser un número positivo válido.' });
//       }
//       whereConditions.Area = { ...whereConditions.Area, [Op.lte]: maxVal };
//     }

//     if (area_min === undefined && area_max === undefined) {
//         return res.status(400).json({ message: 'Debe especificar al menos un área mínima o máxima.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el rango de área especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por rango de área:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByAntiguedad
//  * @description Obtiene inmuebles filtrados por antigüedad, manejando categorías como "Nueva" o rangos.
//  * Corresponde a la consulta SQL "5. Inmuebles por Antigüedad".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `antiguedad` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByAntiguedad(req, res) {
//   try {
//     const { antiguedad } = req.query;

//     if (!antiguedad || typeof antiguedad !== 'string' || antiguedad.trim() === '') {
//       return res.status(400).json({ message: 'El parámetro de antigüedad es requerido y debe ser una cadena no vacía.' });
//     }

//     const whereConditions = {
//       Estado: 'disponible',
//     };

//     switch (antiguedad.toLowerCase()) {
//       case 'nueva':
//         whereConditions.Antiguedad = 0;
//         break;
//       case 'menos de 5 años':
//         whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
//         break;
//       case '5-10 años':
//         whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
//         break;
//       case 'mas de 10 años':
//         whereConditions.Antiguedad = { [Op.gt]: 10 };
//         break;
//       default:
//         // Si no coincide con las categorías, intenta parsear como un número exacto
//         const exactAntiguedad = parseInt(antiguedad, 10);
//         if (isNaN(exactAntiguedad) || exactAntiguedad < 0) {
//           return res.status(400).json({ message: 'El valor de antigüedad no es válido o la categoría no es reconocida.' });
//         }
//         whereConditions.Antiguedad = exactAntiguedad;
//         break;
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles con la antigüedad especificada.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por antigüedad:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByStatus
//  * @description Obtiene inmuebles filtrados por su estado (ej. 'disponible', 'vendido').
//  * Corresponde a la consulta SQL "6. Inmuebles por Estado del Inmueble".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `estado_inmueble` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByStatus(req, res) {
//   try {
//     const { estado_inmueble } = req.query;

//     if (!estado_inmueble || typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
//       return res.status(400).json({ message: 'El estado del inmueble es requerido y debe ser una cadena no vacía.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         Estado: estado_inmueble,
//       },
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles con el estado especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por estado:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesByInternalCode
//  * @description Obtiene inmuebles filtrados por su código interno.
//  * Corresponde a la consulta SQL "7. Inmuebles por Código Interno".
//  * @param {Object} req - Objeto de solicitud de Express. Espera `codigo_interno` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByInternalCode(req, res) {
//   try {
//     const { codigo_interno } = req.query;

//     if (!codigo_interno || typeof codigo_interno !== 'string' || codigo_interno.trim() === '') {
//       return res.status(400).json({ message: 'El código interno del inmueble es requerido y debe ser una cadena no vacía.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         // Puedes quitar 'Estado: 'disponible'' aquí si quieres buscar sin importar el estado
//         Estado: 'disponible',
//         Codigo_interno: codigo_interno,
//       },
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontró un inmueble disponible con el código interno especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por código interno:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// /**
//  * @function getInmueblesWithAllGeneralFilters
//  * @description Controlador unificado para obtener inmuebles aplicando todos los filtros generales de forma opcional.
//  * Corresponde a la "Consulta SQL Unificada para Filtros Generales de Inmuebles".
//  * @param {Object} req - Objeto de solicitud de Express. Espera parámetros como `estado_inmueble`,
//  * `tipo_edificacion_categoria`, `motivo_transaccion`, `precio_min`, `precio_max`,
//  * `area_min`, `area_max`, `antiguedad`, `codigo_interno` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesWithAllGeneralFilters(req, res) {
//   try {
//     const {
//       estado_inmueble,
//       tipo_edificacion_categoria,
//       motivo_transaccion,
//       precio_min,
//       precio_max,
//       area_min,
//       area_max,
//       antiguedad,
//       codigo_interno,
//     } = req.query;

//     const whereConditions = {};
//     let includeConditions = [];

//     // --- Filtro base: Estado del inmueble (opcional, por defecto 'disponible') ---
//     if (estado_inmueble) {
//       if (typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
//         return res.status(400).json({ message: 'El estado del inmueble debe ser una cadena no vacía.' });
//       }
//       whereConditions.Estado = estado_inmueble;
//     } else {
//       whereConditions.Estado = 'disponible'; // Valor por defecto si no se especifica
//     }

//     // --- 1. Filtro por Tipo de Edificación (Categoría) ---
//     if (tipo_edificacion_categoria) {
//       if (typeof tipo_edificacion_categoria !== 'string' || tipo_edificacion_categoria.trim() === '') {
//         return res.status(400).json({ message: 'La categoría de edificación debe ser una cadena no vacía.' });
//       }
//       includeConditions.push({
//         model: TipoEdificacion,
//         as: 'tipoEdificacion',
//         attributes: ['Tipo_edificacion_categoria'],
//         where: { Tipo_edificacion_categoria: tipo_edificacion_categoria },
//         required: true, // INNER JOIN: solo inmuebles que tengan esta categoría
//       });
//     } else {
//         // Si no se filtra por categoría, aún necesitamos el JOIN para el SELECT si lo deseas
//         includeConditions.push({
//             model: TipoEdificacion,
//             as: 'tipoEdificacion',
//             attributes: ['Tipo_edificacion_categoria'],
//             required: false, // LEFT JOIN si solo se necesita la categoría en la salida
//         });
//     }


//     // --- 2. Filtro por Motivo de Transacción ---
//     if (motivo_transaccion) {
//       if (typeof motivo_transaccion !== 'string' || motivo_transaccion.trim() === '') {
//         return res.status(400).json({ message: 'El motivo de transacción debe ser una cadena no vacía.' });
//       }
//       whereConditions.Motivo_VoA = motivo_transaccion;
//     }

//     // --- 3. Filtro por Rango de Precio ---
//     if (precio_min || precio_max) {
//       whereConditions.Valor = {};
//       if (precio_min !== undefined) {
//         const minVal = parseFloat(precio_min);
//         if (isNaN(minVal) || minVal < 0) {
//           return res.status(400).json({ message: 'El precio mínimo debe ser un número positivo válido.' });
//         }
//         whereConditions.Valor[Op.gte] = minVal;
//       }
//       if (precio_max !== undefined) {
//         const maxVal = parseFloat(precio_max);
//         if (isNaN(maxVal) || maxVal < 0) {
//           return res.status(400).json({ message: 'El precio máximo debe ser un número positivo válido.' });
//         }
//         whereConditions.Valor[Op.lte] = maxVal;
//       }
//     }

//     // --- 4. Filtro por Rango de Área ---
//     if (area_min || area_max) {
//       whereConditions.Area = {};
//       if (area_min !== undefined) {
//         const minVal = parseFloat(area_min);
//         if (isNaN(minVal) || minVal < 0) {
//           return res.status(400).json({ message: 'El área mínima debe ser un número positivo válido.' });
//         }
//         whereConditions.Area[Op.gte] = minVal;
//       }
//       if (area_max !== undefined) {
//         const maxVal = parseFloat(area_max);
//         if (isNaN(maxVal) || maxVal < 0) {
//           return res.status(400).json({ message: 'El área máxima debe ser un número positivo válido.' });
//         }
//         whereConditions.Area[Op.lte] = maxVal;
//       }
//     }

//     // --- 5. Filtro por Antigüedad ---
//     if (antiguedad) {
//         if (typeof antiguedad !== 'string' || antiguedad.trim() === '') {
//             return res.status(400).json({ message: 'El parámetro de antigüedad debe ser una cadena no vacía.' });
//         }
//         switch (antiguedad.toLowerCase()) {
//             case 'nueva':
//                 whereConditions.Antiguedad = 0;
//                 break;
//             case 'menos de 5 años':
//                 whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
//                 break;
//             case '5-10 años':
//                 whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
//                 break;
//             case 'mas de 10 años':
//                 whereConditions.Antiguedad = { [Op.gt]: 10 };
//                 break;
//             default:
//                 const exactAntiguedad = parseInt(antiguedad, 10);
//                 if (isNaN(exactAntiguedad) || exactAntiguedad < 0) {
//                     return res.status(400).json({ message: 'El valor de antigüedad no es válido o la categoría no es reconocida.' });
//                 }
//                 whereConditions.Antiguedad = exactAntiguedad;
//                 break;
//         }
//     }

//     // --- 6. Filtro por Código Interno ---
//     if (codigo_interno) {
//       if (typeof codigo_interno !== 'string' || codigo_interno.trim() === '') {
//         return res.status(400).json({ message: 'El código interno debe ser una cadena no vacía.' });
//       }
//       whereConditions.Codigo_interno = codigo_interno;
//       // Nota: Si se especifica codigo_interno, la condición 'Estado: disponible' ya está en whereConditions.
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//       include: includeConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles que coincidan con los filtros especificados.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles con filtros generales:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }
// Configuración de Modelos (Esenciales)
// Para que estos controladores funcionen, tus modelos de Sequelize deben estar configurados correctamente con sus asociaciones. Aquí un ejemplo mínimo para Inmueble y TipoEdificacion:

// JavaScript

// // models/inmueble.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js'; // Tu archivo de configuración de Sequelize
// import TipoEdificacion from './tipo_edificacion.js'; // Asegúrate de importar tu modelo TipoEdificacion

// const Inmueble = sequelize.define('Inmueble', {
//   Inmueble_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Valor: { type: DataTypes.DECIMAL(10, 2) },
//   Area: { type: DataTypes.DECIMAL(10, 2) },
//   Descripcion_General: { type: DataTypes.TEXT },
//   Motivo_VoA: { type: DataTypes.STRING(255) },
//   Estado: { type: DataTypes.STRING(50) },
//   Codigo_interno: { type: DataTypes.STRING(100) },
//   Antiguedad: { type: DataTypes.INTEGER }, // Asegúrate de que esta columna exista
//   Tipo_edificacion_FK: { type: DataTypes.INTEGER, allowNull: false }, // Clave foránea
// }, {
//   tableName: 'inmueble',
//   timestamps: false,
// });

// // Asociación: Un inmueble pertenece a un TipoEdificacion
// Inmueble.belongsTo(TipoEdificacion, { foreignKey: 'Tipo_edificacion_FK', as: 'tipoEdificacion' });

// export default Inmueble;

// // models/tipo_edificacion.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';

// const TipoEdificacion = sequelize.define('TipoEdificacion', {
//   Tipo_edificacion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Tipo_edificacion_categoria: { type: DataTypes.STRING(100), allowNull: false },
//   // ... otras columnas de tipo_edificacion
// }, {
//   tableName: 'tipo_edificacion',
//   timestamps: false,
// });

// // Asociación inversa (opcional pero buena práctica): Un TipoEdificacion puede tener muchos Inmuebles
// TipoEdificacion.hasMany(Inmueble, { foreignKey: 'Tipo_edificacion_FK', as: 'inmuebles' });

// export default TipoEdificacion;
// Configuración de Rutas
// Finalmente, en tu archivo de rutas (ej. routes/inmuebles.js o routes/index.js), importarías y asignarías estos controladores a sus respectivas rutas:

// JavaScript

// // routes/inmuebles.js
// import express from 'express';
// import {
//   getInmueblesByEdificacionType,
//   getInmueblesByTransactionMotivo,
//   getInmueblesByPriceRange,
//   getInmueblesByAreaRange,
//   getInmueblesByAntiguedad,
//   getInmueblesByStatus,
//   getInmueblesByInternalCode,
//   getInmueblesWithAllGeneralFilters
// } from '../controllers/inmuebleGeneralFiltersController.js'; // Ajusta la ruta

// const router = express.Router();

// // Rutas para cada filtro individual (puedes agruparlos o usar solo la unificada)
// router.get('/inmuebles/by-edificacion-type', getInmueblesByEdificacionType);
// router.get('/inmuebles/by-transaction-motivo', getInmueblesByTransactionMotivo);
// router.get('/inmuebles/by-price-range', getInmueblesByPriceRange);
// router.get('/inmuebles/by-area-range', getInmueblesByAreaRange);
// router.get('/inmuebles/by-antiguedad', getInmueblesByAntiguedad);
// router.get('/inmuebles/by-status', getInmueblesByStatus);
// router.get('/inmuebles/by-internal-code', getInmueblesByInternalCode);

// // Ruta unificada para todos los filtros generales (la más flexible)
// router.get('/inmuebles/general-filters', getInmueblesWithAllGeneralFilters);


// export default router;
// Recomendación: Para la mayoría de los casos de uso, el controlador getInmueblesWithAllGeneralFilters (el último) es el más práctico, ya que permite combinar todos los filtros en una sola solicitud, ofreciendo la mayor flexibilidad a tus usuarios o interfaz de administración.

// ¿Hay alguna otra categoría de filtros que te gustaría implementar o alguna otra duda que tengas?