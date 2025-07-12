import React from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import PropertyCard from '../common/PropertyCard';

const ResultadoBusqueda = ({ inmuebles, loading, error }) => {
    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center my-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    if (!inmuebles || inmuebles.length === 0) {
        return (
            <Container className="text-center my-5">
                <Alert variant="info">No se encontraron inmuebles con los criterios especificados.</Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="mb-4">
                Resultados de búsqueda
                <span className="text-muted ms-2">({inmuebles.length} encontrados)</span>
            </h2>
            <Row>
                {inmuebles.map((inmueble) => (
                    <Col key={inmueble._id || inmueble.id} xs={12} md={6} lg={4} className="mb-4">
                        <PropertyCard 
                            property={inmueble}
                            isAdminView={false}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ResultadoBusqueda;