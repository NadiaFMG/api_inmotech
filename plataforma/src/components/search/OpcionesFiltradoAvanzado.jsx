// // import React, { useState } from 'react';
// // import { Accordion, Form, Row, Col, Button } from 'react-bootstrap';

// // const OpcionesFiltradoAvanzado = ({ onFilter }) => {
// //     const [filtros, setFiltros] = useState({
// //         habitaciones: '',
// //         banos: '',
// //         areaMin: '',
// //         areaMax: '',
// //         garaje: false,
// //         piscina: false,
// //         jardin: false,
// //         amoblado: false,
// //         antiguedad: '',
// //         estrato: '',
// //         serviciosIncluidos: false,
// //         seguridadPrivada: false
// //     });

// //     const handleChange = (e) => {
// //         const { name, value, type, checked } = e.target;
// //         setFiltros(prev => ({
// //             ...prev,
// //             [name]: type === 'checkbox' ? checked : value
// //         }));
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         onFilter(filtros);
// //     };

// //     return (
// //         <Accordion className="mb-4">
// //             <Accordion.Item eventKey="0">
// //                 <Accordion.Header>Filtros Avanzados</Accordion.Header>
// //                 <Accordion.Body>
// //                     <Form onSubmit={handleSubmit}>
// //                         <Row className="mb-3">
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Habitaciones</Form.Label>
// //                                     <Form.Select 
// //                                         name="habitaciones"
// //                                         value={filtros.habitaciones}
// //                                         onChange={handleChange}
// //                                     >
// //                                         <option value="">Cualquiera</option>
// //                                         <option value="1">1+</option>
// //                                         <option value="2">2+</option>
// //                                         <option value="3">3+</option>
// //                                         <option value="4">4+</option>
// //                                         <option value="5">5+</option>
// //                                     </Form.Select>
// //                                 </Form.Group>
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Baños</Form.Label>
// //                                     <Form.Select
// //                                         name="banos"
// //                                         value={filtros.banos}
// //                                         onChange={handleChange}
// //                                     >
// //                                         <option value="">Cualquiera</option>
// //                                         <option value="1">1+</option>
// //                                         <option value="2">2+</option>
// //                                         <option value="3">3+</option>
// //                                         <option value="4">4+</option>
// //                                     </Form.Select>
// //                                 </Form.Group>
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Área Mínima (m²)</Form.Label>
// //                                     <Form.Control
// //                                         type="number"
// //                                         name="areaMin"
// //                                         value={filtros.areaMin}
// //                                         onChange={handleChange}
// //                                     />
// //                                 </Form.Group>
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Área Máxima (m²)</Form.Label>
// //                                     <Form.Control
// //                                         type="number"
// //                                         name="areaMax"
// //                                         value={filtros.areaMax}
// //                                         onChange={handleChange}
// //                                     />
// //                                 </Form.Group>
// //                             </Col>
// //                         </Row>

// //                         <Row className="mb-3">
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Antigüedad</Form.Label>
// //                                     <Form.Select
// //                                         name="antiguedad"
// //                                         value={filtros.antiguedad}
// //                                         onChange={handleChange}
// //                                     >
// //                                         <option value="">Cualquiera</option>
// //                                         <option value="nuevo">Nuevo</option>
// //                                         <option value="0-5">0-5 años</option>
// //                                         <option value="5-10">5-10 años</option>
// //                                         <option value="10+">Más de 10 años</option>
// //                                     </Form.Select>
// //                                 </Form.Group>
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Group>
// //                                     <Form.Label>Estrato</Form.Label>
// //                                     <Form.Select
// //                                         name="estrato"
// //                                         value={filtros.estrato}
// //                                         onChange={handleChange}
// //                                     >
// //                                         <option value="">Cualquiera</option>
// //                                         <option value="1">1</option>
// //                                         <option value="2">2</option>
// //                                         <option value="3">3</option>
// //                                         <option value="4">4</option>
// //                                         <option value="5">5</option>
// //                                         <option value="6">6</option>
// //                                     </Form.Select>
// //                                 </Form.Group>
// //                             </Col>
// //                         </Row>

// //                         <Row className="mb-3">
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Garaje"
// //                                     name="garaje"
// //                                     checked={filtros.garaje}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Piscina"
// //                                     name="piscina"
// //                                     checked={filtros.piscina}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Jardín"
// //                                     name="jardin"
// //                                     checked={filtros.jardin}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Amoblado"
// //                                     name="amoblado"
// //                                     checked={filtros.amoblado}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                         </Row>

// //                         <Row className="mb-3">
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Servicios Incluidos"
// //                                     name="serviciosIncluidos"
// //                                     checked={filtros.serviciosIncluidos}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                             <Col md={3}>
// //                                 <Form.Check
// //                                     type="checkbox"
// //                                     label="Seguridad Privada"
// //                                     name="seguridadPrivada"
// //                                     checked={filtros.seguridadPrivada}
// //                                     onChange={handleChange}
// //                                 />
// //                             </Col>
// //                         </Row>

// //                         <Button type="submit" variant="primary">
// //                             Aplicar Filtros
// //                         </Button>
// //                     </Form>
// //                 </Accordion.Body>
// //             </Accordion.Item>
// //         </Accordion>
// //     );
// // };

// // export default OpcionesFiltradoAvanzado;

// import React, { useState } from 'react';
// import { Accordion, Form, Row, Col, Button } from 'react-bootstrap';

// // Solo los campos que NO están en SearchBar (los demás van aquí)
// const initialFiltros = {
//     // Ya usados en SearchBar: ValorMin, ValorMax, Direccion, Motivo_VoA, Estado
//     Area: '',
//     Antiguedad: '',
//     Situacion_inmueble: '',
//     Tipo_edificacion_FK: '',
//     Otras_caracteristicas_FK: '',
//     Acerca_edificacion_FK: '',
//     Division_FK: '',
//     Imagenes_inmueble_FK: '',
//     Codigo_interno: '',
//     Fecha_publicacion: '',
//     Fecha_actualizacion: '',
//     Visitas: '',
//     Observaciones: '',
//     Platform_user_FK: '',
//     Direccion_FK: ''
// };

// const OpcionesFiltradoAvanzado = ({ onFilter }) => {
//     const [filtros, setFiltros] = useState(initialFiltros);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFiltros(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Solo enviar los filtros que tengan valor
//         const cleanFiltros = Object.fromEntries(
//             Object.entries(filtros).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
//         );
//         onFilter(cleanFiltros);
//     };

//     return (
//         <Accordion className="mb-4">
//             <Accordion.Item eventKey="0">
//                 <Accordion.Header>Filtros Avanzados</Accordion.Header>
//                 <Accordion.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Row className="mb-3">
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Área (m²)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Area"
//                                         value={filtros.Area}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Antigüedad (años)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Antiguedad"
//                                         value={filtros.Antiguedad}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Situación Inmueble</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="Situacion_inmueble"
//                                         value={filtros.Situacion_inmueble}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row className="mb-3">
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Tipo Edificación (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Tipo_edificacion_FK"
//                                         value={filtros.Tipo_edificacion_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Otras Características (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Otras_caracteristicas_FK"
//                                         value={filtros.Otras_caracteristicas_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Acerca Edificación (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Acerca_edificacion_FK"
//                                         value={filtros.Acerca_edificacion_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row className="mb-3">
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>División (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Division_FK"
//                                         value={filtros.Division_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Imágenes Inmueble (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Imagenes_inmueble_FK"
//                                         value={filtros.Imagenes_inmueble_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Código Interno</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="Codigo_interno"
//                                         value={filtros.Codigo_interno}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row className="mb-3">
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Fecha Publicación</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         name="Fecha_publicacion"
//                                         value={filtros.Fecha_publicacion}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Fecha Actualización</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         name="Fecha_actualizacion"
//                                         value={filtros.Fecha_actualizacion}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={4}>
//                                 <Form.Group>
//                                     <Form.Label>Visitas</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Visitas"
//                                         value={filtros.Visitas}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Row className="mb-3">
//                             <Col md={6}>
//                                 <Form.Group>
//                                     <Form.Label>Observaciones</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="Observaciones"
//                                         value={filtros.Observaciones}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={3}>
//                                 <Form.Group>
//                                     <Form.Label>Platform User (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Platform_user_FK"
//                                         value={filtros.Platform_user_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                             <Col md={3}>
//                                 <Form.Group>
//                                     <Form.Label>Dirección (ID)</Form.Label>
//                                     <Form.Control
//                                         type="number"
//                                         name="Direccion_FK"
//                                         value={filtros.Direccion_FK}
//                                         onChange={handleChange}
//                                     />
//                                 </Form.Group>
//                             </Col>
//                         </Row>
//                         <Button type="submit" variant="primary">
//                             Aplicar Filtros
//                         </Button>
//                     </Form>
//                 </Accordion.Body>
//             </Accordion.Item>
//         </Accordion>
//     );
// };

// export default OpcionesFiltradoAvanzado;

import React, { useState } from 'react';
import { Accordion, Form, Row, Col, Button } from 'react-bootstrap';

// Solo los campos AVANZADOS que no están en SearchBar
const initialFiltros = {
    min_area_total: '',
    max_area_total: '',
    antiguedad: '',
    codigo_interno: '',
    tipo_edificacion_categoria: '',
    tipo_construccion: '',
    niveles_construidos: '',
    min_niveles_construidos: '',
    max_niveles_construidos: '',
    año_construccion: '',
    min_año_construccion: '',
    max_año_construccion: '',
    num_habitaciones: '',
    min_habitaciones: '',
    max_habitaciones: '',
    num_baños: '',
    min_baños: '',
    max_baños: '',
    tipo_cocina: '',
    balcon_si: false,
    num_terrazas: '',
    garaje_mayor_cero: false,
    num_garajes: '',
    ascensores_si: false,
    min_closets: '',
    num_closets: '',
    mascotas_permitidas_si: false,
    zona_lavanderia_si: false,
    parqueaderos_asignados: '',
    parqueadero_cubierto_si: false,
    ndap_id: '',
    municipio_id: '',
    ciudad_id: '',
    corregimiento_id: '',
    vereda_id: '',
    barrio_id: '',
    latitud: '',
    longitud: '',
    radio_km: '',
    numero: '',
    calle: '',
    adicional: '',
    designador_cardinal_id: '',
    platform_user_id: ''
};

const OpcionesFiltradoAvanzado = ({ onFilter }) => {
    const [filtros, setFiltros] = useState(initialFiltros);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Solo enviar los filtros que tengan valor o true (para checkboxes)
        const cleanFiltros = Object.fromEntries(
            Object.entries(filtros).filter(
                ([_, v]) =>
                    (typeof v === 'boolean' && v === true) ||
                    (typeof v !== 'boolean' && v !== '' && v !== null && v !== undefined)
            )
        );
        onFilter(cleanFiltros);
    };

    return (
        <Accordion className="mb-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtros Avanzados</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Área Mínima</Form.Label>
                                    <Form.Control type="number" name="min_area_total" value={filtros.min_area_total} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Área Máxima</Form.Label>
                                    <Form.Control type="number" name="max_area_total" value={filtros.max_area_total} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Antigüedad</Form.Label>
                                    <Form.Control name="antiguedad" value={filtros.antiguedad} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Código Interno</Form.Label>
                                    <Form.Control name="codigo_interno" value={filtros.codigo_interno} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo Edificación Categoría</Form.Label>
                                    <Form.Control name="tipo_edificacion_categoria" value={filtros.tipo_edificacion_categoria} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo Construcción</Form.Label>
                                    <Form.Control name="tipo_construccion" value={filtros.tipo_construccion} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Niveles Construidos</Form.Label>
                                    <Form.Control type="number" name="niveles_construidos" value={filtros.niveles_construidos} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mín. Niveles Construidos</Form.Label>
                                    <Form.Control type="number" name="min_niveles_construidos" value={filtros.min_niveles_construidos} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Máx. Niveles Construidos</Form.Label>
                                    <Form.Control type="number" name="max_niveles_construidos" value={filtros.max_niveles_construidos} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Año Construcción</Form.Label>
                                    <Form.Control type="number" name="año_construccion" value={filtros.año_construccion} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mín. Año Construcción</Form.Label>
                                    <Form.Control type="number" name="min_año_construccion" value={filtros.min_año_construccion} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Máx. Año Construcción</Form.Label>
                                    <Form.Control type="number" name="max_año_construccion" value={filtros.max_año_construccion} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Habitaciones</Form.Label>
                                    <Form.Control type="number" name="num_habitaciones" value={filtros.num_habitaciones} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mín. Habitaciones</Form.Label>
                                    <Form.Control type="number" name="min_habitaciones" value={filtros.min_habitaciones} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Máx. Habitaciones</Form.Label>
                                    <Form.Control type="number" name="max_habitaciones" value={filtros.max_habitaciones} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Baños</Form.Label>
                                    <Form.Control type="number" name="num_baños" value={filtros.num_baños} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mín. Baños</Form.Label>
                                    <Form.Control type="number" name="min_baños" value={filtros.min_baños} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Máx. Baños</Form.Label>
                                    <Form.Control type="number" name="max_baños" value={filtros.max_baños} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo Cocina</Form.Label>
                                    <Form.Control name="tipo_cocina" value={filtros.tipo_cocina} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Balcón"
                                        name="balcon_si"
                                        checked={filtros.balcon_si}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Terrazas</Form.Label>
                                    <Form.Control type="number" name="num_terrazas" value={filtros.num_terrazas} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Garaje > 0"
                                        name="garaje_mayor_cero"
                                        checked={filtros.garaje_mayor_cero}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Garajes</Form.Label>
                                    <Form.Control type="number" name="num_garajes" value={filtros.num_garajes} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Ascensores"
                                        name="ascensores_si"
                                        checked={filtros.ascensores_si}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mín. Closets</Form.Label>
                                    <Form.Control type="number" name="min_closets" value={filtros.min_closets} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Closets</Form.Label>
                                    <Form.Control type="number" name="num_closets" value={filtros.num_closets} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Mascotas Permitidas"
                                        name="mascotas_permitidas_si"
                                        checked={filtros.mascotas_permitidas_si}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Zona Lavandería"
                                        name="zona_lavanderia_si"
                                        checked={filtros.zona_lavanderia_si}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Parqueaderos Asignados</Form.Label>
                                    <Form.Control type="number" name="parqueaderos_asignados" value={filtros.parqueaderos_asignados} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        type="checkbox"
                                        label="Parqueadero Cubierto"
                                        name="parqueadero_cubierto_si"
                                        checked={filtros.parqueadero_cubierto_si}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>NDAP ID</Form.Label>
                                    <Form.Control name="ndap_id" value={filtros.ndap_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Municipio ID</Form.Label>
                                    <Form.Control name="municipio_id" value={filtros.municipio_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Ciudad ID</Form.Label>
                                    <Form.Control name="ciudad_id" value={filtros.ciudad_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Corregimiento ID</Form.Label>
                                    <Form.Control name="corregimiento_id" value={filtros.corregimiento_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vereda ID</Form.Label>
                                    <Form.Control name="vereda_id" value={filtros.vereda_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Barrio ID</Form.Label>
                                    <Form.Control name="barrio_id" value={filtros.barrio_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Latitud</Form.Label>
                                    <Form.Control name="latitud" value={filtros.latitud} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Longitud</Form.Label>
                                    <Form.Control name="longitud" value={filtros.longitud} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Radio (km)</Form.Label>
                                    <Form.Control name="radio_km" value={filtros.radio_km} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Número</Form.Label>
                                    <Form.Control name="numero" value={filtros.numero} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Calle</Form.Label>
                                    <Form.Control name="calle" value={filtros.calle} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Adicional</Form.Label>
                                    <Form.Control name="adicional" value={filtros.adicional} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Designador Cardinal ID</Form.Label>
                                    <Form.Control name="designador_cardinal_id" value={filtros.designador_cardinal_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                            <Col md={2}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Platform User ID</Form.Label>
                                    <Form.Control name="platform_user_id" value={filtros.platform_user_id} onChange={handleChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button type="submit" variant="primary" size="lg">
                                Aplicar Filtros
                            </Button>
                        </div>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default OpcionesFiltradoAvanzado;