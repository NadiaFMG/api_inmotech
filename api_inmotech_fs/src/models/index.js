const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize'); // Solo necesitamos Sequelize para DataTypes, no para crear una instancia
const basename = path.basename(__filename);
const db = {};

// *** IMPORTANTE: Importa directamente la instancia de Sequelize ya configurada ***
const sequelize = require('../../config/database'); // Esto carga la instancia 'sequelize' directamente

// *** PASO 1: CARGAR TODOS LOS MODELOS ***
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// *** PASO 2: INICIALIZAR LAS ASOCIACIONES ***
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Añadir las instancias de sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;