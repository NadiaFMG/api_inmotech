import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHome, FaHandshake, FaChartLine, FaShieldAlt } from 'react-icons/fa';

const SeccionesInformativas = () => {
    return (
        <Container className="secciones-informativas my-5">
            <h2 className="text-center mb-5">¿Por qué elegir Inmotech?</h2>
            <Row>
                <Col md={3} className="mb-4">
                    <Card className="info-card h-100">
                        <Card.Body className="text-center">
                            <FaHome className="info-icon mb-3" />
                            <Card.Title>Amplia Selección</Card.Title>
                            <Card.Text>
                                Encuentra la propiedad perfecta entre nuestra extensa base de datos de inmuebles verificados.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card className="info-card h-100">
                        <Card.Body className="text-center">
                            <FaHandshake className="info-icon mb-3" />
                            <Card.Title>Proceso Simplificado</Card.Title>
                            <Card.Text>
                                Facilitamos cada paso de tu búsqueda inmobiliaria con herramientas intuitivas y soporte personalizado.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card className="info-card h-100">
                        <Card.Body className="text-center">
                            <FaChartLine className="info-icon mb-3" />
                            <Card.Title>Información Actualizada</Card.Title>
                            <Card.Text>
                                Accede a datos del mercado en tiempo real y mantente informado sobre las últimas tendencias.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} className="mb-4">
                    <Card className="info-card h-100">
                        <Card.Body className="text-center">
                            <FaShieldAlt className="info-icon mb-3" />
                            <Card.Title>Seguridad Garantizada</Card.Title>
                            <Card.Text>
                                Todas nuestras propiedades y transacciones están verificadas para tu tranquilidad.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default SeccionesInformativas;