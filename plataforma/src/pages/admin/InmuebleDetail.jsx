import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Carousel } from 'react-bootstrap';
import { inmuebleService } from '../../services/propertyService';

const InmuebleDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompleto = async () => {
            try {
                const response = await inmuebleService.getCompleto(id);
                setProperty(response.data || response);
                setLoading(false);
            } catch (err) {
                setError('No se pudo cargar la información completa del inmueble');
                setLoading(false);
            }
        };
        fetchCompleto();
    }, [id]);

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!property) return <div>No se encontró el inmueble</div>;

    const i = property.inmueble || {};
    const a = property.acercaEdificacion || {};
    const o = property.otrasCaracteristicas || {};
    const d = property.division || {};
    const dir = property.direccion || {};
    const loc = dir.localizacion || {};
    const ndap = dir.ndap || {};
    const municipio = dir.municipio || {};
    const bccv = dir.barrio_ciudad_corregimiento_vereda || {};
    const designador = dir.designador_cardinal || {};
    const tipo = property.tipoEdificacion || {};
    const asignacion = o.asignacion || {};
    const orgParqueadero = o.organizacion_parqueadero || {};
    
    // Manejar múltiples imágenes
    const imagenes = property.imagenesInmueble || [];
    const imagenesArray = Array.isArray(imagenes) ? imagenes : [imagenes].filter(Boolean);

    // Crear grupos con el mismo diseño
    const grupos = [
        {
            titulo: 'Datos Principales',
            contenido: (
                <>
                    <div className="detalle-item">
                        <strong>Valor:</strong> ${Number(i.Valor || 0).toLocaleString() || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Área:</strong> {i.Area} m²
                    </div>
                    <div className="detalle-item">
                        <strong>Descripción General:</strong> {i.Descripcion_General || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Antigüedad:</strong> {i.Antiguedad} años
                    </div>
                    <div className="detalle-item">
                        <strong>Motivo VoA:</strong> {i.Motivo_VoA || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Situación inmueble:</strong> {i.Situacion_inmueble || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Código interno:</strong> {i.Codigo_interno || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Estado:</strong> {i.Estado || 'N/D'}
                    </div>
                    {i.Observaciones && (
                        <div className="detalle-item">
                            <strong>Observaciones:</strong> {i.Observaciones}
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Dirección',
            contenido: (
                <>
                    <div className="detalle-item">
                        <strong>Dirección:</strong> {dir.Direccion || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Tipo de vía:</strong> {dir.Tipo_via || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Número vía principal:</strong> {dir.Numero_via_principal || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Número calle transversal:</strong> {dir.Numero_calle_transversal || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Número edificación:</strong> {dir.Numero_edificacion || 'N/D'}
                    </div>
                    <div className="detalle-item">
                        <strong>Descripción adicional:</strong> {dir.Descripcion_adicional || 'N/D'}
                    </div>
                </>
            )
        },
        {
            titulo: 'División y Espacios',
            contenido: (
                <>
                    {Object.keys(d).length > 0 ? (
                        <>
                            <div className="detalle-item">
                                <strong>División:</strong> {d.Division || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Habitaciones:</strong> {d.Habitaciones !== undefined ? d.Habitaciones : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Baños:</strong> {d.Baños !== undefined ? d.Baños : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Balcón:</strong> {d.Balcon || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Terraza:</strong> {d.Terraza !== undefined ? d.Terraza : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Garaje:</strong> {d.Garaje !== undefined ? d.Garaje : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Área División:</strong> {d.Area ? `${d.Area} m²` : 'N/D'}
                            </div>
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de división disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Información de la Edificación',
            contenido: (
                <>
                    {Object.keys(a).length > 0 ? (
                        <>
                            <div className="detalle-item">
                                <strong>Acerca de la Edificación:</strong> {a.AcercaDeLaEdificacion || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Estrato:</strong> {a.Estrato !== undefined ? a.Estrato : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Tipo construcción:</strong> {a.Tipo_construccion || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Año construcción:</strong> {a.Anio_construccion !== undefined ? a.Anio_construccion : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Estado conservación:</strong> {a.Estado_conservacion || 'N/D'}
                            </div>
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de edificación disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Otras Características',
            contenido: (
                <>
                    {Object.keys(o).length > 0 ? (
                        <>
                            <div className="detalle-item">
                                <strong>Descripción características:</strong> {o.Caracteristicas_descripcion || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Tipo inmueble:</strong> {o.Tipo_inmueble || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Amoblado:</strong> {
                                    o.Amoblado !== undefined 
                                        ? (o.Amoblado === 1 || o.Amoblado === '1' || o.Amoblado === 'Si' || o.Amoblado === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Mascotas permitidas:</strong> {
                                    o.Mascotas_permitidas !== undefined 
                                        ? (o.Mascotas_permitidas === 1 || o.Mascotas_permitidas === '1' || o.Mascotas_permitidas === 'Si' || o.Mascotas_permitidas === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Gas:</strong> {
                                    o.Gas !== undefined 
                                        ? (o.Gas === 1 || o.Gas === '1' || o.Gas === 'Si' || o.Gas === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay otras características disponibles
                        </div>
                    )}
                </>
            )
        }
    ];

    // Dividir grupos en dos columnas
    const mitad = Math.ceil(grupos.length / 2);
    const gruposCol1 = grupos.slice(0, mitad);
    const gruposCol2 = grupos.slice(mitad);

    return (
        <Container className="mt-4">
            <h2 className='admin-dashboard-titulo text-center mb-4'>Detalle del Inmueble</h2>
            
            {/* CARRUSEL GRANDE EN LA PARTE SUPERIOR */}
            <div className="carousel-section mb-5">
                {imagenesArray.length > 0 ? (
                    <>
                        <Carousel 
                            interval={null}
                            indicators={imagenesArray.length > 1}
                            controls={imagenesArray.length > 1}
                            className="carousel-large"
                        >
                            {imagenesArray.map((imagen, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={imagen.URL || 'https://via.placeholder.com/1200x600?text=Sin+Imagen'}
                                        alt={imagen.Nombre || `Imagen ${index + 1}` || 'Inmueble'}
                                        className="d-block w-100"
                                        style={{ 
                                            height: '600px', 
                                            objectFit: 'cover',
                                            borderRadius: '16px'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/1200x600?text=Error+al+cargar+imagen';
                                        }}
                                    />
                                    {imagen.Nombre && (
                                        <Carousel.Caption 
                                            style={{ 
                                                backgroundColor: 'rgba(0,0,0,0.7)', 
                                                borderRadius: '10px',
                                                padding: '15px',
                                                bottom: '30px'
                                            }}
                                        >
                                            <h5 className="mb-0">{imagen.Nombre}</h5>
                                        </Carousel.Caption>
                                    )}
                                </Carousel.Item>
                            ))}
                        </Carousel>
                        {imagenesArray.length > 1 && (
                            <div className="text-center mt-3">
                                <span className="images-counter">
                                    📸 {imagenesArray.length} imagen{imagenesArray.length !== 1 ? 'es' : ''} disponible{imagenesArray.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                    </>
                ) : (
                    <img
                        src='https://via.placeholder.com/1200x600?text=Sin+Imágenes+Disponibles'
                        alt='Sin imágenes'
                        className="img-fluid"
                        style={{ 
                            width: '100%', 
                            height: '600px', 
                            objectFit: 'cover',
                            borderRadius: '16px'
                        }}
                    />
                )}
            </div>

            {/* TARJETAS EN DOS COLUMNAS */}
            <div className="two-columns-grid">
                <div>
                    {gruposCol1.map((grupo, idx) => (
                        <div className="custom-card mb-4" key={grupo.titulo}>
                            <h5 className="card-title">{grupo.titulo}</h5>
                            {grupo.contenido}
                        </div>
                    ))}
                </div>
                <div>
                    {gruposCol2.map((grupo, idx) => (
                        <div className="custom-card mb-4" key={grupo.titulo}>
                            <h5 className="card-title">{grupo.titulo}</h5>
                            {grupo.contenido}
                        </div>
                    ))}
                </div>
            </div>
            
            <style>{`
                body {
                    background: #1C56A7FF;
                }
                
                .carousel-section {
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                }
                
                .carousel-large {
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                }
                
                .carousel-large .carousel-control-prev,
                .carousel-large .carousel-control-next {
                    width: 5%;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 10px;
                    margin: 20px;
                    height: calc(100% - 40px);
                }
                
                .carousel-large .carousel-control-prev-icon,
                .carousel-large .carousel-control-next-icon {
                    width: 30px;
                    height: 30px;
                }
                
                .carousel-large .carousel-indicators {
                    bottom: 20px;
                }
                
                .carousel-large .carousel-indicators button {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    margin: 0 5px;
                }
                
                .images-counter {
                    background: rgba(21, 54, 95, 0.9);
                    color: #FDFDFDFF;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    border: 1px solid #5a7ca3;
                }
                
                .two-columns-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 32px;
                }
                
                .custom-card {
                    border-radius: 16px;
                    border: 1px solid #5a7ca3;
                    background: #15365FFF;
                    box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
                    padding: 24px;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }
                
                .custom-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(135deg, rgba(114, 163, 209, 0.1) 0%, rgba(114, 163, 209, 0.05) 100%);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .custom-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 12px 32px rgba(114, 163, 209, 0.3);
                    border-color: #72A3D1FF;
                }
                
                .custom-card:hover::before {
                    opacity: 1;
                }
                
                .custom-card:hover .card-title {
                    color: #9BC4E2FF;
                    text-shadow: 0 0 10px rgba(114, 163, 209, 0.5);
                }
                
                .custom-card:active {
                    transform: translateY(-4px) scale(1.01);
                    transition: all 0.1s ease;
                }
                
                .card-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #72A3D1FF;
                    margin-bottom: 16px;
                    transition: all 0.3s ease;
                    position: relative;
                    z-index: 1;
                }
                
                .detalle-item {
                    color: #FDFDFDFF;
                    margin-bottom: 12px;
                    padding: 8px 0;
                    border-bottom: 1px solid rgba(114, 163, 209, 0.2);
                    position: relative;
                    z-index: 1;
                    transition: all 0.2s ease;
                }
                
                .custom-card:hover .detalle-item {
                    border-bottom-color: rgba(114, 163, 209, 0.4);
                }
                
                .detalle-item:last-child {
                    border-bottom: none;
                }
                
                .detalle-item strong {
                    color: #72A3D1FF;
                    margin-right: 8px;
                    transition: color 0.3s ease;
                }
                
                .custom-card:hover .detalle-item strong {
                    color: #9BC4E2FF;
                }
                
                .text-muted {
                    color: #8AABCDFF !important;
                    font-style: italic;
                }
                
                .admin-dashboard-titulo {
                    color: #FDFDFDFF;
                }
                
                @media (max-width: 768px) {
                    .two-columns-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }
                    
                    .carousel-large img {
                        height: 400px !important;
                    }
                    
                    .carousel-large .carousel-control-prev,
                    .carousel-large .carousel-control-next {
                        width: 10%;
                        margin: 10px;
                        height: calc(100% - 20px);
                    }
                    
                    .custom-card:hover {
                        transform: translateY(-4px) scale(1.01);
                    }
                }
                
                @media (max-width: 576px) {
                    .carousel-large img {
                        height: 300px !important;
                    }
                    
                    .custom-card:hover {
                        transform: translateY(-2px) scale(1.005);
                    }
                }
            `}</style>
        </Container>
    );
};

export default InmuebleDetail;