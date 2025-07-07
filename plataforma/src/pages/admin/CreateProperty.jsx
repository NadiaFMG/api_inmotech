import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../services/propertyService';

const CreateProperty = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [property, setProperty] = useState({
        titulo: '',
        descripcion: '',
        precio: '',
        ubicacion: '',
        habitaciones: '',
        banos: '',
        area: '',
        garajes: '',
        tipoPropiedad: 'Casa',
        imagen: '',
        caracteristicas: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await propertyService.createProperty(property);
            console.log('Property created:', response); // Debug log
            navigate('/admin/inmuebles', { state: { refresh: true } });
        } catch (error) {
            console.error('Error creating property:', error);
            setError(error.response?.data?.mensaje || 'Error al crear la propiedad');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Crear Nueva Propiedad</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        value={property.titulo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="descripcion"
                        value={property.descripcion}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        name="precio"
                        value={property.precio}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control
                        type="text"
                        name="ubicacion"
                        value={property.ubicacion}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo de Propiedad</Form.Label>
                    <Form.Select
                        name="tipoPropiedad"
                        value={property.tipoPropiedad}
                        onChange={handleChange}
                    >
                        <option value="Casa">Casa</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Local">Local</option>
                        <option value="Oficina">Oficina</option>
                        <option value="Terreno">Terreno</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Habitaciones</Form.Label>
                    <Form.Control
                        type="number"
                        name="habitaciones"
                        value={property.habitaciones}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Baños</Form.Label>
                    <Form.Control
                        type="number"
                        name="banos"
                        value={property.banos}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Área (m²)</Form.Label>
                    <Form.Control
                        type="number"
                        name="area"
                        value={property.area}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Garajes</Form.Label>
                    <Form.Control
                        type="number"
                        name="garajes"
                        value={property.garajes}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type="text"
                        name="imagen"
                        value={property.imagen}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Crear Propiedad
                </Button>
            </Form>
        </Container>
    );
};

export default CreateProperty;