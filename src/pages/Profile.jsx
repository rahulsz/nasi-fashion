import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import client from '../api/client';
import { Package, User as UserIcon, Calendar, TrendingUp, Heart, MapPin, Settings } from 'lucide-react';

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    // Default to 'orders' or whatever was passed in state
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'orders');

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Update activeTab if location state changes (e.g. clicking navbar link while already on profile)
    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const fetchOrders = async () => {
            try {
                const { data } = await client.get('/orders/myorders');
                setOrders(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch orders');
                setLoading(false);
            }
        };

        if (activeTab === 'orders') {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, navigate, activeTab]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    const tabs = [
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
        { id: 'profile', label: 'Edit Profile', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'orders':
                return (
                    <>
                        <h1 className="font-serif text-3xl text-slate-900 mb-8 flex items-center gap-3">
                            <Package className="w-8 h-8 text-amber-700" />
                            My Orders
                        </h1>
                        {loading ? (
                            <div className="text-center py-12">
                                <p className="text-slate-500">Loading your history...</p>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 text-red-600 p-4 rounded-md">
                                {error}
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-100 text-center">
                                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No orders yet</h3>
                                <p className="text-slate-500 mb-6">Start building your wardrobe today.</p>
                                <button
                                    onClick={() => navigate('/new-arrivals')}
                                    className="bg-slate-900 text-white px-6 py-3 text-sm font-bold tracking-widest uppercase hover:bg-amber-700 transition-colors"
                                >
                                    Shop New Arrivals
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                                        <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex flex-wrap gap-4 justify-between items-center bg-[#faf9f6]">
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Order ID</p>
                                                <p className="font-mono text-sm text-slate-900">#{order._id}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Date</p>
                                                <div className="flex items-center gap-2 text-sm text-slate-900">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Total</p>
                                                <p className="font-medium text-slate-900">₹{order.totalPrice.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.isPaid
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-amber-100 text-amber-800'
                                                    }`}>
                                                    {order.isPaid ? 'Paid' : 'Processing'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {order.orderItems.map((item, index) => (
                                                    <div key={index} className="flex gap-4 items-center">
                                                        <div className="w-16 h-20 bg-slate-100 flex-shrink-0">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-slate-900">{item.name}</p>
                                                            <p className="text-xs text-slate-500 mt-1">Qty: {item.qty}</p>
                                                        </div>
                                                        <p className="text-sm text-slate-600">₹{item.price.toLocaleString()}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                );
            case 'wishlist':
                return (
                    <div>
                        <h1 className="font-serif text-3xl text-slate-900 mb-8 flex items-center gap-3">
                            <Heart className="w-8 h-8 text-amber-700" />
                            My Wishlist
                        </h1>
                        <div className="bg-white p-12 rounded-lg shadow-sm border border-slate-100 text-center">
                            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-slate-900 mb-2">Your wishlist is empty</h3>
                            <p className="text-slate-500 mb-6">Save items you love for later.</p>
                            <button onClick={() => navigate('/collections')} className="text-amber-700 font-medium hover:underline">
                                Browse Collections
                            </button>
                        </div>
                    </div>
                );
            case 'addresses':
                return (
                    <div>
                        <h1 className="font-serif text-3xl text-slate-900 mb-8 flex items-center gap-3">
                            <MapPin className="w-8 h-8 text-amber-700" />
                            Saved Addresses
                        </h1>
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100">
                            <p className="text-slate-500 italic">No addresses saved yet. Addresses used at checkout will appear here.</p>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div>
                        <h1 className="font-serif text-3xl text-slate-900 mb-8 flex items-center gap-3">
                            <Settings className="w-8 h-8 text-amber-700" />
                            Edit Profile
                        </h1>
                        <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 max-w-lg">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input type="text" defaultValue={user.name} className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                                    <input type="email" defaultValue={user.email} disabled className="w-full px-4 py-2 border border-slate-200 rounded-md bg-slate-50 text-slate-500" />
                                </div>
                                <button className="bg-slate-900 text-white px-6 py-2 rounded text-sm font-medium hover:bg-slate-800 transition-colors">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-[#faf9f6]">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
                            <div className="p-6 text-center border-b border-slate-100 bg-slate-50/50">
                                <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-xl font-serif font-bold">{user.name.charAt(0).toUpperCase()}</span>
                                </div>
                                <h2 className="font-serif text-lg text-slate-900 truncate">{user.name}</h2>
                            </div>
                            <nav className="p-2">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
                                                    ? 'bg-amber-50 text-amber-700'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            {tab.label}
                                        </button>
                                    );
                                })}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors mt-2"
                                >
                                    <UserIcon className="w-4 h-4" />
                                    Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
