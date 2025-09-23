import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import '../styles/auth.css';

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        usuario: '',
        correo: '',
        password: ''
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
                // Permite usuario o correo en el mismo input
                const response = await authService.login(credentials.usuario, credentials.password);
                if (response.user && response.user.role === 1) {
                    navigate('/admin');
                } else {
                    navigate('/inicio');
                }
            } else {
                await authService.register(credentials.usuario, credentials.correo, credentials.password);
                setIsLogin(true);
                setError('Registro exitoso. Por favor inicia sesión.');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Error en la operación');
        }
    };

    return (
        <div className="auth-container d-flex align-items-center justify-content-center">
            <Card className="auth-card">
                <Card.Body>
                    <div className="auth-logo mb-4">
                        <img src={require('../assets/images/logo/logo_40x40.png')} alt="Logo" width={80} height={80} style={{ borderRadius: '20%' }} />
                    </div>
                    <h2 className="auth-title mb-4">{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
                    {error && <Alert variant={error.includes('exitoso') ? 'success' : 'danger'} className="auth-error">{error}</Alert>}
                    <Form className="auth-form" onSubmit={handleSubmit}>
                        {isLogin ? (
                            <Form.Group className="mb-4">
                                <Form.Label>Usuario o correo</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="usuario"
                                    value={credentials.usuario}
                                    onChange={handleChange}
                                    required
                                    autoComplete="username"
                                    placeholder="Ingresa tu usuario o correo"
                                />
                            </Form.Group>
                        ) : (
                            <>
                                <Form.Group className="mb-4">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="usuario"
                                        value={credentials.usuario}
                                        onChange={handleChange}
                                        required
                                        autoComplete="username"
                                        placeholder="Ingresa tu usuario"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="correo"
                                        value={credentials.correo}
                                        onChange={handleChange}
                                        required
                                        autoComplete="email"
                                        placeholder="Ingresa tu correo"
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                placeholder="Ingresa tu contraseña"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="auth-btn mb-3 w-100">
                            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                        </Button>
                        <div className="auth-divider">o</div>
                        <div className="text-center">
                            <Button variant="link" className="auth-link" onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AuthForm;