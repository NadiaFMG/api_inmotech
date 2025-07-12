-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2025 a las 19:58:49
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
-- Volcado de datos para la tabla `inmueble`
--

INSERT INTO `inmueble` (`Inmueble_id`, `Valor`, `Area`, `Descripcion_General`, `Antiguedad`, `Motivo_VoA`, `Situacion_inmueble`, `Tipo_edificacion_FK`, `Otras_caracteristicas_FK`, `Acerca_edificacion_FK`, `Division_FK`, `Imagenes_inmueble_FK`, `Codigo_interno`, `Estado`, `Fecha_publicacion`, `Fecha_actualizacion`, `Visitas`, `Observaciones`, `Platform_user_FK`, `Direccion_FK`) VALUES
(4, 1000000, 45, 'casa bonita', 10, 'venta por que me quiero comprar otra casa', 'nuevo', 1, 24, 1, 1, 1, '2199', 'disponible', '2025-07-09 23:19:25', '2025-07-09 23:19:25', 50, 'ninguna', 20, 2);

--
-- Índices para tablas volcadas
--

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
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `inmueble`
--
ALTER TABLE `inmueble`
  MODIFY `Inmueble_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
