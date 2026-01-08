import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '../utils';
import Hero from '../components/home/Hero';
import ProductCard from '../components/common/ProductCard';
import TrustBar from '../components/home/TrustBar';

// Imported Images
import sareeImg from '../assets/images/saree.png';
import kurtaImg from '../assets/images/kurta.png';
import trousersImg from '../assets/images/trousers.png';
import gownImg from '../assets/images/gown.png';
import blockprintImg from '../assets/images/blockprint.png';
import kaftanImg from '../assets/images/kaftan.png';

// --- Mock Data ---
const PRODUCTS = [
    {
        id: 1,
        name: 'Silk Chiffon Saree',
        category: 'Sarees',
        price: 12500,
        image: sareeImg,
        tag: 'Best Seller'
    },
    {
        id: 2,
        name: 'Hand-Embroidered Kurta',
        category: 'Kurtas',
        price: 4800,
        image: kurtaImg,
        tag: 'New'
    },
    {
        id: 3,
        name: 'Linen Wide-Leg Trousers',
        category: 'Bottoms',
        price: 3200,
        image: trousersImg,
    },
    {
        id: 4,
        name: 'Velvet Evening Gown',
        category: 'Gowns',
        price: 18000,
        image: gownImg,
        tag: 'Limited'
    },
    {
        id: 5,
        name: 'Cotton Block Print Saree',
        category: 'Sarees',
        price: 6500,
        image: blockprintImg,
    },
    {
        id: 6,
        name: 'Embellished Kaftan',
        category: 'Kurtas',
        price: 5500,
        image: kaftanImg,
    },
];

const CATEGORIES = ['All', 'Sarees', 'Kurtas', 'Bottoms', 'Gowns'];

const Home = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeCategory);

    return (
        <main>
            <Hero />

            {/* Filter & Products Section */}
            <section className="py-20 max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-serif text-3xl md:text-4xl text-slate-800 mb-4">Curated Collection</h2>
                    <div className="w-16 h-1 bg-amber-700 mx-auto mb-8" />

                    {/* Filter Bar */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border",
                                    activeCategory === cat
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <button className="inline-flex items-center space-x-2 text-amber-700 font-bold uppercase tracking-widest hover:text-amber-900 transition-colors border-b-2 border-amber-700/20 hover:border-amber-700 pb-1">
                        <span>View All Products</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            <TrustBar />

            {/* Newsletter */}
            <section className="bg-slate-900 text-white py-20 px-4">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <h2 className="font-serif text-3xl md:text-4xl">Join the Club</h2>
                    <p className="text-slate-400">Subscribe to receive updates, access to exclusive deals, and more.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-slate-500 px-6 py-3 focus:outline-none focus:border-amber-500 transition-colors"
                        />
                        <button className="bg-amber-700 text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
