// import React, { useState, useEffect } from 'react';
// import { platformProfileService } from '../../services/api';

// const camposIniciales = {
//   Profile_name: '',
//   Profile_lastname: '',
//   Profile_phone: '',
//   Profile_addres: '',
//   Profile_email: '',
//   Profile_photo: '',
//   Profile_birthdate: '',
//   Profile_gender: '',
//   Profile_national_id: '',
//   Profile_bio: '',
//   Profile_website: '',
//   Profile_social: ''
// };

// const DEFAULT_IMAGE = '/assets/images/logo/logo_200x200.png';

// const CrearProfile = ({ userId, perfil, onSuccess, onCancel }) => {
//   const [form, setForm] = useState(camposIniciales);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [localPreview, setLocalPreview] = useState(null);

//   useEffect(() => {
//     // Al abrir el modal, muestra la imagen guardada en el perfil
//     setLocalPreview(null);
//     if (perfil) {
//       setForm({
//         Profile_name: perfil.Profile_name || '',
//         Profile_lastname: perfil.Profile_lastname || '',
//         Profile_phone: perfil.Profile_phone || '',
//         Profile_addres: perfil.Profile_addres || '',
//         Profile_email: perfil.Profile_email || '',
//         Profile_photo: perfil.Profile_photo || '',
//         Profile_birthdate: perfil.Profile_birthdate || '',
//         Profile_gender: perfil.Profile_gender || '',
//         Profile_national_id: perfil.Profile_national_id || '',
//         Profile_bio: perfil.Profile_bio || '',
//         Profile_website: perfil.Profile_website || '',
//         Profile_social: perfil.Profile_social || ''
//       });
//     } else {
//       setForm(camposIniciales);
//     }
//   }, [perfil]);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (name === 'Profile_photo') {
//       setLocalPreview(null); // Si el usuario edita manualmente la URL, quita la imagen local
//     }
//   };

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setError('');
//     // Mostrar la imagen seleccionada inmediatamente
//     const localUrl = URL.createObjectURL(file);
//     setLocalPreview(localUrl);
//     try {
//       const res = await platformProfileService.uploadProfilePhoto(file);
//       const imageUrl = res.data.url;
//       setForm(prev => ({
//         ...prev,
//         Profile_photo: imageUrl
//       }));
//       // Mantén la imagen local hasta que el usuario elija otra
//       // Si quieres mostrar la imagen pública después de guardar, puedes actualizar localPreview aquí si lo deseas
//     } catch (err) {
//       setError('Error al subir la imagen');
//     }
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       if (perfil) {
//         await platformProfileService.updateByUser(userId, { ...form });
//       } else {
//         await platformProfileService.createByUser({ ...form, userId });
//       }
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       setError('Error al guardar el perfil');
//       console.error('Error al guardar el perfil:', err);
//     }
//     setLoading(false);
//   };

//   // Decide qué imagen mostrar: localPreview si existe, si no la guardada, si no la de defecto
//   const imageToShow = localPreview || form.Profile_photo || DEFAULT_IMAGE;

//   return (
//     <div className="crear-perfil-modal-card">
//       <h2 className="crear-perfil-title">{perfil ? 'Editar Perfil' : 'Crear Perfil'}</h2>
//       <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
//         <img
//           src={imageToShow}
//           alt="Vista previa"
//           style={{
//             width: 100,
//             height: 100,
//             borderRadius: '50%',
//             objectFit: 'cover',
//             boxShadow: '0 2px 8px rgba(60,90,130,0.10)',
//             background: '#fff'
//           }}
//           onError={e => { e.target.src = DEFAULT_IMAGE; }}
//         />
//       </div>
//       <form onSubmit={handleSubmit}>
//         <div className="crear-perfil-modal-grid">
//           <div>
//             <label>Nombre</label>
//             <input name="Profile_name" value={form.Profile_name} onChange={handleChange} required />
//           </div>
//           <div>
//             <label>Apellido</label>
//             <input name="Profile_lastname" value={form.Profile_lastname} onChange={handleChange} required />
//           </div>
//           <div>
//             <label>Teléfono</label>
//             <input name="Profile_phone" value={form.Profile_phone} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Dirección</label>
//             <input name="Profile_addres" value={form.Profile_addres} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Correo</label>
//             <input name="Profile_email" value={form.Profile_email} onChange={handleChange} type="email" required />
//           </div>
//           <div>
//             <label>Foto de perfil</label>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             <input
//               name="Profile_photo"
//               value={form.Profile_photo}
//               onChange={handleChange}
//               placeholder="URL de la imagen"
//               style={{ marginTop: 8 }}
//             />
//           </div>
//           <div>
//             <label>Fecha de nacimiento</label>
//             <input name="Profile_birthdate" value={form.Profile_birthdate} onChange={handleChange} type="date" />
//           </div>
//           <div>
//             <label>Género</label>
//             <input name="Profile_gender" value={form.Profile_gender} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Documento</label>
//             <input name="Profile_national_id" value={form.Profile_national_id} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Biografía</label>
//             <textarea name="Profile_bio" value={form.Profile_bio} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Sitio web</label>
//             <input name="Profile_website" value={form.Profile_website} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Red social</label>
//             <input name="Profile_social" value={form.Profile_social} onChange={handleChange} />
//           </div>
//         </div>
//         {error && <div className="crear-perfil-error">{error}</div>}
//         <div className="crear-perfil-modal-actions">
//           <button type="submit" className="crear-perfil-btn" disabled={loading}>
//             {loading ? 'Guardando...' : perfil ? 'Guardar Cambios' : 'Crear Perfil'}
//           </button>
//           {onCancel && (
//             <button type="button" className="crear-perfil-btn cancelar" onClick={onCancel}>
//               Cancelar
//             </button>
//           )}
//         </div>
//       </form>
//       <style>{`
//         .modal-overlay {
//             position: fixed;
//             top: 0; left: 0; right: 0; bottom: 0;
//             background: rgba(0,0,0,0.5);
//             z-index: 1000;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//         }
//         .modal-content {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             min-height: 100vh;
//         }
//         .crear-perfil-modal-card {
//             background: #15365FFF;
//             border-radius: 18px;
//             box-shadow: 0 2px 18px rgba(60,90,130,0.18);
//             padding: 32px 28px;
//             color: #FDFDFDFF;
//             min-width: 380px;
//             max-width: 520px;
//             margin: 0 auto;
//         }
//         .crear-perfil-title {
//             text-align: center;
//             color: #72A3D1FF;
//             margin-bottom: 18px;
//             font-size: 1.6rem;
//             font-weight: 700;
//         }
//         .crear-perfil-modal-grid {
//             display: grid;
//             grid-template-columns: 1fr 1fr;
//             gap: 18px;
//         }
//         .crear-perfil-modal-grid > div {
//             display: flex;
//             flex-direction: column;
//         }
//         .crear-perfil-modal-grid label {
//             font-weight: 600;
//             color: #72A3D1FF;
//             margin-bottom: 4px;
//         }
//         .crear-perfil-modal-grid input,
//         .crear-perfil-modal-grid textarea {
//             border-radius: 8px;
//             border: 1px solid #b3c6e0;
//             padding: 7px 10px;
//             font-size: 1rem;
//             margin-bottom: 2px;
//             background: #f8fafc;
//             color: #15365F;
//         }
//         .crear-perfil-modal-grid textarea {
//             min-height: 40px;
//             resize: vertical;
//         }
//         .crear-perfil-modal-actions {
//             display: flex;
//             gap: 18px;
//             justify-content: flex-end;
//             margin-top: 18px;
//         }
//         .crear-perfil-btn {
//             background: #1C56A7FF;
//             color: #FDFDFDFF;
//             border: none;
//             border-radius: 10px;
//             font-size: 1.08rem;
//             font-weight: 600;
//             padding: 10px 28px;
//             box-shadow: 0 2px 8px rgba(60,90,130,0.10);
//             transition: background 0.2s, color 0.2s;
//             cursor: pointer;
//         }
//         .crear-perfil-btn.cancelar {
//             background: #e74c3c;
//         }
//         .crear-perfil-error {
//             color: #e74c3c;
//             margin-top: 10px;
//             margin-bottom: 10px;
//         }
//         @media (max-width: 700px) {
//             .crear-perfil-modal-card {
//             min-width: 0;
//             padding: 18px 6px;
//             }
//             .crear-perfil-modal-grid {
//             grid-template-columns: 1fr;
//             }
//         }
//         `}</style>
//     </div>
//   );
// };

// export default CrearProfile;

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

const DEFAULT_IMAGE = '/assets/images/logo/logo_200x200.png';

// Expresiones regulares para validaciones
const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
const regexLastname = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s\-]{2,100}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexPhone = /^\+?\d{7,15}$/;
const regexAddres = /^.{0,200}$/;
const regexBirthdate = /^\d{4}-\d{2}-\d{2}$/;
const regexBio = /^.{0,1000}$/;
const regexWebsite = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
const regexSocial = /^(https?:\/\/[^\s]+|@[A-Za-z0-9_]{1,50})?$/;
const regexPhoto = /^https:\/\/storage\.googleapis\.com\/[^\s]+$/;
const regexNationalId = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,50}$/;

const genderOptions = [
  'Masculino',
  'Femenino',
  'No binario',
  'Prefiero no decir'
];

const nationalIdOptions = [
  'Colombiano', 'Mexicano', 'Argentino', 'Peruano', 'Chileno', 'Venezolano', 'Uruguayo', 'Boliviano', 'Ecuatoriano', 'Paraguayo', 'Otro'
];

const CrearProfile = ({ userId, perfil, onSuccess, onCancel }) => {
  const [form, setForm] = useState(camposIniciales);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [localPreview, setLocalPreview] = useState(null);

  useEffect(() => {
    setLocalPreview(null);
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
  }, [perfil]);

  // Validaciones
  const validate = () => {
    if (!regexName.test(form.Profile_name)) {
      return 'Nombre inválido. Solo letras, mínimo 2, máximo 100 caracteres.';
    }
    if (!regexLastname.test(form.Profile_lastname)) {
      return 'Apellido inválido. Solo letras, mínimo 2, máximo 100 caracteres.';
    }
    if (!regexEmail.test(form.Profile_email)) {
      return 'Correo inválido.';
    }
    if (form.Profile_phone && !regexPhone.test(form.Profile_phone)) {
      return 'Teléfono inválido. Debe tener entre 7 y 15 dígitos.';
    }
    if (form.Profile_addres && !regexAddres.test(form.Profile_addres)) {
      return 'Dirección demasiado larga.';
    }
    if (!regexBirthdate.test(form.Profile_birthdate)) {
      return 'Fecha de nacimiento inválida.';
    }
    // Validar edad mínima (18 años)
    const birthDate = new Date(form.Profile_birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18 || birthDate > today) {
      return 'Debes ser mayor de 18 años y la fecha no puede ser en el futuro.';
    }
    if (!genderOptions.includes(form.Profile_gender)) {
      return 'Selecciona un género válido.';
    }
    if (form.Profile_bio && !regexBio.test(form.Profile_bio)) {
      return 'Biografía demasiado larga.';
    }
    if (form.Profile_website && !regexWebsite.test(form.Profile_website)) {
      return 'Sitio web inválido.';
    }
    if (form.Profile_social && !regexSocial.test(form.Profile_social)) {
      return 'Red social inválida.';
    }
    if (form.Profile_photo && !/^https:\/\/.+/.test(form.Profile_photo)) {
      return 'La foto debe ser una URL válida que comience con https://';
    }
    // Validar nacionalidad
    if (
      !form.Profile_national_id ||
      (
        !nationalIdOptions.includes(form.Profile_national_id) &&
        !regexNationalId.test(form.Profile_national_id)
      )
    ) {
      return 'Selecciona o escribe una nacionalidad válida.';
    }
    return '';
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'Profile_photo') {
      setLocalPreview(null);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setError('');
    const localUrl = URL.createObjectURL(file);
    setLocalPreview(localUrl);
    try {
      const res = await platformProfileService.uploadProfilePhoto(file);
      const imageUrl = res.data.url;
      setForm(prev => ({
        ...prev,
        Profile_photo: imageUrl
      }));
      // Mantén la imagen local hasta que el usuario elija otra
    } catch (err) {
      setError('Error al subir la imagen');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (perfil) {
        await platformProfileService.updateByUser(userId, { ...form });
      } else {
        await platformProfileService.createByUser({ ...form, userId });
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Error al guardar el perfil');
      console.error('Error al guardar el perfil:', err);
    }
    setLoading(false);
  };

  const imageToShow = localPreview || form.Profile_photo || DEFAULT_IMAGE;

  return (
    <div className="crear-perfil-modal-card">
      <h2 className="crear-perfil-title">{perfil ? 'Editar Perfil' : 'Crear Perfil'}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
        <img
          src={imageToShow}
          alt="Vista previa"
          style={{
            width: 100,
            height: 100,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 2px 8px rgba(60,90,130,0.10)',
            background: '#fff'
          }}
          onError={e => { e.target.src = DEFAULT_IMAGE; }}
        />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="crear-perfil-modal-grid">
          <div>
            <label>Nombre</label>
            <input
              name="Profile_name"
              value={form.Profile_name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              pattern={regexName.source}
              title="Solo letras, mínimo 2, máximo 100 caracteres"
            />
          </div>
          <div>
            <label>Apellido</label>
            <input
              name="Profile_lastname"
              value={form.Profile_lastname}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={100}
              pattern={regexLastname.source}
              title="Solo letras, mínimo 2, máximo 100 caracteres"
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              name="Profile_phone"
              value={form.Profile_phone}
              onChange={handleChange}
              pattern={regexPhone.source}
              title="Solo números, entre 7 y 15 dígitos, prefijo opcional"
            />
          </div>
          <div>
            <label>Dirección</label>
            <input
              name="Profile_addres"
              value={form.Profile_addres}
              onChange={handleChange}
              maxLength={200}
              title="Máximo 200 caracteres"
            />
          </div>
          <div>
            <label>Correo</label>
            <input
              name="Profile_email"
              value={form.Profile_email}
              onChange={handleChange}
              type="email"
              required
              pattern={regexEmail.source}
              title="Correo válido"
            />
          </div>
          <div>
            <label>Foto de perfil</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <input
              name="Profile_photo"
              value={form.Profile_photo}
              onChange={handleChange}
              placeholder="URL de la imagen"
              pattern="^https:\/\/.+"
              title="Debe ser una URL válida que comience con https://"
              style={{ marginTop: 8 }}
            />
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input
              name="Profile_birthdate"
              value={form.Profile_birthdate}
              onChange={handleChange}
              type="date"
              required
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div>
            <label>Género</label>
            <select
              name="Profile_gender"
              value={form.Profile_gender}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona</option>
              {genderOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Nacionalidad</label>
            <select
              name="Profile_national_id"
              value={form.Profile_national_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona</option>
              {nationalIdOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
              <option value="Otro">Otro</option>
            </select>
            {form.Profile_national_id === 'Otro' && (
              <input
                name="Profile_national_id"
                value={form.Profile_national_id}
                onChange={handleChange}
                minLength={4}
                maxLength={50}
                pattern={regexNationalId.source}
                placeholder="Escribe tu nacionalidad"
                style={{ marginTop: 8 }}
              />
            )}
          </div>
          <div>
            <label>Biografía</label>
            <textarea
              name="Profile_bio"
              value={form.Profile_bio}
              onChange={handleChange}
              maxLength={1000}
              title="Máximo 1000 caracteres"
            />
          </div>
          <div>
            <label>Sitio web</label>
            <input
              name="Profile_website"
              value={form.Profile_website}
              onChange={handleChange}
              pattern={regexWebsite.source}
              title="Debe ser una URL válida"
            />
          </div>
          <div>
            <label>Red social</label>
            <input
              name="Profile_social"
              value={form.Profile_social}
              onChange={handleChange}
              pattern={regexSocial.source}
              title="Debe ser una URL válida o un handle"
            />
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
  .crear-perfil-modal-card {
    background: #15365FFF;
    border-radius: 18px;
    box-shadow: 0 2px 18px rgba(60,90,130,0.18);
    padding: 40px 32px;
    color: #FDFDFDFF;
    min-width: 420px;
    max-width: 600px;
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
  .crear-perfil-modal-grid textarea,
  .crear-perfil-modal-grid select {
    border-radius: 8px;
    border: 1px solid #b3c6e0;
    padding: 7px 10px;
    font-size: 1rem;
    margin-bottom: 2px;
    background: #f8fafc;
    color: #15365F;
    width: 100%;
    box-sizing: border-box;
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
      max-width: 98vw;
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

export default CrearProfile;