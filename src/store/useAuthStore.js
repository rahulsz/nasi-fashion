import { create } from 'zustand';
import client from '../api/client';

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await client.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            set({
                user: data,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
            });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Login failed',
                isLoading: false,
            });
            return false;
        }
    },

    register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const { data } = await client.post('/auth/register', {
                name,
                email,
                password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            set({
                user: data,
                token: data.token,
                isAuthenticated: true,
                isLoading: false,
            });
            return true;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Registration failed',
                isLoading: false,
            });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
    },

    clearError: () => set({ error: null }),
}));

export default useAuthStore;
