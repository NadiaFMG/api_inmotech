import React from 'react';
import { Row, Col, Alert, Spinner } from 'react-bootstrap';
import PropertyCard from '../common/PropertyCard';

const ResultadoBusqueda = ({ inmuebles, loading, error, currentUserId }) => {
    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando inmuebles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" className="my-4">
                {error}
            </Alert>
        );
    }

    if (!inmuebles || inmuebles.length === 0) {
        return (
            <Alert variant="info" className="my-4">
                <h5>No se encontraron inmuebles</h5>
                <p>Intenta ajustar tus criterios de búsqueda.</p>
            </Alert>
        );
    }

    return (
        <div className="resultados-busqueda">
            <div className="mb-3">
                <small className="text-muted">
                    {inmuebles.length} inmueble{inmuebles.length !== 1 ? 's' : ''} encontrado{inmuebles.length !== 1 ? 's' : ''}
                </small>
            </div>
            
            <Row>
                {inmuebles.map((inmueble) => (
                    <Col key={inmueble.Inmueble_id || inmueble.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <PropertyCard
                            property={inmueble}
                            isAdminView={false}
                            currentUserId={currentUserId}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ResultadoBusqueda;