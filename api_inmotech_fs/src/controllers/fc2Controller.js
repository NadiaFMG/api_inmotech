import Inmueble from '../models/inmueble.js'; //falta modelo
import TipoEdificacion from '../models/tipoEdificacionModel.js';
import Direccion from '../models/direccion.js';
import DesignadorCardinal from '../models/designador_cardinal.js';
import Localizacion from '../models/localizacion.js';
import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
import Barrio from '../models/barrio.js';
import Ciudad from '../models/ciudad.js';
import Corregimiento from '../models/corregimiento.js';
import Vereda from '../models/vereda.js'; // en el modelo esta como vereda
import Municipio from '../models/municipio.js'; //en el modelo esta como municipio
import Ndap from '../models/ndap.js'; //en el modelo esta como ndap
import AcercaEdificacion from '../models/acerca_edificacion.js'; //en el modelo esta como Acerca_edificacion
import PlatformUser from '../models/platform_user.js'; //falta modelo y ver que propiedades tiene mejor dicho tiene que ver con el usuario de la plataforma
import PlatformProfile from '../models/platform_profile.js'; //falta modelo y ver que propiedades tiene mejor dicho tiene que ver con el profile de la plataforma
import Division from '../models/division.js'; // en el modelo esta como division
import OtrasCaracteristicas from '../models/otras_caracteristicas.js'; //falta modelo
import Asignacion from '../models/asignacion.js';//en el modelo esta como asignacion
import OrganizacionParqueadero from '../models/organizacion_parqueadero.js'; // en el modelo esta como organizacionParqueadero

export async function getInmueblesG1G2(req, res) {
    try {
        const {
            // Filtros del Grupo 1 (Tipo de Inmueble y Características Generales)
            tipo_edificacion_categoria,
            motivo_transaccion, // 'Venta' o 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número exacto
            codigo_interno,

            // Filtros del Grupo 2 (Ubicación Geográfica)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km // Radio en kilómetros para búsqueda por cercanía
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const tipoEdificacionWhere = {};
        const direccionWhere = {};
        const localizacionWhere = {};
        const bccvWhere = {};
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 1 ---
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
                    // Si es un número exacto
                    if (!isNaN(parseInt(antiguedad_param))) {
                        whereConditions.Antiguedad = parseInt(antiguedad_param);
                    }
                    break;
            }
        }

        // --- Filtros del Grupo 2 ---
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'barrio':
                    bccvWhere.Barrio_FK = ubicacion_especifica_id;
                    break;
                case 'ciudad':
                    bccvWhere.Ciudad_FK = ubicacion_especifica_id;
                    break;
                case 'corregimiento':
                    bccvWhere.Corregimiento_FK = ubicacion_especifica_id;
                    break;
                case 'vereda':
                    bccvWhere.Vereda_Fk = ubicacion_especifica_id;
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            direccionWhere.Tipo_via = tipo_via;
            direccionWhere.Numero_via_principal = numero_via_principal;
            direccionWhere.Numero_calle_transversal = numero_calle_transversal;
            direccionWhere.Numero_edificacion = numero_edificacion;
        }

        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // Cláusula HAVING para distancia (calculada después del SELECT)
        let havingConditions = {};
        if (latitud_centro && longitud_centro && radio_km) {
            // Sequelize no soporta HAVING directamente en el .find, se maneja con `literal` o raw queries.
            // Para mantenerlo en un controlador Sequelize ORM, se necesitaría un enfoque más avanzado
            // o realizar el filtrado de distancia en la aplicación después de obtener los resultados,
            // lo cual no es eficiente para grandes volúmenes de datos.
            // Para este ejemplo, dejaremos el cálculo en la consulta y el filtrado se puede hacer post-query si es estrictamente necesario con Sequelize puro.
            // Ojo: La forma más eficiente sería pasar la fórmula de distancia en un `where` con `sequelize.literal`
            // o usar raw query para `HAVING`.
            // Aquí, incluimos la lógica de cálculo en el `attributes` para que la `distancia_km` esté disponible.
            // El `HAVING` real lo simulamos post-query si no podemos hacerlo con `literal` en `where`.
        }

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            attributes: [
                'Inmueble_id',
                'Valor',
                'Area',
                'Motivo_VoA',
                'Antiguedad',
                'Codigo_interno',
                [
                    Inmueble.sequelize.literal(`
                        CASE
                            WHEN ${latitud_centro ? latitud_centro : 'NULL'} IS NOT NULL
                            AND ${longitud_centro ? longitud_centro : 'NULL'} IS NOT NULL
                            AND \`Localizacion\`.\`Latitud\` IS NOT NULL
                            AND \`Localizacion\`.\`Longitud\` IS NOT NULL THEN
                                6371 * acos(
                                    cos(radians(${latitud_centro ? latitud_centro : 'NULL'})) * cos(radians(\`Localizacion\`.\`Latitud\`)) * cos(radians(\`Localizacion\`.\`Longitud\`) - radians(${longitud_centro ? longitud_centro : 'NULL'}))
                                    + sin(radians(${latitud_centro ? latitud_centro : 'NULL'})) * sin(radians(\`Localizacion\`.\`Latitud\`))
                                )
                            ELSE NULL
                        END
                    `),
                    'distancia_km'
                ]
            ],
            include: [
                {
                    model: TipoEdificacion,
                    as: 'TipoEdificacion',
                    required: Object.keys(tipoEdificacionWhere).length > 0,
                    where: tipoEdificacionWhere
                },
                {
                    model: Direccion,
                    as: 'Direccion',
                    required: Object.keys(direccionWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0,
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
                            required: Object.keys(localizacionWhere).length > 0 || (latitud_centro && longitud_centro && radio_km), // Required if distance calculation or location filters
                            where: localizacionWhere
                        },
                        {
                            model: BarrioCiudadCorregimientoVereda,
                            as: 'BarrioCiudadCorregimientoVereda',
                            required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                            where: bccvWhere,
                            include: [
                                { model: Barrio, as: 'Barrio' },
                                { model: Ciudad, as: 'Ciudad' },
                                { model: Corregimiento, as: 'Corregimiento' },
                                { model: Vereda, as: 'Vereda' },
                                {
                                    model: Municipio,
                                    as: 'Municipio', // Asegúrate de que este alias esté correctamente definido en tus asociaciones
                                    required: Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                                    where: municipioWhere,
                                    include: [
                                        {
                                            model: Ndap,
                                            as: 'Ndap', // Asegúrate de que este alias esté correctamente definido
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
        });

        // Filtrado por distancia después de la consulta si se especificó radio_km
        let finalResults = filteredInmuebles;
        if (latitud_centro && longitud_centro && radio_km) {
            finalResults = filteredInmuebles.filter(inmueble => {
                // Sequelize agrega los atributos calculados directamente a la instancia del modelo
                const distancia = inmueble.dataValues.distancia_km;
                return distancia !== null && distancia <= parseFloat(radio_km);
            });
        }

        res.json(finalResults);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros G1 y G2:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getInmueblesG1G3(req, res) {
    try {
        const {
            // Filtros del Grupo 1 (Tipo de Inmueble y Características Generales)
            tipo_edificacion_categoria,
            motivo_transaccion, // 'Venta' o 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número exacto
            codigo_interno,

            // Filtros del Grupo 3 (Características de la Edificación/Conjunto)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si // 'true' o 'false'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const tipoEdificacionWhere = {};
        const acercaEdificacionWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 1 ---
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
                    // Si es un número exacto
                    if (!isNaN(parseInt(antiguedad_param))) {
                        whereConditions.Antiguedad = parseInt(antiguedad_param);
                    }
                    break;
            }
        }

        // --- Filtros del Grupo 3 ---
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }

        if (zona_comun_si === 'true') acercaEdificacionWhere.Zona_comun = 'Sí';
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 'No';

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: TipoEdificacion,
                    as: 'TipoEdificacion', // Asegúrate de que el alias coincida
                    required: Object.keys(tipoEdificacionWhere).length > 0,
                    where: tipoEdificacionWhere
                },
                {
                    model: AcercaEdificacion,
                    as: 'AcercaEdificacion', // Asegúrate de que el alias coincida
                    required: Object.keys(acercaEdificacionWhere).length > 0, // JOIN si hay condiciones para AcercaEdificacion
                    where: acercaEdificacionWhere
                }
            ]
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros G1 y G3:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getInmueblesG1G4(req, res) {
    try {
        const {
            // Filtros del Grupo 1 (Tipo de Inmueble y Características Generales)
            tipo_edificacion_categoria,
            motivo_transaccion, // 'Venta' o 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número exacto
            codigo_interno,

            // Filtros del Grupo 4 ("Quién Publica")
            platform_user_id,
            tipo_anunciante // 'Agente', 'Propietario', 'Constructora'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const tipoEdificacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 1 ---
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
                    if (!isNaN(parseInt(antiguedad_param))) {
                        whereConditions.Antiguedad = parseInt(antiguedad_param);
                    }
                    break;
            }
        }

        // --- Filtros del Grupo 4 ---
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: TipoEdificacion,
                    as: 'TipoEdificacion',
                    required: Object.keys(tipoEdificacionWhere).length > 0,
                    where: tipoEdificacionWhere
                },
                {
                    model: PlatformUser,
                    as: 'PlatformUser', // Asegúrate de que este alias coincida con la asociación en tu modelo Inmueble
                    required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0, // JOIN si hay condiciones en PlatformUser o PlatformProfile
                    where: platformUserWhere,
                    include: [
                        {
                            model: PlatformProfile,
                            as: 'PlatformProfile', // Asegúrate de que este alias coincida
                            required: Object.keys(platformProfileWhere).length > 0, // JOIN si hay condiciones para PlatformProfile
                            where: platformProfileWhere
                        }
                    ]
                }
            ]
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros G1 y G4:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getInmueblesG1G5(req, res) {
    try {
        const {
            // Filtros del Grupo 1 (Tipo de Inmueble y Características Generales)
            tipo_edificacion_categoria,
            motivo_transaccion, // 'Venta' o 'Arriendo'
            precio_min,
            precio_max,
            area_min,
            area_max,
            antiguedad_param, // 'Nueva', 'Menos de 5 años', '5-10 años', 'Mas de 10 años', o un número exacto
            codigo_interno,

            // Filtros del Grupo 5 (Características de la División / Espacios Internos)
            num_habitaciones,
            num_baños,
            tipo_cocina, // 'Integral', 'Abierta', 'Cerrada'
            tiene_balcon_param, // 1 para 'Sí', 0 para 'No'
            num_terrazas, // mínimo de terrazas
            num_garajes_division_param, // mínimo de garajes
            tiene_ascensores_param, // 1 para 'Sí', 0 para 'No'
            min_closets_param,
            tiene_estudio_param, // 1 para 'Sí', 0 para 'No'
            tiene_sala_param, // 1 para 'Sí', 0 para 'No'
            tiene_comedor_param, // 1 para 'Sí', 0 para 'No'
            tiene_zona_lavanderia_division_param, // 1 para 'Sí', 0 para 'No'
            tiene_deposito_division_param, // 1 para 'Sí', 0 para 'No'
            tiene_lavanderia_oc_param, // 1 para 'Sí', 0 para 'No'
            tiene_gas_param, // 1 para 'Sí', 0 para 'No'
            numero_piso_param,
            mascotas_permitidas_param, // 1 para 'Sí', 0 para 'No'
            amoblado_param, // 1 para 'Sí', 0 para 'No'
            num_depositos_oc_param, // mínimo de depósitos
            tiene_parqueadero_op_param, // 1 para 'Sí' (cantidad > 0), 0 para 'No'
            tipo_parqueadero_param, // 'Propio', 'Visitantes', 'Comunal'
            parqueadero_cubierto_param, // 1 para 'Sí', 0 para 'No'
            parqueadero_disponible_param // 1 para 'Sí', 0 para 'No'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const tipoEdificacionWhere = {};
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 1 ---
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
                    if (!isNaN(parseInt(antiguedad_param))) {
                        whereConditions.Antiguedad = parseInt(antiguedad_param);
                    }
                    break;
            }
        }

        // --- Filtros del Grupo 5 ---
        addCondition(divisionWhere, 'Habitaciones', num_habitaciones);
        addCondition(divisionWhere, 'Baños', num_baños);
        addCondition(divisionWhere, 'Cocina', tipo_cocina);

        if (tiene_balcon_param !== undefined && tiene_balcon_param !== null && tiene_balcon_param !== '') {
            divisionWhere.Balcon = (tiene_balcon_param == 1 || tiene_balcon_param === 'true') ? 'Sí' : 'No';
        }
        if (num_terrazas) {
            divisionWhere.Terraza = { [Op.gte]: num_terrazas };
        }
        if (num_garajes_division_param) {
            divisionWhere.Garaje = { [Op.gte]: num_garajes_division_param };
        }
        if (tiene_ascensores_param !== undefined && tiene_ascensores_param !== null && tiene_ascensores_param !== '') {
            divisionWhere.Ascensores = (tiene_ascensores_param == 1 || tiene_ascensores_param === 'true') ? 'Sí' : 'No';
        }
        if (min_closets_param) {
            divisionWhere.Closets = { [Op.gte]: min_closets_param };
        }
        if (tiene_estudio_param !== undefined && tiene_estudio_param !== null && tiene_estudio_param !== '') {
            divisionWhere.Estudio = (tiene_estudio_param == 1 || tiene_estudio_param === 'true');
        }
        if (tiene_sala_param !== undefined && tiene_sala_param !== null && tiene_sala_param !== '') {
            divisionWhere.Sala = (tiene_sala_param == 1 || tiene_sala_param === 'true');
        }
        if (tiene_comedor_param !== undefined && tiene_comedor_param !== null && tiene_comedor_param !== '') {
            divisionWhere.Comedor = (tiene_comedor_param == 1 || tiene_comedor_param === 'true');
        }
        if (tiene_zona_lavanderia_division_param !== undefined && tiene_zona_lavanderia_division_param !== null && tiene_zona_lavanderia_division_param !== '') {
            divisionWhere.Zona_lavanderia = (tiene_zona_lavanderia_division_param == 1 || tiene_zona_lavanderia_division_param === 'true');
        }
        if (tiene_deposito_division_param !== undefined && tiene_deposito_division_param !== null && tiene_deposito_division_param !== '') {
            divisionWhere.Deposito = (tiene_deposito_division_param == 1 || tiene_deposito_division_param === 'true');
        }

        if (tiene_lavanderia_oc_param !== undefined && tiene_lavanderia_oc_param !== null && tiene_lavanderia_oc_param !== '') {
            otrasCaracteristicasWhere.Lavanderia = (tiene_lavanderia_oc_param == 1 || tiene_lavanderia_oc_param === 'true');
        }
        if (tiene_gas_param !== undefined && tiene_gas_param !== null && tiene_gas_param !== '') {
            otrasCaracteristicasWhere.Gas = (tiene_gas_param == 1 || tiene_gas_param === 'true');
        }
        addCondition(otrasCaracteristicasWhere, 'Piso', numero_piso_param);
        if (mascotas_permitidas_param !== undefined && mascotas_permitidas_param !== null && mascotas_permitidas_param !== '') {
            otrasCaracteristicasWhere.Mascotas_permitidas = (mascotas_permitidas_param == 1 || mascotas_permitidas_param === 'true');
        }
        if (amoblado_param !== undefined && amoblado_param !== null && amoblado_param !== '') {
            otrasCaracteristicasWhere.Amoblado = (amoblado_param == 1 || amoblado_param === 'true');
        }
        if (num_depositos_oc_param) {
            otrasCaracteristicasWhere.Deposito = { [Op.gte]: num_depositos_oc_param };
        }

        if (tiene_parqueadero_op_param !== undefined && tiene_parqueadero_op_param !== null && tiene_parqueadero_op_param !== '') {
            if (tiene_parqueadero_op_param == 1 || tiene_parqueadero_op_param === 'true') {
                organizacionParqueaderoWhere.Cantidad = { [Op.gt]: 0 };
            } else {
                organizacionParqueaderoWhere.Cantidad = 0; // O no incluir el JOIN si es para 0 parqueaderos
            }
        }
        addCondition(organizacionParqueaderoWhere, 'Tipo_parqueadero', tipo_parqueadero_param);
        if (parqueadero_cubierto_param !== undefined && parqueadero_cubierto_param !== null && parqueadero_cubierto_param !== '') {
            organizacionParqueaderoWhere.Cubierto = (parqueadero_cubierto_param == 1 || parqueadero_cubierto_param === 'true');
        }
        if (parqueadero_disponible_param !== undefined && parqueadero_disponible_param !== null && parqueadero_disponible_param !== '') {
            organizacionParqueaderoWhere.Disponible = (parqueadero_disponible_param == 1 || parqueadero_disponible_param === 'true');
        }


        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: TipoEdificacion,
                    as: 'TipoEdificacion',
                    required: Object.keys(tipoEdificacionWhere).length > 0,
                    where: tipoEdificacionWhere
                },
                {
                    model: Division,
                    as: 'Division', // Asegúrate de que este alias coincida
                    required: Object.keys(divisionWhere).length > 0,
                    where: divisionWhere
                },
                {
                    model: OtrasCaracteristicas,
                    as: 'OtrasCaracteristicas', // Asegúrate de que este alias coincida
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
        console.error('Error al obtener inmuebles con filtros G1 y G5:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getInmueblesG2G3(req, res) {
    try {
        const {
            // Filtros del Grupo 2 (Ubicación Geográfica)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km, // Radio en kilómetros para búsqueda por cercanía

            // Filtros del Grupo 3 (Características de la Edificación/Conjunto)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si // 'true' o 'false'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const direccionWhere = {};
        const localizacionWhere = {};
        const bccvWhere = {};
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const acercaEdificacionWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 2 ---
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'barrio':
                    bccvWhere.Barrio_FK = ubicacion_especifica_id;
                    break;
                case 'ciudad':
                    bccvWhere.Ciudad_FK = ubicacion_especifica_id;
                    break;
                case 'corregimiento':
                    bccvWhere.Corregimiento_FK = ubicacion_especifica_id;
                    break;
                case 'vereda':
                    bccvWhere.Vereda_Fk = ubicacion_especifica_id;
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            direccionWhere.Tipo_via = tipo_via;
            direccionWhere.Numero_via_principal = numero_via_principal;
            direccionWhere.Numero_calle_transversal = numero_calle_transversal;
            direccionWhere.Numero_edificacion = numero_edificacion;
        }

        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // --- Filtros del Grupo 3 ---
        addCondition(acercaEdificacionWhere, 'Estrato', estrato);
        addCondition(acercaEdificacionWhere, 'Tipo_construccion', tipo_construccion);
        addCondition(acercaEdificacionWhere, 'Estado_conservacion', estado_conservacion);

        if (anio_construccion_min || anio_construccion_max) {
            acercaEdificacionWhere.Anio_construccion = {
                ...(anio_construccion_min && { [Op.gte]: anio_construccion_min }),
                ...(anio_construccion_max && { [Op.lte]: anio_construccion_max })
            };
        }

        if (zona_comun_si !== undefined && zona_comun_si !== null && zona_comun_si !== '') {
            acercaEdificacionWhere.Zona_comun = (zona_comun_si == 1 || zona_comun_si === 'true') ? 'Sí' : 'No';
        }

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            attributes: [
                'Inmueble_id',
                // Incluye otros atributos necesarios de Inmueble
                [
                    Inmueble.sequelize.literal(`
                        CASE
                            WHEN ${latitud_centro ? latitud_centro : 'NULL'} IS NOT NULL
                            AND ${longitud_centro ? longitud_centro : 'NULL'} IS NOT NULL
                            AND \`Direccion->Localizacion\`.\`Latitud\` IS NOT NULL
                            AND \`Direccion->Localizacion\`.\`Longitud\` IS NOT NULL THEN
                                6371 * acos(
                                    cos(radians(${latitud_centro ? latitud_centro : 'NULL'})) * cos(radians(\`Direccion->Localizacion\`.\`Latitud\`)) * cos(radians(\`Direccion->Localizacion\`.\`Longitud\`) - radians(${longitud_centro ? longitud_centro : 'NULL'}))
                                    + sin(radians(${latitud_centro ? latitud_centro : 'NULL'})) * sin(radians(\`Direccion->Localizacion\`.\`Latitud\`))
                                )
                            ELSE NULL
                        END
                    `),
                    'distancia_km'
                ]
            ],
            include: [
                {
                    model: Direccion,
                    as: 'Direccion',
                    required: Object.keys(direccionWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
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
                            required: Object.keys(localizacionWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                            where: localizacionWhere
                        },
                        {
                            model: BarrioCiudadCorregimientoVereda,
                            as: 'BarrioCiudadCorregimientoVereda',
                            required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                            where: bccvWhere,
                            include: [
                                { model: Barrio, as: 'Barrio', attributes: ['Nombre_barrio'] },
                                { model: Ciudad, as: 'Ciudad', attributes: ['Ciudad'] },
                                { model: Corregimiento, as: 'Corregimiento', attributes: ['Corregimiento'] },
                                { model: Vereda, as: 'Vereda', attributes: ['Vereda_nombre'] },
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
                    model: AcercaEdificacion,
                    as: 'AcercaEdificacion', // Asegúrate de que el alias coincida
                    required: Object.keys(acercaEdificacionWhere).length > 0,
                    where: acercaEdificacionWhere
                }
            ]
        });

        // Filtrado por distancia después de la consulta si se especificó radio_km
        let finalResults = filteredInmuebles;
        if (latitud_centro && longitud_centro && radio_km) {
            finalResults = filteredInmuebles.filter(inmueble => {
                const distancia = inmueble.dataValues.distancia_km;
                return distancia !== null && distancia <= parseFloat(radio_km);
            });
        }

        res.json(finalResults);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros G2 y G3:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getInmueblesG2G4(req, res) {
    try {
        const {
            // Filtros del Grupo 2 (Ubicación Geográfica)
            ndap_id,
            municipio_id,
            ubicacion_especifica_id,
            tipo_ubicacion, // 'barrio', 'ciudad', 'corregimiento', 'vereda'
            tipo_via,
            numero_via_principal,
            numero_calle_transversal,
            numero_edificacion,
            designador_cardinal_id,
            latitud_centro,
            longitud_centro,
            radio_km, // Radio en kilómetros para búsqueda por cercanía

            // Filtros del Grupo 4 ("Quién Publica")
            platform_user_id,
            tipo_anunciante // 'Agente', 'Propietario', 'Constructora'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const direccionWhere = {};
        const localizacionWhere = {};
        const bccvWhere = {};
        const municipioWhere = {};
        const ndapWhere = {};
        const designadorCardinalWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};

        // Función auxiliar para añadir condiciones
        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // --- Filtros del Grupo 2 ---
        addCondition(ndapWhere, 'Ndap_id', ndap_id);
        addCondition(municipioWhere, 'Municipio_id', municipio_id);

        if (ubicacion_especifica_id && tipo_ubicacion) {
            switch (tipo_ubicacion) {
                case 'barrio':
                    bccvWhere.Barrio_FK = ubicacion_especifica_id;
                    break;
                case 'ciudad':
                    bccvWhere.Ciudad_FK = ubicacion_especifica_id;
                    break;
                case 'corregimiento':
                    bccvWhere.Corregimiento_FK = ubicacion_especifica_id;
                    break;
                case 'vereda':
                    bccvWhere.Vereda_Fk = ubicacion_especifica_id;
                    break;
            }
        }

        if (tipo_via && numero_via_principal && numero_calle_transversal && numero_edificacion) {
            direccionWhere.Tipo_via = tipo_via;
            direccionWhere.Numero_via_principal = numero_via_principal;
            direccionWhere.Numero_calle_transversal = numero_calle_transversal;
            direccionWhere.Numero_edificacion = numero_edificacion;
        }

        addCondition(designadorCardinalWhere, 'Designador_cardinal_id', designador_cardinal_id);

        // --- Filtros del Grupo 4 ---
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            attributes: [
                'Inmueble_id',
                // Incluye otros atributos necesarios de Inmueble
                [
                    Inmueble.sequelize.literal(`
                        CASE
                            WHEN ${latitud_centro ? latitud_centro : 'NULL'} IS NOT NULL
                            AND ${longitud_centro ? longitud_centro : 'NULL'} IS NOT NULL
                            AND \`Direccion->Localizacion\`.\`Latitud\` IS NOT NULL
                            AND \`Direccion->Localizacion\`.\`Longitud\` IS NOT NULL THEN
                                6371 * acos(
                                    cos(radians(${latitud_centro ? latitud_centro : 'NULL'})) * cos(radians(\`Direccion->Localizacion\`.\`Latitud\`)) * cos(radians(\`Direccion->Localizacion\`.\`Longitud\`) - radians(${longitud_centro ? longitud_centro : 'NULL'}))
                                    + sin(radians(${latitud_centro ? latitud_centro : 'NULL'})) * sin(radians(\`Direccion->Localizacion\`.\`Latitud\`))
                                )
                            ELSE NULL
                        END
                    `),
                    'distancia_km'
                ]
            ],
            include: [
                {
                    model: Direccion,
                    as: 'Direccion',
                    required: Object.keys(direccionWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(designadorCardinalWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                    where: direccionWhere,
                    include: [
                        {
                            model: Localizacion,
                            as: 'Localizacion',
                            required: Object.keys(localizacionWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                            where: localizacionWhere
                        },
                        {
                            model: BarrioCiudadCorregimientoVereda,
                            as: 'BarrioCiudadCorregimientoVereda',
                            required: Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                            where: bccvWhere,
                            include: [
                                { model: Barrio, as: 'Barrio', attributes: ['Nombre_barrio'] },
                                { model: Ciudad, as: 'Ciudad', attributes: ['Ciudad'] },
                                { model: Corregimiento, as: 'Corregimiento', attributes: ['Corregimiento'] },
                                { model: Vereda, as: 'Vereda', attributes: ['Vereda_nombre'] },
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
            ]
        });

        // Filtrado por distancia después de la consulta si se especificó radio_km
        let finalResults = filteredInmuebles;
        if (latitud_centro && longitud_centro && radio_km) {
            finalResults = filteredInmuebles.filter(inmueble => {
                const distancia = inmueble.dataValues.distancia_km;
                return distancia !== null && distancia <= parseFloat(radio_km);
            });
        }

        res.json(finalResults);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros G2 y G4:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesG2G5(req, res) {
    try {
        const {
            // Filtros de Grupo 2 (Ubicación Geográfica)
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

            // Filtros de Grupo 5 (Características de la División / Espacios Internos)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si,
            terraza_mayor_cero,
            num_terrazas,
            garaje_mayor_cero,
            num_garajes,
            ascensores_si,
            min_closets,
            num_closets,
            estudio_si,
            sala_si,
            comedor_si,
            zona_lavanderia_si,
            deposito_division_si,
            lavanderia_oc_si,
            gas_oc_si,
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si,
            amoblado_si,
            deposito_oc_mayor_cero,
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero,
            tipo_parqueadero,
            parqueadero_cubierto_si,
            parqueadero_disponible_si
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const direccionWhere = {};
        const localizacionWhere = {};
        const bccvWhere = {}; // Barrio_ciudad_corregimiento_vereda
        const municipioWhere = {};
        const ndapWhere = {};
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Grupo 2 (Ubicación Geográfica)
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
        addCondition(direccionWhere, 'Designador_cardinal_FK', designador_cardinal_id);

        // =========================================================
        // Filtros de Grupo 5 (Características de la División / Espacios Internos)
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

        const includeAssociations = [
            {
                model: Direccion,
                as: 'Direccion',
                required: Object.keys(direccionWhere).length > 0 || Object.keys(localizacionWhere).length > 0 || Object.keys(bccvWhere).length > 0 || Object.keys(municipioWhere).length > 0 || Object.keys(ndapWhere).length > 0,
                where: direccionWhere,
                include: [
                    {
                        model: Localizacion,
                        as: 'Localizacion',
                        required: Object.keys(localizacionWhere).length > 0 || (latitud_centro && longitud_centro && radio_km),
                        where: localizacionWhere
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
            }
        ];

        let filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: includeAssociations
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
        }

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles filtrados por ubicación y detalles internos:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesG3G4(req, res) {
    try {
        const {
            // Filtros de Grupo 3 (Características de la Edificación/Conjunto)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Grupo 4 ("Quién Publica")
            platform_user_id,
            tipo_anunciante // 'natural', 'juridico'
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const acercaEdificacionWhere = {};
        const platformUserWhere = {};
        const platformProfileWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Grupo 3 (Características de la Edificación/Conjunto)
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
        if (zona_comun_si === 'false') acercaEdificacionWhere.Zona_comun = 0; // O si quieres permitir 'No'

        // =========================================================
        // Filtros de Grupo 4 ("Quién Publica")
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // Construir la consulta Sequelize
        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: AcercaEdificacion,
                    as: 'AcercaEdificacion', // Asegúrate de que este alias coincida con la asociación en tu modelo Inmueble
                    required: Object.keys(acercaEdificacionWhere).length > 0,
                    where: acercaEdificacionWhere
                },
                {
                    model: PlatformUser,
                    as: 'PlatformUser', // Alias
                    required: Object.keys(platformUserWhere).length > 0 || Object.keys(platformProfileWhere).length > 0,
                    where: platformUserWhere,
                    include: [
                        {
                            model: PlatformProfile,
                            as: 'PlatformProfile', // Alias
                            required: Object.keys(platformProfileWhere).length > 0,
                            where: platformProfileWhere
                        }
                    ]
                }
            ]
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles filtrados por características de edificación y publicador:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesG3G5(req, res) {
    try {
        const {
            // Filtros de Grupo 3 (Características de la Edificación/Conjunto)
            estrato,
            tipo_construccion,
            anio_construccion_min,
            anio_construccion_max,
            estado_conservacion,
            zona_comun_si, // 'true' o 'false'

            // Filtros de Grupo 5 (Características de la División / Espacios Internos)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si,
            terraza_mayor_cero,
            num_terrazas,
            garaje_mayor_cero,
            num_garajes,
            ascensores_si,
            min_closets,
            num_closets,
            estudio_si,
            sala_si,
            comedor_si,
            zona_lavanderia_si,
            deposito_division_si,
            lavanderia_oc_si,
            gas_oc_si,
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si,
            amoblado_si,
            deposito_oc_mayor_cero,
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero,
            tipo_parqueadero,
            parqueadero_cubierto_si,
            parqueadero_disponible_si
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const acercaEdificacionWhere = {};
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Grupo 3 (Características de la Edificación/Conjunto)
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
        // Filtros de Grupo 5 (Características de la División / Espacios Internos)
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


        // Construir la consulta Sequelize
        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: AcercaEdificacion,
                    as: 'AcercaEdificacion', // Asegúrate de que este alias coincida con la asociación en tu modelo Inmueble
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
                }
            ]
        });

        res.json(filteredInmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles filtrados por características de edificación y detalles internos:', error);
        res.status(500).json({ error: error.message });
    }
}

export async function getFilteredInmueblesG4G5(req, res) {
    try {
        const {
            // Filtros de Grupo 4 ("Quién Publica")
            platform_user_id,
            tipo_anunciante, // 'natural', 'juridico'

            // Filtros de Grupo 5 (Características de la División / Espacios Internos)
            num_habitaciones,
            min_habitaciones,
            max_habitaciones,
            num_baños,
            min_baños,
            max_baños,
            tipo_cocina,
            balcon_si,
            terraza_mayor_cero,
            num_terrazas,
            garaje_mayor_cero,
            num_garajes,
            ascensores_si,
            min_closets,
            num_closets,
            estudio_si,
            sala_si,
            comedor_si,
            zona_lavanderia_si,
            deposito_division_si,
            lavanderia_oc_si,
            gas_oc_si,
            numero_piso,
            min_piso,
            max_piso,
            mascotas_permitidas_si,
            amoblado_si,
            deposito_oc_mayor_cero,
            num_depositos_oc,
            cantidad_parqueaderos_mayor_cero,
            tipo_parqueadero,
            parqueadero_cubierto_si,
            parqueadero_disponible_si
        } = req.query;

        const whereConditions = { Estado: 'disponible' };
        const platformUserWhere = {};
        const platformProfileWhere = {};
        const divisionWhere = {};
        const otrasCaracteristicasWhere = {};
        const organizacionParqueaderoWhere = {};

        const addCondition = (targetWhere, key, value) => {
            if (value !== undefined && value !== null && value !== '') {
                targetWhere[key] = value;
            }
        };

        // =========================================================
        // Filtros de Grupo 4 ("Quién Publica")
        // =========================================================
        addCondition(platformUserWhere, 'Platform_user_id', platform_user_id);
        addCondition(platformProfileWhere, 'Profile_type', tipo_anunciante);

        // =========================================================
        // Filtros de Grupo 5 (Características de la División / Espacios Internos)
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

        // Construir la consulta Sequelize
        const filteredInmuebles = await Inmueble.findAll({
            where: whereConditions,
            include: [
                {
                    model: PlatformUser,
                    as: 'PlatformUser', // Asegúrate de que este alias coincida con la asociación en tu modelo Inmueble
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
        console.error('Error al obtener inmuebles filtrados por publicador y detalles internos:', error);
        res.status(500).json({ error: error.message });
    }
}