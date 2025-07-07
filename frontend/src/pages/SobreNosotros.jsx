import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBuilding, FaHandshake, FaChartLine, FaUsers } from 'react-icons/fa';

const SobreNosotros = () => {
    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Sobre Nosotros</h1>
            
            <Row className="mb-4">
                <Col lg={6}>
                    <div className="mb-4">
                        <h2>Nuestra Historia</h2>
                        <p>InmoTech nació con la visión de revolucionar el mercado inmobiliario, combinando la experiencia en bienes raíces con la tecnología más avanzada para ofrecer un servicio excepcional.</p>
                    </div>
                    <div>
                        <h2>Nuestra Misión</h2>
                        <p>Facilitar el proceso de búsqueda y gestión de propiedades, brindando una plataforma intuitiva y segura que conecte a propietarios con potenciales compradores o inquilinos.</p>
                    </div>
                </Col>
                <Col lg={6}>
                    <img 
                        src="/images/about-us.jpg" 
                        alt="Equipo InmoTech" 
                        className="img-fluid rounded shadow"
                    />
                </Col>
            </Row>

            <h2 className="text-center mb-4">¿Por qué elegirnos?</h2>
            <Row>
                {[
                    {
                        icon: <FaBuilding />,
                        title: "Amplia Selección",
                        text: "Miles de propiedades verificadas disponibles"
                    },
                    {
                        icon: <FaHandshake />,
                        title: "Confiabilidad",
                        text: "Transacciones seguras y transparentes"
                    },
                    {
                        icon: <FaChartLine />,
                        title: "Innovación",
                        text: "Tecnología de punta en el sector inmobiliario"
                    },
                    {
                        icon: <FaUsers />,
                        title: "Soporte",
                        text: "Equipo profesional a tu disposición"
                    }
                ].map((item, index) => (
                    <Col md={3} key={index} className="mb-4">
                        <Card className="h-100 text-center">
                            <Card.Body>
                                <div className="text-primary mb-3 fs-1">
                                    {item.icon}
                                </div>
                                <h4>{item.title}</h4>
                                <p className="mb-0">{item.text}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SobreNosotros;