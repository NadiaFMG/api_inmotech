import express from 'express';
import userStatusRoutes from './routes/user_status.js';
import usersRoutes from './routes/users.js';
import profileRoutes from './routes/profile.js';
import roleRoutes from './routes/role.js'
import moduleRoleRoutes from './routes/module_role.js';
import moduleRoutes from './routes/module.js';
import permitionsModuleRoleRoutes from './routes/permitions_module_role.js';
import permitionsRoutes from './routes/permitions.js';
import login from './routes/login.js';
import acercaEdificacionRoutes from './routes/acerca_edificacion.js';
import AsignacionRoutes from './routes/asignacion.js';
import OrganizacionParquederoRoutes from './routes/organizacion_parqueadero.js';

const app = express();

app.use(express.json());

app.use('/user-status', userStatusRoutes);
app.use('/users', usersRoutes);
app.use('/profile', profileRoutes);
app.use('/role', roleRoutes);
app.use('/modul-role', moduleRoleRoutes);
app.use('/module', moduleRoutes);
app.use('/permitions-module-role', permitionsModuleRoleRoutes);
app.use('/permitions', permitionsRoutes);
app.use('/login', login);
app.use('/acerca_edificacion', acercaEdificacionRoutes);
app.use('/asignacion', AsignacionRoutes);
app.use('/organizacion_parqueadero', OrganizacionParquederoRoutes);


// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;