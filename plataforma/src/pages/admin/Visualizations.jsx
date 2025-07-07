import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Alert } from 'react-bootstrap';
import ViewsList from '../../components/admin/visualizations/ViewsList';
import ViewsStats from '../../components/admin/visualizations/ViewsStats';

const Visualizations = () => {
    const [dateRange, setDateRange] = useState('week');
    const [views, setViews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulated data for testing
        const mockViews = [
            {
                userName: 'Juan Pérez',
                propertyTitle: 'Casa Moderna en Centro',
                date: '2024-01-25T14:30:00',
                duration: 15,
                device: 'Desktop',
                completed: true
            },
            {
                userName: 'María García',
                propertyTitle: 'Apartamento con Vista',
                date: '2024-01-25T16:45:00',
                duration: 8,
                device: 'Mobile',
                completed: false
            }
        ];

        try {
            setViews(mockViews);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar las visualizaciones');
            setLoading(false);
        }
    }, [dateRange]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container fluid>
            <h2 className="mb-4">Visualizaciones</h2>
            
            <Row className="mb-4">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Periodo</Form.Label>
                        <Form.Select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="week">Última Semana</option>
                            <option value="month">Último Mes</option>
                            <option value="year">Último Año</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>

            {views.length > 0 ? (
                <ViewsList views={views} />
            ) : (
                <Alert variant="info">No hay visualizaciones para mostrar</Alert>
            )}
        </Container>
    );
};

export default Visualizations;