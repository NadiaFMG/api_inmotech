// const db = require('../models');
// const PlatformProfile = db.PlatformProfile;

// const PlatformProfileController = {
//   async create(req, res) {
//     try {
//       const profile = await PlatformProfile.create(req.body);
//       res.status(201).json(profile);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   async findAll(req, res) {
//     try {
//       const profiles = await PlatformProfile.findAll();
//       res.json(profiles);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async findById(req, res) {
//     try {
//       const profile = await PlatformProfile.findByPk(req.params.id);
//       if (!profile) return res.status(404).json({ error: 'No encontrado' });
//       res.json(profile);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   async update(req, res) {
//     try {
//       const [updated] = await PlatformProfile.update(req.body, {
//         where: { Platform_profile_id: req.params.id }
//       });
//       if (!updated) return res.status(404).json({ error: 'No encontrado' });
//       const profile = await PlatformProfile.findByPk(req.params.id);
//       res.json(profile);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },

//   async delete(req, res) {
//     try {
//       const deleted = await PlatformProfile.destroy({
//         where: { Platform_profile_id: req.params.id }
//       });
//       if (!deleted) return res.status(404).json({ error: 'No encontrado' });
//       res.json({ message: 'Eliminado correctamente' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// // crear perfil del usuario logueado
//   async createByUser(req, res) {
//     try {
//       const userId = req.body.userId || req.query.userId;
//       if (!userId) {
//         return res.status(400).json({ error: 'Se requiere userId' });
//       }
//       // Verifica si ya existe un perfil para ese usuario
//       const exists = await PlatformProfile.findOne({
//         where: { Platform_user_FK: userId }
//       });
//       if (exists) {
//         return res.status(400).json({ error: 'El perfil ya existe para este usuario' });
//       }
//       // Crea el perfil con Platform_user_FK igual al userId
//       const profile = await PlatformProfile.create({
//         ...req.body,
//         Platform_user_FK: userId
//       });
//       res.status(201).json(profile);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   },
// //perfiles de cada usuario
//   async findByUser(req, res) {
//     try {
//       const userId = req.query.userId || req.body.userId;
//       if (!userId) {
//         return res.status(400).json({ error: 'Se requiere userId' });
//       }
//       // Cambia aquí el nombre del campo
//       const profile = await PlatformProfile.findOne({
//         where: { Platform_user_FK: userId }
//       });
//       if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
//       res.json(profile);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },

//   // Actualizar perfil por userId
//   async updateByUser(req, res) {
//     try {
//       const userId = req.query.userId || req.body.userId;
//       if (!userId) {
//         return res.status(400).json({ error: 'Se requiere userId' });
//       }
//       // Busca el perfil por Platform_user_FK
//       const profile = await PlatformProfile.findOne({
//         where: { Platform_user_FK: userId }
//       });
//       if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });

//       // Actualiza el perfil
//       await profile.update(req.body);
//       res.json(profile);
//     } catch (error) {
//       res.status(400).json({ error: error.message });
//     }
//   }
// };

// module.exports = PlatformProfileController;

const db = require('../models');
const PlatformProfile = db.PlatformProfile;

// Google Cloud Storage
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'inmotechalmacenamiento'; // <-- Cambia esto por el nombre real de tu bucket

const PlatformProfileController = {
  async create(req, res) {
    try {
      const profile = await PlatformProfile.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const profiles = await PlatformProfile.findAll();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findById(req, res) {
    try {
      const profile = await PlatformProfile.findByPk(req.params.id);
      if (!profile) return res.status(404).json({ error: 'No encontrado' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const [updated] = await PlatformProfile.update(req.body, {
        where: { Platform_profile_id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'No encontrado' });
      const profile = await PlatformProfile.findByPk(req.params.id);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await PlatformProfile.destroy({
        where: { Platform_profile_id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'No encontrado' });
      res.json({ message: 'Eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // crear perfil del usuario logueado
  async createByUser(req, res) {
    try {
      const userId = req.body.userId || req.query.userId;
      if (!userId) {
        return res.status(400).json({ error: 'Se requiere userId' });
      }
      // Verifica si ya existe un perfil para ese usuario
      const exists = await PlatformProfile.findOne({
        where: { Platform_user_FK: userId }
      });
      if (exists) {
        return res.status(400).json({ error: 'El perfil ya existe para este usuario' });
      }
      // Crea el perfil con Platform_user_FK igual al userId
      const profile = await PlatformProfile.create({
        ...req.body,
        Platform_user_FK: userId
      });
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // perfiles de cada usuario
  async findByUser(req, res) {
    try {
      const userId = req.query.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: 'Se requiere userId' });
      }
      const profile = await PlatformProfile.findOne({
        where: { Platform_user_FK: userId }
      });
      if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar perfil por userId
  async updateByUser(req, res) {
    try {
      const userId = req.query.userId || req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: 'Se requiere userId' });
      }
      // Busca el perfil por Platform_user_FK
      const profile = await PlatformProfile.findOne({
        where: { Platform_user_FK: userId }
      });
      if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });

      // Actualiza el perfil
      await profile.update(req.body);
      res.json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Subir imagen a Google Cloud Storage y devolver la URL pública
  async uploadProfilePhoto(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

      const blob = storage.bucket(bucketName).file(Date.now() + '_' + req.file.originalname);
      const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: req.file.mimetype,
      });

      blobStream.on('error', err => res.status(500).json({ error: err.message }));

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        res.json({ url: publicUrl });
      });

      blobStream.end(req.file.buffer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = PlatformProfileController;