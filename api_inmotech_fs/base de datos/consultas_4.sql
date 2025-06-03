Claro, entiendo. Quieres que combine las consultas unificadas de 4 de los 5 archivos proporcionados, creando 5 combinaciones posibles. Esto significa que en cada combinación se excluirá uno de los archivos originales.

Aquí están las 5 combinaciones de consultas SQL unificadas, excluyendo un archivo en cada caso:

Combinación 1: Sin "Quién Publica"
Esta consulta combina los filtros unificados de Detalles Específicos del Inmueble, Características de la Edificación/Conjunto, Tipo de Inmueble y Características Generales, y Ubicación.

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
    -- Columnas de Detalles Específicos
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
    op.Disponible AS Parqueadero_Disponible,
    -- Columnas de Características de la Edificación/Conjunto
    ae.AcercaDeLaEdificacion,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    -- Columnas de Tipo de Inmueble y Características Generales
    te.Tipo_edificacion_categoria AS CategoriaEdificacion,
    -- Información de la Dirección y Ubicación
    dir.Direccion AS DireccionCompleta,
    dir.Tipo_via,
    dir.Numero_via_principal,
    dir.Numero_calle_transversal,
    dir.Numero_edificacion,
    dir.Descripcion_adicional AS DireccionAdicional,
    dc.Cardinalidad AS DesignadorCardinal_Abreviacion,
    loc.Latitud,
    loc.Longitud,
    loc.Localizacion_descripcion AS DescripcionLocalizacion,
    COALESCE(b.Nombre_barrio, ciu.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    mun.Municipio_nombre AS NombreMunicipio,
    nda.Ndap_descripcion AS NombreDepartamento,
    -- Cálculo de distancia para el filtro por radio
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
-- JOINS para Detalles Específicos del Inmueble
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
-- JOINS para Características de la Edificación/Conjunto
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
-- JOINS para Tipo de Inmueble y Características Generales
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
-- JOINS para Ubicación
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS ciu ON bccv.Ciudad_FK = ciu.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS mun ON ciu.Municipio_FK = mun.Municipio_id
                    OR corr.Municipio_FK = mun.Municipio_id
                    OR v.Municipio_FK = mun.Municipio_id
JOIN
    ndap AS nda ON mun.Ndap_FK = nda.Ndap_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
WHERE
    i.Estado = 'disponible'
    -- ##########################################################################
    -- Criterios de Filtro Opcionales de los 4 archivos
    -- ##########################################################################

    -- Filtros de Detalles Específicos del Inmueble
    AND (:num_habitaciones IS NULL OR d.Habitaciones = :num_habitaciones)
    AND (:num_baños IS NULL OR d.Baños = :num_baños)
    AND (:tipo_cocina IS NULL OR d.Cocina = :tipo_cocina)
    AND (:balcon_si IS NULL OR d.Balcon = 'Sí')
    AND (:terraza_mayor_cero IS NULL OR d.Terraza > 0)
    AND (:garaje_mayor_cero IS NULL OR d.Garaje > 0)
    AND (:ascensores_si IS NULL OR d.Ascensores = 'Sí')
    AND (:min_closets IS NULL OR d.Closets >= :min_closets)
    AND (:estudio_si IS NULL OR d.Estudio = 1)
    AND (:sala_si IS NULL OR d.Sala = 1)
    AND (:comedor_si IS NULL OR d.Comedor = 1)
    AND (:zona_lavanderia_division_si IS NULL OR d.Zona_lavanderia = 1)
    AND (:deposito_division_si IS NULL OR d.Deposito = 1)
    AND (:lavanderia_oc_si IS NULL OR oc.Lavanderia = 1)
    AND (:gas_oc_si IS NULL OR oc.Gas = 1)
    AND (:numero_piso IS NULL OR oc.Piso = :numero_piso)
    AND (:mascotas_permitidas_si IS NULL OR oc.Mascotas_permitidas = 1)
    AND (:amoblado_si IS NULL OR oc.Amoblado = 1)
    AND (:deposito_oc_mayor_cero IS NULL OR oc.Deposito > 0)
    AND (:cantidad_parqueaderos_mayor_cero IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero)
    AND (:parqueadero_cubierto_si IS NULL OR op.Cubierto = 1)
    AND (:parqueadero_disponible_si IS NULL OR op.Disponible = 1)

    -- Filtros de Características de la Edificación/Conjunto
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)

    -- Filtros de Tipo de Inmueble y Características Generales
    AND (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)
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

    -- Filtros de Ubicación
    AND (:ndap_id_param IS NULL OR nda.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR mun.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (
            dir.Tipo_via = :tipo_via_param
            AND dir.Numero_via_principal = :numero_via_principal_param
            AND dir.Numero_calle_transversal = :numero_calle_transversal_param
            AND dir.Numero_edificacion = :numero_edificacion_param
        )
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL))
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC;
Combinación 2: Sin "Detalles Específicos del Inmueble"
Esta consulta combina los filtros unificados de Características de la Edificación/Conjunto, Quién Publica, Tipo de Inmueble y Características Generales, y Ubicación.

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
    -- Columnas de Características de la Edificación/Conjunto
    ae.AcercaDeLaEdificacion,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    -- Columnas de Quién Publica
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    -- Columnas de Tipo de Inmueble y Características Generales
    te.Tipo_edificacion_categoria AS CategoriaEdificacion,
    -- Información de la Dirección y Ubicación
    dir.Direccion AS DireccionCompleta,
    dir.Tipo_via,
    dir.Numero_via_principal,
    dir.Numero_calle_transversal,
    dir.Numero_edificacion,
    dir.Descripcion_adicional AS DireccionAdicional,
    dc.Cardinalidad AS DesignadorCardinal_Abreviacion,
    loc.Latitud,
    loc.Longitud,
    loc.Localizacion_descripcion AS DescripcionLocalizacion,
    COALESCE(b.Nombre_barrio, ciu.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    mun.Municipio_nombre AS NombreMunicipio,
    nda.Ndap_descripcion AS NombreDepartamento,
    -- Cálculo de distancia para el filtro por radio
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
-- JOINS para Características de la Edificación/Conjunto
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
-- JOINS para Quién Publica
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
-- JOINS para Tipo de Inmueble y Características Generales
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
-- JOINS para Ubicación
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS ciu ON bccv.Ciudad_FK = ciu.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS mun ON ciu.Municipio_FK = mun.Municipio_id
                    OR corr.Municipio_FK = mun.Municipio_id
                    OR v.Municipio_FK = mun.Municipio_id
JOIN
    ndap AS nda ON mun.Ndap_FK = nda.Ndap_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
WHERE
    i.Estado = 'disponible'
    -- ##########################################################################
    -- Criterios de Filtro Opcionales de los 4 archivos
    -- ##########################################################################

    -- Filtros de Características de la Edificación/Conjunto
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)

    -- Filtros de Quién Publica
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)

    -- Filtros de Tipo de Inmueble y Características Generales
    AND (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)
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

    -- Filtros de Ubicación
    AND (:ndap_id_param IS NULL OR nda.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR mun.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (
            dir.Tipo_via = :tipo_via_param
            AND dir.Numero_via_principal = :numero_via_principal_param
            AND dir.Numero_calle_transversal = :numero_calle_transversal_param
            AND dir.Numero_edificacion = :numero_edificacion_param
        )
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL))
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC;
Combinación 3: Sin "Características de la Edificación/Conjunto"
Esta consulta combina los filtros unificados de Detalles Específicos del Inmueble, Quién Publica, Tipo de Inmueble y Características Generales, y Ubicación.

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
    -- Columnas de Detalles Específicos
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
    op.Disponible AS Parqueadero_Disponible,
    -- Columnas de Quién Publica
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    -- Columnas de Tipo de Inmueble y Características Generales
    te.Tipo_edificacion_categoria AS CategoriaEdificacion,
    -- Información de la Dirección y Ubicación
    dir.Direccion AS DireccionCompleta,
    dir.Tipo_via,
    dir.Numero_via_principal,
    dir.Numero_calle_transversal,
    dir.Numero_edificacion,
    dir.Descripcion_adicional AS DireccionAdicional,
    dc.Cardinalidad AS DesignadorCardinal_Abreviacion,
    loc.Latitud,
    loc.Longitud,
    loc.Localizacion_descripcion AS DescripcionLocalizacion,
    COALESCE(b.Nombre_barrio, ciu.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    mun.Municipio_nombre AS NombreMunicipio,
    nda.Ndap_descripcion AS NombreDepartamento,
    -- Cálculo de distancia para el filtro por radio
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
-- JOINS para Detalles Específicos del Inmueble
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
-- JOINS para Quién Publica
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
-- JOINS para Tipo de Inmueble y Características Generales
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
-- JOINS para Ubicación
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS ciu ON bccv.Ciudad_FK = ciu.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS mun ON ciu.Municipio_FK = mun.Municipio_id
                    OR corr.Municipio_FK = mun.Municipio_id
                    OR v.Municipio_FK = mun.Municipio_id
JOIN
    ndap AS nda ON mun.Ndap_FK = nda.Ndap_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
WHERE
    i.Estado = 'disponible'
    -- ##########################################################################
    -- Criterios de Filtro Opcionales de los 4 archivos
    -- ##########################################################################

    -- Filtros de Detalles Específicos del Inmueble
    AND (:num_habitaciones IS NULL OR d.Habitaciones = :num_habitaciones)
    AND (:num_baños IS NULL OR d.Baños = :num_baños)
    AND (:tipo_cocina IS NULL OR d.Cocina = :tipo_cocina)
    AND (:balcon_si IS NULL OR d.Balcon = 'Sí')
    AND (:terraza_mayor_cero IS NULL OR d.Terraza > 0)
    AND (:garaje_mayor_cero IS NULL OR d.Garaje > 0)
    AND (:ascensores_si IS NULL OR d.Ascensores = 'Sí')
    AND (:min_closets IS NULL OR d.Closets >= :min_closets)
    AND (:estudio_si IS NULL OR d.Estudio = 1)
    AND (:sala_si IS NULL OR d.Sala = 1)
    AND (:comedor_si IS NULL OR d.Comedor = 1)
    AND (:zona_lavanderia_division_si IS NULL OR d.Zona_lavanderia = 1)
    AND (:deposito_division_si IS NULL OR d.Deposito = 1)
    AND (:lavanderia_oc_si IS NULL OR oc.Lavanderia = 1)
    AND (:gas_oc_si IS NULL OR oc.Gas = 1)
    AND (:numero_piso IS NULL OR oc.Piso = :numero_piso)
    AND (:mascotas_permitidas_si IS NULL OR oc.Mascotas_permitidas = 1)
    AND (:amoblado_si IS NULL OR oc.Amoblado = 1)
    AND (:deposito_oc_mayor_cero IS NULL OR oc.Deposito > 0)
    AND (:cantidad_parqueaderos_mayor_cero IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero)
    AND (:parqueadero_cubierto_si IS NULL OR op.Cubierto = 1)
    AND (:parqueadero_disponible_si IS NULL OR op.Disponible = 1)

    -- Filtros de Quién Publica
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)

    -- Filtros de Tipo de Inmueble y Características Generales
    AND (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)
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

    -- Filtros de Ubicación
    AND (:ndap_id_param IS NULL OR nda.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR mun.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (
            dir.Tipo_via = :tipo_via_param
            AND dir.Numero_via_principal = :numero_via_principal_param
            AND dir.Numero_calle_transversal = :numero_calle_transversal_param
            AND dir.Numero_edificacion = :numero_edificacion_param
        )
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL))
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC;
Combinación 4: Sin "Tipo de Inmueble y Características Generales"
Esta consulta combina los filtros unificados de Detalles Específicos del Inmueble, Características de la Edificación/Conjunto, Quién Publica, y Ubicación.

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
    -- Columnas de Detalles Específicos
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
    op.Disponible AS Parqueadero_Disponible,
    -- Columnas de Características de la Edificación/Conjunto
    ae.AcercaDeLaEdificacion,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    -- Columnas de Quién Publica
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    -- Información de la Dirección y Ubicación
    dir.Direccion AS DireccionCompleta,
    dir.Tipo_via,
    dir.Numero_via_principal,
    dir.Numero_calle_transversal,
    dir.Numero_edificacion,
    dir.Descripcion_adicional AS DireccionAdicional,
    dc.Cardinalidad AS DesignadorCardinal_Abreviacion,
    loc.Latitud,
    loc.Longitud,
    loc.Localizacion_descripcion AS DescripcionLocalizacion,
    COALESCE(b.Nombre_barrio, ciu.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    mun.Municipio_nombre AS NombreMunicipio,
    nda.Ndap_descripcion AS NombreDepartamento,
    -- Cálculo de distancia para el filtro por radio
    (
        6371 * acos(
            cos(radians(:latitud_centro)) * cos(radians(loc.Latitud)) * cos(radians(loc.Longitud) - radians(:longitud_centro))
            + sin(radians(:latitud_centro)) * sin(radians(loc.Latitud))
        )
    ) AS distancia_km
FROM
    inmueble AS i
-- JOINS para Detalles Específicos del Inmueble
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
-- JOINS para Características de la Edificación/Conjunto
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
-- JOINS para Quién Publica
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
-- JOINS para Ubicación
JOIN
    direccion AS dir ON i.Direccion_FK = dir.Direccion_id
JOIN
    barrio_ciudad_corregimiento_vereda AS bccv ON dir.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio AS b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad AS ciu ON bccv.Ciudad_FK = ciu.Ciudad_id
LEFT JOIN
    corregimiento AS corr ON bccv.Corregimiento_FK = corr.Corregimiento_id
LEFT JOIN
    vereda AS v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio AS mun ON ciu.Municipio_FK = mun.Municipio_id
                    OR corr.Municipio_FK = mun.Municipio_id
                    OR v.Municipio_FK = mun.Municipio_id
JOIN
    ndap AS nda ON mun.Ndap_FK = nda.Ndap_id
LEFT JOIN
    designador_cardinal AS dc ON dir.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion AS loc ON dir.Localizacion_FK = loc.Localizacion_id
WHERE
    i.Estado = 'disponible'
    -- ##########################################################################
    -- Criterios de Filtro Opcionales de los 4 archivos
    -- ##########################################################################

    -- Filtros de Detalles Específicos del Inmueble
    AND (:num_habitaciones IS NULL OR d.Habitaciones = :num_habitaciones)
    AND (:num_baños IS NULL OR d.Baños = :num_baños)
    AND (:tipo_cocina IS NULL OR d.Cocina = :tipo_cocina)
    AND (:balcon_si IS NULL OR d.Balcon = 'Sí')
    AND (:terraza_mayor_cero IS NULL OR d.Terraza > 0)
    AND (:garaje_mayor_cero IS NULL OR d.Garaje > 0)
    AND (:ascensores_si IS NULL OR d.Ascensores = 'Sí')
    AND (:min_closets IS NULL OR d.Closets >= :min_closets)
    AND (:estudio_si IS NULL OR d.Estudio = 1)
    AND (:sala_si IS NULL OR d.Sala = 1)
    AND (:comedor_si IS NULL OR d.Comedor = 1)
    AND (:zona_lavanderia_division_si IS NULL OR d.Zona_lavanderia = 1)
    AND (:deposito_division_si IS NULL OR d.Deposito = 1)
    AND (:lavanderia_oc_si IS NULL OR oc.Lavanderia = 1)
    AND (:gas_oc_si IS NULL OR oc.Gas = 1)
    AND (:numero_piso IS NULL OR oc.Piso = :numero_piso)
    AND (:mascotas_permitidas_si IS NULL OR oc.Mascotas_permitidas = 1)
    AND (:amoblado_si IS NULL OR oc.Amoblado = 1)
    AND (:deposito_oc_mayor_cero IS NULL OR oc.Deposito > 0)
    AND (:cantidad_parqueaderos_mayor_cero IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero)
    AND (:parqueadero_cubierto_si IS NULL OR op.Cubierto = 1)
    AND (:parqueadero_disponible_si IS NULL OR op.Disponible = 1)

    -- Filtros de Características de la Edificación/Conjunto
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)

    -- Filtros de Quién Publica
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)

    -- Filtros de Ubicación
    AND (:ndap_id_param IS NULL OR nda.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR mun.Municipio_id = :municipio_id_param)
    AND (
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND (
        :tipo_via_param IS NULL OR
        (
            dir.Tipo_via = :tipo_via_param
            AND dir.Numero_via_principal = :numero_via_principal_param
            AND dir.Numero_calle_transversal = :numero_calle_transversal_param
            AND dir.Numero_edificacion = :numero_edificacion_param
        )
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL))
HAVING
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC;
Combinación 5: Sin "Ubicación"
Esta consulta combina los filtros unificados de Detalles Específicos del Inmueble, Características de la Edificación/Conjunto, Quién Publica, y Tipo de Inmueble y Características Generales.

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
    -- Columnas de Detalles Específicos
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
    op.Disponible AS Parqueadero_Disponible,
    -- Columnas de Características de la Edificación/Conjunto
    ae.AcercaDeLaEdificacion,
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,
    -- Columnas de Quién Publica
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante,
    -- Columnas de Tipo de Inmueble y Características Generales
    te.Tipo_edificacion_categoria AS CategoriaEdificacion
FROM
    inmueble AS i
-- JOINS para Detalles Específicos del Inmueble
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
-- JOINS para Características de la Edificación/Conjunto
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
-- JOINS para Quién Publica
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
-- JOINS para Tipo de Inmueble y Características Generales
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
WHERE
    i.Estado = 'disponible'
    -- ##########################################################################
    -- Criterios de Filtro Opcionales de los 4 archivos
    -- ##########################################################################

    -- Filtros de Detalles Específicos del Inmueble
    AND (:num_habitaciones IS NULL OR d.Habitaciones = :num_habitaciones)
    AND (:num_baños IS NULL OR d.Baños = :num_baños)
    AND (:tipo_cocina IS NULL OR d.Cocina = :tipo_cocina)
    AND (:balcon_si IS NULL OR d.Balcon = 'Sí')
    AND (:terraza_mayor_cero IS NULL OR d.Terraza > 0)
    AND (:garaje_mayor_cero IS NULL OR d.Garaje > 0)
    AND (:ascensores_si IS NULL OR d.Ascensores = 'Sí')
    AND (:min_closets IS NULL OR d.Closets >= :min_closets)
    AND (:estudio_si IS NULL OR d.Estudio = 1)
    AND (:sala_si IS NULL OR d.Sala = 1)
    AND (:comedor_si IS NULL OR d.Comedor = 1)
    AND (:zona_lavanderia_division_si IS NULL OR d.Zona_lavanderia = 1)
    AND (:deposito_division_si IS NULL OR d.Deposito = 1)
    AND (:lavanderia_oc_si IS NULL OR oc.Lavanderia = 1)
    AND (:gas_oc_si IS NULL OR oc.Gas = 1)
    AND (:numero_piso IS NULL OR oc.Piso = :numero_piso)
    AND (:mascotas_permitidas_si IS NULL OR oc.Mascotas_permitidas = 1)
    AND (:amoblado_si IS NULL OR oc.Amoblado = 1)
    AND (:deposito_oc_mayor_cero IS NULL OR oc.Deposito > 0)
    AND (:cantidad_parqueaderos_mayor_cero IS NULL OR op.Cantidad > 0)
    AND (:tipo_parqueadero IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero)
    AND (:parqueadero_cubierto_si IS NULL OR op.Cubierto = 1)
    AND (:parqueadero_disponible_si IS NULL OR op.Disponible = 1)

    -- Filtros de Características de la Edificación/Conjunto
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)

    -- Filtros de Quién Publica
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param)

    -- Filtros de Tipo de Inmueble y Características Generales
    AND (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)
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
ORDER BY
    i.Fecha_publicacion DESC;