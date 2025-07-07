import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaHome, FaEye, FaDollarSign } from 'react-icons/fa';

const DashboardSummary = () => {
    return (
        <Row>
            <Col md={4}>
                <Card className="mb-4">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Total Propiedades</h6>
                                <h3>150</h3>
                            </div>
                            <FaHome className="text-primary" size={30} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="mb-4">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Visitas Recientes</h6>
                                <h3>1,234</h3>
                            </div>
                            <FaEye className="text-success" size={30} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className="mb-4">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 className="text-muted">Ingresos Mensuales</h6>
                                <h3>$25,000</h3>
                            </div>
                            <FaDollarSign className="text-warning" size={30} />
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default DashboardSummary;