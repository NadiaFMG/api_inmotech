-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2025 a las 08:20:20
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
-- Base de datos: `inmotech_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acerca_edificacion`
--

CREATE TABLE `acerca_edificacion` (
  `Acerca_edificacion_id` int(11) NOT NULL,
  `AcercaDeLaEdificacion` varchar(255) DEFAULT NULL,
  `Estrato` int(11) DEFAULT NULL,
  `Tipo_construccion` varchar(100) DEFAULT NULL,
  `Anio_construccion` int(11) DEFAULT NULL,
  `Estado_conservacion` varchar(100) DEFAULT NULL,
  `Remodelado` tinyint(1) DEFAULT 0,
  `Administracion` tinyint(1) DEFAULT 0,
  `Zona_comun` varchar(255) DEFAULT NULL,
  `Descripcion_adicional` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignacion`
--

CREATE TABLE `asignacion` (
  `Asignacion_id` int(11) NOT NULL,
  `Parqueaderos_asignados` varchar(255) NOT NULL,
  `Organizacion_parqueadero_FK` int(11) DEFAULT NULL,
  `Disponible` tinyint(1) DEFAULT 1,
  `Descripcion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `Direccion_id` int(11) NOT NULL,
  `Direccion` varchar(255) NOT NULL,
  `Tipo_via` varchar(255) NOT NULL,
  `Numero_via_principal` int(11) NOT NULL,
  `Modificador_via` varchar(20) DEFAULT NULL,
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `division`
--

CREATE TABLE `division` (
  `Division_id` int(11) NOT NULL,
  `Balcon` tinyint(1) DEFAULT 0,
  `Baños` int(11) DEFAULT NULL,
  `Terraza` tinyint(1) DEFAULT 0,
  `Habitaciones` int(11) DEFAULT NULL,
  `Garaje` tinyint(1) DEFAULT 0,
  `Ascensores` tinyint(1) DEFAULT 0,
  `Area` decimal(10,2) DEFAULT NULL,
  `area_terreno` decimal(10,2) DEFAULT NULL,
  `Closets` int(11) DEFAULT NULL,
  `Estudio` tinyint(1) DEFAULT 0,
  `Sala` tinyint(1) DEFAULT 0,
  `Comedor` tinyint(1) DEFAULT 0,
  `Cocina` varchar(100) DEFAULT NULL,
  `Zona_lavanderia` tinyint(1) DEFAULT 0,
  `Deposito` tinyint(1) DEFAULT 0,
  `Descripcion_adicional` varchar(255) DEFAULT NULL,
  `area_construida` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `divisiones_urbanas`
--

CREATE TABLE `divisiones_urbanas` (
  `id_division_urbana` int(11) NOT NULL,
  `Ciudad_FK` int(11) NOT NULL,
  `Tipo_division_urbana_FK` int(11) NOT NULL,
  `nombre_o_numero` varchar(100) NOT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes_inmueble`
--

CREATE TABLE `imagenes_inmueble` (
  `Imagenes_inmueble_id` int(11) NOT NULL,
  `Inmueble_FK` int(11) DEFAULT NULL,
  `Imagenes` varchar(255) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `URL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inmueble`
--

CREATE TABLE `inmueble` (
  `Inmueble_id` int(11) NOT NULL,
  `Titulo` varchar(100) DEFAULT NULL,
  `Valor` decimal(15,2) NOT NULL,
  `Descripcion_General` varchar(255) DEFAULT NULL,
  `venta_arriendo` varchar(50) DEFAULT NULL,
  `Tipo_edificacion_FK` int(11) DEFAULT NULL,
  `Otras_caracteristicas_FK` int(11) DEFAULT NULL,
  `Acerca_edificacion_FK` int(11) DEFAULT NULL,
  `Division_FK` int(11) DEFAULT NULL,
  `Codigo_interno` varchar(50) DEFAULT NULL,
  `Estado` varchar(50) DEFAULT NULL,
  `Fecha_publicacion` datetime DEFAULT current_timestamp(),
  `Fecha_actualizacion` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Visitas` int(11) DEFAULT 0,
  `Observaciones` varchar(255) DEFAULT NULL,
  `Platform_user_FK` int(11) DEFAULT NULL,
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
  `Ndap_FK` int(11) NOT NULL,
  `Municipio_nombre` varchar(255) NOT NULL,
  `Municipio_descripcion` text DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ndap`
--

CREATE TABLE `ndap` (
  `Ndap_id` int(11) NOT NULL,
  `Ndap_nombre` varchar(50) NOT NULL,
  `Ndap_descripcion` text NOT NULL,
  `Activo` tinyint(1) DEFAULT 1,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otras_caracteristicas`
--

CREATE TABLE `otras_caracteristicas` (
  `Otras_caracteristicas_id` int(11) NOT NULL,
  `Caracteristicas_descripcion` varchar(255) DEFAULT NULL,
  `Deposito` tinyint(1) DEFAULT 0,
  `Lavanderia` tinyint(1) DEFAULT 0,
  `Gas` tinyint(1) DEFAULT 0,
  `Piso` int(11) DEFAULT NULL,
  `Mascotas_permitidas` tinyint(1) DEFAULT 0,
  `Tipo_inmueble` varchar(50) DEFAULT NULL,
  `Amoblado` tinyint(1) DEFAULT 0,
  `Descripcion_adicional` varchar(255) DEFAULT NULL,
  `Asignacion_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipos_division_urbana`
--

CREATE TABLE `tipos_division_urbana` (
  `id_tipo_urbano` int(11) NOT NULL,
  `nombre_tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_edificacion`
--

CREATE TABLE `tipo_edificacion` (
  `Tipo_edificacion_id` int(11) NOT NULL,
  `Tipo_edificacion_categoria` varchar(100) NOT NULL,
  `Tipo_edificacion_descripcion` varchar(255) DEFAULT NULL,
  `Tipo_edificacion_niveles` int(11) DEFAULT NULL,
  `Tipo_edificacion_activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  ADD KEY `Organizacion_parqueadero_FK` (`Organizacion_parqueadero_FK`);

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
-- Indices de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  ADD PRIMARY KEY (`id`);

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
  ADD KEY `Designador_cardinal_FK` (`Designador_cardinal_FK`),
  ADD KEY `Localizacion_FK` (`Localizacion_FK`),
  ADD KEY `Barrio_ciudad_corregimiento_vereda_FK` (`Barrio_ciudad_corregimiento_vereda_FK`);

--
-- Indices de la tabla `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`Division_id`);

--
-- Indices de la tabla `divisiones_urbanas`
--
ALTER TABLE `divisiones_urbanas`
  ADD PRIMARY KEY (`id_division_urbana`),
  ADD KEY `Ciudad_FK` (`Ciudad_FK`),
  ADD KEY `Tipo_division_urbana_FK` (`Tipo_division_urbana_FK`);

--
-- Indices de la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  ADD KEY `fk_imagenes_inmueble_inmueble` (`Inmueble_FK`);

--
-- Indices de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD PRIMARY KEY (`Inmueble_id`),
  ADD KEY `Tipo_edificacion_FK` (`Tipo_edificacion_FK`),
  ADD KEY `Otras_caracteristicas_FK` (`Otras_caracteristicas_FK`),
  ADD KEY `Acerca_edificacion_FK` (`Acerca_edificacion_FK`),
  ADD KEY `Division_FK` (`Division_FK`),
  ADD KEY `Direccion_FK` (`Direccion_FK`),
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
  ADD PRIMARY KEY (`Ndap_id`),
  ADD UNIQUE KEY `Ndap_nombre` (`Ndap_nombre`);

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
  ADD KEY `Asignacion_FK` (`Asignacion_FK`);

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
  ADD KEY `Module_role_FK` (`Module_role_FK`),
  ADD KEY `Permitions_FK` (`Permitions_FK`);

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
  ADD KEY `Platform_module_FK` (`Platform_module_FK`),
  ADD KEY `Platform_role_FK` (`Platform_role_FK`);

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
  ADD KEY `Platform_module_role_FK` (`Platform_module_role_FK`),
  ADD KEY `Platform_permitions_FK` (`Platform_permitions_FK`);

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
-- Indices de la tabla `terminos_y_condiciones`
--
ALTER TABLE `terminos_y_condiciones`
  ADD PRIMARY KEY (`Terminos_id`);

--
-- Indices de la tabla `tipos_division_urbana`
--
ALTER TABLE `tipos_division_urbana`
  ADD PRIMARY KEY (`id_tipo_urbano`),
  ADD UNIQUE KEY `nombre_tipo` (`nombre_tipo`);

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
  MODIFY `Acerca_edificacion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `asignacion`
--
ALTER TABLE `asignacion`
  MODIFY `Asignacion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `barrio`
--
ALTER TABLE `barrio`
  MODIFY `Barrio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `barrio_ciudad_corregimiento_vereda`
--
ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  MODIFY `Barrio_ciudad_corregimiento_vereda_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carrusel`
--
ALTER TABLE `carrusel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `Ciudad_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  MODIFY `Corregimiento_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `designador_cardinal`
--
ALTER TABLE `designador_cardinal`
  MODIFY `Designador_cardinal_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `Direccion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `division`
--
ALTER TABLE `division`
  MODIFY `Division_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `divisiones_urbanas`
--
ALTER TABLE `divisiones_urbanas`
  MODIFY `id_division_urbana` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `Inmueble_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `localizacion`
--
ALTER TABLE `localizacion`
  MODIFY `Localizacion_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `Municipio_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ndap`
--
ALTER TABLE `ndap`
  MODIFY `Ndap_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `organizacion_parqueadero`
--
ALTER TABLE `organizacion_parqueadero`
  MODIFY `Organizacion_parqueadero_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  MODIFY `Otras_caracteristicas_id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `Platform_role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_user`
--
ALTER TABLE `platform_user`
  MODIFY `Platform_user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `platform_user_status`
--
ALTER TABLE `platform_user_status`
  MODIFY `Platform_user_status_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `tipos_division_urbana`
--
ALTER TABLE `tipos_division_urbana`
  MODIFY `id_tipo_urbano` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tipo_edificacion`
--
ALTER TABLE `tipo_edificacion`
  MODIFY `Tipo_edificacion_id` int(11) NOT NULL AUTO_INCREMENT;

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
-- AUTO_INCREMENT de la tabla `vereda`
--
ALTER TABLE `vereda`
  MODIFY `Vereda_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacion`
--
ALTER TABLE `asignacion`
  ADD CONSTRAINT `asignacion_ibfk_1` FOREIGN KEY (`Organizacion_parqueadero_FK`) REFERENCES `organizacion_parqueadero` (`Organizacion_parqueadero_id`);

--
-- Filtros para la tabla `barrio_ciudad_corregimiento_vereda`
--
ALTER TABLE `barrio_ciudad_corregimiento_vereda`
  ADD CONSTRAINT `barrio_ciudad_corregimiento_vereda_ibfk_1` FOREIGN KEY (`Barrio_FK`) REFERENCES `barrio` (`Barrio_id`),
  ADD CONSTRAINT `barrio_ciudad_corregimiento_vereda_ibfk_2` FOREIGN KEY (`Ciudad_FK`) REFERENCES `ciudad` (`Ciudad_id`),
  ADD CONSTRAINT `barrio_ciudad_corregimiento_vereda_ibfk_3` FOREIGN KEY (`Corregimiento_FK`) REFERENCES `corregimiento` (`Corregimiento_id`),
  ADD CONSTRAINT `barrio_ciudad_corregimiento_vereda_ibfk_4` FOREIGN KEY (`Vereda_Fk`) REFERENCES `vereda` (`Vereda_id`);

--
-- Filtros para la tabla `ciudad`
--
ALTER TABLE `ciudad`
  ADD CONSTRAINT `ciudad_ibfk_1` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);

--
-- Filtros para la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  ADD CONSTRAINT `corregimiento_ibfk_1` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);

--
-- Filtros para la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD CONSTRAINT `direccion_ibfk_1` FOREIGN KEY (`Designador_cardinal_FK`) REFERENCES `designador_cardinal` (`Designador_cardinal_id`),
  ADD CONSTRAINT `direccion_ibfk_2` FOREIGN KEY (`Localizacion_FK`) REFERENCES `localizacion` (`Localizacion_id`),
  ADD CONSTRAINT `direccion_ibfk_3` FOREIGN KEY (`Barrio_ciudad_corregimiento_vereda_FK`) REFERENCES `barrio_ciudad_corregimiento_vereda` (`Barrio_ciudad_corregimiento_vereda_id`);

--
-- Filtros para la tabla `divisiones_urbanas`
--
ALTER TABLE `divisiones_urbanas`
  ADD CONSTRAINT `divisiones_urbanas_ibfk_1` FOREIGN KEY (`Ciudad_FK`) REFERENCES `ciudad` (`Ciudad_id`),
  ADD CONSTRAINT `divisiones_urbanas_ibfk_2` FOREIGN KEY (`Tipo_division_urbana_FK`) REFERENCES `tipos_division_urbana` (`id_tipo_urbano`);

--
-- Filtros para la tabla `imagenes_inmueble`
--
ALTER TABLE `imagenes_inmueble`
  ADD CONSTRAINT `fk_imagenes_inmueble_inmueble` FOREIGN KEY (`Inmueble_FK`) REFERENCES `inmueble` (`Inmueble_id`);

--
-- Filtros para la tabla `inmueble`
--
ALTER TABLE `inmueble`
  ADD CONSTRAINT `inmueble_ibfk_1` FOREIGN KEY (`Tipo_edificacion_FK`) REFERENCES `tipo_edificacion` (`Tipo_edificacion_id`),
  ADD CONSTRAINT `inmueble_ibfk_2` FOREIGN KEY (`Otras_caracteristicas_FK`) REFERENCES `otras_caracteristicas` (`Otras_caracteristicas_id`),
  ADD CONSTRAINT `inmueble_ibfk_3` FOREIGN KEY (`Acerca_edificacion_FK`) REFERENCES `acerca_edificacion` (`Acerca_edificacion_id`),
  ADD CONSTRAINT `inmueble_ibfk_4` FOREIGN KEY (`Division_FK`) REFERENCES `division` (`Division_id`),
  ADD CONSTRAINT `inmueble_ibfk_6` FOREIGN KEY (`Direccion_FK`) REFERENCES `direccion` (`Direccion_id`),
  ADD CONSTRAINT `inmueble_platform_user_fk` FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`);

--
-- Filtros para la tabla `module_role`
--
ALTER TABLE `module_role`
  ADD CONSTRAINT `module_role_ibfk_1` FOREIGN KEY (`Module_FK`) REFERENCES `module` (`Module_id`),
  ADD CONSTRAINT `module_role_ibfk_2` FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`);

--
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`Ndap_FK`) REFERENCES `ndap` (`Ndap_id`);

--
-- Filtros para la tabla `otras_caracteristicas`
--
ALTER TABLE `otras_caracteristicas`
  ADD CONSTRAINT `otras_caracteristicas_ibfk_1` FOREIGN KEY (`Asignacion_FK`) REFERENCES `asignacion` (`Asignacion_id`);

--
-- Filtros para la tabla `permitions_module_role`
--
ALTER TABLE `permitions_module_role`
  ADD CONSTRAINT `permitions_module_role_ibfk_1` FOREIGN KEY (`Module_role_FK`) REFERENCES `module_role` (`Module_role_id`),
  ADD CONSTRAINT `permitions_module_role_ibfk_2` FOREIGN KEY (`Permitions_FK`) REFERENCES `permitions` (`Permitions_id`);

--
-- Filtros para la tabla `platform_module_role`
--
ALTER TABLE `platform_module_role`
  ADD CONSTRAINT `platform_module_role_ibfk_1` FOREIGN KEY (`Platform_module_FK`) REFERENCES `platform_module` (`Platform_module_id`),
  ADD CONSTRAINT `platform_module_role_ibfk_2` FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`);

--
-- Filtros para la tabla `platform_permitions_module_role`
--
ALTER TABLE `platform_permitions_module_role`
  ADD CONSTRAINT `platform_permitions_module_role_ibfk_1` FOREIGN KEY (`Platform_module_role_FK`) REFERENCES `platform_module_role` (`Platform_module_role_id`),
  ADD CONSTRAINT `platform_permitions_module_role_ibfk_2` FOREIGN KEY (`Platform_permitions_FK`) REFERENCES `platform_permitions` (`Platform_permitions_id`);

--
-- Filtros para la tabla `platform_profile`
--
ALTER TABLE `platform_profile`
  ADD CONSTRAINT `platform_profile_ibfk_1` FOREIGN KEY (`Platform_user_FK`) REFERENCES `platform_user` (`Platform_user_id`);

--
-- Filtros para la tabla `platform_user`
--
ALTER TABLE `platform_user`
  ADD CONSTRAINT `platform_user_role_fk` FOREIGN KEY (`Platform_role_FK`) REFERENCES `platform_role` (`Platform_role_id`),
  ADD CONSTRAINT `platform_user_status_fk` FOREIGN KEY (`Platform_user_status_FK`) REFERENCES `platform_user_status` (`Platform_user_status_id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_fk` FOREIGN KEY (`Role_FK`) REFERENCES `role` (`Role_id`),
  ADD CONSTRAINT `users_user_status_fk` FOREIGN KEY (`User_status_FK`) REFERENCES `user_status` (`User_status_id`);

--
-- Filtros para la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD CONSTRAINT `vereda_ibfk_1` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
