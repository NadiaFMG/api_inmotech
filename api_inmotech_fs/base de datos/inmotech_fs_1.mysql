-- lo siguiente que esta despues de este comentario es para los usuarios de la api

-- Tabla de roles
CREATE TABLE `role` (
  `Role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Role_name` VARCHAR(50) NOT NULL,
  `Role_description` VARCHAR(255),
  `Role_status` TINYINT(1) DEFAULT 1,
  `Role_priority` INT DEFAULT 0,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de estados de usuario mejorada
CREATE TABLE `user_status` (
  `User_status_id` INT AUTO_INCREMENT PRIMARY KEY,
  `User_status_name` VARCHAR(50) NOT NULL,
  `User_status_description` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de usuarios
CREATE TABLE `users` (
  `User_id` INT AUTO_INCREMENT PRIMARY KEY,
  `User_user` VARCHAR(100) NOT NULL,
  `User_password` VARCHAR(255) NOT NULL,
  `User_status_FK` INT NOT NULL,
  `Role_FK` INT NOT NULL,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de módulos
CREATE TABLE `module` (
  `Module_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Module_name` VARCHAR(50) NOT NULL,
  `Module_route` VARCHAR(100),
  `Module_description` VARCHAR(255),
  `Module_icon` VARCHAR(100),
  `Module_status` TINYINT(1) DEFAULT 1,
  `Module_order` INT DEFAULT 0,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de permisos
CREATE TABLE `permitions` (
  `Permitions_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Permitions_name` VARCHAR(50) NOT NULL,
  `Permitions_description` VARCHAR(255),
  `Permitions_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla module_role
CREATE TABLE `module_role` (
  `Module_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Module_FK` INT NOT NULL,
  `Role_FK` INT NOT NULL,
  `Module_role_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla permitions_module_role
CREATE TABLE `permitions_module_role` (
  `Permitions_module_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Module_role_FK` INT NOT NULL,
  `Permitions_FK` INT NOT NULL,
  `Permitions_module_role_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de roles de la plataforma
CREATE TABLE `platform_role` (
  `Platform_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Role_name` VARCHAR(50) NOT NULL,
  `Role_description` VARCHAR(255),
  `Role_status` TINYINT(1) DEFAULT 1,
  `Role_priority` INT DEFAULT 0,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de estados de usuario de la plataforma
CREATE TABLE `platform_user_status` (
  `Platform_user_status_id` INT AUTO_INCREMENT PRIMARY KEY,
  `User_status_name` VARCHAR(50) NOT NULL,
  `User_status_description` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de usuarios de la plataforma
CREATE TABLE `platform_user` (
  `Platform_user_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Username` VARCHAR(100) NOT NULL,
  `Password` VARCHAR(255) NOT NULL,
  `Platform_user_status_FK` INT NOT NULL,
  `Platform_role_FK` INT NOT NULL,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de módulos de la plataforma
CREATE TABLE `platform_module` (
  `Platform_module_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Module_name` VARCHAR(50) NOT NULL,
  `Module_route` VARCHAR(100),
  `Module_description` VARCHAR(255),
  `Module_icon` VARCHAR(100),
  `Module_status` TINYINT(1) DEFAULT 1,
  `Module_order` INT DEFAULT 0,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de permisos de la plataforma
CREATE TABLE `platform_permitions` (
  `Platform_permitions_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Permitions_name` VARCHAR(50) NOT NULL,
  `Permitions_description` VARCHAR(255),
  `Permitions_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla platform_module_role
CREATE TABLE `platform_module_role` (
  `Platform_module_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Platform_module_FK` INT NOT NULL,
  `Platform_role_FK` INT NOT NULL,
  `Module_role_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla platform_permitions_module_role
CREATE TABLE `platform_permitions_module_role` (
  `Platform_permitions_module_role_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Platform_module_role_FK` INT NOT NULL,
  `Platform_permitions_FK` INT NOT NULL,
  `Permitions_module_role_status` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de perfil de usuario de la plataforma
CREATE TABLE `platform_profile` (
  `Profile_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Profile_name` VARCHAR(20) NOT NULL,
  `Profile_lastname` VARCHAR(30),
  `Profile_phone` VARCHAR(10) NOT NULL,
  `Profile_addres` VARCHAR(30) NOT NULL,
  `Profile_email` VARCHAR(30) NOT NULL,
  `Profile_photo` VARCHAR(256) NOT NULL,
  `Profile_birthdate` DATE,
  `Profile_gender` VARCHAR(10),
  `Profile_national_id` VARCHAR(20),
  `Profile_bio` TEXT,
  `Profile_website` VARCHAR(100),
  `Profile_social` VARCHAR(100),
  `Platform_user_FK` INT NOT NULL UNIQUE,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla documento de identidad
CREATE TABLE `platform_identity_document` (
  `Identity_document_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Document_number` VARCHAR(30) NOT NULL,
  `Document_type` VARCHAR(30) NOT NULL,
  `Issued_country` VARCHAR(50),
  `Issued_date` DATE,
  `Expiration_date` DATE,
  `Platform_profile_FK` INT NOT NULL UNIQUE,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla tipo_edificacion
CREATE TABLE `tipo_edificacion` (
  `Tipo_edificacion_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Tipo_edificacion_categoria` VARCHAR(50),
  `Tipo_edificacion_descripcion` VARCHAR(50) NOT NULL,
  `Tipo_edificacion_niveles` INT,
  `Tipo_edificacion_activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla organizacion_parqueadero
CREATE TABLE `organizacion_parqueadero` (
  `Organizacion_parqueadero_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Tipo_parqueadero` VARCHAR(30) NOT NULL,
  `Cantidad` INT NOT NULL,
  `Cubierto` TINYINT(1) DEFAULT 0,
  `Disponible` TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla asignacion
CREATE TABLE `asignacion` (
  `Asignacion_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Parqueaderos_asignados` JSON NOT NULL,
  `Organizacion_parqueadero_FK` INT NOT NULL UNIQUE,
  `Disponible` TINYINT(1) DEFAULT 1,
  `Descripcion` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla otras_caracteristicas
CREATE TABLE `otras_caracteristicas` (
  `Otras_caracteristicas_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Caracteristicas_descripcion` VARCHAR(30) NOT NULL,
  `Deposito` INT NOT NULL,
  `Lavanderia` TINYINT(1) NOT NULL,
  `Gas` TINYINT(1) NOT NULL,
  `Piso` INT,
  `Mascotas_permitidas` TINYINT(1) DEFAULT 0,
  `Tipo_inmueble` VARCHAR(30) NOT NULL,
  `Amoblado` TINYINT(1) DEFAULT 0,
  `Descripcion_adicional` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Asignacion_FK` INT NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla acerca_edificacion
CREATE TABLE `acerca_edificacion` (
  `Acerca_edificacion_id` INT AUTO_INCREMENT PRIMARY KEY,
  `AcercaDeLaEdificacion` VARCHAR(100) NOT NULL,
  `Estrato` INT NOT NULL,
  `Tipo_construccion` VARCHAR(50),
  `Anio_construccion` INT,
  `Estado_conservacion` VARCHAR(30),
  `Zona_comun` TINYINT(1) DEFAULT 0,
  `Descripcion_adicional` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla division
CREATE TABLE `division` (
  `Division_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Division` VARCHAR(50) NOT NULL,
  `Balcon` VARCHAR(2) NOT NULL DEFAULT 'No',
  `Baños` INT NOT NULL,
  `Terraza` INT NOT NULL,
  `Habitaciones` TINYINT NOT NULL,
  `Garaje` INT NOT NULL,
  `Ascensores` VARCHAR(2) NOT NULL,
  `Area` VARCHAR(10) NOT NULL,
  `Closets` INT,
  `Estudio` TINYINT(1) DEFAULT 0,
  `Sala` TINYINT(1) DEFAULT 1,
  `Comedor` TINYINT(1) DEFAULT 1,
  `Cocina` VARCHAR(30),
  `Zona_lavanderia` TINYINT(1) DEFAULT 0,
  `Deposito` TINYINT(1) DEFAULT 0,
  `Descripcion_adicional` VARCHAR(255),
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla imagenes_inmueble
CREATE TABLE `imagenes_inmueble` (
  `Imagenes_inmueble_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Imagenes` VARCHAR(255) NOT NULL,
  `Nombre` VARCHAR(100) NOT NULL,
  `URL` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla direccion
CREATE TABLE `direccion` (
  `Direccion_id` INT(11) NOT NULL PRIMARY KEY,
  `Direccion` VARCHAR(255) NOT NULL,
  `Tipo_via` VARCHAR(255) NOT NULL,
  `Numero_via_principal` INT(11) NOT NULL,
  `Numero_calle_transversal` INT(11) NOT NULL,
  `Numero_edificacion` INT(11) NOT NULL,
  `Descripcion_adicional` VARCHAR(50) NOT NULL,
  `Designador_cardinal_FK` INT(11) DEFAULT NULL,
  `Localizacion_FK` INT(11) DEFAULT NULL,
  `Barrio_ciudad_corregimiento_vereda_FK` INT(11) DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla inmueble
CREATE TABLE `inmueble` (
  `Inmueble_id` INT AUTO_INCREMENT PRIMARY KEY,
  `Valor` INT NOT NULL,
  `Area` INT NOT NULL,
  `Descripcion_General` VARCHAR(255) NOT NULL,
  `Antiguedad` INT NOT NULL,
  `Motivo_VoA` VARCHAR(100) NOT NULL,
  `Situacion_inmueble` VARCHAR(50) NOT NULL,
  `Tipo_edificacion_FK` INT NOT NULL UNIQUE,
  `Otras_caracteristicas_FK` INT NOT NULL UNIQUE,
  `Acerca_edificacion_FK` INT NOT NULL UNIQUE,
  `Division_FK` INT NOT NULL UNIQUE,
  `Imagenes_inmueble_FK` INT NOT NULL UNIQUE,
  `Codigo_interno` VARCHAR(30),
  `Estado` VARCHAR(20) DEFAULT 'disponible',
  `Fecha_publicacion` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Fecha_actualizacion` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Visitas` INT DEFAULT 0,
  `Observaciones` VARCHAR(255),
  `Platform_user_FK` INT NOT NULL,
  `Direccion_FK` INT(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla barrio
CREATE TABLE `barrio` (
  `Barrio_id` INT(11) NOT NULL PRIMARY KEY,
  `Nombre_barrio` VARCHAR(100) DEFAULT NULL,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla barrio_ciudad_corregimiento_vereda
CREATE TABLE `barrio_ciudad_corregimiento_vereda` (
  `Barrio_ciudad_corregimiento_vereda_id` INT(11) NOT NULL PRIMARY KEY,
  `Barrio_FK` INT(11) DEFAULT NULL,
  `Ciudad_FK` INT(11) DEFAULT NULL,
  `Corregimiento_FK` INT(11) DEFAULT NULL,
  `Vereda_Fk` INT(11) DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla ciudad
CREATE TABLE `ciudad` (
  `Ciudad_id` INT(11) NOT NULL PRIMARY KEY,
  `Ciudad` VARCHAR(50) NOT NULL,
  `Municipio_FK` INT(11) DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla corregimiento
CREATE TABLE `corregimiento` (
  `Corregimiento_id` INT(11) NOT NULL PRIMARY KEY,
  `Corregimiento` VARCHAR(50) NOT NULL,
  `Municipio_FK` INT(11) DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla designador_cardinal
CREATE TABLE `designador_cardinal` (
  `Designador_cardinal_id` INT(11) NOT NULL PRIMARY KEY,
  `Cardinalidad` VARCHAR(10) NOT NULL,
  `Abreviacion` VARCHAR(10) NOT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla localizacion
CREATE TABLE `localizacion` (
  `Localizacion_id` INT(11) NOT NULL PRIMARY KEY,
  `Localizacion_descripcion` VARCHAR(100) NOT NULL,
  `Latitud` DECIMAL(10,8),
  `Longitud` DECIMAL(11,8),
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla municipio
CREATE TABLE `municipio` (
  `Municipio_id` INT(11) NOT NULL PRIMARY KEY,
  `Ndap_FK` INT(11) DEFAULT NULL,
  `Municipio_nombre` VARCHAR(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Municipio_descripcion` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla ndap
CREATE TABLE `ndap` (
  `Ndap_id` INT(11) NOT NULL PRIMARY KEY,
  `Ndap_descripcion` VARCHAR(50) NOT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabla vereda
CREATE TABLE `vereda` (
  `Vereda_id` INT(11) NOT NULL PRIMARY KEY,
  `Vereda_nombre` VARCHAR(50) NOT NULL,
  `Municipio_FK` INT(11) DEFAULT NULL,
  `Activo` TINYINT(1) DEFAULT 1,
  `Created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Relaciones para la gestión de usuarios, roles, módulos y permisos

ALTER TABLE `users`
  ADD CONSTRAINT `users_user_status_fk`
    FOREIGN KEY (`User_status_FK`) REFERENCES `user_status` (`User_status_id`);

ALTER TABLE `users`
  ADD CONSTRAINT `users_role_fk`
    FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`);

ALTER TABLE `module_role`
  ADD CONSTRAINT `module_role_module_fk`
    FOREIGN KEY (`Module_FK`) REFERENCES `module` (`Module_id`);

ALTER TABLE `module_role`
  ADD CONSTRAINT `module_role_role_fk`
    FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`);

ALTER TABLE `permitions_module_role`
  ADD CONSTRAINT `permitions_module_role_module_role_fk`
    FOREIGN KEY (`Module_role_FK`) REFERENCES `module_role` (`Module_role_id`);

ALTER TABLE `permitions_module_role`
  ADD CONSTRAINT `permitions_module_role_permitions_fk`
    FOREIGN KEY (`Permitions_FK`) REFERENCES `permitions` (`Permitions_id`);

-- Relaciones para la gestión de usuarios, roles y módulos de la plataforma

ALTER TABLE `platform_user`
  ADD CONSTRAINT `platform_user_status_fk`
    FOREIGN KEY (`Platform_user_status_FK`) REFERENCES `platform_user_status` (`Platform_user_status_id`);

ALTER TABLE `platform_user`
  ADD CONSTRAINT `platform_user_role_fk`
    FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`);

ALTER TABLE `platform_module_role`
  ADD CONSTRAINT `platform_module_role_module_fk`
    FOREIGN KEY (`Platform_module_FK`) REFERENCES `platform_module` (`Platform_module_id`);

ALTER TABLE `platform_module_role`
  ADD CONSTRAINT `platform_module_role_role_fk`
    FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`);

ALTER TABLE `platform_permitions_module_role`
  ADD CONSTRAINT `platform_permitions_module_role_module_role_fk`
    FOREIGN KEY (`Platform_module_role_FK`) REFERENCES `platform_module_role` (`Platform_module_role_id`);

ALTER TABLE `platform_permitions_module_role`
  ADD CONSTRAINT `platform_permitions_module_role_permitions_fk`
    FOREIGN KEY (`Platform_permitions_FK`) REFERENCES `platform_permitions` (`Platform_permitions_id`);

ALTER TABLE `platform_profile`
  ADD CONSTRAINT `platform_profile_user_fk`
    FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`);

ALTER TABLE `platform_identity_document`
  ADD CONSTRAINT `platform_identity_document_profile_fk`
    FOREIGN KEY (`Platform_profile_FK`) REFERENCES `platform_profile` (`Profile_id`);

-- Relaciones para inmueble y dirección

ALTER TABLE `asignacion`
  ADD CONSTRAINT `asignacion_organizacion_parqueadero_fk`
    FOREIGN KEY (`Organizacion_parqueadero_FK`) REFERENCES `organizacion_parqueadero`(`Organizacion_parqueadero_id`);

ALTER TABLE `otras_caracteristicas`
  ADD CONSTRAINT `otras_caracteristicas_asignacion_fk`
    FOREIGN KEY (`Asignacion_FK`) REFERENCES `asignacion`(`Asignacion_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_direccion_fk`
    FOREIGN KEY (`Direccion_FK`) REFERENCES `direccion`(`Direccion_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_tipo_edificacion_fk`
    FOREIGN KEY (`Tipo_edificacion_FK`) REFERENCES `tipo_edificacion`(`Tipo_edificacion_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_otras_caracteristicas_fk`
    FOREIGN KEY (`Otras_caracteristicas_FK`) REFERENCES `otras_caracteristicas`(`Otras_caracteristicas_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_acerca_edificacion_fk`
    FOREIGN KEY (`Acerca_edificacion_FK`) REFERENCES `acerca_edificacion`(`Acerca_edificacion_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_division_fk`
    FOREIGN KEY (`Division_FK`) REFERENCES `division`(`Division_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_imagenes_inmueble_fk`
    FOREIGN KEY (`Imagenes_inmueble_FK`) REFERENCES `imagenes_inmueble`(`Imagenes_inmueble_id`);

ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_platform_user_fk`
    FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user`(`Platform_user_id`);

-- Relaciones para tablas de dirección

ALTER TABLE `ciudad`
  ADD CONSTRAINT `ciudad_municipio_fk`
    FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio`(`Municipio_id`);

ALTER TABLE `corregimiento`
  ADD CONSTRAINT `corregimiento_municipio_fk`
    FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio`(`Municipio_id`);

ALTER TABLE `vereda`
  ADD CONSTRAINT `vereda_municipio_fk`
    FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio`(`Municipio_id`);

ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ndap_fk`
    FOREIGN KEY (`Ndap_FK`) REFERENCES `ndap`(`Ndap_id`);

ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `bccv_barrio_fk`
    FOREIGN KEY (`Barrio_FK`) REFERENCES `barrio`(`Barrio_id`);

ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `bccv_ciudad_fk`
    FOREIGN KEY (`Ciudad_FK`) REFERENCES `ciudad`(`Ciudad_id`);

ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `bccv_corregimiento_fk`
    FOREIGN KEY (`Corregimiento_FK`) REFERENCES `corregimiento`(`Corregimiento_id`);

ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `bccv_vereda_fk`
    FOREIGN KEY (`Vereda_Fk`) REFERENCES `vereda`(`Vereda_id`);

ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_bccv_fk`
    FOREIGN KEY (`Barrio_ciudad_corregimiento_vereda_FK`) REFERENCES `barrio_ciudad_corregimiento_vereda`(`Barrio_ciudad_corregimiento_vereda_id`);

ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_designador_cardinal_fk`
    FOREIGN KEY (`Designador_cardinal_FK`) REFERENCES `designador_cardinal`(`Designador_cardinal_id`);

ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_localizacion_fk`
    FOREIGN KEY (`Localizacion_FK`) REFERENCES `localizacion`(`Localizacion_id`);

-- Estructura de tabla para la tabla `estado_pago`
CREATE TABLE `estado_pago` (
  `Estado_pago_id` int(10) NOT NULL PRIMARY KEY,
  `Estado_pago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `factura`
CREATE TABLE `factura` (
  `Factura_id` int(10) NOT NULL PRIMARY KEY,
  `Factura_NO` int(10) NOT NULL,
  `Nit_Vendedor` varchar(20) NOT NULL,
  `Nit_Adquiriente` varchar(20) NOT NULL,
  `FechaEmision` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Resolucion_factura_FK` int(10) NOT NULL,
  `Impuesto_valor_fk` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `impuesto`
CREATE TABLE `impuesto` (
  `Impuesto_id` int(10) NOT NULL PRIMARY KEY,
  `impuesto` varchar(20) NOT NULL,
  `TipodeImpuesto` int(10) DEFAULT NULL,
  `Porcentaje` int(10) DEFAULT NULL,
  `Column` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `impuesto_valor`
CREATE TABLE `impuesto_valor` (
  `Impuesto_valor_id` int(10) NOT NULL PRIMARY KEY,
  `Valor_FK` int(10) DEFAULT NULL,
  `Retenedor_iva_FK` int(10) DEFAULT NULL,
  `Impuesto_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `pago`
CREATE TABLE `pago` (
  `Pago_id` int(10) NOT NULL PRIMARY KEY,
  `Referencia_transaccion` int(10) NOT NULL,
  `Fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Comentario` varchar(255) NOT NULL,
  `Fecha_pago` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado_pago_FK` int(10) DEFAULT NULL,
  `Factura_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `resolucion_factura`
CREATE TABLE `resolucion_factura` (
  `Resolucion_factura_id` int(10) NOT NULL PRIMARY KEY,
  `Resolucion_facturacion_NO` int(20) NOT NULL,
  `Fecha_resolucion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Fecha_vencimiento` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `retenedor_iva`
CREATE TABLE `retenedor_iva` (
  `Retenedor_IVA_id` int(10) NOT NULL PRIMARY KEY
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `suscripcion`
CREATE TABLE `suscripcion` (
  `Suscripcion_id` int(10) NOT NULL PRIMARY KEY,
  `Suscripcion_fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Suscripcion_tipo` varchar(20) NOT NULL,
  `Suscripcion_descripcion` varchar(200) NOT NULL,
  `Suscripcion_duracion` varchar(15) NOT NULL,
  `Factura_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Estructura de tabla para la tabla `valor`
CREATE TABLE `valor` (
  `Valor_id` int(11) NOT NULL PRIMARY KEY,
  `Monto_IVA` decimal(19,0) NOT NULL,
  `Valor_neto` decimal(19,0) NOT NULL,
  `Valor_Total` decimal(19,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `factura`
  ADD CONSTRAINT `factura_resolucion_factura_fk`
    FOREIGN KEY (`Resolucion_factura_FK`) REFERENCES `resolucion_factura`(`Resolucion_factura_id`);

ALTER TABLE `factura`
  ADD CONSTRAINT `factura_impuesto_valor_fk`
    FOREIGN KEY (`Impuesto_valor_fk`) REFERENCES `impuesto_valor`(`Impuesto_valor_id`);

ALTER TABLE `impuesto_valor`
  ADD CONSTRAINT `impuesto_valor_valor_fk`
    FOREIGN KEY (`Valor_FK`) REFERENCES `valor`(`Valor_id`);

ALTER TABLE `impuesto_valor`
  ADD CONSTRAINT `impuesto_valor_impuesto_fk`
    FOREIGN KEY (`Impuesto_FK`) REFERENCES `impuesto`(`Impuesto_id`);

ALTER TABLE `impuesto_valor`
  ADD CONSTRAINT `impuesto_valor_retenedor_iva_fk`
    FOREIGN KEY (`Retenedor_iva_FK`) REFERENCES `retenedor_iva`(`Retenedor_IVA_id`);

ALTER TABLE `pago`
  ADD CONSTRAINT `pago_estado_pago_fk`
    FOREIGN KEY (`Estado_pago_FK`) REFERENCES `estado_pago`(`Estado_pago_id`);

ALTER TABLE `pago`
  ADD CONSTRAINT `pago_factura_fk`
    FOREIGN KEY (`Factura_FK`) REFERENCES `factura`(`Factura_id`);

ALTER TABLE `suscripcion`
  ADD CONSTRAINT `suscripcion_factura_fk`
    FOREIGN KEY (`Factura_FK`) REFERENCES `factura`(`Factura_id`);

-- Agrega la columna de relación en la tabla suscripcion
ALTER TABLE `suscripcion`
  ADD COLUMN `Platform_user_FK` INT NOT NULL AFTER `Suscripcion_id`;

-- Relaciona suscripcion con platform_user (usuario de la plataforma)
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `suscripcion_platform_user_fk`
    FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user`(`Platform_user_id`);