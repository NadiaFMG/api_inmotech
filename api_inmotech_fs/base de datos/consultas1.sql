--! Consulta para obtener información detallada de direcciones
SELECT
    d.Direccion_id,
    d.Direccion,
    d.Tipo_via,
    d.Numero_via_principal,
    d.Modificador_via,
    d.Numero_calle_transversal,
    d.Numero_edificacion,
    d.Descripcion_adicional,
    
    -- Información del Designador Cardinal
    dc.Cardinalidad AS Designador_Cardinal_Completo,
    dc.Abreviacion AS Designador_Cardinal_Abreviado,
    
    -- Información de la Localización
    l.Localizacion_descripcion,
    l.Latitud,
    l.Longitud,
    
    -- Información del Barrio
    b.Nombre_barrio AS Nombre_Barrio,
    
    -- Información de la Ciudad
    c.Ciudad AS Nombre_Ciudad,
    
    -- Información del Municipio (la ciudad es un municipio)
    m.Municipio_nombre AS Nombre_Municipio,
    
    -- Información del Departamento
    n.Ndap_nombre AS Nombre_Departamento,
    
    -- Información de la División Urbana (Localidad/Comuna), ADVERTENCIA: Puede duplicar filas
    du.nombre_o_numero AS Nombre_Division_Urbana,
    td.nombre_tipo AS Tipo_Division_Urbana,
    
    d.Activo,
    d.Created_at,
    d.Updated_at
FROM
    direccion d
LEFT JOIN
    designador_cardinal dc ON d.Designador_cardinal_FK = dc.Designador_cardinal_id
LEFT JOIN
    localizacion l ON d.Localizacion_FK = l.Localizacion_id
LEFT JOIN
    barrio_ciudad_corregimiento_vereda bccv ON d.Barrio_ciudad_corregimiento_vereda_FK = bccv.Barrio_ciudad_corregimiento_vereda_id
LEFT JOIN
    barrio b ON bccv.Barrio_FK = b.Barrio_id
LEFT JOIN
    ciudad c ON bccv.Ciudad_FK = c.Ciudad_id
LEFT JOIN
    corregimiento cor ON bccv.Corregimiento_FK = cor.Corregimiento_id
LEFT JOIN
    vereda v ON bccv.Vereda_Fk = v.Vereda_id
LEFT JOIN
    municipio m ON c.Municipio_FK = m.Municipio_id
LEFT JOIN
    ndap n ON m.Ndap_FK = n.Ndap_id
LEFT JOIN
    divisiones_urbanas du ON c.Ciudad_id = du.Ciudad_FK -- Une la ciudad con sus divisiones urbanas
LEFT JOIN
    tipos_division_urbana td ON du.Tipo_division_urbana_FK = td.id_tipo_urbano; -- Obtiene el tipo de división urbana