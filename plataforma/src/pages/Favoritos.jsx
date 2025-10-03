import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Badge } from 'react-bootstrap';
import PropertyCard from '../components/common/PropertyCard';
import { favoritoService } from '../services/api';
import './Favoritos.css';

const Favoritos = () => {
    const [favoritos, setFavoritos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('👤 Usuario actual:', user);
        setCurrentUser(user);
        
        if (user?.id) {
            fetchFavoritos(user.id);
        } else {
            setError('Debes iniciar sesión para ver tus favoritos');
            setLoading(false);
        }
    }, []);

    const fetchFavoritos = async (userId) => {
        try {
            setLoading(true);
            console.log(`🔍 Cargando favoritos para usuario ${userId}...`);
            
            const response = await favoritoService.getFavoritosUsuario(userId);
            console.log('📦 Respuesta completa del servidor:', response);
            console.log('📊 Datos de favoritos:', response.data);
            
            const favoritosData = response.data.data || [];
            console.log(`✅ ${favoritosData.length} favoritos cargados:`, favoritosData);
            
            setFavoritos(favoritosData);
        } catch (error) {
            console.error('❌ Error al cargar favoritos:', error);
            setError('Error al cargar tus favoritos');
        } finally {
            setLoading(false);
        }
    };

    const handleFavoritoRemovido = (inmuebleId) => {
        console.log(`🗑️ Removiendo inmueble ${inmuebleId} de favoritos`);
        setFavoritos(prev => {
            const nuevos = prev.filter(fav => fav.Inmueble_id !== inmuebleId);
            console.log(`📊 Favoritos después de remover: ${nuevos.length}`);
            return nuevos;
        });
    };

    const handleFavoritoAgregado = () => {
        console.log('➕ Inmueble agregado a favoritos, recargando lista...');
        if (currentUser?.id) {
            fetchFavoritos(currentUser.id);
        }
    };

    if (loading) {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Cargando tus favoritos...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row>
                <Col>
                    {/* Header Section Estilizado */}
                    <div className="favoritos-header">
                        <div className="header-content">
                            <div className="title-section">
                                <i className="bi bi-heart-fill heart-icon"></i>
                                <h1 className="favoritos-title">Mis Favoritos</h1>
                            </div>
                            
                            {favoritos.length > 0 && (
                                <Badge className="count-badge">
                                    <i className="bi bi-house-fill me-2"></i>
                                    {favoritos.length} inmueble{favoritos.length !== 1 ? 's' : ''} guardado{favoritos.length !== 1 ? 's' : ''}
                                </Badge>
                            )}
                        </div>
                    </div>
                    
                    {favoritos.length === 0 ? (
                        <Alert variant="info">
                            <h5>No tienes inmuebles favoritos</h5>
                            <p>Explora nuestros inmuebles y marca tus favoritos haciendo clic en el corazón.</p>
                        </Alert>
                    ) : (
                        <div className="favoritos-section">
                            <Row className="favoritos-grid">
                                {favoritos.map((inmueble, index) => (
                                    <Col 
                                        key={inmueble.Inmueble_id} 
                                        xs={12} 
                                        sm={6} 
                                        md={4} 
                                        lg={3} 
                                        className="mb-4"
                                    >
                                        <div 
                                            className="property-card-container"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <PropertyCard
                                                property={inmueble}
                                                isAdminView={false}
                                                currentUserId={currentUser?.id}
                                                onFavoritoChanged={(esFavorito) => {
                                                    if (esFavorito) {
                                                        handleFavoritoAgregado();
                                                    } else {
                                                        handleFavoritoRemovido(inmueble.Inmueble_id);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Favoritos;