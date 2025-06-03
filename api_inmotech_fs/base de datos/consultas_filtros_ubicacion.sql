-- ¡Absolutamente! Aquí tienes las consultas SQL específicas para los filtros de ubicación que solicitaste, considerando la estructura de tu base de datos y que la operación es en Colombia.

-- Consultas SQL para Filtros de Ubicación
-- Estas consultas te permitirán buscar inmuebles basándote en diferentes niveles geográficos. Para cada ejemplo, asumo que los IDs o nombres se pasan como parámetros a tu API.

-- 1. Inmuebles por Departamento/Provincia (Ndap_id)
-- Permite buscar propiedades en todo un departamento.

SQL

SELECT
    i.*,
    n.Ndap_descripcion AS Departamento
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id OR corr.Municipio_FK = m.Municipio_id OR v.Municipio_FK = m.Municipio_id
JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
WHERE
    i.Estado = 'disponible'
    AND n.Ndap_id = :ndap_id_param; -- Ejemplo: ID de Cundinamarca

-- 2. Inmuebles por Municipio (Municipio_id)
-- Para búsquedas más específicas dentro de un municipio.

SQL

SELECT
    i.*,
    m.Municipio_nombre AS Municipio
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id OR corr.Municipio_FK = m.Municipio_id OR v.Municipio_FK = m.Municipio_id
WHERE
    i.Estado = 'disponible'
    AND m.Municipio_id = :municipio_id_param; -- Ejemplo: ID de Soacha

-- 3. Inmuebles por Ciudad (Ciudad_id)
-- Filtro común para grandes centros urbanos.

SQL

SELECT
    i.*,
    c.Ciudad AS Ciudad
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
WHERE
    i.Estado = 'disponible'
    AND c.Ciudad_id = :ciudad_id_param; -- Ejemplo: ID de Bogotá

-- 4. Inmuebles por Corregimiento (Corregimiento_id)
-- Útil para áreas rurales o periurbanas.

SQL

SELECT
    i.*,
    corr.Corregimiento AS Corregimiento
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
WHERE
    i.Estado = 'disponible'
    AND corr.Corregimiento_id = :corregimiento_id_param; -- Ejemplo: ID de La Calera

-- 5. Inmuebles por Vereda (Vereda_id)
-- Para una granularidad máxima en ubicaciones rurales.

SQL

SELECT
    i.*,
    v.Vereda_nombre AS Vereda
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
WHERE
    i.Estado = 'disponible'
    AND v.Vereda_id = :vereda_id_param; -- Ejemplo: ID de una vereda específica

-- 6. Inmuebles por Barrio (Barrio_id)
-- Fundamental para búsquedas urbanas detalladas.

SQL

SELECT
    i.*,
    b.Nombre_barrio AS Barrio
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
WHERE
    i.Estado = 'disponible'
    AND b.Barrio_id = :barrio_id_param; -- Ejemplo: ID de Chapinero Alto

-- 7. Búsqueda por Radio/Proximidad (Latitud/Longitud)
-- Esta consulta utiliza la fórmula de Haversine para calcular la distancia entre dos puntos en una esfera (la Tierra).

-- Parámetros:

-- latitud_centro: Latitud del punto de búsqueda del usuario (ej. 4.60971)
-- longitud_centro: Longitud del punto de búsqueda del usuario (ej. -74.08175)
-- radio_km: Radio de búsqueda en kilómetros (ej. 5 para 5km)
-- SQL

SELECT
    i.*,
    l.Latitud,
    l.Longitud,
    -- Calcula la distancia en kilómetros
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(l.Latitud)) * cos(radians(l.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(l.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    localizacion AS l ON d.Localizacion_FK = l.Localizacion_id
WHERE
    i.Estado = 'disponible'
HAVING
    distancia_km <= :radio_km;

-- Consideraciones para Búsqueda por Radio:

-- Rendimiento: Para grandes volúmenes de datos, los cálculos de distancia pueden ser costosos. Considera usar índices espaciales si tu base de datos (MySQL 8.0+ con Spatial Extensions) lo soporta, o implementar una estrategia de "bounding box" para pre-filtrar y luego calcular distancias exactas.
-- Precisión de Datos: Asegúrate de que los campos Latitud y Longitud en tu tabla localizacion estén correctamente poblados y sean precisos.
-- 8. Inmuebles por Tipo de Vía y Número Específico
-- Este es un filtro muy granular, útil si el usuario tiene una dirección casi exacta.

SQL

SELECT
    i.*,
    d.Direccion,
    d.Tipo_via,
    d.Numero_via_principal,
    d.Numero_calle_transversal,
    d.Numero_edificacion
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
WHERE
    i.Estado = 'disponible'
    AND d.Tipo_via = :tipo_via_param -- Ejemplo: 'Calle'
    AND d.Numero_via_principal = :numero_via_principal_param -- Ejemplo: 123
    AND d.Numero_calle_transversal = :numero_calle_transversal_param -- Ejemplo: 45
    AND d.Numero_edificacion = :numero_edificacion_param; -- Ejemplo: 67

-- 9. Inmuebles por Designador Cardinal (Designador_cardinal_id)
-- Útil para refinar búsquedas en ciudades con nomenclatura de dirección como Bogotá (Norte, Sur, Este, Oeste).

SQL

SELECT
    i.*,
    dc.Cardinalidad
FROM
    inmueble AS i
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    designador_cardinal AS dc ON d.Designador_cardinal_FK = dc.Designador_cardinal_id
WHERE
    i.Estado = 'disponible'
    AND dc.Designador_cardinal_id = :designador_cardinal_id_param; -- Ejemplo: ID de 'Norte'

-- Nota Importante sobre LEFT JOIN para la Jerarquía de Ubicación:
-- En las consultas que suben por la jerarquía de ubicación (Departamento, Municipio), he usado LEFT JOIN para ciudad, corregimiento y vereda antes de llegar a municipio y ndap. Esto se debe a que un barrio_ciudad_corregimiento_vereda podría estar directamente asociado a una ciudad, un corregimiento o una vereda (o incluso solo un barrio), y de ahí se conecta al municipio. LEFT JOIN asegura que no pierdes inmuebles si, por ejemplo, no tienen una "ciudad" específica pero sí un "corregimiento" que luego se asocia al municipio y departamento.

-- Recuerda reemplazar :parametro_nombre con los valores reales que recibas de tu API, asegurándote de usar consultas parametrizadas para seguridad.

-- Aquí tienes la consulta SQL unificada para todos los filtros de ubicación que describiste. Esta consulta combina todas las opciones en una sola declaración, permitiendo que cada filtro sea opcional. Tu backend determinará qué parámetros enviar, y los filtros solo se aplicarán si se proporciona un valor no nulo para el parámetro correspondiente.

-- Consulta SQL Unificada para Filtros de Ubicación de Inmuebles
SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Descripcion_General,
    i.Motivo_VoA,
    i.Estado,
    i.Codigo_interno,
    -- Información de la Dirección
    d.Direccion AS DireccionCompleta,
    d.Tipo_via,
    d.Numero_via_principal,
    d.Numero_calle_transversal,
    d.Numero_edificacion,
    d.Descripcion_adicional AS DireccionAdicional,
    dc.Cardinalidad AS DesignadorCardinal_Abreviacion,
    loc.Latitud,
    loc.Longitud,
    loc.Localizacion_descripcion AS DescripcionLocalizacion,
    -- Nombres de Ubicación (se mostrará el que exista en la jerarquía)
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,
    -- Cálculo de distancia para el filtro por radio
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
-- Uniones para acceder a la información de dirección y ubicación
JOIN
    direccion AS d ON i.Direccion_FK = d.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN -- Se usa LEFT JOIN aquí para el municipio para que, incluso si no se encuentra un vínculo directo vía ciudad/corregimiento/vereda para un bccv, la consulta no falle. Sin embargo, el JOIN a `ndap` luego podría filtrar esos casos.
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
JOIN -- Asumimos que todo municipio debe pertenecer a un departamento para que el inmueble se muestre.
    ndap AS n ON m.Ndap_FK = n.Ndap_id
LEFT JOIN
    designador_cardinal AS dc ON d.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON d.Localizacion_FK = loc.Localizacion_id
WHERE
    i.Estado = 'disponible' -- Filtro base: solo inmuebles disponibles
    -- ##########################################################################
    -- Criterios de Filtro Opcionales (Tu backend construiría estos AND dinámicamente)
    -- ##########################################################################

    -- 1. Filtro por Departamento (Ndap_id)
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)

    -- 2. Filtro por Municipio (Municipio_id)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)

    -- 3-6. Filtro por Ubicación Específica (Ciudad, Corregimiento, Vereda, Barrio)
    -- Se requiere :ubicacion_especifica_id_param (el ID) y :tipo_ubicacion_param (e.g., 'ciudad', 'barrio')
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )

    -- 8. Filtro por Tipo de Vía y Número Específico (todos deben estar presentes para filtrar)
    AND (
        :tipo_via_param IS NULL OR -- Si tipo_via_param es NULL, no se aplica este filtro completo
        (
            d.Tipo_via = :tipo_via_param
            AND d.Numero_via_principal = :numero_via_principal_param
            AND d.Numero_calle_transversal = :numero_calle_transversal_param
            AND d.Numero_edificacion = :numero_edificacion_param
        )
    )

    -- 9. Filtro por Designador Cardinal (Designador_cardinal_id)
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)

    -- Asegura que Latitud y Longitud existan si se va a filtrar por radio
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL))
HAVING
    -- 7. Filtro por Radio/Proximidad (Latitud/Longitud)
    -- Se aplica solo si :radio_km no es NULL
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    -- Ordena por distancia si se usa el filtro de radio, de lo contrario por fecha de publicación
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC
;
-- Consideraciones Clave para tu Backend
-- Parámetros Inteligentes: La lógica (:param IS NULL OR columna = :param) en la cláusula WHERE es crucial. Si el usuario no proporciona un valor para un filtro específico (por ejemplo, no selecciona un departamento), tu backend debe enviar NULL para el parámetro correspondiente (:ndap_id_param = NULL). Esto hará que esa parte de la condición sea verdadera y no restrinja los resultados. Si el usuario sí proporciona un valor, envías el valor real.
-- Gestión de ubicacion_especifica_id_param y tipo_ubicacion_param: Para los filtros de Barrio, Ciudad, Corregimiento y Vereda, necesitarás enviar dos parámetros: el ID de la ubicación específica (:ubicacion_especifica_id_param) y una cadena que indique el tipo de ubicación (:tipo_ubicacion_param, por ejemplo, 'ciudad', 'barrio', 'corregimiento', 'vereda').
-- Exactitud en la Dirección Completa: El filtro de Tipo_via y números (:tipo_via_param, etc.) se ha diseñado para que todos los componentes (Tipo_via, Numero_via_principal, Numero_calle_transversal, Numero_edificacion) deban ser proporcionados y coincidir para aplicar el filtro. Si solo se envía Tipo_via, este bloque de filtro no se activará a menos que los otros parámetros también se envíen (incluso si son NULL, ya que el AND agruparía). Si quieres permitir filtrar solo por Tipo_via, o por Tipo_via y Numero_via_principal, etc., tendrías que adaptar la lógica AND dentro de ese bloque.
-- Rendimiento y Optimización:
-- Asegúrate de que las columnas utilizadas en los JOINs y WHERE (Direccion_FK, Barrio_ciudad_corregimiento_vereda_FK, Ciudad_FK, Corregimiento_FK, Vereda_Fk, Municipio_FK, Ndap_FK, Designador_cardinal_FK, Localizacion_FK, Estado, Latitud, Longitud) tengan índices adecuados.
-- La fórmula de Haversine es computacionalmente intensiva. Para bases de datos muy grandes con muchas búsquedas por radio, considera implementar índices espaciales si tu motor de base de datos (como MySQL 8.0+ con extensiones espaciales) los soporta, o usar técnicas de "bounding box" para un pre-filtrado más rápido.
-- Seguridad (Inyección SQL): ¡Siempre usa sentencias preparadas (prepared statements) o un ORM (Object-Relational Mapper) para pasar los valores de los parámetros! Nunca concatenes las cadenas de los parámetros directamente en la consulta SQL.
-- Esta consulta unificada te da una herramienta poderosa y flexible para permitir a tus usuarios encontrar inmuebles basándose en criterios geográficos muy específicos.