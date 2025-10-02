import React, { useState } from 'react';
import { Card, Carousel, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property, isAdminView, onEdit, onDelete, onViewDetails }) => {
    const [imageError, setImageError] = useState(false);
    const navigate = useNavigate();
    
    // Debug: muestra el objeto recibido
    console.log('Property data received:', property);

    // MANEJAR IMÁGENES - con fallback para cuando no hay imágenes
    const imagenes = property.imagenesInmueble || property.imagenes || [];
    const imagenesArray = Array.isArray(imagenes) ? imagenes : [];
    
    // Si no hay imágenes, usar imagen por defecto
    const imagenPorDefecto = 'https://via.placeholder.com/400x250?text=Sin+Imagen+Disponible&bg=f0f0f0&color=666';

    console.log('Imágenes procesadas:', imagenesArray.length);

    // Función para manejar click en la carta (solo si NO es admin view)
    const handleCardClick = () => {
        if (!isAdminView) {
            navigate(`/inmueble/${property.Inmueble_id}`);
        }
    };

    // Formatear precio
    const formatPrice = (price) => {
        const numPrice = Number(price);
        if (isNaN(numPrice)) return 'Precio no disponible';
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(numPrice);
    };

    // Extraer información básica
    const precio = formatPrice(property.Valor);
    const area = property.Area || 'N/D';
    const descripcion = property.Descripcion_General || 'Sin descripción disponible';
    const direccion = property.direccion?.Direccion || 'Dirección no disponible';
    
    // Información adicional de división
    const habitaciones = property.division?.Habitaciones || 'N/D';
    const banos = property.division?.Baños || 'N/D';

    return (
        <Card 
            className={`property-card h-100 ${!isAdminView ? 'clickable' : ''}`}
            onClick={handleCardClick}
        >
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
                                    src={imagen.URL || imagen.url || imagenPorDefecto}
                                    alt={imagen.Nombre || `Imagen ${index + 1}`}
                                    className="property-image"
                                    onError={(e) => {
                                        e.target.src = imagenPorDefecto;
                                    }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                ) : (
                    <img
                        src={imagenesArray.length > 0 ? 
                            (imagenesArray[0].URL || imagenesArray[0].url || imagenPorDefecto) : 
                            imagenPorDefecto
                        }
                        alt={property.Descripcion_General || 'Inmueble'}
                        className="property-image"
                        onError={(e) => {
                            e.target.src = imagenPorDefecto;
                        }}
                    />
                )}
                
                {/* Overlay con precio e información adicional */}
                <div className="image-overlay">
                    <div className="price-badge">
                        {precio}
                    </div>
                    {imagenesArray.length > 1 && (
                        <div className="images-count">
                            📷 {imagenesArray.length}
                        </div>
                    )}
                </div>

                {/* BOTONES DE ADMIN - Solo mostrar si isAdminView es true */}
                {isAdminView && (
                    <div className="admin-buttons-overlay">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Ver Detalle</Tooltip>}
                        >
                            <Button
                                variant="info"
                                size="sm"
                                className="admin-btn admin-btn-view"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onViewDetails && onViewDetails();
                                }}
                            >
                                <FaEye />
                            </Button>
                        </OverlayTrigger>
                        
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Editar</Tooltip>}
                        >
                            <Button
                                variant="warning"
                                size="sm"
                                className="admin-btn admin-btn-edit"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit && onEdit();
                                }}
                            >
                                <FaEdit />
                            </Button>
                        </OverlayTrigger>
                        
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Eliminar</Tooltip>}
                        >
                            <Button
                                variant="danger"
                                size="sm"
                                className="admin-btn admin-btn-delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete && onDelete();
                                }}
                            >
                                <FaTrash />
                            </Button>
                        </OverlayTrigger>
                    </div>
                )}
            </div>

            {/* Contenido de la carta */}
            <Card.Body className="property-card-body">
                <Card.Text className="property-description">
                    {descripcion.length > 100 ? `${descripcion.substring(0, 100)}...` : descripcion}
                </Card.Text>
                
                <div className="property-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{direccion}</span>
                </div>
                
                <div className="property-details">
                    <div className="detail-item">
                        <FaBed className="detail-icon" />
                        <span>{habitaciones} hab.</span>
                    </div>
                    <div className="detail-item">
                        <FaBath className="detail-icon" />
                        <span>{banos} baños</span>
                    </div>
                    <div className="detail-item">
                        <FaRulerCombined className="detail-icon" />
                        <span>{area} m²</span>
                    </div>
                </div>
            </Card.Body>

            {/* TUS ESTILOS ORIGINALES + SOLO CAMBIÉ LOS COLORES DE LOS BOTONES ADMIN */}
            <style jsx>{`
                .property-card {
                    border: none;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    background: #15365F; /* CAMBIÉ DE WHITE A TU AZUL OSCURO */
                    cursor: pointer;
                }

                .property-card.clickable {
                    cursor: pointer;
                }

                .property-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .card-image-section {
                    position: relative;
                    height: 200px;
                    overflow: hidden;
                }

                .property-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .property-card:hover .property-image {
                    transform: scale(1.05);
                }

                .property-carousel .carousel-control-prev,
                .property-carousel .carousel-control-next {
                    width: 30px;
                    height: 30px;
                    background: rgba(0, 0, 0, 0.5);
                    border-radius: 50%;
                    top: 50%;
                    transform: translateY(-50%);
                    border: none;
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
                    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 10px;
                    pointer-events: none;
                }

                .price-badge {
                    background: #28a745;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-weight: bold;
                    font-size: 0.9rem;
                    align-self: flex-start;
                }

                .images-count {
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 3px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    align-self: flex-end;
                }

                /* SOLO CAMBIÉ LOS COLORES DE LOS BOTONES ADMIN A TU PALETA AZUL */
                .admin-buttons-overlay {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    z-index: 10;
                }

                .admin-btn {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    font-size: 0.8rem;
                    transition: all 0.2s ease;
                    pointer-events: auto;
                }

                .admin-btn-view {
                    background: #72A3D1;
                    color: white;
                }

                .admin-btn-view:hover {
                    background: #1C56A7;
                    transform: scale(1.1);
                    color: white;
                }

                .admin-btn-edit {
                    background: #1C56A7;
                    color: white;
                }

                .admin-btn-edit:hover {
                    background: #15365F;
                    transform: scale(1.1);
                    color: white;
                }

                .admin-btn-delete {
                    background: #dc3545;
                    color: white;
                }

                .admin-btn-delete:hover {
                    background: #c82333;
                    transform: scale(1.1);
                    color: white;
                }

                .property-card-body {
                    padding: 15px;
                    background: #15365F; /* TAMBIÉN AQUÍ */
                }

                .property-description {
                    font-size: 0.9rem;
                    color: #FDFDFD; /* TEXTO BLANCO PARA CONTRASTE */
                    margin-bottom: 10px;
                    line-height: 1.4;
                    height: 40px;
                    overflow: hidden;
                }

                .property-location {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    color: #72A3D1; /* AZUL CLARO PARA UBICACIÓN */
                    font-size: 0.85rem;
                }

                .location-icon {
                    color: #dc3545;
                    margin-right: 5px;
                }

                .property-details {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 10px;
                    border-top: 1px solid rgba(114, 163, 209, 0.3); /* BORDE AZUL CLARO */
                }

                .detail-item {
                    display: flex;
                    align-items: center;
                    color: #FDFDFD; /* TEXTO BLANCO */
                    font-size: 0.8rem;
                }

                .detail-icon {
                    color: #72A3D1; /* ICONOS AZUL CLARO */
                    margin-right: 3px;
                    font-size: 0.8rem;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .card-image-section {
                        height: 180px;
                    }

                    .admin-buttons-overlay {
                        flex-direction: row;
                        gap: 4px;
                    }

                    .admin-btn {
                        width: 30px;
                        height: 30px;
                        font-size: 0.7rem;
                    }
                }
            `}</style>
        </Card>
    );
};

export default PropertyCard;