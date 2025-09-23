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