import app from './src/app.js';
import sequelize from './src/database/index.js';
import 'dotenv/config';
// import { Sequelize } from 'sequelize';
// const config = require('./config/config.json');

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincroniza los modelos con la base de datos (opcional en producción)
    // await sequelize.sync({ force: false }); // Usar { force: true } borra y recrea las tablas

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}

main();


// // Importa y define tus modelos aquí
// // const users = require('./src/models/users')(sequelize, Sequelize);
// // const roles = require('./src/models/role')(sequelize, Sequelize);
// // const profiles = require('./src/models/profile')(sequelize, Sequelize);
// // const permitions = require('./src/models/permitions')(sequelize, Sequelize);
// // const modules = require('./src/models/modules')(sequelize, Sequelize);
// // const module_role = require('./src/models/module_role')(sequelize, Sequelize);
// // const permitions_module_role = require('./src/models/permitions_module_role')(sequelize, Sequelize);
// const user_status = require('./src/models/user_status')(sequelize, Sequelize);


// const port = process.env.PORT || 3000;

// sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`Servidor corriendo en el puerto ${port}`);
//   });
// });

// export {
//   sequelize,
//   // users,
//   // roles,
//   // profiles,
//   // permitions,
//   // modules,
//   // module_role, // Renombra moduleRole a module_role
//   // permitions_module_role, // Renombra permitionsModuleRole a permitions_module_role
//   user_status, // Renombra userStatus a user_status
// };