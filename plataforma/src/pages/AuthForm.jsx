// import React, { useState } from 'react';
// import { Form, Button, Alert, Card } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../services/api';
// import '../styles/auth.css';

// const AuthForm = () => {
//     const navigate = useNavigate();
//     const [isLogin, setIsLogin] = useState(true);
//     const [credentials, setCredentials] = useState({
//         usuario: '',
//         correo: '',
//         password: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (isLogin) {
//                 // Permite usuario o correo en el mismo input
//                 const response = await authService.login(credentials.usuario, credentials.password);
//                 if (response.user && response.user.role === 1) {
//                     navigate('/admin');
//                 } else {
//                     navigate('/inicio');
//                 }
//             } else {
//                 await authService.register(credentials.usuario, credentials.correo, credentials.password);
//                 setIsLogin(true);
//                 setError('Registro exitoso. Por favor inicia sesión.');
//             }
//         } catch (error) {
//             setError(error.response?.data?.error || 'Error en la operación');
//         }
//     };

//     return (
//         <div className="auth-container d-flex align-items-center justify-content-center">
//             <Card className="auth-card">
//                 <Card.Body>
//                     <div className="auth-logo mb-4">
//                         <img src={require('../assets/images/logo/logo_40x40.png')} alt="Logo" width={80} height={80} style={{ borderRadius: '20%' }} />
//                     </div>
//                     <h2 className="auth-title mb-4">{isLogin ? 'Iniciar Sesión' : 'Registro'}</h2>
//                     {error && <Alert variant={error.includes('exitoso') ? 'success' : 'danger'} className="auth-error">{error}</Alert>}
//                     <Form className="auth-form" onSubmit={handleSubmit}>
//                         {isLogin ? (
//                             <Form.Group className="mb-4">
//                                 <Form.Label>Usuario o correo</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="usuario"
//                                     value={credentials.usuario}
//                                     onChange={handleChange}
//                                     required
//                                     autoComplete="username"
//                                     placeholder="Ingresa tu usuario o correo"
//                                 />
//                             </Form.Group>
//                         ) : (
//                             <>
//                                 <Form.Group className="mb-4">
//                                     <Form.Label>Usuario</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="usuario"
//                                         value={credentials.usuario}
//                                         onChange={handleChange}
//                                         required
//                                         autoComplete="username"
//                                         placeholder="Ingresa tu usuario"
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-4">
//                                     <Form.Label>Correo</Form.Label>
//                                     <Form.Control
//                                         type="email"
//                                         name="correo"
//                                         value={credentials.correo}
//                                         onChange={handleChange}
//                                         required
//                                         autoComplete="email"
//                                         placeholder="Ingresa tu correo"
//                                     />
//                                 </Form.Group>
//                             </>
//                         )}
//                         <Form.Group className="mb-4">
//                             <Form.Label>Contraseña</Form.Label>
//                             <Form.Control
//                                 type="password"
//                                 name="password"
//                                 value={credentials.password}
//                                 onChange={handleChange}
//                                 required
//                                 autoComplete={isLogin ? "current-password" : "new-password"}
//                                 placeholder="Ingresa tu contraseña"
//                             />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" className="auth-btn mb-3 w-100">
//                             {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
//                         </Button>
//                         <div className="auth-divider">o</div>
//                         <div className="text-center">
//                             <Button variant="link" className="auth-link" onClick={() => setIsLogin(!isLogin)}>
//                                 {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
//                             </Button>
//                         </div>
//                     </Form>
//                 </Card.Body>
//             </Card>
//         </div>
//     );
// };

// export default AuthForm;

import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import '../styles/auth.css';

// Lista simple de dominios de correo temporal (puedes ampliarla)
const TEMP_DOMAINS = [
    'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com'
];

const usuarioRegex = /^[a-zA-Z0-9_]{3,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{8,}$/;

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({
        usuario: '',
        correo: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [validating, setValidating] = useState(false);
    const [usuarioDisponible, setUsuarioDisponible] = useState(null);
    const [correoDisponible, setCorreoDisponible] = useState(null);

    // Validación de usuario único (simulación, deberías tener un endpoint real)
    const checkUsuarioDisponible = async (usuario) => {
        try {
            // Simulación: reemplaza por tu endpoint real
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/check-usuario?usuario=${usuario}`);
            const data = await res.json();
            setUsuarioDisponible(data.disponible);
        } catch {
            setUsuarioDisponible(null);
        }
    };

    // Validación de correo único (simulación, deberías tener un endpoint real)
    const checkCorreoDisponible = async (correo) => {
        try {
            // Simulación: reemplaza por tu endpoint real
            const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/check-correo?correo=${correo}`);
            const data = await res.json();
            setCorreoDisponible(data.disponible);
        } catch {
            setCorreoDisponible(null);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));

        // Validar disponibilidad en tiempo real
        if (name === 'usuario' && value.length >= 3) {
            checkUsuarioDisponible(value);
        }
        if (name === 'correo' && value.length > 5) {
            checkCorreoDisponible(value);
        }
    };

    const validarRegistro = async () => {
        // Validación de usuario
        if (!usuarioRegex.test(credentials.usuario)) {
            setError('El usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números y guiones bajos.');
            return false;
        }
        if (usuarioDisponible === false) {
            setError('El usuario ya está registrado.');
            return false;
        }
        // Validación de correo
        if (!emailRegex.test(credentials.correo)) {
            setError('El correo electrónico no tiene un formato válido.');
            return false;
        }
        const dominio = credentials.correo.split('@')[1];
        if (TEMP_DOMAINS.includes(dominio)) {
            setError('No se permiten correos temporales.');
            return false;
        }
        if (correoDisponible === false) {
            setError('El correo ya está registrado.');
            return false;
        }
        // Validación de contraseña
        if (credentials.password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }
        if (!passwordRegex.test(credentials.password)) {
            setError('La contraseña debe contener al menos una mayúscula, una minúscula y un número, y no debe tener espacios.');
            return false;
        }
        if (/\s/.test(credentials.password)) {
            setError('La contraseña no debe contener espacios.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLogin) {
            setValidating(true);
            const valido = await validarRegistro();
            setValidating(false);
            if (!valido) return;
        }
        try {
            if (isLogin) {
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
                                    // required
                                    autoComplete="username"
                                    placeholder="Ingresa tu usuario o correo"
                                />
                            </Form.Group>
                        ) : (
                            <>
                                <Form.Group className="mb-2">
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="usuario"
                                        value={credentials.usuario}
                                        onChange={handleChange}
                                        // required
                                        autoComplete="username"
                                        placeholder="Ingresa tu usuario"
                                        isInvalid={usuarioDisponible === false}
                                        isValid={usuarioDisponible === true}
                                    />
                                    {usuarioDisponible === false && (
                                        <Form.Text className="text-danger">El usuario ya está registrado.</Form.Text>
                                    )}
                                    {credentials.usuario && !usuarioRegex.test(credentials.usuario) && (
                                        <Form.Text className="text-danger">
                                            Solo letras, números y guion bajo. 3-20 caracteres.
                                        </Form.Text>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="correo"
                                        value={credentials.correo}
                                        onChange={handleChange}
                                        // required
                                        autoComplete="email"
                                        placeholder="Ingresa tu correo"
                                        isInvalid={correoDisponible === false}
                                        isValid={correoDisponible === true}
                                    />
                                    {correoDisponible === false && (
                                        <Form.Text className="text-danger">El correo ya está registrado.</Form.Text>
                                    )}
                                    {credentials.correo && !emailRegex.test(credentials.correo) && (
                                        <Form.Text className="text-danger">
                                            Ingresa un correo válido.
                                        </Form.Text>
                                    )}
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
                                // required
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                placeholder="Ingresa tu contraseña"
                            />
                            {!isLogin && credentials.password && (
                                <Form.Text className="text-muted">
                                    Mínimo 8 caracteres, mayúscula, minúscula y número. Sin espacios.
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="auth-btn mb-3 w-100"
                            disabled={validating}
                        >
                            {isLogin ? 'Iniciar Sesión' : validating ? 'Validando...' : 'Registrarse'}
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