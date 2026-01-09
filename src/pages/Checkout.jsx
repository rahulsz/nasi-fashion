import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import client from '../api/client';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, getSubtotal, clearCart } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('COD');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else if (items.length === 0) {
            navigate('/');
        }
    }, [isAuthenticated, items, navigate]);

    const subtotal = getSubtotal();
    const shippingPrice = subtotal > 5000 ? 0 : 500; // Free shipping over 5000
    const taxPrice = subtotal * 0.18; // 18% Tax
    const totalPrice = subtotal + shippingPrice + taxPrice;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const placeOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const orderData = {
                orderItems: items.map((item) => ({
                    product: item.id,
                    name: item.name,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                })),
                shippingAddress: formData,
                paymentMethod,
                itemsPrice: subtotal,
                taxPrice,
                shippingPrice,
                totalPrice,
            };

            await client.post('/orders', orderData);

            clearCart();
            alert('Order placed successfully!');
            navigate('/'); // Ideally navigate to an order success/history page
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-[#faf9f6]">
            <div className="max-w-6xl mx-auto">
                <h1 className="font-serif text-3xl md:text-4xl text-slate-900 mb-10 text-center">Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Forms */}
                    <div className="space-y-8">
                        {/* Shipping Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-lg shadow-sm border border-slate-100"
                        >
                            <h2 className="text-xl font-medium text-slate-800 mb-6">Shipping Address</h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            required
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        required
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                    />
                                </div>
                            </form>
                        </motion.div>

                        {/* Payment Method */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-lg shadow-sm border border-slate-100"
                        >
                            <h2 className="text-xl font-medium text-slate-800 mb-6">Payment Method</h2>
                            <div className="space-y-3">
                                <label className="flex items-center space-x-3 p-4 border border-slate-200 rounded-md cursor-pointer hover:border-amber-500 transition-colors">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="text-amber-700 focus:ring-amber-500"
                                    />
                                    <span className="font-medium text-slate-700">Cash on Delivery</span>
                                </label>
                                <label className="flex items-center space-x-3 p-4 border border-slate-200 rounded-md cursor-pointer hover:border-amber-500 transition-colors opacity-50">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Stripe"
                                        disabled
                                        className="text-amber-700 focus:ring-amber-500"
                                    />
                                    <span className="font-medium text-slate-700">Credit Card (Coming Soon)</span>
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 sticky top-32"
                        >
                            <h2 className="text-xl font-medium text-slate-800 mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 text-sm">
                                        <div className="w-16 h-20 bg-slate-100 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-slate-900 line-clamp-2">{item.name}</p>
                                            <p className="text-slate-500 mt-1">{item.quantity} x ₹{item.price.toLocaleString()}</p>
                                        </div>
                                        <div className="text-slate-900 font-medium">
                                            ₹{(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Shipping</span>
                                    <span>{shippingPrice === 0 ? 'Free' : `₹${shippingPrice}`}</span>
                                </div>
                                <div className="flex justify-between text-slate-600">
                                    <span>Tax (18%)</span>
                                    <span>₹{taxPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 pt-4 mt-4">
                                <div className="flex justify-between text-lg font-bold text-slate-900">
                                    <span>Total</span>
                                    <span>₹{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            {error && (
                                <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
                            )}

                            <button
                                onClick={placeOrder}
                                disabled={loading}
                                className="w-full mt-6 bg-slate-900 text-white py-4 font-bold tracking-widest uppercase hover:bg-amber-700 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Place Order'}
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
