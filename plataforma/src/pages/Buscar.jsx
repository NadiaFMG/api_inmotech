import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import DetailedSearchForm from '../components/search/DetailedSearchForm';
import ResultadoBusqueda from '../components/search/ResultadoBusqueda';
import { busquedaInmuebleService } from '../services/propertyService';

const Buscar = () => {
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
        // Filtra los parámetros vacíos, null, false o -1
        const cleanParams = Object.fromEntries(
            Object.entries(searchParams).filter(
                ([_, v]) =>
                    v !== '' &&
                    v !== null &&
                    v !== undefined &&
                    v !== false &&
                    v !== -1
            )
        );
        const response = await busquedaInmuebleService.buscar(cleanParams);
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