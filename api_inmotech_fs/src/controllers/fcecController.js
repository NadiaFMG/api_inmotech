// =========================================================================
// IMPORTACIÓN DE MODELOS
// Asegúrate de que los paths a tus modelos sean correctos.
// Es CRÍTICO que todas las asociaciones (belongsTo, hasOne, etc.)
// estén definidas en tus modelos con los 'as' aliases correspondientes.
// =========================================================================
import Inmueble from '../models/inmueble.js'; falta
import Division from '../models/division.js'; //division
import OtrasCaracteristicas from '../models/otras_caracteristicas.js'; //falta
import Asignacion from '../models/asignacion.js'; //asignacion
import OrganizacionParqueadero from '../models/organizacion_parqueadero.js'; //organizacionParqueadero
import AcercaEdificacion from '../models/acerca_edificacion.js'; //Acerca_edificacion
import TipoEdificacion from '../models/tipoEdificacionModel.js';
import Direccion from '../models/direccion.js';
import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
import Barrio from '../models/barrio.js';
import Ciudad from '../models/ciudad.js';
import Corregimiento from '../models/corregimiento.js';
import Vereda from '../models/vereda.js'; //vereda
import Municipio from '../models/municipio.js'; //municipio
import Ndap from '../models/ndap.js'; //ndap
import DesignadorCardinal from '../models/designador_cardinal.js';
import Localizacion from '../models/localizacion.js';
import PlatformUser from '../models/platform_user.js'; //falta
import PlatformProfile from '../models/platform_profile.js'; //falta

// =========================================================================
// FUNCIONES AUXILIARES
// =========================================================================

// Función auxiliar para añadir condiciones a los objetos where internos
const addCondition = (targetWhere, key, value) => {
    // Solo añade la condición si el valor no es nulo, indefinido o cadena vacía
    if (value !== undefined && value !== null && value !== '') {
        targetWhere[key] = value;
    }
};

// =========================================================================
// CONTROLADOR 1: Filtros de Detalles Específicos del Inmueble
// Tablas involucradas: inmueble, division, otras_caracteristicas, asignacion, organizacion_parqueadero
// =========================================================================
export async function getInmueblesBySpecificDetails(req, res) {
    try {
        const {
            // Filtros de Division
            num_habitaciones, min_habitaciones, max_habitaciones,
            num_baños, min_baños, max_baños,
            tipo_cocina,
            balcon_si, // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false' (si hay al menos una terraza)
            num_terrazas, // Para número exacto de terrazas
            garaje_mayor_cero, // 'true' o 'false' (si hay al menos un garaje)
            num_garajes, // Para número exacto de garajes
            ascensores_si, // 'true' o 'false'
            min_closets, // Para un mínimo de closets
            num_closets, // Para número exacto de closets
            estudio_si, // 'true' o 'false' (asume 1 para TRUE)
            sala_si, // 'true' o 'false' (asume 1 para TRUE)
            comedor_si, // 'true' o 'false' (asume 1 para TRUE)
            zona_lavanderia_si, // 'true' o 'false' (asume 1 para TRUE)
            deposito_division_si, // 'true' o 'false' (asume 1 para TRUE)

            // Filtros de Otras_caracteristicas
            lavanderia_oc_si, // 'true' o 'false' (asume 1 para TRUE)
            gas_oc_si, // 'true' o 'false' (asume 1 para TRUE)
            numero_piso,
            min_piso, // Para rango
            max_piso, // Para rango
            mascotas_permitidas_si, // 'true' o 'false' (asume 1 para TRUE)
            amoblado_si, // 'true' o 'false' (asume 1 para TRUE)
            deposito_oc_mayor_cero, // 'true' o 'false' (si hay al menos un depósito)
            num_depositos_oc, // Para número exacto de depósitos

            // Filtros de Organizacion_parqueadero
            cantidad_parqueaderos_mayor_cero, // 'true' o 'false' (si hay al menos un parqueadero)
            tipo_parqueadero, // 'Propio', 'Visitantes', 'Comunal'
            parqueadero_cubierto_si, // 'true' o 'false' (asume 1 para TRUE)
            parqueadero_disponible_si // 'true' o 'false' (asume 1 para TRUE)

        } = req.query;

        const whereConditions = { Estado: 'disponible' }; // Filtro base para Inmueble
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};

        // Lógica para construir las condiciones WHERE para cada tabla
        // (Duplicado del controlador anterior, pero encapsulado aquí)
        // Filtros de Division
        if (num_habitaciones) addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        else if (min_habitaciones || max_habitaciones) divisionWhere.Habitaciones = { ...(min_habitaciones && { [Op.gte]: min_habitaciones }), ...(max_habitaciones && { [Op.lte]: max_habitaciones }) };

        if (num_baños) addCondition(divisionWhere, 'Baños', num_baños);
        else if (min_baños || max_baños) divisionWhere.Baños = { ...(min_baños && { [Op.gte]: min_baños }), ...(max_baños && { [Op.lte]: max_baños }) };

        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí'; else if (balcon_si === 'false') divisionWhere.Balcon = 'No';

        if (num_terrazas) addCondition(divisionWhere, 'Terraza', num_terrazas);
        else if (terraza_mayor_cero === 'true') divisionWhere.Terraza = { [Op.gt]: 0 };

        if (num_garajes) addCondition(divisionWhere, 'Garaje', num_garajes);
        else if (garaje_mayor_cero === 'true') divisionWhere.Garaje = { [Op.gt]: 0 };

        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí'; else if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';
        if (num_closets) addCondition(divisionWhere, 'Closets', num_closets); else if (min_closets) divisionWhere.Closets = { [Op.gte]: min_closets };

        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        // Filtros de Otras_caracteristicas
        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

        if (numero_piso) addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        else if (min_piso || max_piso) otrasCaracteristicasWhere.Piso = { ...(min_piso && { [Op.gte]: min_piso }), ...(max_piso && { [Op.lte]: max_piso }) };

        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;
        if (num_depositos_oc) addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
        else if (deposito_oc_mayor_cero === 'true') otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };

        // Filtros de Organizacion_parqueadero
        if (cantidad_parqueaderos_mayor_cero === 'true') organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: Division,
                    as: 'Division',
                    required: Object.keys(divisionWhere).length > 0,
                    where: divisionWhere
                },
                {
                    model: OtrasCaracteristicas,
                    as: 'OtrasCaracteristicas',
                    required: Object.keys(otrasCaracteristicasWhere).length > 0 || Object.keys(organizacionParqueaderoWhere).length > 0,
                    where: otrasCaracteristicasWhere,
                    include: [
                        {
                            model: Asignacion,
                            as: 'Asignacion',
                            required: Object.keys(organizacionParqueaderoWhere).length > 0,
                            include: [
                                {
                                    model: OrganizacionParqueadero,
                                    as: 'OrganizacionParqueadero',
                                    required: Object.keys(organizacionParqueaderoWhere).length > 0,
                                    where: organizacionParqueaderoWhere
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        res.json(filteredInmuebles);
    } catch (error) {
        console.error('Error en getInmueblesBySpecificDetails:', error);
        res.status(500).json({ error: error.message });
    }
}

// =========================================================================
// CONTROLADOR 2: Filtros por Características de la Edificación/Conjunto
// Tablas involucradas: inmueble, acerca_edificacion
// =========================================================================
export async function getInmueblesByEdificationCharacteristics(req, res) {
    try {
        const {
            estrato_param,
            tipo_construccion_param,
            anio_construccion_min_param, anio_construccion_max_param,
            estado_conservacion_param,
            zona_comun_param // 'true' o 'false'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const acercaEdificacionWhere = {};

        addCondition(acercaEdificacionWhere, 'Estrato', estrato_param);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion_param);

        if (anio_construccion_min_param || anio_construccion_max_param) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min_param && { [Op.gte]: anio_construccion_min_param }),
                ...(anio_construccion_max_param && { [Op.lte]: anio_construccion_max_param })
            };
        }

        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion_param);
        if (zona_comun_param === 'true') acercaEdificacionWhere.Zona_comun = 1;
        else if (zona_comun_param === 'false') acercaEdificacionWhere.Zona_comun = 0;

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: AcercaEdificacion,
                    as: 'AcercaEdificacion', // Asegúrate de que este alias coincida
                    required: Object.keys(acercaEdificacionWhere).length > 0,
                    where: acercaEdificacionWhere
                }
            ]
        });

        res.json(filteredInmuebles);
    } catch (error) {
        console.error('Error en getInmueblesByEdificationCharacteristics:', error);
        res.status(500).json({ error: error.message });
    }
}

// =========================================================================
// CONTROLADOR 3: Filtros por Tipo de Inmueble y Características Generales
// Tablas involucradas: inmueble, tipo_edificacion
// =========================================================================
export async function getInmueblesByTypeAndGeneralCharacteristics(req, res) {
    try {
        const {
            tipo_edificacion_categoria_param,
            motivo_transaccion_param,
            precio_min_param, precio_max_param,
            area_min_param, area_max_param,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años' o un número
            codigo_interno_param
        } = req.query;

        const whereConditions = { Estado: 'disponible' }; // Filtro base

        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion_param);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno_param);

        if (precio_min_param || precio_max_param) {
            whereConditions.Valor = {
                ...(precio_min_param && { [Op.gte]: precio_min_param }),
                ...(precio_max_param && { [Op.lte]: precio_max_param })
            };
        }
        if (area_min_param || area_max_param) {
            whereConditions.Area = {
                ...(area_min_param && { [Op.gte]: area_min_param }),
                ...(area_max_param && { [Op.lte]: area_max_param })
            };
        }

        if (antiguedad_param) {
            switch (antiguedad_param) {
                case 'Nueva':
                    whereConditions.Antiguedad = 0;
                    break;
                case 'Menos de 5 años':
                    whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
                    break;
                case '5-10 años':
                    whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
                    break;
                case 'Mas de 10 años':
                    whereConditions.Antiguedad = { [Op.gt]: 10 };
                    break;
                default:
                    // Si se pasa un número directamente
                    addCondition(whereConditions, 'Antiguedad', antiguedad_param);
                    break;
            }
        }

        const tipoEdificacionWhere = {};
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria_param);

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: TipoEdificacion,
                    as: 'TipoEdificacion', // Asegúrate de que este alias coincida
                    required: Object.keys(tipoEdificacionWhere).length > 0,
                    where: tipoEdificacionWhere
                }
            ]
        });

        res.json(filteredInmuebles);
    } catch (error) {
        console.error('Error en getInmueblesByTypeAndGeneralCharacteristics:', error);
        res.status(500).json({ error: error.message });
    }
}

// =========================================================================
// CONTROLADOR 4: Filtros de Ubicación
// Tablas involucradas: inmueble, direccion, barrio_ciudad_corregimiento_vereda,
// barrio, ciudad, corregimiento, vereda, municipio, ndap, designador_cardinal, localizacion
// =========================================================================
export async function getInmueblesByLocation(req, res) {
    try {
        const {
            ndap_id_param,
            municipio_id_param,
            ubicacion_especifica_id_param,
            tipo_ubicacion_param, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
            tipo_via_param,
            numero_via_principal_param,
            numero_calle_transversal_param,
            numero_edificacion_param,
            designador_cardinal_id_param,
            latitud_centro,
            longitud_centro,
            radio_km
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const direccionWhere = {};
        const bccvWhere = {}; // Para BarrioCiudadCorregimientoVereda
        const ciudadWhere = {}; // No se usa directamente si bccvWhere maneja el FK
        const corregimientoWhere = {}; // No se usa directamente si bccvWhere maneja el FK
        const veredaWhere = {}; // No se usa directamente si bccvWhere maneja el FK
        const municipioWhere = {}; // Para el municipio en general
        const ndapWhere = {}; // Para el NDAP en general
        const designadorCardinalWhere = {};
        const localizacionWhere = {};

        // Filtro por dirección exacta
        if (tipo_via_param && numero_via_principal_param && numero_calle_transversal_param && numero_edificacion_param) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via_param);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal_param);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal_param);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion_param);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id_param);


        // Filtro por NDAP (Departamento)
        if (ndap_id_param) {
            addCondition(ndapWhere, 'Ndap_id', ndap_id_param);
        }

        // Filtro por Municipio
        if (municipio_id_param) {
            addCondition(municipioWhere, 'Municipio_id', municipio_id_param);
        }

        // Filtro por Ubicación Específica (barrio, ciudad, corregimiento, vereda)
        let specificLocationInclude = null;

        if (ubicacion_especifica_id_param && tipo_ubicacion_param) {
            if (tipo_ubicacion_param === 'barrio') {
                bccvWhere.Barrio_FK = ubicacion_especifica_id_param;
                specificLocationInclude = { model: Barrio, as: 'Barrio', required: true };
            } else if (tipo_ubicacion_param === 'ciudad') {
                bccvWhere.Ciudad_FK = ubicacion_especifica_id_param;
                specificLocationInclude = { model: Ciudad, as: 'Ciudad', required: true };
            } else if (tipo_ubicacion_param === 'corregimiento') {
                bccvWhere.Corregimiento_FK = ubicacion_especifica_id_param;
                specificLocationInclude = { model: Corregimiento, as: 'Corregimiento', required: true };
            } else if (tipo_ubicacion_param === 'vereda') {
                bccvWhere.Vereda_Fk = ubicacion_especifica_id_param; // Aquí el nombre de la columna es 'Vereda_Fk'
                specificLocationInclude = { model: Vereda, as: 'Vereda', required: true };
            }
        }

        let order = [['Fecha_publicacion', 'DESC']]; // Orden por defecto

        // Filtro por radio de distancia (Haversine)
        if (latitud_centro && longitud_centro && radio_km) {
            const distanceLiteral = literal(
                `(6371 * acos(cos(radians(${latitud_centro})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud_centro})) + sin(radians(${latitud_centro})) * sin(radians(Localizacion.Latitud))))`
            );

            // Asegurarse de que Localizacion se incluya y que Latitud/Longitud no sean nulos
            localizacionWhere.Latitud = { [Op.ne]: null };
            localizacionWhere.Longitud = { [Op.ne]: null };

            whereConditions[Op.and] = [
                ...(whereConditions[Op.and] || []),
                literal(`${distanceLiteral.val} <= ${radio_km}`)
            ];
            order = [[distanceLiteral, 'ASC'], ...order];
        }

        const includeConditions = [
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            specificLocationInclude, // Esto manejará el include para Barrio/Ciudad/Corregimiento/Vereda
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Ciudad, as: 'Ciudad', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Corregimiento, as: 'Corregimiento', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Vereda, as: 'Vereda', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                        ].filter(Boolean) // Filtra los nulos si no se usan
                    },
                    {
                        model: DesignadorCardinal,
                        as: 'DesignadorCardinal',
                        required: Object.keys(designadorCardinalWhere).length > 0,
                        where: designadorCardinalWhere
                    },
                    {
                        model: Localizacion,
                        as: 'Localizacion',
                        required: Object.keys(localizacionWhere).length > 0,
                        where: localizacionWhere
                    }
                ].filter(Boolean)
            }
        ];

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeConditions,
            order: order
        });

        res.json(filteredInmuebles);
    } catch (error) {
        console.error('Error en getInmueblesByLocation:', error);
        res.status(500).json({ error: error.message });
    }
}

// =========================================================================
// CONTROLADOR 5: Filtros por Quién Publica
// Tablas involucradas: inmueble, platform_user, platform_profile
// =========================================================================
export async function getInmueblesByPublisher(req, res) {
    try {
        const {
            platform_user_id_param,
            tipo_anunciante_param // Asume que 'Profile_type' es una columna en platform_profile
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const platformUserWhere = {};
        const platformProfileWhere = {};

        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id_param);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante_param);

        const includeConditions = [
            {
                model: PlatformUser,
                as: 'PlatformUser', // Asegúrate de que este alias coincida con tu asociación en Inmueble
                required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0,
                where: platformUserWhere,
                include: [
                    {
                        model: PlatformProfile,
                        as: 'PlatformProfile', // Asegúrate de que este alias coincida con tu asociación en PlatformUser
                        required: Object.keys(platformProfileWhere).length > 0,
                        where: platformProfileWhere
                    }
                ]
            }
        ];

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeConditions
        });

        res.json(filteredInmuebles);
    } catch (error) {
        console.error('Error en getInmueblesByPublisher:', error);
        res.status(500).json({ error: error.message });
    }
}

// =========================================================================
// CONTROLADOR 6: Unificado (Combina todos los filtros de los 5 controladores anteriores)
// Este es el más completo y flexible, maneja todos los filtros combinados.
// =========================================================================
export async function getFilteredInmueblesUnified(req, res) {
    try {
        const {
            // Filtros de Detalles Específicos (division, otras_caracteristicas, organizacion_parqueadero)
            num_habitaciones, min_habitaciones, max_habitaciones,
            num_baños, min_baños, max_baños,
            tipo_cocina,
            balcon_si,
            terraza_mayor_cero, num_terrazas,
            garaje_mayor_cero, num_garajes,
            ascensores_si,
            min_closets, num_closets,
            estudio_si, sala_si, comedor_si,
            zona_lavanderia_si,
            deposito_division_si,
            lavanderia_oc_si, gas_oc_si,
            numero_piso, min_piso, max_piso,
            mascotas_permitidas_si, amoblado_si,
            deposito_oc_mayor_cero, num_depositos_oc,
            cantidad_parqueaderos_mayor_cero,
            tipo_parqueadero,
            parqueadero_cubierto_si,
            parqueadero_disponible_si,

            // Filtros de Características de la Edificación/Conjunto (acerca_edificacion)
            estrato_param,
            tipo_construccion_param,
            anio_construccion_min_param,
            anio_construccion_max_param,
            estado_conservacion_param,
            zona_comun_param,

            // Filtros de Tipo de Inmueble y Características Generales (inmueble, tipo_edificacion)
            estado_inmueble_param = 'disponible', // Valor por defecto
            motivo_transaccion_param,
            precio_min_param,
            precio_max_param,
            area_min_param,
            area_max_param,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años' o un número
            codigo_interno_param,
            tipo_edificacion_categoria_param, // Movido aquí

            // Filtros de Ubicación (direccion, etc.)
            ndap_id_param,
            municipio_id_param,
            ubicacion_especifica_id_param,
            tipo_ubicacion_param, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
            tipo_via_param,
            numero_via_principal_param,
            numero_calle_transversal_param,
            numero_edificacion_param,
            designador_cardinal_id_param,
            latitud_centro,
            longitud_centro,
            radio_km,

            // Filtros de Quién Publica (platform_user, platform_profile)
            platform_user_id_param,
            tipo_anunciante_param

        } = req.query;

        const whereConditions = {
            Estado: estado_inmueble_param
        };
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const acercaEdificacionWhere = {};
        const tipoEdificacionWhere = {};
        const direccionWhere = {};
        const bccvWhere = {};
        const ciudadWhere = {};
        const corregimientoWhere = {};
        const veredaWhere = {};
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};


        // =========================================================
        // Lógica de Construcción de Condiciones WHERE
        // (Esto es similar a la que ya has visto, aplicado a cada grupo de filtros)
        // =========================================================

        // --- Detalles Específicos (Division, Otras_Caracteristicas, Organizacion_Parqueadero) ---
        if (num_habitaciones) addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        else if (min_habitaciones || max_habitaciones) divisionWhere.Habitaciones = { ...(min_habitaciones && { [Op.gte]: min_habitaciones }), ...(max_habitaciones && { [Op.lte]: max_habitaciones }) };
        if (num_baños) addCondition(divisionWhere, 'Baños', num_baños);
        else if (min_baños || max_baños) divisionWhere.Baños = { ...(min_baños && { [Op.gte]: min_baños }), ...(max_baños && { [Op.lte]: max_baños }) };
        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí'; else if (balcon_si === 'false') divisionWhere.Balcon = 'No';
        if (num_terrazas) addCondition(divisionWhere, 'Terraza', num_terrazas); else if (terraza_mayor_cero === 'true') divisionWhere.Terraza = { [Op.gt]: 0 };
        if (num_garajes) addCondition(divisionWhere, 'Garaje', num_garajes); else if (garaje_mayor_cero === 'true') divisionWhere.Garaje = { [Op.gt]: 0 };
        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí'; else if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';
        if (num_closets) addCondition(divisionWhere, 'Closets', num_closets); else if (min_closets) divisionWhere.Closets = { [Op.gte]: min_closets };
        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;
        if (numero_piso) addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        else if (min_piso || max_piso) otrasCaracteristicasWhere.Piso = { ...(min_piso && { [Op.gte]: min_piso }), ...(max_piso && { [Op.lte]: max_piso }) };
        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;
        if (num_depositos_oc) addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc); else if (deposito_oc_mayor_cero === 'true') otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };

        if (cantidad_parqueaderos_mayor_cero === 'true') organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        // --- Características de la Edificación/Conjunto (Acerca_Edificacion) ---
        addCondition(acercaEdificacionWhere, 'Estrato', estrato_param);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion_param);
        if (anio_construccion_min_param || anio_construccion_max_param) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min_param && { [Op.gte]: anio_construccion_min_param }),
                ...(anio_construccion_max_param && { [Op.lte]: anio_construccion_max_param })
            };
        }
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion_param);
        if (zona_comun_param === 'true') acercaEdificacionWhere.Zona_comun = 1; else if (zona_comun_param === 'false') acercaEdificacionWhere.Zona_comun = 0;

        // --- Tipo de Inmueble y Características Generales (Inmueble, Tipo_Edificacion) ---
        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion_param);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno_param);
        if (precio_min_param || precio_max_param) {
            whereConditions.Valor = { ...(precio_min_param && { [Op.gte]: precio_min_param }), ...(precio_max_param && { [Op.lte]: precio_max_param }) };
        }
        if (area_min_param || area_max_param) {
            whereConditions.Area = { ...(area_min_param && { [Op.gte]: area_min_param }), ...(area_max_param && { [Op.lte]: area_max_param }) };
        }
        if (antiguedad_param) {
            switch (antiguedad_param) {
                case 'Nueva': whereConditions.Antiguedad = 0; break;
                case 'Menos de 5 años': whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 }; break;
                case '5-10 años': whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 }; break;
                case 'Mas de 10 años': whereConditions.Antiguedad = { [Op.gt]: 10 }; break;
                default: addCondition(whereConditions, 'Antiguedad', antiguedad_param); break;
            }
        }
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria_param);


        // --- Ubicación (Direccion, BarrioCiudadCorregimientoVereda, etc.) ---
        if (tipo_via_param && numero_via_principal_param && numero_calle_transversal_param && numero_edificacion_param) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via_param);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal_param);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal_param);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion_param);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id_param);

        if (ndap_id_param) addCondition(ndapWhere, 'Ndap_id', ndap_id_param);
        if (municipio_id_param) addCondition(municipioWhere, 'Municipio_id', municipio_id_param);

        let specificLocationInclude = null;
        if (ubicacion_especifica_id_param && tipo_ubicacion_param) {
            if (tipo_ubicacion_param === 'barrio') { bccvWhere.Barrio_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Barrio, as: 'Barrio', required: true }; }
            else if (tipo_ubicacion_param === 'ciudad') { bccvWhere.Ciudad_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Ciudad, as: 'Ciudad', required: true }; }
            else if (tipo_ubicacion_param === 'corregimiento') { bccvWhere.Corregimiento_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Corregimiento, as: 'Corregimiento', required: true }; }
            else if (tipo_ubicacion_param === 'vereda') { bccvWhere.Vereda_Fk = ubicacion_especifica_id_param; specificLocationInclude = { model: Vereda, as: 'Vereda', required: true }; }
        }

        let order = [['Fecha_publicacion', 'DESC']];
        if (latitud_centro && longitud_centro && radio_km) {
            const distanceLiteral = literal(
                `(6371 * acos(cos(radians(${latitud_centro})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud_centro})) + sin(radians(${latitud_centro})) * sin(radians(Localizacion.Latitud))))`
            );
            localizacionWhere.Latitud = { [Op.ne]: null };
            localizacionWhere.Longitud = { [Op.ne]: null };
            whereConditions[Op.and] = [
                ...(whereConditions[Op.and] || []),
                literal(`${distanceLiteral.val} <= ${radio_km}`)
            ];
            order = [[distanceLiteral, 'ASC'], ...order];
        }

        // --- Quién Publica (Platform_User, Platform_Profile) ---
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id_param);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante_param);


        // =========================================================
        // Construcción de Includes (JOINs)
        // Se incluyen todas las relaciones posibles, con `required: true` solo
        // si hay una condición de filtro activa para esa rama.
        // =========================================================
        const includeConditions = [
            // Division, OtrasCaracteristicas, Asignacion, OrganizacionParqueadero
            {
                model: Division,
                as: 'Division',
                required: Object.keys(divisionWhere).length > 0,
                where: divisionWhere
            },
            {
                model: OtrasCaracteristicas,
                as: 'OtrasCaracteristicas',
                required: Object.keys(otrasCaracteristicasWhere).length > 0 || Object.keys(organizacionParqueaderoWhere).length > 0,
                where: otrasCaracteristicasWhere,
                include: [
                    {
                        model: Asignacion,
                        as: 'Asignacion',
                        required: Object.keys(organizacionParqueaderoWhere).length > 0,
                        include: [
                            {
                                model: OrganizacionParqueadero,
                                as: 'OrganizacionParqueadero',
                                required: Object.keys(organizacionParqueaderoWhere).length > 0,
                                where: organizacionParqueaderoWhere
                            }
                        ]
                    }
                ]
            },
            // AcercaEdificacion
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
            // TipoEdificacion
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            },
            // Direccion, BarrioCiudadCorregimientoVereda, Localizacion, DesignadorCardinal, Ciudad, Corregimiento, Vereda, Municipio, Ndap
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            specificLocationInclude, // Esto manejará el include para Barrio/Ciudad/Corregimiento/Vereda
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Ciudad, as: 'Ciudad', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Corregimiento, as: 'Corregimiento', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                            (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
                                model: Vereda, as: 'Vereda', required: false,
                                include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
                            } : null,
                        ].filter(Boolean)
                    },
                    {
                        model: DesignadorCardinal,
                        as: 'DesignadorCardinal',
                        required: Object.keys(designadorCardinalWhere).length > 0,
                        where: designadorCardinalWhere
                    },
                    {
                        model: Localizacion,
                        as: 'Localizacion',
                        required: Object.keys(localizacionWhere).length > 0,
                        where: localizacionWhere
                    }
                ].filter(Boolean)
            },
            // PlatformUser, PlatformProfile
            {
                model: PlatformUser,
                as: 'PlatformUser',
                required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0,
                where: platformUserWhere,
                include: [
                    {
                        model: PlatformProfile,
                        as: 'PlatformProfile',
                        required: Object.keys(platformProfileWhere).length > 0,
                        where: platformProfileWhere
                    }
                ]
            }
        ].filter(Boolean); // Filtra cualquier include nulo si no se aplica

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeConditions,
            order: order
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error en getFilteredInmueblesUnified:', error);
        res.status(500).json({ error: error.message });
    }
}

// ¡Ah, mis disculpas! Entiendo perfectamente ahora. Quieres un archivo que contenga los 6 controladores distintos, donde cada controlador implemente una de las 6 consultas unificadas que me proporcionaste.

// Es decir, no quieres un único controlador que gestione todos los filtros combinados, sino 6 controladores separados, cada uno correspondiente a una de las categorías de filtros (Detalles Específicos, Edificación, Tipo/General, Ubicación, Quién Publica) y el sexto para la combinación de todos los filtros.

// Aquí tienes el archivo inmueblesFilterControllers.js (o el nombre que prefieras) con las 6 funciones controladoras, cada una implementando su lógica de filtrado específica.

// JavaScript

// import { Op, literal } from 'sequelize';

// // =========================================================================
// // IMPORTACIÓN DE MODELOS
// // Asegúrate de que los paths a tus modelos sean correctos.
// // Es CRÍTICO que todas las asociaciones (belongsTo, hasOne, etc.)
// // estén definidas en tus modelos con los 'as' aliases correspondientes.
// // =========================================================================
// import Inmueble from '../models/inmueble.js';
// import Division from '../models/division.js';
// import OtrasCaracteristicas from '../models/otras_caracteristicas.js';
// import Asignacion from '../models/asignacion.js';
// import OrganizacionParqueadero from '../models/organizacion_parqueadero.js';
// import AcercaEdificacion from '../models/acerca_edificacion.js';
// import TipoEdificacion from '../models/tipo_edificacion.js';
// import Direccion from '../models/direccion.js';
// import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
// import Barrio from '../models/barrio.js';
// import Ciudad from '../models/ciudad.js';
// import Corregimiento from '../models/corregimiento.js';
// import Vereda from '../models/vereda.js';
// import Municipio from '../models/municipio.js';
// import Ndap from '../models/ndap.js';
// import DesignadorCardinal from '../models/designador_cardinal.js';
// import Localizacion from '../models/localizacion.js';
// import PlatformUser from '../models/platform_user.js';
// import PlatformProfile from '../models/platform_profile.js';

// // =========================================================================
// // FUNCIONES AUXILIARES
// // =========================================================================

// // Función auxiliar para añadir condiciones a los objetos where internos
// const addCondition = (targetWhere, key, value) => {
//     // Solo añade la condición si el valor no es nulo, indefinido o cadena vacía
//     if (value !== undefined && value !== null && value !== '') {
//         targetWhere[key] = value;
//     }
// };

// // =========================================================================
// // CONTROLADOR 1: Filtros de Detalles Específicos del Inmueble
// // Tablas involucradas: inmueble, division, otras_caracteristicas, asignacion, organizacion_parqueadero
// // =========================================================================
// export async function getInmueblesBySpecificDetails(req, res) {
//     try {
//         const {
//             // Filtros de Division
//             num_habitaciones, min_habitaciones, max_habitaciones,
//             num_baños, min_baños, max_baños,
//             tipo_cocina,
//             balcon_si, // 'true' o 'false'
//             terraza_mayor_cero, // 'true' o 'false' (si hay al menos una terraza)
//             num_terrazas, // Para número exacto de terrazas
//             garaje_mayor_cero, // 'true' o 'false' (si hay al menos un garaje)
//             num_garajes, // Para número exacto de garajes
//             ascensores_si, // 'true' o 'false'
//             min_closets, // Para un mínimo de closets
//             num_closets, // Para número exacto de closets
//             estudio_si, // 'true' o 'false' (asume 1 para TRUE)
//             sala_si, // 'true' o 'false' (asume 1 para TRUE)
//             comedor_si, // 'true' o 'false' (asume 1 para TRUE)
//             zona_lavanderia_si, // 'true' o 'false' (asume 1 para TRUE)
//             deposito_division_si, // 'true' o 'false' (asume 1 para TRUE)

//             // Filtros de Otras_caracteristicas
//             lavanderia_oc_si, // 'true' o 'false' (asume 1 para TRUE)
//             gas_oc_si, // 'true' o 'false' (asume 1 para TRUE)
//             numero_piso,
//             min_piso, // Para rango
//             max_piso, // Para rango
//             mascotas_permitidas_si, // 'true' o 'false' (asume 1 para TRUE)
//             amoblado_si, // 'true' o 'false' (asume 1 para TRUE)
//             deposito_oc_mayor_cero, // 'true' o 'false' (si hay al menos un depósito)
//             num_depositos_oc, // Para número exacto de depósitos

//             // Filtros de Organizacion_parqueadero
//             cantidad_parqueaderos_mayor_cero, // 'true' o 'false' (si hay al menos un parqueadero)
//             tipo_parqueadero, // 'Propio', 'Visitantes', 'Comunal'
//             parqueadero_cubierto_si, // 'true' o 'false' (asume 1 para TRUE)
//             parqueadero_disponible_si // 'true' o 'false' (asume 1 para TRUE)

//         } = req.query;

//         const whereConditions = { Estado: 'disponible' }; // Filtro base para Inmueble
//         const divisionWhere = {};
//         const otrasCaracteristicasWhere = {};
//         const organizacionParqueaderoWhere = {};

//         // Lógica para construir las condiciones WHERE para cada tabla
//         // (Duplicado del controlador anterior, pero encapsulado aquí)
//         // Filtros de Division
//         if (num_habitaciones) addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
//         else if (min_habitaciones || max_habitaciones) divisionWhere.Habitaciones = { ...(min_habitaciones && { [Op.gte]: min_habitaciones }), ...(max_habitaciones && { [Op.lte]: max_habitaciones }) };

//         if (num_baños) addCondition(divisionWhere, 'Baños', num_baños);
//         else if (min_baños || max_baños) divisionWhere.Baños = { ...(min_baños && { [Op.gte]: min_baños }), ...(max_baños && { [Op.lte]: max_baños }) };

//         addCondition(divisionWhere, 'Cocina', tipo_cocina);
//         if (balcon_si === 'true') divisionWhere.Balcon = 'Sí'; else if (balcon_si === 'false') divisionWhere.Balcon = 'No';

//         if (num_terrazas) addCondition(divisionWhere, 'Terraza', num_terrazas);
//         else if (terraza_mayor_cero === 'true') divisionWhere.Terraza = { [Op.gt]: 0 };

//         if (num_garajes) addCondition(divisionWhere, 'Garaje', num_garajes);
//         else if (garaje_mayor_cero === 'true') divisionWhere.Garaje = { [Op.gt]: 0 };

//         if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí'; else if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';
//         if (num_closets) addCondition(divisionWhere, 'Closets', num_closets); else if (min_closets) divisionWhere.Closets = { [Op.gte]: min_closets };

//         if (estudio_si === 'true') divisionWhere.Estudio = 1;
//         if (sala_si === 'true') divisionWhere.Sala = 1;
//         if (comedor_si === 'true') divisionWhere.Comedor = 1;
//         if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
//         if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

//         // Filtros de Otras_caracteristicas
//         if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
//         if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

//         if (numero_piso) addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
//         else if (min_piso || max_piso) otrasCaracteristicasWhere.Piso = { ...(min_piso && { [Op.gte]: min_piso }), ...(max_piso && { [Op.lte]: max_piso }) };

//         if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
//         if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;
//         if (num_depositos_oc) addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
//         else if (deposito_oc_mayor_cero === 'true') otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };

//         // Filtros de Organizacion_parqueadero
//         if (cantidad_parqueaderos_mayor_cero === 'true') organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
//         addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
//         if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
//         if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: [
//                 {
//                     model: Division,
//                     as: 'Division',
//                     required: Object.keys(divisionWhere).length > 0,
//                     where: divisionWhere
//                 },
//                 {
//                     model: OtrasCaracteristicas,
//                     as: 'OtrasCaracteristicas',
//                     required: Object.keys(otrasCaracteristicasWhere).length > 0 || Object.keys(organizacionParqueaderoWhere).length > 0,
//                     where: otrasCaracteristicasWhere,
//                     include: [
//                         {
//                             model: Asignacion,
//                             as: 'Asignacion',
//                             required: Object.keys(organizacionParqueaderoWhere).length > 0,
//                             include: [
//                                 {
//                                     model: OrganizacionParqueadero,
//                                     as: 'OrganizacionParqueadero',
//                                     required: Object.keys(organizacionParqueaderoWhere).length > 0,
//                                     where: organizacionParqueaderoWhere
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         });

//         res.json(filteredInmuebles);
//     } catch (error) {
//         console.error('Error en getInmueblesBySpecificDetails:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // =========================================================================
// // CONTROLADOR 2: Filtros por Características de la Edificación/Conjunto
// // Tablas involucradas: inmueble, acerca_edificacion
// // =========================================================================
// export async function getInmueblesByEdificationCharacteristics(req, res) {
//     try {
//         const {
//             estrato_param,
//             tipo_construccion_param,
//             anio_construccion_min_param, anio_construccion_max_param,
//             estado_conservacion_param,
//             zona_comun_param // 'true' o 'false'
//         } = req.query;

//         const whereConditions = { Estado: 'disponible' };
//         const acercaEdificacionWhere = {};

//         addCondition(acercaEdificacionWhere, 'Estrato', estrato_param);
//         addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion_param);

//         if (anio_construccion_min_param || anio_construccion_max_param) {
//             acercaEdificacionWhere.Anio_construccion = {
//                 ...(anio_construccion_min_param && { [Op.gte]: anio_construccion_min_param }),
//                 ...(anio_construccion_max_param && { [Op.lte]: anio_construccion_max_param })
//             };
//         }

//         addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion_param);
//         if (zona_comun_param === 'true') acercaEdificacionWhere.Zona_comun = 1;
//         else if (zona_comun_param === 'false') acercaEdificacionWhere.Zona_comun = 0;

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: [
//                 {
//                     model: AcercaEdificacion,
//                     as: 'AcercaEdificacion', // Asegúrate de que este alias coincida
//                     required: Object.keys(acercaEdificacionWhere).length > 0,
//                     where: acercaEdificacionWhere
//                 }
//             ]
//         });

//         res.json(filteredInmuebles);
//     } catch (error) {
//         console.error('Error en getInmueblesByEdificationCharacteristics:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // =========================================================================
// // CONTROLADOR 3: Filtros por Tipo de Inmueble y Características Generales
// // Tablas involucradas: inmueble, tipo_edificacion
// // =========================================================================
// export async function getInmueblesByTypeAndGeneralCharacteristics(req, res) {
//     try {
//         const {
//             tipo_edificacion_categoria_param,
//             motivo_transaccion_param,
//             precio_min_param, precio_max_param,
//             area_min_param, area_max_param,
//             antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años' o un número
//             codigo_interno_param
//         } = req.query;

//         const whereConditions = { Estado: 'disponible' }; // Filtro base

//         addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion_param);
//         addCondition(whereConditions, 'Codigo_interno', codigo_interno_param);

//         if (precio_min_param || precio_max_param) {
//             whereConditions.Valor = {
//                 ...(precio_min_param && { [Op.gte]: precio_min_param }),
//                 ...(precio_max_param && { [Op.lte]: precio_max_param })
//             };
//         }
//         if (area_min_param || area_max_param) {
//             whereConditions.Area = {
//                 ...(area_min_param && { [Op.gte]: area_min_param }),
//                 ...(area_max_param && { [Op.lte]: area_max_param })
//             };
//         }

//         if (antiguedad_param) {
//             switch (antiguedad_param) {
//                 case 'Nueva':
//                     whereConditions.Antiguedad = 0;
//                     break;
//                 case 'Menos de 5 años':
//                     whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 };
//                     break;
//                 case '5-10 años':
//                     whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 };
//                     break;
//                 case 'Mas de 10 años':
//                     whereConditions.Antiguedad = { [Op.gt]: 10 };
//                     break;
//                 default:
//                     // Si se pasa un número directamente
//                     addCondition(whereConditions, 'Antiguedad', antiguedad_param);
//                     break;
//             }
//         }

//         const tipoEdificacionWhere = {};
//         addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria_param);

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: [
//                 {
//                     model: TipoEdificacion,
//                     as: 'TipoEdificacion', // Asegúrate de que este alias coincida
//                     required: Object.keys(tipoEdificacionWhere).length > 0,
//                     where: tipoEdificacionWhere
//                 }
//             ]
//         });

//         res.json(filteredInmuebles);
//     } catch (error) {
//         console.error('Error en getInmueblesByTypeAndGeneralCharacteristics:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // =========================================================================
// // CONTROLADOR 4: Filtros de Ubicación
// // Tablas involucradas: inmueble, direccion, barrio_ciudad_corregimiento_vereda,
// // barrio, ciudad, corregimiento, vereda, municipio, ndap, designador_cardinal, localizacion
// // =========================================================================
// export async function getInmueblesByLocation(req, res) {
//     try {
//         const {
//             ndap_id_param,
//             municipio_id_param,
//             ubicacion_especifica_id_param,
//             tipo_ubicacion_param, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
//             tipo_via_param,
//             numero_via_principal_param,
//             numero_calle_transversal_param,
//             numero_edificacion_param,
//             designador_cardinal_id_param,
//             latitud_centro,
//             longitud_centro,
//             radio_km
//         } = req.query;

//         const whereConditions = { Estado: 'disponible' };
//         const direccionWhere = {};
//         const bccvWhere = {}; // Para BarrioCiudadCorregimientoVereda
//         const ciudadWhere = {}; // No se usa directamente si bccvWhere maneja el FK
//         const corregimientoWhere = {}; // No se usa directamente si bccvWhere maneja el FK
//         const veredaWhere = {}; // No se usa directamente si bccvWhere maneja el FK
//         const municipioWhere = {}; // Para el municipio en general
//         const ndapWhere = {}; // Para el NDAP en general
//         const designadorCardinalWhere = {};
//         const localizacionWhere = {};

//         // Filtro por dirección exacta
//         if (tipo_via_param && numero_via_principal_param && numero_calle_transversal_param && numero_edificacion_param) {
//             addCondition(direccionWhere, 'Tipo_via', tipo_via_param);
//             addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal_param);
//             addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal_param);
//             addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion_param);
//         }
//         addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id_param);


//         // Filtro por NDAP (Departamento)
//         if (ndap_id_param) {
//             addCondition(ndapWhere, 'Ndap_id', ndap_id_param);
//         }

//         // Filtro por Municipio
//         if (municipio_id_param) {
//             addCondition(municipioWhere, 'Municipio_id', municipio_id_param);
//         }

//         // Filtro por Ubicación Específica (barrio, ciudad, corregimiento, vereda)
//         let specificLocationInclude = null;

//         if (ubicacion_especifica_id_param && tipo_ubicacion_param) {
//             if (tipo_ubicacion_param === 'barrio') {
//                 bccvWhere.Barrio_FK = ubicacion_especifica_id_param;
//                 specificLocationInclude = { model: Barrio, as: 'Barrio', required: true };
//             } else if (tipo_ubicacion_param === 'ciudad') {
//                 bccvWhere.Ciudad_FK = ubicacion_especifica_id_param;
//                 specificLocationInclude = { model: Ciudad, as: 'Ciudad', required: true };
//             } else if (tipo_ubicacion_param === 'corregimiento') {
//                 bccvWhere.Corregimiento_FK = ubicacion_especifica_id_param;
//                 specificLocationInclude = { model: Corregimiento, as: 'Corregimiento', required: true };
//             } else if (tipo_ubicacion_param === 'vereda') {
//                 bccvWhere.Vereda_Fk = ubicacion_especifica_id_param; // Aquí el nombre de la columna es 'Vereda_Fk'
//                 specificLocationInclude = { model: Vereda, as: 'Vereda', required: true };
//             }
//         }

//         let order = [['Fecha_publicacion', 'DESC']]; // Orden por defecto

//         // Filtro por radio de distancia (Haversine)
//         if (latitud_centro && longitud_centro && radio_km) {
//             const distanceLiteral = literal(
//                 `(6371 * acos(cos(radians(${latitud_centro})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud_centro})) + sin(radians(${latitud_centro})) * sin(radians(Localizacion.Latitud))))`
//             );

//             // Asegurarse de que Localizacion se incluya y que Latitud/Longitud no sean nulos
//             localizacionWhere.Latitud = { [Op.ne]: null };
//             localizacionWhere.Longitud = { [Op.ne]: null };

//             whereConditions[Op.and] = [
//                 ...(whereConditions[Op.and] || []),
//                 literal(`${distanceLiteral.val} <= ${radio_km}`)
//             ];
//             order = [[distanceLiteral, 'ASC'], ...order];
//         }

//         const includeConditions = [
//             {
//                 model: Direccion,
//                 as: 'Direccion',
//                 required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
//                 where: direccionWhere,
//                 include: [
//                     {
//                         model: BarrioCiudadCorregimientoVereda,
//                         as: 'BarrioCiudadCorregimientoVereda',
//                         required: Object.keys(bccvWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
//                         where: bccvWhere,
//                         include: [
//                             specificLocationInclude, // Esto manejará el include para Barrio/Ciudad/Corregimiento/Vereda
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Ciudad, as: 'Ciudad', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Corregimiento, as: 'Corregimiento', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Vereda, as: 'Vereda', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                         ].filter(Boolean) // Filtra los nulos si no se usan
//                     },
//                     {
//                         model: DesignadorCardinal,
//                         as: 'DesignadorCardinal',
//                         required: Object.keys(designadorCardinalWhere).length > 0,
//                         where: designadorCardinalWhere
//                     },
//                     {
//                         model: Localizacion,
//                         as: 'Localizacion',
//                         required: Object.keys(localizacionWhere).length > 0,
//                         where: localizacionWhere
//                     }
//                 ].filter(Boolean)
//             }
//         ];

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: includeConditions,
//             order: order
//         });

//         res.json(filteredInmuebles);
//     } catch (error) {
//         console.error('Error en getInmueblesByLocation:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // =========================================================================
// // CONTROLADOR 5: Filtros por Quién Publica
// // Tablas involucradas: inmueble, platform_user, platform_profile
// // =========================================================================
// export async function getInmueblesByPublisher(req, res) {
//     try {
//         const {
//             platform_user_id_param,
//             tipo_anunciante_param // Asume que 'Profile_type' es una columna en platform_profile
//         } = req.query;

//         const whereConditions = { Estado: 'disponible' };
//         const platformUserWhere = {};
//         const platformProfileWhere = {};

//         addCondition(platformUserWhere, 'Platform_user_id', platform_user_id_param);
//         addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante_param);

//         const includeConditions = [
//             {
//                 model: PlatformUser,
//                 as: 'PlatformUser', // Asegúrate de que este alias coincida con tu asociación en Inmueble
//                 required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0,
//                 where: platformUserWhere,
//                 include: [
//                     {
//                         model: PlatformProfile,
//                         as: 'PlatformProfile', // Asegúrate de que este alias coincida con tu asociación en PlatformUser
//                         required: Object.keys(platformProfileWhere).length > 0,
//                         where: platformProfileWhere
//                     }
//                 ]
//             }
//         ];

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: includeConditions
//         });

//         res.json(filteredInmuebles);
//     } catch (error) {
//         console.error('Error en getInmueblesByPublisher:', error);
//         res.status(500).json({ error: error.message });
//     }
// }

// // =========================================================================
// // CONTROLADOR 6: Unificado (Combina todos los filtros de los 5 controladores anteriores)
// // Este es el más completo y flexible, maneja todos los filtros combinados.
// // =========================================================================
// export async function getFilteredInmueblesUnified(req, res) {
//     try {
//         const {
//             // Filtros de Detalles Específicos (division, otras_caracteristicas, organizacion_parqueadero)
//             num_habitaciones, min_habitaciones, max_habitaciones,
//             num_baños, min_baños, max_baños,
//             tipo_cocina,
//             balcon_si,
//             terraza_mayor_cero, num_terrazas,
//             garaje_mayor_cero, num_garajes,
//             ascensores_si,
//             min_closets, num_closets,
//             estudio_si, sala_si, comedor_si,
//             zona_lavanderia_si,
//             deposito_division_si,
//             lavanderia_oc_si, gas_oc_si,
//             numero_piso, min_piso, max_piso,
//             mascotas_permitidas_si, amoblado_si,
//             deposito_oc_mayor_cero, num_depositos_oc,
//             cantidad_parqueaderos_mayor_cero,
//             tipo_parqueadero,
//             parqueadero_cubierto_si,
//             parqueadero_disponible_si,

//             // Filtros de Características de la Edificación/Conjunto (acerca_edificacion)
//             estrato_param,
//             tipo_construccion_param,
//             anio_construccion_min_param,
//             anio_construccion_max_param,
//             estado_conservacion_param,
//             zona_comun_param,

//             // Filtros de Tipo de Inmueble y Características Generales (inmueble, tipo_edificacion)
//             estado_inmueble_param = 'disponible', // Valor por defecto
//             motivo_transaccion_param,
//             precio_min_param,
//             precio_max_param,
//             area_min_param,
//             area_max_param,
//             antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años' o un número
//             codigo_interno_param,
//             tipo_edificacion_categoria_param, // Movido aquí

//             // Filtros de Ubicación (direccion, etc.)
//             ndap_id_param,
//             municipio_id_param,
//             ubicacion_especifica_id_param,
//             tipo_ubicacion_param, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
//             tipo_via_param,
//             numero_via_principal_param,
//             numero_calle_transversal_param,
//             numero_edificacion_param,
//             designador_cardinal_id_param,
//             latitud_centro,
//             longitud_centro,
//             radio_km,

//             // Filtros de Quién Publica (platform_user, platform_profile)
//             platform_user_id_param,
//             tipo_anunciante_param

//         } = req.query;

//         const whereConditions = {
//             Estado: estado_inmueble_param
//         };
//         const divisionWhere = {};
//         const otrasCaracteristicasWhere = {};
//         const organizacionParqueaderoWhere = {};
//         const acercaEdificacionWhere = {};
//         const tipoEdificacionWhere = {};
//         const direccionWhere = {};
//         const bccvWhere = {};
//         const ciudadWhere = {};
//         const corregimientoWhere = {};
//         const veredaWhere = {};
//         const municipioWhere = {};
//         const ndapWhere = {};
//         const designadorCardinalWhere = {};
//         const localizacionWhere = {};
//         const platformUserWhere = {};
//         const platformProfileWhere = {};


//         // =========================================================
//         // Lógica de Construcción de Condiciones WHERE
//         // (Esto es similar a la que ya has visto, aplicado a cada grupo de filtros)
//         // =========================================================

//         // --- Detalles Específicos (Division, Otras_Caracteristicas, Organizacion_Parqueadero) ---
//         if (num_habitaciones) addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
//         else if (min_habitaciones || max_habitaciones) divisionWhere.Habitaciones = { ...(min_habitaciones && { [Op.gte]: min_habitaciones }), ...(max_habitaciones && { [Op.lte]: max_habitaciones }) };
//         if (num_baños) addCondition(divisionWhere, 'Baños', num_baños);
//         else if (min_baños || max_baños) divisionWhere.Baños = { ...(min_baños && { [Op.gte]: min_baños }), ...(max_baños && { [Op.lte]: max_baños }) };
//         addCondition(divisionWhere, 'Cocina', tipo_cocina);
//         if (balcon_si === 'true') divisionWhere.Balcon = 'Sí'; else if (balcon_si === 'false') divisionWhere.Balcon = 'No';
//         if (num_terrazas) addCondition(divisionWhere, 'Terraza', num_terrazas); else if (terraza_mayor_cero === 'true') divisionWhere.Terraza = { [Op.gt]: 0 };
//         if (num_garajes) addCondition(divisionWhere, 'Garaje', num_garajes); else if (garaje_mayor_cero === 'true') divisionWhere.Garaje = { [Op.gt]: 0 };
//         if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí'; else if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';
//         if (num_closets) addCondition(divisionWhere, 'Closets', num_closets); else if (min_closets) divisionWhere.Closets = { [Op.gte]: min_closets };
//         if (estudio_si === 'true') divisionWhere.Estudio = 1;
//         if (sala_si === 'true') divisionWhere.Sala = 1;
//         if (comedor_si === 'true') divisionWhere.Comedor = 1;
//         if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
//         if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

//         if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
//         if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;
//         if (numero_piso) addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
//         else if (min_piso || max_piso) otrasCaracteristicasWhere.Piso = { ...(min_piso && { [Op.gte]: min_piso }), ...(max_piso && { [Op.lte]: max_piso }) };
//         if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
//         if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;
//         if (num_depositos_oc) addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc); else if (deposito_oc_mayor_cero === 'true') otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };

//         if (cantidad_parqueaderos_mayor_cero === 'true') organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
//         addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
//         if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
//         if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

//         // --- Características de la Edificación/Conjunto (Acerca_Edificacion) ---
//         addCondition(acercaEdificacionWhere, 'Estrato', estrato_param);
//         addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion_param);
//         if (anio_construccion_min_param || anio_construccion_max_param) {
//             acercaEdificacionWhere.Anio_construccion = {
//                 ...(anio_construccion_min_param && { [Op.gte]: anio_construccion_min_param }),
//                 ...(anio_construccion_max_param && { [Op.lte]: anio_construccion_max_param })
//             };
//         }
//         addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion_param);
//         if (zona_comun_param === 'true') acercaEdificacionWhere.Zona_comun = 1; else if (zona_comun_param === 'false') acercaEdificacionWhere.Zona_comun = 0;

//         // --- Tipo de Inmueble y Características Generales (Inmueble, Tipo_Edificacion) ---
//         addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion_param);
//         addCondition(whereConditions, 'Codigo_interno', codigo_interno_param);
//         if (precio_min_param || precio_max_param) {
//             whereConditions.Valor = { ...(precio_min_param && { [Op.gte]: precio_min_param }), ...(precio_max_param && { [Op.lte]: precio_max_param }) };
//         }
//         if (area_min_param || area_max_param) {
//             whereConditions.Area = { ...(area_min_param && { [Op.gte]: area_min_param }), ...(area_max_param && { [Op.lte]: area_max_param }) };
//         }
//         if (antiguedad_param) {
//             switch (antiguedad_param) {
//                 case 'Nueva': whereConditions.Antiguedad = 0; break;
//                 case 'Menos de 5 años': whereConditions.Antiguedad = { [Op.gt]: 0, [Op.lte]: 5 }; break;
//                 case '5-10 años': whereConditions.Antiguedad = { [Op.gt]: 5, [Op.lte]: 10 }; break;
//                 case 'Mas de 10 años': whereConditions.Antiguedad = { [Op.gt]: 10 }; break;
//                 default: addCondition(whereConditions, 'Antiguedad', antiguedad_param); break;
//             }
//         }
//         addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria_param);


//         // --- Ubicación (Direccion, BarrioCiudadCorregimientoVereda, etc.) ---
//         if (tipo_via_param && numero_via_principal_param && numero_calle_transversal_param && numero_edificacion_param) {
//             addCondition(direccionWhere, 'Tipo_via', tipo_via_param);
//             addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal_param);
//             addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal_param);
//             addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion_param);
//         }
//         addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id_param);

//         if (ndap_id_param) addCondition(ndapWhere, 'Ndap_id', ndap_id_param);
//         if (municipio_id_param) addCondition(municipioWhere, 'Municipio_id', municipio_id_param);

//         let specificLocationInclude = null;
//         if (ubicacion_especifica_id_param && tipo_ubicacion_param) {
//             if (tipo_ubicacion_param === 'barrio') { bccvWhere.Barrio_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Barrio, as: 'Barrio', required: true }; }
//             else if (tipo_ubicacion_param === 'ciudad') { bccvWhere.Ciudad_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Ciudad, as: 'Ciudad', required: true }; }
//             else if (tipo_ubicacion_param === 'corregimiento') { bccvWhere.Corregimiento_FK = ubicacion_especifica_id_param; specificLocationInclude = { model: Corregimiento, as: 'Corregimiento', required: true }; }
//             else if (tipo_ubicacion_param === 'vereda') { bccvWhere.Vereda_Fk = ubicacion_especifica_id_param; specificLocationInclude = { model: Vereda, as: 'Vereda', required: true }; }
//         }

//         let order = [['Fecha_publicacion', 'DESC']];
//         if (latitud_centro && longitud_centro && radio_km) {
//             const distanceLiteral = literal(
//                 `(6371 * acos(cos(radians(${latitud_centro})) * cos(radians(Localizacion.Latitud)) * cos(radians(Localizacion.Longitud) - radians(${longitud_centro})) + sin(radians(${latitud_centro})) * sin(radians(Localizacion.Latitud))))`
//             );
//             localizacionWhere.Latitud = { [Op.ne]: null };
//             localizacionWhere.Longitud = { [Op.ne]: null };
//             whereConditions[Op.and] = [
//                 ...(whereConditions[Op.and] || []),
//                 literal(`${distanceLiteral.val} <= ${radio_km}`)
//             ];
//             order = [[distanceLiteral, 'ASC'], ...order];
//         }

//         // --- Quién Publica (Platform_User, Platform_Profile) ---
//         addCondition(platformUserWhere, 'Platform_user_id', platform_user_id_param);
//         addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante_param);


//         // =========================================================
//         // Construcción de Includes (JOINs)
//         // Se incluyen todas las relaciones posibles, con `required: true` solo
//         // si hay una condición de filtro activa para esa rama.
//         // =========================================================
//         const includeConditions = [
//             // Division, OtrasCaracteristicas, Asignacion, OrganizacionParqueadero
//             {
//                 model: Division,
//                 as: 'Division',
//                 required: Object.keys(divisionWhere).length > 0,
//                 where: divisionWhere
//             },
//             {
//                 model: OtrasCaracteristicas,
//                 as: 'OtrasCaracteristicas',
//                 required: Object.keys(otrasCaracteristicasWhere).length > 0 || Object.keys(organizacionParqueaderoWhere).length > 0,
//                 where: otrasCaracteristicasWhere,
//                 include: [
//                     {
//                         model: Asignacion,
//                         as: 'Asignacion',
//                         required: Object.keys(organizacionParqueaderoWhere).length > 0,
//                         include: [
//                             {
//                                 model: OrganizacionParqueadero,
//                                 as: 'OrganizacionParqueadero',
//                                 required: Object.keys(organizacionParqueaderoWhere).length > 0,
//                                 where: organizacionParqueaderoWhere
//                             }
//                         ]
//                     }
//                 ]
//             },
//             // AcercaEdificacion
//             {
//                 model: AcercaEdificacion,
//                 as: 'AcercaEdificacion',
//                 required: Object.keys(acercaEdificacionWhere).length > 0,
//                 where: acercaEdificacionWhere
//             },
//             // TipoEdificacion
//             {
//                 model: TipoEdificacion,
//                 as: 'TipoEdificacion',
//                 required: Object.keys(tipoEdificacionWhere).length > 0,
//                 where: tipoEdificacionWhere
//             },
//             // Direccion, BarrioCiudadCorregimientoVereda, Localizacion, DesignadorCardinal, Ciudad, Corregimiento, Vereda, Municipio, Ndap
//             {
//                 model: Direccion,
//                 as: 'Direccion',
//                 required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
//                 where: direccionWhere,
//                 include: [
//                     {
//                         model: BarrioCiudadCorregimientoVereda,
//                         as: 'BarrioCiudadCorregimientoVereda',
//                         required: Object.keys(bccvWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0,
//                         where: bccvWhere,
//                         include: [
//                             specificLocationInclude, // Esto manejará el include para Barrio/Ciudad/Corregimiento/Vereda
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Ciudad, as: 'Ciudad', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Corregimiento, as: 'Corregimiento', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                             (Object.keys(ndapWhere).length > 0 || Object.keys(municipioWhere).length > 0) ? {
//                                 model: Vereda, as: 'Vereda', required: false,
//                                 include: [{ model: Municipio, as: 'Municipio', required: (Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0), where: municipioWhere, include: [{ model: Ndap, as: 'Ndap', required: Object.keys(ndapWhere).length > 0, where: ndapWhere }] }]
//                             } : null,
//                         ].filter(Boolean)
//                     },
//                     {
//                         model: DesignadorCardinal,
//                         as: 'DesignadorCardinal',
//                         required: Object.keys(designadorCardinalWhere).length > 0,
//                         where: designadorCardinalWhere
//                     },
//                     {
//                         model: Localizacion,
//                         as: 'Localizacion',
//                         required: Object.keys(localizacionWhere).length > 0,
//                         where: localizacionWhere
//                     }
//                 ].filter(Boolean)
//             },
//             // PlatformUser, PlatformProfile
//             {
//                 model: PlatformUser,
//                 as: 'PlatformUser',
//                 required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0,
//                 where: platformUserWhere,
//                 include: [
//                     {
//                         model: PlatformProfile,
//                         as: 'PlatformProfile',
//                         required: Object.keys(platformProfileWhere).length > 0,
//                         where: platformProfileWhere
//                     }
//                 ]
//             }
//         ].filter(Boolean); // Filtra cualquier include nulo si no se aplica

//         const filteredInmuebles = await Inmueble.findAll({
//             where: whereConditions,
//             include: includeConditions,
//             order: order
//         });

//         res.json(filteredInmuebles);

//     } catch (error) {
//         console.error('Error en getFilteredInmueblesUnified:', error);
//         res.status(500).json({ error: error.message });
//     }
// }
// Cómo usar este archivo:
// Guarda el archivo: Nómbralo, por ejemplo, inmueblesFilterControllers.js y colócalo en tu directorio controllers.

// Asegúrate de las importaciones: Verifica que todos los import de tus modelos (Inmueble, Division, etc.) tengan la ruta correcta hacia donde están definidos tus modelos en Sequelize.

// Define las rutas: En tu archivo de rutas (ej. routes/inmuebles.js), importarás y usarás estas funciones:

// JavaScript

// // routes/inmuebles.js
// import express from 'express';
// import {
//     getInmueblesBySpecificDetails,
//     getInmueblesByEdificationCharacteristics,
//     getInmueblesByTypeAndGeneralCharacteristics,
//     getInmueblesByLocation,
//     getInmueblesByPublisher,
//     getFilteredInmueblesUnified // El controlador más completo
// } from '../controllers/inmueblesFilterControllers.js'; // Ajusta el path

// const router = express.Router();

// // Rutas para cada categoría de filtro (estas apuntan a las consultas SQL unificadas de cada sección)
// router.get('/inmuebles/filter/details', getInmueblesBySpecificDetails);
// router.get('/inmuebles/filter/edification', getInmueblesByEdificationCharacteristics);
// router.get('/inmuebles/filter/type-general', getInmueblesByTypeAndGeneralCharacteristics);
// router.get('/inmuebles/filter/location', getInmueblesByLocation);
// router.get('/inmuebles/filter/publisher', getInmueblesByPublisher);

// // Ruta para la consulta unificada maestra (que combina TODOS los filtros posibles)
// router.get('/inmuebles/filter/all', getFilteredInmueblesUnified); // Renombré a 'all' para ser más claro

// export default router;
// Asociaciones de Sequelize: Este es el punto más crítico. Las líneas como as: 'Division' en los include de Sequelize deben coincidir exactamente con cómo has definido tus asociaciones en los modelos. Por ejemplo, en tu modelo Inmueble.js deberías tener algo como:

// JavaScript

// // models/inmueble.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js'; // Tu instancia de Sequelize
// import Division from './division.js';
// import OtrasCaracteristicas from './otras_caracteristicas.js';
// // ... otros modelos

// const Inmueble = sequelize.define('Inmueble', {
//     Inmueble_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     // ... otras columnas de Inmueble
//     Division_FK: { type: DataTypes.INTEGER, references: { model: Division, key: 'Division_id' } },
//     Otras_caracteristicas_FK: { type: DataTypes.INTEGER, references: { model: OtrasCaracteristicas, key: 'Otras_caracteristicas_id' } },
//     Acerca_edificacion_FK: { type: DataTypes.INTEGER, references: { model: AcercaEdificacion, key: 'Acerca_edificacion_id' } },
//     Tipo_edificacion_FK: { type: DataTypes.INTEGER, references: { model: TipoEdificacion, key: 'Tipo_edificacion_id' } },
//     Direccion_FK: { type: DataTypes.INTEGER, references: { model: Direccion, key: 'Direccion_id' } },
//     Platform_user_FK: { type: DataTypes.INTEGER, references: { model: PlatformUser, key: 'Platform_user_id' } }
// }, {
//     tableName: 'inmueble',
//     timestamps: false
// });

// // Definición de asociaciones:
// Inmueble.belongsTo(Division, { foreignKey: 'Division_FK', as: 'Division' });
// Inmueble.belongsTo(OtrasCaracteristicas, { foreignKey: 'Otras_caracteristicas_FK', as: 'OtrasCaracteristicas' });
// Inmueble.belongsTo(AcercaEdificacion, { foreignKey: 'Acerca_edificacion_FK', as: 'AcercaEdificacion' });
// Inmueble.belongsTo(TipoEdificacion, { foreignKey: 'Tipo_edificacion_FK', as: 'TipoEdificacion' });
// Inmueble.belongsTo(Direccion, { foreignKey: 'Direccion_FK', as: 'Direccion' });
// Inmueble.belongsTo(PlatformUser, { foreignKey: 'Platform_user_FK', as: 'PlatformUser' });

// // Y luego las asociaciones anidadas:
// OtrasCaracteristicas.belongsTo(Asignacion, { foreignKey: 'Asignacion_FK', as: 'Asignacion' });
// Asignacion.belongsTo(OrganizacionParqueadero, { foreignKey: 'Organizacion_parqueadero_FK', as: 'OrganizacionParqueadero' });

// Direccion.belongsTo(BarrioCiudadCorregimientoVereda, { foreignKey: 'Barrio_ciudad_corregimiento_vereda_FK', as: 'BarrioCiudadCorregimientoVereda' });
// BarrioCiudadCorregimientoVereda.belongsTo(Barrio, { foreignKey: 'Barrio_FK', as: 'Barrio' });
// BarrioCiudadCorregimientoVereda.belongsTo(Ciudad, { foreignKey: 'Ciudad_FK', as: 'Ciudad' });
// BarrioCiudadCorregimientoVereda.belongsTo(Corregimiento, { foreignKey: 'Corregimiento_FK', as: 'Corregimiento' });
// BarrioCiudadCorregimientoVereda.belongsTo(Vereda, { foreignKey: 'Vereda_Fk', as: 'Vereda' }); // Ojo con 'Vereda_Fk' vs 'Vereda_FK'
// Ciudad.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'Municipio' });
// Corregimiento.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'Municipio' });
// Vereda.belongsTo(Municipio, { foreignKey: 'Municipio_FK', as: 'Municipio' });
// Municipio.belongsTo(Ndap, { foreignKey: 'Ndap_FK', as: 'Ndap' });
// Direccion.belongsTo(DesignadorCardinal, { foreignKey: 'Designador_cardinal_FK', as: 'DesignadorCardinal' });
// Direccion.hasOne(Localizacion, { foreignKey: 'Direccion_FK', as: 'Localizacion' }); // Asumo hasOne o belongsTo

// PlatformUser.belongsTo(PlatformProfile, { foreignKey: 'Platform_profile_FK', as: 'PlatformProfile' }); // O la relación que tengas

// export default Inmueble;
// Con esta estructura, tendrás un controlador por cada sección de filtro, más un controlador maestro que los unifica todos, lo que te da gran flexibilidad en tu API.