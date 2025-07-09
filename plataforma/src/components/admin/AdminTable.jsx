import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaImages, FaQuestionCircle, FaUsers, FaFileContract, FaThumbsUp, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const adminCards = [
  {
    title: 'Administración de Carrusel',
    icon: <FaImages size={32} color="#007bff" />,
    path: '/admin/carrusel'
  },
  {
    title: 'Administración de Preguntas Frecuentes',
    icon: <FaQuestionCircle size={32} color="#28a745" />,
    path: '/admin/preguntasfrecuentes'
  },
  {
    title: 'Administración de Sobre Nosotros',
    icon: <FaUsers size={32} color="#6f42c1" />,
    path: '/admin/sobrenosotros'
  },
  {
    title: 'Administración de Términos y Condiciones',
    icon: <FaFileContract size={32} color="#fd7e14" />,
    path: '/admin/terminosycondiciones'
  },
  {
    title: 'Administración Porque Elegirnos',
    icon: <FaThumbsUp size={32} color="#17a2b8" />,
    path: '/admin/porqueelegirnos'
  },
  {
    title: 'Administración Política de Privacidad',
    icon: <FaShieldAlt size={32} color="#ffc107" />,
    path: '/admin/politicadeprivacidad'
  }
];

const AdminTable = () => {
  const navigate = useNavigate();
  return (
    <Row className="g-4">
      {adminCards.map((card, idx) => (
        <Col key={idx} md={4} sm={6} xs={12}>
          <Card
            className="h-100 shadow-sm admin-card-hover"
            style={{ cursor: 'pointer', minHeight: 140 }}
            onClick={() => navigate(card.path)}
          >
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <div className="mb-2">{card.icon}</div>
              <Card.Title className="text-center" style={{ fontSize: '1.1rem', fontWeight: 600 }}>{card.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AdminTable;