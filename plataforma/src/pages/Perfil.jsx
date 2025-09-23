import React from 'react';

const perfilMock = {
  nombre: 'Jonathan Pérez',
  usuario: 'jonathanp',
  correo: 'jonathan.perez@email.com',
  telefono: '+57 312 123 4567',
  rol: 'Administrador',
  fechaRegistro: '2024-01-15',
  estado: 'Activo',
  avatar: '/assets/images/logo/logo_200x200.png',
  descripcion: 'Administrador principal de la plataforma InmoTech. Encargado de la gestión de inmuebles, usuarios y visualizaciones.',
  direccion: 'Cra 45 #12-34, Bogotá, Colombia',
  documento: 'CC 1234567890',
  fechaNacimiento: '1990-06-25',
  genero: 'Masculino'
};

const PerfilAdmin = () => (
  <div className="perfil-admin-card">
    <div className="perfil-header">
      <img src={perfilMock.avatar} alt="Avatar" className="perfil-avatar" />
      <div>
        <h2 className="perfil-nombre">{perfilMock.nombre}</h2>
        <span className="perfil-rol">{perfilMock.rol}</span>
      </div>
    </div>
    <div className="perfil-info">
      <div className="perfil-info-row">
        <span className="perfil-label">Usuario:</span>
        <span>{perfilMock.usuario}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Correo:</span>
        <span>{perfilMock.correo}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Teléfono:</span>
        <span>{perfilMock.telefono}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Documento:</span>
        <span>{perfilMock.documento}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Dirección:</span>
        <span>{perfilMock.direccion}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Fecha de nacimiento:</span>
        <span>{perfilMock.fechaNacimiento}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Género:</span>
        <span>{perfilMock.genero}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Fecha de registro:</span>
        <span>{perfilMock.fechaRegistro}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Estado:</span>
        <span>{perfilMock.estado}</span>
      </div>
      <div className="perfil-info-row">
        <span className="perfil-label">Descripción:</span>
        <span>{perfilMock.descripcion}</span>
      </div>
    </div>
    <div className="perfil-actions">
      <button className="perfil-btn editar">Editar Perfil</button>
      <button className="perfil-btn cerrar">Cerrar Sesión</button>
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
      .perfil-rol {
        background: #1C56A7FF;
        color: #FDFDFDFF;
        padding: 4px 14px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 500;
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

export default PerfilAdmin;