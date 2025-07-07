import React, { useState, useEffect } from 'react';
import { Container, Row, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropertyCard from '../../components/PropertyCard';
import propertyService from '../../services/propertyService';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            const response = await propertyService.getAllProperties();
            console.log('Properties fetched:', response); // Debug log
            // Check the structure of the response and set properties accordingly
            if (response && response.propiedades) {
                setProperties(response.propiedades);
            } else if (Array.isArray(response)) {
                setProperties(response);
            }
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch properties when component mounts
    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Inmuebles</h2>
                <Link to="/admin/crear-propiedad">
                    <Button variant="primary">+ Nuevo Inmueble</Button>
                </Link>
            </div>

            <div className="mb-4">
                <Row>
                    <div className="col">
                        <Form.Control
                            type="search"
                            placeholder="Buscar por título..."
                        />
                    </div>
                    <div className="col">
                        <Form.Select>
                            <option>Estado</option>
                        </Form.Select>
                    </div>
                    <div className="col">
                        <Form.Select>
                            <option>Tipo de Propiedad</option>
                        </Form.Select>
                    </div>
                </Row>
            </div>

            <Row>
                {properties.map(property => (
                    <PropertyCard 
                        key={property._id} 
                        property={property}
                    />
                ))}
            </Row>
        </Container>
    );
};

export default PropertyList;