import React from 'react';
import ProductCard from '../components/common/ProductCard';

const accessories = [
    {
        id: 101,
        name: 'Gold Plated Hoop Earrings',
        price: 3500,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
        tag: 'Best Seller'
    },
    {
        id: 102,
        name: 'Silk Scarf - Midnight',
        price: 4200,
        category: 'Scarves',
        image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 103,
        name: 'Leather Crossbody Bag',
        price: 15900,
        category: 'Bags',
        image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 104,
        name: 'Minimalist Watch',
        price: 12000,
        category: 'Watches',
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 105,
        name: 'Oversized Sunglasses',
        price: 5500,
        category: 'Eyewear',
        image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 106,
        name: 'Pearl Choker Necklace',
        price: 6800,
        category: 'Jewelry',
        image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=1000&auto=format&fit=crop',
    }
];

const Accessories = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800">Accessories</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    The finishing touches. Elevate your look with our curated selection of fine jewelry, bags, and more.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {accessories.map((item) => (
                    <ProductCard key={item.id} product={item} />
                ))}
            </div>
        </div>
    );
};

export default Accessories;
