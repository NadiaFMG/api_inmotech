import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaChartBar } from 'react-icons/fa';

const AdminLayout = () => {
    const location = useLocation();

    const adminMenuItems = [
        { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
        { path: '/admin/inmuebles', icon: <FaBuilding />, label: 'Inmuebles' },
        { path: '/admin/visualizaciones', icon: <FaChartBar />, label: 'Visualizaciones' }
    ];

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="admin-layout">
            <Row className="g-0">
                <Col md={2} className="bg-dark min-vh-100">
                    <Nav className="flex-column p-3">
                        <div className="text-white mb-4">
                            <h4>InmoTech Admin</h4>
                        </div>
                        {adminMenuItems.map((item) => (
                            <Nav.Link 
                                key={item.path}
                                as={Link} 
                                to={item.path}
                                className={`text-white ${isActive(item.path) ? 'active' : ''}`}
                            >
                                <span className="me-2">{item.icon}</span>
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Col>
                <Col md={10}>
                    <Container fluid className="p-4">
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLayout;