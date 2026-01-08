import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

import useCartStore from '../../store/useCartStore';

const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
        >
            <div className="relative overflow-hidden aspect-[3/4] bg-slate-100 mb-4">
                {product.tag && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 uppercase tracking-wider text-slate-800 z-20">
                        {product.tag}
                    </span>
                )}
                <button className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300">
                    <Heart className="w-4 h-4" />
                </button>

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            addItem(product);
                        }}
                        className="w-full bg-white text-slate-900 py-3 uppercase text-xs font-bold tracking-widest hover:bg-amber-700 hover:text-white transition-colors">
                        Quick Add
                    </button>
                </div>
            </div>

            <div className="space-y-1">
                <h3 className="font-serif text-lg text-slate-800 group-hover:text-amber-700 transition-colors">
                    {product.name}
                </h3>
                <p className="text-slate-500 text-sm">{product.category}</p>
                <p className="font-medium text-slate-900">₹{product.price.toLocaleString()}</p>
            </div>
        </motion.div>
    );
};

export default ProductCard;
