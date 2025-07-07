import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import propertyService from '../services/propertyService';

const InmuebleDetalle = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            try {
                const response = await propertyService.getPropertyById(id);
                console.log('Detalles de propiedad:', response);
                setProperty(response);
                setLoading(false);
            } catch (error) {
                console.error('Error al cargar los detalles:', error);
                setError('No se pudo cargar la información del inmueble');
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    if (loading) return <div>Cargando detalles...</div>;
    if (error) return <div>{error}</div>;
    if (!property) return <div>No se encontró el inmueble</div>;

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8}>
                    <img 
                        src={property.imagen} 
                        alt={property.titulo}
                        className="img-fluid mb-4"
                        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
                    />
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="h3 mb-4">{property.titulo}</Card.Title>
                            <Card.Text className="h4 text-primary mb-4">
                                ${property.precio}
                            </Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Ubicación:</strong> {property.ubicacion}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Tipo:</strong> {property.tipoPropiedad}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Habitaciones:</strong> {property.habitaciones}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Baños:</strong> {property.banos}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Área:</strong> {property.area} m²
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Garajes:</strong> {property.garajes}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <h4>Descripción</h4>
                    <p>{property.descripcion}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default InmuebleDetalle;