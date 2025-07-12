// // import React from 'react';
// // import { Card, Button } from 'react-bootstrap';
// // import { Link } from 'react-router-dom';

// // const PropertyCard = ({ property, isAdminView }) => {
// //     console.log('Property data received:', property); // Debug log

// //     return (
// //         <Card className="h-100">
// //             <Card.Img 
// //                 variant="top" 
// //                 src={property.imagen} 
// //                 alt={property.titulo}
// //                 style={{ height: '200px', objectFit: 'cover' }}
// //             />
// //             <Card.Body>
// //                 <Card.Title>{property.titulo}</Card.Title>
// //                 <Card.Text>
// //                     <strong>Precio:</strong> ${property.precio}<br/>
// //                     <strong>Ubicación:</strong> {property.ubicacion}<br/>
// //                     <strong>Tipo:</strong> {property.tipoPropiedad}<br/>
// //                     <strong>Habitaciones:</strong> {property.habitaciones}<br/>
// //                     <strong>Baños:</strong> {property.banos}<br/>
// //                     <strong>Área:</strong> {property.area} m²
// //                 </Card.Text>
// //                 {isAdminView ? (
// //                     <div className="d-flex justify-content-between">
// //                         <Button 
// //                             as={Link} 
// //                             to={`/admin/inmuebles/editar/${property._id}`}
// //                             variant="info"
// //                             size="sm"
// //                         >
// //                             Editar
// //                         </Button>
// //                         <Button 
// //                             variant="danger"
// //                             size="sm"
// //                         >
// //                             Eliminar
// //                         </Button>
// //                     </div>
// //                 ) : (
// //                     <Button 
// //                         as={Link} 
// //                         to={`/inmueble/${property._id}`}
// //                         variant="primary"
// //                     >
// //                         Ver Detalles
// //                     </Button>
// //                 )}
// //             </Card.Body>
// //         </Card>
// //     );
// // };

// // export default PropertyCard;

// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const PropertyCard = ({ property, isAdminView }) => {
//     // Mira en la consola cómo llegan los datos
//     console.log('Property data received:', property);

//     return (
//         <Card className="h-100">
//             <Card.Img 
//                 variant="top" 
//                 src={property.imagen_destacada || property.imagen || 'https://via.placeholder.com/400x200?text=Sin+Imagen'} 
//                 alt={property.titulo || property.descripcion || 'Inmueble'}
//                 style={{ height: '200px', objectFit: 'cover' }}
//             />
//             <Card.Body>
//                 <Card.Title>{property.titulo || property.descripcion || 'Inmueble'}</Card.Title>
//                 <Card.Text>
//                     <strong>Precio:</strong> ${property.valor || property.precio || 'N/D'}<br/>
//                     <strong>Ubicación:</strong> {property.direccion || property.ubicacion || property.ciudad || 'N/D'}<br/>
//                     <strong>Tipo:</strong> {property.tipo_edificacion || property.tipoPropiedad || 'N/D'}<br/>
//                     <strong>Habitaciones:</strong> {property.num_habitaciones || property.habitaciones || 'N/D'}<br/>
//                     <strong>Baños:</strong> {property.num_banos || property.banos || 'N/D'}<br/>
//                     <strong>Área:</strong> {property.area_total || property.area || 'N/D'} m²
//                 </Card.Text>
//                 {isAdminView ? (
//                     <div className="d-flex justify-content-between">
//                         <Button 
//                             as={Link} 
//                             to={`/admin/inmuebles/editar/${property._id || property.id}`}
//                             variant="info"
//                             size="sm"
//                         >
//                             Editar
//                         </Button>
//                         <Button 
//                             variant="danger"
//                             size="sm"
//                         >
//                             Eliminar
//                         </Button>
//                     </div>
//                 ) : (
//                     <Button 
//                         as={Link} 
//                         to={`/inmueble/${property._id || property.id}`}
//                         variant="primary"
//                     >
//                         Ver Detalles
//                     </Button>
//                 )}
//             </Card.Body>
//         </Card>
//     );
// };

// export default PropertyCard;

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property, isAdminView }) => {
    // Debug: muestra el objeto recibido
    console.log('Property data received:', property);

    return (
        <Card className="h-100">
            <Card.Img 
                variant="top" 
                src={'https://via.placeholder.com/400x200?text=Sin+Imagen'} 
                alt={property.Descripcion_General || 'Inmueble'}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <Card.Body>
                <Card.Title>{property.Descripcion_General || 'Inmueble'}</Card.Title>
                <Card.Text>
                    <strong>Precio:</strong> ${property.Valor || 'N/D'}<br/>
                    <strong>Área:</strong> {property.Area || 'N/D'} m²<br/>
                    <strong>Antigüedad:</strong> {property.Antiguedad || 'N/D'} años<br/>
                    <strong>Estado:</strong> {property.Estado || 'N/D'}<br/>
                    <strong>Código Interno:</strong> {property.Codigo_interno || 'N/D'}<br/>
                </Card.Text>
                {isAdminView ? (
                    <div className="d-flex justify-content-between">
                        <Button 
                            as={Link} 
                            to={`/admin/inmuebles/editar/${property.Inmueble_id}`}
                            variant="info"
                            size="sm"
                        >
                            Editar
                        </Button>
                        <Button 
                            variant="danger"
                            size="sm"
                        >
                            Eliminar
                        </Button>
                    </div>
                ) : (
                    <Button 
                        as={Link} 
                        to={`/inmueble/${property.Inmueble_id}`}
                        variant="primary"
                    >
                        Ver Detalles
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default PropertyCard;