import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: 'admin'  // Por defecto para crear el primer admin
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await authService.login(credentials);
                if (response.usuario.rol === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/inicio');
                }
            } else {
                await authService.registro(credentials);
                setIsLogin(true);
                setError('Registro exitoso. Por favor inicia sesión.');
            }
        } catch (error) {
            setError(error.response?.data?.mensaje || 'Error en la operación');
        }
    };

    return (
        <Container className="mt-5">
            <h2>{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
            {error && <Alert variant={error.includes('exitoso') ? 'success' : 'danger'}>{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                {!isLogin && (
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="nombre"
                            value={credentials.nombre}
                            onChange={handleChange}
                            required={!isLogin}
                        />
                    </Form.Group>
                )}

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="me-2">
                    {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                </Button>
                <Button variant="link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                </Button>
            </Form>
        </Container>
    );
};

export default AuthForm;