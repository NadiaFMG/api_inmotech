import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaHome, FaBuilding, FaChartBar, FaRegUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import '../../styles/AdminLayout.css';

// Hook para detectar si es móvil
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
};

const AdminLayout = () => {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (!isMobile) setMenuOpen(false);
    }, [isMobile]);

    const adminMenuItems = [
        { path: '/admin', icon: <FaHome />, label: 'Dashboard' },
        { path: '/admin/inmuebles', icon: <FaBuilding />, label: 'Inmuebles' },
        { path: '/admin/visualizaciones', icon: <FaChartBar />, label: 'Visualizaciones' },
        { path: '/admin/usuarios', icon: <FaRegUser />, label: 'Usuarios' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="admin-layout">
            <Row className="g-0 hheight">
                <Col className="bg-menu hheight1" style={{ flex: '0 0 240px', maxWidth: '240px' }}>
                    <Nav className="flex-column p-3 c">
                        <div className="text-white mb-4 profile d-flex flex-column align-items-center">
                            <h4 id='titulomenu'>InmoTech Admin</h4>
                            <img
                                src="/assets/images/logo/logo_200x200.png"
                                alt="Perfil"
                                className="img-perfil"
                            />
                            <button
                                className="boton-stilo boton-ver-perfil mt-3"
                                onClick={() => window.location.href = '/admin/perfil'}
                            >
                                Ver perfil
                            </button>
                            {/* Flecha solo en móvil */}
                            {isMobile && (
                                <button
                                    className="menu-toggle-btn"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-label="Mostrar menú"
                                >
                                    {menuOpen ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                            )}
                        </div>
                        {/* Menú solo visible en desktop o si está abierto en móvil */}
                        <div className={`admin-menu-links${isMobile ? (menuOpen ? ' open' : ' closed') : ''}`}>
                            {adminMenuItems.map((item) => (
                                <Nav.Link
                                    key={item.path}
                                    as={Link}
                                    to={item.path}
                                    className={`red text-white ${isActive(item.path) ? 'active' : ''}`}
                                >
                                    <span className="me-2">{item.icon}</span>
                                    {item.label}
                                </Nav.Link>
                            ))}
                        </div>
                    </Nav>
                </Col>
                <Col className="admin-content">
                    <Container fluid className="p-4 hp-4">
                        <Outlet />
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLayout;