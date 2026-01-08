import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            // Actions
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

            openCart: () => set({ isOpen: true }),

            closeCart: () => set({ isOpen: false }),

            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true, // Auto open cart when adding
                    });
                } else {
                    set({
                        items: [...items, { ...product, quantity: 1 }],
                        isOpen: true, // Auto open cart when adding
                    });
                }
            },

            removeItem: (productId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== productId),
                }));
            },

            updateQuantity: (productId, delta) => {
                const items = get().items;
                const item = items.find((i) => i.id === productId);

                if (!item) return;

                const newQuantity = item.quantity + delta;

                if (newQuantity < 1) {
                    get().removeItem(productId);
                } else {
                    set({
                        items: items.map((i) =>
                            i.id === productId ? { ...i, quantity: newQuantity } : i
                        )
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            // Selectors
            getCartCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            }
        }),
        {
            name: 'nasi-cart-storage', // unique name for localStorage
        }
    )
);

export default useCartStore;
