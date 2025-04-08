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

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;