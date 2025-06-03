-- Consultas SQL para Filtros por Tipo de Inmueble y Características Generales
-- Para todas estas consultas, asumiremos que el Estado del inmueble es 'disponible' por defecto, a menos que se especifique lo contrario. Los valores entre :parametro_nombre son los que recibirías de la entrada del usuario.

-- 1. Inmuebles por Tipo de Edificación
-- Inmuebles por Tipo de Edificación (por Categoría)
-- Esta consulta te permite buscar propiedades por la categoría principal de su edificación, lo que es ideal para filtros amplios (como "Residencial", "Comercial", "Industrial").

SQL

SELECT
    i.*,
    te.Tipo_edificacion_categoria AS CategoriaEdificacion
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param; -- Ejemplo: 'Residencial' o 'Comercial'

-- 2. Inmuebles por Motivo de Transacción (Venta/Arriendo/Anticrético)
-- Este filtro es crucial para diferenciar la intención del usuario.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = 'disponible'
    AND i.Motivo_VoA = :motivo_transaccion_param; -- Ejemplo: 'Venta' o 'Arriendo'

-- 3. Inmuebles por Rango de Precio
-- Permite a los usuarios buscar propiedades dentro de un presupuesto específico.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = 'disponible'
    AND i.Valor >= :precio_min_param -- Ejemplo: 100000000 (100 millones)
    AND i.Valor <= :precio_max_param; -- Ejemplo: 300000000 (300 millones)

-- Consideraciones:

-- Si solo se proporciona un mínimo, omite la condición AND i.Valor <= :precio_max_param;
-- Si solo se proporciona un máximo, omite la condición AND i.Valor >= :precio_min_param;
-- 4. Inmuebles por Rango de Área
-- Filtra propiedades por su tamaño, importante para el usuario.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = 'disponible'
    AND i.Area >= :area_min_param -- Ejemplo: 50 (metros cuadrados)
    AND i.Area <= :area_max_param; -- Ejemplo: 150 (metros cuadrados)

-- Consideraciones:

-- Similar al precio, si solo se proporciona un mínimo o un máximo, ajusta la consulta en consecuencia.
-- Asegúrate de que la unidad de Area (m² o pie²) sea consistente en toda la base de datos y clara para el usuario.
-- 5. Inmuebles por Antigüedad
-- Permite a los usuarios buscar propiedades nuevas o con cierta edad.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = 'disponible'
    AND i.Antiguedad = :antiguedad_param; -- Ejemplo: 0 (para "Nueva"), 5 (para "Menos de 5 años")

-- Nota sobre Antiguedad:
-- Tu campo Antiguedad es un INT. Para manejar rangos como "Menos de 5 años", "5-10 años", etc., necesitarás una lógica en tu aplicación que traduzca esas categorías a rangos numéricos. Por ejemplo:

-- "Nueva": i.Antiguedad = 0
-- "Menos de 5 años": i.Antiguedad > 0 AND i.Antiguedad <= 5
-- "5-10 años": i.Antiguedad > 5 AND i.Antiguedad <= 10
-- "Más de 10 años": i.Antiguedad > 10
-- "A remodelar": Esto podría ser un valor específico en Antiguedad (ej. -1), o un campo separado en inmueble para el estado de conservación si es una característica booleana (sí/no necesita remodelación). En tu tabla acerca_edificacion ya tienes Estado_conservacion que sería más apropiado para esto.
-- 6. Inmuebles por Estado del Inmueble
-- Para que el usuario pueda ver, por ejemplo, inmuebles que están "En proceso" si fuera relevante.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = :estado_inmueble_param; -- Ejemplo: 'disponible', 'vendido'
-- Nota: Por defecto, casi todas las consultas anteriores ya asumen i.Estado = 'disponible'. Este filtro sería para casos donde el usuario quiere ver inmuebles en otros estados.

-- 7. Inmuebles por Código Interno
-- Para búsquedas muy directas si el usuario ya conoce el identificador de la propiedad.

SQL

SELECT
    i.*
FROM
    inmueble AS i
WHERE
    i.Estado = 'disponible' -- O puedes quitar esta condición si quieres buscar por código interno sin importar el estado
    AND i.Codigo_interno = :codigo_interno_param; -- Ejemplo: 'INM-00123'
-- Estas consultas te proporcionarán una base sólida para los filtros principales de tu revista. Recuerda que puedes combinar estas condiciones WHERE con AND para crear búsquedas más complejas (ej. "apartamentos en venta en Bogotá con 3 habitaciones y precio entre X y Y").

Consulta SQL Unificada para Filtros Generales de Inmuebles
SQL

SELECT
    i.*,
    te.Tipo_edificacion_categoria AS CategoriaEdificacion
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
WHERE
    -- Filtro base: inmuebles 'disponibles' por defecto, a menos que el usuario especifique otro estado
    (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)

    -- 1. Filtro por Tipo de Edificación (Categoría)
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)

    -- 2. Filtro por Motivo de Transacción (Venta/Arriendo/Anticrético)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)

    -- 3. Filtro por Rango de Precio
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)

    -- 4. Filtro por Rango de Área
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)

    -- 5. Filtro por Antigüedad
    -- Maneja categorías de antigüedad o un valor exacto
    AND (
        :antiguedad_param IS NULL OR
        (CASE
            WHEN :antiguedad_param = 'Nueva' THEN i.Antiguedad = 0
            WHEN :antiguedad_param = 'Menos de 5 años' THEN i.Antiguedad > 0 AND i.Antiguedad <= 5
            WHEN :antiguedad_param = '5-10 años' THEN i.Antiguedad > 5 AND i.Antiguedad <= 10
            WHEN :antiguedad_param = 'Mas de 10 años' THEN i.Antiguedad > 10
            -- Si antiguedad_param es un número específico, se puede añadir una condición extra o simplemente manejarlo como tal.
            -- Por ejemplo, si pasas 5 como :antiguedad_param, buscaría i.Antiguedad = 5.
            -- Para este ejemplo, si no coincide con las categorías, asumimos que se busca un valor exacto.
            ELSE i.Antiguedad = CAST(:antiguedad_param AS SIGNED)
        END)
    )

    -- 6. Filtro por Código Interno
    -- Este filtro es opcional y no asume el estado 'disponible' si se proporciona.
    AND (:codigo_interno_param IS NULL OR i.Codigo_interno = :codigo_interno_param)
;