const path = require('path');
const multer = require('multer');

const db = require('../models');
const { log } = require('console');
const Inmueble = db.Inmueble;
const Direccion = db.Direccion;
const ImagenesInmueble = db.ImagenesInmueble;
const Division = db.Division;
const AcercaEdificacion = db.AcercaEdificacion;
const OtrasCaracteristicas = db.OtrasCaracteristicas;
const TipoEdificacion = db.TipoEdificacion;
const Asignacion = db.Asignacion;
const OrganizacionParqueadero = db.OrganizacionParqueadero;

// Relaciones para dirección
const BarrioCiudadCorregimientoVereda = db.BarrioCiudadCorregimientoVereda;
const Barrio = db.Barrio;
const Ciudad = db.Ciudad;
const Corregimiento = db.Corregimiento;
const Vereda = db.Vereda;
const Municipio = db.Municipio;
const DesignadorCardinal = db.DesignadorCardinal;
const Localizacion = db.Localizacion;
const Ndap = db.Ndap;

// Configuración de Multer para guardar archivos en /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../plataforma/src/assets/images/inmuebles'));
    console.log('Ruta destino:', path.join(__dirname, '../../../plataforma/src/assets/images/inmuebles'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Endpoint para subir imagen
const uploadImagen = [
  upload.single('imagen'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }
    const url = `${req.protocol}://${req.get('host')}/assets/images/inmuebles/${req.file.filename}`;
    console.log('Ruta destino:', path.join(__dirname, '../../../plataforma/src/assets/images/inmuebles'));
    res.json({
      nombre: req.file.originalname,
      archivo: req.file.filename,
      url
    });
  }
];

// Función de validación mejorada
const validarCamposRequeridos = (data, camposRequeridos, seccion = '') => {
  const errores = [];
  
  camposRequeridos.forEach(campo => {
    if (!data || data[campo] === undefined || data[campo] === null || data[campo] === '') {
      errores.push(`${seccion ? seccion + '.' : ''}${campo} es requerido`);
    }
  });
  
  return errores;
};

const InmuebleController = {
  async create(req, res) {
    try {
      const inmueble = await Inmueble.create(req.body);
      res.status(201).json(inmueble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async crearInmuebleAnidado(req, res) {
    const t = await Inmueble.sequelize.transaction();
    
    try {
      console.log('=== DATOS COMPLETOS RECIBIDOS ===');
      console.log(JSON.stringify(req.body, null, 2));

      // VALIDACIONES INICIALES
      const erroresInmueble = validarCamposRequeridos(req.body, [
        'Valor', 'Area', 'Descripcion_General', 'Antiguedad', 'Motivo_VoA', 
        'Situacion_inmueble', 'Codigo_interno', 'Estado', 'Platform_user_FK'
      ], 'inmueble');

      if (erroresInmueble.length > 0) {
        await t.rollback();
        return res.status(400).json({ 
          error: 'Errores en campos del inmueble', 
          detalles: erroresInmueble 
        });
      }

      // Validar dirección principal
      if (!req.body.direccion) {
        await t.rollback();
        return res.status(400).json({ 
          error: 'Falta la propiedad direccion (es obligatoria)' 
        });
      }

      // Validar campos obligatorios de dirección
      const erroresDireccion = validarCamposRequeridos(req.body.direccion, [
        'Direccion', 'Tipo_via', 'Numero_via_principal', 'Numero_calle_transversal', 
        'Numero_edificacion', 'Descripcion_adicional', 'Activo'
      ], 'direccion');

      if (erroresDireccion.length > 0) {
        await t.rollback();
        return res.status(400).json({ 
          error: 'Errores en campos de dirección', 
          detalles: erroresDireccion 
        });
      }

      // Validar localización (obligatoria)
      if (!req.body.direccion.localizacion) {
        await t.rollback();
        return res.status(400).json({ 
          error: 'Falta la propiedad direccion.localizacion (es obligatoria)' 
        });
      }

      const erroresLocalizacion = validarCamposRequeridos(req.body.direccion.localizacion, [
        'Localizacion_descripcion', 'Activo'
      ], 'direccion.localizacion');

      if (erroresLocalizacion.length > 0) {
        await t.rollback();
        return res.status(400).json({ 
          error: 'Errores en campos de localización', 
          detalles: erroresLocalizacion 
        });
      }

      // 1. NDAP
      let ndapId = null;
      if (req.body.direccion?.ndap && req.body.direccion.ndap.Ndap_descripcion) {
        try {
          console.log('=== PROCESANDO NDAP ===');
          const ndapData = req.body.direccion.ndap;
          
          const ndapLimpio = {
            Ndap_descripcion: String(ndapData.Ndap_descripcion).trim(),
            Activo: Number(ndapData.Activo) || 1
          };
          
          console.log('Datos NDAP a procesar:', ndapLimpio);
          
          const ndapExistente = await Ndap.findOne({
            where: { Ndap_descripcion: ndapLimpio.Ndap_descripcion },
            transaction: t
          });
          
          if (ndapExistente) {
            ndapId = ndapExistente.Ndap_id;
            console.log('NDAP existente encontrado con ID:', ndapId);
          } else {
            const nuevoNdap = await Ndap.create(ndapLimpio, { transaction: t });
            ndapId = nuevoNdap.Ndap_id;
            console.log('NDAP creado exitosamente con ID:', ndapId);
          }
        } catch (error) {
          console.error('Error al procesar NDAP:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear/buscar NDAP', 
            detalles: error.message
          });
        }
      }

      // 2. MUNICIPIO - CONECTAR CON NDAP
      let municipioId = null;
      if (req.body.direccion?.municipio && req.body.direccion.municipio.Municipio_nombre) {
        try {
          console.log('=== PROCESANDO MUNICIPIO ===');
          const municipioData = req.body.direccion.municipio;
          
          const municipioLimpio = {
            Municipio_nombre: String(municipioData.Municipio_nombre).trim(),
            Municipio_descripcion: municipioData.Municipio_descripcion ? String(municipioData.Municipio_descripcion).trim() : null,
            Activo: Number(municipioData.Activo) || 1,
            Ndap_FK: ndapId || null  // ← CONECTAR CON NDAP
          };
          
          console.log('Datos Municipio a procesar:', municipioLimpio);
          
          const municipioExistente = await Municipio.findOne({
            where: { 
              Municipio_nombre: municipioLimpio.Municipio_nombre,
              Ndap_FK: municipioLimpio.Ndap_FK
            },
            transaction: t
          });
          
          if (municipioExistente) {
            municipioId = municipioExistente.Municipio_id;
            console.log('Municipio existente encontrado con ID:', municipioId);
          } else {
            const nuevoMunicipio = await Municipio.create(municipioLimpio, { transaction: t });
            municipioId = nuevoMunicipio.Municipio_id;
            console.log('Municipio creado exitosamente con ID:', municipioId);
          }
        } catch (error) {
          console.error('Error al procesar Municipio:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear/buscar Municipio', 
            detalles: error.message
          });
        }
      }

      // 3. DESIGNADOR CARDINAL - NUEVO
      let designadorCardinalId = null;
      if (req.body.direccion?.designador_cardinal && req.body.direccion.designador_cardinal.Cardinalidad) {
        try {
          console.log('=== PROCESANDO DESIGNADOR CARDINAL ===');
          const designadorData = req.body.direccion.designador_cardinal;
          
          const designadorLimpio = {
            Cardinalidad: String(designadorData.Cardinalidad).trim(),
            Abreviacion: designadorData.Abreviacion ? String(designadorData.Abreviacion).trim() : null,
            Activo: Number(designadorData.Activo) || 1
          };
          
          console.log('Datos DesignadorCardinal a procesar:', designadorLimpio);
          
          const designadorExistente = await DesignadorCardinal.findOne({
            where: { Cardinalidad: designadorLimpio.Cardinalidad },
            transaction: t
          });
          
          if (designadorExistente) {
            designadorCardinalId = designadorExistente.Designador_cardinal_id;
            console.log('DesignadorCardinal existente encontrado con ID:', designadorCardinalId);
          } else {
            const nuevoDesignador = await DesignadorCardinal.create(designadorLimpio, { transaction: t });
            designadorCardinalId = nuevoDesignador.Designador_cardinal_id;
            console.log('DesignadorCardinal creado exitosamente con ID:', designadorCardinalId);
          }
        } catch (error) {
          console.error('Error al procesar DesignadorCardinal:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear/buscar DesignadorCardinal', 
            detalles: error.message
          });
        }
      }

      // 4. BARRIO, CIUDAD, CORREGIMIENTO, VEREDA - NUEVO
      let barrioCiudadCorregimientoVeredaId = null;
      let barrioId = null;
      let ciudadId = null;
      let corregimientoId = null;
      let veredaId = null;

      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda) {
        try {
          console.log('=== PROCESANDO BARRIO/CIUDAD/CORREGIMIENTO/VEREDA ===');
          const bccvData = req.body.direccion.barrio_ciudad_corregimiento_vereda;
          
          // PROCESAR BARRIO
          if (bccvData.barrio && bccvData.barrio.Nombre_barrio) {
            const barrioLimpio = {
              Nombre_barrio: String(bccvData.barrio.Nombre_barrio).trim(),
              Activo: 1
            };
            
            const barrioExistente = await Barrio.findOne({
              where: { Nombre_barrio: barrioLimpio.Nombre_barrio },
              transaction: t
            });
            
            if (barrioExistente) {
              barrioId = barrioExistente.Barrio_id;
              console.log('Barrio existente encontrado con ID:', barrioId);
            } else {
              const nuevoBarrio = await Barrio.create(barrioLimpio, { transaction: t });
              barrioId = nuevoBarrio.Barrio_id;
              console.log('Barrio creado exitosamente con ID:', barrioId);
            }
          }

          // PROCESAR CIUDAD - CONECTAR CON MUNICIPIO
          if (bccvData.ciudad && bccvData.ciudad.Ciudad) {
            const ciudadLimpia = {
              Ciudad: String(bccvData.ciudad.Ciudad).trim(),
              Activo: Number(bccvData.ciudad.Activo) || 1,
              Municipio_FK: municipioId || null  // ← CONECTAR CON MUNICIPIO
            };
            
            const ciudadExistente = await Ciudad.findOne({
              where: { 
                Ciudad: ciudadLimpia.Ciudad,
                Municipio_FK: ciudadLimpia.Municipio_FK
              },
              transaction: t
            });
            
            if (ciudadExistente) {
              ciudadId = ciudadExistente.Ciudad_id;
              console.log('Ciudad existente encontrada con ID:', ciudadId);
            } else {
              const nuevaCiudad = await Ciudad.create(ciudadLimpia, { transaction: t });
              ciudadId = nuevaCiudad.Ciudad_id;
              console.log('Ciudad creada exitosamente con ID:', ciudadId);
            }
          }

          // PROCESAR CORREGIMIENTO - CONECTAR CON MUNICIPIO
          if (bccvData.corregimiento && bccvData.corregimiento.Corregimiento) {
            const corregimientoLimpio = {
              Corregimiento: String(bccvData.corregimiento.Corregimiento).trim(),
              Activo: Number(bccvData.corregimiento.Activo) || 1,
              Municipio_FK: municipioId || null  // ← CONECTAR CON MUNICIPIO
            };
            
            const corregimientoExistente = await Corregimiento.findOne({
              where: { 
                Corregimiento: corregimientoLimpio.Corregimiento,
                Municipio_FK: corregimientoLimpio.Municipio_FK
              },
              transaction: t
            });
            
            if (corregimientoExistente) {
              corregimientoId = corregimientoExistente.Corregimiento_id;
              console.log('Corregimiento existente encontrado con ID:', corregimientoId);
            } else {
              const nuevoCorregimiento = await Corregimiento.create(corregimientoLimpio, { transaction: t });
              corregimientoId = nuevoCorregimiento.Corregimiento_id;
              console.log('Corregimiento creado exitosamente con ID:', corregimientoId);
            }
          }

          // PROCESAR VEREDA - CONECTAR CON MUNICIPIO
          if (bccvData.vereda && bccvData.vereda.Vereda_nombre) {
            const veredaLimpia = {
              Vereda_nombre: String(bccvData.vereda.Vereda_nombre).trim(),
              Activo: Number(bccvData.vereda.Activo) || 1,
              Municipio_FK: municipioId || null  // ← CONECTAR CON MUNICIPIO
            };
            
            const veredaExistente = await Vereda.findOne({
              where: { 
                Vereda_nombre: veredaLimpia.Vereda_nombre,
                Municipio_FK: veredaLimpia.Municipio_FK
              },
              transaction: t
            });
            
            if (veredaExistente) {
              veredaId = veredaExistente.Vereda_id;
              console.log('Vereda existente encontrada con ID:', veredaId);
            } else {
              const nuevaVereda = await Vereda.create(veredaLimpia, { transaction: t });
              veredaId = nuevaVereda.Vereda_id;
              console.log('Vereda creada exitosamente con ID:', veredaId);
            }
          }

          // CREAR BARRIO_CIUDAD_CORREGIMIENTO_VEREDA - CORREGIR NOMBRE DE CAMPO
          if (barrioId || ciudadId || corregimientoId || veredaId) {
            const bccvDataFinal = {
              Barrio_FK: barrioId || null,
              Ciudad_FK: ciudadId || null,
              Corregimiento_FK: corregimientoId || null,
              Vereda_Fk: veredaId || null, // ← CAMBIAR FK POR Fk (minúscula)
              Activo: 1
            };
            
            console.log('Datos BCCV finales a crear:', bccvDataFinal);
            console.log('IDs disponibles - Barrio:', barrioId, 'Ciudad:', ciudadId, 'Corregimiento:', corregimientoId, 'Vereda:', veredaId);
            
            // También corregir en la búsqueda
            const bccvExistente = await BarrioCiudadCorregimientoVereda.findOne({
              where: {
                Barrio_FK: bccvDataFinal.Barrio_FK,
                Ciudad_FK: bccvDataFinal.Ciudad_FK,
                Corregimiento_FK: bccvDataFinal.Corregimiento_FK,
                Vereda_Fk: bccvDataFinal.Vereda_Fk, // ← CAMBIAR FK POR Fk
                Activo: bccvDataFinal.Activo
              },
              transaction: t
            });
            
            if (bccvExistente) {
              barrioCiudadCorregimientoVeredaId = bccvExistente.Barrio_ciudad_corregimiento_vereda_id;
              console.log('BCCV existente encontrado con ID:', barrioCiudadCorregimientoVeredaId);
            } else {
              const nuevoBCCV = await BarrioCiudadCorregimientoVereda.create(bccvDataFinal, { transaction: t });
              barrioCiudadCorregimientoVeredaId = nuevoBCCV.dataValues.Barrio_ciudad_corregimiento_vereda_id || nuevoBCCV.Barrio_ciudad_corregimiento_vereda_id;
              console.log('BCCV creado exitosamente con ID:', barrioCiudadCorregimientoVeredaId);
              console.log('Objeto BCCV completo:', nuevoBCCV.dataValues);
            }
          }
          
        } catch (error) {
          console.error('Error al procesar Barrio/Ciudad/Corregimiento/Vereda:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear/buscar Barrio/Ciudad/Corregimiento/Vereda', 
            detalles: error.message
          });
        }
      }

      // 5. Localización (obligatoria)
      let localizacionId = null;
      try {
        console.log('=== PROCESANDO LOCALIZACION ===');
        const localizacionData = { ...req.body.direccion.localizacion };
        
        // Convertir coordenadas
        if (localizacionData.Latitud) localizacionData.Latitud = Number(localizacionData.Latitud);
        if (localizacionData.Longitud) localizacionData.Longitud = Number(localizacionData.Longitud);
        
        console.log('Datos de localización:', localizacionData);
        
        const localizacionExistente = await Localizacion.findOne({
          where: {
            Localizacion_descripcion: localizacionData.Localizacion_descripcion,
            ...(localizacionData.Latitud && { Latitud: localizacionData.Latitud }),
            ...(localizacionData.Longitud && { Longitud: localizacionData.Longitud })
          },
          transaction: t
        });
        
        if (localizacionExistente) {
          localizacionId = localizacionExistente.Localizacion_id;
          console.log('Localización existente encontrada con ID:', localizacionId);
        } else {
          const nuevaLocalizacion = await Localizacion.create(localizacionData, { transaction: t });
          localizacionId = nuevaLocalizacion.Localizacion_id;
          console.log('Localización creada con ID:', localizacionId);
        }
      } catch (error) {
        console.error('Error al procesar localización:', error);
        await t.rollback();
        return res.status(400).json({ 
          error: 'Error al crear localización', 
          detalles: error.message,
          errores_sequelize: error.errors ? error.errors.map(e => e.message) : []
        });
      }

      // 6. Dirección - SIN Municipio_FK ni Ndap_FK
      let direccionId = null;
      try {
        console.log('=== PROCESANDO DIRECCION ===');
        const direccionData = { ...req.body.direccion };
        
        // Limpiar campos anidados
        delete direccionData.ndap;
        delete direccionData.localizacion;
        delete direccionData.municipio;
        delete direccionData.barrio_ciudad_corregimiento_vereda;
        delete direccionData.designador_cardinal;
        
        // Asignar FKs - SOLO LAS QUE EXISTEN EN LA TABLA DIRECCION
        direccionData.Localizacion_FK = localizacionId;
        direccionData.Designador_cardinal_FK = designadorCardinalId || null;
        direccionData.Barrio_ciudad_corregimiento_vereda_FK = barrioCiudadCorregimientoVeredaId || null;
        
        // NO AGREGAR ESTAS - NO EXISTEN EN LA TABLA DIRECCION
        // direccionData.Ndap_FK = ndapId || null;
        // direccionData.Municipio_FK = municipioId || null;
        
        console.log('Datos de dirección final con FKs correctas:', direccionData);
        
        const direccionExistente = await Direccion.findOne({
          where: {
            Direccion: direccionData.Direccion,
            Tipo_via: direccionData.Tipo_via,
            Localizacion_FK: localizacionId
          },
          transaction: t
        });
        
        if (direccionExistente) {
          direccionId = direccionExistente.Direccion_id;
          console.log('Dirección existente encontrada con ID:', direccionId);
        } else {
          const nuevaDireccion = await Direccion.create(direccionData, { transaction: t });
          direccionId = nuevaDireccion.Direccion_id;
          console.log('Dirección creada con ID:', direccionId);
        }
      } catch (error) {
        console.error('Error al procesar dirección:', error);
        await t.rollback();
        return res.status(400).json({ 
          error: 'Error al crear dirección', 
          detalles: error.message,
          errores_sequelize: error.errors ? error.errors.map(e => e.message) : []
        });
      }

      // 7. División
      let divisionId = null;
      if (req.body.division) {
        try {
          console.log('=== PROCESANDO DIVISION ===');
          const divisionData = { ...req.body.division };
          console.log('Datos de división:', divisionData);
          
          const divisionExistente = await Division.findOne({
            where: divisionData,
            transaction: t
          });
          
          if (divisionExistente) {
            divisionId = divisionExistente.Division_id;
            console.log('División existente encontrada con ID:', divisionId);
          } else {
            const nuevaDivision = await Division.create(divisionData, { transaction: t });
            divisionId = nuevaDivision.Division_id;
            console.log('División creada con ID:', divisionId);
          }
        } catch (error) {
          console.error('Error al procesar división:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear división', 
            detalles: error.message 
          });
        }
      }

      // 8. AcercaEdificacion
      let acercaEdificacionId = null;
      if (req.body.acerca_edificacion) {
        try {
          console.log('=== PROCESANDO ACERCA EDIFICACION ===');
          const acercaData = { ...req.body.acerca_edificacion };
          console.log('Datos de acerca edificación:', acercaData);
          
          const acercaExistente = await AcercaEdificacion.findOne({
            where: acercaData,
            transaction: t
          });
          
          if (acercaExistente) {
            acercaEdificacionId = acercaExistente.Acerca_edificacion_id;
            console.log('AcercaEdificacion existente encontrada con ID:', acercaEdificacionId);
          } else {
            const nuevaAcerca = await AcercaEdificacion.create(acercaData, { transaction: t });
            acercaEdificacionId = nuevaAcerca.Acerca_edificacion_id;
            console.log('AcercaEdificacion creada con ID:', acercaEdificacionId);
          }
        } catch (error) {
          console.error('Error al procesar acerca edificación:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear acerca edificación', 
            detalles: error.message 
          });
        }
      }

      // 9. TipoEdificacion
      let tipoEdificacionId = null;
      if (req.body.tipo_edificacion) {
        try {
          console.log('=== PROCESANDO TIPO EDIFICACION ===');
          const tipoData = { ...req.body.tipo_edificacion };
          console.log('Datos de tipo edificación:', tipoData);
          
          const tipoExistente = await TipoEdificacion.findOne({
            where: tipoData,
            transaction: t
          });
          
          if (tipoExistente) {
            tipoEdificacionId = tipoExistente.Tipo_edificacion_id;
            console.log('TipoEdificacion existente encontrado con ID:', tipoEdificacionId);
          } else {
            const nuevoTipo = await TipoEdificacion.create(tipoData, { transaction: t });
            tipoEdificacionId = nuevoTipo.Tipo_edificacion_id;
            console.log('TipoEdificacion creado con ID:', tipoEdificacionId);
          }
        } catch (error) {
          console.error('Error al procesar tipo edificación:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear tipo edificación', 
            detalles: error.message 
          });
        }
      }

      // 10. OrganizacionParqueadero, Asignacion y OtrasCaracteristicas
      let organizacionParqueaderoId = null;
      let asignacionId = null;
      let otrasCaracteristicasId = null;

      if (req.body.otras_caracteristicas) {
        try {
          console.log('=== PROCESANDO OTRAS CARACTERISTICAS ===');
          
          // Organización Parqueadero
          if (req.body.otras_caracteristicas.organizacion_parqueadero) {
            const orgData = { ...req.body.otras_caracteristicas.organizacion_parqueadero };
            console.log('Datos organización parqueadero:', orgData);
            
            const orgExistente = await OrganizacionParqueadero.findOne({
              where: orgData,
              transaction: t
            });
            
            if (orgExistente) {
              organizacionParqueaderoId = orgExistente.Organizacion_parqueadero_id;
            } else {
              const nuevaOrg = await OrganizacionParqueadero.create(orgData, { transaction: t });
              organizacionParqueaderoId = nuevaOrg.Organizacion_parqueadero_id;
            }
            console.log('OrganizacionParqueadero ID:', organizacionParqueaderoId);
          }

          // Asignación
          if (req.body.otras_caracteristicas.asignacion) {
            const asignacionData = { 
              ...req.body.otras_caracteristicas.asignacion,
              Organizacion_parqueadero_FK: organizacionParqueaderoId || null
            };
            
            // Convertir array de parqueaderos a string si es necesario
            if (Array.isArray(asignacionData.Parqueaderos_asignados)) {
              asignacionData.Parqueaderos_asignados = JSON.stringify(asignacionData.Parqueaderos_asignados);
            }
            
            console.log('Datos asignación:', asignacionData);
            
            const asignacionExistente = await Asignacion.findOne({
              where: asignacionData,
              transaction: t
            });
            
            if (asignacionExistente) {
              asignacionId = asignacionExistente.Asignacion_id;
            } else {
              const nuevaAsignacion = await Asignacion.create(asignacionData, { transaction: t });
              asignacionId = nuevaAsignacion.Asignacion_id;
            }
            console.log('Asignacion ID:', asignacionId);
          }

          // Otras Características
          const otrasData = { ...req.body.otras_caracteristicas };
          delete otrasData.organizacion_parqueadero;
          delete otrasData.asignacion;
          otrasData.Asignacion_FK = asignacionId || null;
          
          console.log('Datos otras características:', otrasData);
          
          const otrasExistente = await OtrasCaracteristicas.findOne({
            where: otrasData,
            transaction: t
          });
          
          if (otrasExistente) {
            otrasCaracteristicasId = otrasExistente.Otras_caracteristicas_id;
          } else {
            const nuevasOtras = await OtrasCaracteristicas.create(otrasData, { transaction: t });
            otrasCaracteristicasId = nuevasOtras.Otras_caracteristicas_id;
          }
          console.log('OtrasCaracteristicas ID:', otrasCaracteristicasId);
          
        } catch (error) {
          console.error('Error al procesar otras características:', error);
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear otras características', 
            detalles: error.message 
          });
        }
      }

      // 11. Imágenes
      let imagenesIds = [];
      if (Array.isArray(req.body.imagenes_inmueble)) {
        for (const img of req.body.imagenes_inmueble) {
          const imagen = await ImagenesInmueble.create(img, { transaction: t });
          imagenesIds.push(imagen.Imagenes_inmueble_id);
        }
      } else {
        // Crear imagen por defecto
        const imagenDefault = await ImagenesInmueble.create({
          Imagenes: "default.jpg",
          Nombre: "Imagen por defecto",
          URL: "http://localhost:3000/assets/images/inmuebles/default.jpg"
        }, { transaction: t });
        imagenesIds.push(imagenDefault.Imagenes_inmueble_id);
      }

      // 12. CREAR EL INMUEBLE PRINCIPAL
      try {
        console.log('=== CREANDO INMUEBLE PRINCIPAL ===');
        
        const inmuebleData = {
          Valor: Number(req.body.Valor),
          Area: Number(req.body.Area),
          Descripcion_General: req.body.Descripcion_General,
          Antiguedad: Number(req.body.Antiguedad),
          Motivo_VoA: req.body.Motivo_VoA,
          Situacion_inmueble: req.body.Situacion_inmueble,
          Codigo_interno: req.body.Codigo_interno,
          Estado: req.body.Estado,
          Observaciones: req.body.Observaciones || null,
          Platform_user_FK: Number(req.body.Platform_user_FK),
          
          // Foreign Keys
          Direccion_FK: direccionId,
          Imagenes_inmueble_FK: imagenesIds[0] || null, // Primera imagen
          Division_FK: divisionId || null,
          Acerca_edificacion_FK: acercaEdificacionId || null,
          Otras_caracteristicas_FK: otrasCaracteristicasId || null,
          Tipo_edificacion_FK: tipoEdificacionId || null
        };
        
        console.log('Datos del inmueble a crear:', inmuebleData);
        
        // Verificar que no existe un inmueble con la misma dirección
        const inmuebleExistente = await Inmueble.findOne({
          where: { Direccion_FK: direccionId },
          transaction: t
        });
        
        if (inmuebleExistente) {
          await t.rollback();
          return res.status(400).json({ 
            error: 'Ya existe un inmueble con esa dirección' 
          });
        }
        
        // Crear el inmueble
        const nuevoInmueble = await Inmueble.create(inmuebleData, { transaction: t });
        
        console.log('Inmueble creado exitosamente con ID:', nuevoInmueble.Inmueble_id);
        
        await t.commit();
        
        return res.status(201).json({
          message: 'Inmueble creado exitosamente',
          inmueble: nuevoInmueble,
          inmueble_id: nuevoInmueble.Inmueble_id,
          detalles: {
            direccion_id: direccionId,
            localizacion_id: localizacionId,
            division_id: divisionId,
            acerca_edificacion_id: acercaEdificacionId,
            tipo_edificacion_id: tipoEdificacionId,
            otras_caracteristicas_id: otrasCaracteristicasId,
            imagenes_ids: imagenesIds,
            ndap_id: ndapId,
            municipio_id: municipioId,
            designador_cardinal_id: designadorCardinalId,
            barrio_ciudad_corregimiento_vereda_id: barrioCiudadCorregimientoVeredaId,
            ids_individuales: {
              barrio_id: barrioId,
              ciudad_id: ciudadId,
              corregimiento_id: corregimientoId,
              vereda_id: veredaId
            }
          }
        });
        
      } catch (error) {
        console.error('Error al crear inmueble principal:', error);
        await t.rollback();
        return res.status(400).json({ 
          error: 'Error al crear el inmueble', 
          detalles: error.message,
          errores_sequelize: error.errors ? error.errors.map(e => e.message) : []
        });
      }

    } catch (error) {
      if (!t.finished) await t.rollback();
      console.error('Error general:', error);
      res.status(400).json({ 
        error: error.message,
        stack: error.stack
      });
    }
  },

   async actualizarInmuebleAnidado(req, res) {
    const transaction = await db.sequelize.transaction();
    
    try {
      const id = req.params.id;
      const datosInmueble = req.body;
      
      console.log('Datos recibidos para actualización:', JSON.stringify(datosInmueble, null, 2));

      // 1. Buscar inmueble existente con todas sus relaciones
      const inmuebleExistente = await Inmueble.findByPk(id, {
        include: [
          { model: Direccion },
          { model: Division, as: 'division' },
          { model: AcercaEdificacion, as: 'acercaEdificacion' },
          { model: TipoEdificacion, as: 'tipoEdificacion' },
          { model: OtrasCaracteristicas, as: 'otrasCaracteristicas' },
          { model: ImagenesInmueble }
        ],
        transaction
      });

      if (!inmuebleExistente) {
        await transaction.rollback();
        return res.status(404).json({
          error: 'Inmueble no encontrado',
          mensaje: `No se encontró un inmueble con ID ${id}`
        });
      }

      // 2. Actualizar datos principales del inmueble
      await inmuebleExistente.update({
        Valor: datosInmueble.Valor,
        Area: datosInmueble.Area,
        Descripcion_General: datosInmueble.Descripcion_General,
        Antiguedad: datosInmueble.Antiguedad,
        Motivo_VoA: datosInmueble.Motivo_VoA,
        Situacion_inmueble: datosInmueble.Situacion_inmueble,
        Codigo_interno: datosInmueble.Codigo_interno,
        Estado: datosInmueble.Estado,
        Observaciones: datosInmueble.Observaciones,
        Platform_user_FK: datosInmueble.Platform_user_FK,
        Fecha_actualizacion: new Date()
      }, { transaction });

      console.log('Inmueble principal actualizado');

      // 3. Actualizar DIRECCION si existe
      if (datosInmueble.direccion && inmuebleExistente.Direccion_FK) {
        const direccionExistente = await Direccion.findByPk(inmuebleExistente.Direccion_FK, { transaction });
        if (direccionExistente) {
          await direccionExistente.update({
            Direccion: datosInmueble.direccion.Direccion,
            Tipo_via: datosInmueble.direccion.Tipo_via,
            Numero_via_principal: datosInmueble.direccion.Numero_via_principal,
            Numero_calle_transversal: datosInmueble.direccion.Numero_calle_transversal,
            Numero_edificacion: datosInmueble.direccion.Numero_edificacion,
            Descripcion_adicional: datosInmueble.direccion.Descripcion_adicional,
            Updated_at: new Date()
          }, { transaction });
          console.log('Dirección actualizada');
        }
      }

      // 4. Actualizar DIVISION si existe
      if (datosInmueble.division && inmuebleExistente.Division_FK) {
        const divisionExistente = await Division.findByPk(inmuebleExistente.Division_FK, { transaction });
        if (divisionExistente) {
          await divisionExistente.update({
            Division: datosInmueble.division.Division,
            Balcon: datosInmueble.division.Balcon,
            Baños: datosInmueble.division.Baños,
            Terraza: datosInmueble.division.Terraza,
            Habitaciones: datosInmueble.division.Habitaciones,
            Garaje: datosInmueble.division.Garaje,
            Ascensores: datosInmueble.division.Ascensores,
            Area: datosInmueble.division.Area,
            Closets: datosInmueble.division.Closets,
            Estudio: datosInmueble.division.Estudio,
            Sala: datosInmueble.division.Sala,
            Comedor: datosInmueble.division.Comedor,
            Cocina: datosInmueble.division.Cocina,
            Zona_lavanderia: datosInmueble.division.Zona_lavanderia,
            Deposito: datosInmueble.division.Deposito,
            Descripcion_adicional: datosInmueble.division.Descripcion_adicional,
            Updated_at: new Date()
          }, { transaction });
          console.log('División actualizada');
        }
      }

      // 5. Actualizar ACERCA_EDIFICACION si existe
      if (datosInmueble.acerca_edificacion && inmuebleExistente.Acerca_edificacion_FK) {
        const acercaExistente = await AcercaEdificacion.findByPk(inmuebleExistente.Acerca_edificacion_FK, { transaction });
        if (acercaExistente) {
          await acercaExistente.update({
            AcercaDeLaEdificacion: datosInmueble.acerca_edificacion.AcercaDeLaEdificacion,
            Estrato: datosInmueble.acerca_edificacion.Estrato,
            Tipo_construccion: datosInmueble.acerca_edificacion.Tipo_construccion,
            Anio_construccion: datosInmueble.acerca_edificacion.Anio_construccion,
            Estado_conservacion: datosInmueble.acerca_edificacion.Estado_conservacion,
            Zona_comun: datosInmueble.acerca_edificacion.Zona_comun,
            Descripcion_adicional: datosInmueble.acerca_edificacion.Descripcion_adicional,
            Updated_at: new Date()
          }, { transaction });
          console.log('AcercaEdificacion actualizada');
        }
      }

      // 6. Actualizar TIPO_EDIFICACION si existe
      if (datosInmueble.tipo_edificacion && inmuebleExistente.Tipo_edificacion_FK) {
        const tipoExistente = await TipoEdificacion.findByPk(inmuebleExistente.Tipo_edificacion_FK, { transaction });
        if (tipoExistente) {
          await tipoExistente.update({
            Tipo_edificacion_categoria: datosInmueble.tipo_edificacion.Tipo_edificacion_categoria,
            Tipo_edificacion_descripcion: datosInmueble.tipo_edificacion.Tipo_edificacion_descripcion,
            Tipo_edificacion_niveles: datosInmueble.tipo_edificacion.Tipo_edificacion_niveles,
            Updated_at: new Date()
          }, { transaction });
          console.log('TipoEdificacion actualizada');
        }
      }

      // 7. Actualizar OTRAS_CARACTERISTICAS y ASIGNACION si existe
      if (datosInmueble.otras_caracteristicas && inmuebleExistente.Otras_caracteristicas_FK) {
        const otrasExistente = await OtrasCaracteristicas.findByPk(inmuebleExistente.Otras_caracteristicas_FK, { transaction });
        if (otrasExistente) {
          // Actualizar asignación primero si existe
          if (datosInmueble.otras_caracteristicas.asignacion && otrasExistente.Asignacion_FK) {
            const asignacionExistente = await Asignacion.findByPk(otrasExistente.Asignacion_FK, { transaction });
            if (asignacionExistente) {
              await asignacionExistente.update({
                Parqueaderos_asignados: JSON.stringify(datosInmueble.otras_caracteristicas.asignacion.Parqueaderos_asignados),
                Disponible: datosInmueble.otras_caracteristicas.asignacion.Disponible,
                Descripcion: datosInmueble.otras_caracteristicas.asignacion.Descripcion,
                Updated_at: new Date()
              }, { transaction });
              console.log('Asignación actualizada con ID:', asignacionExistente.Asignacion_id);
            }
          }

          // Actualizar otras características
          await otrasExistente.update({
            Caracteristicas_descripcion: datosInmueble.otras_caracteristicas.Caracteristicas_descripcion,
            Deposito: datosInmueble.otras_caracteristicas.Deposito,
            Lavanderia: datosInmueble.otras_caracteristicas.Lavanderia,
            Gas: datosInmueble.otras_caracteristicas.Gas,
            Piso: datosInmueble.otras_caracteristicas.Piso,
            Mascotas_permitidas: datosInmueble.otras_caracteristicas.Mascotas_permitidas,
            Tipo_inmueble: datosInmueble.otras_caracteristicas.Tipo_inmueble,
            Amoblado: datosInmueble.otras_caracteristicas.Amoblado,
            Descripcion_adicional: datosInmueble.otras_caracteristicas.Descripcion_adicional,
            Updated_at: new Date()
          }, { transaction });
          console.log('OtrasCaracteristicas actualizada');
        }
      }

      // 8. Actualizar IMAGENES_INMUEBLE si existe (NO CREAR NUEVA)
      if (datosInmueble.imagenes_inmueble && datosInmueble.imagenes_inmueble.length > 0 && inmuebleExistente.Imagenes_inmueble_FK) {
        const imagenExistente = await ImagenesInmueble.findByPk(inmuebleExistente.Imagenes_inmueble_FK, { transaction });
        if (imagenExistente) {
          const nuevaImagen = datosInmueble.imagenes_inmueble[0]; // Tomar la primera imagen
          await imagenExistente.update({
            Imagenes: nuevaImagen.Imagenes,
            Nombre: nuevaImagen.Nombre,
            URL: nuevaImagen.URL
          }, { transaction });
          console.log('Imagen actualizada con ID:', imagenExistente.Imagenes_inmueble_id);
        }
      }

      await transaction.commit();

      res.json({
        success: true,
        mensaje: 'Inmueble actualizado exitosamente',
        id: inmuebleExistente.Inmueble_id
      });

    } catch (error) {
      await transaction.rollback();
      console.error('Error general en actualización:', error);
      res.status(500).json({
        error: 'Error al actualizar inmueble',
        mensaje: error.message,
        detalles: error
      });
    }
  },

  // ✅ NUEVO: Obtener estado de favorito
  async getFavorito(req, res) {
    try {
      const id = req.params.id;
      
      const inmueble = await Inmueble.findByPk(id, {
        attributes: ['Inmueble_id', 'favorito']
      });

      if (!inmueble) {
        return res.status(404).json({
          error: 'Inmueble no encontrado',
          mensaje: `No se encontró un inmueble con ID ${id}`
        });
      }

      res.json({
        success: true,
        inmueble_id: inmueble.Inmueble_id,
        favorito: inmueble.favorito
      });
    } catch (error) {
      console.error('Error al obtener estado favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ NUEVO: Toggle favorito (cambiar estado)
  async toggleFavorito(req, res) {
    try {
      const id = req.params.id;
      
      // Buscar el inmueble
      const inmueble = await Inmueble.findByPk(id);

      if (!inmueble) {
        return res.status(404).json({
          error: 'Inmueble no encontrado',
          mensaje: `No se encontró un inmueble con ID ${id}`
        });
      }

      // Determinar el nuevo valor
      let nuevoValorFavorito;
      if (inmueble.favorito === null || inmueble.favorito === false || inmueble.favorito === 0) {
        nuevoValorFavorito = true; // Marcar como favorito
      } else {
        nuevoValorFavorito = false; // Quitar de favoritos
      }

      // Actualizar el inmueble
      await inmueble.update({
        favorito: nuevoValorFavorito,
        Fecha_actualizacion: new Date()
      });

      console.log(`Inmueble ${id} ${nuevoValorFavorito ? 'marcado como favorito' : 'removido de favoritos'}`);

      res.json({
        success: true,
        mensaje: `Inmueble ${nuevoValorFavorito ? 'marcado como favorito' : 'removido de favoritos'}`,
        inmueble_id: inmueble.Inmueble_id,
        favorito: nuevoValorFavorito
      });
    } catch (error) {
      console.error('Error al cambiar estado favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ NUEVO: Establecer favorito con valor específico
  async setFavorito(req, res) {
    try {
      const id = req.params.id;
      const { favorito } = req.body;

      // Validar que favorito sea un booleano válido
      if (favorito !== true && favorito !== false && favorito !== 0 && favorito !== 1) {
        return res.status(400).json({
          error: 'Valor inválido',
          mensaje: 'El campo favorito debe ser true, false, 0 o 1'
        });
      }

      // Buscar el inmueble
      const inmueble = await Inmueble.findByPk(id);

      if (!inmueble) {
        return res.status(404).json({
          error: 'Inmueble no encontrado',
          mensaje: `No se encontró un inmueble con ID ${id}`
        });
      }

      // Convertir a booleano
      const valorFavorito = favorito === true || favorito === 1;

      // Actualizar el inmueble
      await inmueble.update({
        favorito: valorFavorito,
        Fecha_actualizacion: new Date()
      });

      console.log(`Inmueble ${id} favorito establecido a: ${valorFavorito}`);

      res.json({
        success: true,
        mensaje: `Favorito establecido a ${valorFavorito}`,
        inmueble_id: inmueble.Inmueble_id,
        favorito: valorFavorito
      });
    } catch (error) {
      console.error('Error al establecer favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ NUEVO: Obtener todos los inmuebles favoritos
  async getFavoritos(req, res) {
    try {
      const favoritos = await Inmueble.findAll({
        where: {
          favorito: true
        },
        include: [
          {
            model: Direccion,
            include: [
              { model: Localizacion },
              { model: DesignadorCardinal },
              {
                model: BarrioCiudadCorregimientoVereda,
                include: [
                  { model: Barrio },
                  { model: Ciudad },
                  { model: Corregimiento },
                  { model: Vereda }
                ]
              }
            ]
          },
          { model: Division, as: 'division' },
          { model: AcercaEdificacion, as: 'acercaEdificacion' },
          { model: TipoEdificacion, as: 'tipoEdificacion' },
          { model: OtrasCaracteristicas, as: 'otrasCaracteristicas' },
          { model: ImagenesInmueble }
        ],
        order: [['Fecha_actualizacion', 'DESC']]
      });

      res.json({
        success: true,
        count: favoritos.length,
        message: `Se encontraron ${favoritos.length} inmuebles favoritos`,
        data: favoritos
      });
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ MODIFICAR: Actualizar findAll para incluir favorito
  async findAll(req, res) {
    try {
      const inmuebles = await Inmueble.findAll({
        include: [
          {
            model: Direccion,
            include: [
              { model: Localizacion },
              { model: DesignadorCardinal },
              {
                model: BarrioCiudadCorregimientoVereda,
                include: [
                  { model: Barrio },
                  { model: Ciudad },
                  { model: Corregimiento },
                  { model: Vereda }
                ]
              }
            ]
          },
          { model: Division, as: 'division' },
          { model: AcercaEdificacion, as: 'acercaEdificacion' },
          { model: TipoEdificacion, as: 'tipoEdificacion' },
          { model: OtrasCaracteristicas, as: 'otrasCaracteristicas' },
          { model: ImagenesInmueble }
        ],
        order: [['Fecha_publicacion', 'DESC']]
      });
      
      res.json({
        success: true,
        count: inmuebles.length,
        data: inmuebles
      });
    } catch (error) {
      console.error('Error al obtener inmuebles:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        mensaje: error.message 
      });
    }
  },

  async findById(req, res) {
    try {
      const id = req.params.id;
      console.log('Buscando inmueble por ID:', id);
      
      const inmueble = await Inmueble.findByPk(id, {
        include: [
          {
            model: Direccion,
            // SIN ALIAS - no está definido en el modelo
            include: [
              {
                model: Localizacion,
                // SIN ALIAS - no está definido en el modelo
              },
              {
                model: DesignadorCardinal,
                // SIN ALIAS - no está definido en el modelo
              },
              {
                model: BarrioCiudadCorregimientoVereda,
                // SIN ALIAS - no está definido en el modelo
                include: [
                  { 
                    model: Barrio, 
                    // SIN ALIAS - no está definido en el modelo
                  },
                  { 
                    model: Ciudad, 
                    // SIN ALIAS - no está definido en el modelo
                    include: [
                      {
                        model: Municipio,
                        // SIN ALIAS - no está definido en el modelo
                        include: [
                          {
                            model: Ndap,
                            // SIN ALIAS - no está definido en el modelo
                          }
                        ]
                      }
                    ]
                  },
                  { 
                    model: Corregimiento, 
                    // SIN ALIAS - no está definido en el modelo
                    include: [
                      {
                        model: Municipio,
                        // SIN ALIAS - no está definido en el modelo
                        include: [
                          {
                            model: Ndap,
                            // SIN ALIAS - no está definido en el modelo
                          }
                        ]
                      }
                    ]
                  },
                  { 
                    model: Vereda, 
                    // SIN ALIAS - no está definido en el modelo
                    include: [
                      {
                        model: Municipio,
                        // SIN ALIAS - no está definido en el modelo
                        include: [
                          {
                            model: Ndap,
                            // SIN ALIAS - no está definido en el modelo
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
            as: 'division' // ✅ Usar el alias correcto
          },
          {
            model: AcercaEdificacion,
            as: 'acercaEdificacion' // ✅ Usar el alias correcto
          },
          {
            model: TipoEdificacion,
            as: 'tipoEdificacion' // ✅ Usar el alias correcto
          },
          {
            model: OtrasCaracteristicas,
            as: 'otrasCaracteristicas', // ✅ Usar el alias correcto
            include: [
              {
                model: Asignacion,
                as: 'asignacion', // ✅ Usar el alias correcto
                include: [
                  {
                    model: OrganizacionParqueadero,
                    as: 'organizacionParqueadero' // ✅ Usar el alias correcto
                  }
                ]
              }
            ]
          },
          {
            model: ImagenesInmueble,
            // SIN ALIAS - no está definido en el modelo
          }
        ]
      });

      if (!inmueble) {
        return res.status(404).json({ error: 'Inmueble no encontrado' });
      }

      console.log('Inmueble encontrado con todas las relaciones:', JSON.stringify(inmueble, null, 2));

      res.json({
        success: true,
        data: inmueble
      });
    } catch (error) {
      console.error('Error al buscar inmueble:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        detalles: error.message 
      });
    }
  },

  async eliminarInmuebleAnidado(req, res) {
    const transaction = await db.sequelize.transaction();
    
    try {
        const id = req.params.id;
        console.log('=== INICIANDO ELIMINACIÓN ANIDADA DEL INMUEBLE ID:', id, '===');

        // 1. BUSCAR EL INMUEBLE CON TODAS SUS RELACIONES
        const inmuebleExistente = await Inmueble.findByPk(id, {
            include: [
                {
                    model: Direccion,
                    include: [
                        { model: Localizacion },
                        { model: DesignadorCardinal },
                        {
                            model: BarrioCiudadCorregimientoVereda,
                            include: [
                                { model: Barrio },
                                { 
                                    model: Ciudad, 
                                    include: [{ model: Municipio, include: [{ model: Ndap }] }]
                                },
                                { 
                                    model: Corregimiento, 
                                    include: [{ model: Municipio, include: [{ model: Ndap }] }]
                                },
                                { 
                                    model: Vereda, 
                                    include: [{ model: Municipio, include: [{ model: Ndap }] }]
                                }
                            ]
                        }
                    ]
                },
                { model: Division, as: 'division' },
                { model: AcercaEdificacion, as: 'acercaEdificacion' },
                { model: TipoEdificacion, as: 'tipoEdificacion' },
                {
                    model: OtrasCaracteristicas,
                    as: 'otrasCaracteristicas',
                    include: [
                        {
                            model: Asignacion,
                            as: 'asignacion',
                            include: [{ model: OrganizacionParqueadero, as: 'organizacionParqueadero' }]
                        }
                    ]
                },
                { model: ImagenesInmueble }
            ],
            transaction
        });

        if (!inmuebleExistente) {
            await transaction.rollback();
            return res.status(404).json({
                error: 'Inmueble no encontrado',
                mensaje: `No se encontró un inmueble con ID ${id}`
            });
        }

        console.log('Inmueble encontrado, iniciando eliminación en cascada...');

        // Recopilar IDs
        const idsRecolectados = {
            inmueble_id: inmuebleExistente.Inmueble_id,
            direccion_id: inmuebleExistente.Direccion_FK,
            localizacion_id: inmuebleExistente.Direccion?.Localizacion_FK,
            designador_cardinal_id: inmuebleExistente.Direccion?.Designador_cardinal_FK,
            bccv_id: inmuebleExistente.Direccion?.Barrio_ciudad_corregimiento_vereda_FK,
            barrio_id: inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Barrio_FK,
            ciudad_id: inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad_FK,
            corregimiento_id: inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento_FK,
            vereda_id: inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda_Fk,
            municipio_id: null,
            ndap_id: null,
            division_id: inmuebleExistente.Division_FK,
            acerca_edificacion_id: inmuebleExistente.Acerca_edificacion_FK,
            tipo_edificacion_id: inmuebleExistente.Tipo_edificacion_FK,
            otras_caracteristicas_id: inmuebleExistente.Otras_caracteristicas_FK,
            asignacion_id: inmuebleExistente.otrasCaracteristicas?.Asignacion_FK,
            organizacion_parqueadero_id: inmuebleExistente.otrasCaracteristicas?.asignacion?.Organizacion_parqueadero_FK,
            imagenes_id: inmuebleExistente.Imagenes_inmueble_FK
        };

        // Determinar municipio_id y ndap_id dinámicamente
        if (inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Ciudad?.Municipio_FK) {
            idsRecolectados.municipio_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Ciudad.Municipio_FK;
            idsRecolectados.ndap_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Ciudad.Municipio?.Ndap_FK;
        } else if (inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Corregimiento?.Municipio_FK) {
            idsRecolectados.municipio_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Corregimiento.Municipio_FK;
            idsRecolectados.ndap_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Corregimiento.Municipio?.Ndap_FK;
        } else if (inmuebleExistente.Direccion?.BarrioCiudadCorregimientoVereda?.Vereda?.Municipio_FK) {
            idsRecolectados.municipio_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Vereda.Municipio_FK;
            idsRecolectados.ndap_id = inmuebleExistente.Direccion.BarrioCiudadCorregimientoVereda.Vereda.Municipio?.Ndap_FK;
        }

        console.log('IDs recolectados para eliminación:', idsRecolectados);

        // 2. ELIMINAR EN ORDEN CORRECTO (CORREGIDO)

        // PASO 1: Eliminar INMUEBLE (principal)
        console.log('=== ELIMINANDO INMUEBLE PRINCIPAL ===');
        await Inmueble.destroy({
            where: { Inmueble_id: idsRecolectados.inmueble_id },
            transaction
        });
        console.log('Inmueble principal eliminado');

        // PASO 2: Eliminar OTRAS_CARACTERISTICAS PRIMERO (que tiene FK a Asignacion)
        if (idsRecolectados.otras_caracteristicas_id) {
            console.log('=== VERIFICANDO OTRAS_CARACTERISTICAS ===');
            const otrasReferenciasCar = await Inmueble.count({
                where: { Otras_caracteristicas_FK: idsRecolectados.otras_caracteristicas_id },
                transaction
            });
            
            if (otrasReferenciasCar === 0) {
                await OtrasCaracteristicas.destroy({
                    where: { Otras_caracteristicas_id: idsRecolectados.otras_caracteristicas_id },
                    transaction
                });
                console.log('OtrasCaracteristicas eliminada (ID:', idsRecolectados.otras_caracteristicas_id, ')');
            } else {
                console.log('OtrasCaracteristicas conservada (tiene', otrasReferenciasCar, 'referencias)');
            }
        }

        // PASO 3: AHORA eliminar ASIGNACION (después de eliminar otras_caracteristicas)
        if (idsRecolectados.asignacion_id) {
            console.log('=== VERIFICANDO ASIGNACION ===');
            const otrasReferenciasAsig = await OtrasCaracteristicas.count({
                where: { Asignacion_FK: idsRecolectados.asignacion_id },
                transaction
            });
            
            if (otrasReferenciasAsig === 0) {
                await Asignacion.destroy({
                    where: { Asignacion_id: idsRecolectados.asignacion_id },
                    transaction
                });
                console.log('Asignacion eliminada (ID:', idsRecolectados.asignacion_id, ')');
            } else {
                console.log('Asignacion conservada (tiene', otrasReferenciasAsig, 'referencias)');
            }
        }

        // PASO 4: Eliminar ORGANIZACION_PARQUEADERO si no hay referencias
        if (idsRecolectados.organizacion_parqueadero_id) {
            console.log('=== VERIFICANDO ORGANIZACION_PARQUEADERO ===');
            const otrasReferenciasOrg = await Asignacion.count({
                where: { Organizacion_parqueadero_FK: idsRecolectados.organizacion_parqueadero_id },
                transaction
            });
            
            if (otrasReferenciasOrg === 0) {
                await OrganizacionParqueadero.destroy({
                    where: { Organizacion_parqueadero_id: idsRecolectados.organizacion_parqueadero_id },
                    transaction
                });
                console.log('OrganizacionParqueadero eliminada (ID:', idsRecolectados.organizacion_parqueadero_id, ')');
            } else {
                console.log('OrganizacionParqueadero conservada (tiene', otrasReferenciasOrg, 'referencias)');
            }
        }

        // PASO 5: Eliminar IMAGENES_INMUEBLE si no hay otras referencias
        if (idsRecolectados.imagenes_id) {
            console.log('=== VERIFICANDO IMAGENES_INMUEBLE ===');
            const otrosInmueblesConEstaImagen = await Inmueble.count({
                where: { Imagenes_inmueble_FK: idsRecolectados.imagenes_id },
                transaction
            });
            
            if (otrosInmueblesConEstaImagen === 0) {
                await ImagenesInmueble.destroy({
                    where: { Imagenes_inmueble_id: idsRecolectados.imagenes_id },
                    transaction
                });
                console.log('ImagenesInmueble eliminada (ID:', idsRecolectados.imagenes_id, ')');
            } else {
                console.log('ImagenesInmueble conservada (tiene', otrosInmueblesConEstaImagen, 'referencias)');
            }
        }

        // PASO 6: Eliminar TIPO_EDIFICACION si no hay referencias
        if (idsRecolectados.tipo_edificacion_id) {
            console.log('=== VERIFICANDO TIPO_EDIFICACION ===');
            const otrasReferenciasTipo = await Inmueble.count({
                where: { Tipo_edificacion_FK: idsRecolectados.tipo_edificacion_id },
                transaction
            });
            
            if (otrasReferenciasTipo === 0) {
                await TipoEdificacion.destroy({
                    where: { Tipo_edificacion_id: idsRecolectados.tipo_edificacion_id },
                    transaction
                });
                console.log('TipoEdificacion eliminado (ID:', idsRecolectados.tipo_edificacion_id, ')');
            } else {
                console.log('TipoEdificacion conservado (tiene', otrasReferenciasTipo, 'referencias)');
            }
        }

        // PASO 7: Eliminar ACERCA_EDIFICACION si no hay referencias
        if (idsRecolectados.acerca_edificacion_id) {
            console.log('=== VERIFICANDO ACERCA_EDIFICACION ===');
            const otrasReferenciasAcerca = await Inmueble.count({
                where: { Acerca_edificacion_FK: idsRecolectados.acerca_edificacion_id },
                transaction
            });
            
            if (otrasReferenciasAcerca === 0) {
                await AcercaEdificacion.destroy({
                    where: { Acerca_edificacion_id: idsRecolectados.acerca_edificacion_id },
                    transaction
                });
                console.log('AcercaEdificacion eliminado (ID:', idsRecolectados.acerca_edificacion_id, ')');
            } else {
                console.log('AcercaEdificacion conservado (tiene', otrasReferenciasAcerca, 'referencias)');
            }
        }

        // PASO 8: Eliminar DIVISION si no hay referencias
        if (idsRecolectados.division_id) {
            console.log('=== VERIFICANDO DIVISION ===');
            const otrasReferenciasDivision = await Inmueble.count({
                where: { Division_FK: idsRecolectados.division_id },
                transaction
            });
            
            if (otrasReferenciasDivision === 0) {
                await Division.destroy({
                    where: { Division_id: idsRecolectados.division_id },
                    transaction
                });
                console.log('Division eliminada (ID:', idsRecolectados.division_id, ')');
            } else {
                console.log('Division conservada (tiene', otrasReferenciasDivision, 'referencias)');
            }
        }

        // PASO 9: Eliminar DIRECCION si no hay referencias
        if (idsRecolectados.direccion_id) {
            console.log('=== VERIFICANDO DIRECCION ===');
            const otrasReferenciasDireccion = await Inmueble.count({
                where: { Direccion_FK: idsRecolectados.direccion_id },
                transaction
            });
            
            if (otrasReferenciasDireccion === 0) {
                await Direccion.destroy({
                    where: { Direccion_id: idsRecolectados.direccion_id },
                    transaction
                });
                console.log('Direccion eliminada (ID:', idsRecolectados.direccion_id, ')');
            } else {
                console.log('Direccion conservada (tiene', otrasReferenciasDireccion, 'referencias)');
            }
        }

        // PASO 10: Eliminar BARRIO_CIUDAD_CORREGIMIENTO_VEREDA si no hay referencias
      if (idsRecolectados.bccv_id) {
        console.log('=== VERIFICANDO BARRIO_CIUDAD_CORREGIMIENTO_VEREDA ===');
        const otrasReferenciasBCCV = await Direccion.count({
          where: { Barrio_ciudad_corregimiento_vereda_FK: idsRecolectados.bccv_id },
          transaction
        });
        
        if (otrasReferenciasBCCV === 0) {
          await BarrioCiudadCorregimientoVereda.destroy({
            where: { Barrio_ciudad_corregimiento_vereda_id: idsRecolectados.bccv_id },
            transaction
          });
          console.log('BarrioCiudadCorregimientoVereda eliminado (ID:', idsRecolectados.bccv_id, ')');
        } else {
          console.log('BarrioCiudadCorregimientoVereda conservado (tiene', otrasReferenciasBCCV, 'referencias)');
        }
      }

      // PASO 11: Eliminar BARRIO si no hay referencias
      if (idsRecolectados.barrio_id) {
        console.log('=== VERIFICANDO BARRIO ===');
        const otrasReferenciasBarrio = await BarrioCiudadCorregimientoVereda.count({
          where: { Barrio_FK: idsRecolectados.barrio_id },
          transaction
        });
        
        if (otrasReferenciasBarrio === 0) {
          await Barrio.destroy({
            where: { Barrio_id: idsRecolectados.barrio_id },
            transaction
          });
          console.log('Barrio eliminado (ID:', idsRecolectados.barrio_id, ')');
        } else {
          console.log('Barrio conservado (tiene', otrasReferenciasBarrio, 'referencias)');
        }
      }

      // PASO 12: Eliminar CIUDAD si no hay referencias
      if (idsRecolectados.ciudad_id) {
        console.log('=== VERIFICANDO CIUDAD ===');
        const otrasReferenciasCiudad = await BarrioCiudadCorregimientoVereda.count({
          where: { Ciudad_FK: idsRecolectados.ciudad_id },
          transaction
        });
        
        if (otrasReferenciasCiudad === 0) {
          await Ciudad.destroy({
            where: { Ciudad_id: idsRecolectados.ciudad_id },
            transaction
          });
          console.log('Ciudad eliminada (ID:', idsRecolectados.ciudad_id, ')');
        } else {
          console.log('Ciudad conservada (tiene', otrasReferenciasCiudad, 'referencias)');
        }
      }

      // PASO 13: Eliminar CORREGIMIENTO si no hay referencias
      if (idsRecolectados.corregimiento_id) {
        console.log('=== VERIFICANDO CORREGIMIENTO ===');
        const otrasReferenciasCorregimiento = await BarrioCiudadCorregimientoVereda.count({
          where: { Corregimiento_FK: idsRecolectados.corregimiento_id },
          transaction
        });
        
        if (otrasReferenciasCorregimiento === 0) {
          await Corregimiento.destroy({
            where: { Corregimiento_id: idsRecolectados.corregimiento_id },
            transaction
          });
          console.log('Corregimiento eliminado (ID:', idsRecolectados.corregimiento_id, ')');
        } else {
          console.log('Corregimiento conservado (tiene', otrasReferenciasCorregimiento, 'referencias)');
        }
      }

      // PASO 14: Eliminar VEREDA si no hay referencias
      if (idsRecolectados.vereda_id) {
        console.log('=== VERIFICANDO VEREDA ===');
        const otrasReferenciasVereda = await BarrioCiudadCorregimientoVereda.count({
          where: { Vereda_Fk: idsRecolectados.vereda_id }, // Nota: Fk con minúscula
          transaction
        });
        
        if (otrasReferenciasVereda === 0) {
          await Vereda.destroy({
            where: { Vereda_id: idsRecolectados.vereda_id },
            transaction
          });
          console.log('Vereda eliminada (ID:', idsRecolectados.vereda_id, ')');
        } else {
          console.log('Vereda conservada (tiene', otrasReferenciasVereda, 'referencias)');
        }
      }

      // PASO 15: Eliminar MUNICIPIO si no hay referencias
      if (idsRecolectados.municipio_id) {
        console.log('=== VERIFICANDO MUNICIPIO ===');
        const otrasReferenciasMunicipio = await Promise.all([
          Ciudad.count({ where: { Municipio_FK: idsRecolectados.municipio_id }, transaction }),
          Corregimiento.count({ where: { Municipio_FK: idsRecolectados.municipio_id }, transaction }),
          Vereda.count({ where: { Municipio_FK: idsRecolectados.municipio_id }, transaction })
        ]);
        
        const totalReferenciasMunicipio = otrasReferenciasMunicipio.reduce((a, b) => a + b, 0);
        
        if (totalReferenciasMunicipio === 0) {
          await Municipio.destroy({
            where: { Municipio_id: idsRecolectados.municipio_id },
            transaction
          });
          console.log('Municipio eliminado (ID:', idsRecolectados.municipio_id, ')');
        } else {
          console.log('Municipio conservado (tiene', totalReferenciasMunicipio, 'referencias)');
        }
      }

      // PASO 16: Eliminar NDAP si no hay referencias
      if (idsRecolectados.ndap_id) {
        console.log('=== VERIFICANDO NDAP ===');
        const otrasReferenciasNdap = await Municipio.count({
          where: { Ndap_FK: idsRecolectados.ndap_id },
          transaction
        });
        
        if (otrasReferenciasNdap === 0) {
          await Ndap.destroy({
            where: { Ndap_id: idsRecolectados.ndap_id },
            transaction
          });
          console.log('Ndap eliminado (ID:', idsRecolectados.ndap_id, ')');
        } else {
          console.log('Ndap conservado (tiene', otrasReferenciasNdap, 'referencias)');
        }
      }

      // PASO 17: Eliminar LOCALIZACION si no hay referencias
      if (idsRecolectados.localizacion_id) {
        console.log('=== VERIFICANDO LOCALIZACION ===');
        const otrasReferenciasLocalizacion = await Direccion.count({
          where: { Localizacion_FK: idsRecolectados.localizacion_id },
          transaction
        });
        
        if (otrasReferenciasLocalizacion === 0) {
          await Localizacion.destroy({
            where: { Localizacion_id: idsRecolectados.localizacion_id },
            transaction
          });
          console.log('Localizacion eliminada (ID:', idsRecolectados.localizacion_id, ')');
        } else {
          console.log('Localizacion conservada (tiene', otrasReferenciasLocalizacion, 'referencias)');
        }
      }

      // PASO 18: Eliminar DESIGNADOR_CARDINAL si no hay referencias
      if (idsRecolectados.designador_cardinal_id) {
        console.log('=== VERIFICANDO DESIGNADOR_CARDINAL ===');
        const otrasReferenciasDesignador = await Direccion.count({
          where: { Designador_cardinal_FK: idsRecolectados.designador_cardinal_id },
          transaction
        });
        
        if (otrasReferenciasDesignador === 0) {
          await DesignadorCardinal.destroy({
            where: { Designador_cardinal_id: idsRecolectados.designador_cardinal_id },
            transaction
          });
          console.log('DesignadorCardinal eliminado (ID:', idsRecolectados.designador_cardinal_id, ')');
        } else {
          console.log('DesignadorCardinal conservado (tiene', otrasReferenciasDesignador, 'referencias)');
        }
      }

      await transaction.commit();

      console.log('=== ELIMINACIÓN ANIDADA COMPLETADA EXITOSAMENTE ===');

      res.json({
          success: true,
          mensaje: 'Inmueble y relaciones asociadas eliminados exitosamente',
          inmueble_id: id,
          elementos_eliminados: idsRecolectados
      });

    } catch (error) {
        await transaction.rollback();
        console.error('Error general en eliminación anidada:', error);
        res.status(500).json({
            error: 'Error al eliminar inmueble y sus relaciones',
            mensaje: error.message,
            detalles: error
        });
    }
},

  async update1(req, res) {
    try {
      const [updated] = await Inmueble.update(req.body, {
        where: { Inmueble_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const inmueble = await Inmueble.findByPk(req.params.id);
      res.json(inmueble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete1(req, res) {
    try {
      const deleted = await Inmueble.destroy({
        where: { Inmueble_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Inmueble eliminado' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // ✅ NUEVO: Método específico para obtener inmuebles por usuario
  async findByUserId(req, res) {
    try {
      const userId = req.params.userId;
      
      console.log('Buscando inmuebles para el usuario ID:', userId);
      
      const inmuebles = await Inmueble.findAll({
        where: {
          Platform_user_FK: userId
        },
        include: [
          {
            model: Direccion,
            include: [
              { model: Localizacion },
              { model: DesignadorCardinal },
              {
                model: BarrioCiudadCorregimientoVereda,
                include: [
                  { model: Barrio },
                  { model: Ciudad },
                  { model: Corregimiento },
                  { model: Vereda }
                ]
              }
            ]
          },
                   { model: Division, as: 'division' },
          { model: AcercaEdificacion, as: 'acercaEdificacion' },
          { model: TipoEdificacion, as: 'tipoEdificacion' },
          { model: OtrasCaracteristicas, as: 'otrasCaracteristicas' },
          { model: ImagenesInmueble }
        ],
        order: [['Fecha_publicacion', 'DESC']]
      });
      
      res.json({
        success: true,
        user_id: userId,
        count: inmuebles.length,
        message: `Se encontraron ${inmuebles.length} inmuebles para el usuario ${userId}`,
        data: inmuebles
      });
    } catch (error) {
      console.error('Error al obtener inmuebles por usuario:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        mensaje: error.message 
      });
    }
  },
};

module.exports = {...InmuebleController, uploadImagen};
