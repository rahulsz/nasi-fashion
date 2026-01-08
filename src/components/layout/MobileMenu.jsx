import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose }) => {
    const location = useLocation();

    const menuItems = [
        { name: 'Home', path: '/' },
        { name: 'New Arrivals', path: '/new-arrivals' },
        { name: 'Collections', path: '/collections' },
        { name: 'Accessories', path: '/accessories' },
        { name: 'Editorial', path: '/editorial' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Menu Drawer */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 z-[70] w-full max-w-xs bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-100">
                            <span className="font-serif text-2xl font-bold tracking-tight text-slate-800">
                                NASI <span className="text-amber-700">.</span>
                            </span>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                                aria-label="Close menu"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 overflow-y-auto py-6">
                            <ul className="space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = location.pathname === item.path;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                to={item.path}
                                                onClick={onClose}
                                                className={`flex items-center justify-between px-6 py-4 text-base font-medium transition-colors ${isActive
                                                        ? 'text-amber-700 bg-amber-50'
                                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <span>{item.name}</span>
                                                {isActive && <ChevronRight className="w-4 h-4" />}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        {/* Footer / Extra Links */}
                        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                            <div className="space-y-4">
                                <Link
                                    to="/account"
                                    onClick={onClose}
                                    className="block text-sm font-medium text-slate-600 hover:text-amber-700 transition-colors"
                                >
                                    My Account
                                </Link>
                                <Link
                                    to="/wishlist"
                                    onClick={onClose}
                                    className="block text-sm font-medium text-slate-600 hover:text-amber-700 transition-colors"
                                >
                                    Wishlist
                                </Link>
                            </div>
                            <p className="mt-6 text-xs text-slate-400">
                                © 2024 Nasi Fashion House
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
