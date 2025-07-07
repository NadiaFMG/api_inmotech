import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from '../components/common/PropertyCard';
import propertyService from '../services/propertyService';
import { useNavigate } from 'react-router-dom';
import PropertyCarousel from '../components/common/PropertyCarousel';
import ListadoDestacado from '../components/destacados/ListadoDestacado';
import SearchBar from '../components/search/SearchBar';
import SeccionesInformativas from '../components/info/SeccionesInformativas';
import '../styles/ListadoDestacado.css';
import '../styles/SeccionesInformativas.css';
import '../styles/PropertyCarousel.css';

const Inicio = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await propertyService.getAllProperties();
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

    return (
        <div className="inicio-container">
            <PropertyCarousel />
            <Container>
                <SearchBar />
                <ListadoDestacado properties={properties} loading={loading} />
                <SeccionesInformativas />
            </Container>
        </div>
    );
};

export default Inicio;