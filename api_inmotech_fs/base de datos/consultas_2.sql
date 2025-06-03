Combinaciones de 2 Grupos (10 en Total)
1. G1 (Tipo de Inmueble y Características Generales) + G2 (Ubicación Geográfica)
Descripción: Búsqueda común de usuario final por tipo de propiedad, precio, área, etc., y ubicación.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    i.Antiguedad,
    i.Codigo_interno,
    te.Tipo_edificacion_categoria,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,
    (
        CASE
            WHEN :latitud_centro IS NOT NULL AND :longitud_centro IS NOT NULL AND loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL THEN
                6371 * acos(
                    cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
                    + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
                )
            ELSE NULL
        END
    ) AS distancia_km
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
LEFT JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
LEFT JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 1
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)
    AND (
        :antiguedad_param IS NULL OR
        (CASE
            WHEN :antiguedad_param = 'Nueva' THEN i.Antiguedad = 0
            WHEN :antiguedad_param = 'Menos de 5 años' THEN i.Antiguedad > 0 AND i.Antiguedad <= 5
            WHEN :antiguedad_param = '5-10 años' THEN i.Antiguedad > 5 AND i.Antiguedad <= 10
            WHEN :antiguedad_param = 'Mas de 10 años' THEN i.Antiguedad > 10
            ELSE i.Antiguedad = CAST(:antiguedad_param AS SIGNED)
        END)
    )
    AND (:codigo_interno_param IS NULL OR i.Codigo_interno = :codigo_interno_param)
    -- Filtros del Grupo 2
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (dir.Tipo_via = :tipo_via_param AND dir.Numero_via_principal = :numero_via_principal_param AND dir.Numero_calle_transversal = :numero_calle_transversal_param AND dir.Numero_edificacion = :numero_edificacion_param)
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
2. G1 (Tipo de Inmueble y Características Generales) + G3 (Características de la Edificación/Conjunto)
Descripción: Permite a los usuarios buscar inmuebles por sus características básicas y también por detalles del edificio como estrato, año de construcción o si tiene zonas comunes.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    i.Antiguedad,
    te.Tipo_edificacion_categoria,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 1
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)
    AND (
        :antiguedad_param IS NULL OR
        (CASE
            WHEN :antiguedad_param = 'Nueva' THEN i.Antiguedad = 0
            WHEN :antiguedad_param = 'Menos de 5 años' THEN i.Antiguedad > 0 AND i.Antiguedad <= 5
            WHEN :antiguedad_param = '5-10 años' THEN i.Antiguedad > 5 AND i.Antiguedad <= 10
            WHEN :antiguedad_param = 'Mas de 10 años' THEN i.Antiguedad > 10
            ELSE i.Antiguedad = CAST(:antiguedad_param AS SIGNED)
        END)
    )
    AND (:codigo_interno_param IS NULL OR i.Codigo_interno = :codigo_interno_param)
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param);
3. G1 (Tipo de Inmueble y Características Generales) + G4 ("Quién Publica")
Descripción: Útil para la administración o para filtrar listados por tipo de anunciante o un anunciante específico, combinado con las características generales del inmueble.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 1
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)
    AND (
        :antiguedad_param IS NULL OR
        (CASE
            WHEN :antiguedad_param = 'Nueva' THEN i.Antiguedad = 0
            WHEN :antiguedad_param = 'Menos de 5 años' THEN i.Antiguedad > 0 AND i.Antiguedad <= 5
            WHEN :antiguedad_param = '5-10 años' THEN i.Antiguedad > 5 AND i.Antiguedad <= 10
            WHEN :antiguedad_param = 'Mas de 10 años' THEN i.Antiguedad > 10
            ELSE i.Antiguedad = CAST(:antiguedad_param AS SIGNED)
        END)
    )
    AND (:codigo_interno_param IS NULL OR i.Codigo_interno = :codigo_interno_param)
    -- Filtros del Grupo 4
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param);
4. G1 (Tipo de Inmueble y Características Generales) + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda por características internas (habitaciones, baños, etc.) combinada con el tipo de inmueble, precio y área.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    d.Balcon,
    d.Terraza,
    d.Garaje AS Garaje_Division,
    d.Ascensores,
    oc.Mascotas_permitidas,
    oc.Amoblado,
    op.Tipo_parqueadero,
    op.Cantidad AS Cantidad_Parqueaderos
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
LEFT JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
LEFT JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 1
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)
    AND (
        :antiguedad_param IS NULL OR
        (CASE
            WHEN :antiguedad_param = 'Nueva' THEN i.Antiguedad = 0
            WHEN :antiguedad_param = 'Menos de 5 años' THEN i.Antiguedad > 0 AND i.Antiguedad <= 5
            WHEN :antiguedad_param = '5-10 años' THEN i.Antiguedad > 5 AND i.Antiguedad <= 10
            WHEN :antiguedad_param = 'Mas de 10 años' THEN i.Antiguedad > 10
            ELSE i.Antiguedad = CAST(:antiguedad_param AS SIGNED)
        END)
    )
    AND (:codigo_interno_param IS NULL OR i.Codigo_interno = :codigo_interno_param)
    -- Filtros del Grupo 5
    AND (:num_habitaciones_param IS NULL OR d.Habitaciones = :num_habitaciones_param)
    AND (:num_baños_param IS NULL OR d.Baños = :num_baños_param)
    AND (:tipo_cocina_param IS NULL OR d.Cocina = :tipo_cocina_param)
    AND (:tiene_balcon_param IS NULL OR d.Balcon = CASE WHEN :tiene_balcon_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:num_terrazas_param IS NULL OR d.Terraza >= :num_terrazas_param)
    AND (:num_garajes_division_param IS NULL OR d.Garaje >= :num_garajes_division_param)
    AND (:tiene_ascensores_param IS NULL OR d.Ascensores = CASE WHEN :tiene_ascensores_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:min_closets_param IS NULL OR d.Closets >= :min_closets_param)
    AND (:tiene_estudio_param IS NULL OR d.Estudio = :tiene_estudio_param)
    AND (:tiene_sala_param IS NULL OR d.Sala = :tiene_sala_param)
    AND (:tiene_comedor_param IS NULL OR d.Comedor = :tiene_comedor_param)
    AND (:tiene_zona_lavanderia_division_param IS NULL OR d.Zona_lavanderia = :tiene_zona_lavanderia_division_param)
    AND (:tiene_deposito_division_param IS NULL OR d.Deposito = :tiene_deposito_division_param)
    AND (:tiene_lavanderia_oc_param IS NULL OR oc.Lavanderia = :tiene_lavanderia_oc_param)
    AND (:tiene_gas_param IS NULL OR oc.Gas = :tiene_gas_param)
    AND (:numero_piso_param IS NULL OR oc.Piso = :numero_piso_param)
    AND (:mascotas_permitidas_param IS NULL OR oc.Mascotas_permitidas = :mascotas_permitidas_param)
    AND (:amoblado_param IS NULL OR oc.Amoblado = :amoblado_param)
    AND (:num_depositos_oc_param IS NULL OR oc.Deposito >= :num_depositos_oc_param)
    AND (:tiene_parqueadero_op_param IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero_param IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero_param)
    AND (:parqueadero_cubierto_param IS NULL OR op.Cubierto = :parqueadero_cubierto_param)
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param);
5. G2 (Ubicación Geográfica) + G3 (Características de la Edificación/Conjunto)
Descripción: Búsqueda por ubicación y características del edificio, como estrato o año de construcción. "Inmuebles en Chapinero, estrato 5, con más de 10 años de construcción."

SQL

SELECT
    i.Inmueble_id,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    (
        CASE
            WHEN :latitud_centro IS NOT NULL AND :longitud_centro IS NOT NULL AND loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL THEN
                6371 * acos(
                    cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
                    + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
                )
            ELSE NULL
        END
    ) AS distancia_km
FROM
    inmueble AS i
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
LEFT JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
LEFT JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 2
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (dir.Tipo_via = :tipo_via_param AND dir.Numero_via_principal = :numero_via_principal_param AND dir.Numero_calle_transversal = :numero_calle_transversal_param AND dir.Numero_edificacion = :numero_edificacion_param)
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
6. G2 (Ubicación Geográfica) + G4 ("Quién Publica")
Descripción: Para la administración o análisis, buscar propiedades publicadas por cierto tipo de anunciante o un anunciante específico en una ubicación determinada.

SQL

SELECT
    i.Inmueble_id,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad) AS UbicacionPrimaria,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante
FROM
    inmueble AS i
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
LEFT JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
LEFT JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 2
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (dir.Tipo_via = :tipo_via_param AND dir.Numero_via_principal = :numero_via_principal_param AND dir.Numero_calle_transversal = :numero_calle_transversal_param AND dir.Numero_edificacion = :numero_edificacion_param)
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    -- Filtros del Grupo 4
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
7. G2 (Ubicación Geográfica) + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda por ubicación y por las características internas del inmueble como número de habitaciones, baños, si tiene garaje, etc.

SQL

SELECT
    i.Inmueble_id,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad) AS UbicacionPrimaria,
    d.Habitaciones,
    d.Baños,
    d.Garaje AS Garaje_Division,
    oc.Mascotas_permitidas,
    op.Cantidad AS Cantidad_Parqueaderos,
    (
        CASE
            WHEN :latitud_centro IS NOT NULL AND :longitud_centro IS NOT NULL AND loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL THEN
                6371 * acos(
                    cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
                    + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
                )
            ELSE NULL
        END
    ) AS distancia_km
FROM
    inmueble AS i
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
LEFT JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
LEFT JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
LEFT JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
LEFT JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 2
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
    )
    -- Filtros del Grupo 5
    AND (:num_habitaciones_param IS NULL OR d.Habitaciones = :num_habitaciones_param)
    AND (:num_baños_param IS NULL OR d.Baños = :num_baños_param)
    AND (:tiene_balcon_param IS NULL OR d.Balcon = CASE WHEN :tiene_balcon_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:num_garajes_division_param IS NULL OR d.Garaje >= :num_garajes_division_param)
    AND (:mascotas_permitidas_param IS NULL OR oc.Mascotas_permitidas = :mascotas_permitidas_param)
    AND (:tiene_parqueadero_op_param IS NULL OR op.Cantidad > 0)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
8. G3 (Características de la Edificación/Conjunto) + G4 ("Quién Publica")
Descripción: Filtrar inmuebles por características del conjunto (estrato, año de construcción) y por el tipo de anunciante o un anunciante específico.

SQL

SELECT
    i.Inmueble_id,
    i.Codigo_interno,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)
    -- Filtros del Grupo 4
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param);
9. G3 (Características de la Edificación/Conjunto) + G5 (Características de la División / Espacios Internos)
Descripción: Combinación de filtros de la edificación (estrato, año, zonas comunes) con las características internas (habitaciones, baños, tipo de cocina).

SQL

SELECT
    i.Inmueble_id,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Zona_comun,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    d.Balcon,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
LEFT JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
LEFT JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)
    -- Filtros del Grupo 5
    AND (:num_habitaciones_param IS NULL OR d.Habitaciones = :num_habitaciones_param)
    AND (:num_baños_param IS NULL OR d.Baños = :num_baños_param)
    AND (:tipo_cocina_param IS NULL OR d.Cocina = :tipo_cocina_param)
    AND (:tiene_balcon_param IS NULL OR d.Balcon = CASE WHEN :tiene_balcon_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:num_terrazas_param IS NULL OR d.Terraza >= :num_terrazas_param)
    AND (:num_garajes_division_param IS NULL OR d.Garaje >= :num_garajes_division_param)
    AND (:tiene_ascensores_param IS NULL OR d.Ascensores = CASE WHEN :tiene_ascensores_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:min_closets_param IS NULL OR d.Closets >= :min_closets_param)
    AND (:tiene_estudio_param IS NULL OR d.Estudio = :tiene_estudio_param)
    AND (:tiene_sala_param IS NULL OR d.Sala = :tiene_sala_param)
    AND (:tiene_comedor_param IS NULL OR d.Comedor = :tiene_comedor_param)
    AND (:tiene_zona_lavanderia_division_param IS NULL OR d.Zona_lavanderia = :tiene_zona_lavanderia_division_param)
    AND (:tiene_deposito_division_param IS NULL OR d.Deposito = :tiene_deposito_division_param)
    AND (:tiene_lavanderia_oc_param IS NULL OR oc.Lavanderia = :tiene_lavanderia_oc_param)
    AND (:tiene_gas_param IS NULL OR oc.Gas = :tiene_gas_param)
    AND (:numero_piso_param IS NULL OR oc.Piso = :numero_piso_param)
    AND (:mascotas_permitidas_param IS NULL OR oc.Mascotas_permitidas = :mascotas_permitidas_param)
    AND (:amoblado_param IS NULL OR oc.Amoblado = :amoblado_param)
    AND (:num_depositos_oc_param IS NULL OR oc.Deposito >= :num_depositos_oc_param)
    AND (:tiene_parqueadero_op_param IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero_param IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero_param)
    AND (:parqueadero_cubierto_param IS NULL OR op.Cubierto = :parqueadero_cubierto_param)
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param);
10. G4 ("Quién Publica") + G5 (Características de la División / Espacios Internos)
Descripción: Filtrar inmuebles de un tipo de anunciante específico, o un anunciante particular, y que cumplan con ciertas características internas (ej. "todos los apartamentos de 3 habitaciones de la Constructora X").

SQL

SELECT
    i.Inmueble_id,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante
FROM
    inmueble AS i
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
LEFT JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
LEFT JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
WHERE
    i.Estado = 'disponible'
    -- Filtros del Grupo 4
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)
    -- Filtros del Grupo 5
    AND (:num_habitaciones_param IS NULL OR d.Habitaciones = :num_habitaciones_param)
    AND (:num_baños_param IS NULL OR d.Baños = :num_baños_param)
    AND (:tipo_cocina_param IS NULL OR d.Cocina = :tipo_cocina_param)
    AND (:tiene_balcon_param IS NULL OR d.Balcon = CASE WHEN :tiene_balcon_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:num_terrazas_param IS NULL OR d.Terraza >= :num_terrazas_param)
    AND (:num_garajes_division_param IS NULL OR d.Garaje >= :num_garajes_division_param)
    AND (:tiene_ascensores_param IS NULL OR d.Ascensores = CASE WHEN :tiene_ascensores_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:min_closets_param IS NULL OR d.Closets >= :min_closets_param)
    AND (:tiene_estudio_param IS NULL OR d.Estudio = :tiene_estudio_param)
    AND (:tiene_sala_param IS NULL OR d.Sala = :tiene_sala_param)
    AND (:tiene_comedor_param IS NULL OR d.Comedor = :tiene_comedor_param)
    AND (:tiene_zona_lavanderia_division_param IS NULL OR d.Zona_lavanderia = :tiene_zona_lavanderia_division_param)
    AND (:tiene_deposito_division_param IS NULL OR d.Deposito = :tiene_deposito_division_param)
    AND (:tiene_lavanderia_oc_param IS NULL OR oc.Lavanderia = :tiene_lavanderia_oc_param)
    AND (:tiene_gas_param IS NULL OR oc.Gas = :tiene_gas_param)
    AND (:numero_piso_param IS NULL OR oc.Piso = :numero_piso_param)
    AND (:mascotas_permitidas_param IS NULL OR oc.Mascotas_permitidas = :mascotas_permitidas_param)
    AND (:amoblado_param IS NULL OR oc.Amoblado = :amoblado_param)
    AND (:num_depositos_oc_param IS NULL OR oc.Deposito >= :num_depositos_oc_param)
    AND (:tiene_parqueadero_op_param IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero_param IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero_param)
    AND (:parqueadero_cubierto_param IS NULL OR op.Cubierto = :parqueadero_cubierto_param)
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param);