// import React, { useState } from 'react';
// import { Form, Row, Col, Button, Card } from 'react-bootstrap';

// const DetailedSearchForm = ({ onSearch }) => {
//     const [searchParams, setSearchParams] = useState({
//         tipoPropiedad: '',
//         precioMin: '',
//         precioMax: '',
//         habitaciones: '',
//         banos: '',
//         areaMin: '',
//         areaMax: '',
//         ubicacion: '',
//         tipoOperacion: '',
//         caracteristicas: [],
//         servicios: []
//     });

//     const caracteristicasOpciones = [
//         'Garaje', 'Piscina', 'Jardín', 'Terraza', 
//         'Balcón', 'Seguridad 24/7', 'Amueblado'
//     ];

//     const serviciosOpciones = [
//         'Agua', 'Luz', 'Gas', 'Internet', 
//         'Cable TV', 'Aire Acondicionado', 'Calefacción'
//     ];

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSearch(searchParams);
//     };

//     const handleCheckboxChange = (field, value) => {
//         setSearchParams(prev => ({
//             ...prev,
//             [field]: prev[field].includes(value)
//                 ? prev[field].filter(item => item !== value)
//                 : [...prev[field], value]
//         }));
//     };

//     return (
//         <Card className="mb-4">
//             <Card.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Row>
//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Tipo de Propiedad</Form.Label>
//                                 <Form.Select
//                                     value={searchParams.tipoPropiedad}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         tipoPropiedad: e.target.value
//                                     })}
//                                 >
//                                     <option value="">Seleccionar...</option>
//                                     <option value="casa">Casa</option>
//                                     <option value="apartamento">Apartamento</option>
//                                     <option value="local">Local Comercial</option>
//                                     <option value="oficina">Oficina</option>
//                                     <option value="terreno">Terreno</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>

//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Tipo de Operación</Form.Label>
//                                 <Form.Select
//                                     value={searchParams.tipoOperacion}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         tipoOperacion: e.target.value
//                                     })}
//                                 >
//                                     <option value="">Seleccionar...</option>
//                                     <option value="venta">Venta</option>
//                                     <option value="alquiler">Alquiler</option>
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>

//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Precio Mínimo</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={searchParams.precioMin}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         precioMin: e.target.value
//                                     })}
//                                 />
//                             </Form.Group>
//                         </Col>

//                         <Col md={6}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Precio Máximo</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={searchParams.precioMax}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         precioMax: e.target.value
//                                     })}
//                                 />
//                             </Form.Group>
//                         </Col>

//                         <Col md={4}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Habitaciones</Form.Label>
//                                 <Form.Select
//                                     value={searchParams.habitaciones}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         habitaciones: e.target.value
//                                     })}
//                                 >
//                                     <option value="">Cualquiera</option>
//                                     {[1,2,3,4,5].map(num => (
//                                         <option key={num} value={num}>{num}+ Habitaciones</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>

//                         <Col md={4}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Baños</Form.Label>
//                                 <Form.Select
//                                     value={searchParams.banos}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         banos: e.target.value
//                                     })}
//                                 >
//                                     <option value="">Cualquiera</option>
//                                     {[1,2,3,4].map(num => (
//                                         <option key={num} value={num}>{num}+ Baños</option>
//                                     ))}
//                                 </Form.Select>
//                             </Form.Group>
//                         </Col>

//                         <Col md={4}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Ubicación</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={searchParams.ubicacion}
//                                     onChange={(e) => setSearchParams({
//                                         ...searchParams,
//                                         ubicacion: e.target.value
//                                     })}
//                                     placeholder="Ciudad, Zona, Barrio..."
//                                 />
//                             </Form.Group>
//                         </Col>
//                     </Row>

//                     <Row className="mb-3">
//                         <Col md={6}>
//                             <Form.Label>Características</Form.Label>
//                             <div className="d-flex flex-wrap gap-2">
//                                 {caracteristicasOpciones.map(caract => (
//                                     <Form.Check
//                                         key={caract}
//                                         type="checkbox"
//                                         label={caract}
//                                         checked={searchParams.caracteristicas.includes(caract)}
//                                         onChange={() => handleCheckboxChange('caracteristicas', caract)}
//                                     />
//                                 ))}
//                             </div>
//                         </Col>

//                         <Col md={6}>
//                             <Form.Label>Servicios</Form.Label>
//                             <div className="d-flex flex-wrap gap-2">
//                                 {serviciosOpciones.map(servicio => (
//                                     <Form.Check
//                                         key={servicio}
//                                         type="checkbox"
//                                         label={servicio}
//                                         checked={searchParams.servicios.includes(servicio)}
//                                         onChange={() => handleCheckboxChange('servicios', servicio)}
//                                     />
//                                 ))}
//                             </div>
//                         </Col>
//                     </Row>

//                     <div className="text-center">
//                         <Button type="submit" variant="primary" size="lg">
//                             Buscar Inmuebles
//                         </Button>
//                     </div>
//                 </Form>
//             </Card.Body>
//         </Card>
//     );
// };

// export default DetailedSearchForm;

import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const initialState = {
    motivo_transaccion: '',
    min_precio: '',
    max_precio: '',
    min_area_total: '',
    max_area_total: '',
    antiguedad: '',
    estado_inmueble: '',
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

const DetailedSearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Motivo Transacción</Form.Label>
                            <Form.Control name="motivo_transaccion" value={searchParams.motivo_transaccion} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Precio Mínimo</Form.Label>
                            <Form.Control type="number" name="min_precio" value={searchParams.min_precio} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Precio Máximo</Form.Label>
                            <Form.Control type="number" name="max_precio" value={searchParams.max_precio} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Área Mínima</Form.Label>
                            <Form.Control type="number" name="min_area_total" value={searchParams.min_area_total} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Área Máxima</Form.Label>
                            <Form.Control type="number" name="max_area_total" value={searchParams.max_area_total} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Antigüedad</Form.Label>
                            <Form.Control name="antiguedad" value={searchParams.antiguedad} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Estado Inmueble</Form.Label>
                            <Form.Control name="estado_inmueble" value={searchParams.estado_inmueble} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Código Interno</Form.Label>
                            <Form.Control name="codigo_interno" value={searchParams.codigo_interno} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Tipo Edificación Categoría</Form.Label>
                            <Form.Control name="tipo_edificacion_categoria" value={searchParams.tipo_edificacion_categoria} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Tipo Construcción</Form.Label>
                            <Form.Control name="tipo_construccion" value={searchParams.tipo_construccion} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Niveles Construidos</Form.Label>
                            <Form.Control type="number" name="niveles_construidos" value={searchParams.niveles_construidos} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Mín. Niveles Construidos</Form.Label>
                            <Form.Control type="number" name="min_niveles_construidos" value={searchParams.min_niveles_construidos} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Máx. Niveles Construidos</Form.Label>
                            <Form.Control type="number" name="max_niveles_construidos" value={searchParams.max_niveles_construidos} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Año Construcción</Form.Label>
                            <Form.Control type="number" name="año_construccion" value={searchParams.año_construccion} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Mín. Año Construcción</Form.Label>
                            <Form.Control type="number" name="min_año_construccion" value={searchParams.min_año_construccion} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Máx. Año Construcción</Form.Label>
                            <Form.Control type="number" name="max_año_construccion" value={searchParams.max_año_construccion} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Habitaciones</Form.Label>
                            <Form.Control type="number" name="num_habitaciones" value={searchParams.num_habitaciones} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Mín. Habitaciones</Form.Label>
                            <Form.Control type="number" name="min_habitaciones" value={searchParams.min_habitaciones} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Máx. Habitaciones</Form.Label>
                            <Form.Control type="number" name="max_habitaciones" value={searchParams.max_habitaciones} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Baños</Form.Label>
                            <Form.Control type="number" name="num_baños" value={searchParams.num_baños} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Mín. Baños</Form.Label>
                            <Form.Control type="number" name="min_baños" value={searchParams.min_baños} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Máx. Baños</Form.Label>
                            <Form.Control type="number" name="max_baños" value={searchParams.max_baños} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={4}><Form.Group className="mb-3">
                            <Form.Label>Tipo Cocina</Form.Label>
                            <Form.Control name="tipo_cocina" value={searchParams.tipo_cocina} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Balcón"
                                name="balcon_si"
                                checked={searchParams.balcon_si}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Terrazas</Form.Label>
                            <Form.Control type="number" name="num_terrazas" value={searchParams.num_terrazas} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Garaje > 0"
                                name="garaje_mayor_cero"
                                checked={searchParams.garaje_mayor_cero}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Garajes</Form.Label>
                            <Form.Control type="number" name="num_garajes" value={searchParams.num_garajes} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Ascensores"
                                name="ascensores_si"
                                checked={searchParams.ascensores_si}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Mín. Closets</Form.Label>
                            <Form.Control type="number" name="min_closets" value={searchParams.min_closets} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Closets</Form.Label>
                            <Form.Control type="number" name="num_closets" value={searchParams.num_closets} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Mascotas Permitidas"
                                name="mascotas_permitidas_si"
                                checked={searchParams.mascotas_permitidas_si}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Zona Lavandería"
                                name="zona_lavanderia_si"
                                checked={searchParams.zona_lavanderia_si}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Parqueaderos Asignados</Form.Label>
                            <Form.Control type="number" name="parqueaderos_asignados" value={searchParams.parqueaderos_asignados} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Check
                                type="checkbox"
                                label="Parqueadero Cubierto"
                                name="parqueadero_cubierto_si"
                                checked={searchParams.parqueadero_cubierto_si}
                                onChange={handleChange}
                            />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>NDAP ID</Form.Label>
                            <Form.Control name="ndap_id" value={searchParams.ndap_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Municipio ID</Form.Label>
                            <Form.Control name="municipio_id" value={searchParams.municipio_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Ciudad ID</Form.Label>
                            <Form.Control name="ciudad_id" value={searchParams.ciudad_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Corregimiento ID</Form.Label>
                            <Form.Control name="corregimiento_id" value={searchParams.corregimiento_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Vereda ID</Form.Label>
                            <Form.Control name="vereda_id" value={searchParams.vereda_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Barrio ID</Form.Label>
                            <Form.Control name="barrio_id" value={searchParams.barrio_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Latitud</Form.Label>
                            <Form.Control name="latitud" value={searchParams.latitud} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Longitud</Form.Label>
                            <Form.Control name="longitud" value={searchParams.longitud} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Radio (km)</Form.Label>
                            <Form.Control name="radio_km" value={searchParams.radio_km} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Número</Form.Label>
                            <Form.Control name="numero" value={searchParams.numero} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Calle</Form.Label>
                            <Form.Control name="calle" value={searchParams.calle} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Adicional</Form.Label>
                            <Form.Control name="adicional" value={searchParams.adicional} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Designador Cardinal ID</Form.Label>
                            <Form.Control name="designador_cardinal_id" value={searchParams.designador_cardinal_id} onChange={handleChange} />
                        </Form.Group></Col>
                        <Col md={2}><Form.Group className="mb-3">
                            <Form.Label>Platform User ID</Form.Label>
                            <Form.Control name="platform_user_id" value={searchParams.platform_user_id} onChange={handleChange} />
                        </Form.Group></Col>
                    </Row>
                    <div className="text-center">
                        <Button type="submit" variant="primary" size="lg">
                            Buscar Inmuebles
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default DetailedSearchForm;