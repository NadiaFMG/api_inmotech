import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import FormularioContacto from '../components/contact/FormularioContacto';

const Contacto = () => {
    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Contáctanos</h1>
            
            <Row className="mb-4">
                <Col md={6} lg={3} className="mb-3">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <FaPhone className="text-primary mb-3" size={30} />
                            <h4>Teléfono</h4>
                            <p className="mb-0">+57 123 456 7890</p>
                            <p>+57 098 765 4321</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className="mb-3">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <FaEnvelope className="text-primary mb-3" size={30} />
                            <h4>Email</h4>
                            <p className="mb-0">info@inmotech.com</p>
                            <p>ventas@inmotech.com</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className="mb-3">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <FaMapMarkerAlt className="text-primary mb-3" size={30} />
                            <h4>Ubicación</h4>
                            <p className="mb-0">Calle Principal #123</p>
                            <p>Ciudad, País</p>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6} lg={3} className="mb-3">
                    <Card className="h-100 text-center">
                        <Card.Body>
                            <FaClock className="text-primary mb-3" size={30} />
                            <h4>Horario</h4>
                            <p className="mb-0">Lun - Vie: 9:00 - 18:00</p>
                            <p>Sáb: 9:00 - 13:00</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <FormularioContacto />
                </Col>
                <Col md={6}>
                    <Card className="h-100">
                        <Card.Body>
                            <h3 className="mb-4">Nuestra Ubicación</h3>
                            <div className="embed-responsive embed-responsive-16by9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1000.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM0"
                                    width="100%"
                                    height="450"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Contacto;