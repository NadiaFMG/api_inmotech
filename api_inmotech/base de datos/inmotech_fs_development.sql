-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-04-2025 a las 05:33:40
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inmotech_fs_development`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acerca_edificacion`
--

CREATE TABLE `acerca_edificacion` (
  `Acerca_edificacion_id` int(10) NOT NULL,
  `AcercaDeLaEdificacion` varchar(10) NOT NULL,
  `Estrato` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `Asignacion_id` int(10) NOT NULL,
  `Parqueaderos_asignados` varchar(10) NOT NULL,
  `Organizacion_parqueadero_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrio`
--

CREATE TABLE `barrio` (
  `Barrio_id` int(10) NOT NULL,
  `Nombre_barrio` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `barrio`
--

INSERT INTO `barrio` (`Barrio_id`, `Nombre_barrio`) VALUES
(1, 'San pablo'),
(2, 'San pedro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrio_ciudad_corregimiento_vereda`
--

CREATE TABLE `barrio_ciudad_corregimiento_vereda` (
  `Barrio_ciudad_corregimiento_vereda_id` int(10) NOT NULL,
  `Barrio_FK` int(10) DEFAULT NULL,
  `Ciudad_FK` int(10) DEFAULT NULL,
  `Corregimiento_FK` int(10) DEFAULT NULL,
  `Vereda_Fk` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `barrio_ciudad_corregimiento_vereda`
--

INSERT INTO `barrio_ciudad_corregimiento_vereda` (`Barrio_ciudad_corregimiento_vereda_id`, `Barrio_FK`, `Ciudad_FK`, `Corregimiento_FK`, `Vereda_Fk`) VALUES
(2, 2, 1, 1, NULL),
(3, 2, 1, 1, NULL),
(4, 2, 1, 1, NULL),
(5, 2, 1, 1, NULL),
(6, 2, 1, 1, NULL),
(7, 2, 1, 1, NULL),
(8, 2, 1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `Ciudad_id` int(10) NOT NULL,
  `Ciudad` varchar(50) NOT NULL,
  `Municipio_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`Ciudad_id`, `Ciudad`, `Municipio_FK`) VALUES
(1, 'Cali', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corregimiento`
--

CREATE TABLE `corregimiento` (
  `Corregimiento_id` int(10) NOT NULL,
  `Corregimiento` varchar(50) NOT NULL,
  `Municipio_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `corregimiento`
--

INSERT INTO `corregimiento` (`Corregimiento_id`, `Corregimiento`, `Municipio_FK`) VALUES
(1, 'La paz', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `designador_cardinal`
--

CREATE TABLE `designador_cardinal` (
  `Designador_cardinal_id` int(10) NOT NULL,
  `Cardinalidad` varchar(10) NOT NULL,
  `Abreviacion` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `designador_cardinal`
--

INSERT INTO `designador_cardinal` (`Designador_cardinal_id`, `Cardinalidad`, `Abreviacion`) VALUES
(1, '2', 'S');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `Direccion_id` int(10) NOT NULL,
  `Direccion` int(30) NOT NULL,
  `Tipo_via` varchar(255) NOT NULL,
  `Numero_via_principal` int(11) NOT NULL,
  `Numero_calle_transversal` int(11) NOT NULL,
  `Numero_edificacion` int(11) NOT NULL,
  `Descripcion_adicional` varchar(50) NOT NULL,
  `Designador_cardinal_FK` int(10) DEFAULT NULL,
  `Localizacion_FK` int(10) DEFAULT NULL,
  `Barrio_ciudad_corregimiento_vereda_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`Direccion_id`, `Direccion`, `Tipo_via`, `Numero_via_principal`, `Numero_calle_transversal`, `Numero_edificacion`, `Descripcion_adicional`, `Designador_cardinal_FK`, `Localizacion_FK`, `Barrio_ciudad_corregimiento_vereda_FK`) VALUES
(1, 1234, '1232', 87, 0, 8, 'amplio', 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE `division` (
  `Division_id` int(10) NOT NULL,
  `Division` varchar(10) NOT NULL,
  `Balcon` varchar(2) NOT NULL DEFAULT 'No',
  `Baños` int(1) NOT NULL,
  `Terraza` int(2) NOT NULL,
  `Habitaciones` tinyint(1) NOT NULL,
  `Garaje` int(2) NOT NULL,
  `Ascensores` varchar(2) NOT NULL,
  `Area` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `document_identification`
--

CREATE TABLE `document_identification` (
  `id_documento` int(11) NOT NULL,
  `numero_documento` varchar(30) NOT NULL,
  `fecha_expedicion` date NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `Tipo_documento_FK` int(11) NOT NULL,
  `Sexo_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `Estado_pago_id` int(10) NOT NULL,
  `Estado_pago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `Factura_id` int(10) NOT NULL,
  `Factura_NO` int(10) NOT NULL,
  `Nit_Vendedor` varchar(20) NOT NULL,
  `Nit_Adquiriente` varchar(20) NOT NULL,
  `FechaEmision` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Resolucion_factura_FK` int(10) NOT NULL,
  `Impuesto_valor_fk` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_inmueble`
--

CREATE TABLE `imagenes_inmueble` (
  `Imagenes_inmueble_id` int(10) NOT NULL,
  `Imagenes` int(10) NOT NULL,
  `Nombre` int(10) NOT NULL,
  `URL` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuesto`
--

CREATE TABLE `impuesto` (
  `Impuesto_id` int(10) NOT NULL,
  `impuesto` varchar(20) NOT NULL,
  `TipodeImpuesto` int(10) DEFAULT NULL,
  `Porcentaje` int(10) DEFAULT NULL,
  `Column` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `impuesto_valor`
--

CREATE TABLE `impuesto_valor` (
  `Impuesto_valor_id` int(10) NOT NULL,
  `Valor_FK` int(10) DEFAULT NULL,
  `Retenedor_iva_FK` int(10) DEFAULT NULL,
  `Impuesto_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `Inmueble_id` int(10) NOT NULL,
  `Valor` int(10) NOT NULL,
  `Area` int(10) NOT NULL,
  `Descripcion_General` int(10) NOT NULL,
  `Antiguedad` int(10) NOT NULL,
  `Motivo_VoA` int(10) NOT NULL,
  `Situacion_inmueble` varchar(10) NOT NULL,
  `Tipo_edificacion_FK` int(10) NOT NULL,
  `Otras_caracteristicas_FK` int(10) NOT NULL,
  `Acerca_edificacion_FK` int(10) NOT NULL,
  `Division_FK` int(10) NOT NULL,
  `Imagenes_inmueble_FK` int(10) NOT NULL,
  `Direccion_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localizacion`
--

CREATE TABLE `localizacion` (
  `Localizacion_id` int(11) NOT NULL,
  `Localizacion_descripcion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `localizacion`
--

INSERT INTO `localizacion` (`Localizacion_id`, `Localizacion_descripcion`) VALUES
(1, 'Excelente ubicacion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module`
--

CREATE TABLE `module` (
  `Module_id` int(11) NOT NULL,
  `Module_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Module_route` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Module_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `module`
--

INSERT INTO `module` (`Module_id`, `Module_name`, `Module_route`, `Module_description`, `createdAt`, `updatedAt`) VALUES
(1, 'Usuarios', '/users', 'Módulo de gestión de usuarios', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Roles', '/roles', 'Módulo de gestión de roles', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Permisos', '/permissions', 'Módulo de gestión de permisos', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Reportes', '/reports', 'Módulo de generación de reportes', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Configuración', '/settings', 'Módulo de configuración general', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module_role`
--

CREATE TABLE `module_role` (
  `Module_role_id` int(11) NOT NULL,
  `Module_FK` int(11) NOT NULL,
  `Role_FK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `module_role`
--

INSERT INTO `module_role` (`Module_role_id`, `Module_FK`, `Role_FK`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 2, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 4, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 5, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `Municipio_id` int(11) NOT NULL,
  `Ndap_FK` int(10) DEFAULT NULL,
  `Municipio_nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Municipio_descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`Municipio_id`, `Ndap_FK`, `Municipio_nombre`, `Municipio_descripcion`) VALUES
(3, 0, 'cota', 'Municipio cerca de ..');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ndap`
--

CREATE TABLE `ndap` (
  `Ndap_id` int(11) NOT NULL,
  `Ndap_descripcion` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ndap`
--

INSERT INTO `ndap` (`Ndap_id`, `Ndap_descripcion`) VALUES
(1, 'CARRERA 26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizacion_parqueadero`
--

CREATE TABLE `organizacion_parqueadero` (
  `Organizacion_parqueadero_id` int(10) NOT NULL,
  `Tipo_parqueadero` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otras_caracteristicas`
--

CREATE TABLE `otras_caracteristicas` (
  `Otras_caracteristicas_id` int(10) NOT NULL,
  `Caracteristicas_descripcion` varchar(30) NOT NULL,
  `Deposito` int(10) NOT NULL,
  `Lavanderia` int(1) NOT NULL,
  `Gas` int(1) NOT NULL,
  `Tipo_inmueble` int(10) NOT NULL,
  `Asignacion_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `Pago_id` int(10) NOT NULL,
  `Referencia_transaccion` int(10) NOT NULL,
  `Fecha_creacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Fecha_actualizacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Comentario` varchar(255) NOT NULL,
  `Fecha_pago` timestamp NOT NULL DEFAULT current_timestamp(),
  `Estado_pago_FK` int(10) DEFAULT NULL,
  `Factura_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permitions`
--

CREATE TABLE `permitions` (
  `Permitions_id` int(11) NOT NULL,
  `Permitions_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Permitions_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permitions`
--

INSERT INTO `permitions` (`Permitions_id`, `Permitions_name`, `Permitions_description`, `createdAt`, `updatedAt`) VALUES
(1, 'Crear', 'Permite crear registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Editar', 'Permite editar registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Consultar', 'Permite consultar registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Eliminar', 'Permite eliminar registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Imprimir', 'Permite imprimir registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Descargar', 'Permite descargar registros', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permitions_module_role`
--

CREATE TABLE `permitions_module_role` (
  `Permitions_module_role_id` int(11) NOT NULL,
  `Module_role_FK` int(11) NOT NULL,
  `Permitions_FK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `permitions_module_role`
--

INSERT INTO `permitions_module_role` (`Permitions_module_role_id`, `Module_role_FK`, `Permitions_FK`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 2, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 2, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 3, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 3, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profile`
--

CREATE TABLE `profile` (
  `Profile_id` int(11) NOT NULL,
  `Profile_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Profile_phone` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Profile_addres` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Profile_email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Profile_photo` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_FK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profile`
--

INSERT INTO `profile` (`Profile_id`, `Profile_name`, `Profile_phone`, `Profile_addres`, `Profile_email`, `Profile_photo`, `User_FK`, `createdAt`, `updatedAt`) VALUES
(1, 'Juan Perez', '1234567890', 'Calle 123', 'juan@example.com', 'foto1.jpg', 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Maria Lopez', '9876543210', 'Calle 456', 'maria@example.com', 'foto2.jpg', 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Carlos Ruiz', '1122334455', 'Calle 789', 'carlos@example.com', 'foto3.jpg', 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Ana Torres', '6677889900', 'Calle 101', 'ana@example.com', 'foto4.jpg', 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Pedro Gomez', '2233445566', 'Calle 202', 'pedro@example.com', 'foto5.jpg', 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Laura Mendoza', '9988776655', 'Calle 303', 'laura@example.com', 'foto6.jpg', 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resolucion_factura`
--

CREATE TABLE `resolucion_factura` (
  `Resolucion_factura_id` int(10) NOT NULL,
  `Resolucion_facturacion_NO` int(20) NOT NULL,
  `Fecha_resolucion` timestamp NOT NULL DEFAULT current_timestamp(),
  `Fecha_vencimiento` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retenedor_iva`
--

CREATE TABLE `retenedor_iva` (
  `Retenedor_IVA_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `Role_id` int(11) NOT NULL,
  `Role_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Role_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`Role_id`, `Role_name`, `Role_description`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Administrador del sistema', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Editor', 'Puede editar contenido', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Usuario', 'Usuario regular del sistema', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Supervisor', 'Supervisa y gestiona usuarios', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `Sexo_id` int(11) NOT NULL,
  `Sexo_sex` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `Suscripcion_id` int(10) NOT NULL,
  `Suscripcion_fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Suscripcion_tipo` varchar(20) NOT NULL,
  `Suscripcion_descripcion` varchar(200) NOT NULL,
  `Suscripcion_duracion` varchar(15) NOT NULL,
  `Factura_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_documento`
--

CREATE TABLE `tipo_documento` (
  `Tipo_documento_id` int(11) NOT NULL,
  `Tipo_documento_name` varchar(10) NOT NULL,
  `Tipo_documento_acronym` varchar(5) NOT NULL,
  `firstName` varchar(30) DEFAULT NULL,
  `lastName` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_edificacion`
--

CREATE TABLE `tipo_edificacion` (
  `Tipo_edificacion_id` int(10) NOT NULL,
  `Tipo_edificacion_descripcion` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `User_id` int(11) NOT NULL,
  `User_user` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_password` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_status_FK` int(11) NOT NULL,
  `Role_FK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `Suscripcion_FK` int(10) NOT NULL,
  `Inmueble_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`User_id`, `User_user`, `User_password`, `User_status_FK`, `Role_FK`, `createdAt`, `updatedAt`, `Suscripcion_FK`, `Inmueble_FK`) VALUES
(1, 'admin@email.com', '123456', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0),
(2, 'user1@email.com', 'password1', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0),
(3, 'user2@email.com', 'password2', 2, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0),
(4, 'user3@email.com', 'password3', 3, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0),
(5, 'user4@email.com', 'password4', 4, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0),
(6, 'user5@email.com', 'password5', 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `User_status_id` int(11) NOT NULL,
  `User_status_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `User_status_description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO `user_status` (`User_status_id`, `User_status_name`, `User_status_description`, `createdAt`, `updatedAt`) VALUES
(1, 'Activo', 'Usuario activo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Inactivo', 'Usuario inactivo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Suspendido', 'Usuario suspendido temporalmente', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Eliminado', 'Usuario eliminado del sistema', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valor`
--

CREATE TABLE `valor` (
  `Valor_id` int(11) NOT NULL,
  `Monto_IVA` decimal(19,0) NOT NULL,
  `Valor_neto` decimal(19,0) NOT NULL,
  `Valor_Total` decimal(19,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `valor`
--

INSERT INTO `valor` (`Valor_id`, `Monto_IVA`, `Valor_neto`, `Valor_Total`) VALUES
(2, 36, 12, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vereda`
--

CREATE TABLE `vereda` (
  `Vereda_id` int(11) NOT NULL,
  `Vereda_nombre` varchar(50) NOT NULL,
  `Municipio_FK` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vereda`
--

INSERT INTO `vereda` (`Vereda_id`, `Vereda_nombre`, `Municipio_FK`) VALUES
(3, 'marianitas', 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acerca_edificacion`
--
ALTER TABLE `acerca_edificacion`
  ADD PRIMARY KEY (`Acerca_edificacion_id`);

--
-- Indices de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD PRIMARY KEY (`Asignacion_id`),
  ADD UNIQUE KEY `Organizacion_parqueadero_FK` (`Organizacion_parqueadero_FK`);

--
-- Indices de la tabla `barrio`
--
ALTER TABLE `barrio`
  ADD PRIMARY KEY (`Barrio_id`);

--
-- Indices de la tabla `barrio_ciudad_corregimiento_vereda`
--
ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD PRIMARY KEY (`Barrio_ciudad_corregimiento_vereda_id`),
  ADD KEY `Barrio_FK` (`Barrio_FK`),
  ADD KEY `Ciudad_FK` (`Ciudad_FK`),
  ADD KEY `Corregimiento_FK` (`Corregimiento_FK`),
  ADD KEY `Vereda_Fk` (`Vereda_Fk`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`Ciudad_id`),
  ADD KEY `Municipio_FK` (`Municipio_FK`);

--
-- Indices de la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  ADD PRIMARY KEY (`Corregimiento_id`),
  ADD KEY `Municipio_FK` (`Municipio_FK`);

--
-- Indices de la tabla `designador_cardinal`
--
ALTER TABLE `designador_cardinal`
  ADD PRIMARY KEY (`Designador_cardinal_id`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`Direccion_id`),
  ADD UNIQUE KEY `Designador_cardinal_FK` (`Designador_cardinal_FK`),
  ADD UNIQUE KEY `Localizacion_FK` (`Localizacion_FK`),
  ADD KEY `barrio_ciudad_corregimiento_vereda_FK` (`Barrio_ciudad_corregimiento_vereda_FK`);

--
-- Indices de la tabla `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`Division_id`);

--
-- Indices de la tabla `document_identification`
--
ALTER TABLE `document_identification`
  ADD PRIMARY KEY (`id_documento`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`),
  ADD KEY `Tipo_documento_FK` (`Tipo_documento_FK`),
  ADD KEY `Sexo_FK` (`Sexo_FK`);

--
-- Indices de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  ADD PRIMARY KEY (`Estado_pago_id`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`Factura_id`),
  ADD KEY `factura_ibfk_1` (`Resolucion_factura_FK`),
  ADD KEY `factura_ibfk_2` (`Impuesto_valor_fk`);

--
-- Indices de la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  ADD PRIMARY KEY (`Imagenes_inmueble_id`);

--
-- Indices de la tabla `impuesto`
--
ALTER TABLE `impuesto`
  ADD PRIMARY KEY (`Impuesto_id`);

--
-- Indices de la tabla `impuesto_valor`
--
ALTER TABLE `impuesto_valor`
  ADD PRIMARY KEY (`Impuesto_valor_id`),
  ADD KEY `Retenedor_iva_FK` (`Retenedor_iva_FK`),
  ADD KEY `Valor_FK` (`Valor_FK`),
  ADD KEY `Impuesto_FK` (`Impuesto_FK`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`Inmueble_id`),
  ADD UNIQUE KEY `Tipo_edificacion_FK` (`Tipo_edificacion_FK`),
  ADD UNIQUE KEY `Tipo_edificacion_FK_2` (`Tipo_edificacion_FK`,`Otras_caracteristicas_FK`),
  ADD UNIQUE KEY `Acerca_edificacion_FK` (`Acerca_edificacion_FK`),
  ADD UNIQUE KEY `Division_FK` (`Division_FK`),
  ADD UNIQUE KEY `Direccion_FK` (`Direccion_FK`),
  ADD KEY `Otras_caracteristicas_FK` (`Otras_caracteristicas_FK`),
  ADD KEY `Imagenes_inmueble_FK` (`Imagenes_inmueble_FK`);

--
-- Indices de la tabla `localizacion`
--
ALTER TABLE `localizacion`
  ADD PRIMARY KEY (`Localizacion_id`);

--
-- Indices de la tabla `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`Module_id`),
  ADD UNIQUE KEY `Module_name` (`Module_name`),
  ADD UNIQUE KEY `Module_route` (`Module_route`);

--
-- Indices de la tabla `module_role`
--
ALTER TABLE `module_role`
  ADD PRIMARY KEY (`Module_role_id`),
  ADD KEY `Module_FK` (`Module_FK`),
  ADD KEY `Role_FK` (`Role_FK`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`Municipio_id`),
  ADD KEY `Ndap_FK` (`Ndap_FK`);

--
-- Indices de la tabla `ndap`
--
ALTER TABLE `ndap`
  ADD PRIMARY KEY (`Ndap_id`);

--
-- Indices de la tabla `organizacion_parqueadero`
--
ALTER TABLE `organizacion_parqueadero`
  ADD PRIMARY KEY (`Organizacion_parqueadero_id`);

--
-- Indices de la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  ADD PRIMARY KEY (`Otras_caracteristicas_id`),
  ADD UNIQUE KEY `Asignacion_FK` (`Asignacion_FK`),
  ADD UNIQUE KEY `Asignacion_FK_2` (`Asignacion_FK`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`Pago_id`),
  ADD KEY `Estado_pago_FK` (`Estado_pago_FK`),
  ADD KEY `Factura_FK` (`Factura_FK`);

--
-- Indices de la tabla `permitions`
--
ALTER TABLE `permitions`
  ADD PRIMARY KEY (`Permitions_id`),
  ADD UNIQUE KEY `Permitions_name` (`Permitions_name`);

--
-- Indices de la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  ADD PRIMARY KEY (`Permitions_module_role_id`),
  ADD KEY `Module_role_FK` (`Module_role_FK`),
  ADD KEY `Permitions_FK` (`Permitions_FK`);

--
-- Indices de la tabla `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`Profile_id`),
  ADD UNIQUE KEY `User_FK` (`User_FK`);

--
-- Indices de la tabla `resolucion_factura`
--
ALTER TABLE `resolucion_factura`
  ADD PRIMARY KEY (`Resolucion_factura_id`);

--
-- Indices de la tabla `retenedor_iva`
--
ALTER TABLE `retenedor_iva`
  ADD PRIMARY KEY (`Retenedor_IVA_id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Role_id`),
  ADD UNIQUE KEY `Role_name` (`Role_name`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`Sexo_id`),
  ADD UNIQUE KEY `Sexo_sex` (`Sexo_sex`);

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`Suscripcion_id`),
  ADD UNIQUE KEY `Factura_FK` (`Factura_FK`),
  ADD UNIQUE KEY `Factura_FK_2` (`Factura_FK`);

--
-- Indices de la tabla `tipo_documento`
--
ALTER TABLE `tipo_documento`
  ADD PRIMARY KEY (`Tipo_documento_id`),
  ADD UNIQUE KEY `Tipo_documento_acronym` (`Tipo_documento_acronym`);

--
-- Indices de la tabla `tipo_edificacion`
--
ALTER TABLE `tipo_edificacion`
  ADD PRIMARY KEY (`Tipo_edificacion_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`),
  ADD UNIQUE KEY `User_user` (`User_user`),
  ADD KEY `User_status_FK` (`User_status_FK`),
  ADD KEY `Role_FK` (`Role_FK`),
  ADD KEY `Suscripcion_FK` (`Suscripcion_FK`),
  ADD KEY `Inmueble_FK` (`Inmueble_FK`);

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`User_status_id`),
  ADD UNIQUE KEY `User_status_name` (`User_status_name`);

--
-- Indices de la tabla `valor`
--
ALTER TABLE `valor`
  ADD PRIMARY KEY (`Valor_id`);

--
-- Indices de la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD PRIMARY KEY (`Vereda_id`),
  ADD KEY `Municipio_FK` (`Municipio_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acerca_edificacion`
--
ALTER TABLE `acerca_edificacion`
  MODIFY `Acerca_edificacion_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  MODIFY `Asignacion_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `barrio`
--
ALTER TABLE `barrio`
  MODIFY `Barrio_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `barrio_ciudad_corregimiento_vereda`
--
ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  MODIFY `Barrio_ciudad_corregimiento_vereda_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `Ciudad_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  MODIFY `Corregimiento_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `designador_cardinal`
--
ALTER TABLE `designador_cardinal`
  MODIFY `Designador_cardinal_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `Direccion_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `division`
--
ALTER TABLE `division`
  MODIFY `Division_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `document_identification`
--
ALTER TABLE `document_identification`
  MODIFY `id_documento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estado_pago`
--
ALTER TABLE `estado_pago`
  MODIFY `Estado_pago_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  MODIFY `Imagenes_inmueble_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `localizacion`
--
ALTER TABLE `localizacion`
  MODIFY `Localizacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `Municipio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `ndap`
--
ALTER TABLE `ndap`
  MODIFY `Ndap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `valor`
--
ALTER TABLE `valor`
  MODIFY `Valor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `vereda`
--
ALTER TABLE `vereda`
  MODIFY `Vereda_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`Resolucion_factura_FK`) REFERENCES `resolucion_factura` (`Resolucion_factura_id`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`Impuesto_valor_fk`) REFERENCES `impuesto_valor` (`Impuesto_valor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
