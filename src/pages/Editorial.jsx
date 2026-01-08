import React from 'react';
import { motion } from 'framer-motion';

const articles = [
    {
        id: 1,
        title: 'The Art of Sustainable Draping',
        category: 'Craftsmanship',
        date: 'Oct 12, 2024',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'Exploring the intricate techniques behind our latest eco-conscious collection, where waste reduction meets sculptural beauty.'
    },
    {
        id: 2,
        title: 'Behind the Seams: The Atelier',
        category: 'Inside Nasi',
        date: 'Sep 28, 2024',
        image: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'A day in the life of our master tailors, preserving heritage methods in a modern fashion house.'
    },
    {
        id: 3,
        title: 'Texture & Tone: A Visual Diary',
        category: 'Inspiration',
        date: 'Sep 15, 2024',
        image: 'https://images.unsplash.com/photo-1502989642968-94fbdc9eace4?q=80&w=2000&auto=format&fit=crop',
        excerpt: 'The moodboard behind the "Urban Heritage" collection, influenced by brutalist architecture and organic fibers.'
    }
];

const Editorial = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-20">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-6">Editorial</h1>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Stories, conversations, and visual essays from the world of Nasi.
                </p>
            </div>

            {/* Featured Article */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-24"
            >
                <div className="group cursor-pointer relative aspect-[21/9] overflow-hidden bg-slate-100 mb-6">
                    <img
                        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2000&auto=format&fit=crop"
                        alt="Featured Article"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
                        <span className="text-sm font-bold tracking-widest uppercase mb-3 block text-amber-400">Featured Story</span>
                        <h2 className="font-serif text-3xl md:text-5xl mb-4 leading-tight">The Future of Fabric: Implementing Circular Design</h2>
                        <button className="text-sm font-bold uppercase tracking-widest border-b border-white pb-1 hover:text-amber-400 hover:border-amber-400 transition-colors">Read Full Story</button>
                    </div>
                </div>
            </motion.div>

            {/* Recent Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {articles.map((article, index) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group cursor-pointer flex flex-col h-full"
                    >
                        <div className="aspect-[4/3] overflow-hidden bg-slate-100 mb-6">
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">
                                <span className="text-amber-700">{article.category}</span>
                                <span>•</span>
                                <span>{article.date}</span>
                            </div>
                            <h3 className="font-serif text-2xl text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                                {article.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-4 flex-1">
                                {article.excerpt}
                            </p>
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 group-hover:text-amber-700 transition-colors">Read More</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Editorial;
