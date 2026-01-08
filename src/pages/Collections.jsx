import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const collections = [
    {
        id: 1,
        title: 'The Monochrome Edit',
        season: 'Fall/Winter 2024',
        description: 'A study in black, white, and everything in between. Textures that speak louder than colors.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
        align: 'left'
    },
    {
        id: 2,
        title: 'Summer Solstice',
        season: 'Resort 2025',
        description: 'Breathing fabrics, linen blends, and sun-faded hues designed for the golden hour.',
        image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2000&auto=format&fit=crop',
        align: 'right'
    },
    {
        id: 3,
        title: 'Urban Heritage',
        season: 'Core Collection',
        description: 'Reimagining traditional silhouettes for the contemporary city dweller.',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop',
        align: 'left'
    }
];

const Collections = () => {
    return (
        <div className="pt-24 pb-20">
            <div className="text-center mb-16 px-4 pt-10">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-4">Collections</h1>
                <p className="text-slate-600">Explore our curated seasonal narratives.</p>
            </div>

            <div className="space-y-4">
                {collections.map((collection) => (
                    <div key={collection.id} className="relative h-[80vh] w-full overflow-hidden group">
                        <img
                            src={collection.image}
                            alt={collection.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />

                        <div className={`absolute inset-0 flex items-center ${collection.align === 'left' ? 'justify-start' : 'justify-end'} p-8 md:p-20`}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="bg-white/90 backdrop-blur-md p-8 md:p-12 max-w-xl shadow-lg"
                            >
                                <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3 block">
                                    {collection.season}
                                </span>
                                <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">
                                    {collection.title}
                                </h2>
                                <p className="text-slate-700 mb-8 leading-relaxed">
                                    {collection.description}
                                </p>
                                <button className="flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-900 hover:text-amber-700 transition-colors group/btn">
                                    Explore Collection
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collections;
