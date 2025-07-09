import React, { useEffect, useState } from 'react';
import { Container, Card, Spinner, Alert } from 'react-bootstrap';
import { terminosService } from '../services/api';

const TerminosCondiciones = () => {
    const [terminos, setTerminos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTerminos = async () => {
            try {
                const res = await terminosService.getAll();
                setTerminos(res.data);
            } catch (err) {
                setError('Error al cargar los términos y condiciones');
            } finally {
                setLoading(false);
            }
        };
        fetchTerminos();
    }, []);

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Términos y Condiciones</h1>
            {loading && <Spinner animation="border" className="d-block mx-auto" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {terminos.map((item) => (
                <Card className="mb-4" key={item.id || item.Terminos_id}>
                    <Card.Body>
                        <h2>{item.titulo}</h2>
                        <p>{item.descripcion}</p>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default TerminosCondiciones;