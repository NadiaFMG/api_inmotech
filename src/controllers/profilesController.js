import profile from '../models/profile.js';

// Obtener todos los perfiles
export async function getAllProfiles(req, res) {
    try {
        const allProfiles = await profile.findAll();
        res.json(allProfiles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener un perfil por ID
export async function getProfileById(req, res) {
    try {
        const profileItem = await profile.findByPk(req.params.id);
        if (profileItem) {
            res.json(profileItem);
        } else {
            res.status(404).json({ message: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Crear un nuevo perfil
export async function createProfile(req, res) {
    try {
        const newProfile = await profile.create(req.body);
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Actualizar un perfil
export async function updateProfile(req, res) {
  try {
    const updatedProfile = await profile.update(req.body, {
      where: { Profile_id: req.params.id },
    });
    if (updatedProfile[0]) {
      res.json({ message: 'Perfil actualizado' });
    } else {
      res.status(404).json({ message: 'Perfil no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Eliminar un perfil
export async function deleteProfile(req, res) {
    try {
        const deletedProfile = await profile.destroy({
            where: { Profile_id: req.params.id },
        });
        if (deletedProfile) {
            res.json({ message: 'Perfil eliminado' });
        } else {
        res.status(404).json({ message: 'Perfil no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}