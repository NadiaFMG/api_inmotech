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

export const inmuebleService = {
    getAll: (params) => api.get('/inmueble', { params }),
    getById: (id) => api.get(`/inmueble/${id}`),
    getCompleto: (id) => api.get(`/inmueble/completo/${id}`),
    create: (data) => api.post('/inmueble', data),
    update: (id, data) => api.put(`/inmueble/${id}`, data),
    delete: (id) => api.delete(`/inmueble/${id}`)
};

export const tipoEdificacionService = {
    getAll: () => api.get('/tipo_edificacion'),
    getById: (id) => api.get(`/tipo_edificacion/${id}`),
    create: (data) => api.post('/tipo_edificacion', data),
    update: (id, data) => api.put(`/tipo_edificacion/${id}`, data),
    delete: (id) => api.delete(`/tipo_edificacion/${id}`)
};

export const acercaEdificacionService = {
    getAll: () => api.get('/acerca_edificacion'),
    getById: (id) => api.get(`/acerca_edificacion/${id}`),
    create: (data) => api.post('/acerca_edificacion', data),
    update: (id, data) => api.put(`/acerca_edificacion/${id}`, data),
    delete: (id) => api.delete(`/acerca_edificacion/${id}`)
};

export const divisionService = {
    getAll: () => api.get('/division'),
    getById: (id) => api.get(`/division/${id}`),
    create: (data) => api.post('/division', data),
    update: (id, data) => api.put(`/division/${id}`, data),
    delete: (id) => api.delete(`/division/${id}`)
};

export const imagenesInmuebleService = {
    getAll: () => api.get('/imagenes_inmueble'),
    getById: (id) => api.get(`/imagenes_inmueble/${id}`),
    create: (data) => api.post('/imagenes_inmueble', data),
    update: (id, data) => api.put(`/imagenes_inmueble/${id}`, data),
    delete: (id) => api.delete(`/imagenes_inmueble/${id}`)
};

export const otrasCaracteristicasService = {
    getAll: () => api.get('/otras_caracteristicas'),
    getById: (id) => api.get(`/otras_caracteristicas/${id}`),
    create: (data) => api.post('/otras_caracteristicas', data),
    update: (id, data) => api.put(`/otras_caracteristicas/${id}`, data),
    delete: (id) => api.delete(`/otras_caracteristicas/${id}`)
};

export const asignacionService = {
    getAll: () => api.get('/asignacion'),
    getById: (id) => api.get(`/asignacion/${id}`),
    create: (data) => api.post('/asignacion', data),
    update: (id, data) => api.put(`/asignacion/${id}`, data),
    delete: (id) => api.delete(`/asignacion/${id}`)
};

export const organizacionParqueaderoService = {
    getAll: () => api.get('/organizacionparqueadero'),
    getById: (id) => api.get(`/organizacionparqueadero/${id}`),
    create: (data) => api.post('/organizacionparqueadero', data),
    update: (id, data) => api.put(`/organizacionparqueadero/${id}`, data),
    delete: (id) => api.delete(`/organizacionparqueadero/${id}`)
};


export const direccionService = {
    getAll: () => api.get('/direccion'),
    getById: (id) => api.get(`/direccion/${id}`),
    create: (data) => api.post('/direccion', data),
    update: (id, data) => api.put(`/direccion/${id}`, data),
    delete: (id) => api.delete(`/direccion/${id}`)
};

export const designadorCardinalService = {
    getAll: () => api.get('/designador_cardinal'),
    getById: (id) => api.get(`/designador_cardinal/${id}`),
    create: (data) => api.post('/designador_cardinal', data),
    update: (id, data) => api.put(`/designador_cardinal/${id}`, data),
    delete: (id) => api.delete(`/designador_cardinal/${id}`)
};

export const localizacionService = {
    getAll: () => api.get('/localizacion'),
    getById: (id) => api.get(`/localizacion/${id}`),
    create: (data) => api.post('/localizacion', data),
    update: (id, data) => api.put(`/localizacion/${id}`, data),
    delete: (id) => api.delete(`/localizacion/${id}`)
};

export const barrioService = {
    getAll: () => api.get('/barrio'),
    getById: (id) => api.get(`/barrio/${id}`),
    create: (data) => api.post('/barrio', data),
    update: (id, data) => api.put(`/barrio/${id}`, data),
    delete: (id) => api.delete(`/barrio/${id}`)
};

export const barrioCiudadCorregimientoVeredaService = {
    getAll: () => api.get('/barrio_ciudad_corregimiento_vereda'),
    getById: (id) => api.get(`/barrio_ciudad_corregimiento_vereda/${id}`),
    create: (data) => api.post('/barrio_ciudad_corregimiento_vereda', data),
    update: (id, data) => api.put(`/barrio_ciudad_corregimiento_vereda/${id}`, data),
    delete: (id) => api.delete(`/barrio_ciudad_corregimiento_vereda/${id}`)
};

export const ciudadService = {
    getAll: () => api.get('/ciudad'),
    getById: (id) => api.get(`/ciudad/${id}`),
    create: (data) => api.post('/ciudad', data),
    update: (id, data) => api.put(`/ciudad/${id}`, data),
    delete: (id) => api.delete(`/ciudad/${id}`)
};

export const corregimientoService = {
    getAll: () => api.get('/corregimiento'),
    getById: (id) => api.get(`/corregimiento/${id}`),
    create: (data) => api.post('/corregimiento', data),
    update: (id, data) => api.put(`/corregimiento/${id}`, data),
    delete: (id) => api.delete(`/corregimiento/${id}`)
};

export const veredaService = {
    getAll: () => api.get('/vereda'),
    getById: (id) => api.get(`/vereda/${id}`),
    create: (data) => api.post('/vereda', data),
    update: (id, data) => api.put(`/vereda/${id}`, data),
    delete: (id) => api.delete(`/vereda/${id}`)
};

export const municipioService = {
    getAll: () => api.get('/municipio'),
    getById: (id) => api.get(`/municipio/${id}`),
    create: (data) => api.post('/municipio', data),
    update: (id, data) => api.put(`/municipio/${id}`, data),
    delete: (id) => api.delete(`/municipio/${id}`)
};

export const ndapService = {
    getAll: () => api.get('/ndap'),
    getById: (id) => api.get(`/ndap/${id}`),
    create: (data) => api.post('/ndap', data),
    update: (id, data) => api.put(`/ndap/${id}`, data),
    delete: (id) => api.delete(`/ndap/${id}`)
};

export const busquedaInmuebleService = {
    buscar: (params) => api.get('/fc5/busqueda', { params })
};