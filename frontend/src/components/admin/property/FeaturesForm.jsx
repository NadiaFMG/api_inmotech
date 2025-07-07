import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FeaturesForm = ({ formData, onChange }) => {
    return (
        <div className="mb-4">
            <h4 className="mb-3">Características</h4>
            <Row>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Habitaciones</Form.Label>
                        <Form.Control
                            type="number"
                            name="habitaciones"
                            value={formData.habitaciones}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Baños</Form.Label>
                        <Form.Control
                            type="number"
                            name="banos"
                            value={formData.banos}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Área (m²)</Form.Label>
                        <Form.Control
                            type="number"
                            name="area"
                            value={formData.area}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group className="mb-3">
                        <Form.Label>Garajes</Form.Label>
                        <Form.Control
                            type="number"
                            name="garajes"
                            value={formData.garajes}
                            onChange={onChange}
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Características Adicionales</Form.Label>
                        <div className="d-flex flex-wrap gap-3">
                            {['Piscina', 'Jardín', 'Terraza', 'Seguridad 24/7'].map(feature => (
                                <Form.Check
                                    key={feature}
                                    type="checkbox"
                                    label={feature}
                                    name={`caracteristicas.${feature}`}
                                    checked={formData.caracteristicas?.includes(feature)}
                                    onChange={(e) => onChange(e, 'caracteristicas')}
                                />
                            ))}
                        </div>
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default FeaturesForm;