import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaSearch, FaBuilding, FaEnvelope, FaInfoCircle } from 'react-icons/fa';

const Navigation = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/inicio', icon: <FaHome />, label: 'Inicio' },
        { path: '/inmuebles', icon: <FaBuilding />, label: 'Inmuebles' },
        { path: '/buscar', icon: <FaSearch />, label: 'Buscar' },
        { path: '/contacto', icon: <FaEnvelope />, label: 'Contacto' },
        { path: '/sobrenosotros', icon: <FaInfoCircle />, label: 'Sobre Nosotros' }
    ];

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
            <Container>
                <Navbar.Brand as={Link} to="/inicio">InmoTech</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {menuItems.map((item) => (
                            <Nav.Link 
                                key={item.path}
                                as={Link} 
                                to={item.path}
                                active={location.pathname === item.path}
                            >
                                <span className="me-1">{item.icon}</span> {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;