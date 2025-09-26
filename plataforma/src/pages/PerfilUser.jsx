import React, { useEffect, useState } from 'react';
import { platformProfileService } from '../services/api';
import CrearProfile from '../components/profile/CrearProfile';
import { useNavigate } from 'react-router-dom';

const PerfilUser = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCrearPerfil, setShowCrearPerfil] = useState(false);
  const navigate = useNavigate();

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
    const userId = user.Platform_user_id || user.id;
    platformProfileService.getByUserId(userId)
      .then(res => {
        setPerfil(res.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAtras = () => {
    navigate(-1);
  };

  if (loading) {
    return <div style={{ color: '#fff', textAlign: 'center', marginTop: 60 }}>Cargando perfil...</div>;
  }

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #3a5c85 0%, #5783b7 100%);
          min-height: 100vh;
          margin: 0;
          overflow-y: auto;
        }
        .perfil-admin-card {
          max-width: 480px;
          margin: 4rem auto;
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
          overflow: hidden;
          text-overflow: ellipsis;
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
        .perfil-btn.atras {
          background: #6c757d;
          margin-right: 8px;
        }
        .perfil-btn.atras:hover {
          background: #495057;
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
          background: none;
          border: none;
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
          .perfil-info-row span {
            max-width: 100%;
          }
        }
      `}</style>
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
              {perfil?.Profile_photo
                ? <a href={perfil.Profile_photo} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_photo}</a>
                : '-'}
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
              {perfil?.Profile_website
                ? <a href={perfil.Profile_website} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_website}</a>
                : '-'}
            </span>
          </div>
          <div className="perfil-info-row">
            <span className="perfil-label">Red social:</span>
            <span>
              {perfil?.Profile_social
                ? <a href={perfil.Profile_social} target="_blank" rel="noopener noreferrer" style={{ color: '#72A3D1FF', wordBreak: 'break-all' }}>{perfil.Profile_social}</a>
                : '-'}
            </span>
          </div>
        </div>
        <div className="perfil-actions">
          <button className="perfil-btn atras" onClick={handleAtras}>
            Atrás
          </button>
          <button className="perfil-btn editar" onClick={handleEditarPerfil}>
            {perfil ? 'Editar Perfil' : 'Crear Perfil'}
          </button>
          <button
            className="perfil-btn cerrar"
            onClick={handleCerrarSesion}
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
    </>
  );
};

export default PerfilUser;