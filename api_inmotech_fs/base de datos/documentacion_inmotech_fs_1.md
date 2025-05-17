# 📄 Documentación del Modelo de Base de Datos: Gestión de Usuarios, Roles, Módulos y Permisos (API de Usuarios)

## Tablas principales

### 1. `role`
Define los roles del sistema (ejemplo: Admin, Usuario, Invitado).
- **Role_id**: Clave primaria, autoincremental.
- **Role_name**: Nombre del rol.
- **Role_description**: Descripción del rol.
- **Role_status**: Estado del rol (1=activo, 0=inactivo).
- **Role_priority**: Prioridad o jerarquía del rol.
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 2. `user_status`
Estados posibles de un usuario (ejemplo: Activo, Inactivo, Suspendido).
- **User_status_id**: Clave primaria, autoincremental.
- **User_status_name**: Nombre del estado.
- **User_status_description**: Descripción del estado.
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 3. `users`
Usuarios registrados en el sistema.
- **User_id**: Clave primaria, autoincremental.
- **User_user**: Nombre de usuario o correo.
- **User_password**: Contraseña (hash).
- **User_status_FK**: Clave foránea a `user_status`.
- **Role_FK**: Clave foránea a `role`.
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 4. `module`
Módulos o secciones funcionales del sistema.
- **Module_id**: Clave primaria, autoincremental.
- **Module_name**: Nombre del módulo.
- **Module_route**: Ruta o endpoint asociado.
- **Module_description**: Descripción del módulo.
- **Module_icon**: Icono para la interfaz.
- **Module_status**: Estado del módulo (1=activo, 0=inactivo).
- **Module_order**: Orden de aparición.
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 5. `permitions`
Permisos específicos que se pueden asignar (ejemplo: crear, editar, eliminar).
- **Permitions_id**: Clave primaria, autoincremental.
- **Permitions_name**: Nombre del permiso.
- **Permitions_description**: Descripción del permiso.
- **Permitions_status**: Estado del permiso (1=activo, 0=inactivo).
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 6. `module_role`
Relación entre módulos y roles (qué rol puede acceder a qué módulo).
- **Module_role_id**: Clave primaria, autoincremental.
- **Module_FK**: Clave foránea a `module`.
- **Role_FK**: Clave foránea a `role`.
- **Module_role_status**: Estado de la relación.
- **Created_at / Updated_at**: Fechas de auditoría.

---

### 7. `permitions_module_role`
Relación entre permisos, módulos y roles (qué permiso tiene un rol en un módulo).
- **Permitions_module_role_id**: Clave primaria, autoincremental.
- **Module_role_FK**: Clave foránea a `module_role`.
- **Permitions_FK**: Clave foránea a `permitions`.
- **Permitions_module_role_status**: Estado de la relación.
- **Created_at / Updated_at**: Fechas de auditoría.

---

## Relaciones y restricciones (solo API de usuarios)

- **users** → **user_status**: Un usuario tiene un estado.
- **users** → **role**: Un usuario tiene un rol.
- **module_role** → **module**: Relaciona un módulo con un rol.
- **module_role** → **role**: Relaciona un rol con un módulo.
- **permitions_module_role** → **module_role**: Relaciona un permiso con una relación módulo-rol.
- **permitions_module_role** → **permitions**: Relaciona un permiso con una relación módulo-rol.

---

## Notas adicionales

- Todas las tablas incluyen campos de auditoría (`Created_at`, `Updated_at`) para trazabilidad.
- Los campos de estado (`*_status`) permiten activar/desactivar registros sin eliminarlos físicamente.
- Las claves foráneas aseguran la integridad referencial entre las tablas.