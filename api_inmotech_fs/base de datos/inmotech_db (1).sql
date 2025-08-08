-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-07-2025 a las 19:31:14
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
(1, 'Chachagüí', 1, 1, '2025-07-20 12:28:57', '2025-07-20 12:28:57'),
(2, 'La Unión', 3, 1, '2025-07-20 12:28:57', '2025-07-20 12:28:57'),
(3, 'Barbacoas', 5, 1, '2025-07-20 12:28:57', '2025-07-20 12:28:57'),
(4, 'Jardín', 7, 1, '2025-07-20 12:28:57', '2025-07-20 12:28:57'),
(5, 'Marinilla', 9, 1, '2025-07-20 12:28:57', '2025-07-20 12:28:57');

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
(1, 'Pantanillo', 6, 1, '2025-07-20 12:10:32', '2025-07-20 12:10:32'),
(2, 'El Jardín (Tamaná)', 7, 1, '2025-07-20 12:10:32', '2025-07-20 12:10:32'),
(3, 'El Pescado', 8, 1, '2025-07-20 12:10:32', '2025-07-20 12:10:32'),
(4, 'Morro amarillo', 7, 1, '2025-07-20 12:10:32', '2025-07-20 12:10:32'),
(5, 'San José de Urama', 10, 1, '2025-07-20 12:10:32', '2025-07-20 12:10:32');

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

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`Municipio_id`, `Ndap_FK`, `Municipio_nombre`, `Municipio_descripcion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(1, 21, 'Chachagüí', 'Ubicado al norte de Pasto, es conocido por su clima más cálido que el de la capital y por ser un destino popular de descanso. Cuenta con balnearios y es un punto de paso importante hacia el norte del país.', 1, '2025-07-18 18:39:28', '2025-07-18 18:39:28'),
(2, 21, 'Sandoná', 'Este municipio es famoso por su artesanía en iraca (fibra de palma), especialmente por la elaboración de sombreros, canastos y objetos decorativos. Es un centro cultural importante con tradiciones muy arraigadas.', 1, '2025-07-18 18:39:28', '2025-07-18 18:39:28'),
(3, 21, 'La Unión', 'Situado en el occidente del departamento, es un municipio con una fuerte vocación cafetera. Sus paisajes montañosos son ideales para el cultivo de café de alta calidad, y es un lugar donde se puede apreciar la vida rural y agrícola de Nariño.', 1, '2025-07-18 18:39:28', '2025-07-18 18:39:28'),
(4, 21, 'Guachucal', 'Ubicado en el altiplano sur de Nariño, es uno de los municipios con mayor presencia del pueblo indígena de los Pastos. Se encuentra en una zona de páramo y es conocido por sus tradiciones ancestrales y sus paisajes de altura, con la laguna de Guamués (La Cocha) no muy lejos.', 1, '2025-07-18 18:39:28', '2025-07-18 18:39:28'),
(5, 21, 'Barbacoas', 'Este municipio se encuentra en la región de la Costa Pacífica nariñense. Es un territorio con una rica cultura afrocolombiana, con música de marimba, gastronomía de mariscos y un entorno de selva húmeda tropical y ríos caudalosos, aunque ha enfrentado desafíos por su ubicación remota y conflictos.', 1, '2025-07-18 18:39:28', '2025-07-18 18:39:28'),
(6, 2, 'Guatapé', 'Este municipio es famoso por la imponente Piedra del Peñol, un monolito gigante al que se puede ascender para disfrutar de vistas espectaculares del embalse que lo rodea. Guatapé mismo es un pueblo pintoresco, conocido por sus casas coloridas adornadas con \"zócalos\" (bajorrelieves en las fachadas que cuentan historias y representan la cultura local). Es un destino turístico muy popular.', 1, '2025-07-18 18:44:22', '2025-07-18 18:44:22'),
(7, 2, 'Jardín', 'Considerado por muchos como uno de los pueblos más bonitos de Colombia, Jardín es un tesoro del suroeste antioqueño. Se caracteriza por su arquitectura colonial bien conservada, su plaza principal vibrante, sus balcones llenos de flores y sus calles empedradas. Es un importante centro cafetero y un lugar ideal para el ecoturismo, con cascadas y cuevas cercanas.', 1, '2025-07-18 18:44:22', '2025-07-18 18:44:22'),
(8, 2, 'Santa Fe de Antioquia', 'La antigua capital de Antioquia, Santa Fe de Antioquia es un verdadero viaje en el tiempo. Declarada Monumento Nacional, conserva su arquitectura colonial original, con calles empedradas, iglesias históricas y casas blancas con techos de teja. Es conocida por su clima cálido, sus frutas exóticas (especialmente el tamarindo) y el famoso Puente de Occidente, una impresionante obra de ingeniería del siglo XIX.', 1, '2025-07-18 18:44:22', '2025-07-18 18:44:22'),
(9, 2, 'Marinilla', 'Ubicada en el oriente antioqueño, Marinilla es conocida como la \"Cuna de los Músicos de Antioquia\" por su gran tradición musical, especialmente en la fabricación de instrumentos de cuerda como tiples y guitarras. Es un municipio agrícola, famoso por la elaboración de \"arepas de chócolo\" (maíz tierno) y por ser un punto de partida para explorar otras atracciones del oriente.', 1, '2025-07-18 18:44:22', '2025-07-18 18:44:22'),
(10, 2, 'Dabeiba', 'Este extenso municipio se encuentra en el occidente de Antioquia, en una zona de transición entre la región andina y el Urabá antioqueño. Es un territorio de gran riqueza natural y biodiversidad, con ríos importantes y áreas de selva. Históricamente, ha sido una zona estratégica y un corredor natural hacia el Chocó y la costa. Su economía es principalmente agrícola.', 1, '2025-07-18 18:44:22', '2025-07-18 18:44:22');

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

--
-- Volcado de datos para la tabla `ndap`
--

INSERT INTO `ndap` (`Ndap_id`, `Ndap_nombre`, `Ndap_descripcion`, `Activo`, `Created_at`, `Updated_at`) VALUES
(1, 'Amazonas', 'El departamento del Amazonas es una de las joyas naturales y culturales de Colombia, ubicado en el extremo sur del país y en gran parte al sur de la línea ecuatorial. Su capital es Leticia. Es el departamento más grande de Colombia en extensión, cubriendo aproximadamente el 9.6% del territorio nacional y una parte significativa de la vasta Selva Amazónica.', 1, '2025-07-18 16:38:52', '2025-07-18 16:38:52'),
(2, 'Antioquia', 'Ubicado en el centro-norte del país. Es un departamento de gran importancia histórica, económica y cultural, conocido por su espíritu emprendedor, su riqueza natural y la calidez de su gente. Su capital es Medellín, la segunda ciudad más poblada de Colombia y un centro neurálgico de innovación y desarrollo.', 1, '2025-07-18 16:44:42', '2025-07-18 16:44:42'),
(3, 'Arauca', 'Se encuentra ubicado en el extremo oriental de Colombia, en la vasta y singular región de la Orinoquía. Es un territorio de llanuras extensas, ríos caudalosos y una rica cultura llanera, que limita al norte y al este con la República Bolivariana de Venezuela, al sur con los departamentos de Vichada y Casanare, y al oeste con Boyacá.', 1, '2025-07-18 16:44:42', '2025-07-18 16:44:42'),
(4, 'Atlántico', 'Ubicado en la región Caribe, en el extremo norte del país. Es el departamento más pequeño en extensión territorial del país continental, pero uno de los más densamente poblados y económicamente dinámicos. Su capital es Barranquilla, la ciudad más grande del Caribe colombiano y un importante puerto marítimo y fluvial.', 1, '2025-07-18 16:44:42', '2025-07-18 16:44:42'),
(5, 'Bolívar', 'Es un territorio fundamental en la historia y la identidad de Colombia, ubicado en la región Caribe al norte del país. Nombrado en honor al Libertador Simón Bolívar, es un departamento de contrastes que combina la majestuosidad de su capital, Cartagena, con la riqueza de sus vastas llanuras interiores y su profunda herencia cultural.\r\n', 1, '2025-07-18 16:58:50', '2025-07-18 16:58:50'),
(6, 'Boyacá', 'Ubicado en la región Andina central del país. Es un departamento de profunda relevancia histórica para Colombia, ya que fue escenario de batallas decisivas para la independencia, como la Batalla de Boyacá. Conocido por sus paisajes montañosos, su riqueza cultural, su vocación agrícola y la calidez de su gente, Boyacá es un pilar fundamental de la identidad colombiana. Su capital es Tunja.\r\n', 1, '2025-07-18 16:58:50', '2025-07-18 16:58:50'),
(7, 'Caldas', 'Ubicado en la región Andina central, en el corazón del Eje Cafetero. Es un departamento montañoso, reconocido mundialmente por la calidad de su café, sus impresionantes paisajes, su riqueza cultural y la vibrante actividad de su capital, Manizales.\r\n', 1, '2025-07-18 16:58:50', '2025-07-18 16:58:50'),
(8, 'Caquetá', 'Situado en el suroccidente del país. Actúa como una bisagra geográfica y cultural entre la región Andina y la vasta llanura amazónica, siendo la principal puerta de entrada a la Amazonía colombiana desde el interior del país. Su capital es Florencia\r\n', 1, '2025-07-18 16:58:50', '2025-07-18 16:58:50'),
(9, 'Casanare', 'Ubicado en la vasta y singular región de la Orinoquía, en el centro-este del país. Es un territorio que encarna la esencia de los Llanos Orientales, conocido por sus extensas sabanas, su profunda cultura llanera, su importante actividad ganadera y petrolera. Su capital es Yopal\r\n', 1, '2025-07-18 16:58:50', '2025-07-18 16:58:50'),
(10, 'Cauca', 'Situado en el suroccidente del país. Su posición geográfica lo convierte en un verdadero cruce de caminos que conecta la región Andina con el Pacífico, y el sur con el centro del país. Es un territorio de inmensa riqueza natural, diversidad étnica y cultural, y una profunda relevancia histórica. Su capital es Popayán, conocida como la \"Ciudad Blanca\" y declarada Ciudad UNESCO de la Gastronomía.\r\n', 1, '2025-07-18 17:06:02', '2025-07-18 17:06:02'),
(11, 'Cesar', 'Ubicado en la región Caribe en el noreste del país. Es un territorio de contrastes geográficos, que abarca desde las cumbres nevadas de la Sierra Nevada de Santa Marta hasta las extensas llanuras del valle del río Cesar y la Depresión Momposina. Es universalmente reconocido como la cuna del vallenato, uno de los géneros musicales más emblemáticos de Colombia. Su capital es Valledupar.\r\n', 1, '2025-07-18 17:06:02', '2025-07-18 17:06:02'),
(12, 'Chocó', 'Ubicado en el extremo occidental del país. Es una región única y de vital importancia, ya que es el único departamento colombiano con costas tanto en el Océano Pacífico como en el mar Caribe, y es la región más biodiversa del planeta en su extensión. Es un bastión de la cultura afrocolombiana e indígena, con una riqueza natural y cultural inigualable. Su capital es Quibdó.\r\n', 1, '2025-07-18 17:06:02', '2025-07-18 17:06:02'),
(13, 'Córdoba', 'Ubicado en la región Caribe en el noroccidente del país. Es un territorio de extensas sabanas, una rica tradición ganadera y una vibrante cultura influenciada por sus raíces indígenas y afrocolombianas, moldeada por la presencia vital del río Sinú. Su capital es Montería, conocida como la \"Perla del Sinú\" y la \"Capital Ganadera de Colombia\".\r\n', 1, '2025-07-18 17:06:02', '2025-07-18 17:06:02'),
(14, 'Cundinamarca', 'Situado en el centro del país, en la región Andina. Es un departamento de inmensa importancia estratégica, histórica y cultural, ya que alberga la capital de la república, Bogotá, D.C. (aunque Bogotá es un distrito capital y no forma parte administrativa de Cundinamarca, está enclavada en su territorio y su desarrollo está intrínsecamente ligado a él). Cundinamarca es un departamento de contrastes, con paisajes que van desde las altas montañas y páramos hasta valles cálidos. Su capital es Bogotá D.C., pero su sede administrativa departamental está en la misma ciudad.\r\n', 1, '2025-07-18 17:06:02', '2025-07-18 17:06:02'),
(15, 'Guainía', 'Ubicado en el extremo oriental del país, en la vasta región de la Amazonía y la Orinoquía. Es un territorio de inmensa riqueza natural, paisajes fluviales, formaciones rocosas únicas y una profunda herencia de sus pueblos indígenas. Es uno de los departamentos más jóvenes de Colombia (creado en 1991) y de los menos poblados. Su capital es Inírida.\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(16, 'Guaviare', 'Ubicado en el sureste del país, en una zona de transición entre la Orinoquía y la Amazonía. Es un departamento de inmensa riqueza natural y un notable patrimonio arqueológico de arte rupestre, que ha estado históricamente marcado por desafíos relacionados con el conflicto y la colonización. Su capital es San José del Guaviare.\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(17, 'Huila', 'Ubicado en el suroccidente del país, en la región Andina. Es un valle interandino de gran fertilidad, enmarcado por las imponentes cordilleras Central y Oriental, y conocido por su importante producción de café, arroz, y su rico patrimonio arqueológico. Su capital es Neiva.\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(18, 'La Guajira', 'Ubicado en el extremo noreste del país, en la región Caribe. Es un territorio de contrastes asombrosos, donde el árido desierto se encuentra con las aguas cristalinas del mar Caribe, y donde habita la cultura ancestral del pueblo Wayúu. Es el departamento más septentrional de Suramérica. Su capital es Riohacha\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(19, 'Magdalena', 'Ubicado en la región Caribe en el norte del país. Es un territorio de vital importancia histórica y económica, que abarca desde la imponente Sierra Nevada de Santa Marta hasta las fértiles llanuras del río Magdalena y la costa caribeña. Es conocido por su producción de banano, su rica biodiversidad y su profundo arraigo cultural. Su capital es Santa Marta, la primera ciudad fundada en Colombia.\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(20, 'Meta', 'Ubicado en el centro-este del país, en la vasta región de la Orinoquía. Es el segundo departamento más grande de Colombia en extensión, y representa el corazón de los Llanos Orientales, con sus extensas sabanas, su rica biodiversidad y su vibrante cultura llanera. Su capital es Villavicencio, conocida como la \"Puerta del Llano\".\r\n', 1, '2025-07-18 17:11:53', '2025-07-18 17:11:53'),
(21, 'Nariño', 'Ubicado en el extremo suroccidental del país. Su posición geográfica lo convierte en un punto de convergencia de diversas regiones: la Cordillera de los Andes, la costa Pacífica y la frontera con Ecuador. Es un departamento de inmensa riqueza natural, diversidad cultural y una profunda identidad. Su capital es San Juan de Pasto,\r\n', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(22, 'Norte de Santander', 'Ubicado en el extremo noreste del país, en la región Andina. Es un departamento de gran importancia estratégica por su ubicación fronteriza con Venezuela, lo que lo convierte en un corredor clave para el comercio y el intercambio. Es conocido por su producción de carbón, su actividad comercial y su relevancia histórica. Su capital es San José de Cúcuta, la principal ciudad de la frontera colombo-venezolana.\r\n', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(23, 'Putumayo', 'Ubicado en el suroeste del país, en la región Amazónica. Es un territorio que sirve de puerta de entrada a la Amazonía desde los Andes, con una inmensa riqueza natural, una notable diversidad cultural de pueblos indígenas y una ubicación estratégica fronteriza con Ecuador y Perú. Su capital es Mocoa.\r\n', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(24, 'Quindío', 'Ubicado en el centro-occidente del país, en la región Andina. Es el departamento más pequeño de Colombia en extensión, pero uno de los más ricos en belleza paisajística y cultura. Es el corazón del Paisaje Cultural Cafetero (PCC), declarado Patrimonio de la Humanidad por la UNESCO, y un destino emblemático para el turismo y la producción de café de alta calidad. Su capital es Armenia.\r\n', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(25, 'Risaralda', 'ción de café de alta calidad, su desarrollo industrial y su cercanía a los imponentes picos nevados. Su capital es Pereira, conocida como la \"Perla del Otún\" y la \"Capital del Eje Cafetero\".', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(26, 'San Andrés y Providencia', 'roeste de la costa continental colombiana. Es un departamento ins', 1, '2025-07-18 17:17:25', '2025-07-18 17:17:25'),
(27, 'Santander', 'Ubicado en el noreste del país, en la región Andina. Es un territorio de imponente geografía montañosa, con profundos cañones, mesetas fértiles y una arraigada cultura de trabajo y resiliencia. Es reconocido por su producción agrícola, su pujante industria y su vocación turística de aventura. Su capital es Bucaramanga, conocida como la \"Ciudad Bonita\" y la \"Ciudad de los Parques\".\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(28, 'Sucre', 'Ubicado en la región Caribe en el norte del país. Es un territorio de extensas sabanas, una importante zona costera sobre el golfo de Morrosquillo y una rica cultura influenciada por sus raíces indígenas, africanas y españolas. Su capital es Sincelejo, conocida como la \"Capital Sabanera\" o la \"Capital del Gesto\".\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(29, 'Tolima', 'Ubicado en el centro-occidente del país, en la región Andina. Es un departamento de gran importancia agrícola, cultural e histórica, enclavado en un fértil valle entre las cordilleras Central y Oriental. Es conocido como la \"Capital Musical de Colombia\" por su rica tradición folclórica. Su capital es Ibagué.\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(30, 'Valle del Cauca', 'Ubicado en el suroccidente del país, en la región Andina y con una salida al Océano Pacífico. Es un territorio de inmensa importancia agrícola, industrial, económica y cultural, asentado en el fértil valle interandino que le da nombre. Es la tercera economía más grande de Colombia. Su capital es Santiago de Cali,\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(31, 'Vaupés', 'Ubicado en el sureste del país, en la vasta región de la Amazonía. Es un territorio de inmensa selva virgen, ríos caudalosos y una profunda riqueza cultural, hogar de numerosos pueblos indígenas que preservan sus tradiciones y conocimientos ancestrales. Es uno de los departamentos menos poblados y con mayor porcentaje de territorio conservado de Colombia. Su capital es Mitú.\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(32, 'Vichada', 'Ubicado en el extremo oriental del país, en la vasta región de la Orinoquía. Es el segundo departamento más grande de Colombia en extensión (después de Amazonas), y se caracteriza por sus inmensas sabanas, morichales, selvas de galería y una rica biodiversidad de la fauna llanera. Es un territorio de gran potencial agropecuario y ecoturístico. Su capital es Puerto Carreño.\r\n', 1, '2025-07-18 17:32:46', '2025-07-18 17:32:46'),
(33, 'Bogotá D.C.', 'Es la capital de Colombia y del departamento de Cundinamarca (aunque administrativamente no hace parte de este, sino que es un distrito capital). Se ubica en el centro del país, en la Sabana de Bogotá, parte del vasto Altiplano Cundiboyacense, a una altitud promedio de 2.640 metros sobre el nivel del mar. Es la ciudad más grande y poblada de Colombia, un centro político, económico, industrial, cultural y turístico de primer orden en América Latina.', 1, '2025-07-18 17:36:40', '2025-07-18 17:36:40');

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
(1, 'El Tambillo', 1, 1, '2025-07-20 12:02:59', '2025-07-20 12:02:59'),
(2, 'Roma', 2, 1, '2025-07-20 12:02:59', '2025-07-20 12:02:59'),
(3, 'Puerto rico', 3, 1, '2025-07-20 12:02:59', '2025-07-20 12:02:59'),
(4, 'San palito', 4, 1, '2025-07-20 12:02:59', '2025-07-20 12:02:59'),
(5, 'Pusbi', 5, 1, '2025-07-20 12:02:59', '2025-07-20 12:02:59');

--
-- Índices para tablas volcadas
--

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
-- Indices de la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD PRIMARY KEY (`Vereda_id`),
  ADD KEY `Municipio_FK` (`Municipio_FK`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ciudad`
--
ALTER TABLE `ciudad`
  MODIFY `Ciudad_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `corregimiento`
--
ALTER TABLE `corregimiento`
  MODIFY `Corregimiento_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `Municipio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `ndap`
--
ALTER TABLE `ndap`
  MODIFY `Ndap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT de la tabla `vereda`
--
ALTER TABLE `vereda`
  MODIFY `Vereda_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

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
-- Filtros para la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD CONSTRAINT `municipio_ibfk_1` FOREIGN KEY (`Ndap_FK`) REFERENCES `ndap` (`Ndap_id`);

--
-- Filtros para la tabla `vereda`
--
ALTER TABLE `vereda`
  ADD CONSTRAINT `vereda_ibfk_1` FOREIGN KEY (`Municipio_FK`) REFERENCES `municipio` (`Municipio_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
