import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../../components/search/SearchBar';
import OpcionesFiltradoAvanzado from '../../components/search/OpcionesFiltradoAvanzado';
import Ordenamiento from '../../components/search/Ordenamiento';
import Paginacion from '../../components/search/Paginacion';
import PropertyCard from '../../components/common/PropertyCard';
import { busquedaInmuebleService, inmuebleService } from '../../services/propertyService';
// AGREGAR IMPORT DEL SERVICIO DE API
import { propertyService } from '../../services/api';

const AdminProperties = () => {
    const navigate = useNavigate();
    const [inmuebles, setInmuebles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [filtrosAvanzados, setFiltrosAvanzados] = useState(null);
    const [ordenamiento, setOrdenamiento] = useState(null);
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const inmueblesPorPagina = 12; // Menos por página para admin

    // Función para obtener inmuebles (IGUAL QUE Inmuebles.jsx)
    useEffect(() => {
        const fetchInmuebles = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log('Admin: Fetching inmuebles...');
                
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

                console.log('Admin Response:', response);
                
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
                
                console.log('Admin: Inmuebles loaded:', inmueblesData.length);
                
            } catch (err) {
                console.error('Admin: Error completo al cargar inmuebles:', err);
                setError(`Error al cargar los inmuebles: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchInmuebles();
    }, [paginaActual, searchParams, filtrosAvanzados, ordenamiento]);

    // Handlers (IGUALES QUE Inmuebles.jsx)
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

    // Funciones específicas de ADMIN
    const handleEdit = (inmuebleId) => {
        navigate(`/admin/inmuebles/editar/${inmuebleId}`);
    };

    // ACTUALIZAR la función handleDelete para usar eliminación anidada
    const handleDelete = async (inmuebleId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este inmueble? Esta acción no se puede deshacer.')) {
            try {
                setLoading(true);
                
                // CAMBIAR a eliminación anidada
                await propertyService.deleteAnidado(inmuebleId);
                
                // Actualizar la lista local
                setInmuebles(prev => prev.filter(inmueble => inmueble.Inmueble_id !== inmuebleId));
                
                alert('Inmueble eliminado exitosamente');
            } catch (error) {
                console.error('Error al eliminar inmueble:', error);
                
                // Mejorar manejo de errores
                if (error.response?.data?.mensaje) {
                    alert(`Error al eliminar: ${error.response.data.mensaje}`);
                } else if (error.response?.data?.error) {
                    alert(`Error: ${error.response.data.error}`);
                } else {
                    alert('Error al eliminar el inmueble: ' + (error.response?.data?.message || error.message));
                }
            } finally {
                setLoading(false);
            }
        }
    };

    // AGREGAR función para manejar eliminación desde PropertyCard (callback)
    const handlePropertyDeleted = (deletedPropertyId) => {
        // Actualizar el estado local removiendo la propiedad eliminada
        setInmuebles(prev => 
            prev.filter(inmueble => inmueble.Inmueble_id !== deletedPropertyId)
        );
    };

    const handleViewDetails = (inmuebleId) => {
        navigate(`/inmueble/${inmuebleId}`);
    };

    if (loading && inmuebles.length === 0) {
        return (
            <Container className="py-4">
                <div className="text-center">
                    <Spinner animation="border" variant="light" />
                    <p className="text-light mt-2">Cargando inmuebles...</p>
                </div>
            </Container>
        );
    }

    return (
        <Container fluid className="py-4">
            {/* Header de Admin */}
            <div className="admin-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h2 className="admin-dashboard-titulo">Gestión de Inmuebles</h2>
                    <Button
                        className="btn-crear-inmueble"
                        onClick={() => navigate('/admin/inmuebles/crear')}
                    >
                        <FaPlus className="me-2" /> Crear Inmueble
                    </Button>
                </div>
                <p className="admin-subtitle">
                    Total de inmuebles: {inmuebles.length} | Página {paginaActual} de {totalPaginas}
                </p>
            </div>
            
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}
            
            {/* Filtros y búsqueda (IGUALES QUE Inmuebles.jsx) */}
            <div className="admin-filters mb-4">
                <SearchBar onSearch={handleSearch} />
                <OpcionesFiltradoAvanzado onFilter={handleFiltrosAvanzados} />
                <Row className="mb-3">
                    <Col>
                        <Ordenamiento onSort={handleSort} />
                    </Col>
                </Row>
            </div>

            {/* Grid de inmuebles */}
            <Row className="inmuebles-grid">
                {inmuebles.map(inmueble => (
                    <Col key={inmueble.Inmueble_id} xs={12} md={6} lg={4} xl={3} className="mb-4">
                        <div className="admin-property-card">
                            <PropertyCard
                                property={inmueble}
                                isAdminView={true}
                                onEdit={() => handleEdit(inmueble.Inmueble_id)}
                                onDelete={() => handleDelete(inmueble.Inmueble_id)}
                                onViewDetails={() => handleViewDetails(inmueble.Inmueble_id)}
                                // AGREGAR callback para que PropertyCard pueda notificar eliminación
                                onPropertyDeleted={handlePropertyDeleted}
                            />
                        </div>
                    </Col>
                ))}
            </Row>

            {/* Paginación */}
            {totalPaginas > 1 && (
                <div className="admin-pagination">
                    <Paginacion 
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Loading overlay para acciones */}
            {loading && inmuebles.length > 0 && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="light" />
                </div>
            )}

            <style>{`
                body {
                    background: #1C56A7FF;
                }

                .admin-header {
                    background: linear-gradient(135deg, #15365FFF, #1C56A7FF);
                    padding: 2rem;
                    border-radius: 20px;
                    border: 1px solid #5a7ca3;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }

                .admin-dashboard-titulo {
                    color: #FDFDFDFF;
                    font-weight: 700;
                    font-size: 2.2rem;
                    margin: 0;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                }

                .admin-subtitle {
                    color: #72A3D1FF;
                    margin: 0.5rem 0 0 0;
                    font-size: 1.1rem;
                    font-weight: 500;
                }

                .btn-crear-inmueble {
                    background: linear-gradient(90deg, #48bb78, #38b2ac);
                    border: none;
                    color: white;
                    font-weight: 700;
                    padding: 0.875rem 1.5rem;
                    border-radius: 15px;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    box-shadow: 0 4px 15px rgba(72, 187, 120, 0.3);
                    font-size: 1rem;
                }

                .btn-crear-inmueble:hover {
                    background: linear-gradient(90deg, #38a169, #319795);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
                    color: white;
                }

                .admin-filters {
                    background: rgba(21, 54, 95, 0.7);
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid rgba(114, 163, 209, 0.3);
                    backdrop-filter: blur(10px);
                }

                .inmuebles-grid {
                    margin: 0 -0.75rem;
                }

                .admin-property-card {
                    height: 100%;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .admin-property-card:hover {
                    transform: translateY(-4px);
                }

                .admin-pagination {
                    display: flex;
                    justify-content: center;
                    margin-top: 3rem;
                    padding: 2rem;
                    background: rgba(21, 54, 95, 0.5);
                    border-radius: 16px;
                    border: 1px solid rgba(114, 163, 209, 0.3);
                }

                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    backdrop-filter: blur(5px);
                }

                /* Animaciones de entrada stagger */
                .admin-property-card:nth-child(1) { animation-delay: 0.1s; }
                .admin-property-card:nth-child(2) { animation-delay: 0.15s; }
                .admin-property-card:nth-child(3) { animation-delay: 0.2s; }
                .admin-property-card:nth-child(4) { animation-delay: 0.25s; }
                .admin-property-card:nth-child(5) { animation-delay: 0.3s; }
                .admin-property-card:nth-child(6) { animation-delay: 0.35s; }
                .admin-property-card:nth-child(7) { animation-delay: 0.4s; }
                .admin-property-card:nth-child(8) { animation-delay: 0.45s; }
                .admin-property-card:nth-child(9) { animation-delay: 0.5s; }
                .admin-property-card:nth-child(10) { animation-delay: 0.55s; }
                .admin-property-card:nth-child(11) { animation-delay: 0.6s; }
                .admin-property-card:nth-child(12) { animation-delay: 0.65s; }

                .admin-property-card {
                    animation: fadeInScale 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(20px) scale(0.95);
                }

                @keyframes fadeInScale {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                /* Responsive */
                @media (max-width: 1200px) {
                    .inmuebles-grid .col-xl-3 {
                        flex: 0 0 33.333333%;
                        max-width: 33.333333%;
                    }
                }

                @media (max-width: 992px) {
                    .admin-dashboard-titulo {
                        font-size: 1.8rem;
                    }
                    
                    .admin-header {
                        padding: 1.5rem;
                    }
                    
                    .admin-header .d-flex {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start !important;
                    }
                    
                    .btn-crear-inmueble {
                        align-self: stretch;
                        text-align: center;
                    }
                }

                @media (max-width: 768px) {
                    .inmuebles-grid {
                        margin: 0 -0.5rem;
                    }
                    
                    .admin-filters {
                        padding: 1rem;
                    }
                    
                    .admin-pagination {
                        padding: 1rem;
                    }
                    
                    .admin-dashboard-titulo {
                        font-size: 1.6rem;
                    }
                }

                @media (max-width: 576px) {
                    .admin-header {
                        padding: 1rem;
                    }
                    
                    .admin-dashboard-titulo {
                        font-size: 1.4rem;
                    }
                    
                    .admin-subtitle {
                        font-size: 1rem;
                    }
                }

                /* Reducir efectos en dispositivos de menor rendimiento */
                @media (prefers-reduced-motion: reduce) {
                    .admin-property-card,
                    .btn-crear-inmueble {
                        transition: none !important;
                        animation: none !important;
                    }
                    
                    .admin-property-card:hover {
                        transform: none !important;
                    }
                    
                    .admin-property-card {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </Container>
    );
};

export default AdminProperties;