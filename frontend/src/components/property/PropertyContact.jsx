import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const PropertyContact = ({ administrador }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const [showAlert, setShowAlert] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar el formulario
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <h3 className="mb-3">Información de Contacto</h3>
                <div className="mb-4">
                    <p><strong>Administrador:</strong> {administrador.nombre}</p>
                    <p><strong>Teléfono:</strong> {administrador.telefono}</p>
                    <p><strong>Email:</strong> {administrador.email}</p>
                </div>

                <h4>Enviar Mensaje</h4>
                {showAlert && (
                    <Alert variant="success">
                        Mensaje enviado exitosamente
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
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
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={formData.mensaje}
                            onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar Mensaje
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PropertyContact;