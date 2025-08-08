CREATE TABLE municipio (
   Municipio_id INT(11) NOT NULL AUTO_INCREMENT,
   Ndap_FK INT(11),
   Municipio_nombre VARCHAR(255) NOT NULL,
   Municipio_descripcion TEXT,
   Activo TINYINT(1) DEFAULT 1,
   Created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   Updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (Municipio_id),
   FOREIGN KEY (Ndap_FK) REFERENCES ndap(Ndap_id)
);

--! es una consulta donde al seleccionar un municipio mostrara los municipios relacionados con el departamento
SELECT
    m.Municipio_id,
    m.Municipio_nombre,
    m.Municipio_descripcion,
    m.Activo,
    n.Ndap_nombre AS Departamento_Nombre
FROM
    municipio AS m
JOIN
    ndap AS n ON m.Ndap_FK = n.Ndap_id
WHERE
    n.Ndap_nombre = 'Nariño'; -- Reemplaza 'Nariño' con el nombre del departamento que buscas

--! despliega todos los departamentos */
SELECT
    Ndap_id,
    Ndap_nombre
FROM
    ndap
ORDER BY
    Ndap_nombre;

--! despiega todos los municipios 
SELECT
    Municipio_id,
    Municipio_nombre,
    Ndap_FK -- Puedes incluir el FK si necesitas saber a qué departamento pertenece cada municipio en esta lista inicial
FROM
    municipio
ORDER BY
    Municipio_nombre;

--! despliega todos los municipios de un departamento elegido
SELECT
    m.Municipio_id,
    m.Municipio_nombre
FROM
    municipio AS m
WHERE
    m.Ndap_FK = 2 -- Aquí va el Ndap_id del departamento que el usuario eligió
ORDER BY
    m.Municipio_nombre;

-- despliega todos los departamentos en el cual tengan un municipio con el nombre

--todo quiero que a crear y actualizar no se ponga el id sino que salga el nombre

--! 1. Si el usuario elige una ciudad (por nombre), mostrar su municipio y departamento:
SELECT
    c.Ciudad_id,
    c.Ciudad,
    m.Municipio_id,
    m.Municipio_nombre,
    n.Ndap_id,
    n.Ndap_nombre
FROM ciudad c
JOIN municipio m ON c.Municipio_FK = m.Municipio_id
JOIN ndap n ON m.Ndap_FK = n.Ndap_id
WHERE c.Ciudad = 'Chachagüí'; -- Cambia por el nombre que el usuario escriba

--! 2. Si el usuario elige una vereda (por nombre), mostrar su municipio y departamento:
SELECT
    v.Vereda_id,
    v.Vereda_nombre,
    m.Municipio_id,
    m.Municipio_nombre,
    n.Ndap_id,
    n.Ndap_nombre
FROM vereda v
JOIN municipio m ON v.Municipio_FK = m.Municipio_id
JOIN ndap n ON m.Ndap_FK = n.Ndap_id
WHERE v.Vereda_nombre = 'El Tambillo'; -- Cambia por el nombre que el usuario escriba

--! 3. Si el usuario elige un corregimiento (por nombre), mostrar su municipio y departamento:
SELECT
    co.Corregimiento_id,
    co.Corregimiento,
    m.Municipio_id,
    m.Municipio_nombre,
    n.Ndap_id,
    n.Ndap_nombre
FROM corregimiento co
JOIN municipio m ON co.Municipio_FK = m.Municipio_id
JOIN ndap n ON m.Ndap_FK = n.Ndap_id
WHERE co.Corregimiento = 'Pantanillo'; -- Cambia por el nombre que el usuario escriba

--! 4. Si el usuario elige un municipio (por nombre), mostrar su departamento:
SELECT
    m.Municipio_id,
    m.Municipio_nombre,
    n.Ndap_id,
    n.Ndap_nombre
FROM municipio m
JOIN ndap n ON m.Ndap_FK = n.Ndap_id
WHERE m.Municipio_nombre = 'Chachagüí'; -- Cambia por el nombre que el usuario escriba

--! 5 filtrosky para eler un departamento e ir filtrando poco a poco hasta llegar a la vereda, corregimiento o ciudad:
-- Al elegir un departamento, mostrar los municipios relacionados:
SELECT
    m.Municipio_id,
    m.Municipio_nombre
FROM municipio m
JOIN ndap n ON m.Ndap_FK = n.Ndap_id
WHERE n.Ndap_nombre = 'Nariño'; -- Cambia por el nombre del departamento seleccionado

-- Al elegir un municipio, mostrar las veredas relacionadas:
SELECT
    v.Vereda_id,
    v.Vereda_nombre
FROM vereda v
WHERE v.Municipio_FK = (
    SELECT Municipio_id FROM municipio WHERE Municipio_nombre = 'Chachagüí'
); -- Cambia por el nombre del municipio seleccionado

-- Al elegir un municipio, mostrar los corregimientos relacionados:
SELECT
    c.Corregimiento_id,
    c.Corregimiento
FROM corregimiento c
WHERE c.Municipio_FK = (
    SELECT Municipio_id FROM municipio WHERE Municipio_nombre = 'Chachagüí'
); -- Cambia por el nombre del municipio seleccionado

-- Al elegir un municipio, mostrar las ciudades relacionadas:
SELECT
    ci.Ciudad_id,
    ci.Ciudad
FROM ciudad ci
WHERE ci.Municipio_FK = (
    SELECT Municipio_id FROM municipio WHERE Municipio_nombre = 'Chachagüí'
); -- Cambia por el nombre del municipio seleccionado