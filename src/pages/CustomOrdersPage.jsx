import React from 'react';
import { motion } from 'framer-motion';
import customImg from '../assets/pottery/AP-12.jpg';

const CustomOrdersPage = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full text-center"
            >
                <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Made For You</span>
                <h1 className="text-5xl md:text-7xl font-serif text-green-deep mb-8 relative inline-block">
                    Custom Orders
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-hot/30 rounded-full"></span>
                </h1>

                <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-4 border-white">
                    <img
                        src={customImg}
                        alt="Custom order vibe"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-deep/10"></div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-lg border border-green-light/20 text-left mx-auto max-w-2xl">
                    <h3 className="text-3xl font-serif text-green-deep mb-6">Commission a Piece</h3>
                    <p className="font-sans text-green-mid text-lg mb-8 leading-relaxed">
                        Looking for a specific set of dinnerware, a unique vase, or personalized gifts for an event? We take a limited number of commissions each month.
                    </p>
                    <div className="space-y-6 mb-8 text-green-deep font-medium">
                        <p>What we need from you:</p>
                        <ul className="space-y-2 list-disc list-inside opacity-80 pl-2">
                            <li>Reference images or style preference</li>
                            <li>Quantity and timeline</li>
                            <li>Budget range</li>
                        </ul>
                    </div>
                    <div className="text-center">
                        <a
                            href="https://wa.me/918825836031"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-deep text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-pink-hot transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Start a Commission
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomOrdersPage;
