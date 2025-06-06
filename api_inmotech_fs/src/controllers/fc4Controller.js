import Inmueble from '../models/inmueble.js'; //FALTA MODELO
import Division from '../models/division.js'; //division
import OtrasCaracteristicas from '../models/otras_caracteristicas.js'; //falta modelo
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
import PlatformUser from '../models/platform_user.js'; //arreglar esto
import PlatformProfile from '../models/platform_profile.js'; //arreglar esto

export async function getFilteredInmueblesCombinedWithoutPublisher(req, res) {
    try {
        const {
            // Filtros de Detalles Específicos del Inmueble (G5)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si, // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false'
            num_terrazas,
            garaje_mayor_cero, // 'true' o 'false'
            num_garajes,
            ascensores_si, // 'true' o 'false'
            min_closets,
            num_closets,
            estudio_si, // 'true' o 'false'
            sala_si, // 'true' o 'false'
            comedor_si, // 'true' o 'false'
            zona_lavanderia_si, // 'true' o 'false'
            deposito_division_si, // 'true' o 'false'
            lavanderia_oc_si, // 'true' o 'false'
            gas_oc_si, // 'true' o 'false'
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si, // 'true' o 'false'
            amoblado_si, // 'true' o 'false'
            deposito_oc_mayor_cero, // 'true' o 'false'
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero, // 'true' o 'false'
            tipo_parqueadero,
            parqueadero_cubierto_si, // 'true' o 'false'
            parqueadero_disponible_si, // 'true' o 'false'

            // Filtros de Características de la Edificación/Conjunto (G3)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Tipo de Inmueble y Características Generales (G1)
            estado_inmueble, // 'disponible', 'vendido', 'alquilado'
            tipo_edificacion_categoria, // 'Casa', 'Apartamento', etc.
            motivo_transaccion, // 'Venta', 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número para antiguedad exacta
            codigo_interno,

            // Filtros de Ubicación (G2)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'ciudad', 'corregimiento', 'vereda', 'barrio'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km
        } = req.query;

        const whereConditions = {
            Estado: estado_inmueble || 'disponible' // Por defecto busca disponibles
        };
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const acercaEdificacionWhere = {};
        const tipoEdificacionWhere = {};
        const direccionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Detalles Específicos del Inmueble (G5)
        // =========================================================
        if (num_habitaciones) {
            addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        } else if (min_habitaciones || max_habitaciones) {
            divisionWhere.Habitaciones = {
                ...(min_habitaciones && { [Op.gte]: min_habitaciones }),
                ...(max_habitaciones && { [Op.lte]: max_habitaciones })
            };
        }

        if (num_baños) {
            addCondition(divisionWhere, 'Baños', num_baños);
        } else if (min_baños || max_baños) {
            divisionWhere.Baños = {
                ...(min_baños && { [Op.gte]: min_baños }),
                ...(max_baños && { [Op.lte]: max_baños })
            };
        }

        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí';
        if (balcon_si === 'false') divisionWhere.Balcon = 'No';

        if (num_terrazas) {
            addCondition(divisionWhere, 'Terraza', num_terrazas);
        } else if (terraza_mayor_cero === 'true') {
            divisionWhere.Terraza = { [Op.gt]: 0 };
        }

        if (num_garajes) {
            addCondition(divisionWhere, 'Garaje', num_garajes);
        } else if (garaje_mayor_cero === 'true') {
            divisionWhere.Garaje = { [Op.gt]: 0 };
        }

        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí';
        if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';

        if (num_closets) {
            addCondition(divisionWhere, 'Closets', num_closets);
        } else if (min_closets) {
            divisionWhere.Closets = { [Op.gte]: min_closets };
        }

        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

        if (numero_piso) {
            addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        } else if (min_piso || max_piso) {
            otrasCaracteristicasWhere.Piso = {
                ...(min_piso && { [Op.gte]: min_piso }),
                ...(max_piso && { [Op.lte]: max_piso })
            };
        }

        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;

        if (num_depositos_oc) {
            addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
        } else if (deposito_oc_mayor_cero === 'true') {
            otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };
        }

        if (cantidad_parqueaderos_mayor_cero === 'true') {
            organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        }
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        // =========================================================
        // Filtros de Características de la Edificación/Conjunto (G3)
        // =========================================================
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);
        if (zona_comun_si === 'true') acercaEdificacionWhere.Zona_comun = 1;
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 0;


        // =========================================================
        // Filtros de Tipo de Inmueble y Características Generales (G1)
        // =========================================================
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria);
        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno);

        if (precio_min || precio_max) {
            whereConditions.Valor = {
                ...(precio_min && { [Op.gte]: precio_min }),
                ...(precio_max && { [Op.lte]: precio_max })
            };
        }

        if (area_min || area_max) {
            whereConditions.Area = {
                ...(area_min && { [Op.gte]: area_min }),
                ...(area_max && { [Op.lte]: area_max })
            };
        }

        if (antiguedad) {
            switch (antiguedad) {
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
                    // Asume que si no es una de las opciones predefinidas, es un número exacto
                    whereConditions.Antiguedad = parseInt(antiguedad, 10);
                    break;
            }
        }

        // =========================================================
        // Filtros de Ubicación (G2)
        // =========================================================
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'ciudad':
                    addCondition(bccvWhere, 'Ciudad_FK', ubicacion_especifica_id);
                    break;
                case 'corregimiento':
                    addCondition(bccvWhere, 'Corregimiento_FK', ubicacion_especifica_id);
                    break;
                case 'vereda':
                    addCondition(bccvWhere, 'Vereda_Fk', ubicacion_especifica_id);
                    break;
                case 'barrio':
                    addCondition(bccvWhere, 'Barrio_FK', ubicacion_especifica_id);
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // Configuración de las asociaciones con `required` dinámico
        const includeAssociations = [
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
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            },
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            { model: Barrio, as: 'Barrio', required: false },
                            {
                                model: Ciudad,
                                as: 'Ciudad',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Corregimiento,
                                as: 'Corregimiento',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Vereda,
                                as: 'Vereda',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                        required: (latitud_centro && longitud_centro && radio_km),
                        where: localizacionWhere // Considerar si localizacionWhere necesita filtros propios
                    }
                ]
            }
        ];

        let filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations,
            order: [
                ['Fecha_publicacion', 'DESC'] // Orden predeterminado por fecha de publicación
            ]
        });

        // Filtrado por distancia si se proporcionan latitud, longitud y radio
        if (latitud_centro && longitud_centro && radio_km) {
            const centerLat = parseFloat(latitud_centro);
            const centerLon = parseFloat(longitud_centro);
            const radius = parseFloat(radio_km);

            filteredInmuebles = filteredInmuebles.filter(inmueble => {
                if (inmueble.Direccion?.Localizacion?.Latitud !== undefined && inmueble.Direccion?.Localizacion?.Longitud !== undefined) {
                    const lat2 = inmueble.Direccion.Localizacion.Latitud;
                    const lon2 = inmueble.Direccion.Localizacion.Longitud;

                    const R = 6371; // Radio de la Tierra en kilómetros
                    const dLat = (lat2 - centerLat) * (Math.PI / 180);
                    const dLon = (lon2 - centerLon) * (Math.PI / 180);
                    const a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(centerLat * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    return distance <= radius;
                }
                return false;
            });

            // Ordenar por distancia si se usa el filtro de radio
            filteredInmuebles.sort((a, b) => {
                const distA = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(a.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                const distB = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(b.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                return distA - distB;
            });
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros combinados (sin publicador):', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesCombinedWithoutSpecificDetails(req, res) {
    try {
        const {
            // Filtros de Características de la Edificación/Conjunto (G3)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Quién Publica (G4)
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // Filtros de Tipo de Inmueble y Características Generales (G1)
            estado_inmueble, // 'disponible', 'vendido', 'alquilado'
            tipo_edificacion_categoria, // 'Casa', 'Apartamento', etc.
            motivo_transaccion, // 'Venta', 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número para antiguedad exacta
            codigo_interno,

            // Filtros de Ubicación (G2)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'ciudad', 'corregimiento', 'vereda', 'barrio'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km
        } = req.query;

        const whereConditions = {
            Estado: estado_inmueble || 'disponible' // Por defecto busca disponibles
        };
        const acercaEdificacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const tipoEdificacionWhere = {};
        const direccionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Características de la Edificación/Conjunto (G3)
        // =========================================================
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);
        if (zona_comun_si === 'true') acercaEdificacionWhere.Zona_comun = 1;
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 0;

        // =========================================================
        // Filtros de Quién Publica (G4)
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // Filtros de Tipo de Inmueble y Características Generales (G1)
        // =========================================================
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria);
        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno);

        if (precio_min || precio_max) {
            whereConditions.Valor = {
                ...(precio_min && { [Op.gte]: precio_min }),
                ...(precio_max && { [Op.lte]: precio_max })
            };
        }

        if (area_min || area_max) {
            whereConditions.Area = {
                ...(area_min && { [Op.gte]: area_min }),
                ...(area_max && { [Op.lte]: area_max })
            };
        }

        if (antiguedad) {
            switch (antiguedad) {
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
                    // Asume que si no es una de las opciones predefinidas, es un número exacto
                    whereConditions.Antiguedad = parseInt(antiguedad, 10);
                    break;
            }
        }

        // =========================================================
        // Filtros de Ubicación (G2)
        // =========================================================
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'ciudad':
                    addCondition(bccvWhere, 'Ciudad_FK', ubicacion_especifica_id);
                    break;
                case 'corregimiento':
                    addCondition(bccvWhere, 'Corregimiento_FK', ubicacion_especifica_id);
                    break;
                case 'vereda':
                    addCondition(bccvWhere, 'Vereda_Fk', ubicacion_especifica_id);
                    break;
                case 'barrio':
                    addCondition(bccvWhere, 'Barrio_FK', ubicacion_especifica_id);
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // Configuración de las asociaciones con `required` dinámico
        const includeAssociations = [
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
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
            },
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            },
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            { model: Barrio, as: 'Barrio', required: false },
                            {
                                model: Ciudad,
                                as: 'Ciudad',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Corregimiento,
                                as: 'Corregimiento',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Vereda,
                                as: 'Vereda',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                        required: (latitud_centro && longitud_centro && radio_km),
                        where: localizacionWhere // Considerar si localizacionWhere necesita filtros propios
                    }
                ]
            }
        ];

        let filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations,
            order: [
                ['Fecha_publicacion', 'DESC'] // Orden predeterminado por fecha de publicación
            ]
        });

        // Filtrado por distancia si se proporcionan latitud, longitud y radio
        if (latitud_centro && longitud_centro && radio_km) {
            const centerLat = parseFloat(latitud_centro);
            const centerLon = parseFloat(longitud_centro);
            const radius = parseFloat(radio_km);

            filteredInmuebles = filteredInmuebles.filter(inmueble => {
                if (inmueble.Direccion?.Localizacion?.Latitud !== undefined && inmueble.Direccion?.Localizacion?.Longitud !== undefined) {
                    const lat2 = inmueble.Direccion.Localizacion.Latitud;
                    const lon2 = inmueble.Direccion.Localizacion.Longitud;

                    const R = 6371; // Radio de la Tierra en kilómetros
                    const dLat = (lat2 - centerLat) * (Math.PI / 180);
                    const dLon = (lon2 - centerLon) * (Math.PI / 180);
                    const a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(centerLat * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    return distance <= radius;
                }
                return false;
            });

            // Ordenar por distancia si se usa el filtro de radio
            filteredInmuebles.sort((a, b) => {
                const distA = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(a.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                const distB = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(b.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                return distA - distB;
            });
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros combinados (sin detalles específicos):', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesCombinedWithoutBuildingFeatures(req, res) {
    try {
        const {
            // Filtros de Detalles Específicos del Inmueble (G5)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si, // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false'
            num_terrazas,
            garaje_mayor_cero, // 'true' o 'false'
            num_garajes,
            ascensores_si, // 'true' o 'false'
            min_closets,
            num_closets,
            estudio_si, // 'true' o 'false'
            sala_si, // 'true' o 'false'
            comedor_si, // 'true' o 'false'
            zona_lavanderia_si, // 'true' o 'false'
            deposito_division_si, // 'true' o 'false'
            lavanderia_oc_si, // 'true' o 'false'
            gas_oc_si, // 'true' o 'false'
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si, // 'true' o 'false'
            amoblado_si, // 'true' o 'false'
            deposito_oc_mayor_cero, // 'true' o 'false'
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero, // 'true' o 'false'
            tipo_parqueadero,
            parqueadero_cubierto_si, // 'true' o 'false'
            parqueadero_disponible_si, // 'true' o 'false'

            // Filtros de Quién Publica (G4)
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // Filtros de Tipo de Inmueble y Características Generales (G1)
            estado_inmueble, // 'disponible', 'vendido', 'alquilado'
            tipo_edificacion_categoria, // 'Casa', 'Apartamento', etc.
            motivo_transaccion, // 'Venta', 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número para antiguedad exacta
            codigo_interno,

            // Filtros de Ubicación (G2)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'ciudad', 'corregimiento', 'vereda', 'barrio'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km
        } = req.query;

        const whereConditions = {
            Estado: estado_inmueble || 'disponible' // Por defecto busca disponibles
        };
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const tipoEdificacionWhere = {};
        const direccionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Detalles Específicos del Inmueble (G5)
        // =========================================================
        if (num_habitaciones) {
            addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        } else if (min_habitaciones || max_habitaciones) {
            divisionWhere.Habitaciones = {
                ...(min_habitaciones && { [Op.gte]: min_habitaciones }),
                ...(max_habitaciones && { [Op.lte]: max_habitaciones })
            };
        }

        if (num_baños) {
            addCondition(divisionWhere, 'Baños', num_baños);
        } else if (min_baños || max_baños) {
            divisionWhere.Baños = {
                ...(min_baños && { [Op.gte]: min_baños }),
                ...(max_baños && { [Op.lte]: max_baños })
            };
        }

        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí';
        if (balcon_si === 'false') divisionWhere.Balcon = 'No';

        if (num_terrazas) {
            addCondition(divisionWhere, 'Terraza', num_terrazas);
        } else if (terraza_mayor_cero === 'true') {
            divisionWhere.Terraza = { [Op.gt]: 0 };
        }

        if (num_garajes) {
            addCondition(divisionWhere, 'Garaje', num_garajes);
        } else if (garaje_mayor_cero === 'true') {
            divisionWhere.Garaje = { [Op.gt]: 0 };
        }

        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí';
        if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';

        if (num_closets) {
            addCondition(divisionWhere, 'Closets', num_closets);
        } else if (min_closets) {
            divisionWhere.Closets = { [Op.gte]: min_closets };
        }

        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

        if (numero_piso) {
            addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        } else if (min_piso || max_piso) {
            otrasCaracteristicasWhere.Piso = {
                ...(min_piso && { [Op.gte]: min_piso }),
                ...(max_piso && { [Op.lte]: max_piso })
            };
        }

        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;

        if (num_depositos_oc) {
            addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
        } else if (deposito_oc_mayor_cero === 'true') {
            otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };
        }

        if (cantidad_parqueaderos_mayor_cero === 'true') {
            organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        }
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        // =========================================================
        // Filtros de Quién Publica (G4)
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // Filtros de Tipo de Inmueble y Características Generales (G1)
        // =========================================================
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria);
        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno);

        if (precio_min || precio_max) {
            whereConditions.Valor = {
                ...(precio_min && { [Op.gte]: precio_min }),
                ...(precio_max && { [Op.lte]: precio_max })
            };
        }

        if (area_min || area_max) {
            whereConditions.Area = {
                ...(area_min && { [Op.gte]: area_min }),
                ...(area_max && { [Op.lte]: area_max })
            };
        }

        if (antiguedad) {
            switch (antiguedad) {
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
                    // Asume que si no es una de las opciones predefinidas, es un número exacto
                    whereConditions.Antiguedad = parseInt(antiguedad, 10);
                    break;
            }
        }

        // =========================================================
        // Filtros de Ubicación (G2)
        // =========================================================
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'ciudad':
                    addCondition(bccvWhere, 'Ciudad_FK', ubicacion_especifica_id);
                    break;
                case 'corregimiento':
                    addCondition(bccvWhere, 'Corregimiento_FK', ubicacion_especifica_id);
                    break;
                case 'vereda':
                    addCondition(bccvWhere, 'Vereda_Fk', ubicacion_especifica_id);
                    break;
                case 'barrio':
                    addCondition(bccvWhere, 'Barrio_FK', ubicacion_especifica_id);
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // Configuración de las asociaciones con `required` dinámico
        const includeAssociations = [
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
            },
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            },
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            { model: Barrio, as: 'Barrio', required: false },
                            {
                                model: Ciudad,
                                as: 'Ciudad',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Corregimiento,
                                as: 'Corregimiento',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Vereda,
                                as: 'Vereda',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                        required: (latitud_centro && longitud_centro && radio_km),
                        where: localizacionWhere // Considerar si localizacionWhere necesita filtros propios
                    }
                ]
            }
        ];

        let filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations,
            order: [
                ['Fecha_publicacion', 'DESC'] // Orden predeterminado por fecha de publicación
            ]
        });

        // Filtrado por distancia si se proporcionan latitud, longitud y radio
        if (latitud_centro && longitud_centro && radio_km) {
            const centerLat = parseFloat(latitud_centro);
            const centerLon = parseFloat(longitud_centro);
            const radius = parseFloat(radio_km);

            filteredInmuebles = filteredInmuebles.filter(inmueble => {
                if (inmueble.Direccion?.Localizacion?.Latitud !== undefined && inmueble.Direccion?.Localizacion?.Longitud !== undefined) {
                    const lat2 = inmueble.Direccion.Localizacion.Latitud;
                    const lon2 = inmueble.Direccion.Localizacion.Longitud;

                    const R = 6371; // Radio de la Tierra en kilómetros
                    const dLat = (lat2 - centerLat) * (Math.PI / 180);
                    const dLon = (lon2 - centerLon) * (Math.PI / 180);
                    const a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(centerLat * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    return distance <= radius;
                }
                return false;
            });

            // Ordenar por distancia si se usa el filtro de radio
            filteredInmuebles.sort((a, b) => {
                const distA = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(a.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                const distB = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(b.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                return distA - distB;
            });
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros combinados (sin características de edificación):', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesCombinedWithoutGeneralCharacteristics(req, res) {
    try {
        const {
            // Filtros de Detalles Específicos del Inmueble (G5)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si, // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false'
            num_terrazas,
            garaje_mayor_cero, // 'true' o 'false'
            num_garajes,
            ascensores_si, // 'true' o 'false'
            min_closets,
            num_closets,
            estudio_si, // 'true' o 'false'
            sala_si, // 'true' o 'false'
            comedor_si, // 'true' o 'false'
            zona_lavanderia_si, // 'true' o 'false'
            deposito_division_si, // 'true' o 'false'
            lavanderia_oc_si, // 'true' o 'false'
            gas_oc_si, // 'true' o 'false'
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si, // 'true' o 'false'
            amoblado_si, // 'true' o 'false'
            deposito_oc_mayor_cero, // 'true' o 'false'
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero, // 'true' o 'false'
            tipo_parqueadero,
            parqueadero_cubierto_si, // 'true' o 'false'
            parqueadero_disponible_si, // 'true' o 'false',

            // Filtros de Características de la Edificación/Conjunto (G3)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Quién Publica (G4)
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // Filtros de Ubicación (G2)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'ciudad', 'corregimiento', 'vereda', 'barrio'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km
        } = req.query;

        const whereConditions = {
            Estado: 'disponible' // Por defecto busca disponibles, ya que no hay un filtro de estado general de inmueble en esta combinación
        };
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const acercaEdificacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const direccionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Detalles Específicos del Inmueble (G5)
        // =========================================================
        if (num_habitaciones) {
            addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        } else if (min_habitaciones || max_habitaciones) {
            divisionWhere.Habitaciones = {
                ...(min_habitaciones && { [Op.gte]: min_habitaciones }),
                ...(max_habitaciones && { [Op.lte]: max_habitaciones })
            };
        }

        if (num_baños) {
            addCondition(divisionWhere, 'Baños', num_baños);
        } else if (min_baños || max_baños) {
            divisionWhere.Baños = {
                ...(min_baños && { [Op.gte]: min_baños }),
                ...(max_baños && { [Op.lte]: max_baños })
            };
        }

        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí';
        if (balcon_si === 'false') divisionWhere.Balcon = 'No';

        if (num_terrazas) {
            addCondition(divisionWhere, 'Terraza', num_terrazas);
        } else if (terraza_mayor_cero === 'true') {
            divisionWhere.Terraza = { [Op.gt]: 0 };
        }

        if (num_garajes) {
            addCondition(divisionWhere, 'Garaje', num_garajes);
        } else if (garaje_mayor_cero === 'true') {
            divisionWhere.Garaje = { [Op.gt]: 0 };
        }

        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí';
        if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';

        if (num_closets) {
            addCondition(divisionWhere, 'Closets', num_closets);
        } else if (min_closets) {
            divisionWhere.Closets = { [Op.gte]: min_closets };
        }

        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

        if (numero_piso) {
            addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        } else if (min_piso || max_piso) {
            otrasCaracteristicasWhere.Piso = {
                ...(min_piso && { [Op.gte]: min_piso }),
                ...(max_piso && { [Op.lte]: max_piso })
            };
        }

        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;

        if (num_depositos_oc) {
            addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
        } else if (deposito_oc_mayor_cero === 'true') {
            otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };
        }

        if (cantidad_parqueaderos_mayor_cero === 'true') {
            organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        }
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        // =========================================================
        // Filtros de Características de la Edificación/Conjunto (G3)
        // =========================================================
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);
        if (zona_comun_si === 'true') acercaEdificacionWhere.Zona_comun = 1;
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 0;


        // =========================================================
        // Filtros de Quién Publica (G4)
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // Filtros de Ubicación (G2)
        // =========================================================
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'ciudad':
                    addCondition(bccvWhere, 'Ciudad_FK', ubicacion_especifica_id);
                    break;
                case 'corregimiento':
                    addCondition(bccvWhere, 'Corregimiento_FK', ubicacion_especifica_id);
                    break;
                case 'vereda':
                    addCondition(bccvWhere, 'Vereda_Fk', ubicacion_especifica_id);
                    break;
                case 'barrio':
                    addCondition(bccvWhere, 'Barrio_FK', ubicacion_especifica_id);
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            addCondition(direccionWhere, 'Tipo_via', tipo_via);
            addCondition(direccionWhere, 'Numero_via_principal', numero_via_principal);
            addCondition(direccionWhere, 'Numero_calle_transversal', numero_calle_transversal);
            addCondition(direccionWhere, 'Numero_edificacion', numero_edificacion);
        }
        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // Configuración de las asociaciones con `required` dinámico
        const includeAssociations = [
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
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
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
            },
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                where: direccionWhere,
                include: [
                    {
                        model: BarrioCiudadCorregimientoVereda,
                        as: 'BarrioCiudadCorregimientoVereda',
                        required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                        where: bccvWhere,
                        include: [
                            { model: Barrio, as: 'Barrio', required: false },
                            {
                                model: Ciudad,
                                as: 'Ciudad',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Corregimiento,
                                as: 'Corregimiento',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                model: Vereda,
                                as: 'Vereda',
                                required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                include: [
                                    {
                                        model: Municipio,
                                        as: 'Municipio',
                                        required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                        where: municipioWhere,
                                        include: [
                                            {
                                                model: Ndap,
                                                as: 'Ndap',
                                                required: Object.keys(ndapWhere).length > 0,
                                                where: ndapWhere
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
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
                        required: (latitud_centro && longitud_centro && radio_km),
                        where: localizacionWhere // Considerar si localizacionWhere necesita filtros propios
                    }
                ]
            }
        ];

        let filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations,
            order: [
                ['Fecha_publicacion', 'DESC'] // Orden predeterminado por fecha de publicación
            ]
        });

        // Filtrado por distancia si se proporcionan latitud, longitud y radio
        if (latitud_centro && longitud_centro && radio_km) {
            const centerLat = parseFloat(latitud_centro);
            const centerLon = parseFloat(longitud_centro);
            const radius = parseFloat(radio_km);

            filteredInmuebles = filteredInmuebles.filter(inmueble => {
                if (inmueble.Direccion?.Localizacion?.Latitud !== undefined && inmueble.Direccion?.Localizacion?.Longitud !== undefined) {
                    const lat2 = inmueble.Direccion.Localizacion.Latitud;
                    const lon2 = inmueble.Direccion.Localizacion.Longitud;

                    const R = 6371; // Radio de la Tierra en kilómetros
                    const dLat = (lat2 - centerLat) * (Math.PI / 180);
                    const dLon = (lon2 - centerLon) * (Math.PI / 180);
                    const a =
                        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(centerLat * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    return distance <= radius;
                }
                return false;
            });

            // Ordenar por distancia si se usa el filtro de radio
            filteredInmuebles.sort((a, b) => {
                const distA = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(a.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(a.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                const distB = 6371 * Math.acos(Math.cos(centerLat * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Latitud * (Math.PI / 180)) * Math.cos(b.Direccion.Localizacion.Longitud * (Math.PI / 180) - centerLon * (Math.PI / 180)) + Math.sin(centerLat * (Math.PI / 180)) * Math.sin(b.Direccion.Localizacion.Latitud * (Math.PI / 180)));
                return distA - distB;
            });
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros combinados (sin tipo de inmueble y características generales):', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesCombinedWithoutLocation(req, res) {
    try {
        const {
            // Filtros de Detalles Específicos del Inmueble (G5)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si, // 'true' o 'false'
            terraza_mayor_cero, // 'true' o 'false'
            num_terrazas,
            garaje_mayor_cero, // 'true' o 'false'
            num_garajes,
            ascensores_si, // 'true' o 'false'
            min_closets,
            num_closets,
            estudio_si, // 'true' o 'false'
            sala_si, // 'true' o 'false'
            comedor_si, // 'true' o 'false'
            zona_lavanderia_si, // 'true' o 'false'
            deposito_division_si, // 'true' o 'false'
            lavanderia_oc_si, // 'true' o 'false'
            gas_oc_si, // 'true' o 'false'
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si, // 'true' o 'false'
            amoblado_si, // 'true' o 'false'
            deposito_oc_mayor_cero, // 'true' o 'false'
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero, // 'true' o 'false'
            tipo_parqueadero,
            parqueadero_cubierto_si, // 'true' o 'false'
            parqueadero_disponible_si, // 'true' o 'false',

            // Filtros de Características de la Edificación/Conjunto (G3)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Quién Publica (G4)
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // Filtros de Tipo de Inmueble y Características Generales (G1)
            estado_inmueble, // 'disponible', 'vendido', 'alquilado'
            tipo_edificacion_categoria, // 'Casa', 'Apartamento', etc.
            motivo_transaccion, // 'Venta', 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número para antiguedad exacta
            codigo_interno
        } = req.query;

        const whereConditions = {
            Estado: estado_inmueble || 'disponible' // Por defecto busca disponibles
        };
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const acercaEdificacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const tipoEdificacionWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Detalles Específicos del Inmueble (G5)
        // =========================================================
        if (num_habitaciones) {
            addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        } else if (min_habitaciones || max_habitaciones) {
            divisionWhere.Habitaciones = {
                ...(min_habitaciones && { [Op.gte]: min_habitaciones }),
                ...(max_habitaciones && { [Op.lte]: max_habitaciones })
            };
        }

        if (num_baños) {
            addCondition(divisionWhere, 'Baños', num_baños);
        } else if (min_baños || max_baños) {
            divisionWhere.Baños = {
                ...(min_baños && { [Op.gte]: min_baños }),
                ...(max_baños && { [Op.lte]: max_baños })
            };
        }

        addCondition(divisionWhere, 'Cocina', tipo_cocina);
        if (balcon_si === 'true') divisionWhere.Balcon = 'Sí';
        if (balcon_si === 'false') divisionWhere.Balcon = 'No';

        if (num_terrazas) {
            addCondition(divisionWhere, 'Terraza', num_terrazas);
        } else if (terraza_mayor_cero === 'true') {
            divisionWhere.Terraza = { [Op.gt]: 0 };
        }

        if (num_garajes) {
            addCondition(divisionWhere, 'Garaje', num_garajes);
        } else if (garaje_mayor_cero === 'true') {
            divisionWhere.Garaje = { [Op.gt]: 0 };
        }

        if (ascensores_si === 'true') divisionWhere.Ascensores = 'Sí';
        if (ascensores_si === 'false') divisionWhere.Ascensores = 'No';

        if (num_closets) {
            addCondition(divisionWhere, 'Closets', num_closets);
        } else if (min_closets) {
            divisionWhere.Closets = { [Op.gte]: min_closets };
        }

        if (estudio_si === 'true') divisionWhere.Estudio = 1;
        if (sala_si === 'true') divisionWhere.Sala = 1;
        if (comedor_si === 'true') divisionWhere.Comedor = 1;
        if (zona_lavanderia_si === 'true') divisionWhere.Zona_lavanderia = 1;
        if (deposito_division_si === 'true') divisionWhere.Deposito = 1;

        if (lavanderia_oc_si === 'true') otrasCaracteristicasWhere.Lavanderia = 1;
        if (gas_oc_si === 'true') otrasCaracteristicasWhere.Gas = 1;

        if (numero_piso) {
            addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso);
        } else if (min_piso || max_piso) {
            otrasCaracteristicasWhere.Piso = {
                ...(min_piso && { [Op.gte]: min_piso }),
                ...(max_piso && { [Op.lte]: max_piso })
            };
        }

        if (mascotas_permitidas_si === 'true') otrasCaracteristicasWhere.Mascotas_permitidas = 1;
        if (amoblado_si === 'true') otrasCaracteristicasWhere.Amoblado = 1;

        if (num_depositos_oc) {
            addCondition(otrasCaracteristicasWhere, 'Deposito', num_depositos_oc);
        } else if (deposito_oc_mayor_cero === 'true') {
            otrasCaracteristicasWhere.Deposito = { [Op.gt]: 0 };
        }

        if (cantidad_parqueaderos_mayor_cero === 'true') {
            organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
        }
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero);
        if (parqueadero_cubierto_si === 'true') organizacionParqueaderoWhere.Cubierto = 1;
        if (parqueadero_disponible_si === 'true') organizacionParqueaderoWhere.Disponible = 1;

        // =========================================================
        // Filtros de Características de la Edificación/Conjunto (G3)
        // =========================================================
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);
        if (zona_comun_si === 'true') acercaEdificacionWhere.Zona_comun = 1;
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 0;


        // =========================================================
        // Filtros de Quién Publica (G4)
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // Filtros de Tipo de Inmueble y Características Generales (G1)
        // =========================================================
        addCondition(tipoEdificacionWhere, 'Tipo_edificacion_categoria', tipo_edificacion_categoria);
        addCondition(whereConditions, 'Motivo_VoA', motivo_transaccion);
        addCondition(whereConditions, 'Codigo_interno', codigo_interno);

        if (precio_min || precio_max) {
            whereConditions.Valor = {
                ...(precio_min && { [Op.gte]: precio_min }),
                ...(precio_max && { [Op.lte]: precio_max })
            };
        }

        if (area_min || area_max) {
            whereConditions.Area = {
                ...(area_min && { [Op.gte]: area_min }),
                ...(area_max && { [Op.lte]: area_max })
            };
        }

        if (antiguedad) {
            switch (antiguedad) {
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
                    // Asume que si no es una de las opciones predefinidas, es un número exacto
                    whereConditions.Antiguedad = parseInt(antiguedad, 10);
                    break;
            }
        }

        // Configuración de las asociaciones con `required` dinámico
        const includeAssociations = [
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
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
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
            },
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            }
        ];

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations,
            order: [
                ['Fecha_publicacion', 'DESC'] // Orden predeterminado por fecha de publicación
            ]
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros combinados (sin ubicación):', error);
        res.status(500).json({ error: error.message });
    }
}