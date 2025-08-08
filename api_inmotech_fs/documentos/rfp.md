# Solicitud de Propuesta (RFP)  
## Proyecto: Plataforma Integral de Gestión Inmobiliaria - Inmotech

---

### 1. Introducción y Antecedentes

Inmotech busca desarrollar una plataforma integral para la gestión de inmuebles, usuarios y operaciones inmobiliarias, que incluya tanto una API robusta como un frontend moderno y seguro. El sistema debe permitir la administración de propiedades, usuarios, roles, permisos, contenidos informativos y funcionalidades avanzadas para la gestión y publicación de inmuebles.

---

### 2. Objetivo del Proyecto

Desarrollar una solución web que permita:
- Publicar, buscar y administrar inmuebles.
- Gestionar usuarios, roles y permisos tanto para la API como para la plataforma web.
- Ofrecer funcionalidades de administración de contenidos (preguntas frecuentes, carrusel, términos y condiciones, etc.).
- Integrar mapas, filtros avanzados y gestión de imágenes para cada inmueble.

---

### 3. Alcance del Proyecto

**Módulos principales:**
- **Backend/API RESTful:** Node.js, Express, Sequelize, MySQL.
- **Frontend:** React, Bootstrap, integración con Google Maps.
- **Gestión de usuarios y roles:** Separación entre usuarios de la plataforma y usuarios de la API.
- **Gestión de inmuebles:** CRUD completo, filtros avanzados, imágenes, localización.
- **Gestión de contenidos:** Preguntas frecuentes, carrusel, términos y condiciones, política de privacidad, sobre nosotros, por qué elegirnos.
- **Panel de administración:** Control de accesos y permisos por rol y módulo.
- **Documentación técnica y de usuario.**

---

### 4. Requerimientos Técnicos

- **Lenguajes y frameworks:** Node.js, React, MySQL, Sequelize, Bootstrap.
- **Base de datos relacional:** MySQL, con modelo de datos normalizado y relaciones claras (ver tablas como `inmueble`, `imagenes_inmueble`, `users`, `platform_user`, etc.).
- **Autenticación y autorización:** JWT para API, control de rutas y componentes en frontend según rol.
- **Infraestructura:** Desplegable en servidores Linux o servicios cloud (AWS, Azure, GCP).
- **Versionado:** Uso de Git.

---

### 5. Requerimientos Funcionales

- Registro, login y gestión de usuarios (API y plataforma).
- CRUD de inmuebles, con múltiples imágenes y localización geográfica.
- Filtros avanzados de búsqueda (por área, precio, ubicación, características, etc.).
- Gestión de roles y permisos (por endpoint y por componente/ruta).
- Administración de contenidos informativos (FAQ, carrusel, términos, etc.).
- Panel de administración para gestión de usuarios, roles, módulos y permisos.
- Integración con Google Maps para visualización y búsqueda geográfica.
- Soporte para diferentes tipos de usuarios (administrador, agente, cliente, etc.).

---

### 6. Requerimientos No Funcionales

- **Escalabilidad:** Soportar crecimiento en número de usuarios y propiedades.
- **Seguridad:** Protección de datos personales, cifrado de contraseñas, validación de inputs.
- **Rendimiento:** Respuestas rápidas en búsquedas y operaciones CRUD.
- **Accesibilidad:** Interfaz usable en dispositivos móviles y escritorio.
- **Mantenibilidad:** Código documentado y modular.

---

### 7. Entregables Esperados

- Código fuente completo (backend y frontend).
- Scripts de base de datos y datos de ejemplo.
- Documentación técnica (modelo de datos, endpoints, estructura de carpetas).
- Manual de usuario y despliegue.
- Diagramas (ER, arquitectura).
- Pruebas unitarias y de integración básicas.

---

### 8. Criterios de Evaluación

- Experiencia previa en proyectos similares.
- Calidad y claridad de la propuesta técnica.
- Plazos de entrega y cronograma.
- Soporte y mantenimiento ofrecido.
- Precio y condiciones comerciales.

---

### 9. Cronograma y Fechas Clave

- **Recepción de preguntas:** [Fecha límite]
- **Entrega de propuestas:** [Fecha límite]
- **Evaluación y selección:** [Fecha estimada]
- **Inicio del proyecto:** [Fecha estimada]
- **Entrega final:** [Fecha estimada]

---

### 10. Presupuesto

- Indicar rango estimado o solicitar cotización detallada.

---

### 11. Contacto

- Nombre: [Tu nombre o responsable]
- Email: [Tu correo]
- Teléfono: [Tu teléfono]