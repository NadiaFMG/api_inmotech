import React, { useState } from 'react';
import { Accordion, Form, Row, Col, Button } from 'react-bootstrap';

const OpcionesFiltradoAvanzado = ({ onFilter }) => {
    const [filtros, setFiltros] = useState({
        habitaciones: '',
        banos: '',
        areaMin: '',
        areaMax: '',
        garaje: false,
        piscina: false,
        jardin: false,
        amoblado: false,
        antiguedad: '',
        estrato: '',
        serviciosIncluidos: false,
        seguridadPrivada: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filtros);
    };

    return (
        <Accordion className="mb-4">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Filtros Avanzados</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Habitaciones</Form.Label>
                                    <Form.Select 
                                        name="habitaciones"
                                        value={filtros.habitaciones}
                                        onChange={handleChange}
                                    >
                                        <option value="">Cualquiera</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                        <option value="5">5+</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Baños</Form.Label>
                                    <Form.Select
                                        name="banos"
                                        value={filtros.banos}
                                        onChange={handleChange}
                                    >
                                        <option value="">Cualquiera</option>
                                        <option value="1">1+</option>
                                        <option value="2">2+</option>
                                        <option value="3">3+</option>
                                        <option value="4">4+</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Área Mínima (m²)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="areaMin"
                                        value={filtros.areaMin}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Área Máxima (m²)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="areaMax"
                                        value={filtros.areaMax}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Antigüedad</Form.Label>
                                    <Form.Select
                                        name="antiguedad"
                                        value={filtros.antiguedad}
                                        onChange={handleChange}
                                    >
                                        <option value="">Cualquiera</option>
                                        <option value="nuevo">Nuevo</option>
                                        <option value="0-5">0-5 años</option>
                                        <option value="5-10">5-10 años</option>
                                        <option value="10+">Más de 10 años</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md={3}>
                                <Form.Group>
                                    <Form.Label>Estrato</Form.Label>
                                    <Form.Select
                                        name="estrato"
                                        value={filtros.estrato}
                                        onChange={handleChange}
                                    >
                                        <option value="">Cualquiera</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Garaje"
                                    name="garaje"
                                    checked={filtros.garaje}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Piscina"
                                    name="piscina"
                                    checked={filtros.piscina}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Jardín"
                                    name="jardin"
                                    checked={filtros.jardin}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Amoblado"
                                    name="amoblado"
                                    checked={filtros.amoblado}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Servicios Incluidos"
                                    name="serviciosIncluidos"
                                    checked={filtros.serviciosIncluidos}
                                    onChange={handleChange}
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Check
                                    type="checkbox"
                                    label="Seguridad Privada"
                                    name="seguridadPrivada"
                                    checked={filtros.seguridadPrivada}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>

                        <Button type="submit" variant="primary">
                            Aplicar Filtros
                        </Button>
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default OpcionesFiltradoAvanzado;