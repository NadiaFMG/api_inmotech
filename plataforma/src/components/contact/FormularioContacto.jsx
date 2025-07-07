import React, { useState } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const FormularioContacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would add the API call to send the message
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            asunto: '',
            mensaje: ''
        });
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <h3 className="mb-4">Envíanos un Mensaje</h3>
                {showAlert && (
                    <Alert variant="success">
                        Mensaje enviado exitosamente. Nos pondremos en contacto pronto.
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="tel"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Asunto</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.asunto}
                            onChange={(e) => setFormData({...formData, asunto: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={formData.mensaje}
                            onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" size="lg" className="w-100">
                        Enviar Mensaje
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FormularioContacto;