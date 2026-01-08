import React from 'react';
import { motion } from 'framer-motion';
import heroImage from '../../assets/images/hero.png';

import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="relative h-[80vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <img
                    src={heroImage}
                    alt="Campaign"
                    className="w-full h-full object-cover object-top opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="uppercase tracking-[0.2em] text-white text-xs md:text-sm font-medium mb-4 block"
                >
                    Spring / Summer 2026
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-8"
                >
                    Elegance is an <br /><span className="italic font-light">Attitude</span>
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <button
                        onClick={() => navigate('/collections')}
                        className="bg-white text-slate-900 px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-amber-700 hover:text-white transition-all duration-300">
                        Explore Collection
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
