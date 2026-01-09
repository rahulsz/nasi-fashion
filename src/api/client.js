import axios from 'axios';

// Try to use environment variable, fallback to localhost for development
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const client = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the auth token if available
client.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Simplest auth storage for now
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default client;
