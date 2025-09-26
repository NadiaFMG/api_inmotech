// 2. Backend para subir imagen
// Tu backend debe tener un endpoint /upload que reciba el archivo, lo suba a Google Cloud Storage y devuelva la URL pública.
// Guarda esa URL en el campo Profile_photo de la base de datos.

// 3. Mostrar la imagen en el perfil
// En tu Perfil.jsx y Profile.jsx, ya tienes:

// <img
//   src={perfil?.Profile_photo || '/assets/images/logo/logo_200x200.png'}
//   alt="Avatar"
//   className="perfil-avatar"
// />