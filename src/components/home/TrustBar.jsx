import React from 'react';
import { Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

const TrustBar = () => {
    const items = [
        { icon: Truck, title: 'Express Shipping', desc: 'On all orders above ₹5000' },
        { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure transaction' },
        { icon: RefreshCcw, title: 'Easy Returns', desc: '15-day return policy' },
    ];

    return (
        <section className="py-12 border-y border-slate-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-4 justify-center md:justify-start">
                        <div className="p-3 bg-amber-50 rounded-full text-amber-700">
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{item.title}</h4>
                            <p className="text-slate-500 text-xs">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustBar;
