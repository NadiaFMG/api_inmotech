// routes/index.js
const express = require('express');
const router = express.Router();

//! la ruta que esta aqui no sirve para nada, es un ejemplo de como se pueden importar rutas
router.use('/api', require('./apiUserRoutes'));