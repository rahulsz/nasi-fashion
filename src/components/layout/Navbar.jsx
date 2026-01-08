import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';

import useCartStore from '../../store/useCartStore';

const Navbar = ({ onOpenSearch, onToggleMobileMenu }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { getCartCount, toggleCart } = useCartStore();
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
