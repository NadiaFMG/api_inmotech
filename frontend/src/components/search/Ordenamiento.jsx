import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Ordenamiento = ({ onSort }) => {
    const handleChange = (e) => {
        const [campo, orden] = e.target.value.split('-');
        onSort({ campo, orden });
    };

    return (
        <Row className="mb-4 align-items-center">
            <Col xs={12} md={3} className="ms-auto">
                <Form.Group>
                    <Form.Select onChange={handleChange} defaultValue="">
                        <option value="">Ordenar por...</option>
                        <option value="precio-asc">Precio: Menor a Mayor</option>
                        <option value="precio-desc">Precio: Mayor a Menor</option>
                        <option value="fecha-desc">Más Recientes</option>
                        <option value="fecha-asc">Más Antiguos</option>
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
    );
};

export default Ordenamiento;