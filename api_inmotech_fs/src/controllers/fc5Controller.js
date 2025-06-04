import Inmueble from '../models/inmueble.js';
import TipoEdificacion from '../models/tipo_edificacion.js';
import AcercaEdificacion from '../models/acerca_edificacion.js';
import Division from '../models/division.js';
import OtrasCaracteristicas from '../models/otras_caracteristicas.js';
import Asignacion from '../models/asignacion.js';
import OrganizacionParqueadero from '../models/organizacion_parqueadero.js';
import PlatformUser from '../models/platform_user.js';
import PlatformProfile from '../models/platform_profile.js';
import Direccion from '../models/direccion.js';
import DesignadorCardinal from '../models/designador_cardinal.js';
import Localizacion from '../models/localizacion.js';
import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
import Barrio from '../models/barrio.js';
import Ciudad from '../models/ciudad.js';
import Corregimiento from '../models/corregimiento.js';
import Vereda from '../models/vereda.js';
import Municipio from '../models/municipio.js';
import Ndap from '../models/ndap.js';

export async function getFilteredInmueblesFull(req, res) {
    try {
        const {
            // GRUPO 1: Tipo de Inmueble y Características Generales
            estado_inmueble, // 'disponible', 'vendido', 'alquilado'
            tipo_edificacion_categoria,
            motivo_transaccion, // 'Venta', 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número exacto
            codigo_interno,

            // GRUPO 2: Ubicación Geográfica
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
            radio_km,

            // GRUPO 3: Características de la Edificación/Conjunto
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // GRUPO 4: Quién Publica
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // GRUPO 5: Detalles Específicos de Inmueble (División, Otras Características, Parqueadero)
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
            zona_lavanderia_division_si, // 'true' o 'false'
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
            parqueadero_disponible_si // 'true' o 'false'
        } = req.query;

        // Inicializa objetos para las condiciones de cada modelo
        const whereConditions = {}; // Condiciones para el modelo Inmueble directamente
        const tipoEdificacionWhere = {};
        const acercaEdificacionWhere = {};
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const direccionWhere = {};
        const designadorCardinalWhere = {};
        const localizacionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};

        // Helper para agregar condiciones solo si el valor existe
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // GRUPO 1: Filtros por Tipo de Inmueble y Características Generales
        // =========================================================
        addCondition(whereConditions, 'Estado', estado_inmueble || 'disponible'); // Por defecto busca disponibles
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
                    whereConditions.Antiguedad = parseInt(antiguedad, 10);
                    break;
            }
        }

        // =========================================================
        // GRUPO 2: Filtros de Ubicación Geográfica
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

        // =========================================================
        // GRUPO 3: Filtros por Características de la Edificación/Conjunto
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
        // GRUPO 4: Filtros por "Quién publica"
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // GRUPO 5: Filtros por Detalles Específicos de Inmueble
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
        if (zona_lavanderia_division_si === 'true') divisionWhere.Zona_lavanderia = 1;
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

        // Configuración de las asociaciones con `required` dinámico
        // Esto asegura que solo se unan las tablas si hay filtros específicos para ellas.
        const includeAssociations = [
            {
                model: TipoEdificacion,
                as: 'TipoEdificacion',
                required: Object.keys(tipoEdificacionWhere).length > 0,
                where: tipoEdificacionWhere
            },
            {
                model: AcercaEdificacion,
                as: 'AcercaEdificacion',
                required: Object.keys(acercaEdificacionWhere).length > 0,
                where: acercaEdificacionWhere
            },
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
                model: Direccion,
                as: 'Direccion',
                // Required si hay filtros de dirección, ubicación o radio
                required: Object.keys(direccionWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                where: direccionWhere,
                include: [
                    {
                        model: DesignadorCardinal,
                        as: 'DesignadorCardinal',
                        required: Object.keys(designadorCardinalWhere).length > 0,
                        where: designadorCardinalWhere
                    },
                    {
                        model: Localizacion,
                        as: 'Localizacion',
                        required: (latitud_centro && longitud_centro && radio_km), // Solo requerido si se usa el filtro de radio
                        where: localizacionWhere // Considerar si localizacionWhere necesita filtros propios
                    },
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

        // Filtrado y ordenamiento por distancia si se proporcionan latitud, longitud y radio
        if (latitud_centro && longitud_centro && radio_km) {
            const centerLat = parseFloat(latitud_centro);
            const centerLon = parseFloat(longitud_centro);
            const radius = parseFloat(radio_km);

            filteredInmuebles = filteredInmuebles.filter(inmueble => {
                // Asegúrate de que los datos de localización existan para calcular la distancia
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

                    // Adjunta la distancia para usarla en el ordenamiento posterior
                    inmueble.dataValues.distancia_km = distance;
                    return distance <= radius;
                }
                return false;
            });

            // Ordenar por distancia (los más cercanos primero)
            filteredInmuebles.sort((a, b) => a.dataValues.distancia_km - b.dataValues.distancia_km);
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros completos:', error);
        res.status(500).json({ error: error.message });
    }
}