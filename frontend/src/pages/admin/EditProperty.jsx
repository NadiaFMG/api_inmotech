import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import BasicInfoForm from '../../components/admin/property/BasicInfoForm';
import FeaturesForm from '../../components/admin/property/FeaturesForm';
import ImageUploader from '../../components/admin/property/ImageUploader';
import MapInput from '../../components/admin/property/MapInput';

const EditProperty = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        tipoPropiedad: '',
        precio: '',
        descripcion: '',
        habitaciones: '',
        banos: '',
        area: '',
        garajes: '',
        caracteristicas: [],
        imagenes: [],
        ubicacion: null
    });

    useEffect(() => {
        const fetchPropertyData = async () => {
            try {
                // Aquí iría la llamada a la API para obtener los datos de la propiedad
                const response = await fetch(`/api/properties/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (err) {
                setError('Error al cargar la información del inmueble');
            } finally {
                setLoading(false);
            }
        };

        fetchPropertyData();
    }, [id]);

    const handleInputChange = (e, field = null) => {
        if (field === 'caracteristicas') {
            const value = e.target.checked 
                ? [...formData.caracteristicas, e.target.label]
                : formData.caracteristicas.filter(item => item !== e.target.label);
            setFormData({ ...formData, caracteristicas: value });
        } else {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Aquí iría la lógica para actualizar los datos en el backend
            await fetch(`/api/properties/${id}`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            navigate('/admin/inmuebles');
        } catch (err) {
            setError('Error al actualizar la propiedad');
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <Container className="py-4">
            <h2 className="mb-4">Editar Inmueble</h2>
            
            {error && (
                <Alert variant="danger" onClose={() => setError(null)} dismissible>
                    {error}
                </Alert>
            )}

            <Form onSubmit={handleSubmit}>
                <BasicInfoForm formData={formData} onChange={handleInputChange} />
                <FeaturesForm formData={formData} onChange={handleInputChange} />
                <ImageUploader 
                    images={formData.imagenes}
                    onImageUpload={(files) => setFormData({ ...formData, imagenes: [...formData.imagenes, ...files] })}
                    onImageRemove={(index) => {
                        const newImages = [...formData.imagenes];
                        newImages.splice(index, 1);
                        setFormData({ ...formData, imagenes: newImages });
                    }}
                />
                <MapInput
                    location={formData.ubicacion}
                    onLocationChange={(location) => setFormData({ ...formData, ubicacion: location })}
                />

                <div className="d-flex justify-content-end gap-2">
                    <Button 
                        variant="secondary" 
                        type="button"
                        onClick={() => navigate('/admin/inmuebles')}
                    >
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar Cambios
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default EditProperty;