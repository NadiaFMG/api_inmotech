// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Button, Row, Col } from 'react-bootstrap';
// // // // // // import { FaPlus } from 'react-icons/fa';
// // // // // // import { useNavigate } from 'react-router-dom';
// // // // // // import SearchFilter from '../../components/admin/SearchFilter';
// // // // // // import PropertyCard from '../../components/common/PropertyCard';
// // // // // // import {inmuebleService} from '../../services/propertyService';

// // // // // // const AdminProperties = () => {
// // // // // //     const navigate = useNavigate();
// // // // // //     const [properties, setProperties] = useState([]);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [filters, setFilters] = useState({
// // // // // //         search: '',
// // // // // //         estado: '',
// // // // // //         tipo: ''
// // // // // //     });

// // // // // //     const fetchProperties = async () => {
// // // // // //     try {
// // // // // //         const response = await inmuebleService.getAll();
// // // // // //         // Si la respuesta es un objeto con .data, usa .data
// // // // // //         const data = response.data || response;
// // // // // //         if (data && data.propiedades) {
// // // // // //             setProperties(data.propiedades);
// // // // // //         } else if (Array.isArray(data)) {
// // // // // //             setProperties(data);
// // // // // //         }
// // // // // //     } catch (error) {
// // // // // //         console.error('Error fetching properties:', error);
// // // // // //     } finally {
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     };

// // // // // //     useEffect(() => {
// // // // // //         fetchProperties();
// // // // // //     }, []);

// // // // // //     const handleFilterChange = (key, value) => {
// // // // // //         setFilters(prev => ({
// // // // // //             ...prev,
// // // // // //             [key]: value
// // // // // //         }));
// // // // // //     };

// // // // // //     return (
// // // // // //         <div>
// // // // // //             <div className="d-flex justify-content-between align-items-center mb-4">
// // // // // //                 <h2>Gestión de Inmuebles</h2>
// // // // // //                 <Button 
// // // // // //                     variant="primary"
// // // // // //                     onClick={() => navigate('/admin/inmuebles/crear')}
// // // // // //                 >
// // // // // //                     <FaPlus className="me-2" /> Nuevo Inmueble
// // // // // //                 </Button>
// // // // // //             </div>

// // // // // //             <SearchFilter 
// // // // // //                 filters={filters}
// // // // // //                 onFilterChange={handleFilterChange}
// // // // // //             />

// // // // // //             <Row className="mt-4">
// // // // // //                 {properties.map(property => (
// // // // // //                     <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
// // // // // //                         <PropertyCard 
// // // // // //                             property={property} 
// // // // // //                             isAdminView={true}
// // // // // //                         />
// // // // // //                     </Col>
// // // // // //                 ))}
// // // // // //             </Row>
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default AdminProperties;

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Button, Row, Col, Spinner } from 'react-bootstrap';
// // // // // import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// // // // // import { useNavigate } from 'react-router-dom';
// // // // // import SearchFilter from '../../components/admin/SearchFilter';
// // // // // import PropertyCard from '../../components/common/PropertyCard';
// // // // // import { inmuebleService } from '../../services/propertyService';

// // // // // const AdminProperties = () => {
// // // // //   const navigate = useNavigate();
// // // // //   const [properties, setProperties] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [filters, setFilters] = useState({
// // // // //     search: '',
// // // // //     estado: '',
// // // // //     tipo: ''
// // // // //   });

// // // // //   const fetchProperties = async () => {
// // // // //     try {
// // // // //       const response = await inmuebleService.getAll();
// // // // //       const data = response.data || response;
// // // // //       if (data && data.propiedades) {
// // // // //         setProperties(data.propiedades);
// // // // //       } else if (Array.isArray(data)) {
// // // // //         setProperties(data);
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching properties:', error);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     fetchProperties();
// // // // //   }, []);

// // // // //   const handleFilterChange = (key, value) => {
// // // // //     setFilters(prev => ({
// // // // //       ...prev,
// // // // //       [key]: value
// // // // //     }));
// // // // //   };

// // // // //   const handleEdit = (propertyId) => {
// // // // //     navigate(`/admin/inmuebles/editar/${propertyId}`);
// // // // //   };

// // // // //   const handleDelete = async (propertyId) => {
// // // // //     if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
// // // // //       try {
// // // // //         await inmuebleService.delete(propertyId);
// // // // //         setProperties(prev => prev.filter(p => p._id !== propertyId));
// // // // //       } catch (error) {
// // // // //         alert('Error al eliminar el inmueble');
// // // // //       }
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="d-flex justify-content-between align-items-center mb-4">
// // // // //         <h2>Gestión de Inmuebles</h2>
// // // // //         <Button
// // // // //           variant="primary"
// // // // //           onClick={() => navigate('/admin/inmuebles/crear')}
// // // // //         >
// // // // //           <FaPlus className="me-2" /> Nuevo Inmueble
// // // // //         </Button>
// // // // //       </div>

// // // // //       <SearchFilter
// // // // //         filters={filters}
// // // // //         onFilterChange={handleFilterChange}
// // // // //       />

// // // // //       {loading ? (
// // // // //         <div className="d-flex justify-content-center mt-5">
// // // // //           <Spinner animation="border" variant="primary" />
// // // // //         </div>
// // // // //       ) : (
// // // // //         <Row className="mt-4">
// // // // //           {properties.map(property => (
// // // // //             <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
// // // // //               <div className="property-card-admin">
// // // // //                 <PropertyCard
// // // // //                   property={property}
// // // // //                   isAdminView={true}
// // // // //                 />
// // // // //                 <div className="property-card-actions mt-2 d-flex justify-content-end gap-2">
// // // // //                   <Button
// // // // //                     variant="outline-success"
// // // // //                     size="sm"
// // // // //                     onClick={() => handleEdit(property._id)}
// // // // //                   >
// // // // //                     <FaEdit /> Editar
// // // // //                   </Button>
// // // // //                   <Button
// // // // //                     variant="outline-danger"
// // // // //                     size="sm"
// // // // //                     onClick={() => handleDelete(property._id)}
// // // // //                   >
// // // // //                     <FaTrash /> Eliminar
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </div>
// // // // //             </Col>
// // // // //           ))}
// // // // //         </Row>
// // // // //       )}
// // // // //       <style>{`
// // // // //         .property-card-admin {
// // // // //           background: #15365FFF;
// // // // //           border-radius: 16px;
// // // // //           box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
// // // // //           padding: 12px 12px 4px 12px;
// // // // //         }
// // // // //         .property-card-actions .btn {
// // // // //           font-weight: 600;
// // // // //           border-radius: 8px;
// // // // //         }
// // // // //         .property-card-actions .btn-outline-success {
// // // // //           border-color: #72A3D1FF;
// // // // //           color: #72A3D1FF;
// // // // //         }
// // // // //         .property-card-actions .btn-outline-success:hover {
// // // // //           background: #72A3D1FF;
// // // // //           color: #fff;
// // // // //         }
// // // // //         .property-card-actions .btn-outline-danger {
// // // // //           border-color: #e74c3c;
// // // // //           color: #e74c3c;
// // // // //         }
// // // // //         .property-card-actions .btn-outline-danger:hover {
// // // // //           background: #e74c3c;
// // // // //           color: #fff;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default AdminProperties;

// // // // import React, { useState } from 'react';
// // // // import { Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
// // // // import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// // // // import { useNavigate } from 'react-router-dom';
// // // // import SearchFilter from '../../components/admin/SearchFilter';
// // // // import PropertyCard from '../../components/common/PropertyCard';

// // // // // Datos quemados de ejemplo
// // // // const mockProperties = Array.from({ length: 20 }).map((_, idx) => ({
// // // //   _id: `mock${idx + 1}`,
// // // //   titulo: `Apartamento ${idx + 1}`,
// // // //   direccion: `Calle ${idx + 1} #${100 + idx}`,
// // // //   valor: 100000 * (idx + 1),
// // // //   estado: idx % 2 === 0 ? 'Disponible' : 'Ocupado',
// // // //   tipo: idx % 3 === 0 ? 'Casa' : 'Apartamento',
// // // //   descripcion: `Descripción del inmueble ${idx + 1}`,
// // // //   imagen: 'https://via.placeholder.com/300x180.png?text=Inmueble+' + (idx + 1)
// // // // }));

// // // // const PAGE_SIZE = 6;

// // // // const AdminProperties = () => {
// // // //   const navigate = useNavigate();
// // // //   const [properties, setProperties] = useState(mockProperties);
// // // //   const [loading] = useState(false);
// // // //   const [filters, setFilters] = useState({
// // // //     search: '',
// // // //     estado: '',
// // // //     tipo: ''
// // // //   });
// // // //   const [page, setPage] = useState(1);

// // // //   // Filtrado simple (puedes mejorar la lógica)
// // // //   const filtered = properties.filter(p =>
// // // //     p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
// // // //     (filters.estado ? p.estado === filters.estado : true) &&
// // // //     (filters.tipo ? p.tipo === filters.tipo : true)
// // // //   );

// // // //   // Paginado
// // // //   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// // // //   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// // // //   const handleFilterChange = (key, value) => {
// // // //     setFilters(prev => ({
// // // //       ...prev,
// // // //       [key]: value
// // // //     }));
// // // //     setPage(1);
// // // //   };

// // // //   const handleEdit = (propertyId) => {
// // // //     alert(`Editar inmueble: ${propertyId}`);
// // // //   };

// // // //   const handleDelete = (propertyId) => {
// // // //     if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
// // // //       setProperties(prev => prev.filter(p => p._id !== propertyId));
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <div className="d-flex justify-content-between align-items-center mb-4">
// // // //         <h2>Gestión de Inmuebles</h2>
// // // //         <Button
// // // //           variant="primary"
// // // //           onClick={() => navigate('/admin/inmuebles/crear')}
// // // //         >
// // // //           <FaPlus className="me-2" /> Nuevo Inmueble
// // // //         </Button>
// // // //       </div>

// // // //       <SearchFilter
// // // //         filters={filters}
// // // //         onFilterChange={handleFilterChange}
// // // //       />

// // // //       {loading ? (
// // // //         <div className="d-flex justify-content-center mt-5">
// // // //           <Spinner animation="border" variant="primary" />
// // // //         </div>
// // // //       ) : (
// // // //         <>
// // // //           <Row className="mt-4">
// // // //             {paginated.map(property => (
// // // //               <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
// // // //                 <div className="property-card-admin">
// // // //                   <PropertyCard
// // // //                     property={property}
// // // //                     isAdminView={true}
// // // //                   />
// // // //                   <div className="property-card-actions mt-2 d-flex justify-content-end gap-2">
// // // //                     <Button
// // // //                       variant="outline-success"
// // // //                       size="sm"
// // // //                       onClick={() => handleEdit(property._id)}
// // // //                     >
// // // //                       <FaEdit /> Editar
// // // //                     </Button>
// // // //                     <Button
// // // //                       variant="outline-danger"
// // // //                       size="sm"
// // // //                       onClick={() => handleDelete(property._id)}
// // // //                     >
// // // //                       <FaTrash /> Eliminar
// // // //                     </Button>
// // // //                   </div>
// // // //                 </div>
// // // //               </Col>
// // // //             ))}
// // // //           </Row>
// // // //           <div className="d-flex justify-content-center mt-4">
// // // //             <Pagination>
// // // //               <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
// // // //               <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
// // // //               {Array.from({ length: totalPages }).map((_, idx) => (
// // // //                 <Pagination.Item
// // // //                   key={idx + 1}
// // // //                   active={page === idx + 1}
// // // //                   onClick={() => setPage(idx + 1)}
// // // //                 >
// // // //                   {idx + 1}
// // // //                 </Pagination.Item>
// // // //               ))}
// // // //               <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
// // // //               <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
// // // //             </Pagination>
// // // //           </div>
// // // //         </>
// // // //       )}
// // // //       <style>{`
// // // //         .property-card-admin {
// // // //           background: #15365FFF;
// // // //           border-radius: 16px;
// // // //           box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
// // // //           padding: 12px 12px 4px 12px;
// // // //         }
// // // //         .property-card-actions .btn {
// // // //           font-weight: 600;
// // // //           border-radius: 8px;
// // // //         }
// // // //         .property-card-actions .btn-outline-success {
// // // //           border-color: #72A3D1FF;
// // // //           color: #72A3D1FF;
// // // //         }
// // // //         .property-card-actions .btn-outline-success:hover {
// // // //           background: #72A3D1FF;
// // // //           color: #fff;
// // // //         }
// // // //         .property-card-actions .btn-outline-danger {
// // // //           border-color: #e74c3c;
// // // //           color: #e74c3c;
// // // //         }
// // // //         .property-card-actions .btn-outline-danger:hover {
// // // //           background: #e74c3c;
// // // //           color: #fff;
// // // //         }
// // // //       `}</style>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminProperties;
// // // import React, { useState } from 'react';
// // // import { Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
// // // import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// // // import { useNavigate } from 'react-router-dom';
// // // import SearchFilter from '../../components/admin/SearchFilter';
// // // import PropertyCard from '../../components/common/PropertyCard';

// // // // Datos quemados de ejemplo
// // // const mockProperties = Array.from({ length: 20 }).map((_, idx) => ({
// // //   _id: `mock${idx + 1}`,
// // //   titulo: `Apartamento ${idx + 1}`,
// // //   direccion: `Calle ${idx + 1} #${100 + idx}`,
// // //   valor: 100000 * (idx + 1),
// // //   estado: idx % 2 === 0 ? 'Disponible' : 'Ocupado',
// // //   tipo: idx % 3 === 0 ? 'Casa' : 'Apartamento',
// // //   descripcion: `Descripción del inmueble ${idx + 1}`,
// // //   imagen: 'https://via.placeholder.com/300x180.png?text=Inmueble+' + (idx + 1)
// // // }));

// // // const PAGE_SIZE = 6;

// // // const AdminProperties = () => {
// // //   const navigate = useNavigate();
// // //   const [properties, setProperties] = useState(mockProperties);
// // //   const [loading] = useState(false);
// // //   const [filters, setFilters] = useState({
// // //     search: '',
// // //     estado: '',
// // //     tipo: ''
// // //   });
// // //   const [page, setPage] = useState(1);

// // //   // Filtrado simple (puedes mejorar la lógica)
// // //   const filtered = properties.filter(p =>
// // //     p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
// // //     (filters.estado ? p.estado === filters.estado : true) &&
// // //     (filters.tipo ? p.tipo === filters.tipo : true)
// // //   );

// // //   // Paginado
// // //   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// // //   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// // //   const handleFilterChange = (key, value) => {
// // //     setFilters(prev => ({
// // //       ...prev,
// // //       [key]: value
// // //     }));
// // //     setPage(1);
// // //   };

// // //   const handleEdit = (propertyId) => {
// // //     alert(`Editar inmueble: ${propertyId}`);
// // //   };

// // //   const handleDelete = (propertyId) => {
// // //     if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
// // //       setProperties(prev => prev.filter(p => p._id !== propertyId));
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className="d-flex justify-content-between align-items-center mb-4">
// // //         <h2>Gestión de Inmuebles</h2>
// // //         <Button
// // //           variant="primary"
// // //           onClick={() => navigate('/admin/inmuebles/crear')}
// // //         >
// // //           <FaPlus className="me-2" /> Nuevo Inmueble
// // //         </Button>
// // //       </div>

// // //       <SearchFilter
// // //         filters={filters}
// // //         onFilterChange={handleFilterChange}
// // //       />

// // //       {loading ? (
// // //         <div className="d-flex justify-content-center mt-5">
// // //           <Spinner animation="border" variant="primary" />
// // //         </div>
// // //       ) : (
// // //         <>
// // //           <Row className="mt-4">
// // //             {paginated.map(property => (
// // //               <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
// // //                 <div className="property-card-admin">
// // //                   <PropertyCard
// // //                     property={property}
// // //                     isAdminView={true}
// // //                   />
// // //                   <div className="property-card-actions mt-2 d-flex justify-content-end gap-2">
// // //                     <Button
// // //                       variant="outline-success"
// // //                       size="sm"
// // //                       onClick={() => handleEdit(property._id)}
// // //                     >
// // //                       <FaEdit /> Editar
// // //                     </Button>
// // //                     <Button
// // //                       variant="outline-danger"
// // //                       size="sm"
// // //                       onClick={() => handleDelete(property._id)}
// // //                     >
// // //                       <FaTrash /> Eliminar
// // //                     </Button>
// // //                   </div>
// // //                 </div>
// // //               </Col>
// // //             ))}
// // //           </Row>
// // //           <div className="d-flex justify-content-center mt-4">
// // //             <Pagination>
// // //               <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
// // //               <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
// // //               {Array.from({ length: totalPages }).map((_, idx) => (
// // //                 <Pagination.Item
// // //                   key={idx + 1}
// // //                   active={page === idx + 1}
// // //                   onClick={() => setPage(idx + 1)}
// // //                 >
// // //                   {idx + 1}
// // //                 </Pagination.Item>
// // //               ))}
// // //               <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
// // //               <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
// // //             </Pagination>
// // //           </div>
// // //         </>
// // //       )}
// // //       <style>{`
// // //         .property-card-admin {
// // //           background: #15365FFF;
// // //           border-radius: 16px;
// // //           box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
// // //           padding: 12px 12px 4px 12px;
// // //         }
// // //         .property-card-actions .btn {
// // //           font-weight: 600;
// // //           border-radius: 8px;
// // //         }
// // //         .property-card-actions .btn-outline-success {
// // //           border-color: #72A3D1FF;
// // //           color: #72A3D1FF;
// // //         }
// // //         .property-card-actions .btn-outline-success:hover {
// // //           background: #72A3D1FF;
// // //           color: #fff;
// // //         }
// // //         .property-card-actions .btn-outline-danger {
// // //           border-color: #e74c3c;
// // //           color: #e74c3c;
// // //         }
// // //         .property-card-actions .btn-outline-danger:hover {
// // //           background: #e74c3c;
// // //           color: #fff;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // };

// // // export default AdminProperties;

// // import React, { useState } from 'react';
// // import { Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
// // import { FaPlus } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// // import SearchFilter from '../../components/admin/SearchFilter';
// // import PropertyCard from '../../components/common/PropertyCard';

// // // Datos quemados de ejemplo
// // const mockProperties = Array.from({ length: 20 }).map((_, idx) => ({
// //   _id: `mock${idx + 1}`,
// //   titulo: `Apartamento ${idx + 1}`,
// //   direccion: `Calle ${idx + 1} #${100 + idx}`,
// //   valor: 100000 * (idx + 1),
// //   estado: idx % 2 === 0 ? 'Disponible' : 'Ocupado',
// //   tipo: idx % 3 === 0 ? 'Casa' : 'Apartamento',
// //   descripcion: `Descripción del inmueble ${idx + 1}`,
// //   imagen: 'https://via.placeholder.com/300x180.png?text=Inmueble+' + (idx + 1)
// // }));

// // const PAGE_SIZE = 20;

// // const AdminProperties = () => {
// //   const navigate = useNavigate();
// //   const [properties, setProperties] = useState(mockProperties);
// //   const [loading] = useState(false);
// //   const [filters, setFilters] = useState({
// //     search: '',
// //     estado: '',
// //     tipo: ''
// //   });
// //   const [page, setPage] = useState(1);

// //   // Filtrado simple
// //   const filtered = properties.filter(p =>
// //     p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
// //     (filters.estado ? p.estado === filters.estado : true) &&
// //     (filters.tipo ? p.tipo === filters.tipo : true)
// //   );

// //   // Paginado
// //   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
// //   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

// //   const handleFilterChange = (key, value) => {
// //     setFilters(prev => ({
// //       ...prev,
// //       [key]: value
// //     }));
// //     setPage(1);
// //   };

// //   const handleEdit = (propertyId) => {
// //     alert(`Editar inmueble: ${propertyId}`);
// //   };

// //   const handleDelete = (propertyId) => {
// //     if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
// //       setProperties(prev => prev.filter(p => p._id !== propertyId));
// //     }
// //   };

// //   const handleCardClick = (propertyId, e) => {
// //     // Evita que el click en los botones dentro de la carta active este evento
// //     if (e.target.closest('.property-card-actions')) return;
// //     navigate(`/admin/inmuebles/${propertyId}`);
// //   };

// //   return (
// //     <div>
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2>Gestión de Inmuebles</h2>
// //         <Button
// //           variant="primary"
// //           onClick={() => navigate('/admin/inmuebles/crear')}
// //         >
// //           <FaPlus className="me-2" /> Nuevo Inmueble
// //         </Button>
// //       </div>

// //       <SearchFilter
// //         filters={filters}
// //         onFilterChange={handleFilterChange}
// //       />

// //       {loading ? (
// //         <div className="d-flex justify-content-center mt-5">
// //           <Spinner animation="border" variant="primary" />
// //         </div>
// //       ) : (
// //         <>
// //           <Row className="mt-4">
// //             {paginated.map(property => (
// //               <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
// //                 <div
// //                   className="property-card-admin clickable-card"
// //                   onClick={e => handleCardClick(property._id, e)}
// //                   tabIndex={0}
// //                   role="button"
// //                   style={{ cursor: 'pointer' }}
// //                 >
// //                   <PropertyCard
// //                     property={property}
// //                     isAdminView={true}
// //                     onEdit={() => handleEdit(property._id)}
// //                     onDelete={() => handleDelete(property._id)}
// //                   />
// //                   {/* Los botones Editar/Eliminar deben estar SOLO dentro de PropertyCard */}
// //                 </div>
// //               </Col>
// //             ))}
// //           </Row>
// //           <div className="d-flex justify-content-center mt-4">
// //             <Pagination>
// //               <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
// //               <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
// //               {Array.from({ length: totalPages }).map((_, idx) => (
// //                 <Pagination.Item
// //                   key={idx + 1}
// //                   active={page === idx + 1}
// //                   onClick={() => setPage(idx + 1)}
// //                 >
// //                   {idx + 1}
// //                 </Pagination.Item>
// //               ))}
// //               <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
// //               <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
// //             </Pagination>
// //           </div>
// //         </>
// //       )}
// //       <style>{`
// //         .property-card-admin {
// //           background: #15365FFF;
// //           border-radius: 16px;
// //           box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
// //           padding: 12px 12px 4px 12px;
// //           transition: box-shadow 0.2s;
// //         }
// //         .property-card-admin.clickable-card:hover {
// //           box-shadow: 0 4px 16px rgba(60, 90, 130, 0.18);
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default AdminProperties;

// import React, { useState } from 'react';
// import { Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
// import { FaPlus } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import SearchFilter from '../../components/admin/SearchFilter';
// import PropertyCard from '../../components/common/PropertyCard';

// // Datos quemados de ejemplo
// const mockProperties = Array.from({ length: 20 }).map((_, idx) => ({
//   _id: `mock${idx + 1}`,
//   titulo: `Apartamento ${idx + 1}`,
//   direccion: `Calle ${idx + 1} #${100 + idx}`,
//   valor: 100000 * (idx + 1),
//   estado: idx % 2 === 0 ? 'Disponible' : 'Ocupado',
//   tipo: idx % 3 === 0 ? 'Casa' : 'Apartamento',
//   descripcion: `Descripción del inmueble ${idx + 1}`,
//   imagen: 'https://via.placeholder.com/300x180.png?text=Inmueble+' + (idx + 1)
// }));

// const PAGE_SIZE = 20;

// const AdminProperties = () => {
//   const navigate = useNavigate();
//   const [properties, setProperties] = useState(mockProperties);
//   const [loading] = useState(false);
//   const [filters, setFilters] = useState({
//     search: '',
//     estado: '',
//     tipo: ''
//   });
//   const [page, setPage] = useState(1);

//   // Filtrado simple
//   const filtered = properties.filter(p =>
//     p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
//     (filters.estado ? p.estado === filters.estado : true) &&
//     (filters.tipo ? p.tipo === filters.tipo : true)
//   );

//   // Paginado
//   const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
//   const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value
//     }));
//     setPage(1);
//   };

//   const handleEdit = (propertyId) => {
//     alert(`Editar inmueble: ${propertyId}`);
//   };

//   const handleDelete = (propertyId) => {
//     if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
//       setProperties(prev => prev.filter(p => p._id !== propertyId));
//     }
//   };

//   const handleCardClick = (propertyId, e) => {
//     // Evita que el click en los botones dentro de la carta active este evento
//     if (e.target.closest('.property-card-actions')) return;
//     navigate(`/admin/inmuebles/${propertyId}`);
//   };

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Gestión de Inmuebles</h2>
//         <Button
//           variant="primary"
//           onClick={() => navigate('/admin/inmuebles/crear')}
//         >
//           <FaPlus className="me-2" /> Nuevo Inmueble
//         </Button>
//       </div>

//       <SearchFilter
//         filters={filters}
//         onFilterChange={handleFilterChange}
//       />

//       {loading ? (
//         <div className="d-flex justify-content-center mt-5">
//           <Spinner animation="border" variant="primary" />
//         </div>
//       ) : (
//         <>
//           <Row className="mt-4">
//             {paginated.map(property => (
//               <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
//                 <div
//                   className="property-card-admin clickable-card"
//                   onClick={e => handleCardClick(property._id, e)}
//                   tabIndex={0}
//                   role="button"
//                   style={{ cursor: 'pointer' }}
//                 >
//                   <PropertyCard
//                     property={property}
//                     isAdminView={true}
//                     onEdit={() => handleEdit(property._id)}
//                     onDelete={() => handleDelete(property._id)}
//                   />
//                 </div>
//               </Col>
//             ))}
//           </Row>
//           <div className="d-flex justify-content-center mt-4">
//             <Pagination>
//               <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
//               <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
//               {Array.from({ length: totalPages }).map((_, idx) => (
//                 <Pagination.Item
//                   key={idx + 1}
//                   active={page === idx + 1}
//                   onClick={() => setPage(idx + 1)}
//                 >
//                   {idx + 1}
//                 </Pagination.Item>
//               ))}
//               <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
//               <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
//             </Pagination>
//           </div>
//         </>
//       )}
//       <style>{`
//         .property-card-admin {
//           background: #15365FFF;
//           border-radius: 16px;
//           box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
//           padding: 12px 12px 4px 12px;
//           transition: box-shadow 0.2s;
//         }
//         .property-card-admin.clickable-card:hover {
//           box-shadow: 0 4px 16px rgba(60, 90, 130, 0.18);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminProperties;

import React, { useState } from 'react';
import { Button, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../../components/admin/SearchFilter';
import PropertyCard from '../../components/common/PropertyCard';

// Datos quemados de ejemplo
const mockProperties = Array.from({ length: 20 }).map((_, idx) => ({
  _id: `mock${idx + 1}`,
  titulo: `Apartamento ${idx + 1}`,
  direccion: `Calle ${idx + 1} #${100 + idx}`,
  valor: 100000 * (idx + 1),
  estado: idx % 2 === 0 ? 'Disponible' : 'Ocupado',
  tipo: idx % 3 === 0 ? 'Casa' : 'Apartamento',
  descripcion: `Descripción del inmueble ${idx + 1}`,
  imagen: 'https://via.placeholder.com/300x180.png?text=Inmueble+' + (idx + 1)
}));

const PAGE_SIZE = 20;

const AdminProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(mockProperties);
  const [loading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    estado: '',
    tipo: ''
  });
  const [page, setPage] = useState(1);

  // Filtrado simple
  const filtered = properties.filter(p =>
    p.titulo.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.estado ? p.estado === filters.estado : true) &&
    (filters.tipo ? p.tipo === filters.tipo : true)
  );

  // Paginado
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setPage(1);
  };

  const handleEdit = (propertyId) => {
    alert(`Editar inmueble: ${propertyId}`);
  };

  const handleDelete = (propertyId) => {
    if (window.confirm('¿Seguro que deseas eliminar este inmueble?')) {
      setProperties(prev => prev.filter(p => p._id !== propertyId));
    }
  };

  // Navega al detalle del inmueble al hacer clic en la carta (excepto en los botones)
  const handleCardClick = (propertyId, e) => {
    if (e.target.closest('.property-card-actions')) return;
    navigate(`/inmuebles/${propertyId}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Inmuebles</h2>
        <Button
          variant="primary"
          onClick={() => navigate('/admin/inmuebles/crear')}
        >
          <FaPlus className="me-2" /> Nuevo Inmueble
        </Button>
      </div>

      <SearchFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Row className="mt-4">
            {paginated.map(property => (
              <Col key={property._id} xs={12} md={6} lg={4} className="mb-4">
                <div
                  className="property-card-admin clickable-card"
                  onClick={e => handleCardClick(property._id, e)}
                  tabIndex={0}
                  role="button"
                  style={{ cursor: 'pointer' }}
                >
                  <PropertyCard
                    property={property}
                    isAdminView={true}
                    onEdit={() => handleEdit(property._id)}
                    onDelete={() => handleDelete(property._id)}
                  />
                </div>
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
              <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={page === idx + 1}
                  onClick={() => setPage(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
              <Pagination.Last disabled={page === totalPages} onClick={() => setPage(totalPages)} />
            </Pagination>
          </div>
        </>
      )}
      <style>{`
        .property-card-admin {
          background: #15365FFF;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(60, 90, 130, 0.08);
          padding: 12px 12px 4px 12px;
          transition: box-shadow 0.2s;
        }
        .property-card-admin.clickable-card:hover {
          box-shadow: 0 4px 16px rgba(60, 90, 130, 0.18);
        }
      `}</style>
    </div>
  );
};

export default AdminProperties;