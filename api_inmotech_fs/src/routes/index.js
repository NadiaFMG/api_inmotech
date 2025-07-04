// // routes/index.js
// const express = require('express');
// const router = express.Router();

// //! la ruta que esta aqui no sirve para nada, es un ejemplo de como se pueden importar rutas
// router.use('/api', require('./apiUserRoutes'));

const express = require('express');
const router = express.Router();

// Ejemplo: router.use('/api/barrio', require('./BarrioRoutes'));
router.use('/api/acercaedificacion', require('./AcercaEdificacionRoutes'));
router.use('/api/asignacion', require('./AsignacionRoutes'));
router.use('/api/barriociudadcorregimientovereda', require('./BarrioCiudadCorregimientoVeredaRoutes'));
router.use('/api/barrio', require('./BarrioRoutes'));
router.use('/api/ciudad', require('./CiudadRoutes'));
router.use('/api/corregimiento', require('./CorregimientoRoutes'));
router.use('/api/designadorcardinal', require('./DesignadorCardinalRoutes'));
router.use('/api/direccion', require('./DireccionRoutes'));
router.use('/api/division', require('./DivisionRoutes'));
router.use('/api/estadopago', require('./EstadoPagoRoutes'));
router.use('/api/factura', require('./FacturaRoutes'));
router.use('/api/fc5', require('./fc5Routes'));
router.use('/api/imagenesinmueble', require('./ImagenesInmuebleRoutes'));
router.use('/api/impuesto', require('./ImpuestoRoutes'));
router.use('/api/impuestovalor', require('./ImpuestoValorRoutes'));
router.use('/api/inmueble', require('./InmuebleRoutes'));
router.use('/api/localizacion', require('./LocalizacionRoutes'));
router.use('/api/modulerole', require('./ModuleRoleRoutes'));
router.use('/api/module', require('./ModuleRoutes'));
router.use('/api/municipio', require('./MunicipioRoutes'));
router.use('/api/ndap', require('./NdapRoutes'));
router.use('/api/organizacionparqueadero', require('./OrganizacionParqueaderoRoutes'));
router.use('/api/otrascaracteristicas', require('./OtrasCaracteristicasRoutes'));
router.use('/api/pago', require('./PagoRoutes'));
router.use('/api/permitionsmodulerole', require('./PermitionsModuleRole'));
router.use('/api/permitions', require('./PermitionsRoutes'));
router.use('/api/platformidentitydocument', require('./PlatformIdentityDocumentRoutes'));
router.use('/api/platformmodulerole', require('./PlatformModuleRoleRoutes'));
router.use('/api/platformmodule', require('./PlatformModuleRoutes'));
router.use('/api/platformpermitionsmodulerole', require('./PlatformPermitionsModuleRoleRoutes'));
router.use('/api/platformpermitions', require('./PlatformPermitionsRoutes'));
router.use('/api/platformprofile', require('./PlatformProfileRoutes'));
router.use('/api/platformrole', require('./PlatformRoleRoutes'));
router.use('/api/platformuser', require('./PlatformUserRoutes'));
router.use('/api/platformuserstatus', require('./PlatformUserStatusRoutes'));
router.use('/api/resolucionfactura', require('./ResolucionFacturaRoutes'));
router.use('/api/retenedoriva', require('./RetenedorIvaRoutes'));
router.use('/api/role', require('./RoleRoutes'));
router.use('/api/suscripcion', require('./SuscripcionRoutes'));
router.use('/api/tipoedificacion', require('./TipoEdificacionRoutes'));
router.use('/api/users', require('./UsersRoutes'));
router.use('/api/userstatus', require('./UserStatusRoutes'));
router.use('/api/valor', require('./ValorRoutes'));
router.use('/api/vereda', require('./VeredaRoutes'));

module.exports = router;