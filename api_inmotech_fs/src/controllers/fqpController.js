// controllers/inmuebleControllers.js

import Inmueble from '../models/inmueble.js';         // Asegúrate de que estas rutas sean correctas
import PlatformUser from '../models/platform_user.js'; // Asegúrate de que estas rutas sean correctas
import PlatformProfile from '../models/platform_profile.js'; // Asegúrate de que estas rutas sean correctas

// --- 1. Obtener inmuebles publicados por un Anunciante Específico (Usuario de la Plataforma) ---
/**
 * @function getInmueblesBySpecificUser
 * @description Obtiene inmuebles filtrados por un ID de usuario de plataforma específico.
 * Corresponde a la primera consulta SQL.
 * @param {Object} req - Objeto de solicitud de Express. Espera `platform_user_id` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesBySpecificUser(req, res) {
    try {
        const { platform_user_id } = req.query;

        if (!platform_user_id) {
            return res.status(400).json({ message: 'El ID del usuario de la plataforma es requerido para este filtro.' });
        }

        const parsedUserId = parseInt(platform_user_id, 10);
        if (isNaN(parsedUserId)) {
            return res.status(400).json({ message: 'El ID de usuario de la plataforma debe ser un número válido.' });
        }

        const inmuebles = await Inmueble.findAll({
        where: {
            Estado: 'disponible',
            '$publicador.Platform_user_id$': parsedUserId, // Hace referencia a la columna en la tabla PlatformUser
        },
        include: [{
            model: PlatformUser,
            as: 'publicador', // Alias de la relación definido en el modelo Inmueble
            attributes: ['Username'],
        }],
    });

    if (inmuebles.length > 0) {
        res.json(inmuebles);
    } else {
        res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el usuario especificado.' });
    }
    } catch (error) {
        console.error('Error al obtener inmuebles por usuario específico:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// --- 2. Obtener inmuebles por Tipo de Anunciante ---
/**
 * @function getInmueblesByAnnouncerType
 * @description Obtiene inmuebles filtrados por un tipo de anunciante específico (ej. 'Agencia', 'Particular').
 * Corresponde a la segunda consulta SQL. Requiere la columna `Profile_type` en `platform_profile`.
 * @param {Object} req - Objeto de solicitud de Express. Espera `tipo_anunciante` en los query params.
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesByAnnouncerType(req, res) {
    try {
        const { tipo_anunciante } = req.query;

        if (!tipo_anunciante) {
            return res.status(400).json({ message: 'El tipo de anunciante es requerido para este filtro.' });
        }
        if (typeof tipo_anunciante !== 'string' || tipo_anunciante.trim() === '') {
            return res.status(400).json({ message: 'El tipo de anunciante debe ser una cadena de texto no vacía.' });
        }

        const inmuebles = await Inmueble.findAll({
            where: {
            Estado: 'disponible',
            '$publicador.perfilPublicador.Profile_type$': tipo_anunciante, // Accede a través de la relación anidada
        },
        include: [{
            model: PlatformUser,
            as: 'publicador',
            attributes: ['Username'],
                include: [{
                    model: PlatformProfile,
                    as: 'perfilPublicador', // Alias de la relación definido en el modelo PlatformUser
                    attributes: ['Profile_type'],
                    required: true, // INNER JOIN: solo inmuebles con un tipo de perfil definido
                }],
            }],
        });

        if (inmuebles.length > 0) {
            res.json(inmuebles);
        } else {
            res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el tipo de anunciante especificado.' });
        }
    } catch (error) {
        console.error('Error al obtener inmuebles por tipo de anunciante:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// --- 3. Consulta SQL Unificada para Filtros de "Quién Publica" (Opcional) ---
/**
 * @function getInmueblesWithOptionalFilters
 * @description Obtiene inmuebles aplicando filtros opcionales por ID de usuario y/o tipo de anunciante.
 * Corresponde a la consulta SQL unificada.
 * @param {Object} req - Objeto de solicitud de Express. Espera `platform_user_id` y `tipo_anunciante`
 * como parámetros de consulta (query parameters).
 * @param {Object} res - Objeto de respuesta de Express.
 */
export async function getInmueblesWithOptionalFilters(req, res) {
    try {
        const { platform_user_id, tipo_anunciante } = req.query;

        const whereConditions = {
            Estado: 'disponible', // Condición base
        };

        const includeConditions = [
            {
                model: PlatformUser,
                as: 'publicador',
                attributes: ['Username', 'Platform_user_id'],
                include: [{
                    model: PlatformProfile,
                    as: 'perfilPublicador',
                    attributes: ['Profile_type'],
                    required: false, // LEFT JOIN para permitir que el perfil sea opcional
                }],
            },
        ];

        // Aplica filtro por ID de Anunciante si se proporciona
        if (platform_user_id) {
            const parsedUserId = parseInt(platform_user_id, 10);
            if (isNaN(parsedUserId)) {
                return res.status(400).json({ message: 'El ID de usuario de la plataforma debe ser un número válido.' });
            }
            whereConditions['$publicador.Platform_user_id$'] = parsedUserId;
        }

        // Aplica filtro por Tipo de Anunciante si se proporciona
        if (tipo_anunciante) {
            if (typeof tipo_anunciante !== 'string' || tipo_anunciante.trim() === '') {
                return res.status(400).json({ message: 'El tipo de anunciante debe ser una cadena de texto no vacía.' });
            }
            whereConditions['$publicador.perfilPublicador.Profile_type$'] = tipo_anunciante;
        }

        const inmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeConditions,
        });

        if (inmuebles.length > 0) {
            res.json(inmuebles);
        } else {
            res.status(404).json({ message: 'No se encontraron inmuebles disponibles que coincidan con los filtros.' });
        }
    } catch (error) {
    console.error('Error al obtener inmuebles con filtros opcionales:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// Me disculpo por la confusión. Entiendo que quieres un archivo que contenga los tres controladores de filtrado de inmuebles, cada uno respondiendo a una de las consultas SQL que proporcionaste inicialmente, pero sin incluir los controladores de Asignacion.

// Aquí tienes el archivo inmuebleControllers.js con las tres funciones de controlador que corresponden a tus consultas SQL originales, de forma separada y enumerada:

// Controladores de Inmuebles para Filtros "Quién Publica"
// JavaScript

// // controllers/inmuebleControllers.js

// import Inmueble from '../models/inmueble.js';         // Asegúrate de que estas rutas sean correctas
// import PlatformUser from '../models/platform_user.js'; // Asegúrate de que estas rutas sean correctas
// import PlatformProfile from '../models/platform_profile.js'; // Asegúrate de que estas rutas sean correctas
// import { Op } from 'sequelize'; // Necesario para operadores de Sequelize como IS NULL si los usaras directamente

// // --- 1. Obtener inmuebles publicados por un Anunciante Específico (Usuario de la Plataforma) ---
// /**
//  * @function getInmueblesBySpecificUser
//  * @description Obtiene inmuebles filtrados por un ID de usuario de plataforma específico.
//  * Corresponde a la primera consulta SQL.
//  * @param {Object} req - Objeto de solicitud de Express. Espera `platform_user_id` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesBySpecificUser(req, res) {
//   try {
//     const { platform_user_id } = req.query;

//     if (!platform_user_id) {
//       return res.status(400).json({ message: 'El ID del usuario de la plataforma es requerido para este filtro.' });
//     }

//     const parsedUserId = parseInt(platform_user_id, 10);
//     if (isNaN(parsedUserId)) {
//       return res.status(400).json({ message: 'El ID de usuario de la plataforma debe ser un número válido.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         Estado: 'disponible',
//         '$publicador.Platform_user_id$': parsedUserId, // Hace referencia a la columna en la tabla PlatformUser
//       },
//       include: [{
//         model: PlatformUser,
//         as: 'publicador', // Alias de la relación definido en el modelo Inmueble
//         attributes: ['Username'],
//       }],
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el usuario especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por usuario específico:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 2. Obtener inmuebles por Tipo de Anunciante ---
// /**
//  * @function getInmueblesByAnnouncerType
//  * @description Obtiene inmuebles filtrados por un tipo de anunciante específico (ej. 'Agencia', 'Particular').
//  * Corresponde a la segunda consulta SQL. Requiere la columna `Profile_type` en `platform_profile`.
//  * @param {Object} req - Objeto de solicitud de Express. Espera `tipo_anunciante` en los query params.
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesByAnnouncerType(req, res) {
//   try {
//     const { tipo_anunciante } = req.query;

//     if (!tipo_anunciante) {
//       return res.status(400).json({ message: 'El tipo de anunciante es requerido para este filtro.' });
//     }
//     if (typeof tipo_anunciante !== 'string' || tipo_anunciante.trim() === '') {
//       return res.status(400).json({ message: 'El tipo de anunciante debe ser una cadena de texto no vacía.' });
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: {
//         Estado: 'disponible',
//         '$publicador.perfilPublicador.Profile_type$': tipo_anunciante, // Accede a través de la relación anidada
//       },
//       include: [{
//         model: PlatformUser,
//         as: 'publicador',
//         attributes: ['Username'],
//         include: [{
//           model: PlatformProfile,
//           as: 'perfilPublicador', // Alias de la relación definido en el modelo PlatformUser
//           attributes: ['Profile_type'],
//           required: true, // INNER JOIN: solo inmuebles con un tipo de perfil definido
//         }],
//       }],
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles para el tipo de anunciante especificado.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles por tipo de anunciante:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }

// // --- 3. Consulta SQL Unificada para Filtros de "Quién Publica" (Opcional) ---
// /**
//  * @function getInmueblesWithOptionalFilters
//  * @description Obtiene inmuebles aplicando filtros opcionales por ID de usuario y/o tipo de anunciante.
//  * Corresponde a la consulta SQL unificada.
//  * @param {Object} req - Objeto de solicitud de Express. Espera `platform_user_id` y `tipo_anunciante`
//  * como parámetros de consulta (query parameters).
//  * @param {Object} res - Objeto de respuesta de Express.
//  */
// export async function getInmueblesWithOptionalFilters(req, res) {
//   try {
//     const { platform_user_id, tipo_anunciante } = req.query;

//     const whereConditions = {
//       Estado: 'disponible', // Condición base
//     };

//     const includeConditions = [
//       {
//         model: PlatformUser,
//         as: 'publicador',
//         attributes: ['Username', 'Platform_user_id'],
//         include: [{
//           model: PlatformProfile,
//           as: 'perfilPublicador',
//           attributes: ['Profile_type'],
//           required: false, // LEFT JOIN para permitir que el perfil sea opcional
//         }],
//       },
//     ];

//     // Aplica filtro por ID de Anunciante si se proporciona
//     if (platform_user_id) {
//       const parsedUserId = parseInt(platform_user_id, 10);
//       if (isNaN(parsedUserId)) {
//         return res.status(400).json({ message: 'El ID de usuario de la plataforma debe ser un número válido.' });
//       }
//       whereConditions['$publicador.Platform_user_id$'] = parsedUserId;
//     }

//     // Aplica filtro por Tipo de Anunciante si se proporciona
//     if (tipo_anunciante) {
//       if (typeof tipo_anunciante !== 'string' || tipo_anunciante.trim() === '') {
//         return res.status(400).json({ message: 'El tipo de anunciante debe ser una cadena de texto no vacía.' });
//       }
//       whereConditions['$publicador.perfilPublicador.Profile_type$'] = tipo_anunciante;
//     }

//     const inmuebles = await Inmueble.findAll({
//       where: whereConditions,
//       include: includeConditions,
//     });

//     if (inmuebles.length > 0) {
//       res.json(inmuebles);
//     } else {
//       res.status(404).json({ message: 'No se encontraron inmuebles disponibles que coincidan con los filtros.' });
//     }
//   } catch (error) {
//     console.error('Error al obtener inmuebles con filtros opcionales:', error);
//     res.status(500).json({ error: 'Error interno del servidor.' });
//   }
// }
// Consideraciones Clave:
// Rutas Separadas o Unificada:
// Puedes asignar una ruta diferente a cada controlador si quieres que cada tipo de filtro tenga su propio endpoint (/api/inmuebles/by-user, /api/inmuebles/by-type).
// La opción más flexible y generalmente recomendada es usar el tercer controlador (getInmueblesWithOptionalFilters) y asignarle una sola ruta (/api/inmuebles). Este controlador maneja la lógica para aplicar ambos filtros opcionalmente.
// Definición de Modelos y Asociaciones: Para que estos controladores funcionen correctamente, es IMPRESCINDIBLE que tus modelos de Sequelize (Inmueble, PlatformUser, PlatformProfile) estén definidos con las asociaciones (belongsTo, hasOne) y los as (alias) correspondientes, como te mostré en la respuesta anterior. Por ejemplo:
// JavaScript

// // En Inmueble.js
// Inmueble.belongsTo(PlatformUser, { foreignKey: 'Platform_user_FK', as: 'publicador' });

// // En PlatformUser.js
// PlatformUser.hasOne(PlatformProfile, { foreignKey: 'Platform_user_FK', as: 'perfilPublicador' });
// Sin estas asociaciones y sus as, los $publicador.Platform_user_id$ y $publicador.perfilPublicador.Profile_type$ no funcionarán.
// Manejo de Errores: Cada controlador incluye un bloque try-catch para manejar errores y enviar una respuesta HTTP 500 si algo sale mal.
// Validación de Parámetros: Se incluyen validaciones básicas para asegurar que los parámetros (platform_user_id, tipo_anunciante) son del tipo esperado.
// Ejemplo de Configuración de Rutas con estos Controladores:
// JavaScript

// // routes/inmuebles.js
// import express from 'express';
// import {
//   getInmueblesBySpecificUser,
//   getInmueblesByAnnouncerType,
//   getInmueblesWithOptionalFilters
// } from '../controllers/inmuebleControllers.js'; // Ajusta la ruta si es necesario

// const router = express.Router();

// // Ruta para el filtro por usuario específico: /api/inmuebles/by-user?platform_user_id=123
// router.get('/inmuebles/by-user', getInmueblesBySpecificUser);

// // Ruta para el filtro por tipo de anunciante: /api/inmuebles/by-type?tipo_anunciante=Agencia
// router.get('/inmuebles/by-type', getInmueblesByAnnouncerType);

// // Ruta unificada con filtros opcionales: /api/inmuebles?platform_user_id=123&tipo_anunciante=Agencia
// router.get('/inmuebles', getInmueblesWithOptionalFilters);

// export default router;
// Espero que este archivo con los tres controladores de filtrado sea exactamente lo que necesitas.