import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    console.log('PropertyCard recibió:', property); // Para debug
    
    return (
        <Col md={4} className="mb-4">
            <Card>
                <Card.Img 
                    variant="top" 
                    src={property.imagen || 'https://via.placeholder.com/300x200'} 
                    alt={property.titulo}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                    <Card.Title>{property.titulo}</Card.Title>
                    <Card.Text>
                        <strong>Precio:</strong> ${property.precio}<br/>
                        <strong>Ubicación:</strong> {property.ubicacion}<br/>
                        <strong>Tipo:</strong> {property.tipoPropiedad}<br/>
                        <strong>Habitaciones:</strong> {property.habitaciones}<br/>
                        <strong>Baños:</strong> {property.banos}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button 
                            as={Link} 
                            to={`/propiedad/${property._id}`} 
                            variant="primary"
                        >
                            Ver Detalles
                        </Button>
                        {/* Botones de administración */}
                        <div>
                            <Button 
                                variant="info" 
                                size="sm" 
                                className="me-2"
                                as={Link}
                                to={`/admin/editar-propiedad/${property._id}`}
                            >
                                Editar
                            </Button>
                            <Button 
                                variant="danger" 
                                size="sm"
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default PropertyCard;