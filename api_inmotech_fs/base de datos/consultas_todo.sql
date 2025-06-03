SELECT
    i.Inmueble_id,
    i.Valor,
    i.Area,
    i.Descripcion_General,
    i.Antiguedad,
    i.Motivo_VoA,
    i.Situacion_inmueble,
    i.Codigo_interno,
    i.Estado,
    i.Fecha_publicacion,
    i.Visitas,
    i.Observaciones,
    -- Datos de Tipo de Edificación
    te.Tipo_edificacion_categoria AS CategoriaEdificacion,
    te.Tipo_edificacion_descripcion,

    -- Datos de Acerca de Edificación
    ae.Estrato,
    ae.Tipo_construccion,
    ae.Anio_construccion,
    ae.Estado_conservacion,
    ae.Zona_comun,

    -- Datos de División
    d.Habitaciones,
    d.Baños,
    d.Cocina,
    d.Balcon,
    d.Terraza,
    d.Garaje AS Garaje_Division,
    d.Ascensores,
    d.Closets,
    d.Estudio,
    d.Sala,
    d.Comedor,
    d.Zona_lavanderia AS ZonaLavanderia_Division,
    d.Deposito AS Deposito_Division,

    -- Datos de Otras Características
    oc.Lavanderia AS Lavanderia_OtrasCaracteristicas,
    oc.Gas,
    oc.Piso,
    oc.Mascotas_permitidas,
    oc.Amoblado,
    oc.Deposito AS Deposito_OtrasCaracteristicas,

    -- Datos de Organización de Parqueadero
    op.Tipo_parqueadero,
    op.Cantidad AS Cantidad_Parqueaderos,
    op.Cubierto AS Parqueadero_Cubierto,
    op.Disponible AS Parqueadero_Disponible,

    -- Datos del Publicador (Platform User & Profile)
    pu.Username AS NombreUsuarioAnunciante,
    pp.Profile_type AS TipoAnunciante, -- Asumiendo que Profile_type ya existe en platform_profile

    -- Datos de Dirección y Ubicación
    dir.Direccion AS DireccionCompleta,
    dir.Tipo_via,
    dir.Numero_via_principal,
    dir.Numero_calle_transversal,
    dir.Numero_edificacion,
    dc.Cardinalidad AS DesignadorCardinal,
    loc.Latitud,
    loc.Longitud,
    COALESCE(b.Nombre_barrio, c.Ciudad, corr.Corregimiento, v.Vereda_nombre) AS NombreUbicacionEspecifica,
    m.Municipio_nombre AS NombreMunicipio,
    n.Ndap_descripcion AS NombreDepartamento,

    -- Cálculo de distancia para el filtro por radio (solo si latitud_centro y longitud_centro están presentes)
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
-- Uniones para Tipo de Inmueble y Características Generales
JOIN
    tipo_edificacion AS te ON i.Tipo_edificacion_FK = te.Tipo_edificacion_id
-- Uniones para Características de la Edificación/Conjunto
JOIN
    acerca_edificacion AS ae ON i.Acerca_edificacion_FK = ae.Acerca_edificacion_id
-- Uniones para Detalles Específicos de Inmueble (División, Otras Características, Parqueadero)
JOIN
    division AS d ON i.Division_FK = d.Division_id
JOIN
    otras_caracteristicas AS oc ON i.Otras_caracteristicas_FK = oc.Otras_caracteristicas_id
JOIN
    asignacion AS a ON oc.Asignacion_FK = a.Asignacion_id
JOIN
    organizacion_parqueadero AS op ON a.Organizacion_parqueadero_FK = op.Organizacion_parqueadero_id
-- Uniones para "Quién Publica"
JOIN
    platform_user AS pu ON i.Platform_user_FK = pu.Platform_user_id
LEFT JOIN -- LEFT JOIN para platform_profile porque no todos los usuarios pueden tener un perfil completo
    platform_profile AS pp ON pu.Platform_user_id = pp.Platform_user_FK
-- Uniones para Ubicación Geográfica
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
LEFT JOIN -- Se usa LEFT JOIN para municipio para no perder inmuebles si la jerarquía es inconsistente en bccv
    municipio AS m ON c.Municipio_FK = m.Municipio_id
                    OR corr.Municipio_FK = m.Municipio_id
                    OR v.Municipio_FK = m.Municipio_id
LEFT JOIN -- LEFT JOIN para ndap por la misma razón que municipio (puede que no todo inmueble tenga una cadena de ubicación completa)
    ndap AS n ON m.Ndap_FK = n.Ndap_id

WHERE
    -- ##########################################################################
    -- CRITERIOS DE FILTRO OPCIONALES (Gestionados por tu Backend)
    -- Cada condición se evalúa solo si el parámetro correspondiente NO es NULL
    -- ##########################################################################

    -- Filtro base: inmuebles 'disponibles' por defecto, a menos que el usuario especifique otro estado
    (:estado_inmueble_param IS NULL OR i.Estado = :estado_inmueble_param)

    -- GRUPO 1: Filtros por Tipo de Inmueble y Características Generales
    AND (:tipo_edificacion_categoria_param IS NULL OR te.Tipo_edificacion_categoria = :tipo_edificacion_categoria_param)
    AND (:motivo_transaccion_param IS NULL OR i.Motivo_VoA = :motivo_transaccion_param)
    AND (:precio_min_param IS NULL OR i.Valor >= :precio_min_param)
    AND (:precio_max_param IS NULL OR i.Valor <= :precio_max_param)
    AND (:area_min_param IS NULL OR i.Area >= :area_min_param)
    AND (:area_max_param IS NULL OR i.Area <= :area_max_param)
    AND ( -- Antigüedad con lógica de rangos o valor exacto
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

    -- GRUPO 2: Filtros de Ubicación Geográfica
    AND (:ndap_id_param IS NULL OR n.Ndap_id = :ndap_id_param)
    AND (:municipio_id_param IS NULL OR m.Municipio_id = :municipio_id_param)
    AND ( -- Ubicación específica (Ciudad, Corregimiento, Vereda, Barrio)
        :ubicacion_especifica_id_param IS NULL
        OR (bccv.Ciudad_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'ciudad')
        OR (bccv.Corregimiento_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'corregimiento')
        OR (bccv.Vereda_Fk = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'vereda')
        OR (bccv.Barrio_FK = :ubicacion_especifica_id_param AND :tipo_ubicacion_param = 'barrio')
    )
    AND ( -- Tipo de Vía y Número Específico (requiere todos los componentes si se usa)
        :tipo_via_param IS NULL OR
        (
            dir.Tipo_via = :tipo_via_param
            AND dir.Numero_via_principal = :numero_via_principal_param
            AND dir.Numero_calle_transversal = :numero_calle_transversal_param
            AND dir.Numero_edificacion = :numero_edificacion_param
        )
    )
    AND (:designador_cardinal_id_param IS NULL OR dc.Designador_cardinal_id = :designador_cardinal_id_param)
    AND (:radio_km IS NULL OR (loc.Latitud IS NOT NULL AND loc.Longitud IS NOT NULL)) -- Asegura que Latitud/Longitud existan para filtro de radio

    -- GRUPO 3: Filtros por Características de la Edificación/Conjunto
    AND (:estrato_param IS NULL OR ae.Estrato = :estrato_param)
    AND (:tipo_construccion_param IS NULL OR ae.Tipo_construccion = :tipo_construccion_param)
    AND (:anio_construccion_min_param IS NULL OR ae.Anio_construccion >= :anio_construccion_min_param)
    AND (:anio_construccion_max_param IS NULL OR ae.Anio_construccion <= :anio_construccion_max_param)
    AND (:estado_conservacion_param IS NULL OR ae.Estado_conservacion = :estado_conservacion_param)
    AND (:zona_comun_param IS NULL OR ae.Zona_comun = :zona_comun_param)

    -- GRUPO 4: Filtros por "Quién publica"
    AND (:platform_user_id_param IS NULL OR pu.Platform_user_id = :platform_user_id_param)
    AND (:tipo_anunciante_param IS NULL OR pp.Profile_type = :tipo_anunciante_param) -- Requiere Profile_type en platform_profile

    -- GRUPO 5: Filtros por Características de la División / Espacios Internos (Detalles Específicos)
    AND (:num_habitaciones_param IS NULL OR d.Habitaciones = :num_habitaciones_param) -- o rango min/max
    AND (:num_baños_param IS NULL OR d.Baños = :num_baños_param) -- o rango min/max
    AND (:tipo_cocina_param IS NULL OR d.Cocina = :tipo_cocina_param)
    AND (:tiene_balcon_param IS NULL OR d.Balcon = CASE WHEN :tiene_balcon_param = 1 THEN 'Sí' ELSE 'No' END) -- 1 para 'Sí', 0 para 'No'
    AND (:num_terrazas_param IS NULL OR d.Terraza >= :num_terrazas_param) -- >= para "al menos X"
    AND (:num_garajes_division_param IS NULL OR d.Garaje >= :num_garajes_division_param) -- >= para "al menos X"
    AND (:tiene_ascensores_param IS NULL OR d.Ascensores = CASE WHEN :tiene_ascensores_param = 1 THEN 'Sí' ELSE 'No' END)
    AND (:min_closets_param IS NULL OR d.Closets >= :min_closets_param)
    AND (:tiene_estudio_param IS NULL OR d.Estudio = :tiene_estudio_param) -- 1 para sí
    AND (:tiene_sala_param IS NULL OR d.Sala = :tiene_sala_param) -- 1 para sí
    AND (:tiene_comedor_param IS NULL OR d.Comedor = :tiene_comedor_param) -- 1 para sí
    AND (:tiene_zona_lavanderia_division_param IS NULL OR d.Zona_lavanderia = :tiene_zona_lavanderia_division_param)
    AND (:tiene_deposito_division_param IS NULL OR d.Deposito = :tiene_deposito_division_param)
    AND (:tiene_lavanderia_oc_param IS NULL OR oc.Lavanderia = :tiene_lavanderia_oc_param)
    AND (:tiene_gas_param IS NULL OR oc.Gas = :tiene_gas_param)
    AND (:numero_piso_param IS NULL OR oc.Piso = :numero_piso_param) -- o rango min/max
    AND (:mascotas_permitidas_param IS NULL OR oc.Mascotas_permitidas = :mascotas_permitidas_param)
    AND (:amoblado_param IS NULL OR oc.Amoblado = :amoblado_param)
    AND (:num_depositos_oc_param IS NULL OR oc.Deposito >= :num_depositos_oc_param)
    AND (:tiene_parqueadero_op_param IS NULL OR op.Cantidad > 0) -- Si solo se busca "tiene parqueadero"
    AND (:tipo_parqueadero_param IS NULL OR op.Tipo_parqueadero = :tipo_parqueadero_param)
    AND (:parqueadero_cubierto_param IS NULL OR op.Cubierto = :parqueadero_cubierto_param)
    AND (:parqueadero_disponible_param IS NULL OR op.Disponible = :parqueadero_disponible_param)

HAVING
    -- Filtro por Radio/Proximidad (se aplica si distancia_km fue calculada y :radio_km no es NULL)
    (:radio_km IS NULL OR distancia_km <= :radio_km)
ORDER BY
    -- Ordena por distancia si se usa el filtro de radio, de lo contrario por fecha de publicación
    CASE WHEN :radio_km IS NOT NULL THEN distancia_km END ASC,
    i.Fecha_publicacion DESC;

-- ##########################################################################
