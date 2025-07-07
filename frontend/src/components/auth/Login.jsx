import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import authService from '../../services/authService';

const Login = ({ onSuccess, onSwitchView }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        // Limpiar error cuando el usuario empiece a escribir
        if (error) setError('');
    };

    const validateForm = () => {
        if (!formData.username.trim()) {
            setError('El nombre de usuario es requerido');
            return false;
        }
        if (!formData.password.trim()) {
            setError('La contraseña es requerida');
            return false;
        }
        if (formData.password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validar formulario
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        try {
            const response = await authService.login(formData.username, formData.password);
            // Llamar al callback de éxito
            onSuccess();
        } catch (err) {
            console.error('Error de login:', err);
            setError(
                err.response?.data?.message || 
                'Error al iniciar sesión. Por favor, intenta de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="auth-card">
            <Card.Body>
                <h2 className="auth-title">Iniciar Sesión</h2>
                {error && (
                    <Alert variant="danger" className="auth-error">
                        {error}
                    </Alert>
                )}
                
                <Form className="auth-form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-4">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            required
                            disabled={loading}
                            autoComplete="username"
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            required
                            disabled={loading}
                            autoComplete="current-password"
                        />
                    </Form.Group>

                    <Button 
                        type="submit" 
                        className="auth-btn"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    className="loading-spinner"
                                />
                                Iniciando sesión...
                            </>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </Button>

                    <div className="auth-divider">o</div>

                    <div className="text-center">
                        <p className="mb-0">
                            ¿No tienes una cuenta?{' '}
                            <Button 
                                variant="link" 
                                className="auth-link"
                                onClick={onSwitchView}
                                disabled={loading}
                            >
                                Regístrate aquí
                            </Button>
                        </p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Login;
