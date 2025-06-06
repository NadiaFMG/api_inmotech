import Inmueble from '../models/inmueble.js'; // falta
import division from '../models/division.js';
import OtrasCaracteristicas from '../models/otras_caracteristicas.js'; //falta
import asignacion from '../models/asignacion.js';
import organizacionParqueadero from '../models/organizacion_parqueadero.js';

export async function getFilteredInmueblesByDetails(req, res) {
    try {
        const {
            // Filtros de Division
            num_habitaciones,
            min_habitaciones, // Para rango
            max_habitaciones, // Para rango
            num_baños,
            min_baños,      // Para rango
            max_baños,      // Para rango
            tipo_cocina,    // 'Integral', 'Abierta', 'Cerrada'
            balcon_si,      // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false' (si hay al menos una terraza)
            num_terrazas,   // Para número exacto de terrazas
            garaje_mayor_cero,  // 'true' o 'false' (si hay al menos un garaje)
            num_garajes,    // Para número exacto de garajes
            ascensores_si,  // 'true' o 'false'
            min_closets,    // Para un mínimo de closets
            num_closets,    // Para número exacto de closets
            // Filtros de OtrasCaracteristicas
            mascotas_permitidas_si, // 'true' o 'false'
            zona_lavanderia_si,     // 'true' o 'false'
            calentador_agua_si,     // 'true' o 'false'
            // Filtros de Asignacion
            uso_comercial_si,       // 'true' o 'false'
            uso_residencial_si,     // 'true' o 'false'
            // Filtros de OrganizacionParqueadero
            parqueadero_cubierto_si, // 'true' o 'false'
            parqueadero_visitantes_si, // 'true' o 'false'
            parqueadero_descubierto_si, // 'true' o 'false'
        } = req.query;

        const whereInmueble = { Estado: 'disponible' };
        const includeOptions = [];

        // --- Filtros de Division ---
        const whereDivision = {};
        if (num_habitaciones !== undefined) whereDivision.Numero_habitaciones = parseInt(num_habitaciones, 10);
        if (min_habitaciones !== undefined || max_habitaciones !== undefined) {
            whereDivision.Numero_habitaciones = {
                ...(min_habitaciones !== undefined && { [Op.gte]: parseInt(min_habitaciones, 10) }),
                ...(max_habitaciones !== undefined && { [Op.lte]: parseInt(max_habitaciones, 10) }),
            };
        }
        if (num_baños !== undefined) whereDivision.Numero_baños = parseInt(num_baños, 10);
        if (min_baños !== undefined || max_baños !== undefined) {
            whereDivision.Numero_baños = {
                ...(min_baños !== undefined && { [Op.gte]: parseInt(min_baños, 10) }),
                ...(max_baños !== undefined && { [Op.lte]: parseInt(max_baños, 10) }),
            };
        }
        if (tipo_cocina) whereDivision.Tipo_cocina = tipo_cocina;
        if (balcon_si !== undefined) whereDivision.Balcon_si = balcon_si === 'true';
        if (terraza_mayor_cero !== undefined) whereDivision.Numero_terrazas = { [Op.gt]: 0 };
        if (num_terrazas !== undefined) whereDivision.Numero_terrazas = parseInt(num_terrazas, 10);
        if (garaje_mayor_cero !== undefined) whereDivision.Numero_garajes = { [Op.gt]: 0 };
        if (num_garajes !== undefined) whereDivision.Numero_garajes = parseInt(num_garajes, 10);
        if (ascensores_si !== undefined) whereDivision.Ascensores_si = ascensores_si === 'true';
        if (min_closets !== undefined) whereDivision.Numero_closets = { [Op.gte]: parseInt(min_closets, 10) };
        if (num_closets !== undefined) whereDivision.Numero_closets = parseInt(num_closets, 10);

        if (Object.keys(whereDivision).length > 0) {
            includeOptions.push({
                model: division, // Usando el nombre corregido
                as: 'division',
                required: true,
                where: whereDivision,
            });
        }

        // --- Filtros de OtrasCaracteristicas ---
        const whereOtrasCaracteristicas = {};
        if (mascotas_permitidas_si !== undefined) whereOtrasCaracteristicas.Mascotas_permitidas_si = mascotas_permitidas_si === 'true';
        if (zona_lavanderia_si !== undefined) whereOtrasCaracteristicas.Zona_lavanderia_si = zona_lavanderia_si === 'true';
        if (calentador_agua_si !== undefined) whereOtrasCaracteristicas.Calentador_agua_si = calentador_agua_si === 'true';

        if (Object.keys(whereOtrasCaracteristicas).length > 0) {
            includeOptions.push({
                model: OtrasCaracteristicas,
                as: 'otrasCaracteristicas',
                required: true,
                where: whereOtrasCaracteristicas,
            });
        }

        // --- Filtros de Asignacion ---
        const whereAsignacion = {};
        if (uso_comercial_si !== undefined) whereAsignacion.Uso_comercial_si = uso_comercial_si === 'true';
        if (uso_residencial_si !== undefined) whereAsignacion.Uso_residencial_si = uso_residencial_si === 'true';

        if (Object.keys(whereAsignacion).length > 0) {
            includeOptions.push({
                model: asignacion, // Usando el nombre corregido
                as: 'asignacion',
                required: true,
                where: whereAsignacion,
            });
        }

        // --- Filtros de OrganizacionParqueadero ---
        const whereOrganizacionParqueadero = {};
        if (parqueadero_cubierto_si !== undefined) whereOrganizacionParqueadero.Parqueadero_cubierto_si = parqueadero_cubierto_si === 'true';
        if (parqueadero_visitantes_si !== undefined) whereOrganizacionParqueadero.Parqueadero_visitantes_si = parqueadero_visitantes_si === 'true';
        if (parqueadero_descubierto_si !== undefined) whereOrganizacionParqueadero.Parqueadero_descubierto_si = parqueadero_descubierto_si === 'true';

        if (Object.keys(whereOrganizacionParqueadero).length > 0) {
            includeOptions.push({
                model: organizacionParqueadero, // Usando el nombre corregido
                as: 'organizacionParqueadero',
                required: true,
                where: whereOrganizacionParqueadero,
            });
        }

        const inmuebles = await Inmueble.findAll({
            where: whereInmueble,
            include: includeOptions,
        });

        if (inmuebles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron inmuebles con los criterios de detalle especificados.' });
        }

        res.status(200).json(inmuebles);
    } catch (error) {
        console.error('Error al obtener inmuebles por detalles:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener inmuebles por detalles.', error: error.message });
    }
}

// ¡Perfecto! Ahora entiendo que quieres el controlador específico para la consulta de "Detalles Específicos del Inmueble" (que involucra las tablas division, otras_caracteristicas, y organizacion_parqueadero) tal como lo describes en tu primer bloque de SQL.

// Este controlador será más simple que el anterior, ya que se centrará solo en estos filtros.

// Aquí tienes el controlador getFilteredInmueblesByDetails que puedes agregar a tu proyecto:

// JavaScript

// import { Op } from 'sequelize';
// import Inmueble from '../models/inmueble.js'; // Asegúrate de que el path sea correcto
// import Division from '../models/division.js';
// import OtrasCaracteristicas from '../models/otras_caracteristicas.js';
// import Asignacion from '../models/asignacion.js';
// import OrganizacionParqueadero from '../models/organizacion_parqueadero.js';

// export async function getFilteredInmueblesByDetails(req, res) {
//     try {
//         const {
//             // Filtros de Division
//             num_habitaciones,
//             min_habitaciones, // Para rango
//             max_habitaciones, // Para rango
//             num_baños,
//             min_baños,      // Para rango
//             max_baños,      // Para rango
//             tipo_cocina,    // 'Integral', 'Abierta', 'Cerrada'
//             balcon_si,      // 'true' o 'false'
//             terraza_mayor_cero, // 'true' o 'false' (si hay al menos una terraza)
//             num_terrazas,   // Para número exacto de terrazas
//             garaje_mayor_cero,  // 'true' o 'false' (si hay al menos un garaje)
//             num_garajes,    // Para número exacto de garajes
//             ascensores_si,  // 'true' o 'false'
//             min_closets,    // Para un mínimo de closets
//             num_closets,    // Para número exacto de closets
//             estudio_si,     // 'true' o 'false' (asume 1 para TRUE)
//             sala_si,        // 'true' o 'false' (asume 1 para TRUE)
//             comedor_si,     // 'true' o 'false' (asume 1 para TRUE)
//             zona_lavanderia_si, // 'true' o 'false' (asume 1 para TRUE)
//             deposito_division_si, // 'true' o 'false' (asume 1 para TRUE)

//             // Filtros de Otras_caracteristicas
//             lavanderia_oc_si, // 'true' o 'false' (asume 1 para TRUE)
//             gas_oc_si,        // 'true' o 'false' (asume 1 para TRUE)
//             numero_piso,
//             min_piso,       // Para rango
//             max_piso,       // Para rango
//             mascotas_permitidas_si, // 'true' o 'false' (asume 1 para TRUE)
//             amoblado_si,    // 'true' o 'false' (asume 1 para TRUE)
//             deposito_oc_mayor_cero, // 'true' o 'false' (si hay al menos un depósito)
//             num_depositos_oc, // Para número exacto de depósitos

//             // Filtros de Organizacion_parqueadero
//             cantidad_parqueaderos_mayor_cero, // 'true' o 'false' (si hay al menos un parqueadero)
//             tipo_parqueadero,   // 'Propio', 'Visitantes', 'Comunal'
//             parqueadero_cubierto_si, // 'true' o 'false' (asume 1 para TRUE)
//             parqueadero_disponible_si // 'true' o 'false' (asume 1 para TRUE)

//         } = req.query; // Usamos req.query para los parámetros de la URL

//         // Inicializar un objeto de condiciones WHERE para cada modelo
//         const whereConditions = { Estado: 'disponible' }; // Filtro base para Inmueble
//         const divisionWhere = {};
//         const otrasCaracteristicasWhere = {};
//         const organizacionParqueaderoWhere = {};

//         // Función auxiliar para añadir condiciones a los objetos where
//         const addCondition = (targetWhere, key, value) => {
//             if (value !== undefined && value !== null && value !== '') {
//                 targetWhere[key] = value;
//             }
//         };

//         // =========================================================
//         // Filtros de Division
//         // =========================================================

//         if (num_habitaciones) {
//             addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
//         } else if (min_habitaciones || max_habitaciones) {
//             divisionWhere.Habitaciones = {
//                 ...(min_habitaciones && { [Op.gte]: min_habitaciones }),
//                 ...(max_habitaciones && { [Op.lte]: max_habitaciones })
//             };
//         }

//         if (num_baños) {
//             addCondition(divisionWhere, 'Baños', num_baños);
//         } else if (min_baños || max_baños) {
//             divisionWhere.Baños = {
//                 ...(min_baños && { [Op.gte]: min_baños }),
//                 ...(max_baños && { [Op.lte]: max_baños })
//             };
//         }

//         addCondition(divisionWhere, 'Cocina', tipo_cocina);
//         if (balcon_si === 'true') divisionWhere.Balcon = 'Sí';
//         if (balcon_si === 'false') divisionWhere.Balcon = 'No'; // O si quieres permitir 'No'

//         if (num_terrazas) {
//             addCondition(divisionWhere, 'Terraza', num_terrazas);
//         } else if (terraza_mayor_cero === 'true') {
//             divisionWhere.Terraza = { [Op.gt]: 0 };
//         }

//         if (num_garajes) {
//             addCondition(divisionWhere, 'Garaje', num_garajes);
//         } else if (garaje_mayor_cero === 'true') {
//             divisionWhere.Garaje = { [Op.gt]: 0 };
//         }

//         if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí';
//         if (ascensores_si === 'false') divisionWhere.Ascensores = 'No'; // O si quieres permitir 'No'

//         if (num_closets) {
//             addCondition(divisionWhere, 'Closets', num_closets);
//         } else if (min_closets) {
//             divisionWhere.Closets = { [Op.gte]: min_closets };
//         }

//         if (estudio_si === 'true') divisionWhere.Estudio = 1;
//         if (sala_si === 'true') divisionWhere.Sala = 1;
//         if (comedor_si === 'true') divisionWhere.Comedor = 1;
//         if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
//         if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

//         // =========================================================
//         // Filtros de Otras_caracteristicas
//         // =========================================================

//         if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
//         if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

//         if (numero_piso) {
//             addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
//         } else if (min_piso || max_piso) {
//             otrasCaracteristicasWhere.Piso = {
//                 ...(min_piso && { [Op.gte]: min_piso }),
//                 ...(max_piso && { [Op.lte]: max_piso })
//             };
//         }

//         if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
//         if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;

//         if (num_depositos_oc) {
//             addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
//         } else if (deposito_oc_mayor_cero === 'true') {
//             otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };
//         }

//         // =========================================================
//         // Filtros de Organizacion_parqueadero
//         // =========================================================

//         if (cantidad_parqueaderos_mayor_cero === 'true') {
//             organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
//         }
//         addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
//         if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
//         if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

//         // Construir la consulta Sequelize
//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: [
//                 {
//                     model: Division,
//                     as: 'Division', // Asegúrate de que este alias coincida con la asociación en tu modelo Inmueble
//                     required: Object.keys(divisionWhere).length > 0, // JOIN si hay condiciones, sino LEFT JOIN (opcional)
//                     where: divisionWhere
//                 },
//                 {
//                     model: OtrasCaracteristicas,
//                     as: 'OtrasCaracteristicas', // Alias
//                     required: Object.keys(otrasCaracteristicasWhere).length > 0 || Object.keys(organizacionParqueaderoWhere).length > 0, // JOIN si hay condiciones en OC o OP
//                     where: otrasCaracteristicasWhere,
//                     include: [
//                         {
//                             model: Asignacion,
//                             as: 'Asignacion', // Alias
//                             required: Object.keys(organizacionParqueaderoWhere).length > 0, // JOIN si hay condiciones en OP
//                             include: [
//                                 {
//                                     model: OrganizacionParqueadero,
//                                     as: 'OrganizacionParqueadero', // Alias
//                                     required: Object.keys(organizacionParqueaderoWhere).length > 0, // JOIN si hay condiciones
//                                     where: organizacionParqueaderoWhere
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//                 // Si tienes otras asociaciones en Inmueble que siempre necesites, inclúyelas aquí sin 'required: true'
//                 // para que sean LEFT JOINs si no hay filtros específicos para ellas.
//             ],
//             // Puedes añadir order si es necesario, por ejemplo:
//             // order: [['Fecha_publicacion', 'DESC']]
//         });

//         res.json(filteredInmuebles);

//     } catch (error) {
//         console.error('Error al obtener inmuebles filtrados por detalles específicos:', error);
//         res.status(500).json({ error: error.message });
//     }
// }
// Puntos Clave y Consideraciones:
// Parámetros de Entrada (req.query):

// Todos los filtros se esperan como parámetros de consulta en la URL (ej. GET /api/inmuebles/detalles?num_habitaciones=3&tipo_cocina=Integral).
// Los valores booleanos (como balcon_si) se esperan como cadenas 'true' o 'false'. El controlador los convierte a Sí/No o 1/0 según lo que tu base de datos espera.
// Lógica de WHERE Dinámica:

// Se inicializan objetos where vacíos para division, otrasCaracteristicas y organizacionParqueadero.
// La función addCondition es crucial: solo añade una propiedad al objeto where si el valor del parámetro no es undefined, null o una cadena vacía (''). Esto asegura que solo se apliquen los filtros que el usuario haya especificado.
// Para rangos (ej., min_habitaciones, max_habitaciones), se utiliza Op.gte y Op.lte.
// Para condiciones de "al menos uno" (ej., terraza_mayor_cero), se usa Op.gt (mayor que 0).
// Configuración de include (JOINs):

// as aliases: Es fundamental que el alias (as: 'Division', as: 'OtrasCaracteristicas', etc.) en las inclusiones (include) coincida con el alias que definiste en tus asociaciones en el modelo Inmueble. Por ejemplo:
// JavaScript

// Inmueble.belongsTo(Division, { foreignKey: 'Division_FK', as: 'Division' });
// // ... y así sucesivamente
// required: true/false: Este es un punto importante para el rendimiento y la precisión de los resultados.
// required: true: Resulta en un INNER JOIN. Esto significa que solo se devolverán inmuebles que tengan datos en la tabla unida y que cumplan las condiciones del WHERE de esa tabla. Se usa cuando el filtro en esa tabla es mandatorio.
// required: false: Resulta en un LEFT JOIN. Esto significa que los inmuebles se devolverán incluso si no tienen datos en la tabla unida o si no cumplen las condiciones de esa tabla.
// Lógica implementada: He puesto required: Object.keys(someWhereObject).length > 0. Esto significa que Sequelize generará un INNER JOIN para Division si el usuario ha especificado cualquier filtro que afecte a la tabla division. Lo mismo para OtrasCaracteristicas y OrganizacionParqueadero (que se conecta a través de Asignacion). Si no hay filtros para una de esas tablas, Sequelize realizará un LEFT JOIN o simplemente no la unirá si no es estrictamente necesaria para la consulta. Esto es óptimo.
// Cómo usar este controlador:
// Guarda el código: Guarda este código en un archivo dentro de tu carpeta controllers, por ejemplo, controllers/inmueblesDetallesController.js.
// Importa los modelos: Asegúrate de que los import al inicio del archivo apunten a la ubicación correcta de tus modelos de Sequelize.
// Define tus asociaciones: Como mencioné, es crucial que tus modelos de Sequelize (Inmueble, Division, OtrasCaracteristicas, Asignacion, OrganizacionParqueadero) tengan definidas las asociaciones (belongsTo, hasOne) entre sí con los as aliases correctos.
// Crea una ruta en tu aplicación:
// JavaScript

// // routes/inmuebles.js (o un archivo de rutas similar)
// import express from 'express';
// import { getFilteredInmueblesByDetails } from '../controllers/inmueblesDetallesController.js'; // Ajusta el path

// const router = express.Router();

// router.get('/inmuebles/filter-details', getFilteredInmueblesByDetails);

// export default router;
// Ejecuta tu servidor: Y podrás probarlo con URLs como:
// GET /api/inmuebles/filter-details?num_habitaciones=3
// GET /api/inmuebles/filter-details?min_baños=2&max_baños=3&tipo_cocina=Integral
// GET /api/inmuebles/filter-details?mascotas_permitidas_si=true&parqueadero_cubierto_si=true
// GET /api/inmuebles/filter-details?min_piso=5&deposito_oc_mayor_cero=true
// Este controlador te proporcionará una API robusta y flexible para filtrar inmuebles basándote únicamente en los detalles específicos que solicitaste.