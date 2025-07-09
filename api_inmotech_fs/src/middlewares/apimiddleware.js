// const { Module, ModuleRole, Permitions, PermitionsModuleRole } = require('../models');

// async function authorize(req, res, next) {
//   const user = req.user; // Supón que ya tienes el usuario autenticado
//   const roleId = user.Role_FK;
//   const route = req.baseUrl; // Ejemplo: '/api/inmueble'
//   const action = req.method; // 'GET', 'POST', 'PUT', 'DELETE'

//   // 1. Busca el módulo por ruta
//   const module = await Module.findOne({ where: { Module_route: route } });
//   if (!module) return res.status(404).json({ error: 'Módulo no encontrado' });

//   // 2. Verifica si el rol tiene acceso al módulo
//   const moduleRole = await ModuleRole.findOne({ where: { Module_FK: module.Module_id, Role_FK: roleId, Module_role_status: 1 } });
//   if (!moduleRole) return res.status(403).json({ error: 'No tiene acceso a este módulo' });

//   // 3. Busca el permiso correspondiente a la acción
//   let permitionName;
//   switch (action) {
//     case 'GET': permitionName = 'ver'; break;
//     case 'POST': permitionName = 'crear'; break;
//     case 'PUT': permitionName = 'editar'; break;
//     case 'DELETE': permitionName = 'eliminar'; break;
//     default: permitionName = '';
//   }
//   const permition = await Permitions.findOne({ where: { Permitions_name: permitionName } });
//   if (!permition) return res.status(403).json({ error: 'Permiso no definido' });

//   // 4. Verifica si el rol tiene ese permiso en el módulo
//   const permitionModuleRole = await PermitionsModuleRole.findOne({
//     where: {
//       Module_role_FK: moduleRole.Module_role_id,
//       Permitions_FK: permition.Permitions_id,
//       Permitions_module_role_status: 1
//     }
//   });
//   if (!permitionModuleRole) return res.status(403).json({ error: 'No tiene permiso para esta acción' });

//   // Si todo OK, sigue
//   next();
// }

// // ///////////////////////////////////////////////////////
// // const authorize = require('../middlewares/authorize');

// // router.get('/', authorize, controller.findAll);
// // router.post('/', authorize, controller.create);
// // // etc.