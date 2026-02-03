import React from 'react';
import { motion } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

const WorkshopPage = () => {
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
                    Get Dirty
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="text-5xl md:text-7xl font-serif text-green-deep mb-8 relative inline-block"
                >
                    Workshops
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-hot/30 rounded-full"></span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12"
                >
                    <img
                        src={getCloudinaryUrl('Pottery/AP-13.jpg')}
                        alt="Workshop Atmosphere"
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-green-deep/10"></div>
                </motion.div>

                <div className="bg-white p-10 rounded-3xl shadow-lg border border-green-light/20 text-left mx-auto max-w-2xl">
                    <h3 className="text-3xl font-serif text-green-deep mb-6">Upcoming Sessions</h3>
                    <p className="font-sans text-green-mid text-lg mb-8 leading-relaxed">
                        We host pop-up workshops at various cafes and studios. We also do private events for birthdays, team building, or just a chill Sunday.
                    </p>
                    <ul className="space-y-4 mb-8 text-green-deep font-medium">
                        {[
                            "Hand-building basics (Pinch & Coil)",
                            "Wheel throwing intro",
                            "Painting & Glazing"
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                                className="flex items-center gap-3"
                            >
                                <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
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
                            className="inline-block bg-pink-hot text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-green-deep transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1"
                        >
                            Enquire for Dates
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default WorkshopPage;
