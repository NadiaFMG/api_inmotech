import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useState({
        ubicacion: '',
        tipoPropiedad: '',
        tipoOperacion: '',
        precioMin: '',
        precioMax: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchParams);
    };

    return (
        <Container className="search-container my-4">
            <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md={2}>
                        <Form.Select
                            name="tipoOperacion"
                            value={searchParams.tipoOperacion}
                            onChange={handleChange}
                        >
                            <option value="">Tipo de Operación</option>
                            <option value="venta">Venta</option>
                            <option value="arriendo">Arriendo</option>
                            <option value="arriendo_temporal">Arriendo Temporal</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="text"
                            placeholder="Ubicación"
                            name="ubicacion"
                            value={searchParams.ubicacion}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Select
                            name="tipoPropiedad"
                            value={searchParams.tipoPropiedad}
                            onChange={handleChange}
                        >
                            <option value="">Tipo de Propiedad</option>
                            <option value="casa">Casa</option>
                            <option value="apartamento">Apartamento</option>
                            <option value="local">Local Comercial</option>
                            <option value="terreno">Terreno</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Precio Mínimo"
                            name="precioMin"
                            value={searchParams.precioMin}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Form.Control
                            type="number"
                            placeholder="Precio Máximo"
                            name="precioMax"
                            value={searchParams.precioMax}
                            onChange={handleChange}
                        />
                    </Col>
                    <Col md={2}>
                        <Button type="submit" variant="primary" className="w-100">
                            Buscar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default SearchBar;