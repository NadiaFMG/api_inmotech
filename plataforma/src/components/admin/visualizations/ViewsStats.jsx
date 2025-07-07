import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ViewsStats = ({ stats }) => {
    const lineChartData = {
        labels: stats.dates,
        datasets: [{
            label: 'Visualizaciones Diarias',
            data: stats.dailyViews,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const barChartData = {
        labels: stats.properties,
        datasets: [{
            label: 'Visualizaciones por Inmueble',
            data: stats.propertyViews,
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
        }]
    };

    return (
        <div className="mb-4">
            <h4>Estadísticas de Visualizaciones</h4>
            <Row className="mb-4">
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6>Total Visualizaciones</h6>
                            <h3>{stats.totalViews}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6>Visitantes Únicos</h6>
                            <h3>{stats.uniqueVisitors}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6>Tiempo Promedio</h6>
                            <h3>{stats.avgTime} min</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <h6>Tasa de Conversión</h6>
                            <h3>{stats.conversionRate}%</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Line data={lineChartData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Bar data={barChartData} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ViewsStats;