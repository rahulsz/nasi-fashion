import React, { useEffect } from 'react';
import ProductCard from '../components/common/ProductCard';
import useProductStore from '../store/useProductStore';

const NewArrivals = () => {
    const { products, loading, error, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

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
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800">New Arrivals</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Discover our latest pieces, curated for the modern wardrobe.
                    Timeless elegance meets contemporary design.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="text-center text-slate-500 py-10">
                    <p>No products found yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={{ ...product, id: product._id }} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewArrivals;
