import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import SearchBar from '../components/search/SearchBar';
import ResultadoBusqueda from '../components/search/ResultadoBusqueda';
import OpcionesFiltradoAvanzado from '../components/search/OpcionesFiltradoAvanzado';
import Ordenamiento from '../components/search/Ordenamiento';
import Paginacion from '../components/search/Paginacion';
import VistaMapa from '../components/map/VistaMapa';
import '../styles/VistaMapa.css';
import { busquedaInmuebleService, inmuebleService } from '../services/propertyService';

function Inmuebles() {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(null);
    const [ordenamiento, setOrdenamiento] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const inmueblesPorPagina = 30;
    const [vistaActual, setVistaActual] = useState('lista');

    useEffect(() => {
        const fetchInmuebles = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Fetching inmuebles...');
                
                // Intentar primero con busquedaInmuebleService, si falla usar inmuebleService
                let response;
                try {
                    const params = {
                        page: paginaActual,
                        limit: inmueblesPorPagina,
                        ...(searchParams || {}),
                        ...(filtrosAvanzados || {}),
                        ...(ordenamiento || {})
                    };
                    response = await busquedaInmuebleService.buscar(params);
                } catch (searchError) {
                    console.log('Error con busquedaInmuebleService, intentando con inmuebleService:', searchError);
                    response = await inmuebleService.getAllProperties();
                }

                console.log('Response:', response);
                
                // Manejar diferentes estructuras de respuesta
                let inmueblesData = [];
                let total = 0;

                if (response?.data?.inmuebles) {
                    inmueblesData = response.data.inmuebles;
                    total = response.data.total || inmueblesData.length;
                } else if (response?.propiedades) {
                    inmueblesData = response.propiedades;
                    total = inmueblesData.length;
                } else if (Array.isArray(response)) {
                    inmueblesData = response;
                    total = response.length;
                } else if (response?.data && Array.isArray(response.data)) {
                    inmueblesData = response.data;
                    total = response.data.length;
                }

                setInmuebles(inmueblesData);
                setTotalPaginas(Math.ceil(total / inmueblesPorPagina));
                
                console.log('Inmuebles loaded:', inmueblesData.length);
                
            } catch (err) {
                console.error('Error completo al cargar inmuebles:', err);
                setError(`Error al cargar los inmuebles: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchInmuebles();
    }, [paginaActual, searchParams, filtrosAvanzados, ordenamiento]);

    const handlePageChange = (newPage) => {
        setPaginaActual(newPage);
        window.scrollTo(0, 0);
    };

    const handleSearch = (params) => {
        setSearchParams(params);
        setPaginaActual(1);
    };

    const handleFiltrosAvanzados = (filtros) => {
        setFiltrosAvanzados(filtros);
        setPaginaActual(1);
    };

    const handleSort = (sortParams) => {
        setOrdenamiento(sortParams);
        setPaginaActual(1);
    };

    if (loading) {
        return (
            <Container className="py-4">
                <div className="text-center">Cargando inmuebles...</div>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            <h1 className="text-center mb-4">Inmuebles Disponibles</h1>
            
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}
            
            <SearchBar onSearch={handleSearch} />
            <OpcionesFiltradoAvanzado onFilter={handleFiltrosAvanzados} />
            <Row className="mb-3">
                <Col>
                    <Ordenamiento onSort={handleSort} />
                </Col>
                <Col xs="auto">
                    <Button
                        variant={vistaActual === 'lista' ? 'primary' : 'outline-primary'}
                        className="me-2"
                        onClick={() => setVistaActual('lista')}
                    >
                        Vista Lista
                    </Button>
                    <Button
                        variant={vistaActual === 'mapa' ? 'primary' : 'outline-primary'}
                        onClick={() => setVistaActual('mapa')}
                    >
                        Vista Mapa
                    </Button>
                </Col>
            </Row>
            
            {vistaActual === 'lista' ? (
                <>
                    <ResultadoBusqueda 
                        inmuebles={inmuebles}
                        loading={loading}
                        error={error}
                    />
                    <Paginacion 
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <VistaMapa inmuebles={inmuebles} />
            )}
        </Container>
    );
}

export default Inmuebles;
