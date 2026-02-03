import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Users } from 'lucide-react';
import customImg from '../assets/Pottery/AP-12.jpg';
import workshopImg from '../assets/Pottery/AP-13.jpg';

const Offerings = () => {
    return (
        <section id="offerings" className="py-24 bg-green-deep/5 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        className="text-5xl md:text-6xl font-serif text-green-deep mb-4"
                    >
                        What We Do
                    </motion.h2>
                    <p className="text-green-mid text-lg max-w-2xl mx-auto">Two ways to experience Crossfade.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Custom Orders */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        id="custom-orders"
                        className="group bg-background p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 border border-green-light/20 hover:border-pink-hot/50 relative overflow-hidden"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src={customImg} alt="Pottery Background" loading="lazy" className="w-full h-full object-cover" />
                        </div>

                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity z-10">
                            <Palette size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-4xl font-serif text-green-deep mb-6">Custom Orders</h3>
                            <ul className="mb-8 space-y-4 text-green-mid text-lg">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    Handmade pottery & art products
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    Personalized gifting & events
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    Made just for you. No shortcuts.
                                </li>
                            </ul>
                            <a href="/custom-orders" className="inline-block bg-green-light/30 text-green-deep px-8 py-3 rounded-full font-serif hover:bg-green-deep hover:text-white transition-colors">
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    {/* Workshops */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        id="workshops"
                        className="group bg-green-deep text-background p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity mix-blend-overlay">
                            <img src={workshopImg} alt="Workshop Background" loading="lazy" className="w-full h-full object-cover grayscale" />
                        </div>

                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity text-white z-10">
                            <Users size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-4xl font-serif text-white mb-6">Workshops</h3>
                            <ul className="mb-8 space-y-4 text-green-light text-lg">
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    Private group classes (Birthdays/Teams)
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    On-location events at your venue
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                                    "If you have hands, you're qualified."
                                </li>
                            </ul>
                            <a href="/workshops" className="inline-block bg-pink-hot/90 text-white px-8 py-3 rounded-full font-serif hover:bg-white hover:text-pink-hot transition-colors">
                                View Details
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Offerings;
