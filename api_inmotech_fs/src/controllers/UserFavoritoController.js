const db = require('../models');
const UserFavorito = db.UserFavorito;
const PlatformUser = db.PlatformUser;
const Inmueble = db.Inmueble;

const UserFavoritoController = {
  // ✅ Verificar si un inmueble es favorito para un usuario
  async esFavorito(req, res) {
    try {
      const { userId, inmuebleId } = req.params;
      
      const favorito = await UserFavorito.findOne({
        where: {
          Platform_user_FK: userId,
          Inmueble_FK: inmuebleId,
          Activo: true
        }
      });

      res.json({
        success: true,
        es_favorito: !!favorito,
        favorito_id: favorito?.User_favorito_id || null
      });
    } catch (error) {
      console.error('Error al verificar favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ Toggle favorito para un usuario específico
  async toggleFavorito(req, res) {
    try {
      const { userId, inmuebleId } = req.params;
      
      console.log(`🎯 Toggle favorito - Usuario: ${userId}, Inmueble: ${inmuebleId}`);

      // Verificar que el usuario existe
      const usuario = await PlatformUser.findByPk(userId);
      if (!usuario) {
        return res.status(404).json({
          error: 'Usuario no encontrado',
          mensaje: `No se encontró usuario con ID ${userId}`
        });
      }

      // Verificar que el inmueble existe
      const inmueble = await Inmueble.findByPk(inmuebleId);
      if (!inmueble) {
        return res.status(404).json({
          error: 'Inmueble no encontrado',
          mensaje: `No se encontró inmueble con ID ${inmuebleId}`
        });
      }

      // Buscar si ya existe la relación
      const favoritoExistente = await UserFavorito.findOne({
        where: {
          Platform_user_FK: userId,
          Inmueble_FK: inmuebleId
        }
      });

      let mensaje, esFavorito;

      if (favoritoExistente) {
        // Si existe, toggle el estado Activo
        const nuevoEstado = !favoritoExistente.Activo;
        await favoritoExistente.update({
          Activo: nuevoEstado,
          Fecha_agregado: new Date() // Actualizar fecha
        });
        
        esFavorito = nuevoEstado;
        mensaje = nuevoEstado 
          ? 'Inmueble agregado a favoritos' 
          : 'Inmueble removido de favoritos';
      } else {
        // Si no existe, crear nuevo favorito
        await UserFavorito.create({
          Platform_user_FK: userId,
          Inmueble_FK: inmuebleId,
          Activo: true
        });
        
        esFavorito = true;
        mensaje = 'Inmueble agregado a favoritos';
      }

      console.log(`✅ ${mensaje} - Usuario: ${userId}, Inmueble: ${inmuebleId}`);

      res.json({
        success: true,
        mensaje,
        es_favorito: esFavorito,
        usuario_id: userId,
        inmueble_id: inmuebleId
      });

    } catch (error) {
      console.error('Error al toggle favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ Obtener todos los favoritos de un usuario
  async getFavoritosUsuario(req, res) {
    try {
      const { userId } = req.params;

      const favoritos = await UserFavorito.findAll({
        where: {
          Platform_user_FK: userId,
          Activo: true
        },
        include: [
          {
            model: Inmueble,
            as: 'inmueble',
            include: [
              { model: db.Direccion },
              { model: db.Division, as: 'division' },
              { model: db.ImagenesInmueble }
            ]
          }
        ],
        order: [['Fecha_agregado', 'DESC']]
      });

      const inmueblesFavoritos = favoritos.map(fav => ({
        ...fav.inmueble.dataValues,
        fecha_favorito: fav.Fecha_agregado,
        favorito_id: fav.User_favorito_id
      }));

      res.json({
        success: true,
        count: favoritos.length,
        mensaje: `${favoritos.length} inmuebles favoritos encontrados`,
        data: inmueblesFavoritos
      });

    } catch (error) {
      console.error('Error al obtener favoritos del usuario:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ Obtener inmuebles con estado de favorito para un usuario
  async getInmueblesConFavoritos(req, res) {
    try {
      const { userId } = req.params;

      const inmuebles = await Inmueble.findAll({
        include: [
          {
            model: db.Direccion,
            include: [{ model: db.Localizacion }]
          },
          { model: db.Division, as: 'division' },
          { model: db.ImagenesInmueble },
          {
            model: UserFavorito,
            as: 'usuariosFavoritos',
            where: { Platform_user_FK: userId, Activo: true },
            required: false // LEFT JOIN - incluir inmuebles aunque no sean favoritos
          }
        ],
        order: [['Fecha_publicacion', 'DESC']]
      });

      const inmueblesConFavoritos = inmuebles.map(inmueble => ({
        ...inmueble.dataValues,
        es_favorito: inmueble.usuariosFavoritos && inmueble.usuariosFavoritos.length > 0,
        favorito_id: inmueble.usuariosFavoritos?.[0]?.User_favorito_id || null
      }));

      res.json({
        success: true,
        count: inmuebles.length,
        data: inmueblesConFavoritos
      });

    } catch (error) {
      console.error('Error al obtener inmuebles con favoritos:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  },

  // ✅ Eliminar favorito específico
  async eliminarFavorito(req, res) {
    try {
      const { userId, inmuebleId } = req.params;

      const resultado = await UserFavorito.update(
        { Activo: false },
        {
          where: {
            Platform_user_FK: userId,
            Inmueble_FK: inmuebleId,
            Activo: true
          }
        }
      );

      if (resultado[0] === 0) {
        return res.status(404).json({
          error: 'Favorito no encontrado',
          mensaje: 'No se encontró el favorito para eliminar'
        });
      }

      res.json({
        success: true,
        mensaje: 'Favorito eliminado exitosamente'
      });

    } catch (error) {
      console.error('Error al eliminar favorito:', error);
      res.status(500).json({
        error: 'Error interno del servidor',
        mensaje: error.message
      });
    }
  }
};

module.exports = UserFavoritoController;