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

      // 1. NDAP - DEBUGGING MEJORADO
      let ndapId = null;
      if (req.body.direccion?.ndap && req.body.direccion.ndap.Ndap_descripcion) {
        try {
          console.log('=== DEBUGGING NDAP ===');
          console.log('Datos NDAP recibidos:', JSON.stringify(req.body.direccion.ndap, null, 2));
          
          // Verificar estructura exacta
          const ndapData = req.body.direccion.ndap;
          console.log('Campos NDAP a validar:');
          console.log('- Ndap_descripcion:', ndapData.Ndap_descripcion, '(tipo:', typeof ndapData.Ndap_descripcion, ')');
          console.log('- Activo:', ndapData.Activo, '(tipo:', typeof ndapData.Activo, ')');
          
          // Verificar longitud del campo
          if (ndapData.Ndap_descripcion && ndapData.Ndap_descripcion.length > 255) {
            console.error('ERROR: Ndap_descripcion demasiado largo:', ndapData.Ndap_descripcion.length, 'caracteres');
            await t.rollback();
            return res.status(400).json({ 
              error: 'Error al crear/buscar NDAP', 
              detalles: 'Ndap_descripcion no puede tener más de 255 caracteres',
              valor_enviado: ndapData.Ndap_descripcion
            });
          }
          
          // Limpiar datos - solo enviar campos que existen en el modelo
          const ndapLimpio = {
            Ndap_descripcion: String(ndapData.Ndap_descripcion).trim(),
            Activo: Number(ndapData.Activo) || 1
          };
          
          console.log('Datos NDAP limpios a enviar:', ndapLimpio);
          
          // Buscar existente primero
          console.log('Buscando NDAP existente con descripción:', ndapLimpio.Ndap_descripcion);
          const ndapExistente = await Ndap.findOne({
            where: { Ndap_descripcion: ndapLimpio.Ndap_descripcion },
            transaction: t
          });
          
          if (ndapExistente) {
            ndapId = ndapExistente.Ndap_id;
            console.log('NDAP existente encontrado con ID:', ndapId);
          } else {
            console.log('Creando nuevo NDAP con datos:', ndapLimpio);
            
            // Verificar modelo NDAP antes de crear
            console.log('Verificando estructura del modelo NDAP...');
            const modeloNdap = await Ndap.describe();
            console.log('Campos del modelo NDAP:', Object.keys(modeloNdap));
            
            const nuevoNdap = await Ndap.create(ndapLimpio, { transaction: t });
            ndapId = nuevoNdap.Ndap_id;
            console.log('NDAP creado exitosamente con ID:', ndapId);
          }
          
          console.log('=== FIN DEBUGGING NDAP ===');
        } catch (error) {
          console.error('=== ERROR DETALLADO NDAP ===');
          console.error('Error completo:', error);
          console.error('Nombre del error:', error.name);
          console.error('Mensaje:', error.message);
          console.error('Stack:', error.stack);
          
          if (error.errors && error.errors.length > 0) {
            console.error('Detalles de errores de validación:');
            error.errors.forEach((err, index) => {
              console.error(`Error ${index + 1}:`);
              console.error('- Campo:', err.path);
              console.error('- Valor:', err.value);
              console.error('- Mensaje:', err.message);
              console.error('- Tipo:', err.type);
              console.error('- Validador:', err.validatorKey);
              console.error('- Validador Args:', err.validatorArgs);
            });
          }
          
          if (error.sql) {
            console.error('SQL Query:', error.sql);
          }
          
          if (error.parent) {
            console.error('Error padre:', error.parent);
          }
          
          console.error('=== FIN ERROR NDAP ===');
          
          await t.rollback();
          return res.status(400).json({ 
            error: 'Error al crear/buscar NDAP', 
            detalles: error.message,
            tipo_error: error.name,
            errores_validacion: error.errors ? error.errors.map(e => ({
              campo: e.path,
              valor: e.value,
              mensaje: e.message,
              tipo: e.type,
              validador: e.validatorKey,
              validador_args: e.validatorArgs
            })) : [],
            datos_enviados: req.body.direccion.ndap,
            sql: error.sql,
            error_padre: error.parent ? error.parent.message : null
          });
        }
      } else {
        console.log('NDAP no proporcionado o falta Ndap_descripcion');
      }

      // 2. Localización (obligatoria)
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

      // 3. Dirección
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
        
        // Asignar FKs
        direccionData.Localizacion_FK = localizacionId;
        // Otros FKs se pueden asignar como null si no existen
        
        console.log('Datos de dirección final:', direccionData);
        
        const direccionExistente = await Direccion.findOne({
          where: direccionData,
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

      // 4. COMPLETAR - División
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

      // 5. COMPLETAR - AcercaEdificacion
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

      // 6. COMPLETAR - TipoEdificacion
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

      // 7. COMPLETAR - OrganizacionParqueadero y Asignacion
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

      // 8. Imágenes (ya tienes este código)
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

      // 9. CREAR EL INMUEBLE PRINCIPAL (ESTO ES LO QUE FALTABA)
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
            ndap_id: ndapId
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
