-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-07-2025 a las 16:00:46
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
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `User_id` int(11) NOT NULL,
  `User_user` varchar(100) NOT NULL,
  `User_password` varchar(255) NOT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `User_status_FK` tinyint(2) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`User_id`, `User_user`, `User_password`, `Created_at`, `Updated_at`, `User_status_FK`) VALUES
(1, 'jonathan0145', 'jR3216417337', '2025-07-30 17:26:54', '2025-07-30 17:26:54', 0),
(2, 'jonathan0146', 'jR3216417337', '2025-07-30 17:26:54', '2025-07-30 17:26:54', 0),
(3, 'jonathan0148', 'jR3216417337', '2025-07-30 17:30:58', '2025-07-30 17:30:58', 0),
(4, 'jonathan0149', 'jR3216417337', '2025-07-30 17:30:58', '2025-07-30 17:30:58', 0),
(5, 'jonathan0150', 'jR3216417337', '2025-07-30 17:30:58', '2025-07-30 17:30:58', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_status`
--

CREATE TABLE `user_status` (
  `User_status_id` tinyint(2) UNSIGNED NOT NULL,
  `User_status_name` varchar(50) NOT NULL,
  `User_status_description` varchar(255) DEFAULT NULL,
  `Created_at` datetime DEFAULT current_timestamp(),
  `Updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_status`
--

INSERT INTO `user_status` (`User_status_id`, `User_status_name`, `User_status_description`, `Created_at`, `Updated_at`) VALUES
(1, 'Activo', 'La cuenta de usuario está activa y puede iniciar sesión.', '2025-07-30 11:23:07', '2025-07-30 11:23:07'),
(2, 'Inactivo', 'La cuenta de usuario está inactiva y no puede iniciar sesión.', '2025-07-30 11:23:07', '2025-07-30 11:23:07'),
(3, 'Verificación Pendiente', 'La cuenta de usuario ha sido creada pero requiere verificación (ej. confirmación por correo electrónico).', '2025-07-30 11:23:07', '2025-07-30 11:23:07'),
(4, 'Suspendido', 'La cuenta de usuario ha sido suspendida debido a violaciones de políticas.', '2025-07-30 11:23:07', '2025-07-30 11:23:07'),
(5, 'Eliminado', 'La cuenta de usuario ha sido marcada como eliminada (eliminación lógica, pero se mantiene para registros).', '2025-07-30 11:23:07', '2025-07-30 11:23:07');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`User_id`) USING BTREE,
  ADD UNIQUE KEY `unique_user_user` (`User_user`) USING BTREE;

--
-- Indices de la tabla `user_status`
--
ALTER TABLE `user_status`
  ADD PRIMARY KEY (`User_status_id`),
  ADD UNIQUE KEY `User_status_name` (`User_status_name`);
ALTER TABLE `user_status` ADD FULLTEXT KEY `User_status_description` (`User_status_description`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `User_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user_status`
--
ALTER TABLE `user_status`
  MODIFY `User_status_id` tinyint(2) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
