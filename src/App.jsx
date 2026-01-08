import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Search } from 'lucide-react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import MobileMenu from './components/layout/MobileMenu';
import Home from './pages/Home';
import NewArrivals from './pages/NewArrivals';
import Collections from './pages/Collections';
import Accessories from './pages/Accessories';
import Editorial from './pages/Editorial';
import CartDrawer from './components/cart/CartDrawer';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = 3; // Mock cart count

  return (
    <Router>
      <div className="min-h-screen bg-[#faf9f6] text-[#1e293b] font-sans selection:bg-amber-100 selection:text-amber-900 flex flex-col">

        {/* Search Overlay */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-8 h-8 text-slate-400 hover:text-slate-800" />
              </button>
              <div className="w-full max-w-2xl">
                <div className="relative border-b-2 border-slate-200 focus-within:border-amber-700 transition-colors">
                  <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full bg-transparent py-4 pl-12 text-3xl font-serif placeholder:text-slate-300 focus:outline-none"
                    autoFocus
                  />
                </div>
                <p className="mt-4 text-slate-500 text-sm">Popular: Sarees, Summer Collection, Velvet</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <CartDrawer />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/editorial" element={<Editorial />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
