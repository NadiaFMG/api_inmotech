// // // // // // // // import React from 'react';

// // // // // // // // const perfilMock = {
// // // // // // // //   nombre: 'Jonathan Pérez',
// // // // // // // //   usuario: 'jonathanp',
// // // // // // // //   correo: 'jonathan.perez@email.com',
// // // // // // // //   telefono: '+57 312 123 4567',
// // // // // // // //   rol: 'Administrador',
// // // // // // // //   fechaRegistro: '2024-01-15',
// // // // // // // //   estado: 'Activo',
// // // // // // // //   avatar: '/assets/images/logo/logo_200x200.png',
// // // // // // // //   descripcion: 'Administrador principal de la plataforma InmoTech. Encargado de la gestión de inmuebles, usuarios y visualizaciones.',
// // // // // // // //   direccion: 'Cra 45 #12-34, Bogotá, Colombia',
// // // // // // // //   documento: 'CC 1234567890',
// // // // // // // //   fechaNacimiento: '1990-06-25',
// // // // // // // //   genero: 'Masculino'
// // // // // // // // };

// // // // // // // // const PerfilAdmin = () => (
// // // // // // // //   <div className="perfil-admin-card">
// // // // // // // //     <div className="perfil-header">
// // // // // // // //       <img src={perfilMock.avatar} alt="Avatar" className="perfil-avatar" />
// // // // // // // //       <div>
// // // // // // // //         <h2 className="perfil-nombre">{perfilMock.nombre}</h2>
// // // // // // // //         <span className="perfil-rol">{perfilMock.rol}</span>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //     <div className="perfil-info">
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Usuario:</span>
// // // // // // // //         <span>{perfilMock.usuario}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Correo:</span>
// // // // // // // //         <span>{perfilMock.correo}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Teléfono:</span>
// // // // // // // //         <span>{perfilMock.telefono}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Documento:</span>
// // // // // // // //         <span>{perfilMock.documento}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Dirección:</span>
// // // // // // // //         <span>{perfilMock.direccion}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Fecha de nacimiento:</span>
// // // // // // // //         <span>{perfilMock.fechaNacimiento}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Género:</span>
// // // // // // // //         <span>{perfilMock.genero}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Fecha de registro:</span>
// // // // // // // //         <span>{perfilMock.fechaRegistro}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Estado:</span>
// // // // // // // //         <span>{perfilMock.estado}</span>
// // // // // // // //       </div>
// // // // // // // //       <div className="perfil-info-row">
// // // // // // // //         <span className="perfil-label">Descripción:</span>
// // // // // // // //         <span>{perfilMock.descripcion}</span>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //     <div className="perfil-actions">
// // // // // // // //       <button className="perfil-btn editar">Editar Perfil</button>
// // // // // // // //       <button className="perfil-btn cerrar">Cerrar Sesión</button>
// // // // // // // //     </div>
// // // // // // // //     <style>{`
// // // // // // // //       .perfil-admin-card {
// // // // // // // //         max-width: 480px;
// // // // // // // //         margin: 2rem auto;
// // // // // // // //         background: #15365FFF;
// // // // // // // //         border-radius: 18px;
// // // // // // // //         box-shadow: 0 2px 12px rgba(60,90,130,0.12);
// // // // // // // //         padding: 32px 28px;
// // // // // // // //         color: #FDFDFDFF;
// // // // // // // //       }
// // // // // // // //       .perfil-header {
// // // // // // // //         display: flex;
// // // // // // // //         align-items: center;
// // // // // // // //         gap: 24px;
// // // // // // // //         margin-bottom: 24px;
// // // // // // // //       }
// // // // // // // //       .perfil-avatar {
// // // // // // // //         width: 90px;
// // // // // // // //         height: 90px;
// // // // // // // //         border-radius: 50%;
// // // // // // // //         object-fit: cover;
// // // // // // // //         border: 3px solid #72A3D1FF;
// // // // // // // //         background: #fff;
// // // // // // // //       }
// // // // // // // //       .perfil-nombre {
// // // // // // // //         font-size: 1.6rem;
// // // // // // // //         font-weight: 700;
// // // // // // // //         margin-bottom: 6px;
// // // // // // // //         color: #72A3D1FF;
// // // // // // // //       }
// // // // // // // //       .perfil-rol {
// // // // // // // //         background: #1C56A7FF;
// // // // // // // //         color: #FDFDFDFF;
// // // // // // // //         padding: 4px 14px;
// // // // // // // //         border-radius: 8px;
// // // // // // // //         font-size: 1rem;
// // // // // // // //         font-weight: 500;
// // // // // // // //       }
// // // // // // // //       .perfil-info {
// // // // // // // //         margin-bottom: 28px;
// // // // // // // //       }
// // // // // // // //       .perfil-info-row {
// // // // // // // //         display: flex;
// // // // // // // //         justify-content: space-between;
// // // // // // // //         margin-bottom: 10px;
// // // // // // // //         font-size: 1.08rem;
// // // // // // // //       }
// // // // // // // //       .perfil-label {
// // // // // // // //         font-weight: 600;
// // // // // // // //         color: #72A3D1FF;
// // // // // // // //         margin-right: 10px;
// // // // // // // //       }
// // // // // // // //       .perfil-actions {
// // // // // // // //         display: flex;
// // // // // // // //         gap: 18px;
// // // // // // // //         justify-content: center;
// // // // // // // //         margin-top: 18px;
// // // // // // // //       }
// // // // // // // //       .perfil-btn {
// // // // // // // //         background: #1C56A7FF;
// // // // // // // //         color: #FDFDFDFF;
// // // // // // // //         border: none;
// // // // // // // //         border-radius: 10px;
// // // // // // // //         font-size: 1.08rem;
// // // // // // // //         font-weight: 600;
// // // // // // // //         padding: 10px 28px;
// // // // // // // //         box-shadow: 0 2px 8px rgba(60,90,130,0.10);
// // // // // // // //         transition: background 0.2s, color 0.2s;
// // // // // // // //         cursor: pointer;
// // // // // // // //       }
// // // // // // // //       .perfil-btn.editar:hover {
// // // // // // // //         background: #72A3D1FF;
// // // // // // // //         color: #15365FFF;
// // // // // // // //       }
// // // // // // // //       .perfil-btn.cerrar {
// // // // // // // //         background: #e74c3c;
// // // // // // // //       }
// // // // // // // //       .perfil-btn.cerrar:hover {
// // // // // // // //         background: #c0392b;
// // // // // // // //         color: #fff;
// // // // // // // //       }
// // // // // // // //     `}</style>
// // // // // // // //   </div>
// // // // // // // // );

// // // // // // // // export default PerfilAdmin;

// // // // // // // import React, { useEffect, useState } from 'react';
// // // // // // // import { platformProfileService } from '../services/api';

// // // // // // // const PerfilAdmin = () => {
// // // // // // //   const [perfil, setPerfil] = useState(null);
// // // // // // //   const [loading, setLoading] = useState(true);

// // // // // // //   useEffect(() => {
// // // // // // //     // Obtén el usuario logueado desde localStorage
// // // // // // //     const user = JSON.parse(localStorage.getItem('user'));
// // // // // // //     if (!user) {
// // // // // // //       setLoading(false);
// // // // // // //       return;
// // // // // // //     }
// // // // // // //     // Busca el perfil por el Platform_user_id
// // // // // // //     platformProfileService.getAll().then(res => {
// // // // // // //       // Busca el perfil que corresponde al usuario logueado
// // // // // // //       const perfilUsuario = res.data.find(
// // // // // // //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// // // // // // //       );
// // // // // // //       setPerfil(perfilUsuario || null);
// // // // // // //       setLoading(false);
// // // // // // //     }).catch(() => setLoading(false));
// // // // // // //   }, []);

// // // // // // //   if (loading) {
// // // // // // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// // // // // // //   }

// // // // // // //   if (!perfil) {
// // // // // // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>No se encontró el perfil.</div>;
// // // // // // //   }

// // // // // // //   return (
// // // // // // //     <div className="perfil-admin-card">
// // // // // // //       <div className="perfil-header">
// // // // // // //         <img src={perfil.Profile_photo || '/assets/images/logo/logo_200x200.png'} alt="Avatar" className="perfil-avatar" />
// // // // // // //         <div>
// // // // // // //           <h2 className="perfil-nombre">{perfil.Profile_name} {perfil.Profile_lastname}</h2>
// // // // // // //           <span className="perfil-rol">{perfil.Profile_bio || 'Usuario'}</span>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //       <div className="perfil-info">
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Correo:</span>
// // // // // // //           <span>{perfil.Profile_email}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Teléfono:</span>
// // // // // // //           <span>{perfil.Profile_phone}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Documento:</span>
// // // // // // //           <span>{perfil.Profile_national_id}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Dirección:</span>
// // // // // // //           <span>{perfil.Profile_addres}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Fecha de nacimiento:</span>
// // // // // // //           <span>{perfil.Profile_birthdate}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Género:</span>
// // // // // // //           <span>{perfil.Profile_gender}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Sitio web:</span>
// // // // // // //           <span>{perfil.Profile_website}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Red social:</span>
// // // // // // //           <span>{perfil.Profile_social}</span>
// // // // // // //         </div>
// // // // // // //         <div className="perfil-info-row">
// // // // // // //           <span className="perfil-label">Descripción:</span>
// // // // // // //           <span>{perfil.Profile_bio}</span>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //       <div className="perfil-actions">
// // // // // // //         <button className="perfil-btn editar">Editar Perfil</button>
// // // // // // //         <button className="perfil-btn cerrar">Cerrar Sesión</button>
// // // // // // //       </div>
// // // // // // //       <style>{`
// // // // // // //         .perfil-admin-card {
// // // // // // //           max-width: 480px;
// // // // // // //           margin: 2rem auto;
// // // // // // //           background: #15365FFF;
// // // // // // //           border-radius: 18px;
// // // // // // //           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
// // // // // // //           padding: 32px 28px;
// // // // // // //           color: #FDFDFDFF;
// // // // // // //         }
// // // // // // //         .perfil-header {
// // // // // // //           display: flex;
// // // // // // //           align-items: center;
// // // // // // //           gap: 24px;
// // // // // // //           margin-bottom: 24px;
// // // // // // //         }
// // // // // // //         .perfil-avatar {
// // // // // // //           width: 90px;
// // // // // // //           height: 90px;
// // // // // // //           border-radius: 50%;
// // // // // // //           object-fit: cover;
// // // // // // //           border: 3px solid #72A3D1FF;
// // // // // // //           background: #fff;
// // // // // // //         }
// // // // // // //         .perfil-nombre {
// // // // // // //           font-size: 1.6rem;
// // // // // // //           font-weight: 700;
// // // // // // //           margin-bottom: 6px;
// // // // // // //           color: #72A3D1FF;
// // // // // // //         }
// // // // // // //         .perfil-rol {
// // // // // // //           background: #1C56A7FF;
// // // // // // //           color: #FDFDFDFF;
// // // // // // //           padding: 4px 14px;
// // // // // // //           border-radius: 8px;
// // // // // // //           font-size: 1rem;
// // // // // // //           font-weight: 500;
// // // // // // //         }
// // // // // // //         .perfil-info {
// // // // // // //           margin-bottom: 28px;
// // // // // // //         }
// // // // // // //         .perfil-info-row {
// // // // // // //           display: flex;
// // // // // // //           justify-content: space-between;
// // // // // // //           margin-bottom: 10px;
// // // // // // //           font-size: 1.08rem;
// // // // // // //         }
// // // // // // //         .perfil-label {
// // // // // // //           font-weight: 600;
// // // // // // //           color: #72A3D1FF;
// // // // // // //           margin-right: 10px;
// // // // // // //         }
// // // // // // //         .perfil-actions {
// // // // // // //           display: flex;
// // // // // // //           gap: 18px;
// // // // // // //           justify-content: center;
// // // // // // //           margin-top: 18px;
// // // // // // //         }
// // // // // // //         .perfil-btn {
// // // // // // //           background: #1C56A7FF;
// // // // // // //           color: #FDFDFDFF;
// // // // // // //           border: none;
// // // // // // //           border-radius: 10px;
// // // // // // //           font-size: 1.08rem;
// // // // // // //           font-weight: 600;
// // // // // // //           padding: 10px 28px;
// // // // // // //           box-shadow: 0 2px 8px rgba(60,90,130,0.10);
// // // // // // //           transition: background 0.2s, color 0.2s;
// // // // // // //           cursor: pointer;
// // // // // // //         }
// // // // // // //         .perfil-btn.editar:hover {
// // // // // // //           background: #72A3D1FF;
// // // // // // //           color: #15365FFF;
// // // // // // //         }
// // // // // // //         .perfil-btn.cerrar {
// // // // // // //           background: #e74c3c;
// // // // // // //         }
// // // // // // //         .perfil-btn.cerrar:hover {
// // // // // // //           background: #c0392b;
// // // // // // //           color: #fff;
// // // // // // //         }
// // // // // // //       `}</style>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PerfilAdmin;

// // // // // // import React, { useEffect, useState } from 'react';
// // // // // // import { platformProfileService } from '../services/api';

// // // // // // const PerfilAdmin = () => {
// // // // // //   const [perfil, setPerfil] = useState(null);
// // // // // //   const [loading, setLoading] = useState(true);

// // // // // //   // Obtiene el usuario logueado desde localStorage
// // // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // // //   useEffect(() => {
// // // // // //     if (!user) {
// // // // // //       setLoading(false);
// // // // // //       return;
// // // // // //     }
// // // // // //     // Busca el perfil asociado al usuario logueado
// // // // // //     platformProfileService.getAll().then(res => {
// // // // // //       const perfilUsuario = res.data.find(
// // // // // //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// // // // // //       );
// // // // // //       setPerfil(perfilUsuario || null);
// // // // // //       setLoading(false);
// // // // // //     }).catch(() => setLoading(false));
// // // // // //   }, [user]);

// // // // // //   const handleEditarPerfil = () => {
// // // // // //     // Aquí puedes navegar a un formulario de edición o mostrar un modal
// // // // // //     alert('Funcionalidad de editar perfil (implementa el formulario de edición aquí)');
// // // // // //   };

// // // // // //   const handleEliminarPerfil = async () => {
// // // // // //     if (!perfil) return;
// // // // // //     if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
// // // // // //       await platformProfileService.delete(perfil.Profile_id);
// // // // // //       setPerfil(null);
// // // // // //     }
// // // // // //   };

// // // // // //   if (loading) {
// // // // // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="perfil-admin-card">
// // // // // //       <div className="perfil-header">
// // // // // //         <img
// // // // // //           src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
// // // // // //           alt="Avatar"
// // // // // //           className="perfil-avatar"
// // // // // //         />
// // // // // //         <div>
// // // // // //           <h2 className="perfil-nombre">
// // // // // //             {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
// // // // // //           </h2>
// // // // // //           <span className="perfil-rol">{perfil?.Profile_bio || 'Usuario'}</span>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //       <div className="perfil-info">
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Correo:</span>
// // // // // //           <span>{perfil?.Profile_email || user?.email || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Teléfono:</span>
// // // // // //           <span>{perfil?.Profile_phone || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Documento:</span>
// // // // // //           <span>{perfil?.Profile_national_id || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Dirección:</span>
// // // // // //           <span>{perfil?.Profile_addres || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Fecha de nacimiento:</span>
// // // // // //           <span>{perfil?.Profile_birthdate || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Género:</span>
// // // // // //           <span>{perfil?.Profile_gender || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Sitio web:</span>
// // // // // //           <span>{perfil?.Profile_website || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Red social:</span>
// // // // // //           <span>{perfil?.Profile_social || '-'}</span>
// // // // // //         </div>
// // // // // //         <div className="perfil-info-row">
// // // // // //           <span className="perfil-label">Descripción:</span>
// // // // // //           <span>{perfil?.Profile_bio || '-'}</span>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //       <div className="perfil-actions">
// // // // // //         <button className="perfil-btn editar" onClick={handleEditarPerfil}>
// // // // // //           {perfil ? 'Editar Perfil' : 'Crear Perfil'}
// // // // // //         </button>
// // // // // //         {perfil && (
// // // // // //           <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
// // // // // //             Eliminar Perfil
// // // // // //           </button>
// // // // // //         )}
// // // // // //       </div>
// // // // // //       <style>{`
// // // // // //         .perfil-admin-card {
// // // // // //           max-width: 480px;
// // // // // //           margin: 2rem auto;
// // // // // //           background: #15365FFF;
// // // // // //           border-radius: 18px;
// // // // // //           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
// // // // // //           padding: 32px 28px;
// // // // // //           color: #FDFDFDFF;
// // // // // //         }
// // // // // //         .perfil-header {
// // // // // //           display: flex;
// // // // // //           align-items: center;
// // // // // //           gap: 24px;
// // // // // //           margin-bottom: 24px;
// // // // // //         }
// // // // // //         .perfil-avatar {
// // // // // //           width: 90px;
// // // // // //           height: 90px;
// // // // // //           border-radius: 50%;
// // // // // //           object-fit: cover;
// // // // // //           border: 3px solid #72A3D1FF;
// // // // // //           background: #fff;
// // // // // //         }
// // // // // //         .perfil-nombre {
// // // // // //           font-size: 1.6rem;
// // // // // //           font-weight: 700;
// // // // // //           margin-bottom: 6px;
// // // // // //           color: #72A3D1FF;
// // // // // //         }
// // // // // //         .perfil-rol {
// // // // // //           background: #1C56A7FF;
// // // // // //           color: #FDFDFDFF;
// // // // // //           padding: 4px 14px;
// // // // // //           border-radius: 8px;
// // // // // //           font-size: 1rem;
// // // // // //           font-weight: 500;
// // // // // //         }
// // // // // //         .perfil-info {
// // // // // //           margin-bottom: 28px;
// // // // // //         }
// // // // // //         .perfil-info-row {
// // // // // //           display: flex;
// // // // // //           justify-content: space-between;
// // // // // //           margin-bottom: 10px;
// // // // // //           font-size: 1.08rem;
// // // // // //         }
// // // // // //         .perfil-label {
// // // // // //           font-weight: 600;
// // // // // //           color: #72A3D1FF;
// // // // // //           margin-right: 10px;
// // // // // //         }
// // // // // //         .perfil-actions {
// // // // // //           display: flex;
// // // // // //           gap: 18px;
// // // // // //           justify-content: center;
// // // // // //           margin-top: 18px;
// // // // // //         }
// // // // // //         .perfil-btn {
// // // // // //           background: #1C56A7FF;
// // // // // //           color: #FDFDFDFF;
// // // // // //           border: none;
// // // // // //           border-radius: 10px;
// // // // // //           font-size: 1.08rem;
// // // // // //           font-weight: 600;
// // // // // //           padding: 10px 28px;
// // // // // //           box-shadow: 0 2px 8px rgba(60,90,130,0.10);
// // // // // //           transition: background 0.2s, color 0.2s;
// // // // // //           cursor: pointer;
// // // // // //         }
// // // // // //         .perfil-btn.editar:hover {
// // // // // //           background: #72A3D1FF;
// // // // // //           color: #15365FFF;
// // // // // //         }
// // // // // //         .perfil-btn.cerrar {
// // // // // //           background: #e74c3c;
// // // // // //         }
// // // // // //         .perfil-btn.cerrar:hover {
// // // // // //           background: #c0392b;
// // // // // //           color: #fff;
// // // // // //         }
// // // // // //       `}</style>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PerfilAdmin;

// // // // // import React, { useEffect, useState } from 'react';
// // // // // import { platformProfileService } from '../services/api';

// // // // // const PerfilAdmin = () => {
// // // // //   const [perfil, setPerfil] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);

// // // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // // //   useEffect(() => {
// // // // //     if (!user) {
// // // // //       setLoading(false);
// // // // //       return;
// // // // //     }
// // // // //     platformProfileService.getAll().then(res => {
// // // // //       const perfilUsuario = res.data.find(
// // // // //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// // // // //       );
// // // // //       setPerfil(perfilUsuario || null);
// // // // //       setLoading(false);
// // // // //     }).catch(() => setLoading(false));
// // // // //   }, [user]);

// // // // //   const handleEditarPerfil = () => {
// // // // //     alert('Funcionalidad de editar/crear perfil aquí');
// // // // //   };

// // // // //   const handleEliminarPerfil = async () => {
// // // // //     if (!perfil) return;
// // // // //     if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
// // // // //       await platformProfileService.delete(perfil.Profile_id);
// // // // //       setPerfil(null);
// // // // //     }
// // // // //   };

// // // // //   if (loading) {
// // // // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// // // // //   }

// // // // //   return (
// // // // //     <div className="perfil-admin-card">
// // // // //       <div className="perfil-header">
// // // // //         <img
// // // // //           src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
// // // // //           alt="Avatar"
// // // // //           className="perfil-avatar"
// // // // //         />
// // // // //         <div>
// // // // //           <h2 className="perfil-nombre">
// // // // //             {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
// // // // //           </h2>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="perfil-info">
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Nombre:</span>
// // // // //           <span>{perfil?.Profile_name || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Apellido:</span>
// // // // //           <span>{perfil?.Profile_lastname || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Teléfono:</span>
// // // // //           <span>{perfil?.Profile_phone || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Dirección:</span>
// // // // //           <span>{perfil?.Profile_addres || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Correo:</span>
// // // // //           <span>{perfil?.Profile_email || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Foto:</span>
// // // // //           <span>{perfil?.Profile_photo || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Fecha de nacimiento:</span>
// // // // //           <span>{perfil?.Profile_birthdate || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Género:</span>
// // // // //           <span>{perfil?.Profile_gender || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Documento:</span>
// // // // //           <span>{perfil?.Profile_national_id || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Biografía:</span>
// // // // //           <span>{perfil?.Profile_bio || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Sitio web:</span>
// // // // //           <span>{perfil?.Profile_website || '-'}</span>
// // // // //         </div>
// // // // //         <div className="perfil-info-row">
// // // // //           <span className="perfil-label">Red social:</span>
// // // // //           <span>{perfil?.Profile_social || '-'}</span>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="perfil-actions">
// // // // //         <button className="perfil-btn editar" onClick={handleEditarPerfil}>
// // // // //           {perfil ? 'Editar Perfil' : 'Crear Perfil'}
// // // // //         </button>
// // // // //         {perfil && (
// // // // //           <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
// // // // //             Eliminar Perfil
// // // // //           </button>
// // // // //         )}
// // // // //       </div>
// // // // //       <style>{`
// // // // //         .perfil-admin-card {
// // // // //           max-width: 480px;
// // // // //           margin: 2rem auto;
// // // // //           background: #15365FFF;
// // // // //           border-radius: 18px;
// // // // //           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
// // // // //           padding: 32px 28px;
// // // // //           color: #FDFDFDFF;
// // // // //         }
// // // // //         .perfil-header {
// // // // //           display: flex;
// // // // //           align-items: center;
// // // // //           gap: 24px;
// // // // //           margin-bottom: 24px;
// // // // //         }
// // // // //         .perfil-avatar {
// // // // //           width: 90px;
// // // // //           height: 90px;
// // // // //           border-radius: 50%;
// // // // //           object-fit: cover;
// // // // //           border: 3px solid #72A3D1FF;
// // // // //           background: #fff;
// // // // //         }
// // // // //         .perfil-nombre {
// // // // //           font-size: 1.6rem;
// // // // //           font-weight: 700;
// // // // //           margin-bottom: 6px;
// // // // //           color: #72A3D1FF;
// // // // //         }
// // // // //         .perfil-info {
// // // // //           margin-bottom: 28px;
// // // // //         }
// // // // //         .perfil-info-row {
// // // // //           display: flex;
// // // // //           justify-content: space-between;
// // // // //           margin-bottom: 10px;
// // // // //           font-size: 1.08rem;
// // // // //         }
// // // // //         .perfil-label {
// // // // //           font-weight: 600;
// // // // //           color: #72A3D1FF;
// // // // //           margin-right: 10px;
// // // // //         }
// // // // //         .perfil-actions {
// // // // //           display: flex;
// // // // //           gap: 18px;
// // // // //           justify-content: center;
// // // // //           margin-top: 18px;
// // // // //         }
// // // // //         .perfil-btn {
// // // // //           background: #1C56A7FF;
// // // // //           color: #FDFDFDFF;
// // // // //           border: none;
// // // // //           border-radius: 10px;
// // // // //           font-size: 1.08rem;
// // // // //           font-weight: 600;
// // // // //           padding: 10px 28px;
// // // // //           box-shadow: 0 2px 8px rgba(60,90,130,0.10);
// // // // //           transition: background 0.2s, color 0.2s;
// // // // //           cursor: pointer;
// // // // //         }
// // // // //         .perfil-btn.editar:hover {
// // // // //           background: #72A3D1FF;
// // // // //           color: #15365FFF;
// // // // //         }
// // // // //         .perfil-btn.cerrar {
// // // // //           background: #e74c3c;
// // // // //         }
// // // // //         .perfil-btn.cerrar:hover {
// // // // //           background: #c0392b;
// // // // //           color: #fff;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PerfilAdmin;

// // // // import React, { useEffect, useState } from 'react';
// // // // import { platformProfileService } from '../services/api';
// // // // import CrearPerfil from '../components/profile/Profile';

// // // // const PerfilAdmin = () => {
// // // //   const [perfil, setPerfil] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [showCrearPerfil, setShowCrearPerfil] = useState(false);

// // // //   const user = JSON.parse(localStorage.getItem('user'));

// // // //   useEffect(() => {
// // // //     if (!user) {
// // // //       setLoading(false);
// // // //       return;
// // // //     }
// // // //     platformProfileService.getAll().then(res => {
// // // //       const perfilUsuario = res.data.find(
// // // //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// // // //       );
// // // //       setPerfil(perfilUsuario || null);
// // // //       setLoading(false);
// // // //     }).catch(() => setLoading(false));
// // // //   }, [user, showCrearPerfil]);

// // // //   const handleEditarPerfil = () => {
// // // //     setShowCrearPerfil(true);
// // // //   };

// // // //   const handleEliminarPerfil = async () => {
// // // //     if (!perfil) return;
// // // //     if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
// // // //       await platformProfileService.delete(perfil.Profile_id);
// // // //       setPerfil(null);
// // // //     }
// // // //   };

// // // //   const handleCloseModal = () => setShowCrearPerfil(false);
// // // //   const handlePerfilCreado = () => {
// // // //     setShowCrearPerfil(false);
// // // //     setLoading(true);
// // // //     // Se recarga el perfil automáticamente por el useEffect
// // // //   };

// // // //   if (loading) {
// // // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// // // //   }

// // // //   return (
// // // //     <>
// // // //       <div className="perfil-admin-card">
// // // //         <div className="perfil-header">
// // // //           <img
// // // //             src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
// // // //             alt="Avatar"
// // // //             className="perfil-avatar"
// // // //           />
// // // //           <div>
// // // //             <h2 className="perfil-nombre">
// // // //               {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
// // // //             </h2>
// // // //           </div>
// // // //         </div>
// // // //         <div className="perfil-info">
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Nombre:</span>
// // // //             <span>{perfil?.Profile_name || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Apellido:</span>
// // // //             <span>{perfil?.Profile_lastname || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Teléfono:</span>
// // // //             <span>{perfil?.Profile_phone || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Dirección:</span>
// // // //             <span>{perfil?.Profile_addres || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Correo:</span>
// // // //             <span>{perfil?.Profile_email || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Foto:</span>
// // // //             <span>{perfil?.Profile_photo || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Fecha de nacimiento:</span>
// // // //             <span>{perfil?.Profile_birthdate || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Género:</span>
// // // //             <span>{perfil?.Profile_gender || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Documento:</span>
// // // //             <span>{perfil?.Profile_national_id || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Biografía:</span>
// // // //             <span>{perfil?.Profile_bio || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Sitio web:</span>
// // // //             <span>{perfil?.Profile_website || '-'}</span>
// // // //           </div>
// // // //           <div className="perfil-info-row">
// // // //             <span className="perfil-label">Red social:</span>
// // // //             <span>{perfil?.Profile_social || '-'}</span>
// // // //           </div>
// // // //         </div>
// // // //         <div className="perfil-actions">
// // // //           <button className="perfil-btn editar" onClick={handleEditarPerfil}>
// // // //             {perfil ? 'Editar Perfil' : 'Crear Perfil'}
// // // //           </button>
// // // //           {perfil && (
// // // //             <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
// // // //               Eliminar Perfil
// // // //             </button>
// // // //           )}
// // // //         </div>
// // // //       </div>

// // // //       {/* Modal para crear/editar perfil */}
// // // //       {showCrearPerfil && (
// // // //         <div className="modal-overlay">
// // // //           <div className="modal-content">
// // // //             <CrearPerfil
// // // //               userId={user.id || user.Platform_user_id}
// // // //               onSuccess={handlePerfilCreado}
// // // //               onCancel={handleCloseModal}
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       <style>{`
// // // //         .modal-overlay {
// // // //           position: fixed;
// // // //           top: 0; left: 0; right: 0; bottom: 0;
// // // //           background: rgba(0,0,0,0.5);
// // // //           z-index: 1000;
// // // //           display: flex;
// // // //           align-items: center;
// // // //           justify-content: center;
// // // //         }
// // // //         .modal-content {
// // // //           background: none;
// // // //           border: none;
// // // //         }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // };

// // // // export default PerfilAdmin;

// // // import React, { useEffect, useState } from 'react';
// // // import { platformProfileService } from '../services/api';
// // // import CrearPerfil from '../components/profile/Profile'; // Este debe ser solo el formulario

// // // const PerfilAdmin = () => {
// // //   const [perfil, setPerfil] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [showCrearPerfil, setShowCrearPerfil] = useState(false);

// // //   const user = JSON.parse(localStorage.getItem('user'));

// // //   useEffect(() => {
// // //     if (!user) {
// // //       setLoading(false);
// // //       return;
// // //     }
// // //     platformProfileService.getAll().then(res => {
// // //       const perfilUsuario = res.data.find(
// // //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// // //       );
// // //       setPerfil(perfilUsuario || null);
// // //       setLoading(false);
// // //     }).catch(() => setLoading(false));
// // //   }, [user, showCrearPerfil]);

// // //   const handleEditarPerfil = () => {
// // //     setShowCrearPerfil(true);
// // //   };

// // //   const handleEliminarPerfil = async () => {
// // //     if (!perfil) return;
// // //     if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
// // //       await platformProfileService.delete(perfil.Profile_id);
// // //       setPerfil(null);
// // //     }
// // //   };

// // //   const handleCloseModal = () => setShowCrearPerfil(false);
// // //   const handlePerfilCreado = () => {
// // //     setShowCrearPerfil(false);
// // //     setLoading(true);
// // //     // Se recarga el perfil automáticamente por el useEffect
// // //   };

// // //   if (loading) {
// // //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// // //   }

// // //   return (
// // //     <>
// // //       {/* Tarjeta de perfil SOLO UNA VEZ */}
// // //       <div className="perfil-admin-card">
// // //         <div className="perfil-header">
// // //           <img
// // //             src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
// // //             alt="Avatar"
// // //             className="perfil-avatar"
// // //           />
// // //           <div>
// // //             <h2 className="perfil-nombre">
// // //               {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
// // //             </h2>
// // //           </div>
// // //         </div>
// // //         <div className="perfil-info">
// // //           {/* ...campos del perfil... */}
// // //           {/* ...igual que antes... */}
// // //         </div>
// // //         <div className="perfil-actions">
// // //           <button className="perfil-btn editar" onClick={handleEditarPerfil}>
// // //             {perfil ? 'Editar Perfil' : 'Crear Perfil'}
// // //           </button>
// // //           {perfil && (
// // //             <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
// // //               Eliminar Perfil
// // //             </button>
// // //           )}
// // //         </div>
// // //       </div>

// // //       {/* Modal SOLO el formulario de crear perfil */}
// // //       {showCrearPerfil && (
// // //         <div className="modal-overlay">
// // //           <div className="modal-content">
// // //             <CrearPerfil
// // //               userId={user.id || user.Platform_user_id}
// // //               onSuccess={handlePerfilCreado}
// // //               onCancel={handleCloseModal}
// // //             />
// // //           </div>
// // //         </div>
// // //       )}

// // //       <style>{`
// // //         .modal-overlay {
// // //           position: fixed;
// // //           top: 0; left: 0; right: 0; bottom: 0;
// // //           background: rgba(0,0,0,0.5);
// // //           z-index: 1000;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //         }
// // //         .modal-content {
// // //           background: none;
// // //           border: none;
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default PerfilAdmin;

// // import React, { useEffect, useState } from 'react';
// // import { platformProfileService } from '../services/api';
// // import CrearPerfil from '../components/profile/Profile';

// // const PerfilAdmin = () => {
// //   const [perfil, setPerfil] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [showCrearPerfil, setShowCrearPerfil] = useState(false);

// //   const user = JSON.parse(localStorage.getItem('user'));

// //   useEffect(() => {
// //     if (!user) {
// //       setLoading(false);
// //       return;
// //     }
// //     platformProfileService.getAll().then(res => {
// //       const perfilUsuario = res.data.find(
// //         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
// //       );
// //       setPerfil(perfilUsuario || null);
// //       setLoading(false);
// //     }).catch(() => setLoading(false));
// //   }, [user, showCrearPerfil]);

// //   const handleEditarPerfil = () => setShowCrearPerfil(true);
// //   const handleCloseModal = () => setShowCrearPerfil(false);
// //   const handlePerfilCreado = () => {
// //     setShowCrearPerfil(false);
// //     setLoading(true);
// //   };

// //   if (loading) {
// //     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
// //   }

// //   return (
// //     <>
// //       <div className="perfil-admin-card">
// //         <div className="perfil-header">
// //           <img
// //             src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
// //             alt="Avatar"
// //             className="perfil-avatar"
// //           />
// //           <div>
// //             <h2 className="perfil-nombre">
// //               {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
// //             </h2>
// //           </div>
// //         </div>
// //         <div className="perfil-info">
// //           {/* ...campos del perfil... */}
// //         </div>
// //         <div className="perfil-actions">
// //           <button className="perfil-btn editar" onClick={handleEditarPerfil}>
// //             {perfil ? 'Editar Perfil' : 'Crear Perfil'}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Modal para crear/editar perfil */}
// //       {showCrearPerfil && (
// //         <div className="modal-overlay">
// //           <div className="modal-content">
// //             <CrearPerfil
// //               userId={user.id || user.Platform_user_id}
// //               onSuccess={handlePerfilCreado}
// //               onCancel={handleCloseModal}
// //             />
// //           </div>
// //         </div>
// //       )}

// //       <style>{`
// //         body {
// //           background: #547a99;
// //         }
// //         .perfil-admin-card {
// //           max-width: 480px;
// //           margin: 4rem auto;
// //           background: #15365FFF;
// //           border-radius: 18px;
// //           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
// //           padding: 32px 28px;
// //           color: #FDFDFDFF;
// //         }
// //         .perfil-header {
// //           display: flex;
// //           align-items: center;
// //           gap: 24px;
// //           margin-bottom: 24px;
// //         }
// //         .perfil-avatar {
// //           width: 90px;
// //           height: 90px;
// //           border-radius: 50%;
// //           object-fit: cover;
// //           border: 3px solid #72A3D1FF;
// //           background: #fff;
// //         }
// //         .perfil-nombre {
// //           font-size: 1.6rem;
// //           font-weight: 700;
// //           margin-bottom: 6px;
// //           color: #72A3D1FF;
// //         }
// //         .perfil-actions {
// //           display: flex;
// //           gap: 18px;
// //           justify-content: center;
// //           margin-top: 18px;
// //         }
// //         .perfil-btn {
// //           background: #1C56A7FF;
// //           color: #FDFDFDFF;
// //           border: none;
// //           border-radius: 10px;
// //           font-size: 1.08rem;
// //           font-weight: 600;
// //           padding: 10px 28px;
// //           box-shadow: 0 2px 8px rgba(60,90,130,0.10);
// //           transition: background 0.2s, color 0.2s;
// //           cursor: pointer;
// //         }
// //         .perfil-btn.editar:hover {
// //           background: #72A3D1FF;
// //           color: #15365FFF;
// //         }
// //         .modal-overlay {
// //           position: fixed;
// //           top: 0; left: 0; right: 0; bottom: 0;
// //           background: rgba(0,0,0,0.5);
// //           z-index: 1000;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }
// //         .modal-content {
// //           background: none;
// //           border: none;
// //         }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default PerfilAdmin;

// import React, { useEffect, useState } from 'react';
// import { platformProfileService } from '../services/api';
// import CrearProfile from '../components/profile/CrearProfile';

// const PerfilAdmin = () => {
//   const [perfil, setPerfil] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showCrearPerfil, setShowCrearPerfil] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user) {
//       setLoading(false);
//       return;
//     }
//     platformProfileService.getAll().then(res => {
//       const perfilUsuario = res.data.find(
//         p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
//       );
//       setPerfil(perfilUsuario || null);
//       setLoading(false);
//     }).catch(() => setLoading(false));
//   }, [user, showCrearPerfil]);

//   const handleEditarPerfil = () => setShowCrearPerfil(true);
//   const handleCloseModal = () => setShowCrearPerfil(false);
//   const handlePerfilCreado = () => {
//     setShowCrearPerfil(false);
//     setLoading(true);
//   };

//   const handleEliminarPerfil = async () => {
//     if (!perfil) return;
//     if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
//       await platformProfileService.delete(perfil.Profile_id);
//       setPerfil(null);
//     }
//   };

//   if (loading) {
//     return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
//   }

//   return (
//     <>
//       <div className="perfil-admin-card">
//         <div className="perfil-header">
//           <img
//             src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
//             alt="Avatar"
//             className="perfil-avatar"
//           />
//           <div>
//             <h2 className="perfil-nombre">
//               {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
//             </h2>
//           </div>
//         </div>
//         <div className="perfil-info">
//           <div className="perfil-info-row">
//             <span className="perfil-label">Nombre:</span>
//             <span>{perfil?.Profile_name || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Apellido:</span>
//             <span>{perfil?.Profile_lastname || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Teléfono:</span>
//             <span>{perfil?.Profile_phone || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Dirección:</span>
//             <span>{perfil?.Profile_addres || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Correo:</span>
//             <span>{perfil?.Profile_email || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Foto:</span>
//             <span>{perfil?.Profile_photo || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Fecha de nacimiento:</span>
//             <span>{perfil?.Profile_birthdate || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Género:</span>
//             <span>{perfil?.Profile_gender || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Documento:</span>
//             <span>{perfil?.Profile_national_id || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Biografía:</span>
//             <span>{perfil?.Profile_bio || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Sitio web:</span>
//             <span>{perfil?.Profile_website || '-'}</span>
//           </div>
//           <div className="perfil-info-row">
//             <span className="perfil-label">Red social:</span>
//             <span>{perfil?.Profile_social || '-'}</span>
//           </div>
//         </div>
//         <div className="perfil-actions">
//           <button className="perfil-btn editar" onClick={handleEditarPerfil}>
//             {perfil ? 'Editar Perfil' : 'Crear Perfil'}
//           </button>
//           {perfil && (
//             <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
//               Eliminar Perfil
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Modal para crear/editar perfil */}
//       {showCrearPerfil && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <CrearProfile
//               userId={user.id || user.Platform_user_id}
//               onSuccess={handlePerfilCreado}
//               onCancel={handleCloseModal}
//             />
//           </div>
//         </div>
//       )}

//       <style>{`
//         .modal-overlay {
//           position: fixed;
//           top: 0; left: 0; right: 0; bottom: 0;
//           background: rgba(0,0,0,0.5);
//           z-index: 1000;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .modal-content {
//           background: none;
//           border: none;
//         }
//         .perfil-admin-card {
//           max-width: 480px;
//           margin: 4rem auto;
//           background: #15365FFF;
//           border-radius: 18px;
//           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
//           padding: 32px 28px;
//           color: #FDFDFDFF;
//         }
//         .perfil-header {
//           display: flex;
//           align-items: center;
//           gap: 24px;
//           margin-bottom: 24px;
//         }
//         .perfil-avatar {
//           width: 90px;
//           height: 90px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 3px solid #72A3D1FF;
//           background: #fff;
//         }
//         .perfil-nombre {
//           font-size: 1.6rem;
//           font-weight: 700;
//           margin-bottom: 6px;
//           color: #72A3D1FF;
//         }
//         .perfil-info {
//           margin-bottom: 28px;
//         }
//         .perfil-info-row {
//           display: flex;
//           justify-content: space-between;
//           margin-bottom: 10px;
//           font-size: 1.08rem;
//         }
//         .perfil-label {
//           font-weight: 600;
//           color: #72A3D1FF;
//           margin-right: 10px;
//         }
//         .perfil-actions {
//           display: flex;
//           gap: 18px;
//           justify-content: center;
//           margin-top: 18px;
//         }
//         .perfil-btn {
//           background: #1C56A7FF;
//           color: #FDFDFDFF;
//           border: none;
//           border-radius: 10px;
//           font-size: 1.08rem;
//           font-weight: 600;
//           padding: 10px 28px;
//           box-shadow: 0 2px 8px rgba(60,90,130,0.10);
//           transition: background 0.2s, color 0.2s;
//           cursor: pointer;
//         }
//         .perfil-btn.editar:hover {
//           background: #72A3D1FF;
//           color: #15365FFF;
//         }
//         .perfil-btn.cerrar {
//           background: #e74c3c;
//         }
//         .perfil-btn.cerrar:hover {
//           background: #c0392b;
//           color: #fff;
//         }
//       `}</style>
//     </>
//   );
// };

// export default PerfilAdmin;

import React, { useEffect, useState } from 'react';
import { platformProfileService } from '../services/api';
import CrearProfile from '../components/profile/CrearProfile';

const PerfilAdmin = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCrearPerfil, setShowCrearPerfil] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  // useEffect(() => {
  //   if (!user) {
  //     setLoading(false);
  //     return;
  //   }
  //   platformProfileService.getAll().then(res => {
  //     const perfilUsuario = res.data.find(
  //       p => p.Platform_user_FK === user.id || p.Platform_user_FK === user.Platform_user_id
  //     );
  //     setPerfil(perfilUsuario || null);
  //     setLoading(false);
  //   }).catch(() => setLoading(false));
  // }, [user, showCrearPerfil]);

  // useEffect(() => {
  //   if (!user) {
  //     setLoading(false);
  //     return;
  //   }
  //   const userId = user.Platform_user_id || user.id;
  //   platformProfileService.getByUserId(userId)
  //     .then(res => {
  //       setPerfil(res.data || null);
  //       setLoading(false);
  //     })
  //     .catch(() => setLoading(false));
  // }, [user, showCrearPerfil]);

  useEffect(() => {
    if (!user || showCrearPerfil) {
      setLoading(false);
      return;
    }
    const userId = user.Platform_user_id || user.id;
    platformProfileService.getByUserId(userId)
      .then(res => {
        setPerfil(res.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user, showCrearPerfil === false]);

  const handleEditarPerfil = () => setShowCrearPerfil(true);
  const handleCloseModal = () => setShowCrearPerfil(false);
  // const handlePerfilCreado = () => {
  //   setShowCrearPerfil(false);
  //   setLoading(true);
  // };

  const handlePerfilCreado = () => {
  setShowCrearPerfil(false);
  setLoading(true);
  // Recarga el perfil
  const userId = user.Platform_user_id || user.id;
  platformProfileService.getByUserId(userId)
    .then(res => {
      setPerfil(res.data || null);
      setLoading(false);
    })
    .catch(() => setLoading(false));
};

  const handleEliminarPerfil = async () => {
    if (!perfil) return;
    if (window.confirm('¿Seguro que deseas eliminar tu perfil?')) {
      await platformProfileService.delete(perfil.Profile_id);
      setPerfil(null);
    }
  };

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
  }

  return (
    <>
      <div className="perfil-admin-card">
        <div className="perfil-header">
          <img
            src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
            alt="Avatar"
            className="perfil-avatar"
          />
          <div>
            <h2 className="perfil-nombre">
              {perfil ? `${perfil.Profile_name} ${perfil.Profile_lastname}` : (user?.Username || 'Usuario')}
            </h2>
          </div>
        </div>
        <div className="perfil-info">
          <div className="perfil-info-row">
            <span className="perfil-label">Nombre:</span>
            <span>{perfil?.Profile_name || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Apellido:</span>
            <span>{perfil?.Profile_lastname || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Teléfono:</span>
            <span>{perfil?.Profile_phone || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Dirección:</span>
            <span>{perfil?.Profile_addres || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Correo:</span>
            <span>{perfil?.Profile_email || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Foto:</span>
            <span>{perfil?.Profile_photo || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Fecha de nacimiento:</span>
            <span>{perfil?.Profile_birthdate || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Género:</span>
            <span>{perfil?.Profile_gender || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Documento:</span>
            <span>{perfil?.Profile_national_id || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Biografía:</span>
            <span>{perfil?.Profile_bio || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Sitio web:</span>
            <span>{perfil?.Profile_website || '-'}</span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Red social:</span>
            <span>{perfil?.Profile_social || '-'}</span>
          </div>
        </div>
        <div className="perfil-actions">
          <button className="perfil-btn editar" onClick={handleEditarPerfil}>
            {perfil ? 'Editar Perfil' : 'Crear Perfil'}
          </button>
          <button
            className="perfil-btn cerrar"
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/'; // Redirige al login
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Modal para crear/editar perfil */}
      {showCrearPerfil && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CrearProfile
              userId={user.id || user.Platform_user_id}
              perfil={perfil} // <-- aquí pasas el perfil si existe
              onSuccess={handlePerfilCreado}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: none;
          border: none;
        }
        .perfil-admin-card {
          max-width: 480px;
          margin: 4rem auto;
          background: #15365FFF;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(60,90,130,0.12);
          padding: 32px 28px;
          color: #FDFDFDFF;
        }
        .perfil-header {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
        }
        .perfil-avatar {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #72A3D1FF;
          background: #fff;
        }
        .perfil-nombre {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 6px;
          color: #72A3D1FF;
        }
        .perfil-info {
          margin-bottom: 28px;
        }
        .perfil-info-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 1.08rem;
        }
        .perfil-label {
          font-weight: 600;
          color: #72A3D1FF;
          margin-right: 10px;
        }
        .perfil-actions {
          display: flex;
          gap: 18px;
          justify-content: center;
          margin-top: 18px;
        }
        .perfil-btn {
          background: #1C56A7FF;
          color: #FDFDFDFF;
          border: none;
          border-radius: 10px;
          font-size: 1.08rem;
          font-weight: 600;
          padding: 10px 28px;
          box-shadow: 0 2px 8px rgba(60,90,130,0.10);
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .perfil-btn.editar:hover {
          background: #72A3D1FF;
          color: #15365FFF;
        }
        .perfil-btn.cerrar {
          background: #e74c3c;
        }
        .perfil-btn.cerrar:hover {
          background: #c0392b;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default PerfilAdmin;