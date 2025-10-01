import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from '../components/common/PropertyCard';
import {inmuebleService} from '../services/propertyService';
import { useNavigate } from 'react-router-dom';
import PropertyCarousel from '../components/common/PropertyCarousel';
import ListadoDestacado from '../components/destacados/ListadoDestacado';
import SearchBar from '../components/search/SearchBar';
import SeccionesInformativas from '../components/info/SeccionesInformativas';
import '../styles/ListadoDestacado.css';
import '../styles/SeccionesInformativas.css';
import '../styles/PropertyCarousel.css';
import '../styles/home.css';

const Inicio = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await inmuebleService.getAllProperties();
                console.log('Properties fetched in Inicio:', response);
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

        fetchProperties();
    }, []);

    const handlePropertyClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div className="inicio-container">
            <PropertyCarousel />
            <Container>
                <SearchBar />
                <ListadoDestacado properties={properties} loading={loading} />
                
                {/* Sección adicional con PropertyCard */}
                <Row className="mt-4">
                    <Col>
                        <h3>Propiedades Recientes</h3>
                    </Col>
                </Row>
                <Row>
                    {properties.slice(0, 6).map(property => (
                        <Col md={4} key={property.id} className="mb-3">
                            <PropertyCard 
                                property={property} 
                                onClick={() => handlePropertyClick(property.id)}
                            />
                        </Col>
                    ))}
                </Row>
                
                <SeccionesInformativas />
            </Container>
        </div>
    );
};

export default Inicio;