const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require('../config/database');
const allRoutes = require('./routes/index');

const app = express();

// Configurar CORS para permitir peticiones desde el frontend
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());

app.use(
  '/assets/images/inmuebles',
  express.static(
    path.resolve(__dirname, '../../plataforma/src/assets/images/inmuebles')
  )
);

app.use(
  '/assets/images/sobrenosotros',
  express.static(
    path.resolve(__dirname, '../../plataforma/src/assets/images/sobrenosotros')
  )
);

app.use(
  '/assets/images/carrusel',
  express.static(
    path.resolve(__dirname, '../../plataforma/src/assets/images/carrusel')
  )
);

// console.log('Sirviendo imágenes desde:', path.resolve(__dirname, '../../plataforma/src/assets/images/sobrenosotros'));

app.use('/', allRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('¡Conexión a la base de datos establecida!');
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
});