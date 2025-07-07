import React, { useState } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import authService from '../../services/authService';

const Register = ({ onSuccess, onSwitchView }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
        if (formData.username.length < 4) {
            setError('El nombre de usuario debe tener al menos 4 caracteres');
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
        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
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
            await authService.register(formData.username, formData.password);
            // Si el registro es exitoso, mostrar mensaje y redirigir al login
            alert('Registro exitoso. Por favor, inicia sesión.');
            onSwitchView();
        } catch (err) {
            console.error('Error de registro:', err);
            setError(
                err.response?.data?.message || 
                'Error al registrar usuario. Por favor, intenta con otro nombre de usuario.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="auth-card">
            <Card.Body>
                <h2 className="auth-title">Crear Cuenta</h2>
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
                            placeholder="Elige un nombre de usuario"
                            required
                            disabled={loading}
                            autoComplete="username"
                        />
                        <Form.Text className="text-muted">
                            Mínimo 4 caracteres
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Elige una contraseña"
                            required
                            disabled={loading}
                            autoComplete="new-password"
                        />
                        <Form.Text className="text-muted">
                            Mínimo 6 caracteres
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Confirmar Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirma tu contraseña"
                            required
                            disabled={loading}
                            autoComplete="new-password"
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
                                Registrando...
                            </>
                        ) : (
                            'Registrarse'
                        )}
                    </Button>

                    <div className="auth-divider">o</div>

                    <div className="text-center">
                        <p className="mb-0">
                            ¿Ya tienes una cuenta?{' '}
                            <Button 
                                variant="link" 
                                className="auth-link"
                                onClick={onSwitchView}
                                disabled={loading}
                            >
                                Inicia sesión aquí
                            </Button>
                        </p>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Register;
