const express = require('express');
const sequelize = require('../config/database');
const allRoutes = require('./routes/index');

const app = express();

app.use(express.json());
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