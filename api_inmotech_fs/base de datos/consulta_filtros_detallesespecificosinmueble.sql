-- ¡Excelente! Entiendo que quieres construir una consulta SQL que permita filtrar inmuebles utilizando una combinación de los detalles específicos que se encuentran en las tablas division, otras_caracteristicas, y organizacion_parqueadero.

-- Dada la estructura de tu base de datos y la lista de filtros que solicitas, vamos a construir una consulta SELECT que utilice JOINs a estas tablas y WHERE cláusulas dinámicas para aplicar los filtros.

-- Aquí te presento la consulta SQL base, y luego te explicaré cómo adaptarla para cada filtro:

SQL

SELECT
    i.*,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    d.Balcon,
    d.Terraza,
    d.Garaje,
    d.Ascensores,
    d.Closets,
    d.Estudio,
    d.Sala,
    d.Comedor,
    d.Zona_lavanderia,
    d.Deposito AS Deposito_Division, -- Renombrado para evitar conflicto con Deposito de otras_caracteristicas
    oc.Deposito AS Deposito_OtrasCaracteristicas, -- Renombrado
    oc.Lavanderia,
    oc.Gas,
    oc.Piso,
    oc.Mascotas_permitidas,
    oc.Amoblado,
    op.Tipo_parqueadero,
    op.Cantidad AS Cantidad_Parqueaderos,
    op.Cubierto AS Parqueadero_Cubierto,
    op.Disponible AS Parqueadero_Disponible
FROM
    inmueble AS i
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id -- Correcto para conectar otras_caracteristicas con asignacion
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
WHERE
    i.Estado = 'disponible'
    -- Aquí se añadirán las condiciones de filtro dinámicamente
;
-- Explicación de la Consulta Base:
-- SELECT i.*, ...: Selecciona todas las columnas de la tabla inmueble y las columnas específicas de las tablas division, otras_caracteristicas y organizacion_parqueadero que nos interesan para los filtros.
-- JOIN division AS d ON i.Division_FK = d.Division_id: Conecta inmueble con division usando la clave foránea Division_FK.
-- JOIN otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id: Conecta inmueble con otras_caracteristicas usando la clave foránea Otras_caracteristicas_FK.
-- JOIN asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id: Conecta otras_caracteristicas con asignacion usando la clave foránea Asignacion_FK.
-- JOIN organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id: Conecta asignacion con organizacion_parqueadero usando la clave foránea Organizacion_parqueadero_FK.
-- WHERE i.Estado = 'disponible': El filtro base para obtener solo inmuebles disponibles.
-- Cómo Añadir los Filtros Dinámicamente (Consideraciones de Backend)
-- En una aplicación real (frontend + backend), el backend recibiría los parámetros de filtro del frontend y construiría la cláusula WHERE dinámicamente.

-- Aquí te muestro cómo se vería la cláusula WHERE para cada uno de los filtros que mencionaste:

-- Filtros de division:

-- Número de Habitaciones:
SQL

AND d.Habitaciones = :num_habitaciones
-- O para un rango: AND d.Habitaciones >= :min_habitaciones AND d.Habitaciones <= :max_habitaciones
-- Número de Baños:
SQL

AND d.Baños = :num_baños
-- O para un rango: AND d.Baños >= :min_baños AND d.Baños <= :max_baños
-- Tipo de Cocina:
SQL

AND d.Cocina = :tipo_cocina -- Ej: 'Integral', 'Abierta'
Balcón/Terraza:
-- Para Balcon:
SQL

AND d.Balcon = 'Sí' -- Si el usuario busca inmuebles con balcón
-- O si quieres permitir filtrar por "No": AND d.Balcon = 'No'
Para Terraza:
SQL

AND d.Terraza > 0 -- Si el usuario busca inmuebles con al menos una terraza
-- O si quieres por número exacto: AND d.Terraza = :num_terrazas
-- Garaje/Estacionamiento (Parte de division):
SQL

AND d.Garaje > 0 -- Si el usuario busca inmuebles con al menos un garaje asociado directamente al inmueble.
-- O si quieres por número exacto: AND d.Garaje = :num_garajes
-- Ascensores:
SQL

AND d.Ascensores = 'Sí' -- Si el usuario busca inmuebles con ascensores
-- O si quieres por "No": AND d.Ascensores = 'No'
-- Closets:
SQL

AND d.Closets >= :min_closets -- Para un mínimo de closets
-- O por número exacto: AND d.Closets = :num_closets
-- Estudio:
SQL

AND d.Estudio = 1 -- Si el usuario busca inmuebles con estudio (1 para TRUE)
-- Sala/Comedor:
Para Sala:
SQL

AND d.Sala = 1 -- Si el usuario busca inmuebles con sala
-- Para Comedor:
SQL

AND d.Comedor = 1 -- Si el usuario busca inmuebles con comedor
-- Zona de Lavandería (en division):
SQL

AND d.Zona_lavanderia = 1 -- Si el usuario busca inmuebles con zona de lavandería
-- Depósito (en division):
SQL

AND d.Deposito = 1 -- Si el usuario busca inmuebles con depósito en la división
-- Filtros de otras_caracteristicas:

Lavandería (Comunal/Propia) (en otras_caracteristicas):
SQL

AND oc.Lavanderia = 1 -- Si el usuario busca inmuebles con lavandería
-- Gas:
SQL

AND oc.Gas = 1 -- Si el usuario busca inmuebles con gas
-- Piso:
SQL

AND oc.Piso = :numero_piso -- Para un número de piso específico
-- O para un rango: AND oc.Piso >= :min_piso AND oc.Piso <= :max_piso
-- Mascotas Permitidas:
SQL

AND oc.Mascotas_permitidas = 1 -- Si el usuario busca inmuebles que permiten mascotas
-- Amoblado:
SQL

AND oc.Amoblado = 1 -- Si el usuario busca inmuebles amoblados
-- Depósito (en otras_caracteristicas):
SQL

AND oc.Deposito > 0 -- Si el usuario busca inmuebles con depósitos en otras_caracteristicas
-- O si quieres por número exacto: AND oc.Deposito = :num_depositos_oc
-- Filtros de organizacion_parqueadero (a través de asignacion):

-- Garaje/Estacionamiento (Tipo, Cantidad, Cubierto):
SQL

AND op.Cantidad > 0 -- Inmuebles con al menos un estacionamiento
AND op.Tipo_parqueadero = :tipo_parqueadero -- Ej: 'Propio', 'Visitantes'
AND op.Cubierto = 1 -- Si el usuario busca estacionamiento cubierto
-- Y si quieres filtrar por disponibilidad del parqueadero: AND op.Disponible = 1
-- Ejemplo de una Consulta Completa con Múltiples Filtros
-- Si un usuario busca un apartamento disponible con 3 habitaciones, 2 baños, cocina integral, que permita mascotas, con gas, y que tenga al menos un parqueadero cubierto, la consulta se vería así:

SQL

SELECT
    i.*,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    d.Balcon,
    d.Terraza,
    d.Garaje,
    d.Ascensores,
    d.Closets,
    d.Estudio,
    d.Sala,
    d.Comedor,
    d.Zona_lavanderia,
    d.Deposito AS Deposito_Division,
    oc.Deposito AS Deposito_OtrasCaracteristicas,
    oc.Lavanderia,
    oc.Gas,
    oc.Piso,
    oc.Mascotas_permitidas,
    oc.Amoblado,
    op.Tipo_parqueadero,
    op.Cantidad AS Cantidad_Parqueaderos,
    op.Cubierto AS Parqueadero_Cubierto,
    op.Disponible AS Parqueadero_Disponible
FROM
    inmueble AS i
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
WHERE
    i.Estado = 'disponible'
    AND d.Habitaciones = 3
    AND d.Baños = 2
    AND d.Cocina = 'Integral'
    AND oc.Mascotas_permitidas = 1
    AND oc.Gas = 1
    AND op.Cantidad > 0
    AND op.Cubierto = 1
;
-- Consideraciones Clave para tu Backend:
-- Parámetros Opcionales: La clave es que el backend solo añada las cláusulas AND a la WHERE si el usuario ha proporcionado un valor para ese filtro.
-- Sanitización de Inputs: Siempre sanea y valida todos los inputs que recibes del frontend para prevenir ataques de inyección SQL. Utiliza sentencias preparadas con parámetros.
-- Rendimiento: Para búsquedas frecuentes, considera añadir índices a las columnas que se usan comúnmente en las cláusulas WHERE (ej., d.Habitaciones, d.Baños, oc.Mascotas_permitidas, op.Cubierto).