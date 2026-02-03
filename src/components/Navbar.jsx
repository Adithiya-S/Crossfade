import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (href) => {
        setIsOpen(false);
        if (href.startsWith('#')) {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const el = document.querySelector(href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            } else {
                const el = document.querySelector(href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            navigate(href);
        }
    };

    const links = [
        { name: 'Home', href: '/#home' },
        { name: 'About', href: '/#about' },
        { name: 'Workshops', href: '/workshops' },
        { name: 'Custom Orders', href: '/custom-orders' },
        { name: 'Gallery', href: '/gallery' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-green-light/20">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src={logo} alt="Crossfade" className="w-32 md:w-52 transition-all duration-300" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => handleNavigation(link.href.replace('/', ''))}
                            className="font-sans text-green-deep hover:text-pink-hot transition-colors duration-300 font-medium tracking-wide bg-transparent border-none cursor-pointer"
                        >
                            {link.name}
                        </button>
                    ))}
                    <button
                        onClick={() => handleNavigation('#contact')}
                        className="bg-green-deep text-background px-6 py-2 rounded-full font-serif hover:bg-pink-hot hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
                    >
                        Enquire Now
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-green-deep"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-green-light/20 overflow-hidden"
                    >
                        <div className="flex flex-col items-center gap-6 py-8">
                            {links.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNavigation(link.href.replace('/', ''))}
                                    className="font-serif text-2xl text-green-deep hover:text-pink-hot transition-colors bg-transparent border-none"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavigation('#contact')}
                                className="bg-green-deep text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-pink-hot transition-colors mt-4"
                            >
                                Enquire Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
