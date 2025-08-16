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
    // Construye la URL pública para la carpeta estática
    const url = `${req.protocol}://${req.get('host')}/assets/images/inmuebles/${req.file.filename}`;
    console.log('Ruta destino:', path.join(__dirname, '../../../plataforma/src/assets/images/inmuebles'));
    res.json({
      nombre: req.file.originalname,
      archivo: req.file.filename,
      url
    });
  }
];

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
      // 1. NDAP
      let ndapId = null;
      if (req.body.direccion?.ndap && req.body.direccion.ndap.Ndap_descripcion) {
        const ndapExistente = await Ndap.findOne({
          where: { Ndap_descripcion: req.body.direccion.ndap.Ndap_descripcion },
          transaction: t
        });
        ndapId = ndapExistente ? ndapExistente.Ndap_id : (await Ndap.create(req.body.direccion.ndap, { transaction: t })).Ndap_id;
      }

      // 2. Municipio
      let municipioId = null;
      if (req.body.direccion?.municipio && ndapId) {
        const municipioExistente = await Municipio.findOne({
          where: { ...req.body.direccion.municipio, Ndap_FK: ndapId },
          transaction: t
        });
        municipioId = municipioExistente ? municipioExistente.Municipio_id : (await Municipio.create({ ...req.body.direccion.municipio, Ndap_FK: ndapId }, { transaction: t })).Municipio_id;
      }

      // 3. Barrio, Ciudad, Corregimiento, Vereda
      let ciudadId = null, corregimientoId = null, veredaId = null, barrioId = null;
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.ciudad && municipioId) {
        const ciudadData = { ...req.body.direccion.barrio_ciudad_corregimiento_vereda.ciudad };
        delete ciudadData.Municipio_FK;
        const ciudadExistente = await Ciudad.findOne({
          where: { ...ciudadData, Municipio_FK: municipioId },
          transaction: t
        });
        ciudadId = ciudadExistente ? ciudadExistente.Ciudad_id : (await Ciudad.create({ ...ciudadData, Municipio_FK: municipioId }, { transaction: t })).Ciudad_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.corregimiento && municipioId) {
        const corregimientoData = { ...req.body.direccion.barrio_ciudad_corregimiento_vereda.corregimiento };
        delete corregimientoData.Municipio_FK;
        const corregimientoExistente = await Corregimiento.findOne({
          where: { ...corregimientoData, Municipio_FK: municipioId },
          transaction: t
        });
        corregimientoId = corregimientoExistente ? corregimientoExistente.Corregimiento_id : (await Corregimiento.create({ ...corregimientoData, Municipio_FK: municipioId }, { transaction: t })).Corregimiento_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.vereda && municipioId) {
        const veredaData = { ...req.body.direccion.barrio_ciudad_corregimiento_vereda.vereda };
        delete veredaData.Municipio_FK;
        const veredaExistente = await Vereda.findOne({
          where: { ...veredaData, Municipio_FK: municipioId },
          transaction: t
        });
        veredaId = veredaExistente ? veredaExistente.Vereda_id : (await Vereda.create({ ...veredaData, Municipio_FK: municipioId }, { transaction: t })).Vereda_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.barrio) {
        const barrioData = req.body.direccion.barrio_ciudad_corregimiento_vereda.barrio;
        const barrioExistente = await Barrio.findOne({
          where: { ...barrioData },
          transaction: t
        });
        barrioId = barrioExistente ? barrioExistente.Barrio_id : (await Barrio.create({ ...barrioData }, { transaction: t })).Barrio_id;
      }

      // 4. BarrioCiudadCorregimientoVereda
      let bccvId = null;
      if (barrioId || ciudadId || corregimientoId || veredaId) {
        const [bccv] = await BarrioCiudadCorregimientoVereda.findOrCreate({
          where: {
            Barrio_FK: barrioId,
            Ciudad_FK: ciudadId,
            Corregimiento_FK: corregimientoId,
            Vereda_FK: veredaId
          },
          transaction: t
        });
        bccvId = bccv.Barrio_ciudad_corregimiento_vereda_id;
      }

    // 5. Localizacion (igual que dirección, robusto y seguro, con validación de campos)
    let localizacionId = null;
if (req.body.direccion?.localizacion) {
  const localizacionData = { ...req.body.direccion.localizacion };

  // Validar campo obligatorio
  if (!localizacionData.Localizacion_descripcion || localizacionData.Localizacion_descripcion === '') {
    await t.rollback();
    return res.status(400).json({
      error: 'Falta la propiedad obligatoria Localizacion_descripcion en localizacion'
    });
  }

  // Convertir Latitud y Longitud a número si existen
  if (localizacionData.Latitud !== undefined && localizacionData.Latitud !== null)
    localizacionData.Latitud = Number(localizacionData.Latitud);
  if (localizacionData.Longitud !== undefined && localizacionData.Longitud !== null)
    localizacionData.Longitud = Number(localizacionData.Longitud);

  // Buscar por descripción, latitud y longitud (ajusta según tu lógica)
  let localizacionExistente = await Localizacion.findOne({
    where: {
      Localizacion_descripcion: localizacionData.Localizacion_descripcion,
      Latitud: localizacionData.Latitud,
      Longitud: localizacionData.Longitud
    },
    transaction: t
  });

  if (localizacionExistente) {
    localizacionId = localizacionExistente.Localizacion_id;
  } else {
    try {
      const localizacionNueva = await Localizacion.create(localizacionData, { transaction: t });
      localizacionId = localizacionNueva.Localizacion_id;
    } catch (err) {
      await t.rollback();
      if (err.errors && err.errors.length > 0) {
        return res.status(400).json({
          error: err.errors.map(e => e.message).join(', ')
        });
      }
      return res.status(400).json({
        error: 'Error al crear localización: ' + err.message
      });
    }
  }
}
if (req.body.direccion?.localizacion && (localizacionId === null || localizacionId === undefined)) {
  await t.rollback();
  return res.status(400).json({ error: 'No se pudo crear la localización. Verifica los datos enviados.' });
}

      // 6. DesignadorCardinal
      let designadorCardinalId = null;
      if (req.body.direccion?.designador_cardinal) {
        const designadorData = req.body.direccion.designador_cardinal;
        const designadorExistente = await DesignadorCardinal.findOne({
          where: designadorData,
          transaction: t
        });
        designadorCardinalId = designadorExistente ? designadorExistente.Designador_cardinal_id : (await DesignadorCardinal.create(designadorData, { transaction: t })).Designador_cardinal_id;
      }

      // 7. Dirección
      let direccionId = null;
      if (req.body.direccion) {
        const direccionData = { ...req.body.direccion };
        delete direccionData.ndap;
        delete direccionData.municipio;
        delete direccionData.barrio_ciudad_corregimiento_vereda;
        delete direccionData.localizacion;
        delete direccionData.designador_cardinal;
        direccionData.Barrio_ciudad_corregimiento_vereda_FK = bccvId;
        direccionData.Localizacion_FK = localizacionId;
        direccionData.Designador_cardinal_FK = designadorCardinalId;
        const direccionExistente = await Direccion.findOne({
          where: direccionData,
          transaction: t
        });
        direccionId = direccionExistente ? direccionExistente.Direccion_id : (await Direccion.create(direccionData, { transaction: t })).Direccion_id;
      }

      // Validación: aborta si no se pudo crear la dirección
      if (!direccionId) {
        await t.rollback();
        return res.status(400).json({ error: 'No se pudo crear la dirección. Verifica los datos enviados.' });
      }

      // OrganizacionParqueadero
      let organizacionParqueaderoId = null;
      if (req.body.otras_caracteristicas?.organizacion_parqueadero) {
        const orgParqueaderoData = req.body.otras_caracteristicas.organizacion_parqueadero;
        const orgParqueaderoExistente = await OrganizacionParqueadero.findOne({
          where: orgParqueaderoData,
          transaction: t
        });
        organizacionParqueaderoId = orgParqueaderoExistente ? orgParqueaderoExistente.Organizacion_parqueadero_id : (await OrganizacionParqueadero.create(orgParqueaderoData, { transaction: t })).Organizacion_parqueadero_id;
      }

      // Asignacion
      let asignacionId = null;
      if (req.body.otras_caracteristicas?.asignacion) {
        const asignacionData = {
          ...req.body.otras_caracteristicas.asignacion,
          Organizacion_parqueadero_FK: organizacionParqueaderoId // Solo aquí
        };
        const asignacionExistente = await Asignacion.findOne({
          where: asignacionData,
          transaction: t
        });
        asignacionId = asignacionExistente ? asignacionExistente.Asignacion_id : (await Asignacion.create(asignacionData, { transaction: t })).Asignacion_id;
      }

      // OtrasCaracteristicas
      let otrasCaracteristicasId = null;
      if (req.body.otras_caracteristicas) {
        const otrasData = {
          ...req.body.otras_caracteristicas,
          Asignacion_FK: asignacionId
        };
        delete otrasData.asignacion;
        delete otrasData.organizacion_parqueadero;
        const otrasExistente = await OtrasCaracteristicas.findOne({
          where: otrasData,
          transaction: t
        });
        if (otrasExistente) {
          const inmuebleOtras = await Inmueble.findOne({
            where: { Otras_caracteristicas_FK: otrasExistente.Otras_caracteristicas_id },
            transaction: t
          });
          if (inmuebleOtras) {
            await t.rollback();
            return res.status(400).json({ error: 'Ya existe un inmueble con esas otras características.' });
          } else {
            otrasCaracteristicasId = otrasExistente.Otras_caracteristicas_id;
          }
        } else {
          const otrasNueva = await OtrasCaracteristicas.create(otrasData, { transaction: t });
          otrasCaracteristicasId = otrasNueva.Otras_caracteristicas_id;
        }
      }

      let imagenesIds = [];
      if (Array.isArray(req.body.imagenes_inmueble)) {
        for (const img of req.body.imagenes_inmueble) {
          let imagen = await ImagenesInmueble.findOne({
            where: img,
            transaction: t
          });
          if (!imagen) {
            imagen = await ImagenesInmueble.create(img, { transaction: t });
          }
          imagenesIds.push(imagen.Imagenes_inmueble_id);
        }
      } else if (req.body.imagenes_inmueble) {
        // Soporta también el caso antiguo de solo una imagen
        let imagen = await ImagenesInmueble.findOne({
          where: req.body.imagenes_inmueble,
          transaction: t
        });
        if (!imagen) {
          imagen = await ImagenesInmueble.create(req.body.imagenes_inmueble, { transaction: t });
        }
        imagenesIds.push(imagen.Imagenes_inmueble_id);
      }

      // Division
      let divisionId = null;
      if (req.body.division) {
        const divisionExistente = await Division.findOne({
          where: req.body.division,
          transaction: t
        });
        divisionId = divisionExistente ? divisionExistente.Division_id : (await Division.create(req.body.division, { transaction: t })).Division_id;
      }

      // AcercaEdificacion
      let acercaEdificacionId = null;
      if (req.body.acerca_edificacion) {
        const acercaExistente = await AcercaEdificacion.findOne({
          where: req.body.acerca_edificacion,
          transaction: t
        });
        acercaEdificacionId = acercaExistente ? acercaExistente.Acerca_edificacion_id : (await AcercaEdificacion.create(req.body.acerca_edificacion, { transaction: t })).Acerca_edificacion_id;
      }

      // TipoEdificacion
      let tipoEdificacionId = null;
      if (req.body.tipo_edificacion) {
        const tipoExistente = await TipoEdificacion.findOne({
          where: req.body.tipo_edificacion,
          transaction: t
        });
        tipoEdificacionId = tipoExistente ? tipoExistente.Tipo_edificacion_id : (await TipoEdificacion.create(req.body.tipo_edificacion, { transaction: t })).Tipo_edificacion_id;
      }

      // Validación uno a uno: no puede haber más de un inmueble con la misma dirección
      const inmuebleDireccion = await Inmueble.findOne({
        where: { Direccion_FK: direccionId },
        transaction: t
      });
      if (inmuebleDireccion) {
        await t.rollback();
        return res.status(400).json({ error: 'Ya existe un inmueble con esa dirección.' });
      }

      // Crear o asociar inmueble
      let inmuebleId = null;
      const inmuebleData = {
        ...req.body,
        Direccion_FK: direccionId,
        Imagenes_inmueble_FK: imagenesIds,
        Division_FK: divisionId,
        Acerca_edificacion_FK: acercaEdificacionId,
        Otras_caracteristicas_FK: otrasCaracteristicasId,
        Tipo_edificacion_FK: tipoEdificacionId
      };
      delete inmuebleData.direccion;
      delete inmuebleData.imagenes_inmueble;
      delete inmuebleData.division;
      delete inmuebleData.acerca_edificacion;
      delete inmuebleData.otras_caracteristicas;
      delete inmuebleData.tipo_edificacion;

      const inmuebleExistente = await Inmueble.findOne({
        where: inmuebleData,
        transaction: t
      });
      if (inmuebleExistente) {
        inmuebleId = inmuebleExistente.Inmueble_id;
        await t.commit();
        return res.status(200).json({ message: 'Ya existe el inmueble', inmueble_id: inmuebleId });
      } else {
        const inmuebleNuevo = await Inmueble.create(inmuebleData, { transaction: t });
        inmuebleId = inmuebleNuevo.Inmueble_id;
        await t.commit();
        return res.status(201).json(inmuebleNuevo);
      }
    } catch (error) {
      if (!t.finished) await t.rollback();
      res.status(400).json({ error: error.message });
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


