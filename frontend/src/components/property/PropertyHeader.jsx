import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PropertyHeader = ({ titulo, precio, tipoPropiedad, ubicacion }) => {
    return (
        <Container className="py-4">
            <Row>
                <Col>
                    <h1>{titulo}</h1>
                    <p className="text-muted">{ubicacion}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="text-primary">${precio}</h2>
                        <span className="badge bg-secondary">{tipoPropiedad}</span>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertyHeader;