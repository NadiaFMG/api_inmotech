import React, { useEffect, useState } from 'react';
import { platformProfileService } from '../../services/api';

const PerfilAdmin = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  // Obtén el usuario logueado desde localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  // Extrae el ID del usuario (puede ser Platform_user_id o id)
  const userId = user?.Platform_user_id || user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    console.log('userId usado para buscar perfil:', userId);
    // Usa el servicio para obtener el perfil por userId
    platformProfileService
      .getByUserId(userId)
      .then(res => {
        setPerfil(res.data || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  const handleEditarPerfil = () => {
    alert('Funcionalidad de editar/crear perfil aquí');
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
        {perfil && (
          <button className="perfil-btn cerrar" onClick={handleEliminarPerfil}>
            Eliminar Perfil
          </button>
        )}
      </div>
      <style>{`
        .perfil-admin-card {
          max-width: 480px;
          margin: 2rem auto;
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
    </div>
  );
};

export default PerfilAdmin;