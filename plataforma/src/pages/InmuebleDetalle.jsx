// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { useParams } from 'react-router-dom';
// // // // // // // import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// // // // // // // import {inmuebleService} from '../services/propertyService';

// // // // // // // const InmuebleDetalle = () => {
// // // // // // //     const { id } = useParams();
// // // // // // //     const [property, setProperty] = useState(null);
// // // // // // //     const [loading, setLoading] = useState(true);
// // // // // // //     const [error, setError] = useState(null);

// // // // // // //     useEffect(() => {
// // // // // // //         const fetchPropertyDetails = async () => {
// // // // // // //             try {
// // // // // // //                 const response = await propertyService.getPropertyById(id);
// // // // // // //                 console.log('Detalles de propiedad:', response);
// // // // // // //                 setProperty(response);
// // // // // // //                 setLoading(false);
// // // // // // //             } catch (error) {
// // // // // // //                 console.error('Error al cargar los detalles:', error);
// // // // // // //                 setError('No se pudo cargar la información del inmueble');
// // // // // // //                 setLoading(false);
// // // // // // //             }
// // // // // // //         };

// // // // // // //         fetchPropertyDetails();
// // // // // // //     }, [id]);

// // // // // // //     if (loading) return <div>Cargando detalles...</div>;
// // // // // // //     if (error) return <div>{error}</div>;
// // // // // // //     if (!property) return <div>No se encontró el inmueble</div>;

// // // // // // //     return (
// // // // // // //         <Container className="mt-4">
// // // // // // //             <Row>
// // // // // // //                 <Col md={8}>
// // // // // // //                     <img 
// // // // // // //                         src={property.imagen} 
// // // // // // //                         alt={property.titulo}
// // // // // // //                         className="img-fluid mb-4"
// // // // // // //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// // // // // // //                     />
// // // // // // //                 </Col>
// // // // // // //                 <Col md={4}>
// // // // // // //                     <Card>
// // // // // // //                         <Card.Body>
// // // // // // //                             <Card.Title className="h3 mb-4">{property.titulo}</Card.Title>
// // // // // // //                             <Card.Text className="h4 text-primary mb-4">
// // // // // // //                                 ${property.precio}
// // // // // // //                             </Card.Text>
// // // // // // //                             <ListGroup variant="flush">
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Ubicación:</strong> {property.ubicacion}
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Tipo:</strong> {property.tipoPropiedad}
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Habitaciones:</strong> {property.habitaciones}
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Baños:</strong> {property.banos}
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Área:</strong> {property.area} m²
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                                 <ListGroup.Item>
// // // // // // //                                     <strong>Garajes:</strong> {property.garajes}
// // // // // // //                                 </ListGroup.Item>
// // // // // // //                             </ListGroup>
// // // // // // //                         </Card.Body>
// // // // // // //                     </Card>
// // // // // // //                 </Col>
// // // // // // //             </Row>
// // // // // // //             <Row className="mt-4">
// // // // // // //                 <Col>
// // // // // // //                     <h4>Descripción</h4>
// // // // // // //                     <p>{property.descripcion}</p>
// // // // // // //                 </Col>
// // // // // // //             </Row>
// // // // // // //         </Container>
// // // // // // //     );
// // // // // // // };

// // // // // // // export default InmuebleDetalle;

// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { useParams } from 'react-router-dom';
// // // // // // import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// // // // // // import { inmuebleService } from '../services/propertyService';

// // // // // // const InmuebleDetalle = () => {
// // // // // //     const { id } = useParams();
// // // // // //     const [property, setProperty] = useState(null);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [error, setError] = useState(null);

// // // // // //     useEffect(() => {
// // // // // //         const fetchPropertyDetails = async () => {
// // // // // //             try {
// // // // // //                 const response = await propertyService.getPropertyById(id);
// // // // // //                 // Si la respuesta viene en response.data, ajusta aquí:
// // // // // //                 setProperty(response.data || response);
// // // // // //                 setLoading(false);
// // // // // //             } catch (error) {
// // // // // //                 setError('No se pudo cargar la información del inmueble');
// // // // // //                 setLoading(false);
// // // // // //             }
// // // // // //         };

// // // // // //         fetchPropertyDetails();
// // // // // //     }, [id]);

// // // // // //     if (loading) return <div>Cargando detalles...</div>;
// // // // // //     if (error) return <div>{error}</div>;
// // // // // //     if (!property) return <div>No se encontró el inmueble</div>;

// // // // // //     return (
// // // // // //         <Container className="mt-4">
// // // // // //             <Row>
// // // // // //                 <Col md={8}>
// // // // // //                     <img 
// // // // // //                         src={property.imagen || property.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'} 
// // // // // //                         alt={property.titulo || property.Descripcion_General || 'Inmueble'}
// // // // // //                         className="img-fluid mb-4"
// // // // // //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// // // // // //                     />
// // // // // //                 </Col>
// // // // // //                 <Col md={4}>
// // // // // //                     <Card>
// // // // // //                         <Card.Body>
// // // // // //                             <Card.Title className="h3 mb-4">{property.titulo || property.Descripcion_General || 'Inmueble'}</Card.Title>
// // // // // //                             <Card.Text className="h4 text-primary mb-4">
// // // // // //                                 ${property.precio || property.Valor || 'N/D'}
// // // // // //                             </Card.Text>
// // // // // //                             <ListGroup variant="flush">
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Ubicación:</strong> {property.ubicacion || property.Direccion || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Tipo:</strong> {property.tipoPropiedad || property.Tipo_edificacion || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Habitaciones:</strong> {property.habitaciones || property.num_habitaciones || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Baños:</strong> {property.banos || property.num_baños || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Área:</strong> {property.area || property.Area || 'N/D'} m²
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Garajes:</strong> {property.garajes || property.num_garajes || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Antigüedad:</strong> {property.antiguedad || property.Antiguedad || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Estado:</strong> {property.estado_inmueble || property.Estado || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                                 <ListGroup.Item>
// // // // // //                                     <strong>Código Interno:</strong> {property.codigo_interno || property.Codigo_interno || 'N/D'}
// // // // // //                                 </ListGroup.Item>
// // // // // //                             </ListGroup>
// // // // // //                         </Card.Body>
// // // // // //                     </Card>
// // // // // //                 </Col>
// // // // // //             </Row>
// // // // // //             <Row className="mt-4">
// // // // // //                 <Col>
// // // // // //                     <h4>Descripción</h4>
// // // // // //                     <p>{property.descripcion || property.Descripcion_General || 'Sin descripción'}</p>
// // // // // //                 </Col>
// // // // // //             </Row>
// // // // // //         </Container>
// // // // // //     );
// // // // // // };

// // // // // // export default InmuebleDetalle;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useParams } from 'react-router-dom';
// // // // // import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
// // // // // import { inmuebleService } from '../services/propertyService';

// // // // // const InmuebleDetalle = () => {
// // // // //     const { id } = useParams();
// // // // //     const [property, setProperty] = useState(null);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [error, setError] = useState(null);

// // // // //     useEffect(() => {
// // // // //         const fetchPropertyDetails = async () => {
// // // // //             try {
// // // // //                 // Usa el servicio correcto
// // // // //                 const response = await inmuebleService.getById(id);
// // // // //                 setProperty(response.data || response);
// // // // //                 setLoading(false);
// // // // //             } catch (error) {
// // // // //                 setError('No se pudo cargar la información del inmueble');
// // // // //                 setLoading(false);
// // // // //             }
// // // // //         };

// // // // //         fetchPropertyDetails();
// // // // //     }, [id]);

// // // // //     if (loading) return <div>Cargando detalles...</div>;
// // // // //     if (error) return <div>{error}</div>;
// // // // //     if (!property) return <div>No se encontró el inmueble</div>;

// // // // //     return (
// // // // //         <Container className="mt-4">
// // // // //             <Row>
// // // // //                 <Col md={8}>
// // // // //                     <img 
// // // // //                         src={property.imagen || property.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'} 
// // // // //                         alt={property.titulo || property.Descripcion_General || 'Inmueble'}
// // // // //                         className="img-fluid mb-4"
// // // // //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// // // // //                     />
// // // // //                 </Col>
// // // // //                 <Col md={4}>
// // // // //                     <Card>
// // // // //                         <Card.Body>
// // // // //                             <Card.Title className="h3 mb-4">{property.titulo || property.Descripcion_General || 'Inmueble'}</Card.Title>
// // // // //                             <Card.Text className="h4 text-primary mb-4">
// // // // //                                 ${property.precio || property.Valor || 'N/D'}
// // // // //                             </Card.Text>
// // // // //                             <ListGroup variant="flush">
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Ubicación:</strong> {property.ubicacion || property.Direccion || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Tipo:</strong> {property.tipoPropiedad || property.Tipo_edificacion || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Habitaciones:</strong> {property.habitaciones || property.num_habitaciones || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Baños:</strong> {property.banos || property.num_baños || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Área:</strong> {property.area || property.Area || 'N/D'} m²
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Garajes:</strong> {property.garajes || property.num_garajes || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Antigüedad:</strong> {property.antiguedad || property.Antiguedad || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Estado:</strong> {property.estado_inmueble || property.Estado || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                                 <ListGroup.Item>
// // // // //                                     <strong>Código Interno:</strong> {property.codigo_interno || property.Codigo_interno || 'N/D'}
// // // // //                                 </ListGroup.Item>
// // // // //                             </ListGroup>
// // // // //                         </Card.Body>
// // // // //                     </Card>
// // // // //                 </Col>
// // // // //             </Row>
// // // // //             <Row className="mt-4">
// // // // //                 <Col>
// // // // //                     <h4>Descripción</h4>
// // // // //                     <p>{property.descripcion || property.Descripcion_General || 'Sin descripción'}</p>
// // // // //                 </Col>
// // // // //             </Row>
// // // // //         </Container>
// // // // //     );
// // // // // };

// // // // // export default InmuebleDetalle;

// // // // import React, { useState, useEffect } from 'react';
// // // // import { useParams } from 'react-router-dom';
// // // // import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
// // // // import {
// // // //     inmuebleService,
// // // //     tipoEdificacionService,
// // // //     acercaEdificacionService,
// // // //     divisionService,
// // // //     imagenesInmuebleService,
// // // //     otrasCaracteristicasService,
// // // //     direccionService,
// // // //     barrioService,
// // // //     ciudadService,
// // // //     municipioService,
// // // //     veredaService,
// // // //     corregimientoService,
// // // //     ndapService,
// // // //     designadorCardinalService,
// // // //     localizacionService
// // // // } from '../services/propertyService';

// // // // const InmuebleDetalle = () => {
// // // //     const { id } = useParams();
// // // //     const [property, setProperty] = useState(null);
// // // //     const [related, setRelated] = useState({});
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [error, setError] = useState(null);

// // // //     useEffect(() => {
// // // //         const fetchAllDetails = async () => {
// // // //             try {
// // // //                 // 1. Obtener el inmueble principal
// // // //                 const res = await inmuebleService.getById(id);
// // // //                 const inmueble = res.data || res;
// // // //                 setProperty(inmueble);

// // // //                 // 2. Obtener datos relacionados usando el mismo id
// // // //                 const [
// // // //                     tipoEdificacion,
// // // //                     acercaEdificacion,
// // // //                     division,
// // // //                     imagenes,
// // // //                     otrasCaracteristicas,
// // // //                     direccion,
// // // //                     barrio,
// // // //                     ciudad,
// // // //                     municipio,
// // // //                     vereda,
// // // //                     corregimiento,
// // // //                     ndap,
// // // //                     designadorCardinal,
// // // //                     localizacion
// // // //                 ] = await Promise.all([
// // // //                     tipoEdificacionService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     acercaEdificacionService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     divisionService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     imagenesInmuebleService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     otrasCaracteristicasService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     direccionService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     barrioService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     ciudadService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     municipioService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     veredaService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     corregimientoService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     ndapService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     designadorCardinalService.getById(id).then(r => r.data || r).catch(() => null),
// // // //                     localizacionService.getById(id).then(r => r.data || r).catch(() => null)
// // // //                 ]);

// // // //                 setRelated({
// // // //                     tipoEdificacion,
// // // //                     acercaEdificacion,
// // // //                     division,
// // // //                     imagenes,
// // // //                     otrasCaracteristicas,
// // // //                     direccion,
// // // //                     barrio,
// // // //                     ciudad,
// // // //                     municipio,
// // // //                     vereda,
// // // //                     corregimiento,
// // // //                     ndap,
// // // //                     designadorCardinal,
// // // //                     localizacion
// // // //                 });

// // // //                 setLoading(false);
// // // //             } catch (err) {
// // // //                 setError('No se pudo cargar la información completa del inmueble');
// // // //                 setLoading(false);
// // // //             }
// // // //         };

// // // //         fetchAllDetails();
// // // //     }, [id]);

// // // //     if (loading) return <Spinner animation="border" />;
// // // //     if (error) return <Alert variant="danger">{error}</Alert>;
// // // //     if (!property) return <div>No se encontró el inmueble</div>;

// // // //     return (
// // // //         <Container className="mt-4">
// // // //             <Row>
// // // //                 <Col md={8}>
// // // //                     <img
// // // //                         src={property.imagen || property.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
// // // //                         alt={property.titulo || property.Descripcion_General || 'Inmueble'}
// // // //                         className="img-fluid mb-4"
// // // //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// // // //                     />
// // // //                 </Col>
// // // //                 <Col md={4}>
// // // //                     <Card>
// // // //                         <Card.Body>
// // // //                             <Card.Title className="h3 mb-4">{property.titulo || property.Descripcion_General || 'Inmueble'}</Card.Title>
// // // //                             <Card.Text className="h4 text-primary mb-4">
// // // //                                 ${property.precio || property.Valor || 'N/D'}
// // // //                             </Card.Text>
// // // //                             <ListGroup variant="flush">
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Ubicación:</strong> {related.direccion?.completa || property.Direccion || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Barrio:</strong> {related.barrio?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Ciudad:</strong> {related.ciudad?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Municipio:</strong> {related.municipio?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Vereda:</strong> {related.vereda?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Corregimiento:</strong> {related.corregimiento?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Tipo Edificación:</strong> {related.tipoEdificacion?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Acerca Edificación:</strong> {related.acercaEdificacion?.descripcion || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>División:</strong> {related.division?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Otras Características:</strong> {related.otrasCaracteristicas?.descripcion || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Designador Cardinal:</strong> {related.designadorCardinal?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Localización:</strong> {related.localizacion?.descripcion || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>NDAP:</strong> {related.ndap?.nombre || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Imágenes adicionales:</strong>
// // // //                                     {related.imagenes?.imagenes
// // // //                                         ? related.imagenes.imagenes.map((img, i) => (
// // // //                                             <img key={i} src={img.url} alt={`Imagen ${i + 1}`} style={{ width: '100px', marginRight: '8px' }} />
// // // //                                         ))
// // // //                                         : 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Habitaciones:</strong> {property.habitaciones || property.num_habitaciones || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Baños:</strong> {property.banos || property.num_baños || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Área:</strong> {property.area || property.Area || 'N/D'} m²
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Garajes:</strong> {property.garajes || property.num_garajes || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Antigüedad:</strong> {property.antiguedad || property.Antiguedad || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Estado:</strong> {property.estado_inmueble || property.Estado || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                                 <ListGroup.Item>
// // // //                                     <strong>Código Interno:</strong> {property.codigo_interno || property.Codigo_interno || 'N/D'}
// // // //                                 </ListGroup.Item>
// // // //                             </ListGroup>
// // // //                         </Card.Body>
// // // //                     </Card>
// // // //                 </Col>
// // // //             </Row>
// // // //             <Row className="mt-4">
// // // //                 <Col>
// // // //                     <h4>Descripción</h4>
// // // //                     <p>{property.descripcion || property.Descripcion_General || 'Sin descripción'}</p>
// // // //                 </Col>
// // // //             </Row>
// // // //         </Container>
// // // //     );
// // // // };

// // // // export default InmuebleDetalle;

// // // import React, { useState, useEffect } from 'react';
// // // import { useParams } from 'react-router-dom';
// // // import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
// // // import {
// // //     inmuebleService,
// // //     tipoEdificacionService,
// // //     acercaEdificacionService,
// // //     divisionService,
// // //     imagenesInmuebleService,
// // //     otrasCaracteristicasService,
// // //     direccionService,
// // //     barrioService,
// // //     ciudadService,
// // //     municipioService,
// // //     veredaService,
// // //     corregimientoService,
// // //     ndapService,
// // //     designadorCardinalService,
// // //     localizacionService
// // // } from '../services/propertyService';

// // // const InmuebleDetalle = () => {
// // //     const { id } = useParams();
// // //     const [property, setProperty] = useState(null);
// // //     const [related, setRelated] = useState({});
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);

// // //     useEffect(() => {
// // //         const fetchAllDetails = async () => {
// // //             try {
// // //                 // 1. Obtener el inmueble principal
// // //                 const res = await inmuebleService.getById(id);
// // //                 const inmueble = res.data || res;
// // //                 setProperty(inmueble);

// // //                 // 2. Obtener datos relacionados usando los IDs del inmueble
// // //                 const promises = [];

// // //                 // Dirección y sus tablas relacionadas
// // //                 if (inmueble.Direccion_FK)
// // //                     promises.push(direccionService.getById(inmueble.Direccion_FK));
// // //                 if (inmueble.Barrio_FK)
// // //                     promises.push(barrioService.getById(inmueble.Barrio_FK));
// // //                 if (inmueble.Ciudad_FK)
// // //                     promises.push(ciudadService.getById(inmueble.Ciudad_FK));
// // //                 if (inmueble.Municipio_FK)
// // //                     promises.push(municipioService.getById(inmueble.Municipio_FK));
// // //                 if (inmueble.Vereda_FK)
// // //                     promises.push(veredaService.getById(inmueble.Vereda_FK));
// // //                 if (inmueble.Corregimiento_FK)
// // //                     promises.push(corregimientoService.getById(inmueble.Corregimiento_FK));
// // //                 if (inmueble.NDAP_FK)
// // //                     promises.push(ndapService.getById(inmueble.NDAP_FK));

// // //                 // División, acerca_edificacion, tipo_edificacion, imágenes, otras características y sus tablas relacionadas
// // //                 if (inmueble.Division_FK)
// // //                     promises.push(divisionService.getById(inmueble.Division_FK));
// // //                 if (inmueble.Acerca_edificacion_FK)
// // //                     promises.push(acercaEdificacionService.getById(inmueble.Acerca_edificacion_FK));
// // //                 if (inmueble.Tipo_edificacion_FK)
// // //                     promises.push(tipoEdificacionService.getById(inmueble.Tipo_edificacion_FK));
// // //                 if (inmueble.Imagenes_inmueble_FK)
// // //                     promises.push(imagenesInmuebleService.getById(inmueble.Imagenes_inmueble_FK));
// // //                 if (inmueble.Otras_caracteristicas_FK)
// // //                     promises.push(otrasCaracteristicasService.getById(inmueble.Otras_caracteristicas_FK));
// // //                 if (inmueble.Designador_cardinal_FK)
// // //                     promises.push(designadorCardinalService.getById(inmueble.Designador_cardinal_FK));
// // //                 if (inmueble.Localizacion_FK)
// // //                     promises.push(localizacionService.getById(inmueble.Localizacion_FK));

// // //                 // 3. Esperar todas las promesas y guardar los resultados
// // //                 const results = await Promise.all(promises.map(p => p.catch(() => null)));
// // //                 const keys = [
// // //                     'direccion',
// // //                     'barrio',
// // //                     'ciudad',
// // //                     'municipio',
// // //                     'vereda',
// // //                     'corregimiento',
// // //                     'ndap',
// // //                     'division',
// // //                     'acercaEdificacion',
// // //                     'tipoEdificacion',
// // //                     'imagenes',
// // //                     'otrasCaracteristicas',
// // //                     'designadorCardinal',
// // //                     'localizacion'
// // //                 ];
// // //                 const relatedData = {};
// // //                 results.forEach((result, idx) => {
// // //                     relatedData[keys[idx]] = result?.data || result;
// // //                 });
// // //                 setRelated(relatedData);

// // //                 setLoading(false);
// // //             } catch (err) {
// // //                 setError('No se pudo cargar la información completa del inmueble');
// // //                 setLoading(false);
// // //             }
// // //         };

// // //         fetchAllDetails();
// // //     }, [id]);

// // //     if (loading) return <Spinner animation="border" />;
// // //     if (error) return <Alert variant="danger">{error}</Alert>;
// // //     if (!property) return <div>No se encontró el inmueble</div>;

// // //     return (
// // //         <Container className="mt-4">
// // //             <Row>
// // //                 <Col md={8}>
// // //                     <img
// // //                         src={property.imagen || property.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
// // //                         alt={property.titulo || property.Descripcion_General || 'Inmueble'}
// // //                         className="img-fluid mb-4"
// // //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// // //                     />
// // //                 </Col>
// // //                 <Col md={4}>
// // //                     <Card>
// // //                         <Card.Body>
// // //                             <Card.Title className="h3 mb-4">{property.titulo || property.Descripcion_General || 'Inmueble'}</Card.Title>
// // //                             <Card.Text className="h4 text-primary mb-4">
// // //                                 ${property.precio || property.Valor || 'N/D'}
// // //                             </Card.Text>
// // //                             <ListGroup variant="flush">
// // //                                 <ListGroup.Item>
// // //                                     <strong>Dirección:</strong> {related.direccion?.completa || property.Direccion || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Barrio:</strong> {related.barrio?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Ciudad:</strong> {related.ciudad?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Municipio:</strong> {related.municipio?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Vereda:</strong> {related.vereda?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Corregimiento:</strong> {related.corregimiento?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>NDAP:</strong> {related.ndap?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>División:</strong> {related.division?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Acerca Edificación:</strong> {related.acercaEdificacion?.descripcion || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Tipo Edificación:</strong> {related.tipoEdificacion?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Imágenes adicionales:</strong>
// // //                                     {related.imagenes?.imagenes
// // //                                         ? related.imagenes.imagenes.map((img, i) => (
// // //                                             <img key={i} src={img.url} alt={`Imagen ${i + 1}`} style={{ width: '100px', marginRight: '8px' }} />
// // //                                         ))
// // //                                         : 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Otras Características:</strong> {related.otrasCaracteristicas?.descripcion || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Designador Cardinal:</strong> {related.designadorCardinal?.nombre || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Localización:</strong> {related.localizacion?.descripcion || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Habitaciones:</strong> {property.habitaciones || property.num_habitaciones || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Baños:</strong> {property.banos || property.num_baños || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Área:</strong> {property.area || property.Area || 'N/D'} m²
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Garajes:</strong> {property.garajes || property.num_garajes || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Antigüedad:</strong> {property.antiguedad || property.Antiguedad || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Estado:</strong> {property.estado_inmueble || property.Estado || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                                 <ListGroup.Item>
// // //                                     <strong>Código Interno:</strong> {property.codigo_interno || property.Codigo_interno || 'N/D'}
// // //                                 </ListGroup.Item>
// // //                             </ListGroup>
// // //                         </Card.Body>
// // //                     </Card>
// // //                 </Col>
// // //             </Row>
// // //             <Row className="mt-4">
// // //                 <Col>
// // //                     <h4>Descripción</h4>
// // //                     <p>{property.descripcion || property.Descripcion_General || 'Sin descripción'}</p>
// // //                 </Col>
// // //             </Row>
// // //         </Container>
// // //     );
// // // };

// // // export default InmuebleDetalle;

// // import React, { useState, useEffect } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
// // import {
// //     inmuebleService,
// //     tipoEdificacionService,
// //     acercaEdificacionService,
// //     divisionService,
// //     imagenesInmuebleService,
// //     otrasCaracteristicasService,
// //     direccionService,
// //     barrioService,
// //     ciudadService,
// //     municipioService,
// //     veredaService,
// //     corregimientoService,
// //     ndapService,
// //     designadorCardinalService,
// //     localizacionService
// // } from '../services/propertyService';

// // const InmuebleDetalle = () => {
// //     const { id } = useParams();
// //     const [property, setProperty] = useState(null);
// //     const [related, setRelated] = useState({});
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);

// //     useEffect(() => {
// //         const fetchAllDetails = async () => {
// //             try {
// //                 // 1. Obtener el inmueble principal
// //                 const res = await inmuebleService.getById(id);
// //                 const inmueble = res.data || res;
// //                 setProperty(inmueble);

// //                 // 2. Obtener datos relacionados usando los FK del inmueble
// //                 const promises = [];
// //                 const keys = [];

// //                 if (inmueble.Tipo_edificacion_FK) {
// //                     promises.push(tipoEdificacionService.getById(inmueble.Tipo_edificacion_FK));
// //                     keys.push('tipoEdificacion');
// //                 }
// //                 if (inmueble.Acerca_edificacion_FK) {
// //                     promises.push(acercaEdificacionService.getById(inmueble.Acerca_edificacion_FK));
// //                     keys.push('acercaEdificacion');
// //                 }
// //                 if (inmueble.Division_FK) {
// //                     promises.push(divisionService.getById(inmueble.Division_FK));
// //                     keys.push('division');
// //                 }
// //                 if (inmueble.Imagenes_inmueble_FK) {
// //                     promises.push(imagenesInmuebleService.getById(inmueble.Imagenes_inmueble_FK));
// //                     keys.push('imagenes');
// //                 }
// //                 if (inmueble.Otras_caracteristicas_FK) {
// //                     promises.push(otrasCaracteristicasService.getById(inmueble.Otras_caracteristicas_FK));
// //                     keys.push('otrasCaracteristicas');
// //                 }
// //                 if (inmueble.Direccion_FK) {
// //                     promises.push(direccionService.getById(inmueble.Direccion_FK));
// //                     keys.push('direccion');
// //                 }
// //                 if (inmueble.Barrio_FK) {
// //                     promises.push(barrioService.getById(inmueble.Barrio_FK));
// //                     keys.push('barrio');
// //                 }
// //                 if (inmueble.Ciudad_FK) {
// //                     promises.push(ciudadService.getById(inmueble.Ciudad_FK));
// //                     keys.push('ciudad');
// //                 }
// //                 if (inmueble.Municipio_FK) {
// //                     promises.push(municipioService.getById(inmueble.Municipio_FK));
// //                     keys.push('municipio');
// //                 }
// //                 if (inmueble.Vereda_FK) {
// //                     promises.push(veredaService.getById(inmueble.Vereda_FK));
// //                     keys.push('vereda');
// //                 }
// //                 if (inmueble.Corregimiento_FK) {
// //                     promises.push(corregimientoService.getById(inmueble.Corregimiento_FK));
// //                     keys.push('corregimiento');
// //                 }
// //                 if (inmueble.NDAP_FK) {
// //                     promises.push(ndapService.getById(inmueble.NDAP_FK));
// //                     keys.push('ndap');
// //                 }
// //                 if (inmueble.Designador_cardinal_FK) {
// //                     promises.push(designadorCardinalService.getById(inmueble.Designador_cardinal_FK));
// //                     keys.push('designadorCardinal');
// //                 }
// //                 if (inmueble.Localizacion_FK) {
// //                     promises.push(localizacionService.getById(inmueble.Localizacion_FK));
// //                     keys.push('localizacion');
// //                 }

// //                 const results = await Promise.all(promises.map(p => p.catch(() => null)));
// //                 const relatedData = {};
// //                 results.forEach((result, idx) => {
// //                     relatedData[keys[idx]] = result?.data || result;
// //                 });
// //                 setRelated(relatedData);

// //                 setLoading(false);
// //             } catch (err) {
// //                 setError('No se pudo cargar la información completa del inmueble');
// //                 setLoading(false);
// //             }
// //         };

// //         fetchAllDetails();
// //     }, [id]);

// //     if (loading) return <Spinner animation="border" />;
// //     if (error) return <Alert variant="danger">{error}</Alert>;
// //     if (!property) return <div>No se encontró el inmueble</div>;

// //     return (
// //         <Container className="mt-4">
// //             <Row>
// //                 <Col md={8}>
// //                     <img
// //                         src={property.imagen || property.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
// //                         alt={property.titulo || property.Descripcion_General || 'Inmueble'}
// //                         className="img-fluid mb-4"
// //                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
// //                     />
// //                 </Col>
// //                 <Col md={4}>
// //                     <Card>
// //                         <Card.Body>
// //                             <Card.Title className="h3 mb-4">{property.titulo || property.Descripcion_General || 'Inmueble'}</Card.Title>
// //                             <Card.Text className="h4 text-primary mb-4">
// //                                 ${property.precio || property.Valor || 'N/D'}
// //                             </Card.Text>
// //                             <ListGroup variant="flush">
// //                                 <ListGroup.Item>
// //                                     <strong>Dirección:</strong> {related.direccion?.completa || property.Direccion || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Barrio:</strong> {related.barrio?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Ciudad:</strong> {related.ciudad?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Municipio:</strong> {related.municipio?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Vereda:</strong> {related.vereda?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Corregimiento:</strong> {related.corregimiento?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>NDAP:</strong> {related.ndap?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>División:</strong> {related.division?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Acerca Edificación:</strong> {related.acercaEdificacion?.descripcion || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Tipo Edificación:</strong> {related.tipoEdificacion?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Imágenes adicionales:</strong>
// //                                     {related.imagenes?.imagenes
// //                                         ? related.imagenes.imagenes.map((img, i) => (
// //                                             <img key={i} src={img.url} alt={`Imagen ${i + 1}`} style={{ width: '100px', marginRight: '8px' }} />
// //                                         ))
// //                                         : 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Otras Características:</strong> {related.otrasCaracteristicas?.descripcion || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Designador Cardinal:</strong> {related.designadorCardinal?.nombre || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Localización:</strong> {related.localizacion?.descripcion || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Habitaciones:</strong> {property.habitaciones || property.num_habitaciones || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Baños:</strong> {property.banos || property.num_baños || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Área:</strong> {property.area || property.Area || 'N/D'} m²
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Garajes:</strong> {property.garajes || property.num_garajes || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Antigüedad:</strong> {property.antiguedad || property.Antiguedad || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Estado:</strong> {property.estado_inmueble || property.Estado || 'N/D'}
// //                                 </ListGroup.Item>
// //                                 <ListGroup.Item>
// //                                     <strong>Código Interno:</strong> {property.codigo_interno || property.Codigo_interno || 'N/D'}
// //                                 </ListGroup.Item>
// //                             </ListGroup>
// //                         </Card.Body>
// //                     </Card>
// //                 </Col>
// //             </Row>
// //             <Row className="mt-4">
// //                 <Col>
// //                     <h4>Descripción</h4>
// //                     <p>{property.descripcion || property.Descripcion_General || 'Sin descripción'}</p>
// //                 </Col>
// //             </Row>
// //         </Container>
// //     );
// // };

// // export default InmuebleDetalle;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
// import { inmuebleService } from '../services/propertyService';

// const InmuebleDetalle = () => {
//     const { id } = useParams();
//     const [property, setProperty] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCompleto = async () => {
//             try {
//                 const response = await inmuebleService.getCompleto(id);
//                 setProperty(response.data || response);
//                 setLoading(false);
//             } catch (err) {
//                 setError('No se pudo cargar la información completa del inmueble');
//                 setLoading(false);
//             }
//         };
//         fetchCompleto();
//     }, [id]);

//     if (loading) return <Spinner animation="border" />;
//     if (error) return <Alert variant="danger">{error}</Alert>;
//     if (!property) return <div>No se encontró el inmueble</div>;

//     const i = property.inmueble || {}; // inmueble principal
//     const r = property; // relaciones

//     return (
//         <Container className="mt-4">
//             <Row>
//                 <Col md={8}>
//                     <img
//                         src={i.imagen || i.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
//                         alt={i.titulo || i.Descripcion_General || 'Inmueble'}
//                         className="img-fluid mb-4"
//                         style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
//                     />
//                 </Col>
//                 <Col md={4}>
//                     <Card>
//                         <Card.Body>
//                             <Card.Title className="h3 mb-4">{i.titulo || i.Descripcion_General || 'Inmueble'}</Card.Title>
//                             <Card.Text className="h4 text-primary mb-4">
//                                 ${i.precio || i.Valor || 'N/D'}
//                             </Card.Text>
//                             <ListGroup variant="flush">
//                                 <ListGroup.Item>
//                                     <strong>Dirección:</strong> {r.direccion?.completa || i.Direccion || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Barrio:</strong> {r.barrio?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Ciudad:</strong> {r.ciudad?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Municipio:</strong> {r.municipio?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Vereda:</strong> {r.vereda?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Corregimiento:</strong> {r.corregimiento?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>NDAP:</strong> {r.ndap?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>División:</strong> {r.division?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Acerca Edificación:</strong> {r.acercaEdificacion?.descripcion || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Tipo Edificación:</strong> {r.tipoEdificacion?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Imágenes adicionales:</strong>
//                                     {r.imagenesInmueble?.imagenes
//                                         ? r.imagenesInmueble.imagenes.map((img, i) => (
//                                             <img key={i} src={img.url} alt={`Imagen ${i + 1}`} style={{ width: '100px', marginRight: '8px' }} />
//                                         ))
//                                         : 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Otras Características:</strong> {r.otrasCaracteristicas?.descripcion || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Designador Cardinal:</strong> {r.designadorCardinal?.nombre || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Localización:</strong> {r.localizacion?.descripcion || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Habitaciones:</strong> {i.habitaciones || i.num_habitaciones || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Baños:</strong> {i.banos || i.num_baños || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Área:</strong> {i.area || i.Area || 'N/D'} m²
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Garajes:</strong> {i.garajes || i.num_garajes || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Antigüedad:</strong> {i.antiguedad || i.Antiguedad || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Estado:</strong> {i.estado_inmueble || i.Estado || 'N/D'}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                     <strong>Código Interno:</strong> {i.codigo_interno || i.Codigo_interno || 'N/D'}
//                                 </ListGroup.Item>
//                             </ListGroup>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             <Row className="mt-4">
//                 <Col>
//                     <h4>Descripción</h4>
//                     <p>{i.descripcion || i.Descripcion_General || 'Sin descripción'}</p>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default InmuebleDetalle;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { inmuebleService } from '../services/propertyService';

const InmuebleDetalle = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompleto = async () => {
            try {
                const response = await inmuebleService.getCompleto(id);
                setProperty(response.data || response);
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar la información completa del inmueble');
                setLoading(false);
            }
        };
        fetchCompleto();
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!property) return <div>No se encontró el inmueble</div>;

    const i = property.inmueble || {};
    const a = property.acercaEdificacion || {};
    const o = property.otrasCaracteristicas || {};
    const d = property.division || {};
    const img = property.imagenesInmueble || {};
    const dir = property.direccion || {};

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <img
                        src={img.URL || i.imagen || i.imagen_destacada || 'https://via.placeholder.com/600x400?text=Sin+Imagen'}
                        alt={img.Nombre || i.titulo || i.Descripcion_General || 'Inmueble'}
                        className="img-fluid mb-4"
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                    />
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="h3 mb-4">{i.Descripcion_General || i.titulo || 'Inmueble'}</Card.Title>
                            <Card.Text className="h4 text-primary mb-4">
                                ${i.Valor || i.precio || 'N/D'}
                            </Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Dirección:</strong> {dir.Direccion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tipo vía:</strong> {dir.Tipo_via || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Número vía principal:</strong> {dir.Numero_via_principal || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Número calle transversal:</strong> {dir.Numero_calle_transversal || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Número edificación:</strong> {dir.Numero_edificacion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Descripción adicional dirección:</strong> {dir.Descripcion_adicional || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Acerca de la Edificación:</strong> {a.AcercaDeLaEdificacion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Estrato:</strong> {a.Estrato || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tipo construcción:</strong> {a.Tipo_construccion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Año construcción:</strong> {a.Anio_construccion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Estado conservación:</strong> {a.Estado_conservacion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Zonas comunes:</strong> {a.Zona_comun || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Descripción adicional edificación:</strong> {a.Descripcion_adicional || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Otras Características:</strong> {o.Caracteristicas_descripcion || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Deposito:</strong> {o.Deposito ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Lavandería:</strong> {o.Lavanderia ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Gas:</strong> {o.Gas ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Piso:</strong> {o.Piso || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Mascotas permitidas:</strong> {o.Mascotas_permitidas ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tipo inmueble:</strong> {o.Tipo_inmueble || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Amoblado:</strong> {o.Amoblado ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Descripción adicional características:</strong> {o.Descripcion_adicional || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>División:</strong> {d.Division || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Balcón:</strong> {d.Balcon || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Baños división:</strong> {d.Baños || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Terraza:</strong> {d.Terraza ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Habitaciones división:</strong> {d.Habitaciones || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Garaje división:</strong> {d.Garaje || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Ascensores:</strong> {d.Ascensores || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Closets:</strong> {d.Closets || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Estudio:</strong> {d.Estudio ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Sala:</strong> {d.Sala ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Comedor:</strong> {d.Comedor ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Cocina:</strong> {d.Cocina || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Zona lavandería:</strong> {d.Zona_lavanderia ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Deposito división:</strong> {d.Deposito ? 'Sí' : 'No'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Descripción adicional división:</strong> {d.Descripcion_adicional || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Imagen principal:</strong> {img.Nombre || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>URL imagen:</strong> {img.URL ? <a href={img.URL} target="_blank" rel="noopener noreferrer">{img.URL}</a> : 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Motivo:</strong> {i.Motivo_VoA || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Situación inmueble:</strong> {i.Situacion_inmueble || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Antigüedad:</strong> {i.Antiguedad || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Estado:</strong> {i.Estado || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Código Interno:</strong> {i.Codigo_interno || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Fecha publicación:</strong> {i.Fecha_publicacion ? new Date(i.Fecha_publicacion).toLocaleDateString() : 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Fecha actualización:</strong> {i.Fecha_actualizacion ? new Date(i.Fecha_actualizacion).toLocaleDateString() : 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Visitas:</strong> {i.Visitas || 'N/D'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Observaciones:</strong> {i.Observaciones || 'N/D'}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Descripción General</h4>
                    <p>{i.Descripcion_General || 'Sin descripción'}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default InmuebleDetalle;