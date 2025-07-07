import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isAdminView }) => {
    console.log('Property data received:', property); // Debug log

    return (
        <Card className="h-100">
            <Card.Img 
                variant="top" 
                src={property.imagen} 
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
                    <strong>Baños:</strong> {property.banos}<br/>
                    <strong>Área:</strong> {property.area} m²
                </Card.Text>
                {isAdminView ? (
                    <div className="d-flex justify-content-between">
                        <Button 
                            as={Link} 
                            to={`/admin/inmuebles/editar/${property._id}`}
                            variant="info"
                            size="sm"
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
                ) : (
                    <Button 
                        as={Link} 
                        to={`/inmueble/${property._id}`}
                        variant="primary"
                    >
                        Ver Detalles
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default PropertyCard;