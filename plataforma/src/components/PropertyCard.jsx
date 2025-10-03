import React, { useState } from 'react';
import { Card, Button, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { propertyService } from '../services/api';

const PropertyCard = ({ property, onPropertyDeleted }) => {
    console.log('PropertyCard recibió:', property); // Para debug
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Función para manejar la eliminación del inmueble
    const handleDeleteProperty = async () => {
        try {
            setIsDeleting(true);
            
            // Usar eliminación anidada para eliminar el inmueble y todas sus relaciones
            const response = await propertyService.deleteAnidado(property._id || property.Inmueble_id);
            
            console.log('Inmueble eliminado exitosamente:', response.data);
            
            // Cerrar modal
            setShowDeleteModal(false);
            
            // Mostrar mensaje de éxito
            alert('Inmueble eliminado correctamente');
            
            // Llamar callback para actualizar la lista en el componente padre
            if (onPropertyDeleted) {
                onPropertyDeleted(property._id || property.Inmueble_id);
            }
            
        } catch (error) {
            console.error('Error al eliminar inmueble:', error);
            
            // Mostrar mensaje de error específico
            if (error.response?.data?.mensaje) {
                alert(`Error al eliminar: ${error.response.data.mensaje}`);
            } else if (error.response?.data?.error) {
                alert(`Error: ${error.response.data.error}`);
            } else {
                alert('Error al eliminar el inmueble. Inténtalo de nuevo.');
            }
        } finally {
            setIsDeleting(false);
        }
    };

    // Función para mostrar el modal de confirmación
    const showDeleteConfirmation = () => {
        setShowDeleteModal(true);
    };

    // Función para cancelar la eliminación
    const cancelDelete = () => {
        setShowDeleteModal(false);
    };
    
    return (
        <>
            <Col md={4} className="mb-4">
                <Card>
                    <Card.Img 
                        variant="top" 
                        src={property.imagen || 'https://via.placeholder.com/300x200'} 
                        alt={property.titulo}
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body>
                        <Card.Title>{property.titulo}</Card.Title>
                        <Card.Text>
                            <strong>Precio:</strong> ${property.precio}<br/>
                            <strong>Ubicación:</strong> {property.ubicacion}<br/>
                            <strong>Tipo:</strong> {property.tipoPropiedad}<br/>
                            <strong>Habitaciones:</strong> {property.habitaciones}<br/>
                            <strong>Baños:</strong> {property.banos}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                            <Button 
                                as={Link} 
                                to={`/propiedad/${property._id || property.Inmueble_id}`} 
                                variant="primary"
                            >
                                Ver Detalles
                            </Button>
                            {/* Botones de administración */}
                            <div>
                                <Button 
                                    variant="info" 
                                    size="sm" 
                                    className="me-2"
                                    as={Link}
                                    to={`/admin/editar-propiedad/${property._id || property.Inmueble_id}`}
                                >
                                    Editar
                                </Button>
                                <Button 
                                    variant="danger" 
                                    size="sm"
                                    onClick={showDeleteConfirmation}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                </Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* Modal de confirmación para eliminar */}
            <Modal show={showDeleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que deseas eliminar este inmueble?</p>
                    <div className="alert alert-warning">
                        <strong>⚠️ Advertencia:</strong>
                        <ul className="mb-0 mt-2">
                            <li>Esta acción <strong>no se puede deshacer</strong></li>
                            <li>Se eliminará el inmueble y todas sus relaciones asociadas</li>
                            <li>Las imágenes y características específicas también serán eliminadas</li>
                        </ul>
                    </div>
                    <div className="mt-3">
                        <strong>Inmueble a eliminar:</strong><br/>
                        <span className="text-muted">
                            {property.titulo} - ${property.precio}
                        </span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={cancelDelete}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleDeleteProperty}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Eliminando...
                            </>
                        ) : (
                            'Eliminar Definitivamente'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PropertyCard;