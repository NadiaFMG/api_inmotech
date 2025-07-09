import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { politicaService } from '../services/api';

const PoliticaPrivacidad = () => {
    const [politicas, setPoliticas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPoliticas = async () => {
            try {
                const res = await politicaService.getAll();
                setPoliticas(res.data);
            } catch (err) {
                setError('Error al cargar la política de privacidad');
            } finally {
                setLoading(false);
            }
        };
        fetchPoliticas();
    }, []);

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Política de Privacidad</h1>
            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {politicas.map((item) => (
                <Card className="mb-4" key={item.id || item.Politica_id}>
                    <Card.Body>
                        <h2 className="text-center mb-4">{item.titulo}</h2>
                        <div dangerouslySetInnerHTML={{ __html: item.descripcion }} />
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default PoliticaPrivacidad;