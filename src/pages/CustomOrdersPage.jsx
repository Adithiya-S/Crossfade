import React from 'react';
import { motion } from 'framer-motion';
import customImg from '../assets/Pottery/AP-12.jpg';

const CustomOrdersPage = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full text-center"
            >
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-disco text-pink-hot tracking-widest text-xl mb-4 block"
                >
                    Made For You
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-5xl md:text-7xl font-serif text-green-deep mb-8 relative inline-block"
                >
                    Custom Orders
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-hot/30 rounded-full"></span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative w-full mb-12" // Adjusted outer div to accommodate new inner div
                >
                    <motion.div
                        variants={itemVariants}
                        className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white" // Added border-4 border-white from original
                    >
                        <img
                            src={customImg}
                            alt="Custom Order Process"
                            loading="lazy" // Added loading="lazy" from original
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-green-deep/10"></div>
                    </motion.div>
                </motion.div>

                <div className="bg-white p-10 rounded-3xl shadow-lg border border-green-light/20 text-left mx-auto max-w-2xl">
                    <h3 className="text-3xl font-serif text-green-deep mb-6">Commission a Piece</h3>
                    <p className="font-sans text-green-mid text-lg mb-8 leading-relaxed">
                        Looking for a specific set of dinnerware, a unique vase, or personalized gifts for an event? We take a limited number of commissions each month.
                    </p>
                    <div className="space-y-6 mb-8 text-green-deep font-medium">
                        <p>What we need from you:</p>
                        <ul className="space-y-2 list-disc list-inside opacity-80 pl-2">
                            {[
                                "Reference images or style preference",
                                "Quantity and timeline",
                                "Budget range"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1) }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                        className="text-center"
                    >
                        <a
                            href="https://wa.me/918825836031"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-green-deep text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-pink-hot transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Start a Commission
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default CustomOrdersPage;
