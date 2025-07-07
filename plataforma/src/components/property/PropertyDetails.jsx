import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaBed, FaBath, FaRuler, FaCar, FaSwimmingPool, FaTree } from 'react-icons/fa';

const PropertyDetails = ({ detalles }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <h3 className="mb-4">Características</h3>
                <Row>
                    <Col md={4} className="mb-3">
                        <div className="d-flex align-items-center">
                            <FaBed className="me-2" />
                            <span>{detalles.habitaciones} Habitaciones</span>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="d-flex align-items-center">
                            <FaBath className="me-2" />
                            <span>{detalles.banos} Baños</span>
                        </div>
                    </Col>
                    <Col md={4} className="mb-3">
                        <div className="d-flex align-items-center">
                            <FaRuler className="me-2" />
                            <span>{detalles.area} m²</span>
                        </div>
                    </Col>
                    {detalles.garaje && (
                        <Col md={4} className="mb-3">
                            <div className="d-flex align-items-center">
                                <FaCar className="me-2" />
                                <span>Garaje</span>
                            </div>
                        </Col>
                    )}
                    {detalles.piscina && (
                        <Col md={4} className="mb-3">
                            <div className="d-flex align-items-center">
                                <FaSwimmingPool className="me-2" />
                                <span>Piscina</span>
                            </div>
                        </Col>
                    )}
                    {detalles.jardin && (
                        <Col md={4} className="mb-3">
                            <div className="d-flex align-items-center">
                                <FaTree className="me-2" />
                                <span>Jardín</span>
                            </div>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    );
};

export default PropertyDetails;