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
    login: (credentials) => api.post('/auth/login', credentials),
    registro: (userData) => api.post('/auth/registro', userData),
    getPerfil: () => api.get('/auth/perfil')
};

export const propertyService = {
    getAll: (params) => api.get('/properties', { params }),
    getById: (id) => api.get(`/properties/${id}`),
    create: (data) => api.post('/properties', data),
    update: (id, data) => api.put(`/properties/${id}`, data),
    delete: (id) => api.delete(`/properties/${id}`)
};

export const visualizationService = {
    register: (data) => api.post('/visualizations', data),
    getStats: (params) => api.get('/visualizations/estadisticas', { params })
};

export default api;