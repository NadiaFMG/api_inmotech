import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchFilter = ({ filters, onFilterChange }) => {
    return (
        <Form className="mb-4">
            <Row>
                <Col md={4}>
                    <InputGroup>
                        <InputGroup.Text>
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar por título..."
                            value={filters.search}
                            onChange={(e) => onFilterChange('search', e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filters.estado}
                        onChange={(e) => onFilterChange('estado', e.target.value)}
                    >
                        <option value="">Estado</option>
                        <option value="Publicado">Publicado</option>
                        <option value="No Publicado">No Publicado</option>
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select
                        value={filters.tipo}
                        onChange={(e) => onFilterChange('tipo', e.target.value)}
                    >
                        <option value="">Tipo de Propiedad</option>
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Local">Local</option>
                    </Form.Select>
                </Col>
            </Row>
        </Form>
    );
};

export default SearchFilter;