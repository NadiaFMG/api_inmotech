import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaImages, FaQuestionCircle, FaUsers, FaFileContract, FaThumbsUp, FaShieldAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../styles/admin.css';

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
    icon: <FaUsers size={32} color="#F18F8FFF" />,
    path: '/admin/sobrenosotros'
  },
  {
    title: 'Administración de Términos y Condiciones',
    icon: <FaFileContract size={32} color="#fd7e14" />,
    path: '/admin/terminosycondiciones'
  },
  {
    title: 'Administración Porque Elegirnos',
    icon: <FaThumbsUp size={32} color="#15D0ECFF" />,
    path: '/admin/porqueelegirnos'
  },
  {
    title: 'Administración Política de Privacidad',
    icon: <FaShieldAlt size={32} color="#ffc107" />,
    path: '/admin/politicadeprivacidad'
  }
];

// Divide el array en chunks de 3
function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const AdminTable = () => {
  const navigate = useNavigate();
  const rows = chunkArray(adminCards, 3);

  return (
    <div className='ancho-admin'>
      {/* {rows.map((row, rowIdx) => (
        <Row className="g-4 justify-content-center hg-4" key={rowIdx}>
          {row.map((card, idx) => (
            <Col
              key={idx}
              xs={12}   // 1 columna en móvil
              sm={6}    // 2 columnas en tablet y pantallas medianas
              md={6}    // 2 columnas en pantallas medianas (>=768px)
              lg={4}    // 3 columnas en pantallas grandes (>=992px)
              className="d-flex justify-content-center"
            >
              <Card
                className="admin-dashboard-card shadow-sm admin-card-hover"
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => navigate(card.path)}
              >
                <Card.Body className="d-flex flex-column align-items-center justify-content-center p-3">
                  <div className="mb-2">{card.icon}</div>
                  <Card.Title className="text-center" style={{ fontSize: '1.05rem', fontWeight: 600 }}>
                    {card.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ))} */}
    </div>
  );
};

export default AdminTable;