import { create } from 'zustand';
import client from '../api/client';

const useProductStore = create((set) => ({
    products: [],
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.get('/products');
            set({ products: data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch products',
                loading: false,
            });
        }
    },

    getProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const { data } = await client.get(`/products/${id}`);
            set({ loading: false });
            return data;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch product',
                loading: false,
            });
            return null;
        }
    },
}));

export default useProductStore;
