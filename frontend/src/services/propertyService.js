import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const propertyService = {
    getAllProperties: async () => {
        const response = await axios.get(`${API_URL}/properties`);
        return response.data;
    },

    createProperty: async (propertyData) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/properties`, propertyData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    },

    getPropertyById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/properties/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener la propiedad:', error);
            throw error;
        }
    }
};

export default propertyService;