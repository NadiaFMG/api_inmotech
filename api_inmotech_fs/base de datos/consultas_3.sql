Combinaciones de 3 Grupos (10 en Total)
1. G1 (Tipo de Inmueble y Características Generales) + G2 (Ubicación Geográfica) + G3 (Características de la Edificación/Conjunto)
Descripción: Esta es una de las combinaciones más robustas y útiles para búsquedas de usuario final. Permite encontrar inmuebles por sus características básicas, ubicación y detalles de la edificación (ej. "apartamentos en venta, en el Poblado, estrato 5, con 3 habitaciones").

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
    ae.Zona_comun,
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
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
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
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
2. G1 (Tipo de Inmueble y Características Generales) + G2 (Ubicación Geográfica) + G4 ("Quién Publica")
Descripción: Búsqueda combinada por características básicas del inmueble, su ubicación y quién lo publica. Útil para agentes que buscan propiedades de un colega en una zona específica o para administradores.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
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
3. G1 (Tipo de Inmueble y Características Generales) + G2 (Ubicación Geográfica) + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda que combina las características básicas del inmueble y su ubicación con los detalles internos (habitaciones, baños, etc.). Esta es también muy común para usuarios finales.

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
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero,
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
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
LEFT JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
LEFT JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
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
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
4. G1 (Tipo de Inmueble y Características Generales) + G3 (Características de la Edificación/Conjunto) + G4 ("Quién Publica")
Descripción: Filtrar inmuebles por características básicas, del edificio y por el anunciante. Útil para análisis de mercado o filtros avanzados de administración.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    ae.Estrato,
    ae.Anio_construccion,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
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
5. G1 (Tipo de Inmueble y Características Generales) + G3 (Características de la Edificación/Conjunto) + G5 (Características de la División / Espacios Internos)
Descripción: Un filtro muy detallado para usuarios finales que buscan un tipo específico de inmueble, con ciertas características del edificio y también con requisitos de espacios internos (ej. "casas en venta, con 4 habitaciones, 3 baños, en conjunto cerrado, estrato 6").

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Zona_comun,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
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
6. G1 (Tipo de Inmueble y Características Generales) + G4 ("Quién Publica") + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda por características básicas del inmueble, quién lo publica y detalles internos.

SQL

SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Motivo_VoA,
    te.Tipo_edificacion_categoria,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero
FROM
    inmueble AS i
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
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
7. G2 (Ubicación Geográfica) + G3 (Características de la Edificación/Conjunto) + G4 ("Quién Publica")
Descripción: Búsqueda por ubicación, características del edificio y el publicador. Útil para análisis de mercado o filtros de administración.

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
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
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
    -- Filtros del Grupo 3
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)
    -- Filtros del Grupo 4
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
8. G2 (Ubicación Geográfica) + G3 (Características de la Edificación/Conjunto) + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda que combina la ubicación y las características del edificio con los detalles internos del inmueble.

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
    ae.Zona_comun,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero,
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
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
9. G2 (Ubicación Geográfica) + G4 ("Quién Publica") + G5 (Características de la División / Espacios Internos)
Descripción: Búsqueda por ubicación, quién publica y detalles internos.

SQL

SELECT
    i.Inmueble_id,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero,
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
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
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
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param)
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km);
10. G3 (Características de la Edificación/Conjunto) + G4 ("Quién Publica") + G5 (Características de la División / Espacios Internos)
Descripción: Esta es la combinación para consultas muy específicas, a menudo utilizadas por profesionales del sector o administradores, que combinan detalles del edificio, del anunciante y del interior del inmueble.

SQL

SELECT
    i.Inmueble_id,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Zona_comun,
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    oc.Mascotas_permitidas,
    op.Tipo_parqueadero
FROM
    inmueble AS i
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
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
¡Aquí tienes todas las 10 combinaciones posibles de 3 grupos!

Con esto, ya tienes un conjunto muy completo de consultas que cubren una amplia gama de escenarios de búsqueda. El siguiente paso serían las combinaciones de 4 grupos y, finalmente, la combinación de los 5 grupos (la consulta maestra).






