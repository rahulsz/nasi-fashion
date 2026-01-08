import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="space-y-4">
                    <h4 className="font-serif text-xl font-bold text-slate-900">NASI FASHION</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Defining modern elegance with sustainable materials and timeless design.
                    </p>
                    <div className="flex space-x-4 text-slate-400">
                        <Instagram className="w-5 h-5 hover:text-amber-700 cursor-pointer" />
                        <Facebook className="w-5 h-5 hover:text-amber-700 cursor-pointer" />
                        <Twitter className="w-5 h-5 hover:text-amber-700 cursor-pointer" />
                    </div>
                </div>

                <div>
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-6">Shopping</h5>
                    <ul className="space-y-4 text-sm text-slate-500">
                        {['New Arrivals', 'Best Sellers', 'Trending', 'Accessories'].map(item => (
                            <li key={item}><a href="#" className="hover:text-amber-700 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-6">Customer Care</h5>
                    <ul className="space-y-4 text-sm text-slate-500">
                        {['Contact Us', 'Shipping & Returns', 'Size Guide', 'FAQ'].map(item => (
                            <li key={item}><a href="#" className="hover:text-amber-700 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h5 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-6">Experience</h5>
                    <ul className="space-y-4 text-sm text-slate-500">
                        {['Our Story', 'Sustainability', 'Careers', 'Press'].map(item => (
                            <li key={item}><a href="#" className="hover:text-amber-700 transition-colors">{item}</a></li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
                <p>© 2026 Nasi Fashion House. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-amber-700">Privacy Policy</a>
                    <a href="#" className="hover:text-amber-700">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
