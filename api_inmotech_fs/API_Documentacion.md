# Documentación de la API InmoTech

## Autenticación

### Login
**POST** `/api/login`

**Body (JSON):**
```json
{
  "User_user": "admin_sistema",
  "password": "tu_contraseña"
}
```
**Response (200):**
```json
{
  "token": "<JWT>",
  "user": {
    "id": 11,
    "username": "admin_sistema",
    "role": 1,
    "status": 1
  }
}
```

### Registro
**POST** `/api/register`

**Body (JSON):**
```json
{
  "User_user": "nuevo_usuario",
  "password": "contraseña_segura",
  "Role_FK": 3,
  "User_status_FK": 1
}
```
**Response (201):**
```json
{
  "User_id": 21,
  "User_user": "nuevo_usuario",
  "Role_FK": 3,
  "User_status_FK": 1,
  "Created_at": "2025-07-06T12:00:00.000Z",
  "Updated_at": "2025-07-06T12:00:00.000Z"
}
```

---

## Inmuebles

### Listar inmuebles (con filtros y paginación)
**GET** `/api/fcinmuebles?min_precio=100000&max_precio=500000&page=1&limit=10`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "total": 2,
  "page": 1,
  "limit": 10,
  "inmuebles": [
    {
      "Inmueble_id": 1,
      "Precio": 250000,
      "DescripcionInmueble": "Apartamento moderno...",
      "Created_at": "2025-07-06T12:00:00.000Z",
      "tipoInmueble": { "Tipo": "Apartamento" },
      "acercaEdificacion": { "TipoEdificacion": "Residencial", "Estrato": 4 },
      "division": { "Habitaciones": 3, "Baños": 2, "Area": 80 },
      "Direccion": { "DireccionCompleta": "Calle 100 #15-30" },
      "ImagenesURLs": ["https://.../img1.jpg", "https://.../img2.jpg"]
    }
  ]
}
```

### Detalle de inmueble
**GET** `/api/fcinmuebles/:id`

**Headers:**
```
Authorization: Bearer <token>
```

---

## Usuarios

### Listar usuarios
**GET** `/api/users`

**Headers:**
```
Authorization: Bearer <token>
```

### Crear usuario
**POST** `/api/users`

**Body (JSON):**
```json
{
  "User_user": "usuario_demo",
  "password": "demo1234",
  "Role_FK": 2,
  "User_status_FK": 1
}
```

---

## Contacto

### Enviar mensaje de contacto
**POST** `/api/contacto`

**Body (JSON):**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "3001234567",
  "asunto": "Consulta",
  "mensaje": "Quiero información sobre un inmueble."
}
```
**Response (201):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "telefono": "3001234567",
  "asunto": "Consulta",
  "mensaje": "Quiero información sobre un inmueble.",
  "fecha_envio": "2025-07-06T12:00:00.000Z"
}
```

### Listar mensajes de contacto
**GET** `/api/contacto`

**Headers:**
```
Authorization: Bearer <token>
```

---

## Carrusel

### Listar imágenes del carrusel
**GET** `/api/carrusel`

**Headers:**
```
Authorization: Bearer <token>
```
### Crear imagen de carrusel
**POST** `/api/carrusel`

**Body (JSON):**
```json
{
  "titulo": "Imagen principal",
  "descripcion": "Foto de portada",
  "imagen_url": "https://.../img1.jpg",
  "orden": 1
}
```

---

## Preguntas Frecuentes

### Listar preguntas frecuentes
**GET** `/api/preguntasfrecuentes`

### Crear pregunta frecuente
**POST** `/api/preguntasfrecuentes`

**Body (JSON):**
```json
{
  "pregunta": "¿Cómo contacto a un agente?",
  "respuesta": "Puedes usar el formulario de contacto.",
  "categoria": "General",
  "orden": 1
}
```

---

## Sobre Nosotros

### Listar información
**GET** `/api/sobrenosotros`

### Crear sección
**POST** `/api/sobrenosotros`

**Body (JSON):**
```json
{
  "titulo": "Nuestra Historia",
  "descripcion": "InmoTech nació en 2020...",
  "imagen_url": "https://.../historia.jpg"
}
```

---

## Términos y Condiciones

### Listar términos
**GET** `/api/terminosycondiciones`

### Crear término
**POST** `/api/terminosycondiciones`

**Body (JSON):**
```json
{
  "Titulo": "Condiciones de uso",
  "Descripcion": "Debes aceptar los términos para usar la plataforma."
}
```

---

## Política de Privacidad

### Listar políticas
**GET** `/api/politicadeprivacidad`

### Crear política
**POST** `/api/politicadeprivacidad`

**Body (JSON):**
```json
{
  "titulo": "Privacidad de datos",
  "descripcion": "Tus datos están protegidos...",
  "version": "1.0"
}
```

---

## Por Qué Elegirnos

### Listar razones
**GET** `/api/porqueelegirnos`

### Crear razón
**POST** `/api/porqueelegirnos`

**Body (JSON):**
```json
{
  "titulo": "Atención personalizada",
  "descripcion": "Brindamos asesoría 24/7.",
  "icono": "fa-user-check",
  "orden": 1
}
```

---

## Ejemplo de Endpoints CRUD para todos los recursos

### Estructura general para cada recurso:

#### Listar todos
**GET** `/api/<recurso>`

**Headers:**
```
Authorization: Bearer <token>
```

#### Obtener detalle
**GET** `/api/<recurso>/:id`

**Headers:**
```
Authorization: Bearer <token>
```

#### Crear
**POST** `/api/<recurso>`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  // Campos según el recurso
}
```

#### Actualizar
**PUT** `/api/<recurso>/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  // Campos a actualizar
}
```

#### Eliminar
**DELETE** `/api/<recurso>/:id`

**Headers:**
```
Authorization: Bearer <token>
```

---

## Ejemplo concreto para cada recurso

### Contacto
- GET `/api/contacto`
- GET `/api/contacto/:id`
- POST `/api/contacto`
- PUT `/api/contacto/:id`
- DELETE `/api/contacto/:id`

### Carrusel
- GET `/api/carrusel`
- GET `/api/carrusel/:id`
- POST `/api/carrusel`
- PUT `/api/carrusel/:id`
- DELETE `/api/carrusel/:id`

### Preguntas Frecuentes
- GET `/api/preguntasfrecuentes`
- GET `/api/preguntasfrecuentes/:id`
- POST `/api/preguntasfrecuentes`
- PUT `/api/preguntasfrecuentes/:id`
- DELETE `/api/preguntasfrecuentes/:id`

### Sobre Nosotros
- GET `/api/sobrenosotros`
- GET `/api/sobrenosotros/:id`
- POST `/api/sobrenosotros`
- PUT `/api/sobrenosotros/:id`
- DELETE `/api/sobrenosotros/:id`

### Términos y Condiciones
- GET `/api/terminosycondiciones`
- GET `/api/terminosycondiciones/:id`
- POST `/api/terminosycondiciones`
- PUT `/api/terminosycondiciones/:id`
- DELETE `/api/terminosycondiciones/:id`

### Política de Privacidad
- GET `/api/politicadeprivacidad`
- GET `/api/politicadeprivacidad/:id`
- POST `/api/politicadeprivacidad`
- PUT `/api/politicadeprivacidad/:id`
- DELETE `/api/politicadeprivacidad/:id`

### Por Qué Elegirnos
- GET `/api/porqueelegirnos`
- GET `/api/porqueelegirnos/:id`
- POST `/api/porqueelegirnos`
- PUT `/api/porqueelegirnos/:id`
- DELETE `/api/porqueelegirnos/:id`

### Usuarios
- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

### Inmuebles
- GET `/api/fcinmuebles`
- GET `/api/fcinmuebles/:id`
- POST `/api/fcinmuebles`
- PUT `/api/fcinmuebles/:id`
- DELETE `/api/fcinmuebles/:id`

---

> Para cada endpoint, usa el formato de ejemplo mostrado arriba. Cambia `<recurso>` por el nombre real (ej: contacto, carrusel, etc.) y ajusta los campos del body según el recurso.

---

## Notas
- Todos los endpoints protegidos requieren el header `Authorization: Bearer <token>`.
- Los códigos de error comunes son 400 (petición inválida), 401 (no autenticado), 403 (sin permisos), 404 (no encontrado).
- Puedes copiar los ejemplos de body y headers directamente en Postman para probar la API.

---

## Ejemplos completos de actualización y eliminación (PUT y DELETE)

### Contacto
#### Actualizar mensaje de contacto
**PUT** `/api/contacto/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "nombre": "Juan Pérez Modificado",
  "email": "juan@email.com",
  "telefono": "3001234567",
  "asunto": "Consulta Modificada",
  "mensaje": "Mensaje actualizado."
}
```
**Response (200):**
```json
{
  "id": 1,
  "nombre": "Juan Pérez Modificado",
  "email": "juan@email.com",
  "telefono": "3001234567",
  "asunto": "Consulta Modificada",
  "mensaje": "Mensaje actualizado.",
  "fecha_envio": "2025-07-06T12:00:00.000Z"
}
```
#### Eliminar mensaje de contacto
**DELETE** `/api/contacto/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Mensaje de contacto eliminado correctamente."
}
```

---

### Carrusel
#### Actualizar imagen de carrusel
**PUT** `/api/carrusel/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "titulo": "Imagen portada actualizada",
  "descripcion": "Nueva descripción",
  "imagen_url": "https://.../img1_nueva.jpg",
  "orden": 2
}
```
**Response (200):**
```json
{
  "id": 1,
  "titulo": "Imagen portada actualizada",
  "descripcion": "Nueva descripción",
  "imagen_url": "https://.../img1_nueva.jpg",
  "orden": 2
}
```
#### Eliminar imagen de carrusel
**DELETE** `/api/carrusel/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Imagen de carrusel eliminada correctamente."
}
```

---

### Preguntas Frecuentes
#### Actualizar pregunta frecuente
**PUT** `/api/preguntasfrecuentes/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "pregunta": "¿Cómo edito mi perfil?",
  "respuesta": "Desde la sección de usuario.",
  "categoria": "General",
  "orden": 2
}
```
**Response (200):**
```json
{
  "id": 1,
  "pregunta": "¿Cómo edito mi perfil?",
  "respuesta": "Desde la sección de usuario.",
  "categoria": "General",
  "orden": 2
}
```
#### Eliminar pregunta frecuente
**DELETE** `/api/preguntasfrecuentes/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Pregunta frecuente eliminada correctamente."
}
```

---

### Sobre Nosotros
#### Actualizar sección
**PUT** `/api/sobrenosotros/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "titulo": "Nuestra Historia Modificada",
  "descripcion": "Descripción actualizada...",
  "imagen_url": "https://.../historia_mod.jpg"
}
```
**Response (200):**
```json
{
  "id": 1,
  "titulo": "Nuestra Historia Modificada",
  "descripcion": "Descripción actualizada...",
  "imagen_url": "https://.../historia_mod.jpg"
}
```
#### Eliminar sección
**DELETE** `/api/sobrenosotros/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Sección eliminada correctamente."
}
```

---

### Términos y Condiciones
#### Actualizar término
**PUT** `/api/terminosycondiciones/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "Titulo": "Condiciones de uso actualizadas",
  "Descripcion": "Nuevos términos y condiciones."
}
```
**Response (200):**
```json
{
  "id": 1,
  "Titulo": "Condiciones de uso actualizadas",
  "Descripcion": "Nuevos términos y condiciones."
}
```
#### Eliminar término
**DELETE** `/api/terminosycondiciones/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Término eliminado correctamente."
}
```

---

### Política de Privacidad
#### Actualizar política
**PUT** `/api/politicadeprivacidad/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "titulo": "Privacidad de datos actualizada",
  "descripcion": "Nueva política de privacidad...",
  "version": "1.1"
}
```
**Response (200):**
```json
{
  "id": 1,
  "titulo": "Privacidad de datos actualizada",
  "descripcion": "Nueva política de privacidad...",
  "version": "1.1"
}
```
#### Eliminar política
**DELETE** `/api/politicadeprivacidad/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Política de privacidad eliminada correctamente."
}
```

---

### Por Qué Elegirnos
#### Actualizar razón
**PUT** `/api/porqueelegirnos/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "titulo": "Atención personalizada actualizada",
  "descripcion": "Nuevo texto de asesoría.",
  "icono": "fa-user-edit",
  "orden": 2
}
```
**Response (200):**
```json
{
  "id": 1,
  "titulo": "Atención personalizada actualizada",
  "descripcion": "Nuevo texto de asesoría.",
  "icono": "fa-user-edit",
  "orden": 2
}
```
#### Eliminar razón
**DELETE** `/api/porqueelegirnos/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Razón eliminada correctamente."
}
```

---

### Usuarios
#### Actualizar usuario
**PUT** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "User_user": "usuario_modificado",
  "password": "nueva_password",
  "Role_FK": 2,
  "User_status_FK": 1
}
```
**Response (200):**
```json
{
  "User_id": 1,
  "User_user": "usuario_modificado",
  "Role_FK": 2,
  "User_status_FK": 1,
  "Created_at": "2025-07-06T12:00:00.000Z",
  "Updated_at": "2025-07-06T12:10:00.000Z"
}
```
#### Eliminar usuario
**DELETE** `/api/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Usuario eliminado correctamente."
}
```

---

### Inmuebles
#### Actualizar inmueble
**PUT** `/api/fcinmuebles/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```
**Body (JSON):**
```json
{
  "Precio": 300000,
  "DescripcionInmueble": "Apartamento remodelado...",
  "tipoInmueble": { "Tipo": "Apartamento" },
  "acercaEdificacion": { "TipoEdificacion": "Residencial", "Estrato": 5 },
  "division": { "Habitaciones": 4, "Baños": 3, "Area": 100 },
  "Direccion": { "DireccionCompleta": "Calle 101 #16-40" },
  "ImagenesURLs": ["https://.../img1.jpg", "https://.../img2.jpg"]
}
```
**Response (200):**
```json
{
  "Inmueble_id": 1,
  "Precio": 300000,
  "DescripcionInmueble": "Apartamento remodelado...",
  "Created_at": "2025-07-06T12:00:00.000Z",
  "tipoInmueble": { "Tipo": "Apartamento" },
  "acercaEdificacion": { "TipoEdificacion": "Residencial", "Estrato": 5 },
  "division": { "Habitaciones": 4, "Baños": 3, "Area": 100 },
  "Direccion": { "DireccionCompleta": "Calle 101 #16-40" },
  "ImagenesURLs": ["https://.../img1.jpg", "https://.../img2.jpg"]
}
```
#### Eliminar inmueble
**DELETE** `/api/fcinmuebles/:id`

**Headers:**
```
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "message": "Inmueble eliminado correctamente."
}
```
