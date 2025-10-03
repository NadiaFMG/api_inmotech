import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Spinner, Alert, Carousel } from 'react-bootstrap';
import { inmuebleService } from '../services/propertyService';

const InmuebleDetalle = () => {
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
    
    // Modificar para manejar múltiples imágenes
    const imagenes = property.imagenesInmueble || [];
    const imagenesArray = Array.isArray(imagenes) ? imagenes : [imagenes].filter(Boolean);

    // Crear grupos con el mismo diseño que VenderInmueble (SIN incluir Imágenes)
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
            titulo: 'NDAP',
            contenido: (
                <>
                    {ndap.Ndap_descripcion ? (
                        <div className="detalle-item">
                            <strong>Descripción NDAP:</strong> {ndap.Ndap_descripcion}
                        </div>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información NDAP disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Municipio',
            contenido: (
                <>
                    {municipio.Municipio_nombre || municipio.Municipio_descripcion ? (
                        <>
                            <div className="detalle-item">
                                <strong>Nombre Municipio:</strong> {municipio.Municipio_nombre || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Descripción Municipio:</strong> {municipio.Municipio_descripcion || 'N/D'}
                            </div>
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de municipio disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Barrio/Ciudad/Corregimiento/Vereda',
            contenido: (
                <>
                    {(bccv.barrio?.Nombre_barrio || bccv.ciudad?.Ciudad || bccv.corregimiento?.Corregimiento || bccv.vereda?.Vereda_nombre) ? (
                        <>
                            {bccv.barrio?.Nombre_barrio && (
                                <div className="detalle-item">
                                    <strong>Nombre Barrio:</strong> {bccv.barrio.Nombre_barrio}
                                </div>
                            )}
                            {bccv.ciudad?.Ciudad && (
                                <div className="detalle-item">
                                    <strong>Ciudad:</strong> {bccv.ciudad.Ciudad}
                                </div>
                            )}
                            {bccv.corregimiento?.Corregimiento && (
                                <div className="detalle-item">
                                    <strong>Corregimiento:</strong> {bccv.corregimiento.Corregimiento}
                                </div>
                            )}
                            {bccv.vereda?.Vereda_nombre && (
                                <div className="detalle-item">
                                    <strong>Vereda:</strong> {bccv.vereda.Vereda_nombre}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de ubicación específica disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Localización',
            contenido: (
                <>
                    <div className="detalle-item">
                        <strong>Descripción:</strong> {loc.Localizacion_descripcion || 'N/D'}
                    </div>
                    {loc.Latitud && (
                        <div className="detalle-item">
                            <strong>Latitud:</strong> {loc.Latitud}
                        </div>
                    )}
                    {loc.Longitud && (
                        <div className="detalle-item">
                            <strong>Longitud:</strong> {loc.Longitud}
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Designador Cardinal',
            contenido: (
                <>
                    {designador.Cardinalidad || designador.Abreviacion ? (
                        <>
                            {designador.Cardinalidad && (
                                <div className="detalle-item">
                                    <strong>Cardinalidad:</strong> {designador.Cardinalidad}
                                </div>
                            )}
                            {designador.Abreviacion && (
                                <div className="detalle-item">
                                    <strong>Abreviación:</strong> {designador.Abreviacion}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de designador cardinal disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'División y Espacios',
            contenido: (
                <>
                    {Object.keys(d).length > 0 ? (
                        <>
                            {/* MOSTRAR TODOS LOS CAMPOS, INCLUSO CON VALOR 0 */}
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
                                <strong>Ascensores:</strong> {d.Ascensores || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Área División:</strong> {d.Area ? `${d.Area} m²` : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Closets:</strong> {d.Closets !== undefined ? d.Closets : 'N/D'}
                            </div>
                            {/* CAMPOS BOOLEANOS - CONVERTIR A SÍ/NO */}
                            <div className="detalle-item">
                                <strong>Estudio:</strong> {
                                    d.Estudio !== undefined 
                                        ? (d.Estudio === 1 || d.Estudio === '1' || d.Estudio === 'Si' || d.Estudio === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Sala:</strong> {
                                    d.Sala !== undefined 
                                        ? (d.Sala === 1 || d.Sala === '1' || d.Sala === 'Si' || d.Sala === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Comedor:</strong> {
                                    d.Comedor !== undefined 
                                        ? (d.Comedor === 1 || d.Comedor === '1' || d.Comedor === 'Si' || d.Comedor === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Cocina:</strong> {d.Cocina || 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Zona lavandería:</strong> {
                                    d.Zona_lavanderia !== undefined 
                                        ? (d.Zona_lavanderia === 1 || d.Zona_lavanderia === '1' || d.Zona_lavanderia === 'Si' || d.Zona_lavanderia === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Depósito:</strong> {
                                    d.Deposito !== undefined 
                                        ? (d.Deposito === 1 || d.Deposito === '1' || d.Deposito === 'Si' || d.Deposito === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Descripción adicional:</strong> {d.Descripcion_adicional || 'N/D'}
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
                            {/* CAMPO BOOLEANO - CONVERTIR A SÍ/NO */}
                            <div className="detalle-item">
                                <strong>Zonas comunes:</strong> {
                                    a.Zona_comun !== undefined 
                                        ? (a.Zona_comun === 1 || a.Zona_comun === '1' || a.Zona_comun === 'Si' || a.Zona_comun === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Descripción adicional:</strong> {a.Descripcion_adicional || 'N/D'}
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
            titulo: 'Tipo Edificación',
            contenido: (
                <>
                    {Object.keys(tipo).length > 0 ? (
                        <>
                            {tipo.Tipo_edificacion_categoria && (
                                <div className="detalle-item">
                                    <strong>Categoría:</strong> {tipo.Tipo_edificacion_categoria}
                                </div>
                            )}
                            {tipo.Tipo_edificacion_descripcion && (
                                <div className="detalle-item">
                                    <strong>Descripción:</strong> {tipo.Tipo_edificacion_descripcion}
                                </div>
                            )}
                            {tipo.Tipo_edificacion_niveles && (
                                <div className="detalle-item">
                                    <strong>Niveles:</strong> {tipo.Tipo_edificacion_niveles}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de tipo de edificación disponible
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
                            {/* CAMPOS BOOLEANOS - CONVERTIR A SÍ/NO */}
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
                            <div className="detalle-item">
                                <strong>Lavandería:</strong> {
                                    o.Lavanderia !== undefined 
                                        ? (o.Lavanderia === 1 || o.Lavanderia === '1' || o.Lavanderia === 'Si' || o.Lavanderia === true ? 'Sí' : 'No')
                                        : 'N/D'
                                }
                            </div>
                            <div className="detalle-item">
                                <strong>Piso:</strong> {o.Piso !== undefined ? o.Piso : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Depósito:</strong> {o.Deposito !== undefined ? o.Deposito : 'N/D'}
                            </div>
                            <div className="detalle-item">
                                <strong>Descripción adicional:</strong> {o.Descripcion_adicional || 'N/D'}
                            </div>
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay otras características disponibles
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Asignación',
            contenido: (
                <>
                    {Object.keys(asignacion).length > 0 ? (
                        <>
                            {asignacion.Parqueaderos_asignados && (
                                <div className="detalle-item">
                                    <strong>Parqueaderos asignados:</strong> {
                                        Array.isArray(asignacion.Parqueaderos_asignados) 
                                            ? asignacion.Parqueaderos_asignados.join(', ')
                                            : asignacion.Parqueaderos_asignados
                                    }
                                </div>
                            )}
                            {asignacion.Organizacion_parqueadero_FK && (
                                <div className="detalle-item">
                                    <strong>Organización parqueadero FK:</strong> {asignacion.Organizacion_parqueadero_FK}
                                </div>
                            )}
                            {asignacion.Disponible && (
                                <div className="detalle-item">
                                    <strong>Disponible:</strong> {asignacion.Disponible}
                                </div>
                            )}
                            {asignacion.Descripcion && (
                                <div className="detalle-item">
                                    <strong>Descripción:</strong> {asignacion.Descripcion}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de asignación disponible
                        </div>
                    )}
                </>
            )
        },
        {
            titulo: 'Organización Parqueadero',
            contenido: (
                <>
                    {Object.keys(orgParqueadero).length > 0 ? (
                        <>
                            {orgParqueadero.Tipo_parqueadero && (
                                <div className="detalle-item">
                                    <strong>Tipo parqueadero:</strong> {orgParqueadero.Tipo_parqueadero}
                                </div>
                            )}
                            {orgParqueadero.Cantidad && (
                                <div className="detalle-item">
                                    <strong>Cantidad:</strong> {orgParqueadero.Cantidad}
                                </div>
                            )}
                            {orgParqueadero.Cubierto && (
                                <div className="detalle-item">
                                    <strong>Cubierto:</strong> {orgParqueadero.Cubierto === '1' || orgParqueadero.Cubierto === 1 ? 'Sí' : 'No'}
                                </div>
                            )}
                            {orgParqueadero.Disponible && (
                                <div className="detalle-item">
                                    <strong>Disponible:</strong> {orgParqueadero.Disponible === '1' || orgParqueadero.Disponible === 1 ? 'Sí' : 'No'}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="detalle-item text-muted">
                            No hay información de organización de parqueadero disponible
                        </div>
                    )}
                </>
            )
        }
    ];

    // Divide los grupos en dos columnas
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
                
                /* Efecto de pulso sutil para el carrusel */
                .carousel-large {
                    animation: subtle-pulse 4s ease-in-out infinite;
                }
                
                @keyframes subtle-pulse {
                    0%, 100% {
                        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    }
                    50% {
                        box-shadow: 0 12px 40px rgba(114, 163, 209, 0.2);
                    }
                }
                
                /* Efecto stagger para las tarjetas */
                .custom-card:nth-child(1) { animation-delay: 0.1s; }
                .custom-card:nth-child(2) { animation-delay: 0.2s; }
                .custom-card:nth-child(3) { animation-delay: 0.3s; }
                .custom-card:nth-child(4) { animation-delay: 0.4s; }
                .custom-card:nth-child(5) { animation-delay: 0.5s; }
                .custom-card:nth-child(6) { animation-delay: 0.6s; }
                .custom-card:nth-child(7) { animation-delay: 0.7s; }
                
                .custom-card {
                    animation: fadeInUp 0.6s ease forwards;
                    opacity: 0;
                    transform: translateY(20px);
                }
                
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
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
                
                /* Reducir efectos en dispositivos con menos potencia */
                @media (prefers-reduced-motion: reduce) {
                    .custom-card,
                    .card-title,
                    .detalle-item,
                    .detalle-item strong {
                        transition: none !important;
                    }
                    
                    .custom-card:hover {
                        transform: none !important;
                    }
                    
                    .carousel-large {
                        animation: none !important;
                    }
                    
                    .custom-card {
                        animation: none !important;
                        opacity: 1 !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </Container>
    );
};

export default InmuebleDetalle;