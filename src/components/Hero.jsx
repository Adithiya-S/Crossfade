import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Aura Blobs */}
            <div className="absolute inset-0 z-0 opacity-40">
                <motion.div
                    animate={{ x: [0, 100, -50, 0], y: [0, -50, 100, 0], scale: [1, 1.2, 0.9, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-soft blur-[100px] rounded-full mix-blend-multiply"
                />
                <motion.div
                    animate={{ x: [0, -70, 50, 0], y: [0, 80, -40, 0], scale: [1, 1.1, 0.95, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-green-light blur-[120px] rounded-full mix-blend-multiply"
                />
                <motion.div
                    animate={{ x: [0, 50, -30, 0], y: [0, 40, 80, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-pale blur-[80px] rounded-full mix-blend-multiply"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-green-deep leading-[1.1] mb-6">
                        <span className="block font-disco tracking-wide text-pink-hot italic">Create, Explore</span>
                        <span className="block font-light">Crossfade</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-lg md:text-xl font-sans text-green-mid max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    <p className="mb-2">Where art process and experience intersect.</p>
                    <p>A contemporary creative space for workshops, events and meaningful making.</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="#workshops"
                        className="px-8 py-4 bg-green-deep text-background rounded-full font-serif text-lg hover:bg-pink-hot hover:shadow-[0_0_30px_-5px_var(--tw-shadow-color)] shadow-pink-hot/40 transition-all duration-300"
                    >
                        Join a Workshop
                    </a>
                    <a
                        href="#custom-orders"
                        className="px-8 py-4 border border-green-deep text-green-deep rounded-full font-serif text-lg hover:bg-green-deep hover:text-background transition-all duration-300"
                    >
                        Custom Orders
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
