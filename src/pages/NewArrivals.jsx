import React from 'react';
import ProductCard from '../components/common/ProductCard';

const products = [
    {
        id: 1,
        name: 'The Linen Blazer',
        price: 12999,
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
        tag: 'New'
    },
    {
        id: 2,
        name: 'Silk Charmeuse Dress',
        price: 18500,
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
        tag: 'Trending'
    },
    {
        id: 3,
        name: 'Pleated Wide Leg Trousers',
        price: 8900,
        category: 'Bottoms',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 4,
        name: 'Structured Wool Coat',
        price: 24900,
        category: 'Outerwear',
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop',
        tag: 'Bestseller'
    },
    {
        id: 5,
        name: 'Cashmere Turtleneck',
        price: 14500,
        category: 'Knitwear',
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 6,
        name: 'Signature Leather Tote',
        price: 32000,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 7,
        name: 'Oversized Cotton Shirt',
        price: 6500,
        category: 'Tops',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop',
    },
    {
        id: 8,
        name: 'Evening Velvet Slip',
        price: 16000,
        category: 'Dresses',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    }
];

const NewArrivals = () => {
    return (
        <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h1 className="font-serif text-4xl md:text-5xl text-slate-800">New Arrivals</h1>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    Discover our latest pieces, curated for the modern wardrobe.
                    Timeless elegance meets contemporary design.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
