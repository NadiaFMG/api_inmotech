-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-08-2025 a las 15:30:56
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
  `Acerca_edificacion_id` int(11) NOT NULL,
  `AcercaDeLaEdificacion` varchar(100) NOT NULL,
  `Estrato` int(11) NOT NULL,
  `Tipo_construccion` varchar(50) DEFAULT NULL,
  `Anio_construccion` int(11) DEFAULT NULL,
  `Estado_conservacion` varchar(30) DEFAULT NULL,
  `Zona_comun` tinyint(1) DEFAULT 0,
  `Descripcion_adicional` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `acerca_edificacion`:
--

--
-- Volcado de datos para la tabla `acerca_edificacion`
--

INSERT INTO `acerca_edificacion` (`Acerca_edificacion_id`, `AcercaDeLaEdificacion`, `Estrato`, `Tipo_construccion`, `Anio_construccion`, `Estado_conservacion`, `Zona_comun`, `Descripcion_adicional`, `Created_at`, `Updated_at`) VALUES
(3, 'Edificio de Apartamentos Residencial', 4, 'Tradicional', 2005, 'Excelente', 1, 'Cuenta con piscina, gimnasio y salones sociales.', '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `Asignacion_id` int(11) NOT NULL,
  `Parqueaderos_asignados` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Parqueaderos_asignados`)),
  `Organizacion_parqueadero_FK` int(11) NOT NULL,
  `Disponible` tinyint(1) DEFAULT 1,
  `Descripcion` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `asignacion`:
--   `Organizacion_parqueadero_FK`
--       `organizacion_parqueadero` -> `Organizacion_parqueadero_id`
--

--
-- Volcado de datos para la tabla `asignacion`
--

INSERT INTO `asignacion` (`Asignacion_id`, `Parqueaderos_asignados`, `Organizacion_parqueadero_FK`, `Disponible`, `Descripcion`, `Created_at`, `Updated_at`) VALUES
(3, '[\"A101\",\"A102\"]', 3, 1, 'Parqueaderos asignados al apto 101 y 102 en la Org. 1', '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrio`
--

CREATE TABLE `barrio` (
  `Barrio_id` int(11) NOT NULL,
  `Nombre_barrio` varchar(100) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `barrio`:
--

--
-- Volcado de datos para la tabla `barrio`
--

INSERT INTO `barrio` (`Barrio_id`, `Nombre_barrio`, `Created_at`, `Updated_at`) VALUES
(0, 'Autopista Norte', '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `barrio_ciudad_corregimiento_vereda`
--

CREATE TABLE `barrio_ciudad_corregimiento_vereda` (
  `Barrio_ciudad_corregimiento_vereda_id` int(11) NOT NULL,
  `Barrio_FK` int(11) DEFAULT NULL,
  `Ciudad_FK` int(11) DEFAULT NULL,
  `Corregimiento_FK` int(11) DEFAULT NULL,
  `Vereda_Fk` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `barrio_ciudad_corregimiento_vereda`:
--   `Barrio_FK`
--       `barrio` -> `Barrio_id`
--   `Ciudad_FK`
--       `ciudad` -> `Ciudad_id`
--   `Corregimiento_FK`
--       `corregimiento` -> `Corregimiento_id`
--   `Vereda_Fk`
--       `vereda` -> `Vereda_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrusel`
--

CREATE TABLE `carrusel` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen_url` varchar(500) NOT NULL,
  `orden` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `carrusel`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ciudad`
--

CREATE TABLE `ciudad` (
  `Ciudad_id` int(11) NOT NULL,
  `Ciudad` varchar(50) NOT NULL,
  `Municipio_FK` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `ciudad`:
--   `Municipio_FK`
--       `municipio` -> `Municipio_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `id` int(11) NOT NULL,
  `platform_user_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `asunto` varchar(150) DEFAULT NULL,
  `mensaje` text NOT NULL,
  `rol_contacto` varchar(50) DEFAULT NULL,
  `leido` tinyint(1) DEFAULT 0,
  `respuesta` text DEFAULT NULL,
  `fecha_envio` datetime DEFAULT current_timestamp(),
  `fecha_respuesta` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `contacto`:
--   `platform_user_id`
--       `platform_user` -> `Platform_user_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corregimiento`
--

CREATE TABLE `corregimiento` (
  `Corregimiento_id` int(11) NOT NULL,
  `Corregimiento` varchar(50) NOT NULL,
  `Municipio_FK` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `corregimiento`:
--   `Municipio_FK`
--       `municipio` -> `Municipio_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `designador_cardinal`
--

CREATE TABLE `designador_cardinal` (
  `Designador_cardinal_id` int(11) NOT NULL,
  `Cardinalidad` varchar(10) NOT NULL,
  `Abreviacion` varchar(10) NOT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `designador_cardinal`:
--

--
-- Volcado de datos para la tabla `designador_cardinal`
--

INSERT INTO `designador_cardinal` (`Designador_cardinal_id`, `Cardinalidad`, `Abreviacion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(3, 'Norte', 'N', 1, '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `Direccion_id` int(11) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Tipo_via` varchar(255) NOT NULL,
  `Numero_via_principal` int(11) NOT NULL,
  `Numero_calle_transversal` int(11) NOT NULL,
  `Numero_edificacion` int(11) NOT NULL,
  `Descripcion_adicional` varchar(50) NOT NULL,
  `Designador_cardinal_FK` int(11) DEFAULT NULL,
  `Localizacion_FK` int(11) DEFAULT NULL,
  `Barrio_ciudad_corregimiento_vereda_FK` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `direccion`:
--   `Barrio_ciudad_corregimiento_vereda_FK`
--       `barrio_ciudad_corregimiento_vereda` -> `Barrio_ciudad_corregimiento_vereda_id`
--   `Designador_cardinal_FK`
--       `designador_cardinal` -> `Designador_cardinal_id`
--   `Localizacion_FK`
--       `localizacion` -> `Localizacion_id`
--

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`Direccion_id`, `Direccion`, `Tipo_via`, `Numero_via_principal`, `Numero_calle_transversal`, `Numero_edificacion`, `Descripcion_adicional`, `Designador_cardinal_FK`, `Localizacion_FK`, `Barrio_ciudad_corregimiento_vereda_FK`, `Activo`, `Created_at`, `Updated_at`) VALUES
(3, 'Calle 123 #45-67', 'Calle', 123, 45, 67, 'Apto 101', 3, 3, NULL, 1, '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE `division` (
  `Division_id` int(11) NOT NULL,
  `Division` varchar(50) NOT NULL,
  `Balcon` varchar(2) NOT NULL DEFAULT 'No',
  `Baños` int(11) NOT NULL,
  `Terraza` int(11) NOT NULL,
  `Habitaciones` tinyint(4) NOT NULL,
  `Garaje` int(11) NOT NULL,
  `Ascensores` varchar(2) NOT NULL,
  `Area` varchar(10) NOT NULL,
  `Closets` int(11) DEFAULT NULL,
  `Estudio` tinyint(1) DEFAULT 0,
  `Sala` tinyint(1) DEFAULT 1,
  `Comedor` tinyint(1) DEFAULT 1,
  `Cocina` varchar(30) DEFAULT NULL,
  `Zona_lavanderia` tinyint(1) DEFAULT 0,
  `Deposito` tinyint(1) DEFAULT 0,
  `Descripcion_adicional` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `division`:
--

--
-- Volcado de datos para la tabla `division`
--

INSERT INTO `division` (`Division_id`, `Division`, `Balcon`, `Baños`, `Terraza`, `Habitaciones`, `Garaje`, `Ascensores`, `Area`, `Closets`, `Estudio`, `Sala`, `Comedor`, `Cocina`, `Zona_lavanderia`, `Deposito`, `Descripcion_adicional`, `Created_at`, `Updated_at`) VALUES
(3, 'Apartamento Grande', 'Si', 3, 1, 3, 2, 'Si', '120', 5, 1, 1, 1, 'Integral', 1, 1, 'Amplio apartamento con vista a la ciudad', '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `Estado_pago_id` int(10) NOT NULL,
  `Estado_pago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `estado_pago`:
--

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

--
-- RELACIONES PARA LA TABLA `factura`:
--   `Impuesto_valor_fk`
--       `impuesto_valor` -> `Impuesto_valor_id`
--   `Resolucion_factura_FK`
--       `resolucion_factura` -> `Resolucion_factura_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_inmueble`
--

CREATE TABLE `imagenes_inmueble` (
  `Imagenes_inmueble_id` int(11) NOT NULL,
  `Imagenes` varchar(255) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `imagenes_inmueble`:
--

--
-- Volcado de datos para la tabla `imagenes_inmueble`
--

INSERT INTO `imagenes_inmueble` (`Imagenes_inmueble_id`, `Imagenes`, `Nombre`, `URL`) VALUES
(5, 'apartamento_moderno_1.jpg', 'Vista Frontal Apartamento Moderno', 'https://ejemplo.com/imagenes/apartamento_moderno_1.jpg'),
(6, 'apartamento_moderno_2.jpg', 'Vista Interior Apartamento Moderno', 'https://ejemplo.com/imagenes/apartamento_moderno_2.jpg');

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

--
-- RELACIONES PARA LA TABLA `impuesto`:
--

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

--
-- RELACIONES PARA LA TABLA `impuesto_valor`:
--   `Impuesto_FK`
--       `impuesto` -> `Impuesto_id`
--   `Retenedor_iva_FK`
--       `retenedor_iva` -> `Retenedor_IVA_id`
--   `Valor_FK`
--       `valor` -> `Valor_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `Inmueble_id` int(11) NOT NULL,
  `Valor` int(11) NOT NULL,
  `Area` int(11) NOT NULL,
  `Descripcion_General` varchar(255) NOT NULL,
  `Antiguedad` int(11) NOT NULL,
  `Motivo_VoA` varchar(100) NOT NULL,
  `Situacion_inmueble` varchar(50) NOT NULL,
  `Tipo_edificacion_FK` int(11) NOT NULL,
  `Otras_caracteristicas_FK` int(11) NOT NULL,
  `Acerca_edificacion_FK` int(11) NOT NULL,
  `Division_FK` int(11) NOT NULL,
  `Imagenes_inmueble_FK` int(11) NOT NULL,
  `Codigo_interno` varchar(30) DEFAULT NULL,
  `Estado` varchar(20) DEFAULT 'disponible',
  `Fecha_publicacion` datetime DEFAULT current_timestamp(),
  `Fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Visitas` int(11) DEFAULT 0,
  `Observaciones` varchar(255) DEFAULT NULL,
  `Platform_user_FK` int(11) NOT NULL,
  `Direccion_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `inmueble`:
--   `Acerca_edificacion_FK`
--       `acerca_edificacion` -> `Acerca_edificacion_id`
--   `Direccion_FK`
--       `direccion` -> `Direccion_id`
--   `Division_FK`
--       `division` -> `Division_id`
--   `Imagenes_inmueble_FK`
--       `imagenes_inmueble` -> `Imagenes_inmueble_id`
--   `Otras_caracteristicas_FK`
--       `otras_caracteristicas` -> `Otras_caracteristicas_id`
--   `Platform_user_FK`
--       `platform_user` -> `Platform_user_id`
--   `Tipo_edificacion_FK`
--       `tipo_edificacion` -> `Tipo_edificacion_id`
--

--
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`Inmueble_id`, `Valor`, `Area`, `Descripcion_General`, `Antiguedad`, `Motivo_VoA`, `Situacion_inmueble`, `Tipo_edificacion_FK`, `Otras_caracteristicas_FK`, `Acerca_edificacion_FK`, `Division_FK`, `Imagenes_inmueble_FK`, `Codigo_interno`, `Estado`, `Fecha_publicacion`, `Fecha_actualizacion`, `Visitas`, `Observaciones`, `Platform_user_FK`, `Direccion_FK`) VALUES
(2, 250000000, 120, 'Apartamento moderno en el centro', 5, 'Venta', 'Disponible', 3, 3, 3, 3, 5, 'APT-101', 'disponible', '2025-08-13 19:45:54', '2025-08-13 19:45:54', 0, 'Sin observaciones', 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `localizacion`
--

CREATE TABLE `localizacion` (
  `Localizacion_id` int(11) NOT NULL,
  `Localizacion_descripcion` varchar(100) NOT NULL,
  `Latitud` decimal(10,8) DEFAULT NULL,
  `Longitud` decimal(11,8) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `localizacion`:
--

--
-- Volcado de datos para la tabla `localizacion`
--

INSERT INTO `localizacion` (`Localizacion_id`, `Localizacion_descripcion`, `Latitud`, `Longitud`, `Activo`, `Created_at`, `Updated_at`) VALUES
(3, 'Oficina Central Bogotás', 4.33600000, -74.05900000, 1, '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module`
--

CREATE TABLE `module` (
  `Module_id` int(11) NOT NULL,
  `Module_name` varchar(100) NOT NULL,
  `Module_route` varchar(255) NOT NULL,
  `Module_description` varchar(255) DEFAULT NULL,
  `Module_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `module`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `module_role`
--

CREATE TABLE `module_role` (
  `Module_role_id` int(11) NOT NULL,
  `Module_FK` int(11) NOT NULL,
  `Role_FK` int(11) NOT NULL,
  `Module_role_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `module_role`:
--   `Module_FK`
--       `module` -> `Module_id`
--   `Role_FK`
--       `role` -> `Role_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `Municipio_id` int(11) NOT NULL,
  `Ndap_FK` int(11) DEFAULT NULL,
  `Municipio_nombre` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Municipio_descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `municipio`:
--   `Ndap_FK`
--       `ndap` -> `Ndap_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ndap`
--

CREATE TABLE `ndap` (
  `Ndap_id` int(11) NOT NULL,
  `Ndap_descripcion` varchar(50) NOT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `ndap`:
--

--
-- Volcado de datos para la tabla `ndap`
--

INSERT INTO `ndap` (`Ndap_id`, `Ndap_descripcion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Nivel de Acceso Básico', 1, '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizacion_parqueadero`
--

CREATE TABLE `organizacion_parqueadero` (
  `Organizacion_parqueadero_id` int(11) NOT NULL,
  `Tipo_parqueadero` varchar(30) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Cubierto` tinyint(1) DEFAULT 0,
  `Disponible` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `organizacion_parqueadero`:
--

--
-- Volcado de datos para la tabla `organizacion_parqueadero`
--

INSERT INTO `organizacion_parqueadero` (`Organizacion_parqueadero_id`, `Tipo_parqueadero`, `Cantidad`, `Cubierto`, `Disponible`) VALUES
(3, 'Automóvil', 150, 0, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otras_caracteristicas`
--

CREATE TABLE `otras_caracteristicas` (
  `Otras_caracteristicas_id` int(11) NOT NULL,
  `Caracteristicas_descripcion` varchar(30) NOT NULL,
  `Deposito` int(11) NOT NULL,
  `Lavanderia` tinyint(1) NOT NULL,
  `Gas` tinyint(1) NOT NULL,
  `Piso` int(11) DEFAULT NULL,
  `Mascotas_permitidas` tinyint(1) DEFAULT 0,
  `Tipo_inmueble` varchar(30) NOT NULL,
  `Amoblado` tinyint(1) DEFAULT 0,
  `Descripcion_adicional` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Asignacion_FK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `otras_caracteristicas`:
--   `Asignacion_FK`
--       `asignacion` -> `Asignacion_id`
--

--
-- Volcado de datos para la tabla `otras_caracteristicas`
--

INSERT INTO `otras_caracteristicas` (`Otras_caracteristicas_id`, `Caracteristicas_descripcion`, `Deposito`, `Lavanderia`, `Gas`, `Piso`, `Mascotas_permitidas`, `Tipo_inmueble`, `Amoblado`, `Descripcion_adicional`, `Created_at`, `Updated_at`, `Asignacion_FK`) VALUES
(3, 'Apartamento con excelentes aca', 1, 1, 1, 5, 1, 'Apartamento', 1, 'Balcón amplio con vista a la ciudad.', '2025-08-13 19:45:54', '2025-08-13 19:45:54', 3);

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

--
-- RELACIONES PARA LA TABLA `pago`:
--   `Estado_pago_FK`
--       `estado_pago` -> `Estado_pago_id`
--   `Factura_FK`
--       `factura` -> `Factura_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permitions`
--

CREATE TABLE `permitions` (
  `Permitions_id` int(11) NOT NULL,
  `Permitions_name` varchar(50) NOT NULL,
  `Permitions_description` varchar(255) DEFAULT NULL,
  `Permitions_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `permitions`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permitions_module_role`
--

CREATE TABLE `permitions_module_role` (
  `Permitions_module_role_id` int(11) NOT NULL,
  `Module_role_FK` int(11) NOT NULL,
  `Permitions_FK` int(11) NOT NULL,
  `Permitions_module_role_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `permitions_module_role`:
--   `Permitions_FK`
--       `permitions` -> `Permitions_id`
--   `Module_role_FK`
--       `module_role` -> `Module_role_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_identity_document`
--

CREATE TABLE `platform_identity_document` (
  `Identity_document_id` int(11) NOT NULL,
  `Document_number` varchar(30) NOT NULL,
  `Document_type` varchar(30) NOT NULL,
  `Issued_country` varchar(50) DEFAULT NULL,
  `Issued_date` date DEFAULT NULL,
  `Expiration_date` date DEFAULT NULL,
  `Platform_profile_FK` int(11) NOT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_identity_document`:
--   `Platform_profile_FK`
--       `platform_profile` -> `Profile_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_module`
--

CREATE TABLE `platform_module` (
  `Platform_module_id` int(11) NOT NULL,
  `Module_name` varchar(50) NOT NULL,
  `Module_route` varchar(100) DEFAULT NULL,
  `Module_description` varchar(255) DEFAULT NULL,
  `Module_icon` varchar(100) DEFAULT NULL,
  `Module_status` tinyint(1) DEFAULT 1,
  `Module_order` int(11) DEFAULT 0,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_module`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_module_role`
--

CREATE TABLE `platform_module_role` (
  `Platform_module_role_id` int(11) NOT NULL,
  `Platform_module_FK` int(11) NOT NULL,
  `Platform_role_FK` int(11) NOT NULL,
  `Module_role_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_module_role`:
--   `Platform_role_FK`
--       `platform_role` -> `Platform_role_id`
--   `Platform_module_FK`
--       `platform_module` -> `Platform_module_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_permitions`
--

CREATE TABLE `platform_permitions` (
  `Platform_permitions_id` int(11) NOT NULL,
  `Permitions_name` varchar(50) NOT NULL,
  `Permitions_description` varchar(255) DEFAULT NULL,
  `Permitions_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_permitions`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_permitions_module_role`
--

CREATE TABLE `platform_permitions_module_role` (
  `Platform_permitions_module_role_id` int(11) NOT NULL,
  `Platform_module_role_FK` int(11) NOT NULL,
  `Platform_permitions_FK` int(11) NOT NULL,
  `Permitions_module_role_status` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_permitions_module_role`:
--   `Platform_permitions_FK`
--       `platform_permitions` -> `Platform_permitions_id`
--   `Platform_module_role_FK`
--       `platform_module_role` -> `Platform_module_role_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_profile`
--

CREATE TABLE `platform_profile` (
  `Profile_id` int(11) NOT NULL,
  `Profile_name` varchar(20) NOT NULL,
  `Profile_lastname` varchar(30) DEFAULT NULL,
  `Profile_phone` varchar(10) NOT NULL,
  `Profile_addres` varchar(30) NOT NULL,
  `Profile_email` varchar(30) NOT NULL,
  `Profile_photo` varchar(256) NOT NULL,
  `Profile_birthdate` date DEFAULT NULL,
  `Profile_gender` varchar(10) DEFAULT NULL,
  `Profile_national_id` varchar(20) DEFAULT NULL,
  `Profile_bio` text DEFAULT NULL,
  `Profile_website` varchar(100) DEFAULT NULL,
  `Profile_social` varchar(100) DEFAULT NULL,
  `Platform_user_FK` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_profile`:
--   `Platform_user_FK`
--       `platform_user` -> `Platform_user_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_role`
--

CREATE TABLE `platform_role` (
  `Platform_role_id` int(11) NOT NULL,
  `Role_name` varchar(50) NOT NULL,
  `Role_description` varchar(255) DEFAULT NULL,
  `Role_status` tinyint(1) DEFAULT 1,
  `Role_priority` int(11) DEFAULT 0,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_role`:
--

--
-- Volcado de datos para la tabla `platform_role`
--

INSERT INTO `platform_role` (`Platform_role_id`, `Role_name`, `Role_description`, `Role_status`, `Role_priority`, `Created_at`, `Updated_at`) VALUES
(1, 'administrador', 'acceso a todo', 1, 1, '2025-08-13 14:45:17', '2025-08-13 14:45:17'),
(2, 'usuario', 'puede navegar en la plataforma pero no tiene aseso a todas las funcionalidades', 1, 2, '2025-08-14 15:52:08', '2025-08-14 15:52:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_user`
--

CREATE TABLE `platform_user` (
  `Platform_user_id` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Platform_user_status_FK` int(11) NOT NULL,
  `Platform_role_FK` int(11) NOT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_user`:
--   `Platform_user_status_FK`
--       `platform_user_status` -> `Platform_user_status_id`
--   `Platform_role_FK`
--       `platform_role` -> `Platform_role_id`
--

--
-- Volcado de datos para la tabla `platform_user`
--

INSERT INTO `platform_user` (`Platform_user_id`, `Username`, `Password`, `Platform_user_status_FK`, `Platform_role_FK`, `Created_at`, `Updated_at`) VALUES
(1, 'jonathan0145', '$2b$10$7.DZDON7R2nNOI/KBYz0jOY08ZugzZMm3Vjo17WB5iE6u5Ou7mmPS', 1, 1, '2025-08-14 20:52:53', '2025-08-14 15:53:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `platform_user_status`
--

CREATE TABLE `platform_user_status` (
  `Platform_user_status_id` int(11) NOT NULL,
  `User_status_name` varchar(50) NOT NULL,
  `User_status_description` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `platform_user_status`:
--

--
-- Volcado de datos para la tabla `platform_user_status`
--

INSERT INTO `platform_user_status` (`Platform_user_status_id`, `User_status_name`, `User_status_description`, `Created_at`, `Updated_at`) VALUES
(1, 'activo', 'esta activo', '2025-08-13 14:44:48', '2025-08-13 14:44:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `politica_de_privacidad`
--

CREATE TABLE `politica_de_privacidad` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `version` varchar(20) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `politica_de_privacidad`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `porque_elegirnos`
--

CREATE TABLE `porque_elegirnos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `icono` varchar(255) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `porque_elegirnos`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas_frecuentes`
--

CREATE TABLE `preguntas_frecuentes` (
  `id` int(11) NOT NULL,
  `pregunta` varchar(255) NOT NULL,
  `respuesta` text NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `orden` int(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `preguntas_frecuentes`:
--

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

--
-- RELACIONES PARA LA TABLA `resolucion_factura`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `retenedor_iva`
--

CREATE TABLE `retenedor_iva` (
  `Retenedor_IVA_id` int(10) NOT NULL,
  `Porcentaje_retencion` decimal(5,2) NOT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `retenedor_iva`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `Role_id` int(11) NOT NULL,
  `Role_name` varchar(50) NOT NULL,
  `Role_description` varchar(255) DEFAULT NULL,
  `Role_status` tinyint(1) DEFAULT 1,
  `Role_priority` int(11) DEFAULT 0,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `role`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sobre_nosotros`
--

CREATE TABLE `sobre_nosotros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `sobre_nosotros`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `suscripcion`
--

CREATE TABLE `suscripcion` (
  `Suscripcion_id` int(10) NOT NULL,
  `Platform_user_FK` int(11) NOT NULL,
  `Suscripcion_fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Suscripcion_tipo` varchar(20) NOT NULL,
  `Suscripcion_descripcion` varchar(200) NOT NULL,
  `Suscripcion_duracion` varchar(15) NOT NULL,
  `Factura_FK` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `suscripcion`:
--   `Platform_user_FK`
--       `platform_user` -> `Platform_user_id`
--   `Factura_FK`
--       `factura` -> `Factura_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `terminos_y_condiciones`
--

CREATE TABLE `terminos_y_condiciones` (
  `Terminos_id` int(11) NOT NULL,
  `Titulo` varchar(255) NOT NULL,
  `Descripcion` text NOT NULL,
  `Fecha_creacion` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `terminos_y_condiciones`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_edificacion`
--

CREATE TABLE `tipo_edificacion` (
  `Tipo_edificacion_id` int(11) NOT NULL,
  `Tipo_edificacion_categoria` varchar(50) DEFAULT NULL,
  `Tipo_edificacion_descripcion` varchar(50) NOT NULL,
  `Tipo_edificacion_niveles` int(11) DEFAULT NULL,
  `Tipo_edificacion_activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `tipo_edificacion`:
--

--
-- Volcado de datos para la tabla `tipo_edificacion`
--

INSERT INTO `tipo_edificacion` (`Tipo_edificacion_id`, `Tipo_edificacion_categoria`, `Tipo_edificacion_descripcion`, `Tipo_edificacion_niveles`, `Tipo_edificacion_activo`, `Created_at`, `Updated_at`) VALUES
(3, 'Residencial', 'Apartamento en edificio de propiedad horizontal', 15, 1, '2025-08-13 19:45:54', '2025-08-13 19:45:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `User_id` int(11) NOT NULL,
  `User_user` varchar(100) NOT NULL,
  `User_password` varchar(255) NOT NULL,
  `User_status_FK` int(11) NOT NULL,
  `Role_FK` int(11) NOT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `users`:
--   `User_status_FK`
--       `user_status` -> `User_status_id`
--   `Role_FK`
--       `role` -> `Role_id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `User_status_id` int(11) NOT NULL,
  `User_status_name` varchar(50) NOT NULL,
  `User_status_description` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `user_status`:
--

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
-- RELACIONES PARA LA TABLA `valor`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vereda`
--

CREATE TABLE `vereda` (
  `Vereda_id` int(11) NOT NULL,
  `Vereda_nombre` varchar(50) NOT NULL,
  `Municipio_FK` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELACIONES PARA LA TABLA `vereda`:
--   `Municipio_FK`
--       `municipio` -> `Municipio_id`
--

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
  ADD KEY `Organizacion_parqueadero_FK_2` (`Organizacion_parqueadero_FK`);

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
  ADD KEY `bccv_barrio_fk` (`Barrio_FK`),
  ADD KEY `bccv_ciudad_fk` (`Ciudad_FK`),
  ADD KEY `bccv_corregimiento_fk` (`Corregimiento_FK`),
  ADD KEY `bccv_vereda_fk` (`Vereda_Fk`);

--
-- Indices de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD PRIMARY KEY (`Ciudad_id`),
  ADD KEY `ciudad_municipio_fk` (`Municipio_FK`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `platform_user_id` (`platform_user_id`);

--
-- Indices de la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  ADD PRIMARY KEY (`Corregimiento_id`),
  ADD KEY `corregimiento_municipio_fk` (`Municipio_FK`);

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
  ADD KEY `direccion_bccv_fk` (`Barrio_ciudad_corregimiento_vereda_FK`),
  ADD KEY `direccion_designador_cardinal_fk` (`Designador_cardinal_FK`),
  ADD KEY `direccion_localizacion_fk` (`Localizacion_FK`);

--
-- Indices de la tabla `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`Division_id`);

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
  ADD KEY `factura_resolucion_factura_fk` (`Resolucion_factura_FK`),
  ADD KEY `factura_impuesto_valor_fk` (`Impuesto_valor_fk`);

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
  ADD KEY `impuesto_valor_valor_fk` (`Valor_FK`),
  ADD KEY `impuesto_valor_impuesto_fk` (`Impuesto_FK`),
  ADD KEY `impuesto_valor_retenedor_iva_fk` (`Retenedor_iva_FK`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`Inmueble_id`),
  ADD UNIQUE KEY `Tipo_edificacion_FK` (`Tipo_edificacion_FK`),
  ADD UNIQUE KEY `Otras_caracteristicas_FK` (`Otras_caracteristicas_FK`),
  ADD UNIQUE KEY `Acerca_edificacion_FK` (`Acerca_edificacion_FK`),
  ADD UNIQUE KEY `Division_FK` (`Division_FK`),
  ADD UNIQUE KEY `Imagenes_inmueble_FK` (`Imagenes_inmueble_FK`),
  ADD KEY `inmueble_direccion_fk` (`Direccion_FK`),
  ADD KEY `inmueble_platform_user_fk` (`Platform_user_FK`);

--
-- Indices de la tabla `localizacion`
--
ALTER TABLE `localizacion`
  ADD PRIMARY KEY (`Localizacion_id`);

--
-- Indices de la tabla `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`Module_id`);

--
-- Indices de la tabla `module_role`
--
ALTER TABLE `module_role`
  ADD PRIMARY KEY (`Module_role_id`),
  ADD KEY `module_role_module_fk` (`Module_FK`),
  ADD KEY `module_role_role_fk` (`Role_FK`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`Municipio_id`),
  ADD KEY `municipio_ndap_fk` (`Ndap_FK`);

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
  ADD UNIQUE KEY `Asignacion_FK` (`Asignacion_FK`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`Pago_id`),
  ADD KEY `pago_estado_pago_fk` (`Estado_pago_FK`),
  ADD KEY `pago_factura_fk` (`Factura_FK`);

--
-- Indices de la tabla `permitions`
--
ALTER TABLE `permitions`
  ADD PRIMARY KEY (`Permitions_id`);

--
-- Indices de la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  ADD PRIMARY KEY (`Permitions_module_role_id`),
  ADD KEY `permitions_module_role_module_role_fk` (`Module_role_FK`),
  ADD KEY `permitions_module_role_permitions_fk` (`Permitions_FK`);

--
-- Indices de la tabla `platform_identity_document`
--
ALTER TABLE `platform_identity_document`
  ADD PRIMARY KEY (`Identity_document_id`),
  ADD UNIQUE KEY `Platform_profile_FK` (`Platform_profile_FK`);

--
-- Indices de la tabla `platform_module`
--
ALTER TABLE `platform_module`
  ADD PRIMARY KEY (`Platform_module_id`);

--
-- Indices de la tabla `platform_module_role`
--
ALTER TABLE `platform_module_role`
  ADD PRIMARY KEY (`Platform_module_role_id`),
  ADD KEY `platform_module_role_module_fk` (`Platform_module_FK`),
  ADD KEY `platform_module_role_role_fk` (`Platform_role_FK`);

--
-- Indices de la tabla `platform_permitions`
--
ALTER TABLE `platform_permitions`
  ADD PRIMARY KEY (`Platform_permitions_id`);

--
-- Indices de la tabla `platform_permitions_module_role`
--
ALTER TABLE `platform_permitions_module_role`
  ADD PRIMARY KEY (`Platform_permitions_module_role_id`),
  ADD KEY `platform_permitions_module_role_module_role_fk` (`Platform_module_role_FK`),
  ADD KEY `platform_permitions_module_role_permitions_fk` (`Platform_permitions_FK`);

--
-- Indices de la tabla `platform_profile`
--
ALTER TABLE `platform_profile`
  ADD PRIMARY KEY (`Profile_id`),
  ADD UNIQUE KEY `Platform_user_FK` (`Platform_user_FK`);

--
-- Indices de la tabla `platform_role`
--
ALTER TABLE `platform_role`
  ADD PRIMARY KEY (`Platform_role_id`);

--
-- Indices de la tabla `platform_user`
--
ALTER TABLE `platform_user`
  ADD PRIMARY KEY (`Platform_user_id`),
  ADD KEY `platform_user_status_fk` (`Platform_user_status_FK`),
  ADD KEY `platform_user_role_fk` (`Platform_role_FK`);

--
-- Indices de la tabla `platform_user_status`
--
ALTER TABLE `platform_user_status`
  ADD PRIMARY KEY (`Platform_user_status_id`);

--
-- Indices de la tabla `politica_de_privacidad`
--
ALTER TABLE `politica_de_privacidad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `porque_elegirnos`
--
ALTER TABLE `porque_elegirnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  ADD PRIMARY KEY (`id`);

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
  ADD PRIMARY KEY (`Role_id`);

--
-- Indices de la tabla `sobre_nosotros`
--
ALTER TABLE `sobre_nosotros`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD PRIMARY KEY (`Suscripcion_id`),
  ADD KEY `suscripcion_factura_fk` (`Factura_FK`),
  ADD KEY `suscripcion_platform_user_fk` (`Platform_user_FK`);

--
-- Indices de la tabla `terminos_y_condiciones`
--
ALTER TABLE `terminos_y_condiciones`
  ADD PRIMARY KEY (`Terminos_id`);

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
  ADD KEY `users_user_status_fk` (`User_status_FK`),
  ADD KEY `users_role_fk` (`Role_FK`);

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`User_status_id`);

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
  ADD KEY `vereda_municipio_fk` (`Municipio_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acerca_edificacion`
--
ALTER TABLE `acerca_edificacion`
  MODIFY `Acerca_edificacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  MODIFY `Asignacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `designador_cardinal`
--
ALTER TABLE `designador_cardinal`
  MODIFY `Designador_cardinal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `Direccion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `division`
--
ALTER TABLE `division`
  MODIFY `Division_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  MODIFY `Imagenes_inmueble_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `Inmueble_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `localizacion`
--
ALTER TABLE `localizacion`
  MODIFY `Localizacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `Module_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `module_role`
--
ALTER TABLE `module_role`
  MODIFY `Module_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `organizacion_parqueadero`
--
ALTER TABLE `organizacion_parqueadero`
  MODIFY `Organizacion_parqueadero_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  MODIFY `Otras_caracteristicas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permitions`
--
ALTER TABLE `permitions`
  MODIFY `Permitions_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  MODIFY `Permitions_module_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_identity_document`
--
ALTER TABLE `platform_identity_document`
  MODIFY `Identity_document_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_module`
--
ALTER TABLE `platform_module`
  MODIFY `Platform_module_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_module_role`
--
ALTER TABLE `platform_module_role`
  MODIFY `Platform_module_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_permitions`
--
ALTER TABLE `platform_permitions`
  MODIFY `Platform_permitions_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_permitions_module_role`
--
ALTER TABLE `platform_permitions_module_role`
  MODIFY `Platform_permitions_module_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_profile`
--
ALTER TABLE `platform_profile`
  MODIFY `Profile_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_role`
--
ALTER TABLE `platform_role`
  MODIFY `Platform_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `platform_user`
--
ALTER TABLE `platform_user`
  MODIFY `Platform_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `platform_user_status`
--
ALTER TABLE `platform_user_status`
  MODIFY `Platform_user_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `politica_de_privacidad`
--
ALTER TABLE `politica_de_privacidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `porque_elegirnos`
--
ALTER TABLE `porque_elegirnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `Role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sobre_nosotros`
--
ALTER TABLE `sobre_nosotros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `terminos_y_condiciones`
--
ALTER TABLE `terminos_y_condiciones`
  MODIFY `Terminos_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_edificacion`
--
ALTER TABLE `tipo_edificacion`
  MODIFY `Tipo_edificacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `User_status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD CONSTRAINT `asignacion_organizacion_parqueadero_fk` FOREIGN KEY (`Organizacion_parqueadero_FK`) REFERENCES `organizacion_parqueadero` (`Organizacion_parqueadero_id`);

--
-- Filtros para la tabla `barrio_ciudad_corregimiento_vereda`
--
ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `bccv_barrio_fk` FOREIGN KEY (`Barrio_FK`) REFERENCES `barrio` (`Barrio_id`),
  ADD CONSTRAINT `bccv_ciudad_fk` FOREIGN KEY (`Ciudad_FK`) REFERENCES `ciudad` (`Ciudad_id`),
  ADD CONSTRAINT `bccv_corregimiento_fk` FOREIGN KEY (`Corregimiento_FK`) REFERENCES `corregimiento` (`Corregimiento_id`),
  ADD CONSTRAINT `bccv_vereda_fk` FOREIGN KEY (`Vereda_Fk`) REFERENCES `vereda` (`Vereda_id`);

--
-- Filtros para la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `ciudad_municipio_fk` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`platform_user_id`) REFERENCES `platform_user` (`Platform_user_id`);

--
-- Filtros para la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  ADD CONSTRAINT `corregimiento_municipio_fk` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_bccv_fk` FOREIGN KEY (`Barrio_ciudad_corregimiento_vereda_FK`) REFERENCES `barrio_ciudad_corregimiento_vereda` (`Barrio_ciudad_corregimiento_vereda_id`),
  ADD CONSTRAINT `direccion_designador_cardinal_fk` FOREIGN KEY (`Designador_cardinal_FK`) REFERENCES `designador_cardinal` (`Designador_cardinal_id`),
  ADD CONSTRAINT `direccion_localizacion_fk` FOREIGN KEY (`Localizacion_FK`) REFERENCES `localizacion` (`Localizacion_id`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_impuesto_valor_fk` FOREIGN KEY (`Impuesto_valor_fk`) REFERENCES `impuesto_valor` (`Impuesto_valor_id`),
  ADD CONSTRAINT `factura_resolucion_factura_fk` FOREIGN KEY (`Resolucion_factura_FK`) REFERENCES `resolucion_factura` (`Resolucion_factura_id`);

--
-- Filtros para la tabla `impuesto_valor`
--
ALTER TABLE `impuesto_valor`
  ADD CONSTRAINT `impuesto_valor_impuesto_fk` FOREIGN KEY (`Impuesto_FK`) REFERENCES `impuesto` (`Impuesto_id`),
  ADD CONSTRAINT `impuesto_valor_retenedor_iva_fk` FOREIGN KEY (`Retenedor_iva_FK`) REFERENCES `retenedor_iva` (`Retenedor_IVA_id`),
  ADD CONSTRAINT `impuesto_valor_valor_fk` FOREIGN KEY (`Valor_FK`) REFERENCES `valor` (`Valor_id`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_acerca_edificacion_fk` FOREIGN KEY (`Acerca_edificacion_FK`) REFERENCES `acerca_edificacion` (`Acerca_edificacion_id`),
  ADD CONSTRAINT `inmueble_direccion_fk` FOREIGN KEY (`Direccion_FK`) REFERENCES `direccion` (`Direccion_id`),
  ADD CONSTRAINT `inmueble_division_fk` FOREIGN KEY (`Division_FK`) REFERENCES `division` (`Division_id`),
  ADD CONSTRAINT `inmueble_imagenes_inmueble_fk` FOREIGN KEY (`Imagenes_inmueble_FK`) REFERENCES `imagenes_inmueble` (`Imagenes_inmueble_id`),
  ADD CONSTRAINT `inmueble_otras_caracteristicas_fk` FOREIGN KEY (`Otras_caracteristicas_FK`) REFERENCES `otras_caracteristicas` (`Otras_caracteristicas_id`),
  ADD CONSTRAINT `inmueble_platform_user_fk` FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`),
  ADD CONSTRAINT `inmueble_tipo_edificacion_fk` FOREIGN KEY (`Tipo_edificacion_FK`) REFERENCES `tipo_edificacion` (`Tipo_edificacion_id`);

--
-- Filtros para la tabla `module_role`
--
ALTER TABLE `module_role`
  ADD CONSTRAINT `module_role_module_fk` FOREIGN KEY (`Module_FK`) REFERENCES `module` (`Module_id`),
  ADD CONSTRAINT `module_role_role_fk` FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ndap_fk` FOREIGN KEY (`Ndap_FK`) REFERENCES `ndap` (`Ndap_id`);

--
-- Filtros para la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  ADD CONSTRAINT `otras_caracteristicas_asignacion_fk` FOREIGN KEY (`Asignacion_FK`) REFERENCES `asignacion` (`Asignacion_id`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `pago_estado_pago_fk` FOREIGN KEY (`Estado_pago_FK`) REFERENCES `estado_pago` (`Estado_pago_id`),
  ADD CONSTRAINT `pago_factura_fk` FOREIGN KEY (`Factura_FK`) REFERENCES `factura` (`Factura_id`);

--
-- Filtros para la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  ADD CONSTRAINT `permitions_module_role_ibfk_1` FOREIGN KEY (`Permitions_FK`) REFERENCES `permitions` (`Permitions_id`),
  ADD CONSTRAINT `permitions_module_role_ibfk_2` FOREIGN KEY (`Module_role_FK`) REFERENCES `module_role` (`Module_role_id`);

--
-- Filtros para la tabla `platform_identity_document`
--
ALTER TABLE `platform_identity_document`
  ADD CONSTRAINT `platform_identity_document_profile_fk` FOREIGN KEY (`Platform_profile_FK`) REFERENCES `platform_profile` (`Profile_id`);

--
-- Filtros para la tabla `platform_module_role`
--
ALTER TABLE `platform_module_role`
  ADD CONSTRAINT `platform_module_role_ibfk_1` FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`),
  ADD CONSTRAINT `platform_module_role_ibfk_2` FOREIGN KEY (`Platform_module_FK`) REFERENCES `platform_module` (`Platform_module_id`);

--
-- Filtros para la tabla `platform_permitions_module_role`
--
ALTER TABLE `platform_permitions_module_role`
  ADD CONSTRAINT `platform_permitions_module_role_ibfk_1` FOREIGN KEY (`Platform_permitions_FK`) REFERENCES `platform_permitions` (`Platform_permitions_id`),
  ADD CONSTRAINT `platform_permitions_module_role_ibfk_2` FOREIGN KEY (`Platform_module_role_FK`) REFERENCES `platform_module_role` (`Platform_module_role_id`);

--
-- Filtros para la tabla `platform_profile`
--
ALTER TABLE `platform_profile`
  ADD CONSTRAINT `platform_profile_ibfk_1` FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`);

--
-- Filtros para la tabla `platform_user`
--
ALTER TABLE `platform_user`
  ADD CONSTRAINT `platform_user_ibfk_1` FOREIGN KEY (`Platform_user_status_FK`) REFERENCES `platform_user_status` (`Platform_user_status_id`),
  ADD CONSTRAINT `platform_user_ibfk_2` FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`);

--
-- Filtros para la tabla `suscripcion`
--
ALTER TABLE `suscripcion`
  ADD CONSTRAINT `suscripcion_ibfk_1` FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`),
  ADD CONSTRAINT `suscripcion_ibfk_2` FOREIGN KEY (`Factura_FK`) REFERENCES `factura` (`Factura_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`User_status_FK`) REFERENCES `user_status` (`User_status_id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`);

--
-- Filtros para la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD CONSTRAINT `vereda_ibfk_1` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);


--
-- Metadatos
--
USE `phpmyadmin`;

--
-- Metadatos para la tabla acerca_edificacion
--

--
-- Metadatos para la tabla asignacion
--

--
-- Metadatos para la tabla barrio
--

--
-- Metadatos para la tabla barrio_ciudad_corregimiento_vereda
--

--
-- Metadatos para la tabla carrusel
--

--
-- Metadatos para la tabla ciudad
--

--
-- Metadatos para la tabla contacto
--

--
-- Metadatos para la tabla corregimiento
--

--
-- Metadatos para la tabla designador_cardinal
--

--
-- Metadatos para la tabla direccion
--

--
-- Metadatos para la tabla division
--

--
-- Metadatos para la tabla estado_pago
--

--
-- Metadatos para la tabla factura
--

--
-- Metadatos para la tabla imagenes_inmueble
--

--
-- Metadatos para la tabla impuesto
--

--
-- Metadatos para la tabla impuesto_valor
--

--
-- Metadatos para la tabla inmueble
--

--
-- Metadatos para la tabla localizacion
--

--
-- Metadatos para la tabla module
--

--
-- Metadatos para la tabla module_role
--

--
-- Metadatos para la tabla municipio
--

--
-- Metadatos para la tabla ndap
--

--
-- Metadatos para la tabla organizacion_parqueadero
--

--
-- Metadatos para la tabla otras_caracteristicas
--

--
-- Metadatos para la tabla pago
--

--
-- Metadatos para la tabla permitions
--

--
-- Metadatos para la tabla permitions_module_role
--

--
-- Metadatos para la tabla platform_identity_document
--

--
-- Metadatos para la tabla platform_module
--

--
-- Metadatos para la tabla platform_module_role
--

--
-- Metadatos para la tabla platform_permitions
--

--
-- Metadatos para la tabla platform_permitions_module_role
--

--
-- Metadatos para la tabla platform_profile
--

--
-- Metadatos para la tabla platform_role
--

--
-- Metadatos para la tabla platform_user
--

--
-- Metadatos para la tabla platform_user_status
--

--
-- Metadatos para la tabla politica_de_privacidad
--

--
-- Metadatos para la tabla porque_elegirnos
--

--
-- Metadatos para la tabla preguntas_frecuentes
--

--
-- Metadatos para la tabla resolucion_factura
--

--
-- Metadatos para la tabla retenedor_iva
--

--
-- Metadatos para la tabla role
--

--
-- Metadatos para la tabla sobre_nosotros
--

--
-- Metadatos para la tabla suscripcion
--

--
-- Metadatos para la tabla terminos_y_condiciones
--

--
-- Metadatos para la tabla tipo_edificacion
--

--
-- Metadatos para la tabla users
--

--
-- Metadatos para la tabla user_status
--

--
-- Metadatos para la tabla valor
--

--
-- Metadatos para la tabla vereda
--

--
-- Metadatos para la base de datos inmotech_fs_development
--

--
-- Volcado de datos para la tabla `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('inmotech_fs_development', 'inmotech');

SET @LAST_PAGE = LAST_INSERT_ID();

--
-- Volcado de datos para la tabla `pma__table_coords`
--

INSERT INTO `pma__table_coords` (`db_name`, `table_name`, `pdf_page_number`, `x`, `y`) VALUES
('inmotech_fs_development', 'acerca_edificacion', @LAST_PAGE, 1634, 1458),
('inmotech_fs_development', 'asignacion', @LAST_PAGE, 1594, 1219),
('inmotech_fs_development', 'barrio', @LAST_PAGE, 1319, 1979),
('inmotech_fs_development', 'barrio_ciudad_corregimiento_vereda', @LAST_PAGE, 769, 2209),
('inmotech_fs_development', 'carrusel', @LAST_PAGE, 134, 2479),
('inmotech_fs_development', 'ciudad', @LAST_PAGE, 1513, 2140),
('inmotech_fs_development', 'contacto', @LAST_PAGE, 102, 704),
('inmotech_fs_development', 'corregimiento', @LAST_PAGE, 1751, 2366),
('inmotech_fs_development', 'designador_cardinal', @LAST_PAGE, 827, 1965),
('inmotech_fs_development', 'direccion', @LAST_PAGE, 386, 2045),
('inmotech_fs_development', 'division', @LAST_PAGE, 1263, 1479),
('inmotech_fs_development', 'estado_pago', @LAST_PAGE, 1727, 421),
('inmotech_fs_development', 'factura', @LAST_PAGE, 1717, 554),
('inmotech_fs_development', 'imagenes_inmueble', @LAST_PAGE, 845, 1714),
('inmotech_fs_development', 'impuesto', @LAST_PAGE, 2587, 753),
('inmotech_fs_development', 'impuesto_valor', @LAST_PAGE, 2259, 711),
('inmotech_fs_development', 'inmueble', @LAST_PAGE, 452, 1100),
('inmotech_fs_development', 'localizacion', @LAST_PAGE, 27, 2099),
('inmotech_fs_development', 'module', @LAST_PAGE, 1227, 132),
('inmotech_fs_development', 'module_role', @LAST_PAGE, 902, 32),
('inmotech_fs_development', 'municipio', @LAST_PAGE, 2173, 2387),
('inmotech_fs_development', 'ndap', @LAST_PAGE, 2536, 2407),
('inmotech_fs_development', 'organizacion_parqueadero', @LAST_PAGE, 2058, 1210),
('inmotech_fs_development', 'otras_caracteristicas', @LAST_PAGE, 1175, 1092),
('inmotech_fs_development', 'pago', @LAST_PAGE, 2033, 325),
('inmotech_fs_development', 'permitions', @LAST_PAGE, 1917, 60),
('inmotech_fs_development', 'permitions_module_role', @LAST_PAGE, 1515, 36),
('inmotech_fs_development', 'platform_identity_document', @LAST_PAGE, 1243, 360),
('inmotech_fs_development', 'platform_module', @LAST_PAGE, 1660, 972),
('inmotech_fs_development', 'platform_module_role', @LAST_PAGE, 1247, 882),
('inmotech_fs_development', 'platform_permitions', @LAST_PAGE, 2303, 881),
('inmotech_fs_development', 'platform_permitions_module_role', @LAST_PAGE, 1752, 764),
('inmotech_fs_development', 'platform_profile', @LAST_PAGE, 790, 327),
('inmotech_fs_development', 'platform_role', @LAST_PAGE, 880, 848),
('inmotech_fs_development', 'platform_user', @LAST_PAGE, 441, 726),
('inmotech_fs_development', 'platform_user_status', @LAST_PAGE, 51, 352),
('inmotech_fs_development', 'politica_de_privacidad', @LAST_PAGE, 459, 2684),
('inmotech_fs_development', 'porque_elegirnos', @LAST_PAGE, 880, 2579),
('inmotech_fs_development', 'preguntas_frecuentes', @LAST_PAGE, 949, 2817),
('inmotech_fs_development', 'resolucion_factura', @LAST_PAGE, 2222, 537),
('inmotech_fs_development', 'retenedor_iva', @LAST_PAGE, 2560, 587),
('inmotech_fs_development', 'role', @LAST_PAGE, 650, 78),
('inmotech_fs_development', 'sobre_nosotros', @LAST_PAGE, 131, 2723),
('inmotech_fs_development', 'suscripcion', @LAST_PAGE, 1221, 660),
('inmotech_fs_development', 'terminos_y_condiciones', @LAST_PAGE, 462, 2500),
('inmotech_fs_development', 'tipo_edificacion', @LAST_PAGE, 796, 1041),
('inmotech_fs_development', 'user_status', @LAST_PAGE, 46, 62),
('inmotech_fs_development', 'users', @LAST_PAGE, 372, 0),
('inmotech_fs_development', 'valor', @LAST_PAGE, 2590, 436),
('inmotech_fs_development', 'vereda', @LAST_PAGE, 1733, 2573);

--
-- Volcado de datos para la tabla `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('inmotech_fs_development', 'sa');

SET @LAST_PAGE = LAST_INSERT_ID();

--
-- Volcado de datos para la tabla `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('inmotech_fs_development', 'inmotech v1.1');

SET @LAST_PAGE = LAST_INSERT_ID();

--
-- Volcado de datos para la tabla `pma__pdf_pages`
--

INSERT INTO `pma__pdf_pages` (`db_name`, `page_descr`) VALUES
('inmotech_fs_development', 'falta facturacion y suscripcion');

SET @LAST_PAGE = LAST_INSERT_ID();
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
