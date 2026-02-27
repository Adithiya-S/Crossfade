import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

const FloatingContact = () => {
    return (
        <>
            {/* Call Button - Bottom Left */}
            <motion.a
                href="tel:+918825836031"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 left-6 z-40 bg-white text-green-deep p-4 rounded-full shadow-lg border-2 border-green-deep hover:bg-green-deep hover:text-white transition-all duration-300 group"
                aria-label="Call Us"
            >
                <Phone size={24} className="group-hover:rotate-12 transition-transform" />
            </motion.a>

            {/* WhatsApp Button - Bottom Right */}
            <motion.a
                href="https://wa.me/918825836031"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 hover:scale-110 group"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={28} className="fill-current" />
            </motion.a>
        </>
    );
};

export default FloatingContact;
