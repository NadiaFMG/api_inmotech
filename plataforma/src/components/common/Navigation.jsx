import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaBuilding, FaEnvelope, FaInfoCircle, FaDollarSign, FaUser } from 'react-icons/fa';
import '../../styles/Navigation.css';

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/inicio', icon: <FaHome />, label: 'Inicio' },
        { path: '/inmuebles', icon: <FaBuilding />, label: 'Inmuebles' },
        { path: '/buscar', icon: <FaSearch />, label: 'Buscar' },
        { path: '/venderinmueble', icon: <FaDollarSign />, label: 'Vender Inmueble' },
        { path: '/contacto', icon: <FaEnvelope />, label: 'Contacto' },
        { path: '/sobrenosotros', icon: <FaInfoCircle />, label: 'Sobre Nosotros' }
    ];

    // Obtén el usuario logueado desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    const handleCerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleVerPerfil = () => {
        navigate('/user/perfil');
    };

    return (
        <Navbar expand="lg" /*className="mb-4"*/>
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
                                className={location.pathname === item.path ? 'active' : ''}
                            >
                                <span className="me-1">{item.icon}</span> {item.label}
                            </Nav.Link>
                        ))}
                        {user && (
                            <Dropdown align="end" className="ms-3">
                                <Dropdown.Toggle variant="" id="dropdown-user" className="custom-dropdown-toggle">
                                    <FaUser className="me-1" />
                                    <span style={{ fontWeight: 600 }}>
                                        {user.username}
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleVerPerfil}>Ver Perfil</Dropdown.Item>
                                    <Dropdown.Item onClick={handleCerrarSesion}>Cerrar Sesión</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;