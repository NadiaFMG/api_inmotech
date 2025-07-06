// SELECT
//     I.Inmueble_id,
//     I.Precio,
//     I.Descripcion AS DescripcionInmueble,
//     TI.Tipo_Inmueble AS Tipo,
//     AE.AcercaDeLaEdificacion AS TipoEdificacion,
//     AE.Estrato,
//     AE.Tipo_construccion,
//     AE.Anio_construccion,
//     AE.Estado_conservacion,
//     AE.Zona_comun,
//     D.Habitaciones,
//     D.Baños,
//     D.Terraza,
//     D.Balcon,
//     D.Garaje,
//     D.Ascensores,
//     D.Area,
//     D.Closets,
//     D.Estudio,
//     D.Sala,
//     D.Comedor,
//     D.Cocina,
//     D.Zona_lavanderia,
//     D.Deposito,
//     CONCAT(Di.Tipo_via, ' ', Di.Numero_via_principal, '#', Di.Numero_calle_transversal, '-', Di.Numero_edificacion) AS DireccionCompleta,
//     B.Nombre_barrio AS Barrio,
//     C.Ciudad AS Ciudad,
//     GROUP_CONCAT(II.URL) AS ImagenesURLs
// FROM Inmueble AS I
// JOIN Tipo_inmueble AS TI ON I.Tipo_inmueble_FK = TI.Tipo_inmueble_id
// JOIN acerca_edificacion AS AE ON I.Acerca_edificacion_FK = AE.Acerca_edificacion_id
// JOIN division AS D ON I.Division_FK = D.Division_id
// JOIN direccion AS Di ON I.Direccion_FK = Di.Direccion_id
// LEFT JOIN barrio_ciudad_corregimiento_vereda AS BCCV ON Di.Barrio_ciudad_corregimiento_vereda_FK = BCCV.Barrio_ciudad_corregimiento_vereda_id
// LEFT JOIN barrio AS B ON BCCV.Barrio_FK = B.Barrio_id
// LEFT JOIN ciudad AS C ON BCCV.Ciudad_FK = C.Ciudad_id
// LEFT JOIN imagenes_inmueble AS II ON I.Inmueble_id = II.Inmueble_FK
// WHERE I.Estado_inmueble_FK = (SELECT Estado_inmueble_id FROM Estado_inmueble WHERE Estado = 'Disponible')
// GROUP BY I.Inmueble_id
// ORDER BY I.Created_at DESC
// -- Para paginación:
// -- LIMIT [cantidad_por_pagina] OFFSET [numero_de_pagina - 1] * [cantidad_por_pagina]
// -- Para filtros:
// -- AND TI.Tipo_Inmueble = 'Apartamento'
// -- AND C.Ciudad = 'Bogotá'
// -- AND I.Precio BETWEEN 100000 AND 500000
// ;

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
const Corregimiento = db.Corregimiento; // Agregado si lo usas para filtros de ubicación
const Vereda = db.Vereda;               // Agregado si lo usas para filtros de ubicación
const ImagenesInmueble = db.ImagenesInmueble;
const EstadoInmueble = db.EstadoInmueble;
const Localizacion = db.Localizacion; // Agregado para filtros de latitud/longitud


const InmuebleController = {

    // (Aquí iría tu función getFeaturedInmuebles si la tienes en el mismo archivo,
    //  ya que el usuario pidió el controlador dinámico específicamente)

    async getFilteredInmueblesFull(req, res) {
        try {
            // Desestructuración de parámetros de la URL (req.query)
            const {
                motivo_transaccion, min_precio, max_precio, min_area_total, max_area_total,
                antiguedad, estado_inmueble, codigo_interno,
                tipo_inmueble, // <-- Añadido según tu SQL 'TI.Tipo_Inmueble'
                tipo_edificacion_categoria,
                tipo_construccion, material_predominante, niveles_construidos, // Niveles construidos no estaba en SQL pero si en tu anterior destructuring
                min_habitaciones, max_habitaciones, min_banos, max_banos,
                garaje, terraza, balcon, ascensores, estudio, sala, comedor, cocina, zona_lavanderia, deposito,
                tipo_via, numero_via_principal, numero_calle_transversal, numero_edificacion,
                nombre_barrio, nombre_ciudad, nombre_corregimiento, nombre_vereda,
                latitud, longitud, radio_km, // para búsqueda por radio
                page = 1, limit = 10, // Paginación: Default 10 inmuebles por página
                order_by = 'Created_at', order_direction = 'DESC' // Ordenamiento por defecto: más recientes primero
            } = req.query;

            let findOptions = {
                attributes: [ // Selección de atributos de la tabla Inmueble (I)
                    'Inmueble_id',
                    'Precio',
                    ['Descripcion', 'DescripcionInmueble'], // I.Descripcion AS DescripcionInmueble
                    'Created_at' // Para ordenamiento o visualización
                ],
                where: {}, // Aquí se construirán las condiciones WHERE
                include: [ // Definición de los JOINs
                    {   // JOIN Tipo_inmueble AS TI
                        model: TipoInmueble,
                        as: 'tipoInmueble', // Asegúrate que 'as' coincide con tu asociación en los modelos
                        attributes: [['Tipo_Inmueble', 'Tipo']], // TI.Tipo_Inmueble AS Tipo
                        required: true, // INNER JOIN
                        where: {} // Para filtros de Tipo_Inmueble
                    },
                    {   // JOIN acerca_edificacion AS AE
                        model: AcercaEdificacion,
                        as: 'acercaEdificacion', // Asegúrate que 'as' coincide con tu asociación
                        attributes: [ // Atributos de AE
                            ['AcercaDeLaEdificacion', 'TipoEdificacion'], // AE.AcercaDeLaEdificacion AS TipoEdificacion
                            'Estrato',
                            'Tipo_construccion',
                            'Anio_construccion',
                            'Estado_conservacion',
                            'Zona_comun'
                        ],
                        required: true, // INNER JOIN
                        where: {} // Para filtros de AcercaEdificacion
                    },
                    {   // JOIN division AS D
                        model: Division,
                        as: 'division', // Asegúrate que 'as' coincide con tu asociación
                        attributes: [ // Atributos de D
                            'Habitaciones', 'Baños', 'Terraza', 'Balcon', 'Garaje', 'Ascensores',
                            'Area', 'Closets', 'Estudio', 'Sala', 'Comedor', 'Cocina', 'Zona_lavanderia', 'Deposito'
                        ],
                        required: true, // INNER JOIN
                        where: {} // Para filtros de Division
                    },
                    {   // JOIN direccion AS Di
                        model: Direccion,
                        as: 'Direccion', // Asegúrate que 'as' coincide con tu asociación
                        attributes: [ // Atributos de Di
                            'Tipo_via',
                            'Numero_via_principal',
                            'Numero_calle_transversal',
                            'Numero_edificacion',
                            // CONCAT de dirección completa
                            [
                                sequelize.literal(`CONCAT("Direccion"."Tipo_via", ' ', "Direccion"."Numero_via_principal", '#', "Direccion"."Numero_calle_transversal", '-', "Direccion"."Numero_edificacion")`),
                                'DireccionCompleta'
                            ]
                        ],
                        required: true, // INNER JOIN
                        include: [
                            {   // LEFT JOIN barrio_ciudad_corregimiento_vereda AS BCCV
                                model: BarrioCiudadCorregimientoVereda,
                                as: 'BarrioCiudadCorregimientoVereda', // Asegúrate que 'as' coincide
                                attributes: [], // No necesitamos atributos directos de esta tabla intermedia
                                required: false, // LEFT JOIN
                                include: [
                                    {   // LEFT JOIN barrio AS B
                                        model: Barrio,
                                        as: 'Barrio', // Asegúrate que 'as' coincide
                                        attributes: [['Nombre_barrio', 'Barrio']], // B.Nombre_barrio AS Barrio
                                        where: {} // Para filtros de Barrio
                                    },
                                    {   // LEFT JOIN ciudad AS C
                                        model: Ciudad,
                                        as: 'Ciudad', // Asegúrate que 'as' coincide
                                        attributes: [['Ciudad', 'Ciudad']], // C.Ciudad AS Ciudad
                                        where: {} // Para filtros de Ciudad
                                    },
                                    { // LEFT JOIN corregimiento
                                        model: Corregimiento,
                                        as: 'Corregimiento',
                                        attributes: ['Corregimiento'],
                                        where: {}
                                    },
                                    { // LEFT JOIN vereda
                                        model: Vereda,
                                        as: 'Vereda',
                                        attributes: ['Vereda'],
                                        where: {}
                                    },
                                ]
                            },
                            {   // Para localización (si usas Latitud/Longitud para búsquedas de radio)
                                model: Localizacion,
                                as: 'Localizacion',
                                attributes: ['Latitud', 'Longitud'],
                                required: false // Puede ser LEFT JOIN si no todas tienen localización
                            }
                        ],
                        where: {} // Para filtros de Direccion
                    },
                    {   // LEFT JOIN imagenes_inmueble AS II
                        model: ImagenesInmueble,
                        as: 'imagenesInmuebles', // Asegúrate que 'as' coincida (suele ser plural)
                        attributes: ['URL'], // II.URL
                        required: false // LEFT JOIN (para propiedades sin imágenes)
                    }
                ],
                distinct: true // Para que el count funcione correctamente con LEFT JOINs múltiples y GROUP_CONCAT.
                              // Asegura que cada inmueble se cuente solo una vez.
            };

            // 1. Filtro por Estado_inmueble (siempre 'Disponible' por defecto)
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
            // Filtros de Inmueble (I)
            if (motivo_transaccion) findOptions.where.Motivo_transaccion_FK = motivo_transaccion; // Asumiendo que Motivo_transaccion_FK existe y es un ID
            if (min_precio) findOptions.where.Precio = { [Op.gte]: parseFloat(min_precio) };
            if (max_precio) findOptions.where.Precio = { ...findOptions.where.Precio, [Op.lte]: parseFloat(max_precio) };
            if (codigo_interno) findOptions.where.Codigo_interno = { [Op.like]: `%${codigo_interno}%` };


            // Filtros de TipoInmueble (TI)
            if (tipo_inmueble) {
                findOptions.include[0].where.Tipo_Inmueble = { [Op.like]: `%${tipo_inmueble}%` };
            }

            // Filtros de AcercaEdificacion (AE)
            if (tipo_edificacion_categoria) findOptions.include[1].where.AcercaDeLaEdificacion = { [Op.like]: `%${tipo_edificacion_categoria}%` };
            if (tipo_construccion) findOptions.include[1].where.Tipo_construccion = { [Op.like]: `%${tipo_construccion}%` };
            if (antiguedad) {
                const currentYear = new Date().getFullYear();
                if (antiguedad === 'nuevo') {
                    findOptions.include[1].where.Anio_construccion = { [Op.gte]: currentYear - 5 }; // Ej: 5 años o menos
                } else if (antiguedad === 'usado') {
                    findOptions.include[1].where.Anio_construccion = { [Op.lt]: currentYear - 5 }; // Ej: Más de 5 años
                } else if (!isNaN(parseInt(antiguedad))) {
                    findOptions.include[1].where.Anio_construccion = parseInt(antiguedad); // Año específico
                }
            }


            // Filtros de Division (D)
            if (min_habitaciones) findOptions.include[2].where.Habitaciones = { [Op.gte]: parseInt(min_habitaciones) };
            if (max_habitaciones) findOptions.include[2].where.Habitaciones = { ...findOptions.include[2].where.Habitaciones, [Op.lte]: parseInt(max_habitaciones) };
            if (min_banos) findOptions.include[2].where.Baños = { [Op.gte]: parseInt(min_banos) };
            if (max_banos) findOptions.include[2].where.Baños = { ...findOptions.include[2].where.Baños, [Op.lte]: parseInt(max_banos) };
            if (min_area_total) findOptions.include[2].where.Area = { [Op.gte]: parseFloat(min_area_total) };
            if (max_area_total) findOptions.include[2].where.Area = { ...findOptions.include[2].where.Area, [Op.lte]: parseFloat(max_area_total) };

            // Comodidades (asumiendo que son booleanos o existen en Division)
            const comodidades = ['garaje', 'terraza', 'balcon', 'ascensores', 'estudio', 'sala', 'comedor', 'cocina', 'zona_lavanderia', 'deposito'];
            comodidades.forEach(comodidad => {
                if (req.query[comodidad] === 'true') {
                    findOptions.include[2].where[comodidad.charAt(0).toUpperCase() + comodidad.slice(1)] = true;
                }
            });


            // Filtros de Ubicación (Di, B, C, Corregimiento, Vereda)
            if (nombre_barrio) findOptions.include[3].include[0].include[0].where.Nombre_barrio = { [Op.like]: `%${nombre_barrio}%` };
            if (nombre_ciudad) findOptions.include[3].include[0].include[1].where.Ciudad = { [Op.like]: `%${nombre_ciudad}%` };
            if (nombre_corregimiento) findOptions.include[3].include[0].include[2].where.Corregimiento = { [Op.like]: `%${nombre_corregimiento}%` };
            if (nombre_vereda) findOptions.include[3].include[0].include[3].where.Vereda = { [Op.like]: `%${nombre_vereda}%` };

            if (tipo_via) findOptions.include[3].where.Tipo_via = { [Op.like]: `%${tipo_via}%` };
            if (numero_via_principal) findOptions.include[3].where.Numero_via_principal = { [Op.like]: `%${numero_via_principal}%` };
            // Puedes añadir más filtros para Numero_calle_transversal, Numero_edificacion


            // Búsqueda por Proximidad (latitud, longitud, radio_km) - Si tienes el modelo Localizacion
            if (latitud && longitud && radio_km) {
                const centerLat = parseFloat(latitud);
                const centerLon = parseFloat(longitud);
                const radius = parseFloat(radio_km); // Radio en KM

                // Asegúrate que Localizacion está incluido bajo Direccion con el alias 'Localizacion'
                // Añadir la columna de distancia a los atributos
                findOptions.attributes.push([
                    sequelize.literal(`
                        6371 * acos(
                            cos(radians(${centerLat})) * cos(radians("Direccion->Localizacion"."Latitud")) *
                            cos(radians("Direccion->Localizacion"."Longitud") - radians(${centerLon})) +
                            sin(radians(${centerLat})) * sin(radians("Direccion->Localizacion"."Latitud"))
                        )
                    `),
                    'distancia_km'
                ]);
                // Condición para filtrar por la distancia
                findOptions.having = sequelize.literal(`distancia_km <= ${radius}`);
                // Ordenar por distancia
                findOptions.order = [[sequelize.literal('distancia_km'), 'ASC']];
            }


            // Paginación (LIMIT OFFSET)
            const offset = (parseInt(page) - 1) * parseInt(limit);
            findOptions.offset = offset;
            findOptions.limit = parseInt(limit);

            // Ordenamiento dinámico (ORDER BY)
            let orderCriteria = [];
            switch (order_by) {
                case 'Precio':
                    orderCriteria.push(['Precio', order_direction.toUpperCase()]);
                    break;
                case 'Area':
                    orderCriteria.push([{ model: Division, as: 'division' }, 'Area', order_direction.toUpperCase()]);
                    break;
                case 'Habitaciones':
                    orderCriteria.push([{ model: Division, as: 'division' }, 'Habitaciones', order_direction.toUpperCase()]);
                    break;
                case 'Baños':
                    orderCriteria.push([{ model: Division, as: 'division' }, 'Baños', order_direction.toUpperCase()]);
                    break;
                case 'Anio_construccion':
                    orderCriteria.push([{ model: AcercaEdificacion, as: 'acercaEdificacion' }, 'Anio_construccion', order_direction.toUpperCase()]);
                    break;
                case 'Created_at':
                default:
                    orderCriteria.push(['Created_at', order_direction.toUpperCase()]);
                    break;
            }
            findOptions.order = orderCriteria;

            // Realizar la consulta a la base de datos
            // Usamos findAndCountAll para obtener tanto los datos como el total para la paginación
            const { count, rows: inmuebles } = await Inmueble.findAndCountAll(findOptions);

            // Post-procesamiento para el formato de 'ImagenesURLs'
            // Esto reemplaza el GROUP_CONCAT de SQL
            const formattedInmuebles = inmuebles.map(inmueble => {
                const plainInmueble = inmueble.get({ plain: true });

                return {
                    ...plainInmueble,
                    // Extraer todas las URLs de las imágenes en un array
                    ImagenesURLs: plainInmueble.imagenesInmuebles
                        ? plainInmueble.imagenesInmuebles.map(img => img.URL)
                        : [],
                    // Eliminar la propiedad original de Sequelize si no la quieres en el resultado final
                    imagenesInmuebles: undefined
                };
            });

            if (formattedInmuebles.length === 0 && count === 0) {
                return res.status(404).json({ message: 'No se encontraron inmuebles con los criterios de búsqueda especificados.' });
            }

            // Devolver los resultados con información de paginación
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