import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SearchBar from '../components/search/SearchBar';
import ResultadoBusqueda from '../components/search/ResultadoBusqueda';
import OpcionesFiltradoAvanzado from '../components/search/OpcionesFiltradoAvanzado';
import Ordenamiento from '../components/search/Ordenamiento';
import Paginacion from '../components/search/Paginacion';
import VistaMapa from '../components/map/VistaMapa';
import '../styles/VistaMapa.css';
import axios from 'axios';
import { REACT_APP_API_BASE_URL } from '../utils/constants';

function Inmuebles() {
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(null);
    const [ordenamiento, setOrdenamiento] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const inmueblesPorPagina = 30;  // Changed from 9 to 30
    const [vistaActual, setVistaActual] = useState('lista'); // 'lista' o 'mapa'

    useEffect(() => {
        const fetchInmuebles = async () => {
            try {
                const response = await axios.get(`${REACT_APP_API_BASE_URL}/propiedades`, {
                    params: {
                        page: paginaActual,
                        limit: inmueblesPorPagina,
                        ...searchParams,
                        ...filtrosAvanzados,
                        ...ordenamiento
                    }
                });
                setInmuebles(response.data.inmuebles);
                setTotalPaginas(Math.ceil(response.data.total / inmueblesPorPagina));
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los inmuebles');
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
        setPaginaActual(1); // Resetear a primera página al buscar
    };

    const handleFiltrosAvanzados = (filtros) => {
        setFiltrosAvanzados(filtros);
        setPaginaActual(1); // Resetear a primera página al filtrar
    };

    const handleSort = (sortParams) => {
        setOrdenamiento(sortParams);
        setPaginaActual(1); // Resetear a primera página al ordenar
    };

    return (
        <Container fluid className="py-4">
            <h1 className="text-center mb-4">Inmuebles Disponibles</h1>
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
