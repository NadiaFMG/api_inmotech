import express from 'express';
import apiUsersRoutes from './routes/api_users.js'
import userStatusRoutes from './routes/user_status.js';
import usersRoutes from './routes/users.js';
import profileRoutes from './routes/profile.js';
import roleRoutes from './routes/role.js'
import moduleRoleRoutes from './routes/module_role.js';
import moduleRoutes from './routes/module.js';
import permitionsModuleRoleRoutes from './routes/permitions_module_role.js';
import permitionsRoutes from './routes/permitions.js';
import login from './routes/login.js';

//!estos son nuevos
import acercaEdificacionRoutes from './routes/acerca_edificacion.js';
import AsignacionRoutes from './routes/asignacion.js';
import OrganizacionParquederoRoutes from './routes/organizacion_parqueadero.js';
import valor from './routes/valor.js';
import municipio from './routes/municipio.js';
import ndap from './routes/ndap.js';
// import vereda from './routes/vereda.js';

//! las rutas que se van añadir toca verificar como se ve


const app = express();

app.use(express.json());


app.use('/inmotech/api-users', apiUsersRoutes);
app.use('/inmotech/user-status', userStatusRoutes);
app.use('/inmotech/users', usersRoutes);
app.use('/inmotech/profile', profileRoutes);
app.use('/inmotech/role', roleRoutes);
app.use('/inmotech/module-role', moduleRoleRoutes);
app.use('/inmotech/module', moduleRoutes);
app.use('/inmotech/permitions-module-role', permitionsModuleRoleRoutes);
app.use('/inmotech/permitions', permitionsRoutes);
app.use('/inmotech/login', login);

//! estos son nuevos
app.use('/acerca_edificacion', acercaEdificacionRoutes);
app.use('/asignacion', AsignacionRoutes);
app.use('/organizacion_parqueadero', OrganizacionParquederoRoutes);
app.use('/valor', valor);
app.use('/municipio', municipio);
app.use('/ndap', ndap);
// app.use('/vereda', vereda);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;