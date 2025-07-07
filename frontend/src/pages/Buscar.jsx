import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DetailedSearchForm from '../components/search/DetailedSearchForm';
import ResultadoBusqueda from '../components/search/ResultadoBusqueda';
import axios from 'axios';
import { REACT_APP_API_BASE_URL } from '../utils/constants';

const Buscar = () => {
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchParams) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${REACT_APP_API_BASE_URL}/propiedades/buscar`, {
                params: searchParams
            });
            setResultados(response.data);
        } catch (err) {
            setError('Error al realizar la búsqueda');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4">Búsqueda Avanzada de Inmuebles</h1>
            <DetailedSearchForm onSearch={handleSearch} />
            <ResultadoBusqueda 
                inmuebles={resultados}
                loading={loading}
                error={error}
            />
        </Container>
    );
};

export default Buscar;
