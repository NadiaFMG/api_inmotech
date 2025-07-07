import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-auto">
            <Container>
                <Row className="mb-4">
                    <Col md={4}>
                        <h5>InmoTech</h5>
                        <p>Tu mejor opción en bienes raíces</p>
                        <div className="social-icons">
                            <a href="#" className="me-3"><FaFacebook /></a>
                            <a href="#" className="me-3"><FaTwitter /></a>
                            <a href="#" className="me-3"><FaInstagram /></a>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h5>Enlaces Útiles</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/terminoscondiciones" className="text-light">Términos y Condiciones</Link></li>
                            <li><Link to="/politicaprivacidad" className="text-light">Política de Privacidad</Link></li>
                            <li><Link to="/faq" className="text-light">Preguntas Frecuentes</Link></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contacto</h5>
                        <p>Email: contacto@inmotech.com</p>
                        <p>Teléfono: (123) 456-7890</p>
                        <p>Dirección: Calle Principal #123</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center border-top pt-3">
                        <small>&copy; {new Date().getFullYear()} InmoTech. Todos los derechos reservados.</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;