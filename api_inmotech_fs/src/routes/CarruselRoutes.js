// const express = require('express');
// const router = express.Router();
// const CarruselController = require('../controllers/CarruselController');

// // Crear
// router.post('/', CarruselController.create);
// // Listar todos
// router.get('/', CarruselController.findAll);
// // Obtener por ID
// router.get('/:id', CarruselController.findById);
// // Actualizar
// router.put('/:id', CarruselController.update);
// // Eliminar
// router.delete('/:id', CarruselController.delete);

// module.exports = router;

const express = require('express');
const router = express.Router();
const CarruselController = require('../controllers/CarruselController');
 const verifyToken = require('../middlewares/verifyToken');

const multer = require('multer');
const path = require('path');

// Configuración de multer para carrusel
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../../plataforma/src/assets/images/carrusel'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta para subir imagen de carrusel
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No se subió ninguna imagen' });
  // Devuelve la ruta relativa para guardar en la base de datos
  res.json({ url: `/assets/images/carrusel/${req.file.filename}` });
});

// Crear
router.post('/', verifyToken, CarruselController.create);
// Listar todos
router.get('/', verifyToken, CarruselController.findAll);
// Obtener por ID
router.get('/:id', verifyToken, CarruselController.findById);
// Actualizar
router.put('/:id', verifyToken, CarruselController.update);
// Eliminar
router.delete('/:id', verifyToken, CarruselController.delete);

module.exports = router;
