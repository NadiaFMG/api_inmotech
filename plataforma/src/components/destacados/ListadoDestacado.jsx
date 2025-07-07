import React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import PropertyCard from '../common/PropertyCard';

const ListadoDestacado = ({ properties, loading }) => {
    if (loading) {
        return (
            <section className="listado-destacado">
                <h2>Propiedades Destacadas</h2>
                <div className="text-center">Cargando propiedades...</div>
            </section>
        );
    }

    // Verificar si hay propiedades
    if (!properties || properties.length === 0) {
        return (
            <section className="listado-destacado">
                <h2>Propiedades Destacadas</h2>
                <Alert variant="info">
                    No hay propiedades disponibles en este momento.
                </Alert>
            </section>
        );
    }

    return (
        <section className="listado-destacado">
            <h2>Propiedades Destacadas</h2>
            <Row>
                {properties.map(property => (
                    <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                        <PropertyCard 
                            property={property}
                            isAdminView={false}
                        />
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default ListadoDestacado;