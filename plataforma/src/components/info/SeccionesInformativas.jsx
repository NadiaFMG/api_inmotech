// import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { FaHome, FaHandshake, FaChartLine, FaShieldAlt } from 'react-icons/fa';

// const SeccionesInformativas = () => {
//     return (
//         <Container className="secciones-informativas my-5">
//             <h2 className="text-center mb-5">¿Por qué elegir Inmotech?</h2>
//             <Row>
//                 <Col md={3} className="mb-4">
//                     <Card className="info-card h-100">
//                         <Card.Body className="text-center">
//                             <FaHome className="info-icon mb-3" />
//                             <Card.Title>Amplia Selección</Card.Title>
//                             <Card.Text>
//                                 Encuentra la propiedad perfecta entre nuestra extensa base de datos de inmuebles verificados.
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3} className="mb-4">
//                     <Card className="info-card h-100">
//                         <Card.Body className="text-center">
//                             <FaHandshake className="info-icon mb-3" />
//                             <Card.Title>Proceso Simplificado</Card.Title>
//                             <Card.Text>
//                                 Facilitamos cada paso de tu búsqueda inmobiliaria con herramientas intuitivas y soporte personalizado.
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3} className="mb-4">
//                     <Card className="info-card h-100">
//                         <Card.Body className="text-center">
//                             <FaChartLine className="info-icon mb-3" />
//                             <Card.Title>Información Actualizada</Card.Title>
//                             <Card.Text>
//                                 Accede a datos del mercado en tiempo real y mantente informado sobre las últimas tendencias.
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//                 <Col md={3} className="mb-4">
//                     <Card className="info-card h-100">
//                         <Card.Body className="text-center">
//                             <FaShieldAlt className="info-icon mb-3" />
//                             <Card.Title>Seguridad Garantizada</Card.Title>
//                             <Card.Text>
//                                 Todas nuestras propiedades y transacciones están verificadas para tu tranquilidad.
//                             </Card.Text>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default SeccionesInformativas;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import * as FaIcons from 'react-icons/fa';
import { porqueElegirnosService } from '../../services/api';

const SeccionesInformativas = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const res = await porqueElegirnosService.getAll();
            // Solo activos, ordenados y máximo 20
            const activosOrdenados = res.data
                .filter(item => item.activo)
                .sort((a, b) => Number(a.orden) - Number(b.orden))
                .slice(0, 20);
            setCards(activosOrdenados);
        };
        fetchCards();
    }, []);

    // Renderiza el icono guardado
    const renderIcon = (iconName) => {
        const IconComp = FaIcons[iconName];
        return IconComp ? <IconComp className="info-icon mb-3" /> : null;
    };

    return (
        <Container className="secciones-informativas my-5">
            <h2 className="text-center mb-5">¿Por qué elegir Inmotech?</h2>
            <Row>
                {cards.map(card => (
                    <Col md={3} className="mb-4" key={card.id}>
                        <Card className="info-card h-100">
                            <Card.Body className="text-center">
                                {renderIcon(card.icono)}
                                <Card.Title>{card.titulo}</Card.Title>
                                <Card.Text>{card.descripcion}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SeccionesInformativas;