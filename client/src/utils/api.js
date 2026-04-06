import axios from 'axios';

// Vite automatically loads .env.development in dev mode and .env.production for builds.
// Use VITE_API_BASE_URL in both files to switch the target server.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Automatically attach the JWT token from localStorage to every request
api.interceptors.request.use((config) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo?.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
    } catch {
        // localStorage unavailable or invalid JSON — continue without token
    }
    return config;
});

export default api;
