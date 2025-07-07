import React, { useState } from 'react';
import { Form, Row, Col, Button, Card } from 'react-bootstrap';

const DetailedSearchForm = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        tipoPropiedad: '',
        precioMin: '',
        precioMax: '',
        habitaciones: '',
        banos: '',
        areaMin: '',
        areaMax: '',
        ubicacion: '',
        tipoOperacion: '',
        caracteristicas: [],
        servicios: []
    });

    const caracteristicasOpciones = [
        'Garaje', 'Piscina', 'Jardín', 'Terraza', 
        'Balcón', 'Seguridad 24/7', 'Amueblado'
    ];

    const serviciosOpciones = [
        'Agua', 'Luz', 'Gas', 'Internet', 
        'Cable TV', 'Aire Acondicionado', 'Calefacción'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    const handleCheckboxChange = (field, value) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(item => item !== value)
                : [...prev[field], value]
        }));
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Propiedad</Form.Label>
                                <Form.Select
                                    value={searchParams.tipoPropiedad}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        tipoPropiedad: e.target.value
                                    })}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="casa">Casa</option>
                                    <option value="apartamento">Apartamento</option>
                                    <option value="local">Local Comercial</option>
                                    <option value="oficina">Oficina</option>
                                    <option value="terreno">Terreno</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tipo de Operación</Form.Label>
                                <Form.Select
                                    value={searchParams.tipoOperacion}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        tipoOperacion: e.target.value
                                    })}
                                >
                                    <option value="">Seleccionar...</option>
                                    <option value="venta">Venta</option>
                                    <option value="alquiler">Alquiler</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio Mínimo</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={searchParams.precioMin}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        precioMin: e.target.value
                                    })}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Precio Máximo</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={searchParams.precioMax}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        precioMax: e.target.value
                                    })}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Habitaciones</Form.Label>
                                <Form.Select
                                    value={searchParams.habitaciones}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        habitaciones: e.target.value
                                    })}
                                >
                                    <option value="">Cualquiera</option>
                                    {[1,2,3,4,5].map(num => (
                                        <option key={num} value={num}>{num}+ Habitaciones</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Baños</Form.Label>
                                <Form.Select
                                    value={searchParams.banos}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        banos: e.target.value
                                    })}
                                >
                                    <option value="">Cualquiera</option>
                                    {[1,2,3,4].map(num => (
                                        <option key={num} value={num}>{num}+ Baños</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={4}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ubicación</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={searchParams.ubicacion}
                                    onChange={(e) => setSearchParams({
                                        ...searchParams,
                                        ubicacion: e.target.value
                                    })}
                                    placeholder="Ciudad, Zona, Barrio..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Label>Características</Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {caracteristicasOpciones.map(caract => (
                                    <Form.Check
                                        key={caract}
                                        type="checkbox"
                                        label={caract}
                                        checked={searchParams.caracteristicas.includes(caract)}
                                        onChange={() => handleCheckboxChange('caracteristicas', caract)}
                                    />
                                ))}
                            </div>
                        </Col>

                        <Col md={6}>
                            <Form.Label>Servicios</Form.Label>
                            <div className="d-flex flex-wrap gap-2">
                                {serviciosOpciones.map(servicio => (
                                    <Form.Check
                                        key={servicio}
                                        type="checkbox"
                                        label={servicio}
                                        checked={searchParams.servicios.includes(servicio)}
                                        onChange={() => handleCheckboxChange('servicios', servicio)}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>

                    <div className="text-center">
                        <Button type="submit" variant="primary" size="lg">
                            Buscar Inmuebles
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default DetailedSearchForm;