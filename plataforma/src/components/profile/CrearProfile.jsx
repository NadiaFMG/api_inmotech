import React, { useState, useEffect } from 'react';
import { platformProfileService } from '../../services/api';

const camposIniciales = {
  Profile_name: '',
  Profile_lastname: '',
  Profile_phone: '',
  Profile_addres: '',
  Profile_email: '',
  Profile_photo: '',
  Profile_birthdate: '',
  Profile_gender: '',
  Profile_national_id: '',
  Profile_bio: '',
  Profile_website: '',
  Profile_social: ''
};

const CrearPerfil = ({ userId, perfil, onSuccess, onCancel }) => {
  const [form, setForm] = useState(camposIniciales);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (perfil) {
        setForm({
        Profile_name: perfil.Profile_name || '',
        Profile_lastname: perfil.Profile_lastname || '',
        Profile_phone: perfil.Profile_phone || '',
        Profile_addres: perfil.Profile_addres || '',
        Profile_email: perfil.Profile_email || '',
        Profile_photo: perfil.Profile_photo || '',
        Profile_birthdate: perfil.Profile_birthdate || '',
        Profile_gender: perfil.Profile_gender || '',
        Profile_national_id: perfil.Profile_national_id || '',
        Profile_bio: perfil.Profile_bio || '',
        Profile_website: perfil.Profile_website || '',
        Profile_social: perfil.Profile_social || ''
        });
    } else {
        setForm(camposIniciales);
    }
    // Solo cuando perfil cambie, no en cada render
    }, [perfil]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        if (perfil) {
        // Editar perfil del usuario logueado
        await platformProfileService.updateByUser(userId, { ...form });
        } else {
        // Crear perfil del usuario logueado
        await platformProfileService.createByUser({ ...form, userId });
        }
        if (onSuccess) onSuccess();
    } catch (err) {
        setError('Error al guardar el perfil');
        console.error('Error al guardar el perfil:', err); // Para depuración
    }
    setLoading(false);
    };

  return (
    <div className="crear-perfil-modal-card">
      <h2 className="crear-perfil-title">{perfil ? 'Editar Perfil' : 'Crear Perfil'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="crear-perfil-modal-grid">
          <div>
            <label>Nombre</label>
            <input name="Profile_name" value={form.Profile_name} onChange={handleChange} required />
          </div>
          <div>
            <label>Apellido</label>
            <input name="Profile_lastname" value={form.Profile_lastname} onChange={handleChange} required />
          </div>
          <div>
            <label>Teléfono</label>
            <input name="Profile_phone" value={form.Profile_phone} onChange={handleChange} />
          </div>
          <div>
            <label>Dirección</label>
            <input name="Profile_addres" value={form.Profile_addres} onChange={handleChange} />
          </div>
          <div>
            <label>Correo</label>
            <input name="Profile_email" value={form.Profile_email} onChange={handleChange} type="email" required />
          </div>
          <div>
            <label>Foto (URL)</label>
            <input name="Profile_photo" value={form.Profile_photo} onChange={handleChange} />
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input name="Profile_birthdate" value={form.Profile_birthdate} onChange={handleChange} type="date" />
          </div>
          <div>
            <label>Género</label>
            <input name="Profile_gender" value={form.Profile_gender} onChange={handleChange} />
          </div>
          <div>
            <label>Documento</label>
            <input name="Profile_national_id" value={form.Profile_national_id} onChange={handleChange} />
          </div>
          <div>
            <label>Biografía</label>
            <textarea name="Profile_bio" value={form.Profile_bio} onChange={handleChange} />
          </div>
          <div>
            <label>Sitio web</label>
            <input name="Profile_website" value={form.Profile_website} onChange={handleChange} />
          </div>
          <div>
            <label>Red social</label>
            <input name="Profile_social" value={form.Profile_social} onChange={handleChange} />
          </div>
        </div>
        {error && <div className="crear-perfil-error">{error}</div>}
        <div className="crear-perfil-modal-actions">
          <button type="submit" className="crear-perfil-btn" disabled={loading}>
            {loading ? 'Guardando...' : perfil ? 'Guardar Cambios' : 'Crear Perfil'}
          </button>
          {onCancel && (
            <button type="button" className="crear-perfil-btn cancelar" onClick={onCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
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
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .crear-perfil-modal-card {
            background: #15365FFF;
            border-radius: 18px;
            box-shadow: 0 2px 18px rgba(60,90,130,0.18);
            padding: 32px 28px;
            color: #FDFDFDFF;
            min-width: 380px;
            max-width: 520px;
            margin: 0 auto;
        }
        .crear-perfil-title {
            text-align: center;
            color: #72A3D1FF;
            margin-bottom: 18px;
            font-size: 1.6rem;
            font-weight: 700;
        }
        .crear-perfil-modal-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
        }
        .crear-perfil-modal-grid > div {
            display: flex;
            flex-direction: column;
        }
        .crear-perfil-modal-grid label {
            font-weight: 600;
            color: #72A3D1FF;
            margin-bottom: 4px;
        }
        .crear-perfil-modal-grid input,
        .crear-perfil-modal-grid textarea {
            border-radius: 8px;
            border: 1px solid #b3c6e0;
            padding: 7px 10px;
            font-size: 1rem;
            margin-bottom: 2px;
            background: #f8fafc;
            color: #15365F;
        }
        .crear-perfil-modal-grid textarea {
            min-height: 40px;
            resize: vertical;
        }
        .crear-perfil-modal-actions {
            display: flex;
            gap: 18px;
            justify-content: flex-end;
            margin-top: 18px;
        }
        .crear-perfil-btn {
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
        .crear-perfil-btn.cancelar {
            background: #e74c3c;
        }
        .crear-perfil-error {
            color: #e74c3c;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        @media (max-width: 700px) {
            .crear-perfil-modal-card {
            min-width: 0;
            padding: 18px 6px;
            }
            .crear-perfil-modal-grid {
            grid-template-columns: 1fr;
            }
        }
        `}</style>
    </div>
  );
};

export default CrearPerfil;