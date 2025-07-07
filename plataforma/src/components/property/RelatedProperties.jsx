import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RelatedProperties = ({ inmuebles }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <h3 className="mb-4">Inmuebles Relacionados</h3>
                <Row>
                    {inmuebles.map(inmueble => (
                        <Col key={inmueble.id} md={4} className="mb-3">
                            <Card>
                                <Card.Img 
                                    variant="top" 
                                    src={inmueble.imagen_principal}
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <Card.Body>
                                    <Card.Title>{inmueble.titulo}</Card.Title>
                                    <Card.Text>
                                        <strong>Precio: </strong>${inmueble.precio}<br/>
                                        <strong>Ubicación: </strong>{inmueble.ubicacion}
                                    </Card.Text>
                                    <Link 
                                        to={`/inmueble/${inmueble.id}`}
                                        className="btn btn-primary btn-sm w-100"
                                    >
                                        Ver Detalles
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default RelatedProperties;