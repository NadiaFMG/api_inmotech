-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-08-2025 a las 04:32:48
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
-- Volcado de datos para la tabla `acerca_edificacion`
--

INSERT INTO `acerca_edificacion` (`Acerca_edificacion_id`, `AcercaDeLaEdificacion`, `Estrato`, `Tipo_construccion`, `Anio_construccion`, `Estado_conservacion`, `Zona_comun`, `Descripcion_adicional`, `Created_at`, `Updated_at`) VALUES
(1, 'Edificio de Apartamentos Residencial', 4, 'Tradicional', 2005, 'Excelente', 1, 'Cuenta con piscina, gimnasio y salones sociales.', '2025-06-05 17:23:34', '2025-06-05 17:23:34'),
(2, 'Conjunto de Oficinas Corporativas', 5, 'Moderna', 2018, 'Nuevo', 1, 'Incluye auditorio, salas de reuniones y recepción 24h.', '2025-06-05 17:23:34', '2025-06-05 17:23:34'),
(3, 'Casa Independiente Familiar', 3, 'Mixta', 1998, 'Buen estado', 0, 'Amplio patio y jardín. Ideal para remodelar.', '2025-06-05 17:23:34', '2025-06-05 17:23:34'),
(4, 'Centro Comercial de Alto Tráfico', 6, 'Mixta', 2010, 'Excelente', 1, 'Grandes zonas de parqueo y seguridad privada.', '2025-06-05 17:23:34', '2025-06-05 17:23:34'),
(5, 'Bodega Industrial con Oficinas', 2, 'Prefabricada', 2003, 'Aceptable', 0, 'Espacio de almacenamiento y carga de vehículos pesados.', '2025-06-05 17:23:34', '2025-06-05 17:23:34'),
(6, 'fghytj', 5, 'wertwert', 2004, 'bien', 1, 'qazxsw', '2025-07-11 13:20:58', '2025-07-11 13:20:58'),
(7, 'hjhgkuyi', 4, 'dghdhfdg', 2003, 'mal', 0, 'edcvfe', '2025-07-11 13:20:58', '2025-07-11 13:20:58'),
(8, 'dfsgsdr', 3, 'vbmnvbmnvb', 2002, 'bien', 0, 'tgbnhy', '2025-07-11 13:20:58', '2025-07-11 13:20:58'),
(9, 'gfr', 2, 'gdfgh', 2001, 'bien', 1, 'ujm,ki', '2025-07-11 13:20:58', '2025-07-11 13:20:58'),
(10, 'dsds', 1, 'nhyyyh', 2000, 'bien', 0, 'iuyhjk', '2025-07-11 13:20:58', '2025-07-11 13:20:58'),
(11, 'Conjunto de Oficinas Corporativas', 5, 'Moderna', 2018, 'Nuevo', 1, 'Incluye auditorio, salas de reuniones y recepción 24h.', '2025-07-18 15:57:17', '2025-07-18 15:57:17');

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
-- Volcado de datos para la tabla `asignacion`
--

INSERT INTO `asignacion` (`Asignacion_id`, `Parqueaderos_asignados`, `Organizacion_parqueadero_FK`, `Disponible`, `Descripcion`, `Created_at`, `Updated_at`) VALUES
(1, '[\"5\",\"6\"]', 1, 1, 'ghjghj', '2025-07-11 12:48:13', '2025-07-11 12:48:13'),
(2, '[\"4\",\"5\"]', 2, 1, 'fghfgh', '2025-07-11 12:48:13', '2025-07-11 12:48:13'),
(3, '[\"34\",\"4\"]', 3, 1, 'dfgdfg', '2025-07-11 12:48:13', '2025-07-11 12:48:13'),
(4, '[\"2\",\"3\"]', 4, 1, 'sdfsdf', '2025-07-11 12:48:13', '2025-07-11 12:48:13'),
(5, '[\"1\",\"2\"]', 5, 1, 'asdasd', '2025-07-11 12:48:13', '2025-07-11 12:48:13'),
(11, '[\"A101\", \"A102\"]', 1, 1, 'Parqueaderos asignados al apto 101 y 102 en la Org. 1', '2025-06-05 04:44:02', '2025-06-05 04:50:24'),
(21, '[\"C301\", \"C302\", \"C303\"]', 2, 0, 'Parqueaderos de uso exclusivo del local 301, Org. 2 (actualmente no disponibles)', '2025-06-05 04:49:03', '2025-06-05 04:49:03'),
(27, '[\"D401\"]', 3, 1, 'Parqueadero general para visitantes, Org. 3', '2025-06-05 04:50:03', '2025-06-05 04:50:03'),
(35, '[\"A108\",\"A107\"]', 1, 1, 'parqueaderos asignados', '2025-07-10 12:09:55', '2025-07-10 12:09:55'),
(36, '[\"A108\",\"A109\"]', 1, 1, 'parqueaderos asignados', '2025-07-10 12:14:01', '2025-07-10 12:14:01'),
(37, '[\"A101\", \"A102\"]', 11, 1, 'Parqueaderos asignados al apto 101 y 102', '2025-07-18 15:57:17', '2025-07-18 15:57:17');

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
-- Volcado de datos para la tabla `barrio`
--

INSERT INTO `barrio` (`Barrio_id`, `Nombre_barrio`, `Created_at`, `Updated_at`) VALUES
(0, 'Autopista Norte', '2025-07-18 15:57:18', '2025-07-18 15:57:18'),
(1, 'Autopista Norte', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(2, 'Arborizadora Alta', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(3, 'Altos de Suba', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(4, 'Alhambra', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(5, 'Américas Occidental', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(6, 'Andes', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(7, 'Bosa Central', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(8, 'Bella Vista', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(9, 'Bosque Popular', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(10, 'Batán', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(11, 'Brasil', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(12, 'Britalia', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(13, 'Bochica', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(14, 'Bolivia', '2025-06-04 23:41:24', '2025-06-04 23:41:24'),
(15, 'Boyacá Real', '2025-06-04 23:41:24', '2025-06-04 23:41:24');

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
-- Volcado de datos para la tabla `barrio_ciudad_corregimiento_vereda`
--

INSERT INTO `barrio_ciudad_corregimiento_vereda` (`Barrio_ciudad_corregimiento_vereda_id`, `Barrio_FK`, `Ciudad_FK`, `Corregimiento_FK`, `Vereda_Fk`, `Activo`, `Created_at`, `Updated_at`) VALUES
(1, 1, 1, NULL, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(2, 2, 1, NULL, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(3, NULL, 1, 1, 1, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(4, NULL, 2, NULL, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(5, NULL, 3, NULL, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(6, NULL, 2, 2, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(7, NULL, NULL, NULL, 2, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(8, NULL, 3, 3, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(9, NULL, NULL, NULL, 3, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(10, NULL, 4, 4, NULL, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00'),
(11, NULL, 9, 9, 9, 1, '2025-06-05 01:21:00', '2025-06-05 01:21:00');

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
-- Volcado de datos para la tabla `carrusel`
--

INSERT INTO `carrusel` (`id`, `titulo`, `descripcion`, `imagen_url`, `orden`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(4, 'edificios', 'ofcinas para rentar', '/assets/images/carrusel/1752345176272-111199872.png', 3, 1, '2025-07-10 19:56:19', '2025-07-12 20:17:10'),
(5, 'apartamentos familiares', 'apartamentos para un mejor vivir', '/assets/images/carrusel/1752345218060-823936853.png', 2, 1, '2025-07-10 21:48:14', '2025-07-12 20:16:52'),
(6, 'nueva imagen', 'es una imagen nueva', '/assets/images/carrusel/1752345239311-977986003.png', 1, 1, '2025-07-10 22:01:21', '2025-07-12 18:33:59');

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
-- Volcado de datos para la tabla `ciudad`
--

INSERT INTO `ciudad` (`Ciudad_id`, `Ciudad`, `Municipio_FK`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Bogotá', 1, 1, '2025-07-18 15:57:18', '2025-07-18 15:57:18'),
(1, 'Bogotá', 1, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(2, 'Suba', 1, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(3, 'Engativá', 1, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(4, 'Envigado', 2, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(5, 'Itagüí', 2, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(6, 'Palmira', 3, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(7, 'Soledad', 4, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(8, 'Turbaco', 5, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(9, 'Floridablanca', 6, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03'),
(10, 'Dosquebradas', 7, 1, '2025-06-04 23:48:03', '2025-06-04 23:48:03');

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
-- Volcado de datos para la tabla `corregimiento`
--

INSERT INTO `corregimiento` (`Corregimiento_id`, `Corregimiento`, `Municipio_FK`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Sumapaz', 1, 1, '2025-07-18 15:57:19', '2025-07-18 15:57:19'),
(1, 'Sumapaz', 1, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(2, 'San Antonio de Prado', 2, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(3, 'Pance', 3, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(4, 'Juan Mina', 4, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(5, 'Bayunca', 5, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(6, 'El Centro', 6, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(7, 'La Florida', 7, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(8, 'La Cuchilla', 8, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(9, 'Apiay', 9, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51'),
(10, 'Salitre', 10, 1, '2025-06-05 00:58:51', '2025-06-05 00:58:51');

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
-- Volcado de datos para la tabla `designador_cardinal`
--

INSERT INTO `designador_cardinal` (`Designador_cardinal_id`, `Cardinalidad`, `Abreviacion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Norte', 'N', 1, '2025-07-18 15:57:18', '2025-07-18 15:57:18'),
(1, 'Norte', 'N', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(2, 'Sur', 'S', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(3, 'Este', 'E', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(4, 'Oeste', 'O', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(5, 'Noreste', 'NE', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(6, 'Noroeste', 'NO', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(7, 'Sureste', 'SE', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18'),
(8, 'Suroeste', 'SO', 1, '2025-06-05 01:10:18', '2025-06-05 01:10:18');

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
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`Direccion_id`, `Direccion`, `Tipo_via`, `Numero_via_principal`, `Numero_calle_transversal`, `Numero_edificacion`, `Descripcion_adicional`, `Designador_cardinal_FK`, `Localizacion_FK`, `Barrio_ciudad_corregimiento_vereda_FK`, `Activo`, `Created_at`, `Updated_at`) VALUES
(1, 'Calle 100 # 15-30', 'Calle', 100, 15, 30, 'Edificio Empresarial', 1, 1, 1, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(2, 'Carrera 7 # 72-50', 'Carrera', 7, 72, 50, 'Piso 5', 1, 2, 2, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(3, 'Avenida Suba # 128-40', 'Avenida', 128, 40, 0, 'Centro Comercial', 2, 3, 3, 1, '2025-06-05 01:42:48', '2025-07-11 17:52:36'),
(4, 'Transversal 22 # 5-80 Sur', 'Transversal', 22, 5, 80, 'Conjunto Residencial', 2, 4, 4, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(5, 'Diagonal 115 # 49-20', 'Diagonal', 115, 49, 20, 'Local Esquinero', NULL, 5, 5, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(6, 'Circular 3 # 73-10', 'Circular', 3, 73, 10, 'Oficina Pequeña', NULL, 6, 6, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(7, 'Carrera 68 # 45A-05', 'Carrera', 68, 45, 5, 'Bodega Principal', NULL, 7, 7, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(8, 'Calle 38 Sur # 78B-15', 'Calle', 38, 78, 15, 'Tienda de barrio', 2, 8, 8, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48'),
(9, 'Avenida El Dorado # 68-50', 'Avenida', 68, 68, 50, 'Edificio Corporativo', 3, 9, 9, 1, '2025-06-05 01:42:48', '2025-06-05 01:42:48');

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
-- Volcado de datos para la tabla `division`
--

INSERT INTO `division` (`Division_id`, `Division`, `Balcon`, `Baños`, `Terraza`, `Habitaciones`, `Garaje`, `Ascensores`, `Area`, `Closets`, `Estudio`, `Sala`, `Comedor`, `Cocina`, `Zona_lavanderia`, `Deposito`, `Descripcion_adicional`, `Created_at`, `Updated_at`) VALUES
(1, 'Apartamento Grande', 'Si', 3, 1, 3, 2, 'Si', '', 5, 1, 1, 1, 'Integral', 1, 1, 'Amplio apartamento con vista a la ciudad', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(2, 'Apartamento Pequeño', 'No', 1, 0, 1, 0, 'Si', '', 2, 0, 1, 1, 'Semi-integral', 1, 0, 'Ideal para una persona o pareja', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(3, 'Casa Familiar', 'Si', 4, 1, 4, 3, 'No', '', 6, 1, 1, 1, 'Abierta', 1, 1, 'Casa de dos pisos con jardín', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(4, 'Oficina Moderna', 'No', 2, 0, 0, 1, 'Si', '', 3, 1, 0, 0, NULL, 0, 1, 'Espacio de trabajo flexible y luminoso', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(5, 'Local Comercial', 'No', 1, 0, 0, 0, 'No', '', 0, 0, 0, 0, NULL, 0, 0, 'Local a pie de calle, excelente ubicación', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(6, 'Apartaestudio', 'No', 1, 0, 1, 0, 'Si', '', 1, 0, 1, 0, 'Americana', 1, 0, 'Compacto y funcional', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(7, 'Loft con doble altura', 'Si', 2, 0, 1, 1, 'Si', '', 3, 1, 1, 1, 'Abierta', 1, 1, 'Diseño moderno y espacios abiertos', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(8, 'Bodega Industrial', 'No', 1, 0, 0, 5, 'No', '', 0, 0, 0, 0, NULL, 0, 1, 'Gran espacio para almacenamiento y logística', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(9, 'Consultorio Médico', 'No', 1, 0, 0, 0, 'Si', '', 1, 0, 0, 0, NULL, 0, 0, 'Ubicado en centro médico, con sala de espera', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(10, 'Penthouse Lujoso', 'Si', 5, 1, 5, 3, 'Si', '', 8, 1, 1, 1, 'Isla', 1, 1, 'Vistas panorámicas y acabados de lujo', '2025-06-05 01:49:52', '2025-06-05 01:49:52'),
(11, 'Apartamento Pequeño', 'No', 1, 0, 1, 0, 'Si', '', 2, 0, 1, 1, 'Semi-integral', 1, 0, 'Ideal para una persona o pareja', '2025-07-18 15:57:18', '2025-07-18 15:57:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pago`
--

CREATE TABLE `estado_pago` (
  `Estado_pago_id` int(10) NOT NULL,
  `Estado_pago` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_pago`
--

INSERT INTO `estado_pago` (`Estado_pago_id`, `Estado_pago`) VALUES
(1, 'Pendiente'),
(2, 'Pagado'),
(3, 'Vencido'),
(4, 'Rechazado'),
(5, 'Reembolsado');

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
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`Factura_id`, `Factura_NO`, `Nit_Vendedor`, `Nit_Adquiriente`, `FechaEmision`, `Resolucion_factura_FK`, `Impuesto_valor_fk`) VALUES
(1, 1001, '900123456-7', '800987654-3', '2025-06-05 12:38:03', 1, 1),
(2, 1002, '900123456-7', '750123456-9', '2025-06-05 12:38:03', 1, 3),
(3, 1003, '900123456-7', '910234567-8', '2025-06-05 12:38:03', 2, 5),
(4, 1004, '900123456-7', '820345678-0', '2025-06-05 12:38:03', 1, 6),
(5, 1005, '900123456-7', '700456789-1', '2025-06-05 12:38:03', 2, 8),
(6, 1006, '900123456-7', '850567890-2', '2025-06-05 12:38:03', 1, NULL);

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
-- Volcado de datos para la tabla `imagenes_inmueble`
--

INSERT INTO `imagenes_inmueble` (`Imagenes_inmueble_id`, `Imagenes`, `Nombre`, `URL`) VALUES
(1, 'apartamento_moderno_1.jpg', 'Vista Frontal Apartamento Moderno', 'https://ejemplo.com/imagenes/apartamento_moderno_1.jpg'),
(2, 'apartamento_moderno_2.jpg', 'Cocina Apartamento Moderno', 'https://ejemplo.com/imagenes/apartamento_moderno_2.jpg'),
(3, 'casa_campestre_1.jpg', 'Fachada Casa Campestre', 'https://ejemplo.com/imagenes/casa_campestre_1.jpg'),
(4, 'casa_campestre_2.jpg', 'Jardín Casa Campestre', 'https://ejemplo.com/imagenes/casa_campestre_2.jpg'),
(5, 'oficina_central_1.png', 'Recepción Oficina Central', 'https://ejemplo.com/imagenes/oficina_central_1.png'),
(6, 'local_comercial_1.jpeg', 'Interior Local Comercial', 'https://ejemplo.com/imagenes/local_comercial_1.jpeg'),
(7, 'apartamento_lujo_1.jpg', 'Sala de Estar Apartamento Lujo', 'https://ejemplo.com/imagenes/apartamento_lujo_1.jpg'),
(8, 'apartamento_lujo_2.jpg', 'Dormitorio Principal Apartamento Lujo', 'https://ejemplo.com/imagenes/apartamento_lujo_2.jpg'),
(9, 'apartamento_lujo_3.jpg', 'Baño Principal Apartamento Lujo', 'https://ejemplo.com/imagenes/apartamento_lujo_3.jpg'),
(10, 'casa_familiar_1.jpg', 'Entrada Principal Casa Familiar', 'https://ejemplo.com/imagenes/casa_familiar_1.jpg'),
(11, 'apartamento_moderno_2.jpg', 'Cocina Apartamento Moderno', 'https://ejemplo.com/imagenes/apartamento_moderno_2.jpg');

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
-- Volcado de datos para la tabla `impuesto`
--

INSERT INTO `impuesto` (`Impuesto_id`, `impuesto`, `TipodeImpuesto`, `Porcentaje`, `Column`) VALUES
(1, 'IVA', 1, 19, NULL),
(2, 'Retefuente', 2, 2, NULL),
(3, 'Predial', 3, 1, NULL),
(4, 'ICA', 4, 1, NULL),
(5, 'Timbre', 5, 0, NULL);

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
-- Volcado de datos para la tabla `impuesto_valor`
--

INSERT INTO `impuesto_valor` (`Impuesto_valor_id`, `Valor_FK`, `Retenedor_iva_FK`, `Impuesto_FK`) VALUES
(1, 6, 2, 1),
(2, 7, 1, 4),
(3, 8, NULL, 3),
(4, 9, NULL, 3),
(5, 10, 1, 1),
(6, 11, NULL, 3),
(7, 12, NULL, 3),
(8, 13, 1, 1),
(9, 14, 4, 2),
(10, 15, NULL, 3);

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
-- Volcado de datos para la tabla `localizacion`
--

INSERT INTO `localizacion` (`Localizacion_id`, `Localizacion_descripcion`, `Latitud`, `Longitud`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Oficina Central Bogotá', 4.65133600, -74.07065900, 1, '2025-07-18 15:57:18', '2025-07-18 15:57:18'),
(1, 'Oficina Central Bogotá', 4.65133600, -74.07065900, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(2, 'Sede Norte (Chapinero)', 4.66870000, -74.05730000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(3, 'Tienda Centro Comercial Fontanar', 4.80556700, -74.03222300, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(4, 'Almacén Bosa', 4.59011200, -74.18180400, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(5, 'Punto de Recogida Suba', 4.75700000, -74.09200000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(6, 'Oficina de Soporte Técnico', 4.61890000, -74.07120000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(7, 'Centro de Distribución', 4.69700000, -74.21000000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(8, 'Local Comercial Kennedy', 4.62910000, -74.15650000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(9, 'Punto de Venta Salitre', 4.66950000, -74.10300000, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56'),
(10, 'Almacén en Medellín', 6.24420300, -75.58121100, 1, '2025-06-05 01:31:56', '2025-06-05 01:31:56');

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
-- Volcado de datos para la tabla `module`
--

INSERT INTO `module` (`Module_id`, `Module_name`, `Module_route`, `Module_description`, `Module_status`, `Created_at`, `Updated_at`) VALUES
(1, 'Inmuebles', '/api/inmueble', 'Gestión de propiedades y activos inmobiliarios', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(2, 'Usuarios', '/api/users', 'Gestión de usuarios de la API', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(3, 'Facturación', '/api/factura', 'Gestión de facturación y pagos', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(4, 'Contacto', '/api/contacto', 'Mensajes y formularios de contacto', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(5, 'Carrusel', '/api/carrusel', 'Gestión de imágenes del carrusel', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(6, 'Preguntas Frecuentes', '/api/preguntasfrecuentes', 'Gestión de preguntas frecuentes', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(7, 'Sobre Nosotros', '/api/sobrenosotros', 'Información sobre la empresa', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(8, 'Términos y Condiciones', '/api/terminosycondiciones', 'Gestión de términos y condiciones', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(9, 'Política de Privacidad', '/api/politicadeprivacidad', 'Gestión de la política de privacidad', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33'),
(10, 'Por Qué Elegirnos', '/api/porqueelegirnos', 'Razones para elegir la empresa', 1, '2025-07-04 17:33:33', '2025-07-04 17:33:33');

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
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`Municipio_id`, `Ndap_FK`, `Municipio_nombre`, `Municipio_descripcion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 2, 'Bogotá D.C.', 'Capital de Colombia y principal centro económico.', 1, '2025-07-18 15:57:19', '2025-07-18 15:57:19'),
(1, 2, 'Bogotá D.C.', 'Capital de Colombia y principal centro económico.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(2, 3, 'Medellín', 'Ciudad de la Eterna Primavera, segundo centro urbano del país.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(3, 2, 'Cali', 'Capital mundial de la salsa y principal ciudad del suroccidente.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(4, 4, 'Barranquilla', 'Capital del Atlántico y principal puerto del Caribe colombiano.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(5, 3, 'Cartagena', 'Ciudad histórica y turística en la costa Caribe.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(6, 2, 'Bucaramanga', 'Conocida como la Ciudad Bonita y Ciudad de los Parques.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(7, 4, 'Pereira', 'Capital del departamento de Risaralda, en la región del Eje Cafetero.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(8, 3, 'Manizales', 'Ciudad de las puertas abiertas, famosa por su café y paisajes montañosos.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(9, 2, 'Villavicencio', 'La puerta al Llano, centro económico de los Llanos Orientales.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07'),
(10, 5, 'Zipaquirá', 'Famosa por su Catedral de Sal. Ndap_FK 5 para un municipio con acceso específico.', 1, '2025-06-04 23:46:07', '2025-06-04 23:46:07');

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
-- Volcado de datos para la tabla `ndap`
--

INSERT INTO `ndap` (`Ndap_id`, `Ndap_descripcion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Nivel de Acceso Básico', 1, '2025-07-18 15:57:19', '2025-07-18 15:57:19'),
(2, 'Nivel de Acceso Básico', 1, '2025-06-04 23:43:07', '2025-06-04 23:43:07'),
(3, 'Nivel de Acceso Intermedio', 1, '2025-06-04 23:43:07', '2025-06-04 23:43:07'),
(4, 'Nivel de Acceso Avanzado', 1, '2025-06-04 23:43:07', '2025-06-04 23:43:07'),
(5, 'Nivel de Acceso Restringido', 0, '2025-06-04 23:43:07', '2025-06-04 23:43:07'),
(6, 'Nivel de Soporte Técnico', 1, '2025-06-04 23:43:07', '2025-06-04 23:43:07');

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
-- Volcado de datos para la tabla `organizacion_parqueadero`
--

INSERT INTO `organizacion_parqueadero` (`Organizacion_parqueadero_id`, `Tipo_parqueadero`, `Cantidad`, `Cubierto`, `Disponible`) VALUES
(1, 'Automóvil', 150, 0, 20),
(2, 'Motocicleta', 50, 0, 1),
(3, 'Bicicleta', 30, 1, 1),
(4, 'Patineta Eléctrica', 15, 1, 1),
(5, 'Carga', 20, 0, 1),
(6, 'auto', 2, 0, 1),
(7, 'patineta', 3, 0, 1),
(8, 'bicicleta', 2, 1, 1),
(9, 'moto', 1, 0, 1),
(10, 'moto', 4, 1, 1),
(11, 'Automóvil', 150, 0, 20);

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
-- Volcado de datos para la tabla `otras_caracteristicas`
--

INSERT INTO `otras_caracteristicas` (`Otras_caracteristicas_id`, `Caracteristicas_descripcion`, `Deposito`, `Lavanderia`, `Gas`, `Piso`, `Mascotas_permitidas`, `Tipo_inmueble`, `Amoblado`, `Descripcion_adicional`, `Created_at`, `Updated_at`, `Asignacion_FK`) VALUES
(1, 'kjh', 1, 0, 1, 8, 0, 'zxcv', 0, 'ytutyjh', '2025-07-11 12:55:34', '2025-07-11 12:55:34', 1),
(2, 'lkj', 2, 1, 0, 7, 1, 'klñ{', 1, 'ouyoyuoiyo', '2025-07-11 12:55:34', '2025-07-11 12:55:34', 2),
(3, 'ñlk', 3, 0, 1, 6, 0, 'jklñ', 0, 'hlkhlhjl', '2025-07-11 12:55:34', '2025-07-11 12:55:34', 3),
(4, 'bnm', 4, 1, 0, 5, 1, 'hjkkl', 1, 'gkjgkghk', '2025-07-11 12:55:34', '2025-07-11 12:55:34', 4),
(5, 'vbn', 5, 0, 1, 4, 0, 'ghjjk', 0, 'fjgfjhgfj', '2025-07-11 12:55:34', '2025-07-11 12:55:34', 5),
(6, 'fhgfhfgh', 3, 1, 0, 1, 0, 'fhjgfjghf', 1, 'wsxcdde', '2025-07-11 13:14:48', '2025-07-11 13:14:48', 36),
(7, 'fhfghgfhfg', 2, 0, 1, 2, 0, 'cbncvbn', 0, 'edcvfr', '2025-07-11 13:14:48', '2025-07-11 13:14:48', 35),
(8, 'ghjgjgh', 1, 1, 0, 3, 0, 'vcnvcbn', 0, 'rfvbgt', '2025-07-11 13:14:48', '2025-07-11 13:14:48', 27),
(24, 'Apartamento con excelentes aca', 1500000, 1, 1, 5, 1, 'Apartamento', 1, 'Balcón amplio con vista a la ciudad.', '2025-06-05 05:11:08', '2025-06-05 05:11:08', 11),
(25, 'Oficina moderna con buena ilum', 0, 0, 0, 2, 0, 'Oficina', 0, 'Ideal para startups o pequeñas empresas.', '2025-06-05 05:11:08', '2025-06-05 05:11:08', 21),
(27, 'Apartamento con excelentes aca', 1, 1, 1, 5, 1, 'Apartamento', 1, 'Balcón amplio con vista a la ciudad.', '2025-07-18 15:57:17', '2025-07-18 15:57:17', 37);

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
-- Volcado de datos para la tabla `pago`
--

INSERT INTO `pago` (`Pago_id`, `Referencia_transaccion`, `Fecha_creacion`, `Fecha_actualizacion`, `Comentario`, `Fecha_pago`, `Estado_pago_FK`, `Factura_FK`) VALUES
(1, 123456789, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Pago realizado por la factura 1001.', '2025-06-05 12:41:43', 1, 1),
(2, 987654321, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Pendiente de confirmación del banco para factura 1002.', '2025-06-05 12:41:43', 2, 2),
(3, 456789012, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Pago rechazado por fondos insuficientes para factura 1003.', '2025-06-05 12:41:43', 3, 3),
(4, 112233445, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Pago exitoso de la factura 1004.', '2025-06-05 12:41:43', 1, 4),
(5, 556677889, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Revisión manual requerida para pago de factura 1005.', '2025-06-05 12:41:43', 2, 5),
(6, 998877665, '2025-06-05 12:41:43', '2025-06-05 12:41:43', 'Pago completado para factura 1006.', '2025-06-05 12:41:43', 1, 6);

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
-- Volcado de datos para la tabla `permitions`
--

INSERT INTO `permitions` (`Permitions_id`, `Permitions_name`, `Permitions_description`, `Permitions_status`, `Created_at`, `Updated_at`) VALUES
(1, 'Ver Dashboard', 'Permite al usuario visualizar el panel de control principal.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(2, 'Crear Inmueble', 'Permite al usuario registrar nuevas propiedades en el sistema.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(3, 'Editar Inmueble', 'Permite al usuario modificar la información de propiedades existentes.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(4, 'Eliminar Inmueble', 'Permite al usuario eliminar propiedades del sistema.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(5, 'Ver Usuarios', 'Permite al usuario visualizar la lista de usuarios registrados.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(6, 'Crear Usuario', 'Permite al usuario añadir nuevos usuarios al sistema.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(7, 'Editar Usuario', 'Permite al usuario modificar perfiles de usuarios existentes.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(8, 'Eliminar Usuario', 'Permite al usuario eliminar usuarios del sistema.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(9, 'Generar Factura', 'Permite al usuario crear nuevas facturas.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(10, 'Ver Facturas', 'Permite al usuario consultar facturas emitidas.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(11, 'Registrar Pago', 'Permite al usuario registrar pagos asociados a facturas.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(12, 'Configuración Sistema', 'Permite al usuario acceder y modificar la configuración general del sistema.', 1, '2025-06-05 02:42:45', '2025-06-05 02:42:45'),
(13, 'Acceso API', 'Permite al usuario realizar operaciones a través de la API.', 0, '2025-06-05 02:42:45', '2025-06-05 02:42:45');

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
-- Volcado de datos para la tabla `platform_module`
--

INSERT INTO `platform_module` (`Platform_module_id`, `Module_name`, `Module_route`, `Module_description`, `Module_icon`, `Module_status`, `Module_order`, `Created_at`, `Updated_at`) VALUES
(1, 'Dashboard', '/dashboard', 'Panel de control principal del sistema.', 'fa-tachometer-alt', 1, 1, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(2, 'Inmuebles', '/inmuebles', 'Gestión de propiedades y activos inmobiliarios.', 'fa-building', 1, 2, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(3, 'Usuarios', '/usuarios', 'Administración de usuarios y sus perfiles.', 'fa-users', 1, 3, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(4, 'Facturación', '/facturacion', 'Gestión de facturas y procesos de pago.', 'fa-file-invoice-dollar', 1, 4, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(5, 'Comprador', '/comprador', 'Interes por el inmueble.', 'fa-chart-bar', 1, 5, '2025-06-05 03:54:48', '2025-06-05 03:56:27'),
(6, 'Configuración', '/configuracion', 'Ajustes generales del sistema y parámetros.', 'fa-cogs', 1, 6, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(7, 'Notificaciones', '/notificaciones', 'Gestión de alertas y mensajes del sistema.', 'fa-bell', 1, 7, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(8, 'Mensajes', '/mensajes', 'Comunicación interna entre usuarios.', 'fa-comments', 1, 8, '2025-06-05 03:54:48', '2025-06-05 03:54:48'),
(9, 'Vendedor', '/Vendedor', 'Acceso a publicar y gestionar inmuebles.', 'fa-question-circle', 1, 9, '2025-06-05 03:54:48', '2025-06-05 04:03:40'),
(10, 'Login', '/login', 'Página de inicio de sesión.', 'fa-sign-in-alt', 0, 0, '2025-06-05 03:54:48', '2025-06-05 03:54:48');

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
-- Volcado de datos para la tabla `platform_permitions`
--

INSERT INTO `platform_permitions` (`Platform_permitions_id`, `Permitions_name`, `Permitions_description`, `Permitions_status`, `Created_at`, `Updated_at`) VALUES
(1, 'Ver Dashboard', 'Permite al usuario visualizar el panel de control principal.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(2, 'Crear Inmueble', 'Permite al usuario añadir nuevas propiedades al sistema.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(3, 'Editar Inmueble', 'Permite al usuario modificar la información de propiedades existentes.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(4, 'Eliminar Inmueble', 'Permite al usuario borrar propiedades del sistema.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(5, 'Ver Usuarios', 'Permite al usuario visualizar la lista de usuarios y sus perfiles.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(6, 'Crear Usuario', 'Permite al usuario registrar nuevos usuarios en la plataforma.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(7, 'Editar Usuario', 'Permite al usuario modificar la información de usuarios existentes.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(8, 'Eliminar Usuario', 'Permite al usuario borrar usuarios del sistema.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(9, 'Generar Factura', 'Permite al usuario crear nuevas facturas.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(10, 'Ver Facturas', 'Permite al usuario visualizar las facturas existentes.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(11, 'Registrar Pago', 'Permite al usuario registrar pagos para las facturas.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(12, 'Configuración Sistema', 'Permite al usuario acceder y modificar la configuración general del sistema.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54'),
(13, 'Ver Reportes', 'Permite al usuario acceder a los informes generados por el sistema.', 1, '2025-06-05 04:06:54', '2025-06-05 04:06:54');

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
-- Volcado de datos para la tabla `platform_user_status`
--

INSERT INTO `platform_user_status` (`Platform_user_status_id`, `User_status_name`, `User_status_description`, `Created_at`, `Updated_at`) VALUES
(1, 'Activo', 'El usuario tiene acceso completo y puede operar en el sistema.', '2025-06-05 02:48:17', '2025-06-05 02:48:17'),
(2, 'Inactivo', 'El acceso del usuario está temporalmente deshabilitado.', '2025-06-05 02:48:17', '2025-06-05 02:48:17'),
(3, 'Pendiente', 'El usuario ha sido registrado pero su cuenta aún no ha sido activada/aprobada.', '2025-06-05 02:48:17', '2025-06-05 02:48:17'),
(4, 'Bloqueado', 'El usuario ha sido bloqueado permanentemente debido a violaciones de políticas.', '2025-06-05 02:48:17', '2025-06-05 02:48:17'),
(5, 'Eliminado', 'El usuario ha sido marcado para eliminación (soft delete).', '2025-06-05 02:48:17', '2025-06-05 02:48:17');

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
-- Volcado de datos para la tabla `politica_de_privacidad`
--

INSERT INTO `politica_de_privacidad` (`id`, `titulo`, `descripcion`, `version`, `fecha_creacion`, `fecha_actualizacion`, `activo`) VALUES
(4, 'politica de privacidad actual', '1. Recopilación de Información\nRecopilamos información personal cuando usted se registra, publica propiedades o contacta a otros usuarios.\n\n2. Uso de la Información\nLa información recopilada se utiliza para mejorar nuestros servicios y personalizar su experiencia.\n\n3. Protección de Datos\nImplementamos medidas de seguridad para proteger su información personal.\n\n4. Compartir Información\nNo vendemos ni compartimos su información personal con terceros sin su consentimiento.\n\n5. Cookies\nUtilizamos cookies para mejorar la experiencia del usuario y analizar el tráfico del sitio.\n\n6. Derechos del Usuario\nTiene derecho a acceder, corregir o eliminar su información personal.\n\n7. Contacto\nPara cualquier consulta sobre privacidad, contáctenos a través de nuestro formulario.\n<h1 style=\"color: red;\">hola</h1>\n<h2>hola</h2>\n<h3>hola</h3>\n<h4>hola</h4>\n<h5>hola</h5>\n<h1>hola</h1>', '1.0', '2025-07-09 03:41:35', '2025-07-09 03:47:48', 1),
(5, 'politica de privacidas vieja', '¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto <pre style=\"display:inline; background-color: black; color: blue;\">de relleno</pre> de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\n\n¿Por qué lo usamos?\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\n\n\n¿De dónde viene?\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\n\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\n\n¿Dónde puedo conseguirlo?\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '1.1', '2025-07-09 03:54:16', '2025-07-09 03:59:39', 1);

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
-- Volcado de datos para la tabla `porque_elegirnos`
--

INSERT INTO `porque_elegirnos` (`id`, `titulo`, `descripcion`, `icono`, `orden`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(4, 'dada', '¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto de relleno de las al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han ', 'Fa500Px', 2, 1, '2025-07-10 13:36:54', '2025-07-12 18:37:33'),
(5, 'estrella', 'estrellate', 'FaStar', 1, 1, '2025-07-10 14:34:40', '2025-07-10 14:34:40'),
(6, 'qwer', 'qwe', 'FaTiktok', 3, 1, '2025-07-11 03:30:48', '2025-07-11 03:30:48'),
(7, 'mun', 'mun', 'FaStickerMule', 4, 1, '2025-07-11 03:31:22', '2025-07-11 03:31:22'),
(8, 'be', 'be', 'FaBehance', 5, 1, '2025-07-11 03:31:49', '2025-07-11 03:31:49'),
(9, 'qa', 'qa', 'FaBatteryThreeQuarters', 6, 1, '2025-07-11 03:32:22', '2025-07-11 03:32:22'),
(10, 'zx', 'zx', 'FaAmazon', 7, 1, '2025-07-11 03:32:49', '2025-07-11 03:32:49'),
(11, 'as', 'as', 'FaAccessibleIcon', 8, 1, '2025-07-11 03:33:03', '2025-07-11 03:33:03'),
(12, 'jk', 'jk', 'FaFighterJet', 9, 1, '2025-07-11 03:33:36', '2025-07-11 03:33:36'),
(13, 'lo', 'lo', 'FaAffiliatetheme', 10, 1, '2025-07-11 03:33:54', '2025-07-11 03:33:54'),
(14, 'yu', 'yu', 'FaBlackberry', 11, 1, '2025-07-11 03:34:24', '2025-07-11 03:34:24'),
(15, 'po', 'po', 'FaMedapps', 12, 1, '2025-07-11 03:34:51', '2025-07-11 03:34:51');

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
-- Volcado de datos para la tabla `preguntas_frecuentes`
--

INSERT INTO `preguntas_frecuentes` (`id`, `pregunta`, `respuesta`, `categoria`, `orden`, `activo`, `fecha_creacion`, `fecha_actualizacion`) VALUES
(3, '¿Cómo puedo publicar una propiedad?', 'Para publicar una propiedad, debe registrarse como usuario y seleccionar la opción \'Publicar Propiedad\' en su panel de control.', 'propiedad', 1, 1, '2025-07-09 12:50:47', '2025-07-09 13:00:23'),
(4, '¿Cuál es el costo del servicio?', 'Los costos varían según el tipo de publicación y los servicios adicionales seleccionados. Consulte nuestra página de precios para más detalles.', 'servicio', 2, 1, '2025-07-09 12:51:31', '2025-07-09 12:51:31'),
(5, '¿Cómo contacto a un vendedor?', 'Puede contactar al vendedor a través del formulario de contacto disponible en cada anuncio de propiedad.', 'contacto', 3, 1, '2025-07-09 12:52:02', '2025-07-09 12:52:02'),
(6, '¿Cómo verifican las propiedades?', 'Nuestro equipo verifica la documentación y realiza comprobaciones básicas de cada propiedad antes de su publicación.', 'propiedad', 4, 1, '2025-07-09 12:52:41', '2025-07-09 12:52:49'),
(7, '¿Puedo programar una visita?', 'Sí, puede solicitar una visita a través del botón \'Programar Visita\' en la página de cada propiedad.', 'visita', 5, 1, '2025-07-09 12:53:24', '2025-07-09 12:53:24'),
(8, 'hola', 'no tiene respuesta', 'nada', 6, 1, '2025-07-09 12:57:10', '2025-07-09 13:00:18');

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
-- Volcado de datos para la tabla `resolucion_factura`
--

INSERT INTO `resolucion_factura` (`Resolucion_factura_id`, `Resolucion_facturacion_NO`, `Fecha_resolucion`, `Fecha_vencimiento`) VALUES
(1, 10001, '2024-01-01 10:00:00', '2025-01-02 09:59:59'),
(2, 10002, '2024-03-15 10:00:00', '2025-03-16 09:59:59'),
(3, 10003, '2024-06-01 10:00:00', '2025-06-02 09:59:59'),
(4, 10004, '2024-09-20 10:00:00', '2025-09-21 09:59:59'),
(5, 10005, '2025-01-10 10:00:00', '2026-01-11 09:59:59');

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
-- Volcado de datos para la tabla `retenedor_iva`
--

INSERT INTO `retenedor_iva` (`Retenedor_IVA_id`, `Porcentaje_retencion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(1, 15.00, 1, '2025-06-05 02:31:23', '2025-06-05 02:31:23'),
(2, 5.00, 1, '2025-06-05 02:31:23', '2025-06-05 02:31:23'),
(3, 0.00, 0, '2025-06-05 02:31:23', '2025-06-05 02:31:23'),
(4, 10.00, 1, '2025-06-05 02:31:23', '2025-06-05 02:31:23'),
(5, 7.50, 1, '2025-06-05 02:31:23', '2025-06-05 02:31:23');

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
-- Volcado de datos para la tabla `sobre_nosotros`
--

INSERT INTO `sobre_nosotros` (`id`, `titulo`, `descripcion`, `imagen_url`, `fecha_creacion`, `fecha_actualizacion`, `activo`) VALUES
(4, 'caballero', '¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\n\n¿Por qué lo usamos?\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\n\n\n¿De dónde viene?\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\n\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\n\n¿Dónde puedo conseguirlo?\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '/assets/images/sobrenosotros/1752069165590-219138124.jpg', '2025-07-09 13:52:47', '2025-07-11 03:55:08', 1),
(5, 'fondo', 'es un fondo de pantalla muy bonito', '/assets/images/sobrenosotros/1752150133191-265711580.jpg', '2025-07-10 12:21:24', '2025-07-10 12:22:14', 1),
(6, 'xcv', 'xcv', '/assets/images/sobrenosotros/1752150697060-752302581.jpg', '2025-07-10 12:31:42', '2025-07-10 12:31:42', 1),
(7, 'nhy', 'nhy', '/assets/images/sobrenosotros/1752150970563-997356353.jpg', '2025-07-10 12:36:43', '2025-07-10 12:36:43', 1),
(8, 'tyui', 'tyui', '/assets/images/sobrenosotros/1752151114239-870042429.jpg', '2025-07-10 12:39:08', '2025-07-10 12:39:08', 1),
(9, 'poli', '¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\n\n¿Por qué lo usamos?\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\n\n\n¿De dónde viene?\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\n\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\n\n¿Dónde puedo conseguirlo?\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '/assets/images/sobrenosotros/1752151268709-984649762.jpg', '2025-07-10 12:41:12', '2025-07-11 03:55:14', 1),
(10, 'azs', 'azs', '/assets/images/sobrenosotros/1752151895563-630416846.jpg', '2025-07-10 12:51:44', '2025-07-10 12:51:44', 1),
(11, 'cvb', 'cvb', '/assets/images/sobrenosotros/1752152112463-772610844.jpg', '2025-07-10 12:55:18', '2025-07-10 12:55:18', 1),
(12, 'bnbbbm', 'bnm', '/assets/images/sobrenosotros/1752152381774-203259193.jpg', '2025-07-10 13:28:53', '2025-07-10 13:28:53', 1),
(13, 'lo', 'lo', '/assets/images/sobrenosotros/1752154383772-887478870.jpg', '2025-07-10 13:33:08', '2025-07-10 13:33:08', 1),
(14, 'ñl', '¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\n\n¿Por qué lo usamos?\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\n\n\n¿De dónde viene?\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\n\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\n\n¿Dónde puedo conseguirlo?\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '/assets/images/sobrenosotros/1752154570664-140078914.jpg', '2025-07-10 13:35:17', '2025-07-11 03:54:31', 1);

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
-- Volcado de datos para la tabla `terminos_y_condiciones`
--

INSERT INTO `terminos_y_condiciones` (`Terminos_id`, `Titulo`, `Descripcion`, `Fecha_creacion`) VALUES
(3, 'Aceptación de los Términos', 'Al acceder y utilizar esta plataforma, usted acepta estos términos y condiciones en su totalidad.', '2025-07-09 03:19:02'),
(4, 'Uso del Servicio', 'La plataforma está destinada a facilitar la búsqueda y publicación de propiedades inmobiliarias.', '2025-07-09 03:19:19'),
(5, 'Registro y Cuentas', 'Los usuarios son responsables de mantener la confidencialidad de sus cuentas y contraseñas.', '2025-07-09 03:19:38'),
(6, 'Publicación de Propiedades', 'Toda la información publicada debe ser precisa y verdadera.', '2025-07-09 03:19:54'),
(7, 'Responsabilidades', 'La plataforma actúa como intermediario y no se hace responsable de las transacciones entre usuarios.', '2025-07-09 03:20:08'),
(8, 'Propiedad Intelectual', 'Todo el contenido de la plataforma está protegido por derechos de autor.', '2025-07-09 03:20:22'),
(9, 'Modificaciones', 'Nos reservamos el derecho de modificar estos términos en cualquier momento.', '2025-07-09 03:20:35'),
(10, 'hola', 'hola¿Qué es Lorem Ipsum?\nLorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas \"Letraset\", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.\n\n¿Por qué lo usamos?\nEs un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo \"Contenido aquí, contenido aquí\". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de \"Lorem Ipsum\" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).\n\n\n¿De dónde viene?\nAl contrario del pensamiento popular, el texto de Lorem Ipsum no es simplemente texto aleatorio. Tiene sus raices en una pieza cl´sica de la literatura del Latin, que data del año 45 antes de Cristo, haciendo que este adquiera mas de 2000 años de antiguedad. Richard McClintock, un profesor de Latin de la Universidad de Hampden-Sydney en Virginia, encontró una de las palabras más oscuras de la lengua del latín, \"consecteur\", en un pasaje de Lorem Ipsum, y al seguir leyendo distintos textos del latín, descubrió la fuente indudable. Lorem Ipsum viene de las secciones 1.10.32 y 1.10.33 de \"de Finnibus Bonorum et Malorum\" (Los Extremos del Bien y El Mal) por Cicero, escrito en el año 45 antes de Cristo. Este libro es un tratado de teoría de éticas, muy popular durante el Renacimiento. La primera linea del Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", viene de una linea en la sección 1.10.32\n\nEl trozo de texto estándar de Lorem Ipsum usado desde el año 1500 es reproducido debajo para aquellos interesados. Las secciones 1.10.32 y 1.10.33 de \"de Finibus Bonorum et Malorum\" por Cicero son también reproducidas en su forma original exacta, acompañadas por versiones en Inglés de la traducción realizada en 1914 por H. Rackham.\n\n¿Dónde puedo conseguirlo?\nHay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos cuando sea necesario, haciendo a este el único generador verdadero (válido) en la Internet. Usa un diccionario de mas de 200 palabras provenientes del latín, combinadas con estructuras muy útiles de sentencias, para generar texto de Lorem Ipsum que parezca razonable. Este Lorem Ipsum generado siempre estará libre de repeticiones, humor agregado o palabras no características del lenguaje, etc.', '2025-07-09 03:25:32');

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
-- Volcado de datos para la tabla `tipo_edificacion`
--

INSERT INTO `tipo_edificacion` (`Tipo_edificacion_id`, `Tipo_edificacion_categoria`, `Tipo_edificacion_descripcion`, `Tipo_edificacion_niveles`, `Tipo_edificacion_activo`, `Created_at`, `Updated_at`) VALUES
(1, 'Residencial', 'Apartamento en edificio de propiedad horizontal', 15, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(2, 'Residencial', 'Casa unifamiliar con jardín', 2, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(3, 'Comercial', 'Oficina en centro empresarial', 10, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(4, 'Comercial', 'Local a pie de calle en zona comercial', 1, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(5, 'Industrial', 'Bodega de almacenamiento y distribución', 1, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(6, 'Residencial', 'Apartaestudio para estudiante o profesional solter', 8, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(7, 'Mixto', 'Edificio de uso mixto (comercial y residencial)', 20, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(8, 'Comercial', 'Consultorio médico en torre de salud', 7, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(9, 'Residencial', 'Finca con terreno amplio', 1, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(10, 'Comercial', 'Centro comercial con múltiples locales y servicios', 3, 1, '2025-06-05 02:21:07', '2025-06-05 02:21:07'),
(11, 'Residencial', 'Casa unifamiliar con jardín', 2, 1, '2025-07-18 15:57:17', '2025-07-18 15:57:17');

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
(6, 19000000, 100000000, 119000000),
(7, 38000000, 200000000, 238000000),
(8, 0, 150000000, 150000000),
(9, 0, 220000000, 220000000),
(10, 57000000, 300000000, 357000000),
(11, 0, 500000000, 500000000),
(12, 0, 95000000, 95000000),
(13, 0, 720000000, 720000000),
(14, 25000000, 130000000, 155000000),
(15, 0, 300000000, 300000000);

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
-- Volcado de datos para la tabla `vereda`
--

INSERT INTO `vereda` (`Vereda_id`, `Vereda_nombre`, `Municipio_FK`, `Activo`, `Created_at`, `Updated_at`) VALUES
(0, 'Quiba', 1, 1, '2025-07-18 15:57:19', '2025-07-18 15:57:19'),
(1, 'Quiba', 1, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(2, 'Pasquilla', 1, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(3, 'Potrerito', 2, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(4, 'La Palma', 3, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(5, 'Mandinga', 4, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(6, 'Punta Canoa', 5, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(7, 'El Tigre', 6, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(8, 'La Albania', 7, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(9, 'Chinchiná', 8, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(10, 'La Reforma', 9, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59'),
(11, 'San Gabriel', 10, 1, '2025-06-05 01:17:59', '2025-06-05 01:17:59');

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
  MODIFY `Acerca_edificacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  MODIFY `Asignacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `division`
--
ALTER TABLE `division`
  MODIFY `Division_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  MODIFY `Imagenes_inmueble_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `Inmueble_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de la tabla `module`
--
ALTER TABLE `module`
  MODIFY `Module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `module_role`
--
ALTER TABLE `module_role`
  MODIFY `Module_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `organizacion_parqueadero`
--
ALTER TABLE `organizacion_parqueadero`
  MODIFY `Organizacion_parqueadero_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  MODIFY `Otras_caracteristicas_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `permitions`
--
ALTER TABLE `permitions`
  MODIFY `Permitions_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  MODIFY `Permitions_module_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `platform_identity_document`
--
ALTER TABLE `platform_identity_document`
  MODIFY `Identity_document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `platform_module`
--
ALTER TABLE `platform_module`
  MODIFY `Platform_module_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `platform_module_role`
--
ALTER TABLE `platform_module_role`
  MODIFY `Platform_module_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `platform_permitions`
--
ALTER TABLE `platform_permitions`
  MODIFY `Platform_permitions_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `platform_permitions_module_role`
--
ALTER TABLE `platform_permitions_module_role`
  MODIFY `Platform_permitions_module_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `platform_profile`
--
ALTER TABLE `platform_profile`
  MODIFY `Profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `platform_role`
--
ALTER TABLE `platform_role`
  MODIFY `Platform_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `platform_user`
--
ALTER TABLE `platform_user`
  MODIFY `Platform_user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `platform_user_status`
--
ALTER TABLE `platform_user_status`
  MODIFY `Platform_user_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `politica_de_privacidad`
--
ALTER TABLE `politica_de_privacidad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `porque_elegirnos`
--
ALTER TABLE `porque_elegirnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `preguntas_frecuentes`
--
ALTER TABLE `preguntas_frecuentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `Role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sobre_nosotros`
--
ALTER TABLE `sobre_nosotros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `terminos_y_condiciones`
--
ALTER TABLE `terminos_y_condiciones`
  MODIFY `Terminos_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tipo_edificacion`
--
ALTER TABLE `tipo_edificacion`
  MODIFY `Tipo_edificacion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `User_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
