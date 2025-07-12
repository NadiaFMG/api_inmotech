const db = require('../models');
const { Op } = require('sequelize');
const sequelize = db.sequelize;

const Inmueble = db.Inmueble;
const TipoEdificacion = db.TipoEdificacion;
const Acerca_edificacion = db.AcercaEdificacion;
const Division = db.Division;
const OtrasCaracteristicas = db.OtrasCaracteristicas;
const Asignacion = db.Asignacion;
const OrganizacionParqueadero = db.OrganizacionParqueadero;
const PlatformUser = db.PlatformUser;
const PlatformProfile = db.PlatformProfile;
const Direccion = db.Direccion;
const DesignadorCardinal = db.DesignadorCardinal;
const Localizacion = db.Localizacion;
const BarrioCiudadCorregimientoVereda = db.BarrioCiudadCorregimientoVereda;
const Barrio = db.Barrio;
const Ciudad = db.Ciudad;
const Corregimiento = db.Corregimiento;
const Vereda = db.Vereda;
const Municipio = db.Municipio;
const Ndap = db.Ndap;

const InmuebleController = {
async getFilteredInmueblesFull  (req, res) {
    try {
        const {
            motivo_transaccion, min_precio, max_precio, min_area_total, max_area_total,
            antiguedad, estado_inmueble, codigo_interno,
            tipo_edificacion_categoria,
            tipo_construccion, niveles_construidos, min_niveles_construidos, max_niveles_construidos,
            año_construccion, min_año_construccion, max_año_construccion,
            num_habitaciones, min_habitaciones, max_habitaciones,
            num_baños, min_baños, max_baños,
            tipo_cocina, balcon_si, num_terrazas, garaje_mayor_cero, num_garajes,
            ascensores_si, min_closets, num_closets,
            mascotas_permitidas_si, zona_lavanderia_si, parqueaderos_asignados,
            parqueadero_cubierto_si, ndap_id, municipio_id, ciudad_id, corregimiento_id, vereda_id, barrio_id,
            latitud, longitud, radio_km,
            numero, calle, adicional, designador_cardinal_id,
            platform_user_id
        } = req.query;

        const whereInmueble = { Estado: 'disponible' };
        const includeOptions = [];
        let centerLat, centerLon, radius;

        // Grupo 1
        if (motivo_transaccion) whereInmueble.Motivo_VoA = motivo_transaccion;
        if (min_precio !== undefined || max_precio !== undefined) {
            whereInmueble.Valor = {
                ...(min_precio !== undefined && { [Op.gte]: parseFloat(min_precio) }),
                ...(max_precio !== undefined && { [Op.lte]: parseFloat(max_precio) }),
            };
        }
        if (min_area_total !== undefined || max_area_total !== undefined) {
            whereInmueble.Area = {
                ...(min_area_total !== undefined && { [Op.gte]: parseFloat(min_area_total) }),
                ...(max_area_total !== undefined && { [Op.lte]: parseFloat(max_area_total) }),
            };
        }
        if (antiguedad) whereInmueble.Antiguedad = antiguedad;
        if (estado_inmueble) whereInmueble.Estado = estado_inmueble;
        if (codigo_interno) whereInmueble.Codigo_interno = codigo_interno;

        // Grupo 2
        const whereTipoEdificacion = {};
        if (tipo_edificacion_categoria) whereTipoEdificacion.Tipo_edificacion_categoria = tipo_edificacion_categoria;
        if (niveles_construidos !== undefined && niveles_construidos !== '' && !isNaN(parseInt(niveles_construidos, 10))) {
            whereTipoEdificacion.Tipo_edificacion_niveles = parseInt(niveles_construidos, 10);
        }
        if (
            (min_niveles_construidos !== undefined && min_niveles_construidos !== '' && !isNaN(parseInt(min_niveles_construidos, 10))) ||
            (max_niveles_construidos !== undefined && max_niveles_construidos !== '' && !isNaN(parseInt(max_niveles_construidos, 10)))
        ) {
            whereTipoEdificacion.Tipo_edificacion_niveles = {
                ...(min_niveles_construidos !== undefined && min_niveles_construidos !== '' && !isNaN(parseInt(min_niveles_construidos, 10)) && { [Op.gte]: parseInt(min_niveles_construidos, 10) }),
                ...(max_niveles_construidos !== undefined && max_niveles_construidos !== '' && !isNaN(parseInt(max_niveles_construidos, 10)) && { [Op.lte]: parseInt(max_niveles_construidos, 10) }),
            };
        }
        if (tipo_edificacion_categoria || Object.keys(whereTipoEdificacion).length > 0) {
            includeOptions.push({
                model: TipoEdificacion,
                as: 'tipoEdificacion',
                required: true,
                where: whereTipoEdificacion,
            });
        }

        // Grupo 3
        const whereAcercaEdificacion = {};
        if (tipo_construccion) whereAcercaEdificacion.Tipo_construccion = tipo_construccion;
        if (
            año_construccion !== undefined &&
            año_construccion !== '' &&
            !isNaN(parseInt(año_construccion, 10))
        ) {
            whereAcercaEdificacion.Anio_construccion = parseInt(año_construccion, 10);
        }
        if (
            (min_año_construccion !== undefined && min_año_construccion !== '' && !isNaN(parseInt(min_año_construccion, 10))) ||
            (max_año_construccion !== undefined && max_año_construccion !== '' && !isNaN(parseInt(max_año_construccion, 10)))
        ) {
            whereAcercaEdificacion.Anio_construccion = {
                ...(min_año_construccion !== undefined && min_año_construccion !== '' && !isNaN(parseInt(min_año_construccion, 10)) && { [Op.gte]: parseInt(min_año_construccion, 10) }),
                ...(max_año_construccion !== undefined && max_año_construccion !== '' && !isNaN(parseInt(max_año_construccion, 10)) && { [Op.lte]: parseInt(max_año_construccion, 10) }),
            };
        }
        if (Object.keys(whereAcercaEdificacion).length > 0) {
            includeOptions.push({
                model: Acerca_edificacion,
                as: 'acercaEdificacion',
                required: true,
                where: whereAcercaEdificacion,
            });
        }

        // Grupo 4
        const whereDivision = {};
        if (num_habitaciones !== undefined && num_habitaciones !== '' && !isNaN(parseInt(num_habitaciones, 10))) whereDivision.Habitaciones = parseInt(num_habitaciones, 10);
        if (
            (min_habitaciones !== undefined && min_habitaciones !== '' && !isNaN(parseInt(min_habitaciones, 10))) ||
            (max_habitaciones !== undefined && max_habitaciones !== '' && !isNaN(parseInt(max_habitaciones, 10)))
        ) {
            whereDivision.Habitaciones = {
                ...(min_habitaciones !== undefined && { [Op.gte]: parseInt(min_habitaciones, 10) }),
                ...(max_habitaciones !== undefined && { [Op.lte]: parseInt(max_habitaciones, 10) }),
            };
        }
        if (
            num_baños !== undefined &&
            num_baños !== '' &&
            !isNaN(parseInt(num_baños, 10))
        ) {
            whereDivision.Baños = parseInt(num_baños, 10);
        }
        if (
            (min_baños !== undefined && min_baños !== '' && !isNaN(parseInt(min_baños, 10))) ||
            (max_baños !== undefined && max_baños !== '' && !isNaN(parseInt(max_baños, 10)))
        ) {
            whereDivision.Baños = {
                ...(min_baños !== undefined && min_baños !== '' && !isNaN(parseInt(min_baños, 10)) && { [Op.gte]: parseInt(min_baños, 10) }),
                ...(max_baños !== undefined && max_baños !== '' && !isNaN(parseInt(max_baños, 10)) && { [Op.lte]: parseInt(max_baños, 10) }),
            };
        }
        if (tipo_cocina) whereDivision.Cocina = tipo_cocina;
        if (
            balcon_si !== undefined &&
            (balcon_si === 'true' || balcon_si === 'false')
        ) {
            whereDivision.Balcon = balcon_si === 'true' ? 'Si' : 'No';
        }
        if (
            num_terrazas !== undefined &&
            num_terrazas !== '' &&
            !isNaN(parseInt(num_terrazas, 10)) &&
            (parseInt(num_terrazas, 10) === 0 || parseInt(num_terrazas, 10) === 1)
        ) {
            whereDivision.Terraza = parseInt(num_terrazas, 10);
        }
        if (
            garaje_mayor_cero !== undefined &&
            garaje_mayor_cero !== '' &&
            !isNaN(parseInt(garaje_mayor_cero, 10))
        ) {
            whereDivision.Garaje = { [Op.gt]: parseInt(garaje_mayor_cero, 10) };
        }
        if (
            num_garajes !== undefined &&
            num_garajes !== '' &&
            !isNaN(parseInt(num_garajes, 10))
        ) {
            whereDivision.Garaje = parseInt(num_garajes, 10);
        }
        if (
        ascensores_si !== undefined &&
        (ascensores_si === 'Si' || ascensores_si === 'No')
        ) {
            whereDivision.Ascensores = ascensores_si;
        }
        if (
            min_closets !== undefined &&
            min_closets !== '' &&
            !isNaN(parseInt(min_closets, 10))
        ) {
            whereDivision.Closets = { [Op.gte]: parseInt(min_closets, 10) };
        }
        if (
            num_closets !== undefined &&
            num_closets !== '' &&
            !isNaN(parseInt(num_closets, 10))
        ) {
            whereDivision.Closets = parseInt(num_closets, 10);
        }
        if (Object.keys(whereDivision).length > 0) {
            includeOptions.push({
                model: Division,
                as: 'division',
                required: true,
                where: whereDivision,
            });
        }

        // Grupo 5
        const whereOtrasCaracteristicas = {};
        if (
            mascotas_permitidas_si !== undefined &&
            mascotas_permitidas_si !== '' &&
            (mascotas_permitidas_si === 'true' || mascotas_permitidas_si === 'false' || mascotas_permitidas_si === '1' || mascotas_permitidas_si === '0')
        ) {
            if (mascotas_permitidas_si === 'true' || mascotas_permitidas_si === '1') {
                whereOtrasCaracteristicas.Mascotas_permitidas = true;
            } else if (mascotas_permitidas_si === 'false' || mascotas_permitidas_si === '0') {
                whereOtrasCaracteristicas.Mascotas_permitidas = false;
            }
        }
        if (
            zona_lavanderia_si !== undefined &&
            zona_lavanderia_si !== '' &&
            (zona_lavanderia_si === 'true' || zona_lavanderia_si === 'false' || zona_lavanderia_si === '1' || zona_lavanderia_si === '0')
        ) {
            if (zona_lavanderia_si === 'true' || zona_lavanderia_si === '1') {
                whereOtrasCaracteristicas.Lavanderia = true;
            } else if (zona_lavanderia_si === 'false' || zona_lavanderia_si === '0') {
                whereOtrasCaracteristicas.Lavanderia = false;
            }
        }

        // Grupo 6 - Asignacion y OrganizacionParqueadero anidados
        let asignacionInclude = null;
        const whereOrganizacionParqueadero = {};
        if (parqueadero_cubierto_si === '1') {
            whereOrganizacionParqueadero.Cubierto = 1;
        } else if (parqueadero_cubierto_si === '0') {
            whereOrganizacionParqueadero.Cubierto = 0;
        }

        // Normaliza parqueaderos_asignados para texto (longtext)
        let parqueaderosArray = parqueaderos_asignados;
        if (typeof parqueaderos_asignados === 'string' && parqueaderos_asignados !== '') {
            try {
                parqueaderosArray = JSON.parse(parqueaderos_asignados);
            } catch {
                parqueaderosArray = [parqueaderos_asignados];
            }
        }
        if (Array.isArray(parqueaderosArray) && parqueaderosArray.length > 0) {
            asignacionInclude = {
                model: Asignacion,
                as: 'asignacion',
                required: true,
                where: {
                    [Op.or]: parqueaderosArray.map(val => ({
                        Parqueaderos_asignados: { [Op.like]: `%${val}%` }
                    }))
                },
                include: []
            };
            if (parqueadero_cubierto_si === '1' || parqueadero_cubierto_si === '0') {
                asignacionInclude.include.push({
                    model: OrganizacionParqueadero,
                    as: 'organizacionParqueadero',
                    required: true,
                    where: whereOrganizacionParqueadero
                });
            }
        } else if (parqueadero_cubierto_si === '1' || parqueadero_cubierto_si === '0') {
            asignacionInclude = {
                model: Asignacion,
                as: 'asignacion',
                required: true,
                include: [{
                    model: OrganizacionParqueadero,
                    as: 'organizacionParqueadero',
                    required: true,
                    where: whereOrganizacionParqueadero
                }]
            };
        }

        // Solo agrega el include si asignacionInclude fue inicializado
        const otrasCaracteristicasInclude = {
            model: OtrasCaracteristicas,
            as: 'otrasCaracteristicas',
            required: true,
            where: whereOtrasCaracteristicas,
            include: []
        };

        if (asignacionInclude) {
            otrasCaracteristicasInclude.include.push(asignacionInclude);
        }
        if (Object.keys(whereOtrasCaracteristicas).length > 0 || asignacionInclude) {
            includeOptions.push(otrasCaracteristicasInclude);
        }

        // Grupo 8 - Dirección y localización
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

        if (ndap_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Ciudad, as: 'Ciudad', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, include: [{ model: Ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Corregimiento, as: 'Corregimiento', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, include: [{ model: Ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Vereda, as: 'Vereda', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, include: [{ model: Ndap, as: 'Ndap', required: true, where: { Ndap_id: parseInt(ndap_id, 10) } }] }]
            });
            applyLocationFilters = true;
        }
        if (municipio_id) {
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Ciudad, as: 'Ciudad', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Corregimiento, as: 'Corregimiento', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
            });
            includeBarrioCiudadCorregimientoVereda.include.push({
                model: Vereda, as: 'Vereda', required: false,
                include: [{ model: Municipio, as: 'Municipio', required: true, where: { Municipio_id: parseInt(municipio_id, 10) } }]
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
            includeBarrioCiudadCorregimientoVereda.include.push({ model: Vereda, as: 'Vereda', required: true, where: { Vereda_id: parseInt(vereda_id, 10) } });
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

        if (latitud && longitud && radio_km) {
            centerLat = parseFloat(latitud);
            centerLon = parseFloat(longitud);
            radius = parseFloat(radio_km);

            if (isNaN(centerLat) || isNaN(centerLon) || isNaN(radius) || radius <= 0) {
                return res.status(400).json({ message: 'Latitud, longitud y radio_km deben ser números válidos y radio_km debe ser mayor que 0.' });
            }

            includeDireccion.include.push({
                model: Localizacion,
                as: 'Localizacion',
                required: true,
                attributes: [],
            });
            includeDireccion.required = true;
            applyLocationFilters = true;
        }

        const whereDireccionDetails = {};
        let applyFullAddressFilters = false;
        if (numero) { whereDireccionDetails.Direccion_Numero = numero; applyFullAddressFilters = true; }
        if (calle) { whereDireccionDetails.Direccion_Calle = { [Op.like]: `%${calle}%` }; applyFullAddressFilters = true; }
        if (adicional) { whereDireccionDetails.Descripcion_adicional = { [Op.like]: `%${adicional}%` }; applyFullAddressFilters = true; }
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
                includeDireccion.where = { ...includeDireccion.where, ...whereDireccionDetails };
            }
            includeDireccion.required = true;
            applyLocationFilters = true;
        }

        if (applyLocationFilters) {
            const existingDireccionIncludeIndex = includeOptions.findIndex(inc => inc.model === Direccion);
            if (existingDireccionIncludeIndex === -1) {
                includeOptions.push(includeDireccion);
            } else {
                includeOptions[existingDireccionIncludeIndex] = {
                    ...includeOptions[existingDireccionIncludeIndex],
                    ...includeDireccion,
                    include: [...(includeOptions[existingDireccionIncludeIndex].include || []), ...includeDireccion.include]
                };
            }
        }

        // Grupo 9 - Publicador
        if (platform_user_id) {
            whereInmueble.Platform_user_FK = parseInt(platform_user_id, 10);    
        }

        // Consulta final
        const findOptions = {
            where: whereInmueble,
            include: includeOptions,
        };

        if (latitud && longitud && radio_km) {
            findOptions.attributes = {
                include: [
                    [
                        sequelize.literal(`
                            6371 * acos(
                            cos(radians(${centerLat})) * cos(radians(\`Direccion->Localizacion\`.\`Latitud\`)) *
                            cos(radians(\`Direccion->Localizacion\`.\`Longitud\`) - radians(${centerLon})) +
                            sin(radians(${centerLat})) * sin(radians(\`Direccion->Localizacion\`.\`Latitud\`))
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
};

module.exports = InmuebleController;