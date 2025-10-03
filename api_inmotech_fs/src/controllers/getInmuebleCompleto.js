const db = require('../models');

const getInmuebleCompleto = async (req, res) => {
    try {
        const { id } = req.params;
        
        console.log('=== OBTENIENDO INMUEBLE COMPLETO ===');
        console.log('ID solicitado:', id);

        // Buscar el inmueble con todas sus relaciones usando los alias correctos
        const inmueble = await db.Inmueble.findByPk(id, {
            include: [
                // DIRECCIÓN Y SUS RELACIONES ANIDADAS
                {
                    model: db.Direccion,
                    include: [
                        {
                            model: db.BarrioCiudadCorregimientoVereda,
                            include: [
                                {
                                    model: db.Barrio
                                },
                                {
                                    model: db.Ciudad,
                                    include: [
                                        {
                                            model: db.Municipio,
                                            include: [
                                                {
                                                    model: db.Ndap
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: db.Corregimiento
                                },
                                {
                                    model: db.Vereda
                                }
                            ]
                        },
                        {
                            model: db.Localizacion
                        },
                        {
                            model: db.DesignadorCardinal
                        }
                    ]
                },
                // IMAGEN (belongsTo - solo una imagen)
                {
                    model: db.ImagenesInmueble
                },
                {
                    model: db.Division,
                    as: 'division'
                },
                {
                    model: db.AcercaEdificacion,
                    as: 'acercaEdificacion'
                },
                {
                    model: db.TipoEdificacion,
                    as: 'tipoEdificacion'
                },
                {
                    model: db.OtrasCaracteristicas,
                    as: 'otrasCaracteristicas',
                    include: [
                        {
                            model: db.Asignacion,
                            as: 'asignacion',
                            // INCLUIR ORGANIZACIÓN PARQUEADERO DENTRO DE ASIGNACIÓN
                            include: [
                                {
                                    model: db.OrganizacionParqueadero,
                                    as: 'organizacionParqueadero'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        if (!inmueble) {
            return res.status(404).json({ 
                message: 'Inmueble no encontrado' 
            });
        }

        // Extraer datos anidados correctamente
        const direccion = inmueble.Direccion;
        const bccv = direccion?.BarrioCiudadCorregimientoVereda;
        const ciudad = bccv?.Ciudad;
        const municipio = ciudad?.Municipio;
        const ndap = municipio?.Ndap;

        // Extraer organización parqueadero desde asignación
        const organizacionParqueadero = inmueble.otrasCaracteristicas?.asignacion?.organizacionParqueadero || null;

        // Estructurar la respuesta para el frontend
        const resultado = {
            inmueble: inmueble.toJSON(),
            direccion: direccion ? {
                ...direccion.toJSON(),
                ndap: ndap || null,
                municipio: municipio || null,
                barrio_ciudad_corregimiento_vereda: bccv ? {
                    ...bccv.toJSON(),
                    barrio: bccv.Barrio || null,
                    ciudad: ciudad || null,
                    corregimiento: bccv.Corregimiento || null,
                    vereda: bccv.Vereda || null
                } : null,
                localizacion: direccion.Localizacion || null,
                designador_cardinal: direccion.DesignadorCardinal || null
            } : null,
            imagenesInmueble: inmueble.ImagenesInmueble ? [inmueble.ImagenesInmueble] : [],
            division: inmueble.division || null,
            acercaEdificacion: inmueble.acercaEdificacion || null,
            tipoEdificacion: inmueble.tipoEdificacion || null,
            otrasCaracteristicas: inmueble.otrasCaracteristicas ? {
                ...inmueble.otrasCaracteristicas.toJSON(),
                asignacion: inmueble.otrasCaracteristicas.asignacion || null,
                organizacion_parqueadero: organizacionParqueadero // AHORA VIENE DE ASIGNACIÓN
            } : null
        };

        // LOGS PARA DEBUG
        console.log('=== DATOS ENCONTRADOS ===');
        console.log('✅ Inmueble ID:', inmueble.Inmueble_id);
        console.log('✅ Dirección:', !!direccion);
        console.log('✅ Imagen asociada:', !!inmueble.ImagenesInmueble);
        console.log('✅ BCCV:', !!bccv);
        console.log('✅ Ciudad:', !!ciudad);
        console.log('✅ Municipio:', !!municipio);
        console.log('✅ NDAP:', !!ndap);
        console.log('✅ Barrio:', !!bccv?.Barrio);
        console.log('✅ Corregimiento:', !!bccv?.Corregimiento);
        console.log('✅ Vereda:', !!bccv?.Vereda);
        console.log('✅ Localización:', !!direccion?.Localizacion);
        console.log('✅ Designador Cardinal:', !!direccion?.DesignadorCardinal);
        console.log('✅ División:', !!inmueble.division);
        console.log('✅ Acerca Edificación:', !!inmueble.acercaEdificacion);
        console.log('✅ Tipo Edificación:', !!inmueble.tipoEdificacion);
        console.log('✅ Otras Características:', !!inmueble.otrasCaracteristicas);
        console.log('✅ Asignación:', !!inmueble.otrasCaracteristicas?.asignacion);
        console.log('✅ Organización Parqueadero (desde asignación):', !!organizacionParqueadero);
        
        // LOG DE ORGANIZACIÓN PARQUEADERO
        if (organizacionParqueadero) {
            console.log('Organización Parqueadero datos:', {
                id: organizacionParqueadero.Organizacion_parqueadero_id,
                tipo: organizacionParqueadero.Tipo_parqueadero,
                cantidad: organizacionParqueadero.Cantidad,
                cubierto: organizacionParqueadero.Cubierto,
                disponible: organizacionParqueadero.Disponible
            });
        } else {
            console.log('❌ No se encontró Organización Parqueadero');
        }
        
        console.log('=== FIN DEBUG ===');

        res.json(resultado);

    } catch (error) {
        console.error('Error al obtener inmueble completo:', error);
        res.status(500).json({ 
            message: 'Error al obtener el inmueble completo', 
            error: error.message 
        });
    }
};

module.exports = { getInmuebleCompleto };