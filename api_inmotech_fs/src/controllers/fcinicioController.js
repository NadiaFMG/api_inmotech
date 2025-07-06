const db = require('../models');
const { Op, sequelize } = require('sequelize');

// Asegúrate de que todos los modelos necesarios estén disponibles
// Nombres de las variables deben coincidir con los nombres de tus modelos en db (ej. db.Inmueble)
const Inmueble = db.Inmueble;
const TipoInmueble = db.TipoInmueble;
const AcercaEdificacion = db.AcercaEdificacion;
const Division = db.Division;
const Direccion = db.Direccion;
const BarrioCiudadCorregimientoVereda = db.BarrioCiudadCorregimientoVereda;
const Barrio = db.Barrio;
const Ciudad = db.Ciudad;
const Corregimiento = db.Corregimiento; // Agregado si lo usas en el filtro de ubicación
const Vereda = db.Vereda;               // Agregado si lo usas en el filtro de ubicación
const ImagenesInmueble = db.ImagenesInmueble;
const EstadoInmueble = db.EstadoInmueble;
const Localizacion = db.Localizacion; // Agregado para filtros de latitud/longitud


const InmuebleController = {

    // Función para obtener las 6 propiedades destacadas (estática para la página de Inicio)
    async getFeaturedInmuebles(req, res) {
        try {
            const estadoDisponible = await EstadoInmueble.findOne({
                where: { Estado: 'Disponible' }
            });

            if (!estadoDisponible) {
                return res.status(404).json({ message: 'Estado "Disponible" no encontrado en la base de datos.' });
            }

            const inmuebles = await Inmueble.findAll({
                attributes: [
                    'Inmueble_id',
                    'Precio',
                    ['Descripcion', 'DescripcionInmueble'],
                    'Created_at'
                ],
                where: {
                    Estado_inmueble_FK: estadoDisponible.Estado_inmueble_id
                },
                include: [
                    {
                        model: TipoInmueble,
                        as: 'tipoInmueble', // Verifica que este alias coincida con tus asociaciones
                        attributes: [['Tipo_Inmueble', 'Tipo']]
                    },
                    {
                        model: AcercaEdificacion,
                        as: 'acercaEdificacion', // Verifica que este alias coincida con tus asociaciones
                        attributes: [['AcercaDeLaEdificacion', 'TipoEdificacion']]
                    },
                    {
                        model: Division,
                        as: 'division', // Verifica que este alias coincida con tus asociaciones
                        attributes: ['Habitaciones', 'Baños', 'Area']
                    },
                    {
                        model: Direccion,
                        as: 'Direccion', // Verifica que este alias coincida con tus asociaciones
                        attributes: [
                            'Tipo_via',
                            'Numero_via_principal',
                            'Numero_calle_transversal',
                            'Numero_edificacion',
                            [
                                sequelize.literal(`CONCAT(Direccion.Tipo_via, ' ', Direccion.Numero_via_principal, '#', Direccion.Numero_calle_transversal, '-', Direccion.Numero_edificacion)`),
                                'DireccionCompleta'
                            ]
                        ],
                        include: [
                            {
                                model: BarrioCiudadCorregimientoVereda,
                                as: 'BarrioCiudadCorregimientoVereda', // Verifica que este alias coincida
                                attributes: [],
                                include: [
                                    {
                                        model: Barrio,
                                        as: 'Barrio', // Verifica que este alias coincida
                                        attributes: [['Nombre_barrio', 'Barrio']]
                                    },
                                    {
                                        model: Ciudad,
                                        as: 'Ciudad', // Verifica que este alias coincida
                                        attributes: [['Ciudad', 'Ciudad']]
                                    }
                                ],
                                required: false // LEFT JOIN
                            }
                        ],
                        required: true // INNER JOIN
                    },
                    {
                        model: ImagenesInmueble,
                        as: 'imagenesInmuebles', // Verifica que este alias coincida (ej. puede ser plural)
                        attributes: ['URL'],
                        limit: 1, // Limita a 1 imagen por inmueble
                        required: false // LEFT JOIN
                    }
                ],
                order: [['Created_at', 'DESC']],
                limit: 6
            });

            const formattedInmuebles = inmuebles.map(inmueble => {
                const plainInmueble = inmueble.get({ plain: true });
                return {
                    ...plainInmueble,
                    ImagenPrincipal: plainInmueble.imagenesInmuebles && plainInmueble.imagenesInmuebles.length > 0
                        ? plainInmueble.imagenesInmuebles[0].URL
                        : null,
                    imagenesInmuebles: undefined // Eliminar la propiedad original del array
                };
            });

            if (formattedInmuebles.length === 0) {
                return res.status(404).json({ message: 'No se encontraron inmuebles destacados disponibles.' });
            }

            res.status(200).json(formattedInmuebles);

        } catch (error) {
            console.error('Error al obtener inmuebles destacados:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener inmuebles destacados.', error: error.message });
        }
    },

    // Función para obtener inmuebles con filtros dinámicos (para la página de Búsqueda)
    async getFilteredInmueblesFull(req, res) {
        try {
            const {
                motivo_transaccion, min_precio, max_precio, min_area_total, max_area_total,
                antiguedad, estado_inmueble, codigo_interno,
                tipo_edificacion_categoria,
                tipo_construccion, material_predominante, niveles_construidos,
                min_habitaciones, max_habitaciones, min_banos, max_banos,
                garaje, terraza, balcon, ascensores, estudio, sala, comedor, cocina, zona_lavanderia, deposito,
                tipo_via, numero_via_principal, numero_calle_transversal, numero_edificacion,
                nombre_barrio, nombre_ciudad, nombre_corregimiento, nombre_vereda,
                latitud, longitud, radio_km,
                page = 1, limit = 10,
                order_by = 'Created_at', order_direction = 'DESC' // Parámetros de ordenación
            } = req.query;

            let findOptions = {
                attributes: [ // Atributos completos para cada inmueble
                    'Inmueble_id',
                    'Precio',
                    ['Descripcion', 'DescripcionInmueble'],
                    'Created_at'
                ],
                where: {}, // Las condiciones WHERE se construirán aquí
                include: [
                    {
                        model: TipoInmueble,
                        as: 'tipoInmueble',
                        attributes: [['Tipo_Inmueble', 'Tipo']],
                        where: {} // Condición para este include
                    },
                    {
                        model: AcercaEdificacion,
                        as: 'acercaEdificacion',
                        attributes: [['AcercaDeLaEdificacion', 'TipoEdificacion'], 'Estrato', 'Tipo_construccion', 'Anio_construccion', 'Estado_conservacion', 'Zona_comun'],
                        where: {}
                    },
                    {
                        model: Division,
                        as: 'division',
                        attributes: ['Habitaciones', 'Baños', 'Area', 'Terraza', 'Balcon', 'Garaje', 'Ascensores', 'Estudio', 'Sala', 'Comedor', 'Cocina', 'Zona_lavanderia', 'Deposito'],
                        where: {}
                    },
                    {
                        model: Direccion,
                        as: 'Direccion',
                        attributes: [
                            'Tipo_via',
                            'Numero_via_principal',
                            'Numero_calle_transversal',
                            'Numero_edificacion',
                            [
                                sequelize.literal(`CONCAT(Direccion.Tipo_via, ' ', Direccion.Numero_via_principal, '#', Direccion.Numero_calle_transversal, '-', Direccion.Numero_edificacion)`),
                                'DireccionCompleta'
                            ]
                        ],
                        include: [
                            {
                                model: BarrioCiudadCorregimientoVereda,
                                as: 'BarrioCiudadCorregimientoVereda',
                                attributes: [],
                                include: [
                                    { model: Barrio, as: 'Barrio', attributes: [['Nombre_barrio', 'Barrio']], where: {} },
                                    { model: Ciudad, as: 'Ciudad', attributes: [['Ciudad', 'Ciudad']], where: {} },
                                    { model: Corregimiento, as: 'Corregimiento', attributes: ['Corregimiento'], where: {} },
                                    { model: Vereda, as: 'Vereda', attributes: ['Vereda'], where: {} },
                                ],
                                required: false // LEFT JOIN
                            },
                            { model: Localizacion, as: 'Localizacion', attributes: ['Latitud', 'Longitud'], where: {} }
                        ],
                        required: true // INNER JOIN
                    },
                    {
                        model: ImagenesInmueble,
                        as: 'imagenesInmuebles',
                        attributes: ['URL'],
                        required: false // LEFT JOIN para obtener todas las imágenes asociadas
                    }
                    // Puedes añadir otros includes si son necesarios para más filtros o datos
                ],
                distinct: true // Asegura que cada inmueble se cuente solo una vez si tiene múltiples asociaciones (ej. imágenes)
            };

            // 1. Filtro por Estado_inmueble (siempre 'Disponible' por defecto, o según el usuario)
            const estadoDisponible = await EstadoInmueble.findOne({
                where: { Estado: 'Disponible' }
            });
            if (!estadoDisponible) {
                return res.status(404).json({ message: 'Estado "Disponible" no encontrado en la base de datos.' });
            }
            findOptions.where.Estado_inmueble_FK = estadoDisponible.Estado_inmueble_id;

            // Si el usuario especifica otro estado, prevalece
            if (estado_inmueble && estado_inmueble !== 'Disponible') {
                const estadoUsuario = await EstadoInmueble.findOne({ where: { Estado: estado_inmueble } });
                if (estadoUsuario) {
                    findOptions.where.Estado_inmueble_FK = estadoUsuario.Estado_inmueble_id;
                }
            }

            // 2. Lógica para construir dinámicamente las condiciones en 'where' y en los 'include.where'
            // Filtros de Inmueble (tabla principal)
            if (motivo_transaccion) findOptions.where.Motivo_transaccion_FK = motivo_transaccion; // Asumiendo que Motivo_transaccion_FK existe y es un ID
            if (min_precio) findOptions.where.Precio = { [Op.gte]: parseFloat(min_precio) };
            if (max_precio) findOptions.where.Precio = { ...findOptions.where.Precio, [Op.lte]: parseFloat(max_precio) };
            if (codigo_interno) findOptions.where.Codigo_interno = { [Op.like]: `%${codigo_interno}%` };


            // Filtros de TipoInmueble
            if (req.query.tipo_inmueble) { // Usamos req.query para evitar conflicto con la variable 'Tipo' que ya renombramos
                findOptions.include[0].where.Tipo_Inmueble = { [Op.like]: `%${req.query.tipo_inmueble}%` };
            }

            // Filtros de AcercaEdificacion
            if (tipo_edificacion_categoria) findOptions.include[1].where.AcercaDeLaEdificacion = { [Op.like]: `%${tipo_edificacion_categoria}%` };
            if (tipo_construccion) findOptions.include[1].where.Tipo_construccion = { [Op.like]: `%${tipo_construccion}%` };
            if (antiguedad) {
                // Lógica para 'antiguedad' puede ser compleja (ej. 'nuevo', 'usado', rango de años)
                // Esto es un ejemplo, podrías necesitar una lógica más elaborada
                const currentYear = new Date().getFullYear();
                if (antiguedad === 'nuevo') {
                    findOptions.include[1].where.Anio_construccion = { [Op.gte]: currentYear - 5 }; // Ej: 5 años o menos
                } else if (antiguedad === 'usado') {
                    findOptions.include[1].where.Anio_construccion = { [Op.lt]: currentYear - 5 }; // Ej: Más de 5 años
                } else if (!isNaN(parseInt(antiguedad))) {
                    findOptions.include[1].where.Anio_construccion = parseInt(antiguedad); // Año específico
                }
            }


            // Filtros de Division
            if (min_habitaciones) findOptions.include[2].where.Habitaciones = { [Op.gte]: parseInt(min_habitaciones) };
            if (max_habitaciones) findOptions.include[2].where.Habitaciones = { ...findOptions.include[2].where.Habitaciones, [Op.lte]: parseInt(max_habitaciones) };
            if (min_banos) findOptions.include[2].where.Baños = { [Op.gte]: parseInt(min_banos) };
            if (max_banos) findOptions.include[2].where.Baños = { ...findOptions.include[2].where.Baños, [Op.lte]: parseInt(max_banos) };
            if (min_area_total) findOptions.include[2].where.Area = { [Op.gte]: parseFloat(min_area_total) };
            if (max_area_total) findOptions.include[2].where.Area = { ...findOptions.include[2].where.Area, [Op.lte]: parseFloat(max_area_total) };

            // Comodidades (asumiendo que son booleanos o existen en Division)
            const comodidades = ['garaje', 'terraza', 'balcon', 'ascensores', 'estudio', 'sala', 'comedor', 'cocina', 'zona_lavanderia', 'deposito'];
            comodidades.forEach(comodidad => {
                if (req.query[comodidad] === 'true') { // Solo si el parámetro existe y es 'true'
                    findOptions.include[2].where[comodidad.charAt(0).toUpperCase() + comodidad.slice(1)] = true; // Capitaliza la primera letra para coincidir con el nombre de columna si es el caso
                }
            });


            // Filtros de Ubicación (Direccion, Barrio, Ciudad, etc.)
            if (nombre_barrio) findOptions.include[3].include[0].include[0].where.Nombre_barrio = { [Op.like]: `%${nombre_barrio}%` };
            if (nombre_ciudad) findOptions.include[3].include[0].include[1].where.Ciudad = { [Op.like]: `%${nombre_ciudad}%` };
            if (nombre_corregimiento) findOptions.include[3].include[0].include[2].where.Corregimiento = { [Op.like]: `%${nombre_corregimiento}%` };
            if (nombre_vereda) findOptions.include[3].include[0].include[3].where.Vereda = { [Op.like]: `%${nombre_vereda}%` };

            if (tipo_via) findOptions.include[3].where.Tipo_via = { [Op.like]: `%${tipo_via}%` };
            // Puedes añadir más filtros para numero_via_principal, etc. si son necesarios.


            // Búsqueda por Proximidad (latitud, longitud, radio_km)
            if (latitud && longitud && radio_km) {
                const centerLat = parseFloat(latitud);
                const centerLon = parseFloat(longitud);
                const radius = parseFloat(radio_km);

                // Asegúrate que 'Localizacion' es parte del include de Direccion y tiene su alias 'Localizacion'
                // Calcula la distancia usando la fórmula de Haversine
                findOptions.attributes.include = [
                    [
                        sequelize.literal(`
                            6371 * acos(
                                cos(radians(${centerLat})) * cos(radians("Direccion->Localizacion"."Latitud")) *
                                cos(radians("Direccion->Localizacion"."Longitud") - radians(${centerLon})) +
                                sin(radians(${centerLat})) * sin(radians("Direccion->Localizacion"."Latitud"))
                            )
                        `),
                        'distancia_km'
                    ]
                ];
                findOptions.having = sequelize.literal(`distancia_km <= ${radius}`);
                findOptions.order = [[sequelize.literal('distancia_km'), 'ASC']];
            }


            // Paginación
            const offset = (parseInt(page) - 1) * parseInt(limit);
            findOptions.offset = offset;
            findOptions.limit = parseInt(limit);

            // Ordenación dinámica
            // Asegúrate que 'order_by' sea una columna válida en Inmueble o sus includes
            let orderByColumn = order_by;
            // Aquí puedes mapear order_by a la columna real si es un alias
            if (order_by === 'Precio') orderByColumn = 'Precio'; // Ejemplo, si quieres ordenar por el Precio de Inmueble

            findOptions.order = [[orderByColumn, order_direction.toUpperCase()]];

            // Realizar la consulta a la base de datos
            const { count, rows: inmuebles } = await Inmueble.findAndCountAll(findOptions); // Usar findAndCountAll para obtener el total para paginación

            // Post-procesamiento para formatear la respuesta
            const formattedInmuebles = inmuebles.map(inmueble => {
                const plainInmueble = inmueble.get({ plain: true });

                return {
                    ...plainInmueble,
                    // Extraer URLs de todas las imágenes en un array
                    ImagenesURLs: plainInmueble.imagenesInmuebles
                        ? plainInmueble.imagenesInmuebles.map(img => img.URL)
                        : [],
                    imagenesInmuebles: undefined // Eliminar la propiedad original del array si no la necesitas
                };
            });

            if (formattedInmuebles.length === 0) {
                return res.status(404).json({ message: 'No se encontraron inmuebles con los criterios de búsqueda especificados.' });
            }

            res.status(200).json({
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                inmuebles: formattedInmuebles
            });

        } catch (error) {
            console.error('Error al obtener inmuebles con filtros completos:', error);
            res.status(500).json({ message: 'Error interno del servidor al obtener inmuebles con filtros completos.', error: error.message });
        }
    }
};

module.exports = InmuebleController;