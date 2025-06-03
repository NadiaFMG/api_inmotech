¡Entendido! Vamos a crear las consultas SQL para los filtros basados en las Características de la Edificación/Conjunto, utilizando la tabla acerca_edificacion de tu esquema de base de datos.

Asumiremos que, como en las consultas anteriores, el estado del inmueble es 'disponible' por defecto.

Aquí tienes las consultas específicas para cada filtro:

Consultas SQL para Filtros por Características de la Edificación/Conjunto
SQL

-- 1. Inmuebles por Estrato
-- Permite a los usuarios buscar propiedades en un estrato socioeconómico específico.

SELECT
    i.*,
    ae.Estrato
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND ae.Estrato = :estrato_param; -- Ejemplo: 3, 4, 5

-- 2. Inmuebles por Tipo de Construcción
-- Filtra propiedades según el material o método de construcción.

SELECT
    i.*,
    ae.Tipo_construccion
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND ae.Tipo_construccion = :tipo_construccion_param; -- Ejemplo: 'Concreto', 'Ladrillo', 'Prefabricado'

-- 3. Inmuebles por Año de Construcción
-- Útil para usuarios que buscan propiedades más nuevas o de un período específico.

SELECT
    i.*,
    ae.Anio_construccion
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND ae.Anio_construccion = :anio_construccion_param; -- Ejemplo: 2010

-- Consideraciones para Año de Construcción:
-- Para rangos de años (ej. "construido después de 2000"), ajustarías la condición:
-- AND ae.Anio_construccion >= :anio_min_param
-- AND ae.Anio_construccion <= :anio_max_param


-- 4. Inmuebles por Estado de Conservación
-- Permite a los usuarios encontrar propiedades que requieren o no remodelación.

SELECT
    i.*,
    ae.Estado_conservacion
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND ae.Estado_conservacion = :estado_conservacion_param; -- Ejemplo: 'Excelente', 'Bueno', 'Necesita remodelacion'


-- 5. Inmuebles con Zona Común
-- Para propiedades que ofrecen amenidades compartidas (piscinas, salones comunales, gimnasios).

SELECT
    i.*,
    ae.Zona_comun
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    AND ae.Zona_comun = 1; -- Asumiendo 1 para TRUE (sí tiene zona común)
    -- Si el usuario busca "No tiene zona común": AND ae.Zona_comun = 0;
Consulta SQL Unificada para Filtros de Características de la Edificación/Conjunto
Para una mayor flexibilidad, aquí tienes una consulta que combina todos estos filtros, haciéndolos opcionales mediante el uso de (:param IS NULL OR condición):

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Descripcion_General,
    i.Antiguedad,
    i.Motivo_VoA,
    i.Estado,
    i.Codigo_interno,
    ae.AcercaDeLaEdificacion,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible' -- Filtro base
    -- 1. Filtro por Estrato
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    -- 2. Filtro por Tipo de Construcción
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    -- 3. Filtro por Año de Construcción (rango)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    -- Si solo se proporciona un año exacto, puedes ajustar tu backend para que :anio_construccion_min_param y :anio_construccion_max_param sean el mismo valor.
    -- 4. Filtro por Estado de Conservación
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    -- 5. Filtro por Zona Común (asumiendo 1 para sí, 0 para no)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param); -- Envía 1 para sí, 0 para no
Consideraciones para tu Backend:
Parámetros Opcionales: Al igual que en las consultas anteriores, si un filtro no es seleccionado por el usuario, tu backend debe pasar NULL al parámetro correspondiente (:estrato_param = NULL, etc.). Esto permite que la condición (:param IS NULL OR ...) se evalúe como verdadera y no aplique ese filtro.
Sentencias Preparadas: Siempre utiliza sentencias preparadas o un ORM para ejecutar estas consultas y pasar los valores de los parámetros de forma segura, evitando la inyección SQL.
Rangos: Para el Anio_construccion, te he proporcionado parámetros _min y _max. Si el usuario solo especifica un año exacto, tu backend puede enviar el mismo valor para ambos parámetros (:anio_construccion_min_param = 2010, :anio_construccion_max_param = 2010).
Valores Booleanos: Para Zona_comun, tu tabla utiliza TINYINT(1). En tu backend, convierte los valores booleanos (true/false) de tu frontend a 1 o 0 respectivamente para los parámetros.
Estas consultas te permitirán filtrar eficientemente los inmuebles según las características de su edificación o conjunto.