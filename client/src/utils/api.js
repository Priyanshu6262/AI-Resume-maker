import axios from 'axios';

// Vite automatically loads .env.development in dev mode and .env.production for builds.
// Use VITE_API_BASE_URL in both files to switch the target server.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
