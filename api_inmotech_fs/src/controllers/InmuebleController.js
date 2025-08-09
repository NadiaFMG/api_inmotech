// // // // const db = require('../models');
// // // // const Inmueble = db.Inmueble;

// // // // const InmuebleController = {
// // // //   async create(req, res) {
// // // //     try {
// // // //       const inmueble = await Inmueble.create(req.body);
// // // //       res.status(201).json(inmueble);
// // // //     } catch (error) {
// // // //       res.status(400).json({ error: error.message });
// // // //     }
// // // //   },

// // // //   async findAll(req, res) {
// // // //     try {
// // // //       const inmuebles = await Inmueble.findAll();
// // // //       res.json(inmuebles);
// // // //     } catch (error) {
// // // //       res.status(500).json({ error: error.message });
// // // //     }
// // // //   },

// // // //   async findById(req, res) {
// // // //     try {
// // // //       const inmueble = await Inmueble.findByPk(req.params.id);
// // // //       if (!inmueble) return res.status(404).json({ error: 'No encontrado' });
// // // //       res.json(inmueble);
// // // //     } catch (error) {
// // // //       res.status(500).json({ error: error.message });
// // // //     }
// // // //   },

// // // //   async update(req, res) {
// // // //     try {
// // // //       const [updated] = await Inmueble.update(req.body, {
// // // //         where: { Inmueble_id: req.params.id }
// // // //       });
// // // //       if (!updated) return res.status(404).json({ error: 'No encontrado' });
// // // //       const inmueble = await Inmueble.findByPk(req.params.id);
// // // //       res.json(inmueble);
// // // //     } catch (error) {
// // // //       res.status(400).json({ error: error.message });
// // // //     }
// // // //   },

// // // //   async delete(req, res) {
// // // //     try {
// // // //       const deleted = await Inmueble.destroy({
// // // //         where: { Inmueble_id: req.params.id }
// // // //       });
// // // //       if (!deleted) return res.status(404).json({ error: 'No encontrado' });
// // // //       res.json({ message: 'Inmueble eliminado' });
// // // //     } catch (error) {
// // // //       res.status(500).json({ error: error.message });
// // // //     }
// // // //   },


// // // // };

// // // // module.exports = InmuebleController;



// const db = require('../models');
// const Inmueble = db.Inmueble;
// const Direccion = db.Direccion;
// const ImagenesInmueble = db.ImagenesInmueble;
// const Division = db.Division;
// const AcercaEdificacion = db.AcercaEdificacion;
// const OtrasCaracteristicas = db.OtrasCaracteristicas;
// const TipoEdificacion = db.TipoEdificacion;
// const Asignacion = db.Asignacion;
// const OrganizacionParqueadero = db.OrganizacionParqueadero;

// // Relaciones para dirección
// const BarrioCiudadCorregimientoVereda = db.BarrioCiudadCorregimientoVereda;
// const Barrio = db.Barrio;
// const Ciudad = db.Ciudad;
// const Corregimiento = db.Corregimiento;
// const Vereda = db.Vereda;
// const Municipio = db.Municipio;
// const DesignadorCardinal = db.DesignadorCardinal;
// const Localizacion = db.Localizacion;
// const Ndap = db.Ndap;

// const InmuebleController = {
//   async create(req, res) {
//     try {
//       const inmueble = await Inmueble.create(req.body);
//       res.status(201).json(inmueble);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   // Crear inmueble con relaciones anidadas y sub-relaciones
//   async crearInmuebleAnidado(req, res) {
//     const t = await Inmueble.sequelize.transaction();
//     try {
//       // --- Sub-relaciones para Direccion ---
//       // 1. barrio, ciudad, corregimiento, vereda
//       let barrioId = null, ciudadId = null, corregimientoId = null, veredaId = null;
//       if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.barrio) {
//         const [barrio] = await Barrio.findOrCreate({
//           where: req.body.direccion.barrio_ciudad_corregimiento_vereda.barrio,
//           transaction: t
//         });
//         barrioId = barrio.Barrio_id;
//       }
//       if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.ciudad) {
//         const [ciudad] = await Ciudad.findOrCreate({
//           where: req.body.direccion.barrio_ciudad_corregimiento_vereda.ciudad,
//           transaction: t
//         });
//         ciudadId = ciudad.Ciudad_id;
//       }
//       if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.corregimiento) {
//         const [corregimiento] = await Corregimiento.findOrCreate({
//           where: req.body.direccion.barrio_ciudad_corregimiento_vereda.corregimiento,
//           transaction: t
//         });
//         corregimientoId = corregimiento.Corregimiento_id;
//       }
//       if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.vereda) {
//         const [vereda] = await Vereda.findOrCreate({
//           where: req.body.direccion.barrio_ciudad_corregimiento_vereda.vereda,
//           transaction: t
//         });
//         veredaId = vereda.Vereda_id;
//       }

//       // 2. barrio_ciudad_corregimiento_vereda
//       let bccvId = null;
//       if (
//         barrioId || ciudadId || corregimientoId || veredaId
//       ) {
//         const [bccv] = await BarrioCiudadCorregimientoVereda.findOrCreate({
//           where: {
//             Barrio_FK: barrioId,
//             Ciudad_FK: ciudadId,
//             Corregimiento_FK: corregimientoId,
//             Vereda_FK: veredaId
//           },
//           transaction: t
//         });
//         bccvId = bccv.Barrio_ciudad_corregimiento_vereda_id;
//       }

//       // 3. municipio
//       let municipioId = null;
//       if (req.body.direccion?.municipio) {
//         const [municipio] = await Municipio.findOrCreate({
//           where: req.body.direccion.municipio,
//           transaction: t
//         });
//         municipioId = municipio.Municipio_id;
//       }

//       // 4. designador_cardinal
//       let designadorCardinalId = null;
//       if (req.body.direccion?.designador_cardinal) {
//         const [designadorCardinal] = await DesignadorCardinal.findOrCreate({
//           where: req.body.direccion.designador_cardinal,
//           transaction: t
//         });
//         designadorCardinalId = designadorCardinal.Designador_cardinal_id;
//       }

//       // 5. localizacion
//       let localizacionId = null;
//       if (req.body.direccion?.localizacion) {
//         const [localizacion] = await Localizacion.findOrCreate({
//           where: req.body.direccion.localizacion,
//           transaction: t
//         });
//         localizacionId = localizacion.Localizacion_id;
//       }

//       // 6. ndap
//       let ndapId = null;
//       if (req.body.direccion?.ndap) {
//         const [ndap] = await Ndap.findOrCreate({
//           where: req.body.direccion.ndap,
//           transaction: t
//         });
//         ndapId = ndap.Ndap_id;
//       }

//       // 7. Direccion
//       const [direccion] = await Direccion.findOrCreate({
//         where: {
//           ...req.body.direccion,
//           Barrio_ciudad_corregimiento_vereda_FK: bccvId,
//           Municipio_FK: municipioId,
//           Designador_cardinal_FK: designadorCardinalId,
//           Localizacion_FK: localizacionId,
//           Ndap_FK: ndapId
//         },
//         transaction: t
//       });

//       // Imagenes
//       const [imagenes] = await ImagenesInmueble.findOrCreate({
//         where: req.body.imagenes_inmueble,
//         transaction: t
//       });

//       // Division
//       const [division] = await Division.findOrCreate({
//         where: req.body.division,
//         transaction: t
//       });

//       // Acerca Edificacion
//       const [acercaEdificacion] = await AcercaEdificacion.findOrCreate({
//         where: req.body.acerca_edificacion,
//         transaction: t
//       });

//       // --- Otras Caracteristicas y sus sub-relaciones ---
//       let asignacionId = null;
//       let organizacionParqueaderoId = null;

//       if (req.body.otras_caracteristicas?.asignacion) {
//         const [asignacion] = await Asignacion.findOrCreate({
//           where: req.body.otras_caracteristicas.asignacion,
//           transaction: t
//         });
//         asignacionId = asignacion.Asignacion_id;
//       }

//       if (req.body.otras_caracteristicas?.organizacion_parqueadero) {
//         const [orgParqueadero] = await OrganizacionParqueadero.findOrCreate({
//           where: req.body.otras_caracteristicas.organizacion_parqueadero,
//           transaction: t
//         });
//         organizacionParqueaderoId = orgParqueadero.Organizacion_parqueadero_id;
//       }

//       const [otrasCaracteristicas] = await OtrasCaracteristicas.findOrCreate({
//         where: {
//           ...req.body.otras_caracteristicas,
//           Asignacion_FK: asignacionId,
//           Organizacion_parqueadero_FK: organizacionParqueaderoId
//         },
//         transaction: t
//       });

//       // Tipo Edificacion
//       const [tipoEdificacion] = await TipoEdificacion.findOrCreate({
//         where: req.body.tipo_edificacion,
//         transaction: t
//       });

//       // Crear el inmueble usando los IDs de las relaciones
//       const inmueble = await Inmueble.create({
//         ...req.body,
//         Direccion_FK: direccion.Direccion_id,
//         Imagenes_inmueble_FK: imagenes.Imagenes_inmueble_id,
//         Division_FK: division.Division_id,
//         Acerca_edificacion_FK: acercaEdificacion.Acerca_edificacion_id,
//         Otras_caracteristicas_FK: otrasCaracteristicas.Otras_caracteristicas_id,
//         Tipo_edificacion_FK: tipoEdificacion.Tipo_edificacion_id
//       }, { transaction: t });

//       await t.commit();
//       res.status(201).json(inmueble);
//     } catch (error) {
//       await t.rollback();
//       res.status(400).json({ error: error.message });
//     }
//   },

//   async findAll(req, res) {
//     try {
//       const inmuebles = await Inmueble.findAll();
//       res.json(inmuebles);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async findById(req, res) {
//     try {
//       const inmueble = await Inmueble.findByPk(req.params.id);
//       if (!inmueble) return res.status(404).json({ error: 'No encontrado' });
//       res.json(inmueble);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async update(req, res) {
//     try {
//       const [updated] = await Inmueble.update(req.body, {
//         where: { Inmueble_id: req.params.id }
//       });
//       if (!updated) return res.status(404).json({ error: 'No encontrado' });
//       const inmueble = await Inmueble.findByPk(req.params.id);
//       res.json(inmueble);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   async delete(req, res) {
//     try {
//       const deleted = await Inmueble.destroy({
//         where: { Inmueble_id: req.params.id }
//       });
//       if (!deleted) return res.status(404).json({ error: 'No encontrado' });
//       res.json({ message: 'Inmueble eliminado' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// };

// module.exports = InmuebleController;

const db = require('../models');
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

const InmuebleController = {
  async create(req, res) {
    try {
      const inmueble = await Inmueble.create(req.body);
      res.status(201).json(inmueble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Crear inmueble con relaciones anidadas y sub-relaciones
  async crearInmuebleAnidado(req, res) {
    const t = await Inmueble.sequelize.transaction();
    try {
      // 1. Ndap
      let ndapId = null;
      if (req.body.direccion?.ndap) {
        const [ndap] = await Ndap.findOrCreate({
          where: req.body.direccion.ndap,
          transaction: t
        });
        ndapId = ndap.Ndap_id;
      }

      // 2. Municipio (con FK a Ndap)
      let municipioId = null;
      if (req.body.direccion?.municipio) {
        const [municipio] = await Municipio.findOrCreate({
          where: {
            ...req.body.direccion.municipio,
            Ndap_FK: ndapId
          },
          transaction: t
        });
        municipioId = municipio.Municipio_id;
      }

      // // 3. Barrio, Ciudad, Corregimiento, Vereda (todas con FK a Municipio)
      // let barrioId = null, ciudadId = null, corregimientoId = null, veredaId = null;
      // if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.barrio) {
      //   const [barrio] = await Barrio.findOrCreate({
      //     where: {
      //       ...req.body.direccion.barrio_ciudad_corregimiento_vereda.barrio,
      //       Municipio_FK: municipioId
      //     },
      //     transaction: t
      //   });
      //   barrioId = barrio.Barrio_id;
      // }
      // if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.ciudad) {
      //   const [ciudad] = await Ciudad.findOrCreate({
      //     where: {
      //       ...req.body.direccion.barrio_ciudad_corregimiento_vereda.ciudad,
      //       Municipio_FK: municipioId
      //     },
      //     transaction: t
      //   });
      //   ciudadId = ciudad.Ciudad_id;
      // }
      // if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.corregimiento) {
      //   const [corregimiento] = await Corregimiento.findOrCreate({
      //     where: {
      //       ...req.body.direccion.barrio_ciudad_corregimiento_vereda.corregimiento,
      //       Municipio_FK: municipioId
      //     },
      //     transaction: t
      //   });
      //   corregimientoId = corregimiento.Corregimiento_id;
      // }
      // if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.vereda) {
      //   const [vereda] = await Vereda.findOrCreate({
      //     where: {
      //       ...req.body.direccion.barrio_ciudad_corregimiento_vereda.vereda,
      //       Municipio_FK: municipioId
      //     },
      //     transaction: t
      //   });
      //   veredaId = vereda.Vereda_id;
      // }

      // 3. Barrio, Ciudad, Corregimiento, Vereda (solo ciudad, corregimiento y vereda con FK a Municipio)
      let barrioId = null, ciudadId = null, corregimientoId = null, veredaId = null;
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.barrio) {
        const [barrio] = await Barrio.findOrCreate({
          where: req.body.direccion.barrio_ciudad_corregimiento_vereda.barrio,
          transaction: t
        });
        barrioId = barrio.Barrio_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.ciudad) {
        const [ciudad] = await Ciudad.findOrCreate({
          where: {
            ...req.body.direccion.barrio_ciudad_corregimiento_vereda.ciudad,
            Municipio_FK: municipioId
          },
          transaction: t
        });
        ciudadId = ciudad.Ciudad_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.corregimiento) {
        const [corregimiento] = await Corregimiento.findOrCreate({
          where: {
            ...req.body.direccion.barrio_ciudad_corregimiento_vereda.corregimiento,
            Municipio_FK: municipioId
          },
          transaction: t
        });
        corregimientoId = corregimiento.Corregimiento_id;
      }
      if (req.body.direccion?.barrio_ciudad_corregimiento_vereda?.vereda) {
        const [vereda] = await Vereda.findOrCreate({
          where: {
            ...req.body.direccion.barrio_ciudad_corregimiento_vereda.vereda,
            Municipio_FK: municipioId
          },
          transaction: t
        });
        veredaId = vereda.Vereda_id;
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

      // 5. Localizacion
      let localizacionId = null;
      if (req.body.direccion?.localizacion) {
        const [localizacion] = await Localizacion.findOrCreate({
          where: req.body.direccion.localizacion,
          transaction: t
        });
        localizacionId = localizacion.Localizacion_id;
      }

      // 6. DesignadorCardinal
      let designadorCardinalId = null;
      if (req.body.direccion?.designador_cardinal) {
        const [designadorCardinal] = await DesignadorCardinal.findOrCreate({
          where: req.body.direccion.designador_cardinal,
          transaction: t
        });
        designadorCardinalId = designadorCardinal.Designador_cardinal_id;
      }

      // 7. Direccion
      const [direccion] = await Direccion.findOrCreate({
        where: {
          ...req.body.direccion,
          Barrio_ciudad_corregimiento_vereda_FK: bccvId,
          Municipio_FK: municipioId,
          Ndap_FK: ndapId,
          Localizacion_FK: localizacionId,
          Designador_cardinal_FK: designadorCardinalId
        },
        transaction: t
      });

      // Imagenes
      const [imagenes] = await ImagenesInmueble.findOrCreate({
        where: req.body.imagenes_inmueble,
        transaction: t
      });

      // Division
      const [division] = await Division.findOrCreate({
        where: req.body.division,
        transaction: t
      });

      // Acerca Edificacion
      const [acercaEdificacion] = await AcercaEdificacion.findOrCreate({
        where: req.body.acerca_edificacion,
        transaction: t
      });

      // --- Otras Caracteristicas y sus sub-relaciones ---
      // 1. OrganizacionParqueadero
      let organizacionParqueaderoId = null;
      if (req.body.otras_caracteristicas?.organizacion_parqueadero) {
        const [orgParqueadero] = await OrganizacionParqueadero.findOrCreate({
          where: req.body.otras_caracteristicas.organizacion_parqueadero,
          transaction: t
        });
        organizacionParqueaderoId = orgParqueadero.Organizacion_parqueadero_id;
      }

      // 2. Asignacion
      let asignacionId = null;
      if (req.body.otras_caracteristicas?.asignacion) {
        const [asignacion] = await Asignacion.findOrCreate({
          where: req.body.otras_caracteristicas.asignacion,
          transaction: t
        });
        asignacionId = asignacion.Asignacion_id;
      }

      // 3. OtrasCaracteristicas
      const [otrasCaracteristicas] = await OtrasCaracteristicas.findOrCreate({
        where: {
          ...req.body.otras_caracteristicas,
          Asignacion_FK: asignacionId,
          Organizacion_parqueadero_FK: organizacionParqueaderoId
        },
        transaction: t
      });

      // Tipo Edificacion
      const [tipoEdificacion] = await TipoEdificacion.findOrCreate({
        where: req.body.tipo_edificacion,
        transaction: t
      });

      // Crear el inmueble usando los IDs de las relaciones
      const inmueble = await Inmueble.create({
        ...req.body,
        Direccion_FK: direccion.Direccion_id,
        Imagenes_inmueble_FK: imagenes.Imagenes_inmueble_id,
        Division_FK: division.Division_id,
        Acerca_edificacion_FK: acercaEdificacion.Acerca_edificacion_id,
        Otras_caracteristicas_FK: otrasCaracteristicas.Otras_caracteristicas_id,
        Tipo_edificacion_FK: tipoEdificacion.Tipo_edificacion_id
      }, { transaction: t });

      await t.commit();
      res.status(201).json(inmueble);
    } catch (error) {
      await t.rollback();
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

  async update(req, res) {
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

  async delete(req, res) {
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
};

module.exports = InmuebleController;