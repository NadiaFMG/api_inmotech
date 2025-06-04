// controllers/inmuebleLocationFiltersController.js

import Inmueble from '../models/inmueble.js';
import Direccion from '../models/direccion.js';
import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
import Barrio from '../models/barrio.js';
import Ciudad from '../models/ciudad.js';
import Corregimiento from '../models/corregimiento.js';
import Vereda from '../models/vereda.js';
import Municipio from '../models/municipio.js';
import Ndap from '../models/ndap.js'; // Ndap = Departamento/Provincia
import DesignadorCardinal from '../models/designador_cardinal.js';
import Localizacion from '../models/localizacion.js';
import { Op, Sequelize } from 'sequelize'; // Op para operadores de Sequelize, Sequelize para funciones de SQL como literal, col, fn, etc.

// --- 1. Inmuebles por Departamento/Provincia (Ndap_id) ---
export async function getInmueblesByDepartment(req, res) {
  try {
    const { ndap_id } = req.query;

    if (!ndap_id) {
      return res.status(400).json({ message: 'El ID del departamento (Ndap_id) es requerido.' });
    }
    const parsedNdapId = parseInt(ndap_id, 10);
    if (isNaN(parsedNdapId)) {
      return res.status(400).json({ message: 'El ID del departamento debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Ciudad, as: 'ciudadInfo', required: false,
            include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
          }, {
            model: Corregimiento, as: 'corregimientoInfo', required: false,
            include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
          }, {
            model: Vereda, as: 'veredaInfo', required: false,
            include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el departamento especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por departamento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 2. Inmuebles por Municipio (Municipio_id) ---
export async function getInmueblesByMunicipality(req, res) {
  try {
    const { municipio_id } = req.query;

    if (!municipio_id) {
      return res.status(400).json({ message: 'El ID del municipio es requerido.' });
    }
    const parsedMunicipioId = parseInt(municipio_id, 10);
    if (isNaN(parsedMunicipioId)) {
      return res.status(400).json({ message: 'El ID del municipio debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Ciudad, as: 'ciudadInfo', required: false,
            where: { '$ciudadInfo.Municipio_FK$': parsedMunicipioId }
          }, {
            model: Corregimiento, as: 'corregimientoInfo', required: false,
            where: { '$corregimientoInfo.Municipio_FK$': parsedMunicipioId }
          }, {
            model: Vereda, as: 'veredaInfo', required: false,
            where: { '$veredaInfo.Municipio_FK$': parsedMunicipioId }
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el municipio especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por municipio:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 3. Inmuebles por Ciudad (Ciudad_id) ---
export async function getInmueblesByCity(req, res) {
  try {
    const { ciudad_id } = req.query;

    if (!ciudad_id) {
      return res.status(400).json({ message: 'El ID de la ciudad es requerido.' });
    }
    const parsedCiudadId = parseInt(ciudad_id, 10);
    if (isNaN(parsedCiudadId)) {
      return res.status(400).json({ message: 'El ID de la ciudad debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Ciudad, as: 'ciudadInfo',
            where: { Ciudad_id: parsedCiudadId }
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en la ciudad especificada.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por ciudad:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 4. Inmuebles por Corregimiento (Corregimiento_id) ---
export async function getInmueblesByCorregimiento(req, res) {
  try {
    const { corregimiento_id } = req.query;

    if (!corregimiento_id) {
      return res.status(400).json({ message: 'El ID del corregimiento es requerido.' });
    }
    const parsedCorregimientoId = parseInt(corregimiento_id, 10);
    if (isNaN(parsedCorregimientoId)) {
      return res.status(400).json({ message: 'El ID del corregimiento debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Corregimiento, as: 'corregimientoInfo',
            where: { Corregimiento_id: parsedCorregimientoId }
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el corregimiento especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por corregimiento:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 5. Inmuebles por Vereda (Vereda_id) ---
export async function getInmueblesByVereda(req, res) {
  try {
    const { vereda_id } = req.query;

    if (!vereda_id) {
      return res.status(400).json({ message: 'El ID de la vereda es requerido.' });
    }
    const parsedVeredaId = parseInt(vereda_id, 10);
    if (isNaN(parsedVeredaId)) {
      return res.status(400).json({ message: 'El ID de la vereda debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Vereda, as: 'veredaInfo',
            where: { Vereda_id: parsedVeredaId }
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en la vereda especificada.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por vereda:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 6. Inmuebles por Barrio (Barrio_id) ---
export async function getInmueblesByBarrio(req, res) {
  try {
    const { barrio_id } = req.query;

    if (!barrio_id) {
      return res.status(400).json({ message: 'El ID del barrio es requerido.' });
    }
    const parsedBarrioId = parseInt(barrio_id, 10);
    if (isNaN(parsedBarrioId)) {
      return res.status(400).json({ message: 'El ID del barrio debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
          include: [{
            model: Barrio, as: 'barrioInfo',
            where: { Barrio_id: parsedBarrioId }
          }]
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el barrio especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por barrio:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 7. Búsqueda por Radio/Proximidad (Latitud/Longitud) ---
export async function getInmueblesByProximity(req, res) {
  try {
    const { latitud_centro, longitud_centro, radio_km } = req.query;

    if (!latitud_centro || !longitud_centro || !radio_km) {
      return res.status(400).json({ message: 'Latitud, longitud del centro y radio en kilómetros son requeridos.' });
    }

    const latitud = parseFloat(latitud_centro);
    const longitud = parseFloat(longitud_centro);
    const radio = parseFloat(radio_km);

    if (isNaN(latitud) || isNaN(longitud) || isNaN(radio) || radio <= 0) {
      return res.status(400).json({ message: 'Latitud, longitud y radio deben ser números válidos y el radio debe ser positivo.' });
    }

    // Fórmula de Haversine para calcular la distancia en km
    const distanceFormula = Sequelize.literal(`
      (6371 * acos(
        cos(radians(${latitud})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud}))
        + sin(radians(${latitud})) * sin(radians(Localizacion.Latitud))
      ))
    `);

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      attributes: {
        include: [
          [distanceFormula, 'distancia_km']
        ]
      },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: Localizacion, as: 'localizacionInfo', // Alias de la relación en el modelo Direccion
          where: {
            Latitud: { [Op.ne]: null },
            Longitud: { [Op.ne]: null }
          },
          required: true // INNER JOIN, solo si tienen lat/lon
        }]
      }],
      having: Sequelize.literal(`distancia_km <= ${radio}`),
      order: [[Sequelize.literal('distancia_km'), 'ASC']]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles dentro del radio especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por proximidad:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 8. Inmuebles por Tipo de Vía y Número Específico ---
export async function getInmueblesByFullAddress(req, res) {
  try {
    const { tipo_via, numero_via_principal, numero_calle_transversal, numero_edificacion } = req.query;

    if (!tipo_via || !numero_via_principal || !numero_calle_transversal || !numero_edificacion) {
      return res.status(400).json({ message: 'Tipo de vía, número de vía principal, número de calle transversal y número de edificación son requeridos.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        where: {
          Tipo_via: tipo_via,
          Numero_via_principal: numero_via_principal,
          Numero_calle_transversal: numero_calle_transversal,
          Numero_edificacion: numero_edificacion,
        },
        required: true
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles con la dirección especificada.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por dirección completa:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 9. Inmuebles por Designador Cardinal (Designador_cardinal_id) ---
export async function getInmueblesByCardinalDesignator(req, res) {
  try {
    const { designador_cardinal_id } = req.query;

    if (!designador_cardinal_id) {
      return res.status(400).json({ message: 'El ID del designador cardinal es requerido.' });
    }
    const parsedCardinalId = parseInt(designador_cardinal_id, 10);
    if (isNaN(parsedCardinalId)) {
      return res.status(400).json({ message: 'El ID del designador cardinal debe ser un número válido.' });
    }

    const inmuebles = await Inmueble.findAll({
      where: { Estado: 'disponible' },
      include: [{
        model: Direccion, as: 'direccionInfo',
        include: [{
          model: DesignadorCardinal, as: 'designadorCardinalInfo',
          where: { Designador_cardinal_id: parsedCardinalId }
        }]
      }]
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles disponibles con el designador cardinal especificado.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles por designador cardinal:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// --- 10. Consulta SQL Unificada para Filtros de Ubicación de Inmuebles ---
export async function getInmueblesWithUnifiedLocationFilters(req, res) {
  try {
    const {
      estado_inmueble,
      ndap_id,
      municipio_id,
      ubicacion_especifica_id, // Puede ser Ciudad, Corregimiento, Vereda, Barrio
      tipo_ubicacion,           // 'ciudad', 'corregimiento', 'vereda', 'barrio'
      tipo_via,
      numero_via_principal,
      numero_calle_transversal,
      numero_edificacion,
      designador_cardinal_id,
      latitud_centro,
      longitud_centro,
      radio_km,
    } = req.query;

    const whereConditions = {};
    let includeConditions = [
      {
        model: Direccion,
        as: 'direccionInfo',
        required: true, // INNER JOIN: todo inmueble debe tener una dirección
        include: [
          {
            model: BarrioCiudadCorregimientoVereda,
            as: 'bccvInfo',
            required: true,
            include: [
              { model: Barrio, as: 'barrioInfo', required: false },
              { model: Ciudad, as: 'ciudadInfo', required: false },
              { model: Corregimiento, as: 'corregimientoInfo', required: false },
              { model: Vereda, as: 'veredaInfo', required: false },
            ],
          },
          { model: DesignadorCardinal, as: 'designadorCardinalInfo', required: false },
          { model: Localizacion, as: 'localizacionInfo', required: false },
        ],
      },
      // JOINs a Municipio y Ndap se manejan en el nivel superior para aplicar filtros
      // de forma más flexible, o dentro de las inclusiones de bccvInfo.
      // Para la consulta unificada, es más limpio hacer los joins necesarios de manera explícita
      // y luego usar Sequelize.literal o acceder a través de los alias.
    ];

    // Para la jerarquía de ubicación, necesitamos joins más complejos
    // Creamos una inclusión para Municipio y Ndap de forma flexible
    const municipioInclude = {
      model: Municipio,
      as: 'municipioInfo',
      required: false, // LEFT JOIN
      include: [
        { model: Ndap, as: 'departamentoInfo', required: false } // LEFT JOIN
      ]
    };
    // Añadimos municipio a las inclusiones de ciudad, corregimiento, vereda dentro de bccvInfo
    // Esto se complica mucho con Sequelize al hacer includes anidados de esta forma para un OR en el JOIN
    // La mejor estrategia para la UNIFICADA es quizás usar `sequelize.literal` o raw queries
    // para las condiciones de JOIN complejas que involucran OR, o refactorizar el modelo de Bccv
    // para tener una FK directa a Municipio.

    // Aclaremos los joins para la unificada:
    // Inmueble -> Direccion -> BarrioCiudadCorregimientoVereda (bccv)
    // bccv -> Barrio (LEFT)
    // bccv -> Ciudad (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)
    // bccv -> Corregimiento (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)
    // bccv -> Vereda (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)

    // Para manejar esto en Sequelize sin generar JOINs cartesianos o complejos,
    // es mejor tener las relaciones directas donde sea posible.

    // Reiniciaremos las inclusiones para la consulta unificada para manejar la complejidad.
    // Esto es un desafío en Sequelize con la estructura de bccv vinculada a Ciudad, Corregimiento, Vereda,
    // que a su vez se vinculan a Municipio. La forma más limpia es hacer los JOINS directamente
    // en la consulta SQL y usar `Sequelize.literal` para las condiciones.

    // --- Filtro base: Estado del inmueble (opcional, por defecto 'disponible') ---
    if (estado_inmueble) {
      if (typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
        return res.status(400).json({ message: 'El estado del inmueble debe ser una cadena no vacía.' });
      }
      whereConditions.Estado = estado_inmueble;
    } else {
      whereConditions.Estado = 'disponible';
    }

    // --- Filtro por Departamento (Ndap_id) ---
    if (ndap_id) {
      const parsedNdapId = parseInt(ndap_id, 10);
      if (isNaN(parsedNdapId)) {
        return res.status(400).json({ message: 'El ID del departamento debe ser un número válido.' });
      }
      // Necesitamos asegurar que el JOIN a Ndap se realice para esta condición
      includeConditions[0].include[0].include.push(
        { model: Ciudad, as: 'ciudadInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.ciudadInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] },
        { model: Corregimiento, as: 'corregimientoInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.corregimientoInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] },
        { model: Vereda, as: 'veredaInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.veredaInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] }
      );
    }

    // --- Filtro por Municipio (Municipio_id) ---
    if (municipio_id) {
      const parsedMunicipioId = parseInt(municipio_id, 10);
      if (isNaN(parsedMunicipioId)) {
        return res.status(400).json({ message: 'El ID del municipio debe ser un número válido.' });
      }
      // Añadimos condiciones directamente a las relaciones de ciudad, corregimiento, vereda
      includeConditions[0].include[0].include.push(
        { model: Ciudad, as: 'ciudadInfo', required: false, where: { '$direccionInfo.bccvInfo.ciudadInfo.Municipio_FK$': parsedMunicipioId } },
        { model: Corregimiento, as: 'corregimientoInfo', required: false, where: { '$direccionInfo.bccvInfo.corregimientoInfo.Municipio_FK$': parsedMunicipioId } },
        { model: Vereda, as: 'veredaInfo', required: false, where: { '$direccionInfo.bccvInfo.veredaInfo.Municipio_FK$': parsedMunicipioId } }
      );
    }

    // --- Filtro por Ubicación Específica (Ciudad, Corregimiento, Vereda, Barrio) ---
    if (ubicacion_especifica_id && tipo_ubicacion) {
      const parsedUbicacionId = parseInt(ubicacion_especifica_id, 10);
      if (isNaN(parsedUbicacionId)) {
        return res.status(400).json({ message: 'El ID de la ubicación específica debe ser un número válido.' });
      }

      let specificLocationCondition = {};
      switch (tipo_ubicacion.toLowerCase()) {
        case 'ciudad':
          specificLocationCondition = { model: Ciudad, as: 'ciudadInfo', where: { Ciudad_id: parsedUbicacionId }, required: true };
          break;
        case 'corregimiento':
          specificLocationCondition = { model: Corregimiento, as: 'corregimientoInfo', where: { Corregimiento_id: parsedUbicacionId }, required: true };
          break;
        case 'vereda':
          specificLocationCondition = { model: Vereda, as: 'veredaInfo', where: { Vereda_id: parsedUbicacionId }, required: true };
          break;
        case 'barrio':
          specificLocationCondition = { model: Barrio, as: 'barrioInfo', where: { Barrio_id: parsedUbicacionId }, required: true };
          break;
        default:
          return res.status(400).json({ message: 'Tipo de ubicación no reconocido.' });
      }
      // Añadir la condición de ubicación específica a la inclusión de bccvInfo
      includeConditions[0].include[0].include.push(specificLocationCondition);
    }

    // --- Filtro por Tipo de Vía y Número Específico ---
    if (tipo_via || numero_via_principal || numero_calle_transversal || numero_edificacion) {
      if (!tipo_via || !numero_via_principal || !numero_calle_transversal || !numero_edificacion) {
        return res.status(400).json({ message: 'Para el filtro de dirección completa, todos los campos (tipo de vía, números) son requeridos.' });
      }
      includeConditions[0].where = {
        Tipo_via: tipo_via,
        Numero_via_principal: numero_via_principal,
        Numero_calle_transversal: numero_calle_transversal,
        Numero_edificacion: numero_edificacion,
      };
      includeConditions[0].required = true; // INNER JOIN para asegurar que la dirección coincida
    }

    // --- Filtro por Designador Cardinal (Designador_cardinal_id) ---
    if (designador_cardinal_id) {
      const parsedCardinalId = parseInt(designador_cardinal_id, 10);
      if (isNaN(parsedCardinalId)) {
        return res.status(400).json({ message: 'El ID del designador cardinal debe ser un número válido.' });
      }
      // Añadimos la condición directamente a la inclusión de DesignadorCardinal
      includeConditions[0].include[1].where = { Designador_cardinal_id: parsedCardinalId };
      includeConditions[0].include[1].required = true; // INNER JOIN
    }

    let havingCondition = null;
    let orderConditions = [['Fecha_publicacion', 'DESC']]; // Orden por defecto

    // --- Filtro por Radio/Proximidad (Latitud/Longitud) ---
    if (latitud_centro && longitud_centro && radio_km) {
      const latitud = parseFloat(latitud_centro);
      const longitud = parseFloat(longitud_centro);
      const radio = parseFloat(radio_km);

      if (isNaN(latitud) || isNaN(longitud) || isNaN(radio) || radio <= 0) {
        return res.status(400).json({ message: 'Latitud, longitud del centro y radio deben ser números válidos y el radio debe ser positivo para la búsqueda por proximidad.' });
      }

      // Asegurar que Localizacion esté incluido y sus campos no sean nulos
      const localizacionIncludeIndex = includeConditions[0].include.findIndex(inc => inc.model === Localizacion);
      if (localizacionIncludeIndex !== -1) {
          includeConditions[0].include[localizacionIncludeIndex].required = true;
          includeConditions[0].include[localizacionIncludeIndex].where = {
              Latitud: { [Op.ne]: null },
              Longitud: { [Op.ne]: null }
          };
      } else {
          // Si por alguna razón no está, lo añadimos
          includeConditions[0].include.push({
              model: Localizacion,
              as: 'localizacionInfo',
              required: true,
              where: { Latitud: { [Op.ne]: null }, Longitud: { [Op.ne]: null } }
          });
      }

      const distanceFormula = Sequelize.literal(`
        (6371 * acos(
          cos(radians(${latitud})) * cos(radians("direccionInfo"."localizacionInfo"."Latitud")) * cos(radians("direccionInfo"."localizacionInfo"."Longitud") - radians(${longitud}))
          + sin(radians(${latitud})) * sin(radians("direccionInfo"."localizacionInfo"."Latitud"))
        ))
      `);

      havingCondition = Sequelize.literal(`distancia_km <= ${radio}`);
      orderConditions = [[Sequelize.literal('distancia_km'), 'ASC'], ...orderConditions]; // Ordena por distancia y luego por fecha
    }

    const inmuebles = await Inmueble.findAll({
      where: whereConditions,
      attributes: {
        include: [
          // Incluye información de dirección y ubicación para la salida
          [Sequelize.col('direccionInfo.Direccion'), 'DireccionCompleta'],
          [Sequelize.col('direccionInfo.Tipo_via'), 'Tipo_via'],
          [Sequelize.col('direccionInfo.Numero_via_principal'), 'Numero_via_principal'],
          [Sequelize.col('direccionInfo.Numero_calle_transversal'), 'Numero_calle_transversal'],
          [Sequelize.col('direccionInfo.Numero_edificacion'), 'Numero_edificacion'],
          [Sequelize.col('direccionInfo.Descripcion_adicional'), 'DireccionAdicional'],
          [Sequelize.col('direccionInfo.designadorCardinalInfo.Cardinalidad'), 'DesignadorCardinal_Abreviacion'],
          [Sequelize.col('direccionInfo.localizacionInfo.Latitud'), 'Latitud'],
          [Sequelize.col('direccionInfo.localizacionInfo.Longitud'), 'Longitud'],
          [Sequelize.col('direccionInfo.localizacionInfo.Localizacion_descripcion'), 'DescripcionLocalizacion'],
          [Sequelize.literal(`COALESCE(
              "direccionInfo"."bccvInfo"."barrioInfo"."Nombre_barrio",
              "direccionInfo"."bccvInfo"."ciudadInfo"."Ciudad",
              "direccionInfo"."bccvInfo"."corregimientoInfo"."Corregimiento",
              "direccionInfo"."bccvInfo"."veredaInfo"."Vereda_nombre"
            )`), 'NombreUbicacionEspecifica'],
          // Para municipio y departamento, se necesitan joins más complejos o subconsultas si no hay una relación directa y limpia desde Inmueble.
          // Aquí estamos asumiendo que el municipio y ndap se pueden inferir de ciudad/corregimiento/vereda.
        ]
      },
      include: includeConditions,
      having: havingCondition,
      order: orderConditions,
    });

    if (inmuebles.length > 0) {
      res.json(inmuebles);
    } else {
      res.status(404).json({ message: 'No se encontraron inmuebles que coincidan con los filtros de ubicación especificados.' });
    }
  } catch (error) {
    console.error('Error al obtener inmuebles con filtros de ubicación unificados:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
}

// ¡Excelente! Ahora vamos a transformar esas consultas SQL de ubicación en controladores de Express usando Sequelize. Dada la complejidad de las uniones (JOINs) para los filtros de ubicación, especialmente en la consulta unificada, es crucial que tus modelos de Sequelize estén definidos con todas las asociaciones (relaciones) correctamente configuradas y con sus respectivos alias (as).

// Crearé un nuevo archivo de controlador, por ejemplo, inmuebleLocationFiltersController.js, para mantener estos filtros de ubicación separados y organizados.

// Controladores para Filtros de Ubicación de Inmuebles
// JavaScript

// // controllers/inmuebleLocationFiltersController.js

// import Inmueble from '../models/inmueble.js';
// import Direccion from '../models/direccion.js';
// import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
// import Barrio from '../models/barrio.js';
// import Ciudad from '../models/ciudad.js';
// import Corregimiento from '../models/corregimiento.js';
// import Vereda from '../models/vereda.js';
// import Municipio from '../models/municipio.js';
// import Ndap from '../models/ndap.js'; // Ndap = Departamento/Provincia
// import DesignadorCardinal from '../models/designador_cardinal.js';
// import Localizacion from '../models/localizacion.js';
// import { Op, Sequelize } from 'sequelize'; // Op para operadores de Sequelize, Sequelize para funciones de SQL como literal, col, fn, etc.

// // --- 1. Inmuebles por Departamento/Provincia (Ndap_id) ---
// export async function getInmueblesByDepartment(req, res) {
//   try {
//     const { ndap_id } = req.query;

//     if (!ndap_id) {
//       return res.status(400).json({ message: 'El ID del departamento (Ndap_id) es requerido.' });
//     }
//     const parsedNdapId = parseInt(ndap_id, 10);
//     if (isNaN(parsedNdapId)) {
//       return res.status(400).json({ message: 'El ID del departamento debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Ciudad, as: 'ciudadInfo', required: false,
//             include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
//           }, {
//             model: Corregimiento, as: 'corregimientoInfo', required: false,
//             include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
//           }, {
//             model: Vereda, as: 'veredaInfo', required: false,
//             include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$municipioInfo.Ndap_FK$': parsedNdapId } }]
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el departamento especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por departamento:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 2. Inmuebles por Municipio (Municipio_id) ---
// export async function getInmueblesByMunicipality(req, res) {
//   try {
//     const { municipio_id } = req.query;

//     if (!municipio_id) {
//       return res.status(400).json({ message: 'El ID del municipio es requerido.' });
//     }
//     const parsedMunicipioId = parseInt(municipio_id, 10);
//     if (isNaN(parsedMunicipioId)) {
//       return res.status(400).json({ message: 'El ID del municipio debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Ciudad, as: 'ciudadInfo', required: false,
//             where: { '$ciudadInfo.Municipio_FK$': parsedMunicipioId }
//           }, {
//             model: Corregimiento, as: 'corregimientoInfo', required: false,
//             where: { '$corregimientoInfo.Municipio_FK$': parsedMunicipioId }
//           }, {
//             model: Vereda, as: 'veredaInfo', required: false,
//             where: { '$veredaInfo.Municipio_FK$': parsedMunicipioId }
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el municipio especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por municipio:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 3. Inmuebles por Ciudad (Ciudad_id) ---
// export async function getInmueblesByCity(req, res) {
//   try {
//     const { ciudad_id } = req.query;

//     if (!ciudad_id) {
//       return res.status(400).json({ message: 'El ID de la ciudad es requerido.' });
//     }
//     const parsedCiudadId = parseInt(ciudad_id, 10);
//     if (isNaN(parsedCiudadId)) {
//       return res.status(400).json({ message: 'El ID de la ciudad debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Ciudad, as: 'ciudadInfo',
//             where: { Ciudad_id: parsedCiudadId }
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en la ciudad especificada.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por ciudad:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 4. Inmuebles por Corregimiento (Corregimiento_id) ---
// export async function getInmueblesByCorregimiento(req, res) {
//   try {
//     const { corregimiento_id } = req.query;

//     if (!corregimiento_id) {
//       return res.status(400).json({ message: 'El ID del corregimiento es requerido.' });
//     }
//     const parsedCorregimientoId = parseInt(corregimiento_id, 10);
//     if (isNaN(parsedCorregimientoId)) {
//       return res.status(400).json({ message: 'El ID del corregimiento debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Corregimiento, as: 'corregimientoInfo',
//             where: { Corregimiento_id: parsedCorregimientoId }
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el corregimiento especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por corregimiento:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 5. Inmuebles por Vereda (Vereda_id) ---
// export async function getInmueblesByVereda(req, res) {
//   try {
//     const { vereda_id } = req.query;

//     if (!vereda_id) {
//       return res.status(400).json({ message: 'El ID de la vereda es requerido.' });
//     }
//     const parsedVeredaId = parseInt(vereda_id, 10);
//     if (isNaN(parsedVeredaId)) {
//       return res.status(400).json({ message: 'El ID de la vereda debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Vereda, as: 'veredaInfo',
//             where: { Vereda_id: parsedVeredaId }
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en la vereda especificada.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por vereda:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 6. Inmuebles por Barrio (Barrio_id) ---
// export async function getInmueblesByBarrio(req, res) {
//   try {
//     const { barrio_id } = req.query;

//     if (!barrio_id) {
//       return res.status(400).json({ message: 'El ID del barrio es requerido.' });
//     }
//     const parsedBarrioId = parseInt(barrio_id, 10);
//     if (isNaN(parsedBarrioId)) {
//       return res.status(400).json({ message: 'El ID del barrio debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: BarrioCiudadCorregimientoVereda, as: 'bccvInfo',
//           include: [{
//             model: Barrio, as: 'barrioInfo',
//             where: { Barrio_id: parsedBarrioId }
//           }]
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles en el barrio especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por barrio:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 7. Búsqueda por Radio/Proximidad (Latitud/Longitud) ---
// export async function getInmueblesByProximity(req, res) {
//   try {
//     const { latitud_centro, longitud_centro, radio_km } = req.query;

//     if (!latitud_centro || !longitud_centro || !radio_km) {
//       return res.status(400).json({ message: 'Latitud, longitud del centro y radio en kilómetros son requeridos.' });
//     }

//     const latitud = parseFloat(latitud_centro);
//     const longitud = parseFloat(longitud_centro);
//     const radio = parseFloat(radio_km);

//     if (isNaN(latitud) || isNaN(longitud) || isNaN(radio) || radio <= 0) {
//       return res.status(400).json({ message: 'Latitud, longitud y radio deben ser números válidos y el radio debe ser positivo.' });
//     }

//     // Fórmula de Haversine para calcular la distancia en km
//     const distanceFormula = Sequelize.literal(`
//       (6371 * acos(
//         cos(radians(${latitud})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud}))
//         + sin(radians(${latitud})) * sin(radians(Localizacion.Latitud))
//       ))
//     `);

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       attributes: {
//         include: [
//           [distanceFormula, 'distancia_km']
//         ]
//       },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: Localizacion, as: 'localizacionInfo', // Alias de la relación en el modelo Direccion
//           where: {
//             Latitud: { [Op.ne]: null },
//             Longitud: { [Op.ne]: null }
//           },
//           required: true // INNER JOIN, solo si tienen lat/lon
//         }]
//       }],
//       having: Sequelize.literal(`distancia_km <= ${radio}`),
//       order: [[Sequelize.literal('distancia_km'), 'ASC']]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles dentro del radio especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por proximidad:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 8. Inmuebles por Tipo de Vía y Número Específico ---
// export async function getInmueblesByFullAddress(req, res) {
//   try {
//     const { tipo_via, numero_via_principal, numero_calle_transversal, numero_edificacion } = req.query;

//     if (!tipo_via || !numero_via_principal || !numero_calle_transversal || !numero_edificacion) {
//       return res.status(400).json({ message: 'Tipo de vía, número de vía principal, número de calle transversal y número de edificación son requeridos.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         where: {
//           Tipo_via: tipo_via,
//           Numero_via_principal: numero_via_principal,
//           Numero_calle_transversal: numero_calle_transversal,
//           Numero_edificacion: numero_edificacion,
//         },
//         required: true
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles con la dirección especificada.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por dirección completa:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 9. Inmuebles por Designador Cardinal (Designador_cardinal_id) ---
// export async function getInmueblesByCardinalDesignator(req, res) {
//   try {
//     const { designador_cardinal_id } = req.query;

//     if (!designador_cardinal_id) {
//       return res.status(400).json({ message: 'El ID del designador cardinal es requerido.' });
//     }
//     const parsedCardinalId = parseInt(designador_cardinal_id, 10);
//     if (isNaN(parsedCardinalId)) {
//       return res.status(400).json({ message: 'El ID del designador cardinal debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: { Estado: 'disponible' },
//       include: [{
//         model: Direccion, as: 'direccionInfo',
//         include: [{
//           model: DesignadorCardinal, as: 'designadorCardinalInfo',
//           where: { Designador_cardinal_id: parsedCardinalId }
//         }]
//       }]
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles con el designador cardinal especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por designador cardinal:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 10. Consulta SQL Unificada para Filtros de Ubicación de Inmuebles ---
// export async function getInmueblesWithUnifiedLocationFilters(req, res) {
//   try {
//     const {
//       estado_inmueble,
//       ndap_id,
//       municipio_id,
//       ubicacion_especifica_id, // Puede ser Ciudad, Corregimiento, Vereda, Barrio
//       tipo_ubicacion,           // 'ciudad', 'corregimiento', 'vereda', 'barrio'
//       tipo_via,
//       numero_via_principal,
//       numero_calle_transversal,
//       numero_edificacion,
//       designador_cardinal_id,
//       latitud_centro,
//       longitud_centro,
//       radio_km,
//     } = req.query;

//     const whereConditions = {};
//     let includeConditions = [
//       {
//         model: Direccion,
//         as: 'direccionInfo',
//         required: true, // INNER JOIN: todo inmueble debe tener una dirección
//         include: [
//           {
//             model: BarrioCiudadCorregimientoVereda,
//             as: 'bccvInfo',
//             required: true,
//             include: [
//               { model: Barrio, as: 'barrioInfo', required: false },
//               { model: Ciudad, as: 'ciudadInfo', required: false },
//               { model: Corregimiento, as: 'corregimientoInfo', required: false },
//               { model: Vereda, as: 'veredaInfo', required: false },
//             ],
//           },
//           { model: DesignadorCardinal, as: 'designadorCardinalInfo', required: false },
//           { model: Localizacion, as: 'localizacionInfo', required: false },
//         ],
//       },
//       // JOINs a Municipio y Ndap se manejan en el nivel superior para aplicar filtros
//       // de forma más flexible, o dentro de las inclusiones de bccvInfo.
//       // Para la consulta unificada, es más limpio hacer los joins necesarios de manera explícita
//       // y luego usar Sequelize.literal o acceder a través de los alias.
//     ];

//     // Para la jerarquía de ubicación, necesitamos joins más complejos
//     // Creamos una inclusión para Municipio y Ndap de forma flexible
//     const municipioInclude = {
//       model: Municipio,
//       as: 'municipioInfo',
//       required: false, // LEFT JOIN
//       include: [
//         { model: Ndap, as: 'departamentoInfo', required: false } // LEFT JOIN
//       ]
//     };
//     // Añadimos municipio a las inclusiones de ciudad, corregimiento, vereda dentro de bccvInfo
//     // Esto se complica mucho con Sequelize al hacer includes anidados de esta forma para un OR en el JOIN
//     // La mejor estrategia para la UNIFICADA es quizás usar `sequelize.literal` o raw queries
//     // para las condiciones de JOIN complejas que involucran OR, o refactorizar el modelo de Bccv
//     // para tener una FK directa a Municipio.

//     // Aclaremos los joins para la unificada:
//     // Inmueble -> Direccion -> BarrioCiudadCorregimientoVereda (bccv)
//     // bccv -> Barrio (LEFT)
//     // bccv -> Ciudad (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)
//     // bccv -> Corregimiento (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)
//     // bccv -> Vereda (LEFT) -> Municipio (LEFT) -> Ndap (LEFT)

//     // Para manejar esto en Sequelize sin generar JOINs cartesianos o complejos,
//     // es mejor tener las relaciones directas donde sea posible.

//     // Reiniciaremos las inclusiones para la consulta unificada para manejar la complejidad.
//     // Esto es un desafío en Sequelize con la estructura de bccv vinculada a Ciudad, Corregimiento, Vereda,
//     // que a su vez se vinculan a Municipio. La forma más limpia es hacer los JOINS directamente
//     // en la consulta SQL y usar `Sequelize.literal` para las condiciones.

//     // --- Filtro base: Estado del inmueble (opcional, por defecto 'disponible') ---
//     if (estado_inmueble) {
//       if (typeof estado_inmueble !== 'string' || estado_inmueble.trim() === '') {
//         return res.status(400).json({ message: 'El estado del inmueble debe ser una cadena no vacía.' });
//       }
//       whereConditions.Estado = estado_inmueble;
//     } else {
//       whereConditions.Estado = 'disponible';
//     }

//     // --- Filtro por Departamento (Ndap_id) ---
//     if (ndap_id) {
//       const parsedNdapId = parseInt(ndap_id, 10);
//       if (isNaN(parsedNdapId)) {
//         return res.status(400).json({ message: 'El ID del departamento debe ser un número válido.' });
//       }
//       // Necesitamos asegurar que el JOIN a Ndap se realice para esta condición
//       includeConditions[0].include[0].include.push(
//         { model: Ciudad, as: 'ciudadInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.ciudadInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] },
//         { model: Corregimiento, as: 'corregimientoInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.corregimientoInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] },
//         { model: Vereda, as: 'veredaInfo', required: false, include: [{ model: Municipio, as: 'municipioInfo', required: true, where: { '$direccionInfo.bccvInfo.veredaInfo.municipioInfo.Ndap_FK$': parsedNdapId } }] }
//       );
//     }

//     // --- Filtro por Municipio (Municipio_id) ---
//     if (municipio_id) {
//       const parsedMunicipioId = parseInt(municipio_id, 10);
//       if (isNaN(parsedMunicipioId)) {
//         return res.status(400).json({ message: 'El ID del municipio debe ser un número válido.' });
//       }
//       // Añadimos condiciones directamente a las relaciones de ciudad, corregimiento, vereda
//       includeConditions[0].include[0].include.push(
//         { model: Ciudad, as: 'ciudadInfo', required: false, where: { '$direccionInfo.bccvInfo.ciudadInfo.Municipio_FK$': parsedMunicipioId } },
//         { model: Corregimiento, as: 'corregimientoInfo', required: false, where: { '$direccionInfo.bccvInfo.corregimientoInfo.Municipio_FK$': parsedMunicipioId } },
//         { model: Vereda, as: 'veredaInfo', required: false, where: { '$direccionInfo.bccvInfo.veredaInfo.Municipio_FK$': parsedMunicipioId } }
//       );
//     }

//     // --- Filtro por Ubicación Específica (Ciudad, Corregimiento, Vereda, Barrio) ---
//     if (ubicacion_especifica_id && tipo_ubicacion) {
//       const parsedUbicacionId = parseInt(ubicacion_especifica_id, 10);
//       if (isNaN(parsedUbicacionId)) {
//         return res.status(400).json({ message: 'El ID de la ubicación específica debe ser un número válido.' });
//       }

//       let specificLocationCondition = {};
//       switch (tipo_ubicacion.toLowerCase()) {
//         case 'ciudad':
//           specificLocationCondition = { model: Ciudad, as: 'ciudadInfo', where: { Ciudad_id: parsedUbicacionId }, required: true };
//           break;
//         case 'corregimiento':
//           specificLocationCondition = { model: Corregimiento, as: 'corregimientoInfo', where: { Corregimiento_id: parsedUbicacionId }, required: true };
//           break;
//         case 'vereda':
//           specificLocationCondition = { model: Vereda, as: 'veredaInfo', where: { Vereda_id: parsedUbicacionId }, required: true };
//           break;
//         case 'barrio':
//           specificLocationCondition = { model: Barrio, as: 'barrioInfo', where: { Barrio_id: parsedUbicacionId }, required: true };
//           break;
//         default:
//           return res.status(400).json({ message: 'Tipo de ubicación no reconocido.' });
//       }
//       // Añadir la condición de ubicación específica a la inclusión de bccvInfo
//       includeConditions[0].include[0].include.push(specificLocationCondition);
//     }

//     // --- Filtro por Tipo de Vía y Número Específico ---
//     if (tipo_via || numero_via_principal || numero_calle_transversal || numero_edificacion) {
//       if (!tipo_via || !numero_via_principal || !numero_calle_transversal || !numero_edificacion) {
//         return res.status(400).json({ message: 'Para el filtro de dirección completa, todos los campos (tipo de vía, números) son requeridos.' });
//       }
//       includeConditions[0].where = {
//         Tipo_via: tipo_via,
//         Numero_via_principal: numero_via_principal,
//         Numero_calle_transversal: numero_calle_transversal,
//         Numero_edificacion: numero_edificacion,
//       };
//       includeConditions[0].required = true; // INNER JOIN para asegurar que la dirección coincida
//     }

//     // --- Filtro por Designador Cardinal (Designador_cardinal_id) ---
//     if (designador_cardinal_id) {
//       const parsedCardinalId = parseInt(designador_cardinal_id, 10);
//       if (isNaN(parsedCardinalId)) {
//         return res.status(400).json({ message: 'El ID del designador cardinal debe ser un número válido.' });
//       }
//       // Añadimos la condición directamente a la inclusión de DesignadorCardinal
//       includeConditions[0].include[1].where = { Designador_cardinal_id: parsedCardinalId };
//       includeConditions[0].include[1].required = true; // INNER JOIN
//     }

//     let havingCondition = null;
//     let orderConditions = [['Fecha_publicacion', 'DESC']]; // Orden por defecto

//     // --- Filtro por Radio/Proximidad (Latitud/Longitud) ---
//     if (latitud_centro && longitud_centro && radio_km) {
//       const latitud = parseFloat(latitud_centro);
//       const longitud = parseFloat(longitud_centro);
//       const radio = parseFloat(radio_km);

//       if (isNaN(latitud) || isNaN(longitud) || isNaN(radio) || radio <= 0) {
//         return res.status(400).json({ message: 'Latitud, longitud del centro y radio deben ser números válidos y el radio debe ser positivo para la búsqueda por proximidad.' });
//       }

//       // Asegurar que Localizacion esté incluido y sus campos no sean nulos
//       const localizacionIncludeIndex = includeConditions[0].include.findIndex(inc => inc.model === Localizacion);
//       if (localizacionIncludeIndex !== -1) {
//           includeConditions[0].include[localizacionIncludeIndex].required = true;
//           includeConditions[0].include[localizacionIncludeIndex].where = {
//               Latitud: { [Op.ne]: null },
//               Longitud: { [Op.ne]: null }
//           };
//       } else {
//           // Si por alguna razón no está, lo añadimos
//           includeConditions[0].include.push({
//               model: Localizacion,
//               as: 'localizacionInfo',
//               required: true,
//               where: { Latitud: { [Op.ne]: null }, Longitud: { [Op.ne]: null } }
//           });
//       }

//       const distanceFormula = Sequelize.literal(`
//         (6371 * acos(
//           cos(radians(${latitud})) * cos(radians("direccionInfo"."localizacionInfo"."Latitud")) * cos(radians("direccionInfo"."localizacionInfo"."Longitud") - radians(${longitud}))
//           + sin(radians(${latitud})) * sin(radians("direccionInfo"."localizacionInfo"."Latitud"))
//         ))
//       `);

//       havingCondition = Sequelize.literal(`distancia_km <= ${radio}`);
//       orderConditions = [[Sequelize.literal('distancia_km'), 'ASC'], ...orderConditions]; // Ordena por distancia y luego por fecha
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//       attributes: {
//         include: [
//           // Incluye información de dirección y ubicación para la salida
//           [Sequelize.col('direccionInfo.Direccion'), 'DireccionCompleta'],
//           [Sequelize.col('direccionInfo.Tipo_via'), 'Tipo_via'],
//           [Sequelize.col('direccionInfo.Numero_via_principal'), 'Numero_via_principal'],
//           [Sequelize.col('direccionInfo.Numero_calle_transversal'), 'Numero_calle_transversal'],
//           [Sequelize.col('direccionInfo.Numero_edificacion'), 'Numero_edificacion'],
//           [Sequelize.col('direccionInfo.Descripcion_adicional'), 'DireccionAdicional'],
//           [Sequelize.col('direccionInfo.designadorCardinalInfo.Cardinalidad'), 'DesignadorCardinal_Abreviacion'],
//           [Sequelize.col('direccionInfo.localizacionInfo.Latitud'), 'Latitud'],
//           [Sequelize.col('direccionInfo.localizacionInfo.Longitud'), 'Longitud'],
//           [Sequelize.col('direccionInfo.localizacionInfo.Localizacion_descripcion'), 'DescripcionLocalizacion'],
//           [Sequelize.literal(`COALESCE(
//               "direccionInfo"."bccvInfo"."barrioInfo"."Nombre_barrio",
//               "direccionInfo"."bccvInfo"."ciudadInfo"."Ciudad",
//               "direccionInfo"."bccvInfo"."corregimientoInfo"."Corregimiento",
//               "direccionInfo"."bccvInfo"."veredaInfo"."Vereda_nombre"
//             )`), 'NombreUbicacionEspecifica'],
//           // Para municipio y departamento, se necesitan joins más complejos o subconsultas si no hay una relación directa y limpia desde Inmueble.
//           // Aquí estamos asumiendo que el municipio y ndap se pueden inferir de ciudad/corregimiento/vereda.
//         ]
//       },
//       include: includeConditions,
//       having: havingCondition,
//       order: orderConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles que coincidan con los filtros de ubicación especificados.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles con filtros de ubicación unificados:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }
// Consideraciones Cruciales para la Implementación:
// Definición de Modelos y Asociaciones (models/*.js):
// Este es el punto más crítico para que los controladores funcionen. Sequelize se basa en las asociaciones. Aquí hay un ejemplo de cómo deberían estar tus modelos, con los as (alias) correspondientes, que son obligatorios para las referencias en los include y where anidados:

// JavaScript

// // models/inmueble.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import Direccion from './direccion.js';

// const Inmueble = sequelize.define('Inmueble', {
//   Inmueble_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Direccion_FK: { type: DataTypes.INTEGER, allowNull: false },
//   Estado: { type: DataTypes.STRING(50) },
//   // ... otras columnas de Inmueble
// }, { tableName: 'inmueble', timestamps: false });

// // Asociación: Un inmueble tiene una dirección
// Inmueble.belongsTo(Direccion, { foreignKey: 'Direccion_FK', as: 'direccionInfo' });
// export default Inmueble;

// // models/direccion.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import BarrioCiudadCorregimientoVereda from './barrio_ciudad_corregimiento_vereda.js';
// import DesignadorCardinal from './designador_cardinal.js';
// import Localizacion from './localizacion.js';

// const Direccion = sequelize.define('Direccion', {
//   Direccion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Barrio_ciudad_corregimiento_vereda_FK: { type: DataTypes.INTEGER, allowNull: false },
//   Designador_cardinal_FK: { type: DataTypes.INTEGER, allowNull: true },
//   Localizacion_FK: { type: DataTypes.INTEGER, allowNull: true },
//   Tipo_via: { type: DataTypes.STRING(50) },
//   Numero_via_principal: { type: DataTypes.STRING(50) },
//   Numero_calle_transversal: { type: DataTypes.STRING(50) },
//   Numero_edificacion: { type: DataTypes.STRING(50) },
//   // ... otras columnas de Direccion
// }, { tableName: 'direccion', timestamps: false });

// Direccion.belongsTo(BarrioCiudadCorregimientoVereda, { foreignKey: 'Barrio_ciudad_corregimiento_vereda_FK', as: 'bccvInfo' });
// Direccion.belongsTo(DesignadorCardinal, { foreignKey: 'Designador_cardinal_FK', as: 'designadorCardinalInfo' });
// Direccion.belongsTo(Localizacion, { foreignKey: 'Localizacion_FK', as: 'localizacionInfo' });
// export default Direccion;

// // models/barrio_ciudad_corregimiento_vereda.js (bccv)
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import Barrio from './barrio.js';
// import Ciudad from './ciudad.js';
// import Corregimiento from './corregimiento.js';
// import Vereda from './vereda.js';

// const BarrioCiudadCorregimientoVereda = sequelize.define('BarrioCiudadCorregimientoVereda', {
//   Barrio_ciudad_corregimiento_vereda_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Barrio_FK: { type: DataTypes.INTEGER, allowNull: true },
//   Ciudad_FK: { type: DataTypes.INTEGER, allowNull: true },
//   Corregimiento_FK: { type: DataTypes.INTEGER, allowNull: true },
//   Vereda_Fk: { type: DataTypes.INTEGER, allowNull: true },
// }, { tableName: 'barrio_ciudad_corregimiento_vereda', timestamps: false });

// // Un BCCV puede pertenecer a un barrio, ciudad, corregimiento o vereda (uno a la vez)
// BarrioCiudadCorregimientoVereda.belongsTo(Barrio, { foreignKey: 'Barrio_FK', as: 'barrioInfo' });
// BarrioCiudadCorregimientoVereda.belongsTo(Ciudad, { foreignKey: 'Ciudad_FK', as: 'ciudadInfo' });
// BarrioCiudadCorregimientoVereda.belongsTo(Corregimiento, { foreignKey: 'Corregimiento_FK', as: 'corregimientoInfo' });
// BarrioCiudadCorregimientoVereda.belongsTo(Vereda, { foreignKey: 'Vereda_Fk', as: 'veredaInfo' });
// export default BarrioCiudadCorregimientoVereda;

// // models/ciudad.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import Municipio from './municipio.js'; // Importa Municipio

// const Ciudad = sequelize.define('Ciudad', {
//   Ciudad_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Ciudad: { type: DataTypes.STRING(255) },
//   Municipio_FK: { type: DataTypes.INTEGER, allowNull: false },
// }, { tableName: 'ciudad', timestamps: false });

// Ciudad.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'municipioInfo' });
// export default Ciudad;

// // models/municipio.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import Ndap from './ndap.js'; // Importa Ndap

// const Municipio = sequelize.define('Municipio', {
//   Municipio_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Municipio_nombre: { type: DataTypes.STRING(255) },
//   Ndap_FK: { type: DataTypes.INTEGER, allowNull: false },
// }, { tableName: 'municipio', timestamps: false });

// Municipio.belongsTo(Ndap, { foreignKey: 'Ndap_FK', as: 'departamentoInfo' });
// export default Municipio;

// // models/ndap.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';

// const Ndap = sequelize.define('Ndap', {
//   Ndap_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   Ndap_descripcion: { type: DataTypes.STRING(255) },
// }, { tableName: 'ndap', timestamps: false });
// export default Ndap;

// // ... y así sucesivamente para Barrio, Corregimiento, Vereda, DesignadorCardinal, Localizacion
// Complejidad de la Consulta Unificada:

// La consulta unificada para ubicación es bastante compleja en Sequelize debido a las múltiples rutas de JOIN (bccv a Ciudad/Corregimiento/Vereda, y luego cada una a Municipio y Ndap).
// He intentado replicar la lógica de la consulta SQL unificada en Sequelize, pero las condiciones OR en los JOIN (ON c.Municipio_FK = m.Municipio_id OR corr.Municipio_FK = m.Municipio_id OR v.Municipio_FK = m.Municipio_id) son muy difíciles de expresar directamente con los include y where anidados de Sequelize sin recurrir a subconsultas o Sequelize.literal en el WHERE principal, lo cual puede hacer la consulta menos legible o eficiente.
// Mi implementación para la consulta unificada (getInmueblesWithUnifiedLocationFilters) asume un modelo de relaciones en Sequelize que permite acceder a Municipio y Ndap a través de Ciudad, Corregimiento o Vereda. Si tus modelos no tienen estas asociaciones anidadas exactas, el código necesitará ajustes. Es el punto más propenso a errores.
// Para la fórmula de Haversine, uso Sequelize.literal para inyectar la expresión SQL directamente, que es la forma estándar de hacerlo en Sequelize.
// Manejo de Parámetros:

// Todos los filtros esperan parámetros de consulta (req.query).
// Se incluyen validaciones básicas para los tipos de datos (números, cadenas).
// Rutas para los Controladores:
// En tu archivo de rutas (ej. routes/inmuebles.js), importarías y asignarías estos controladores a sus respectivas rutas:

// JavaScript

// // routes/inmuebles.js
// import express from 'express';
// import {
//   getInmueblesByDepartment,
//   getInmueblesByMunicipality,
//   getInmueblesByCity,
//   getInmueblesByCorregimiento,
//   getInmueblesByVereda,
//   getInmueblesByBarrio,
//   getInmueblesByProximity,
//   getInmueblesByFullAddress,
//   getInmueblesByCardinalDesignator,
//   getInmueblesWithUnifiedLocationFilters
// } from '../controllers/inmuebleLocationFiltersController.js'; // Ajusta la ruta

// const router = express.Router();

// // Rutas para cada filtro individual
// router.get('/inmuebles/by-department', getInmueblesByDepartment);
// router.get('/inmuebles/by-municipality', getInmueblesByMunicipality);
// router.get('/inmuebles/by-city', getInmueblesByCity);
// router.get('/inmuebles/by-corregimiento', getInmueblesByCorregimiento);
// router.get('/inmuebles/by-vereda', getInmueblesByVereda);
// router.get('/inmuebles/by-barrio', getInmueblesByBarrio);
// router.get('/inmuebles/by-proximity', getInmueblesByProximity);
// router.get('/inmuebles/by-full-address', getInmueblesByFullAddress);
// router.get('/inmuebles/by-cardinal-designator', getInmueblesByCardinalDesignator);

// // Ruta unificada para todos los filtros de ubicación
// router.get('/inmuebles/location-filters', getInmueblesWithUnifiedLocationFilters);

// export default router;
// Y asegúrate de que tu index.js principal use estas rutas.

// Implementar estas uniones complejas en Sequelize requiere mucha atención a los alias y a la forma en que se definen las relaciones en los modelos. Si encuentras errores, lo más probable es que sean debidos a una discrepancia entre la definición de tus modelos y las asociaciones esperadas por los include y where anidados.

// ¡Avísame si tienes algún problema al probarlos o si quieres que profundicemos en la estructura de los modelos!