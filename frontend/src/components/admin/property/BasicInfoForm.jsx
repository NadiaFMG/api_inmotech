import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const BasicInfoForm = ({ formData, onChange }) => {
    return (
        <div className="mb-4">
            <h4 className="mb-3">Información Básica</h4>
            <Row>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="titulo"
                            value={formData.titulo}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tipo de Propiedad</Form.Label>
                        <Form.Select
                            name="tipoPropiedad"
                            value={formData.tipoPropiedad}
                            onChange={onChange}
                            required
                        >
                            <option value="">Seleccionar...</option>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="local">Local Comercial</option>
                            <option value="terreno">Terreno</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            name="precio"
                            value={formData.precio}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={onChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    );
};

export default BasicInfoForm;