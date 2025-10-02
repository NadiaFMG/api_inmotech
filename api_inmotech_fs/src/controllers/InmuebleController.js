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

  async findAll(req, res) {
    try {
      const inmuebles = await Inmueble.findAll();
      res.json(inmuebles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const inmueble = await Inmueble.findByPk(req.params.id);
      if (!inmueble) return res.status(404).json({ error: 'No encontrado' });
      res.json(inmueble);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
  }
};

module.exports = {...InmuebleController, uploadImagen};
