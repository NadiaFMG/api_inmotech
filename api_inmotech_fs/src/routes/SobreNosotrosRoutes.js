const express = require('express');
const router = express.Router();
const SobreNosotrosController = require('../controllers/SobreNosotrosController');
 const verifyToken = require('../middlewares/verifyToken');

const multer = require('multer');
const path = require('path');

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../plataforma/src/assets/images/sobrenosotros'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta para subir imagen
router.post('/upload', upload.single('imagen'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });
  // Devuelve la ruta relativa para guardar en la base de datos
  res.json({ url: `/assets/images/sobrenosotros/${req.file.filename}` });
});

// Crear
router.post('/', verifyToken, SobreNosotrosController.create);
// Listar todos
router.get('/', verifyToken, SobreNosotrosController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, SobreNosotrosController.findById);
// Actualizar
router.put('/:id', verifyToken, SobreNosotrosController.update);
// Eliminar
router.delete('/:id', verifyToken, SobreNosotrosController.delete);

module.exports = router;
