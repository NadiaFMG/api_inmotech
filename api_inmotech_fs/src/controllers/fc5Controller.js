import Inmueble from '../models/inmueble.js';  // falta
import TipoEdificacion from '../models/tipoEdificacionModel.js';
import Acerca_edificacion from '../models/acerca_edificacion.js';
import division from '../models/division.js';
import OtrasCaracteristicas from '../models/otras_caracteristicas.js'; // falta
import asignacion from '../models/asignacion.js';
import organizacionParqueadero from '../models/organizacion_parqueadero.js';
import PlatformUser from '../models/platform_user.js'; //corregir (no se modifica por instrucción previa)
import PlatformProfile from '../models/platform_profile.js'; //corregir (no se modifica por instrucción previa)
import Direccion from '../models/direccion.js';
import DesignadorCardinal from '../models/designador_cardinal.js';
import Localizacion from '../models/localizacion.js';
import BarrioCiudadCorregimientoVereda from '../models/barrio_ciudad_corregimiento_vereda.js';
import Barrio from '../models/barrio.js';
import Ciudad from '../models/ciudad.js';
import Corregimiento from '../models/corregimiento.js';
import vereda from '../models/vereda.js';
import municipio from '../models/municipio.js';
import ndap from '../models/ndap.js'; 

export async function getFilteredInmueblesFull(req, res) {
    try {
        const {
            // GRUPO 1: Inmueble (Entidad Principal)
            motivo_transaccion,     // Venta, Alquiler, etc.
            min_precio, max_precio,
            min_area_total, max_area_total,
            antiguedad,             // Nuevo, Usado - 1 a 5 años, etc.
            estado_inmueble,        // Disponible, Vendido, Alquilado
            codigo_interno,         // Código único del inmueble

            // GRUPO 2: Tipo de Edificación
            tipo_edificacion_categoria, // Casa, Apartamento, Oficina, Lote, etc.

            // GRUPO 3: Detalles de la Edificación (Acerca_edificacion)
            tipo_construccion,      // Tradicional, Prefabricada
            material_predominante,  // Ladrillo, Concreto, Madera
            niveles_construidos, min_niveles_construidos, max_niveles_construidos,
            año_construccion, min_año_construccion, max_año_construccion,
            remodelado_si,          // true/false
            fecha_ultima_remodelacion, // Fecha exacta
            material_piso_predominante, // Cerámica, Madera, Mármol, Porcelanato

            // GRUUMPO 4: Divisiones (Division)
            num_habitaciones, min_habitaciones, max_habitaciones,
            num_baños, min_baños, max_baños,
            tipo_cocina,            // Integral, Abierta, Cerrada
            balcon_si,              // true/false
            terraza_mayor_cero,     // true/false (si tiene al menos una terraza)
            num_terrazas,           // Número exacto de terrazas
            garaje_mayor_cero,      // true/false (si tiene al menos un garaje)
            num_garajes,            // Número exacto de garajes
            ascensores_si,          // true/false
            min_closets,            // Mínimo de closets
            num_closets,            // Número exacto de closets

            // GRUPO 5: Otras Características (OtrasCaracteristicas)
            mascotas_permitidas_si, // true/false
            zona_lavanderia_si,     // true/false
            calentador_agua_si,     // true/false

            // GRUPO 6: Asignación (Asignacion)
            uso_comercial_si,       // true/false
            uso_residencial_si,     // true/false

            // GRUPO 7: Organización Parqueadero (OrganizacionParqueadero)
            parqueadero_cubierto_si,    // true/false
            parqueadero_visitantes_si,  // true/false
            parqueadero_descubierto_si, // true/false

            // GRUPO 8: Ubicación (Direccion, BarrioCiudadCorregimientoVereda, Ciudad, Municipio, Ndap, etc.)
            ndap_id,                // Departamento/Provincia
            municipio_id,           // Municipio
            ciudad_id,              // Ciudad
            corregimiento_id,       // Corregimiento
            vereda_id,              // Vereda
            barrio_id,              // Barrio
            latitud, longitud, radio_km, // Proximidad (usado con Localizacion)
            numero, calle, bloque, adicional, designador_cardinal_id, // Dirección completa

            // GRUPO 9: Publicador (PlatformUser, PlatformProfile)
            platform_user_id,       // ID de un usuario específico
            profile_type            // Tipo de perfil del anunciante (Agencia, Propietario)
        } = req.query;

        const whereInmueble = { Estado: 'disponible' }; // Condición base para todos los inmuebles
        const includeOptions = [];
        let distanceSelect = null;
        let havingCondition = null;

        // =========================================================================
        // 1. Filtros GRUPO 1: Inmueble (Entidad Principal)
        // =========================================================================
        if (motivo_transaccion) whereInmueble.Motivo_transaccion = motivo_transaccion;
        if (min_precio !== undefined || max_precio !== undefined) {
            whereInmueble.Precio = {
                ...(min_precio !== undefined && { [Op.gte]: parseFloat(min_precio) }),
                ...(max_precio !== undefined && { [Op.lte]: parseFloat(max_precio) }),
            };
        }
        if (min_area_total !== undefined || max_area_total !== undefined) {
            whereInmueble.Area_total = {
                ...(min_area_total !== undefined && { [Op.gte]: parseFloat(min_area_total) }),
                ...(max_area_total !== undefined && { [Op.lte]: parseFloat(max_area_total) }),
            };
        }
        if (antiguedad) whereInmueble.Antiguedad = antiguedad;
        if (estado_inmueble) whereInmueble.Estado = estado_inmueble; // Sobrescribe 'disponible' si se especifica otro estado
        if (codigo_interno) whereInmueble.Codigo_interno = codigo_interno;

        // =========================================================================
        // 2. Filtros GRUPO 2: Tipo de Edificación
        // =========================================================================
        if (tipo_edificacion_categoria) {
            includeOptions.push({
                model: TipoEdificacion,
                as: 'tipoEdificacion', // Asegúrate que este alias coincida con la asociación definida en tu modelo Inmueble
                required: true, // INNER JOIN si se usa este filtro
                where: { Tipo_edificacion_categoria: tipo_edificacion_categoria },
            });
        }

        // =========================================================================
        // 3. Filtros GRUPO 3: Detalles de la Edificación (Acerca_edificacion)
        // =========================================================================
        const whereAcercaEdificacion = {};
        if (tipo_construccion) whereAcercaEdificacion.Tipo_construccion = tipo_construccion;
        if (material_predominante) whereAcercaEdificacion.Material_predominante = material_predominante;
        if (niveles_construidos !== undefined) whereAcercaEdificacion.Niveles_construidos = parseInt(niveles_construidos, 10);
        if (min_niveles_construidos !== undefined || max_niveles_construidos !== undefined) {
            whereAcercaEdificacion.Niveles_construidos = {
                ...(min_niveles_construidos !== undefined && { [Op.gte]: parseInt(min_niveles_construidos, 10) }),
                ...(max_niveles_construidos !== undefined && { [Op.lte]: parseInt(max_niveles_construidos, 10) }),
            };
        }
        if (año_construccion !== undefined) whereAcercaEdificacion.Año_construccion = parseInt(año_construccion, 10);
        if (min_año_construccion !== undefined || max_año_construccion !== undefined) {
            whereAcercaEdificacion.Año_construccion = {
                ...(min_año_construccion !== undefined && { [Op.gte]: parseInt(min_año_construccion, 10) }),
                ...(max_año_construccion !== undefined && { [Op.lte]: parseInt(max_año_construccion, 10) }),
            };
        }
        if (remodelado_si !== undefined) whereAcercaEdificacion.Remodelado_si = remodelado_si === 'true';
        if (fecha_ultima_remodelacion) whereAcercaEdificacion.Fecha_ultima_remodelacion = fecha_ultima_remodelacion; // Considerar formato de fecha
        if (material_piso_predominante) whereAcercaEdificacion.Material_piso_predominante = material_piso_predominante;

        if (Object.keys(whereAcercaEdificacion).length > 0) {
            includeOptions.push({
                model: Acerca_edificacion, // Nombre de importación corregido
                as: 'acercaEdificacion', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: whereAcercaEdificacion,
            });
        }

        // =========================================================================
        // 4. Filtros GRUPO 4: Divisiones (Division)
        // =========================================================================
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
                model: division, // Nombre de importación corregido
                as: 'division', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: whereDivision,
            });
        }

        // =========================================================================
        // 5. Filtros GRUPO 5: Otras Características (OtrasCaracteristicas)
        // =========================================================================
        const whereOtrasCaracteristicas = {};
        if (mascotas_permitidas_si !== undefined) whereOtrasCaracteristicas.Mascotas_permitidas_si = mascotas_permitidas_si === 'true';
        if (zona_lavanderia_si !== undefined) whereOtrasCaracteristicas.Zona_lavanderia_si = zona_lavanderia_si === 'true';
        if (calentador_agua_si !== undefined) whereOtrasCaracteristicas.Calentador_agua_si = calentador_agua_si === 'true';

        if (Object.keys(whereOtrasCaracteristicas).length > 0) {
            includeOptions.push({
                model: OtrasCaracteristicas,
                as: 'otrasCaracteristicas', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: whereOtrasCaracteristicas,
            });
        }

        // =========================================================================
        // 6. Filtros GRUPO 6: Asignación (Asignacion)
        // =========================================================================
        const whereAsignacion = {};
        if (uso_comercial_si !== undefined) whereAsignacion.Uso_comercial_si = uso_comercial_si === 'true';
        if (uso_residencial_si !== undefined) whereAsignacion.Uso_residencial_si = uso_residencial_si === 'true';

        if (Object.keys(whereAsignacion).length > 0) {
            includeOptions.push({
                model: asignacion, // Nombre de importación corregido
                as: 'asignacion', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: whereAsignacion,
            });
        }

        // =========================================================================
        // 7. Filtros GRUPO 7: Organización Parqueadero (OrganizacionParqueadero)
        // =========================================================================
        const whereOrganizacionParqueadero = {};
        if (parqueadero_cubierto_si !== undefined) whereOrganizacionParqueadero.Parqueadero_cubierto_si = parqueadero_cubierto_si === 'true';
        if (parqueadero_visitantes_si !== undefined) whereOrganizacionParqueadero.Parqueadero_visitantes_si = parqueadero_visitantes_si === 'true';
        if (parqueadero_descubierto_si !== undefined) whereOrganizacionParqueadero.Parqueadero_descubierto_si = parqueadero_descubierto_si === 'true';

        if (Object.keys(whereOrganizacionParqueadero).length > 0) {
            includeOptions.push({
                model: organizacionParqueadero, // Nombre de importación corregido
                as: 'organizacionParqueadero', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: whereOrganizacionParqueadero,
            });
        }

        // =========================================================================
        // 8. Filtros GRUPO 8: Ubicación (Direccion, BarrioCiudadCorregimientoVereda, Ciudad, Municipio, Ndap, etc.)
        // =========================================================================
        const whereDireccion = {};
        const includeDireccion = {
            model: Direccion,
            as: 'Direccion',
            required: false,
            include: []
        };
        const includeBarrioCiudadCorregimientoVereda = {
            model: BarrioCiudadCorregimientoVereda,
            as: 'BarrioCiudadCorregimientoVereda',
            required: false,
            include: []
        };
        let applyLocationFilters = false;

        // Ubicación jerárquica
        if (ndap_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Ciudad, as: 'Ciudad', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, include: [{ model: ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Corregimiento, as: 'Corregimiento', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, include: [{ model: ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: vereda, as: 'Vereda', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, include: [{ model: ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            applyLocationFilters = true;
        }
        if (municipio_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Ciudad, as: 'Ciudad', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Corregimiento, as: 'Corregimiento', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: vereda, as: 'Vereda', required: false,
                include: [{ model: municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
            });
            applyLocationFilters = true;
        }
        if (ciudad_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({ model: Ciudad, as: 'Ciudad', required: true, where: { Ciudad_id: parseInt(ciudad_id, 10) } });
            applyLocationFilters = true;
        }
        if (corregimiento_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({ model: Corregimiento, as: 'Corregimiento', required: true, where: { Corregimiento_id: parseInt(corregimiento_id, 10) } });
            applyLocationFilters = true;
        }
        if (vereda_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({ model: vereda, as: 'Vereda', required: true, where: { Vereda_id: parseInt(vereda_id, 10) } });
            applyLocationFilters = true;
        }
        if (barrio_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({ model: Barrio, as: 'Barrio', required: true, where: { Barrio_id: parseInt(barrio_id, 10) } });
            applyLocationFilters = true;
        }

        if (applyLocationFilters) {
            includeDireccion.include.push(includeBarrioCiudadCorregimientoVereda);
            includeDireccion.required = true;
        }

        // Proximidad (GPS)
        let centerLat, centerLon, radius;
        if (latitud && longitud && radio_km) {
            centerLat = parseFloat(latitud);
            centerLon = parseFloat(longitud);
            radius = parseFloat(radio_km);

            if (isNaN(centerLat) || isNaN(centerLon) || isNaN(radius) || radius <= 0) {
                return res.status(400).json({ message: 'Latitud, longitud y radio_km deben ser números válidos y radio_km debe ser mayor que 0.' });
            }

            // Asegurarse de incluir Localizacion
            includeDireccion.include.push({
                model: Localizacion,
                as: 'Localizacion',
                required: true,
                attributes: [], // No necesitamos atributos de Localizacion en el resultado principal
            });
            includeDireccion.required = true; // Hacer Direccion requerida si hay filtro de proximidad
            applyLocationFilters = true;
        }

        // Dirección completa (número, calle, etc.)
        const whereDireccionDetails = {};
        let applyFullAddressFilters = false;
        if (numero) { whereDireccionDetails.Direccion_Numero = numero; applyFullAddressFilters = true; }
        if (calle) { whereDireccionDetails.Direccion_Calle = { [Op.like]: `%${calle}%` }; applyFullAddressFilters = true; }
        if (bloque) { whereDireccionDetails.Direccion_Bloque = { [Op.like]: `%${bloque}%` }; applyFullAddressFilters = true; }
        if (adicional) { whereDireccionDetails.Direccion_Adicional = { [Op.like]: `%${adicional}%` }; applyFullAddressFilters = true; }
        if (designador_cardinal_id) {
            whereDireccionDetails.Designador_cardinal_FK = parseInt(designador_cardinal_id, 10);
            includeDireccion.include.push({
                model: DesignadorCardinal,
                as: 'DesignadorCardinal',
                required: true,
            });
            applyFullAddressFilters = true;
        }

        if (applyFullAddressFilters) {
            if (Object.keys(whereDireccionDetails).length > 0) {
                // Fusionar con el where existente de Direccion si ya hay
                includeDireccion.where = { ...includeDireccion.where, ...whereDireccionDetails };
            }
            includeDireccion.required = true; // Hacer Direccion requerida si hay filtros de dirección
            applyLocationFilters = true;
        }

        // Añadir el include de Direccion solo si se aplicó algún filtro de ubicación/dirección
        if (applyLocationFilters) {
            const existingDireccionIncludeIndex = includeOptions.findIndex(inc => inc.model === Direccion);
            if (existingDireccionIncludeIndex === -1) {
                includeOptions.push(includeDireccion);
            } else {
                // Si Direccion ya fue añadida (ej. por alguna sub-asociación), fusionar sus opciones
                includeOptions[existingDireccionIncludeIndex] = {
                    ...includeOptions[existingDireccionIncludeIndex],
                    ...includeDireccion,
                    include: [...(includeOptions[existingDireccionIncludeIndex].include || []), ...includeDireccion.include]
                };
            }
        }


        // =========================================================================
        // 9. Filtros GRUPO 9: Publicador (PlatformUser, PlatformProfile)
        // =========================================================================
        let applyPublicadorFilters = false;
        const publicadorInclude = {
            model: PlatformUser,
            as: 'publicador', // Asegúrate que este alias coincida con la asociación
            required: false, // Será true si se aplican filtros de publicador
            include: []
        };

        if (platform_user_id) {
            publicadorInclude.where = { Platform_user_id: parseInt(platform_user_id, 10) };
            publicadorInclude.required = true;
            applyPublicadorFilters = true;
        }

        if (profile_type) {
            publicadorInclude.include.push({
                model: PlatformProfile,
                as: 'perfilPublicador', // Asegúrate que este alias coincida con la asociación
                required: true,
                where: { Profile_type: profile_type }
            });
            publicadorInclude.required = true; // Si filtramos por perfil, el publicador es requerido
            applyPublicadorFilters = true;
        }

        if (applyPublicadorFilters) {
            includeOptions.push(publicadorInclude);
        }

        // =========================================================================
        // Ejecutar la consulta final
        // =========================================================================
        const findOptions = {
            where: whereInmueble,
            include: includeOptions,
        };

        // Si hay filtro de proximidad, añadir el cálculo de distancia y el 'having'
        if (latitud && longitud && radio_km) {
            // Sequelize literal para calcular la distancia (Haversine formula)
            findOptions.attributes = {
                include: [
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
                ]
            };
            findOptions.having = sequelize.literal(`distancia_km <= ${radius}`);
            findOptions.order = [[sequelize.literal('distancia_km'), 'ASC']];
        }

        const inmuebles = await Inmueble.findAll(findOptions);

        if (inmuebles.length === 0) {
            return res.status(404).json({ message: 'No se encontraron inmuebles con los criterios de búsqueda especificados.' });
        }

        res.status(200).json(inmuebles);

    } catch (error) {
        console.error('Error al obtener inmuebles con filtros completos:', error);
        res.status(500).json({ message: 'Error interno del servidor al obtener inmuebles con filtros completos.', error: error.message });
    }
}