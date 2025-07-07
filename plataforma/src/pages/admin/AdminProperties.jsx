import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../../components/admin/SearchFilter';
import PropertyCard from '../../components/common/PropertyCard';
import propertyService from '../../services/propertyService';

const AdminProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        estado: '',
        tipo: ''
    });

    const fetchProperties = async () => {
        try {
            const response = await propertyService.getAllProperties();
            console.log('Properties fetched in AdminProperties:', response); // Debug log
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

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Inmuebles</h2>
                <Button 
                    variant="primary"
                    onClick={() => navigate('/admin/inmuebles/crear')}
                >
                    <FaPlus className="me-2" /> Nuevo Inmueble
                </Button>
            </div>

            <SearchFilter 
                filters={filters}
                onFilterChange={handleFilterChange}
            />

            <Row className="mt-4">
                {properties.map(property => (
                    <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                        <PropertyCard 
                            property={property} 
                            isAdminView={true}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default AdminProperties;