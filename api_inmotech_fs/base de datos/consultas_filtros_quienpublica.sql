-- ¡Claro que sí! Aquí tienes las consultas SQL en español para los filtros de "Quién Publica".

-- Consultas SQL para Filtros de "Quién Publica"
-- Estas consultas te ayudarán a filtrar los listados de propiedades basándote en la identidad o categoría del anunciante. Como en las consultas anteriores, asumimos que el estado del inmueble es 'disponible' por defecto, pero puedes modificar esta condición según tus necesidades.

SQL

-- 1. Inmuebles Publicados por un Anunciante Específico (Usuario de la Plataforma)
-- Esta consulta te permite ver todas las propiedades publicadas por una cuenta de usuario o agencia en particular.

SELECT
    i.*,
    pu.Username AS NombreUsuarioAnunciante
FROM
    inmueble AS i
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
WHERE
    i.Estado = 'disponible'
    AND pu.Platform_user_id = :platform_user_id_param; -- Ejemplo: ID de un usuario/agencia específico

-- 2. Inmuebles por Tipo de Anunciante (Requiere el campo 'Profile_type' en platform_profile)
-- Esto ayuda a categorizar y filtrar listados según si el publicador es una agencia, un vendedor particular, una constructora, etc.

SELECT
    i.*,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante -- Asumiendo que has añadido una columna 'Profile_type' a platform_profile
FROM
    inmueble AS i
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible'
    AND pp.Profile_type = :tipo_anunciante_param; -- Ejemplo: 'Agencia', 'Particular', 'Constructora'
-- Agregando Profile_type a platform_profile
-- Dado que tu tabla platform_profile actual no incluye la columna Profile_type, deberás añadirla primero. Este es un paso esencial para poder filtrar por tipo de anunciante.

SQL

ALTER TABLE `platform_profile`
ADD COLUMN `Profile_type` VARCHAR(50) AFTER `Profile_social`;
-- Opcional: Puedes establecer un valor por defecto o hacerlo NOT NULL si tus reglas de negocio lo requieren.
-- Ejemplo con valor por defecto: ADD COLUMN `Profile_type` VARCHAR(50) DEFAULT 'Particular' AFTER `Profile_social`;
-- Consulta SQL Unificada para Filtros de "Quién Publica"
-- Para mayor flexibilidad, aquí tienes una consulta combinada que hace que ambos filtros sean opcionales:

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Descripcion_General,
    i.Motivo_VoA,
    i.Estado,
    i.Codigo_interno,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante -- Esta columna debe añadirse a platform_profile primero
FROM
    inmueble AS i
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN -- Usamos LEFT JOIN aquí por si no todos los platform_user tienen un perfil completo
            -- o si quieres mostrar listados incluso si el tipo de perfil no está configurado.
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible' -- Filtro base
    -- Filtro por ID de Usuario de Plataforma específico
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    -- Filtro por Tipo de Anunciante (requiere la columna Profile_type en platform_profile)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param);
-- Consideraciones Clave para la Implementación
-- Indexación: Como bien señalaste, la indexación es fundamental para el rendimiento. Para estos filtros, asegúrate de tener índices en las siguientes columnas:
-- inmueble.Platform_user_FK
-- platform_user.Platform_user_id
-- platform_profile.Platform_user_FK
-- platform_profile.Profile_type (una vez que la añadas)
-- inmueble.Estado (si se filtra con frecuencia)
-- Parámetros de API: Define claramente cómo se pasarán estos filtros a tu API (por ejemplo, GET /api/admin/inmuebles?publicado_por_id=123 o GET /api/admin/inmuebles?tipo_anunciante=Agencia).
-- Combinaciones: La consulta unificada permite combinaciones AND por defecto (por ejemplo, "listados del usuario X Y del tipo 'Agencia'"). Esto suele ser lo que se busca en un sistema de filtros.
-- Manejo de NULL: Tu backend debe enviar NULL a los parámetros (:platform_user_id_param, :tipo_anunciante_param) si el usuario o administrador no selecciona ese filtro específico. Esto asegura que la condición (:param IS NULL OR columna = :param) funcione correctamente.
-- Interfaz (Herramienta Interna): Para una herramienta de administración interna, podrías tener menús desplegables para los tipos de anunciantes o un campo de búsqueda para IDs/nombres de usuario.
-- Al implementar esto, tendrás un control interno robusto y la capacidad de destacar tipos específicos de listados según sea necesario.

-- ¿Hay alguna otra categoría de filtros que te gustaría que revisemos, o te gustaría que profundicemos en la implementación de alguno de estos filtros en tu backend?