import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import useProductStore from '../store/useProductStore';

const Collections = () => {
    const { products, loading, error, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Group products by category
    const collections = useMemo(() => {
        const groups = {};
        products.forEach(product => {
            if (!groups[product.category]) {
                groups[product.category] = [];
            }
            groups[product.category].push(product);
        });
        return Object.entries(groups);
    }, [products]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 px-4 flex justify-center">
                <p>Loading collections...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-32 pb-20 px-4 flex justify-center text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            <div className="text-center mb-16 px-4 pt-10">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800 mb-4">Collections</h1>
                <p className="text-slate-600">Explore our curated pieces by category.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 space-y-20">
                {collections.length === 0 ? (
                    <div className="text-center text-slate-500 py-10">
                        <p>No collections found.</p>
                    </div>
                ) : (
                    collections.map(([category, categoryProducts]) => (
                        <div key={category} className="space-y-8">
                            <div className="flex items-center space-x-4">
                                <h2 className="font-serif text-3xl text-slate-800">{category}</h2>
                                <div className="h-px bg-slate-200 flex-grow" />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                                {categoryProducts.map((product) => (
                                    <ProductCard key={product._id} product={{ ...product, id: product._id }} />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Collections;
