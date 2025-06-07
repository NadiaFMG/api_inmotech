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
import valor from './routes/valor.js';
import municipio from './routes/municipio.js';
import ndap from './routes/ndap.js';
import vereda from './routes/vereda.js';
import BarrioCiudadCorregimientoVereda from './routes/barrio_ciudad_corregimiento_vereda.js';
import barrio from './routes/barrio.js';
import ciudad from './routes/ciudad.js';
import corregimiento from './routes/corregimiento.js';
import designador_cardinal from './routes/designador_cardinal.js';
import direccion from './routes/direccion.js';
import localizacion from './routes/localizacion.js';
import division from './routes/division.js';
import estado_pago from './routes/estado_pago.js';
import document_identification from './routes/document_identification.js';
import tipoEdificacionRoutes from './routes/tipoEdificacionRoutes.js';
import tipoDocumentoRoutes from './routes/tipoDocumentoRoutes.js'
import imagenesInmuebleRoutes from './routes/imagenesInmuebleRoutes.js';
import resolucionFacturaRoutes from './routes/resolucion_facturaRoutes.js';
import impuestoRoutes from './routes/impuestoRoute.js';


const app = express();

app.use(express.json());

app.use('/user_status', userStatusRoutes);
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
app.use('/valor', valor);
app.use('/municipio', municipio);
app.use('/ndap', ndap);
app.use('/vereda', vereda);
app.use('/barrio_ciudad_corregimiento_vereda', BarrioCiudadCorregimientoVereda);
app.use('/barrio', barrio);
app.use('/ciudad', ciudad);
app.use('/corregimiento', corregimiento);
app.use('/designador_cardinal', designador_cardinal);
app.use('/direccion', direccion);
app.use('/localizacion', localizacion);
app.use('/division', division);
app.use('/estado_pago', estado_pago);
app.use('/document_identification', document_identification);
app.use('/tipo_edificacion', tipoEdificacionRoutes);
app.use('/tipo_documento', tipoDocumentoRoutes);
app.use('/imagenes_inmueble', imagenesInmuebleRoutes);
app.use('/resolucion_factura', resolucionFacturaRoutes); 
app.use('/impuesto', impuestoRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

export default app;






