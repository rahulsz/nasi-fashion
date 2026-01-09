import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useAuthStore from '../../store/useAuthStore';

const CartDrawer = () => {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (isAuthenticated) {
            navigate('/checkout');
        } else {
            navigate('/login', { state: { from: '/checkout' } });
        }
        closeCart();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <h2 className="font-serif text-2xl text-slate-900">Your Cart</h2>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-slate-900">Your cart is empty</p>
                                        <p className="text-slate-500 mt-1">Looks like you haven't added anything yet.</p>
                                    </div>
                                    <button
                                        onClick={closeCart}
                                        className="mt-4 px-6 py-2 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-24 h-32 flex-shrink-0 bg-slate-100 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <h3 className="font-serif text-base text-slate-900 line-clamp-2">
                                                        {item.name}
                                                    </h3>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <p className="text-sm text-slate-500 mt-1">{item.category}</p>
                                                <p className="text-sm font-medium text-slate-900 mt-1">
                                                    ₹{item.price.toLocaleString()}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center border border-slate-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="p-1 hover:bg-slate-50 transition-colors"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-3 h-3 text-slate-600" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm text-slate-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="p-1 hover:bg-slate-50 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 text-slate-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-slate-100 p-6 bg-slate-50/50 space-y-4">
                                <div className="flex items-center justify-between text-base font-medium text-slate-900">
                                    <span>Subtotal</span>
                                    <span>₹{getSubtotal().toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-slate-500 text-center">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-slate-900 text-white py-4 font-bold tracking-widest uppercase hover:bg-amber-700 transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
