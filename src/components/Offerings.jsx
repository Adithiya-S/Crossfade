import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Users } from 'lucide-react';

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
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Palette size={120} />
                        </div>
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
                        <a href="#contact" className="inline-block bg-green-light/30 text-green-deep px-8 py-3 rounded-full font-serif hover:bg-green-deep hover:text-white transition-colors">
                            Get a Quote
                        </a>
                    </motion.div>

                    {/* Workshops */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        id="workshops"
                        className="group bg-green-deep text-background p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity text-white">
                            <Users size={120} />
                        </div>
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
                        <a href="#contact" className="inline-block bg-pink-hot/90 text-white px-8 py-3 rounded-full font-serif hover:bg-white hover:text-pink-hot transition-colors">
                            Book a Session
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Offerings;
