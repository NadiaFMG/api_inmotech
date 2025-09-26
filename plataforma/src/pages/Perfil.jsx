// import React, { useEffect, useState } from 'react';
// import { platformProfileService } from '../services/api';
// import CrearProfile from '../components/profile/CrearProfile';

// const PerfilAdmin = () => {
//   const [perfil, setPerfil] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showCrearPerfil, setShowCrearPerfil] = useState(false);

//   const user = JSON.parse(localStorage.getItem('user'));

//   useEffect(() => {
//     if (!user || showCrearPerfil) {
//       setLoading(false);
//       return;
//     }
//     const userId = user.Platform_user_id || user.id;
//     platformProfileService.getByUserId(userId)
//       .then(res => {
//         setPerfil(res.data || null);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [user, showCrearPerfil === false]);

//   const handleEditarPerfil = () => setShowCrearPerfil(true);
//   const handleCloseModal = () => setShowCrearPerfil(false);
//   // const handlePerfilCreado = () => {
//   //   setShowCrearPerfil(false);
//   //   setLoading(true);
//   // };

//   const handlePerfilCreado = () => {
//   setShowCrearPerfil(false);
//   setLoading(true);
//   // Recarga el perfil
//   const userId = user.Platform_user_id || user.id;
//   platformProfileService.getByUserId(userId)
//     .then(res => {
//       setPerfil(res.data || null);
//       setLoading(false);
//     })
//     .catch(() => setLoading(false));
// };

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
//           {/* <div className="perfil-info-row">
//             <span className="perfil-label">Foto:</span>
//             <span>{perfil?.Profile_photo || '-'}</span>
//           </div> */}
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
//           <button
//             className="perfil-btn cerrar"
//             onClick={() => {
//               localStorage.removeItem('user');
//               window.location.href = '/'; // Redirige al login
//             }}
//           >
//             Cerrar Sesión
//           </button>
//         </div>
//       </div>

//       {/* Modal para crear/editar perfil */}
//       {showCrearPerfil && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <CrearProfile
//               userId={user.id || user.Platform_user_id}
//               perfil={perfil} // <-- aquí pasas el perfil si existe
//               onSuccess={handlePerfilCreado}
//               onCancel={handleCloseModal}
//             />
//           </div>
//         </div>
//       )}

//       {/* <style>{`
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
//       `}</style> */}
//       <style>{`
//         .perfil-admin-card {
//           max-width: 480px;
//           margin: 2rem auto;
//           background: #15365FFF;
//           border-radius: 18px;
//           box-shadow: 0 2px 12px rgba(60,90,130,0.12);
//           padding: 32px 28px;
//           color: #FDFDFDFF;
//           overflow: hidden;
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
//           gap: 10px;
//           align-items: flex-start;
//         }
//         .perfil-label {
//           font-weight: 600;
//           color: #72A3D1FF;
//           margin-right: 10px;
//           min-width: 110px;
//           flex-shrink: 0;
//         }
//         .perfil-info-row span {
//           max-width: 60%;
//           overflow-wrap: anywhere;
//           word-break: break-all;
//           white-space: pre-line;
//           display: block;
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
//           background: #15365FFF;
//           border-radius: 18px;
//           box-shadow: 0 2px 18px rgba(60,90,130,0.18);
//           padding: 32px 28px;
//           color: #FDFDFDFF;
//           min-width: 380px;
//           max-width: 520px;
//         }
//         @media (max-width: 700px) {
//           .perfil-admin-card {
//             min-width: 0;
//             max-width: 98vw;
//             padding: 18px 6px;
//           }
//           .perfil-header {
//             flex-direction: column;
//             gap: 12px;
//             align-items: flex-start;
//           }
//           .perfil-info-row {
//             flex-direction: column;
//             gap: 2px;
//           }
//           .perfil-label {
//             margin-bottom: 2px;
//           }
//           .modal-content {
//             min-width: 0;
//             max-width: 98vw;
//             padding: 18px 6px;
//           }
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
            <span>
              {perfil?.Profile_photo && perfil.Profile_photo.startsWith('http')
                ? <a href={perfil.Profile_photo} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_photo}</a>
                : (perfil?.Profile_photo || '-')}
            </span>
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
            <span>
              {perfil?.Profile_website && perfil.Profile_website.startsWith('http')
                ? <a href={perfil.Profile_website} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_website}</a>
                : (perfil?.Profile_website || '-')}
            </span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Red social:</span>
            <span>
              {perfil?.Profile_social && perfil.Profile_social.startsWith('http')
                ? <a href={perfil.Profile_social} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_social}</a>
                : (perfil?.Profile_social || '-')}
            </span>
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
              perfil={perfil}
              onSuccess={handlePerfilCreado}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}

      <style>{`
        .perfil-admin-card {
          max-width: 480px;
          margin: 2rem auto;
          background: #15365FFF;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(60,90,130,0.12);
          padding: 32px 28px;
          color: #FDFDFDFF;
          overflow: hidden;
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
          gap: 10px;
          align-items: flex-start;
        }
        .perfil-label {
          font-weight: 600;
          color: #72A3D1FF;
          margin-right: 10px;
          min-width: 110px;
          flex-shrink: 0;
        }
        .perfil-info-row span {
          max-width: 60%;
          overflow-wrap: anywhere;
          word-break: break-all;
          white-space: pre-line;
          display: block;
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
          background: #15365FFF;
          border-radius: 18px;
          box-shadow: 0 2px 18px rgba(60,90,130,0.18);
          padding: 32px 28px;
          color: #FDFDFDFF;
          min-width: 380px;
          max-width: 520px;
        }
        @media (max-width: 700px) {
          .perfil-admin-card {
            min-width: 0;
            max-width: 98vw;
            padding: 18px 6px;
          }
          .perfil-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
          .perfil-info-row {
            flex-direction: column;
            gap: 2px;
          }
          .perfil-label {
            margin-bottom: 2px;
          }
          .modal-content {
            min-width: 0;
            max-width: 98vw;
            padding: 18px 6px;
          }
        }
      `}</style>
    </>
  );
};

export default PerfilAdmin;