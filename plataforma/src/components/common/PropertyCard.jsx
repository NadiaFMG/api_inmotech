import React, { useState } from 'react';
import { Card, Button, Badge, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isAdminView }) => {
    const [imageError, setImageError] = useState(false);
    
    // Debug: muestra el objeto recibido
    console.log('Property data received:', property);

    // Manejo de múltiples imágenes como en InmuebleDetalle.jsx
    const imagenes = property.imagenesInmueble || property.imagenes || [];
    const imagenesArray = Array.isArray(imagenes) ? imagenes : [imagenes].filter(Boolean);

    // Función para obtener imagen principal
    const getImagenPrincipal = () => {
        if (imagenesArray.length > 0) {
            return imagenesArray[0].URL || imagenesArray[0].imagen || 'https://via.placeholder.com/400x250?text=Sin+Imagen';
        }
        return 'https://via.placeholder.com/400x250?text=Sin+Imágenes+Disponibles';
    };

    // Formatear precio
    const formatPrice = (price) => {
        return Number(price || 0).toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
    };

    // Obtener estado badge variant
    const getStatusVariant = (estado) => {
        switch(estado?.toLowerCase()) {
            case 'disponible': return 'success';
            case 'vendido': return 'danger';
            case 'reservado': return 'warning';
            default: return 'secondary';
        }
    };

    return (
        <div className="property-card-container">
            <Card className="property-card h-100">
                {/* Sección de imágenes */}
                <div className="card-image-section">
                    {imagenesArray.length > 1 ? (
                        <Carousel 
                            interval={null}
                            indicators={false}
                            controls={true}
                            className="property-carousel"
                        >
                            {imagenesArray.map((imagen, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={imagen.URL || imagen.imagen || 'https://via.placeholder.com/400x250?text=Sin+Imagen'}
                                        alt={imagen.Nombre || `Imagen ${index + 1}` || 'Inmueble'}
                                        className="property-image"
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x250?text=Error+al+cargar+imagen';
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    ) : (
                        <img
                            src={getImagenPrincipal()}
                            alt={property.Descripcion_General || 'Inmueble'}
                            className="property-image"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x250?text=Error+al+cargar+imagen';
                            }}
                        />
                    )}
                    
                    {/* Overlay con información destacada */}
                    <div className="image-overlay">
                        <div className="overlay-top">
                            <Badge bg={getStatusVariant(property.Estado)} className="status-badge">
                                {property.Estado || 'N/D'}
                            </Badge>
                            {imagenesArray.length > 1 && (
                                <Badge bg="dark" className="images-badge">
                                    📸 {imagenesArray.length}
                                </Badge>
                            )}
                        </div>
                        <div className="overlay-bottom">
                            <div className="property-price">
                                {formatPrice(property.Valor)}
                            </div>
                        </div>
                    </div>
                </div>

                <Card.Body className="property-card-body">
                    <div className="property-header">
                        <Card.Title className="property-title">
                            {property.Descripcion_General || 'Inmueble'}
                        </Card.Title>
                        <div className="property-code">
                            #{property.Codigo_interno || 'N/D'}
                        </div>
                    </div>

                    <div className="property-details">
                        <div className="detail-row">
                            <div className="detail-item">
                                <span className="detail-icon">📐</span>
                                <span className="detail-text">{property.Area || 'N/D'} m²</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-icon">⏰</span>
                                <span className="detail-text">{property.Antiguedad || 'N/D'} años</span>
                            </div>
                        </div>
                        
                        {/* Información adicional si está disponible */}
                        {(property.division?.Habitaciones || property.division?.Baños) && (
                            <div className="detail-row">
                                {property.division?.Habitaciones && (
                                    <div className="detail-item">
                                        <span className="detail-icon">🛏️</span>
                                        <span className="detail-text">{property.division.Habitaciones} hab.</span>
                                    </div>
                                )}
                                {property.division?.Baños && (
                                    <div className="detail-item">
                                        <span className="detail-icon">🚿</span>
                                        <span className="detail-text">{property.division.Baños} baños</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Dirección */}
                        {property.direccion?.Direccion && (
                            <div className="property-location">
                                <span className="detail-icon">📍</span>
                                <span className="location-text">{property.direccion.Direccion}</span>
                            </div>
                        )}
                    </div>

                    <div className="property-actions">
                        {isAdminView ? (
                            <div className="admin-actions">
                                <Button 
                                    as={Link} 
                                    to={`/admin/inmuebles/editar/${property.Inmueble_id}`}
                                    variant="outline-info"
                                    size="sm"
                                    className="action-btn"
                                >
                                    ✏️ Editar
                                </Button>
                                <Button 
                                    variant="outline-danger"
                                    size="sm"
                                    className="action-btn"
                                >
                                    🗑️ Eliminar
                                </Button>
                            </div>
                        ) : (
                            <Button 
                                as={Link} 
                                to={`/inmueble/${property.Inmueble_id}`}
                                className="view-details-btn"
                            >
                                Ver Detalles 🏠
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>

            <style>{`
                .property-card-container {
                    margin-bottom: 2rem;
                }

                .property-card {
                    border: none;
                    border-radius: 20px;
                    background: linear-gradient(145deg, #2c5282, #2a4365);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                    overflow: hidden;
                    position: relative;
                }

                .property-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(72, 187, 120, 0.1) 0%, rgba(56, 178, 172, 0.05) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .property-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(72, 187, 120, 0.3);
                    border: 1px solid rgba(72, 187, 120, 0.5);
                }

                .property-card:hover::before {
                    opacity: 1;
                }

                .card-image-section {
                    position: relative;
                    height: 250px;
                    overflow: hidden;
                }

                .property-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .property-card:hover .property-image {
                    transform: scale(1.05);
                }

                .property-carousel {
                    height: 100%;
                }

                .property-carousel .carousel-control-prev,
                .property-carousel .carousel-control-next {
                    width: 30px;
                    height: 30px;
                    background: rgba(44, 82, 130, 0.8);
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                }

                .property-carousel .carousel-control-prev {
                    left: 10px;
                }

                .property-carousel .carousel-control-next {
                    right: 10px;
                }

                .property-carousel .carousel-control-prev-icon,
                .property-carousel .carousel-control-next-icon {
                    width: 12px;
                    height: 12px;
                }

                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(transparent 30%, rgba(0,0,0,0.7));
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 1rem;
                    z-index: 2;
                }

                .overlay-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .status-badge {
                    font-size: 0.8rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .images-badge {
                    font-size: 0.8rem;
                    padding: 0.5rem 0.75rem;
                    border-radius: 15px;
                    background: rgba(0, 0, 0, 0.7) !important;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .overlay-bottom {
                    align-self: flex-end;
                    width: 100%;
                }

                .property-price {
                    font-size: 1.8rem;
                    font-weight: 800;
                    color: #48bb78;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
                    text-align: right;
                }

                .property-card-body {
                    background: transparent;
                    border: none;
                    padding: 1.5rem;
                    position: relative;
                    z-index: 2;
                }

                .property-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .property-title {
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 1.3rem;
                    margin: 0;
                    flex: 1;
                    line-height: 1.3;
                    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
                }

                .property-code {
                    color: #63b3ed;
                    font-size: 0.9rem;
                    font-weight: 600;
                    background: rgba(72, 187, 120, 0.15);
                    padding: 0.3rem 0.6rem;
                    border-radius: 10px;
                    border: 1px solid rgba(72, 187, 120, 0.3);
                    margin-left: 1rem;
                }

                .property-details {
                    margin-bottom: 1.5rem;
                }

                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.75rem;
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    flex: 1;
                }

                .detail-icon {
                    font-size: 1.1rem;
                    background: rgba(72, 187, 120, 0.15);
                    padding: 0.3rem;
                    border-radius: 8px;
                    border: 1px solid rgba(72, 187, 120, 0.3);
                }

                .detail-text {
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                .property-location {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    margin-top: 0.75rem;
                }

                .location-text {
                    color: #e2e8f0;
                    font-size: 0.9rem;
                    flex: 1;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .property-actions {
                    margin-top: auto;
                }

                .admin-actions {
                    display: flex;
                    gap: 0.75rem;
                }

                .action-btn {
                    flex: 1;
                    font-weight: 600;
                    border-radius: 10px;
                    padding: 0.75rem;
                    transition: all 0.2s ease;
                    border-width: 2px;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                }

                .view-details-btn {
                    width: 100%;
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
                }

                .view-details-btn:hover {
                    background: linear-gradient(90deg, #38a169, #319795);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(72, 187, 120, 0.4);
                    color: white;
                }

                /* Animaciones de entrada */
                .property-card {
                    animation: fadeInUp 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .property-card:hover {
                        transform: translateY(-4px) scale(1.01);
                    }
                    
                    .property-price {
                        font-size: 1.5rem;
                    }
                    
                    .property-title {
                        font-size: 1.1rem;
                    }
                    
                    .admin-actions {
                        flex-direction: column;
                    }
                    
                    .detail-row {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .detail-item {
                        justify-content: flex-start;
                    }
                }

                @media (max-width: 576px) {
                    .card-image-section {
                        height: 200px;
                    }
                    
                    .property-image {
                        height: 200px;
                    }
                    
                    .property-header {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .property-code {
                        margin-left: 0;
                        align-self: flex-start;
                    }
                }

                /* Reducir animaciones en dispositivos de menor rendimiento */
                @media (prefers-reduced-motion: reduce) {
                    .property-card,
                    .property-image,
                    .action-btn,
                    .view-details-btn {
                        transition: none !important;
                        animation: none !important;
                    }
                    
                    .property-card:hover {
                        transform: none !important;
                    }
                    
                    .property-card {
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default PropertyCard;