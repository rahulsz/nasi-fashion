import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';

import useCartStore from '../../store/useCartStore';
import useAuthStore from '../../store/useAuthStore';

const Navbar = ({ onOpenSearch, onToggleMobileMenu }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { getCartCount, toggleCart } = useCartStore();
    const { isAuthenticated, user, logout } = useAuthStore();
    const cartCount = getCartCount();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                isScrolled ? "bg-white/95 backdrop-blur-sm border-slate-200 py-3 shadow-sm" : "bg-transparent border-transparent py-5"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Mobile Menu Trigger */}
                <button onClick={onToggleMobileMenu} className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors">
                    <Menu className="w-6 h-6 text-slate-800" />
                </button>

                {/* Logo */}
                <div className="flex-1 md:flex-none text-center md:text-left">
                    <Link to="/" className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-slate-800">
                        NASI <span className="text-amber-700">.</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {[
                        { name: 'New Arrivals', path: '/new-arrivals' },
                        { name: 'Collections', path: '/collections' },
                        { name: 'Accessories', path: '/accessories' },
                        { name: 'Editorial', path: '/editorial' }
                    ].map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-sm font-medium text-slate-600 hover:text-amber-700 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-2 md:space-x-4">
                    <button onClick={onOpenSearch} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
                        <Search className="w-5 h-5 text-slate-600 group-hover:text-amber-700" />
                    </button>

                    {/* Auth Dropdown */}
                    <div className="relative group">
                        <Link
                            to={isAuthenticated ? "/profile" : "/login"}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors inline-flex items-center justify-center"
                        >
                            <User className="w-5 h-5 text-slate-600 group-hover:text-amber-700" />
                        </Link>

                        {/* Hover Dropdown for Desktop */}
                        {isAuthenticated && (
                            <div className="absolute right-0 top-full pt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                                <div className="bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden">

                                    {/* Header */}
                                    <Link
                                        to="/profile"
                                        state={{ activeTab: 'profile' }}
                                        className="block px-4 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors group/header"
                                    >
                                        <p className="font-serif text-sm font-bold text-slate-900 group-hover/header:text-amber-700 transition-colors">Hello {user?.name || 'User'}</p>
                                        <p className="text-xs text-slate-500 mt-0.5 truncate">{user?.email}</p>
                                    </Link>

                                    {/* Section 1 */}
                                    <div className="py-2">
                                        <Link
                                            to="/profile"
                                            state={{ activeTab: 'orders' }}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:font-medium"
                                        >
                                            Orders
                                        </Link>
                                        <Link
                                            to="/profile"
                                            state={{ activeTab: 'wishlist' }}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:font-medium"
                                        >
                                            Wishlist
                                        </Link>
                                        <Link
                                            to="/profile"
                                            state={{ activeTab: 'addresses' }}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:font-medium"
                                        >
                                            Saved Addresses
                                        </Link>
                                    </div>

                                    <div className="h-px bg-slate-100 my-0"></div>

                                    {/* Footer */}
                                    <div className="py-2">
                                        <Link
                                            to="/profile"
                                            state={{ activeTab: 'profile' }}
                                            className="block px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:font-medium"
                                        >
                                            Edit Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout();
                                                window.location.href = '/';
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-slate-600 hover:text-slate-900 hover:font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button onClick={toggleCart} className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
                            <ShoppingBag className="w-5 h-5 text-slate-600 group-hover:text-amber-700" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-0 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
