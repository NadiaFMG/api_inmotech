import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { REACT_APP_API_BASE_URL } from '../../utils/constants';
import PropertyCard from '../common/PropertyCard';

const ResultadoBusqueda = ({ searchParams }) => {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInmuebles = async () => {
            try {
                let url = `${REACT_APP_API_BASE_URL}/propiedades`;
                if (searchParams) {
                    const params = new URLSearchParams(searchParams);
                    url += `?${params.toString()}`;
                }
                const response = await axios.get(url);
                setInmuebles(response.data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los inmuebles');
                setLoading(false);
            }
        };

        fetchInmuebles();
    }, [searchParams]);

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
                {searchParams ? 'Resultados de búsqueda' : 'Todos los inmuebles'}
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