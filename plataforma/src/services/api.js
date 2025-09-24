import axios from 'axios';
import { REACT_APP_API_BASE_URL } from '../utils/constants';

const api = axios.create({
    baseURL: REACT_APP_API_BASE_URL
});

// Interceptor para incluir el token en las peticiones
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: async (usuario, password) => {
        const response = await api.post('/login', { Username: usuario, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('usuario', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    register: async (usuario, correo, password) => {
        // Aquí agregas el campo correo
        const response = await api.post('/register', { Username: usuario, email: correo, password });
        return response.data;
    },
    getPerfil: () => api.get('/auth/perfil')
};

export const platformProfileService = {
    // Crear perfil del usuario logueado
    createByUser: (data) => api.post('/platformprofile/by-user', data),
    // Editar perfil del usuario logueado
    updateByUser: (userId, data) => api.put('/platformprofile/by-user', { ...data, userId }),
    // Obtener perfil por userId
    getByUserId: (userId) => api.get('/platformprofile/by-user', { params: { userId } }),
    // Otros servicios generales
    create: (data) => api.post('/platformprofile', data),
    getAll: () => api.get('/platformprofile'),
    getById: (id) => api.get(`/platformprofile/${id}`),
    update: (id, data) => api.put(`/platformprofile/${id}`, data),
    delete: (id) => api.delete(`/platformprofile/${id}`)
};

export const propertyService = {
    getAll: (params) => api.get('/inmuebles', { params }),
    getById: (id) => api.get(`/inmuebles/${id}`),
    create: (data) => api.post('/inmuebles', data), // Para inmueble simple
    createAnidado: (data) => api.post('/inmuebles/anidado', data), // Para inmueble anidado
    update: (id, data) => api.put(`/inmuebles/${id}`, data),
    delete: (id) => api.delete(`/inmuebles/${id}`),
    // Servicio para subir una imagen y obtener la URL pública y nombre
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('imagen', file);
        return api.post('/inmuebles/upload-imagen', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

export const visualizationService = {
    register: (data) => api.post('/visualizations', data),
    getStats: (params) => api.get('/visualizations/estadisticas', { params })
};

export const terminosService = {
    create: (data) => api.post('/terminosycondiciones', data),
    getAll: () => api.get('/terminosycondiciones'),
    getById: (id) => api.get(`/terminosycondiciones/${id}`),
    update: (id, data) => api.put(`/terminosycondiciones/${id}`, data),
    delete: (id) => api.delete(`/terminosycondiciones/${id}`)
};

export const politicaService = {
    create: (data) => api.post('/politicadeprivacidad', data),
    getAll: () => api.get('/politicadeprivacidad'),
    getById: (id) => api.get(`/politicadeprivacidad/${id}`),
    update: (id, data) => api.put(`/politicadeprivacidad/${id}`, data),
    delete: (id) => api.delete(`/politicadeprivacidad/${id}`)
};

export const sobreNosotrosService = {
    create: (data) => api.post('/sobrenosotros', data),
    getAll: () => api.get('/sobrenosotros'),
    getById: (id) => api.get(`/sobrenosotros/${id}`),
    update: (id, data) => api.put(`/sobrenosotros/${id}`, data),
    delete: (id) => api.delete(`/sobrenosotros/${id}`),
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('imagen', file);
        return api.post('/sobrenosotros/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

export const preguntasService = {
    create: (data) => api.post('/preguntasfrecuentes', data),
    getAll: () => api.get('/preguntasfrecuentes'),
    getById: (id) => api.get(`/preguntasfrecuentes/${id}`),
    update: (id, data) => api.put(`/preguntasfrecuentes/${id}`, data),
    delete: (id) => api.delete(`/preguntasfrecuentes/${id}`)
};

export const carruselService = {
    create: (data) => api.post('/carrusel', data),
    getAll: () => api.get('/carrusel'),
    getById: (id) => api.get(`/carrusel/${id}`),
    update: (id, data) => api.put(`/carrusel/${id}`, data),
    delete: (id) => api.delete(`/carrusel/${id}`),
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/carrusel/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }
};

export const porqueElegirnosService = {
    create: (data) => api.post('/porqueelegirnos', data),
    getAll: () => api.get('/porqueelegirnos'),
    getById: (id) => api.get(`/porqueelegirnos/${id}`),
    update: (id, data) => api.put(`/porqueelegirnos/${id}`, data),
    delete: (id) => api.delete(`/porqueelegirnos/${id}`)
};

export const usersService = {
    create: (data) => api.post('/platformuser', data),
    getAll: () => api.get('/platformuser'),
    getById: (id) => api.get(`/platformuser/${id}`),
    update: (id, data) => api.put(`/platformuser/${id}`, data),
    delete: (id) => api.delete(`/platformuser/${id}`)
};

export default api;