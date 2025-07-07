import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
    registro: async (userData) => {
        const response = await axios.post(`${API_URL}/registro`, userData);
        return response.data;
    },
    
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.usuario));
        }
        return response.data;
    }
};

export default authService;