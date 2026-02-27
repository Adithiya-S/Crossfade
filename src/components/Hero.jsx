import React from 'react';
import { motion } from 'framer-motion';

// Importing a few images for the collage
import img1 from '../assets/Workshops/IMG_6872.webp';
import img2 from '../assets/Workshops/IMG_5876.webp';
import img3 from '../assets/Workshops/IMG_4553.webp';
import img4 from '../assets/Workshops/IMG_5830.webp';

const Hero = () => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 px-6">
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
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center h-full">
                {/* Left Side: Content */}
                <div className="text-center lg:text-left pt-10 lg:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-green-deep leading-[1.1] mb-6 relative">
                            <span className="block font-disco tracking-wide text-pink-hot italic relative z-10">Create, Explore</span>
                            <span className="block font-light">Crossfade</span>
                            {/* Decorative element behind text */}
                            <div className="hidden lg:block absolute -left-10 top-1/2 w-32 h-32 bg-yellow-soft/40 rounded-full blur-2xl -z-10 animate-pulse"></div>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-lg md:text-xl font-sans text-green-mid max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                    >
                        <p className="mb-2">Where art process and experience intersect.</p>
                        <p>A contemporary creative space for workshops, events and meaningful making.</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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

                {/* Right Side: Masonry Image Collage */}
                <div className="hidden md:flex lg:h-[80%] items-center justify-center relative scale-90 lg:scale-100 origin-center">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-[600px] h-full relative">
                        {/* Top Left Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: -10 }}
                            animate={{ opacity: 1, y: 0, rotate: -4 }}
                            transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
                            className="relative self-end z-20 aspect-[4/5] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-2xl hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 cursor-pointer"
                        >
                            <img src={img1} alt="Pottery workshop making" loading="lazy" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Top Right Image */}
                        <motion.div
                            initial={{ opacity: 0, x: 50, rotate: 15 }}
                            animate={{ opacity: 1, x: 0, rotate: 6 }}
                            transition={{ delay: 1, duration: 0.7, type: "spring" }}
                            className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-white shadow-xl hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 cursor-pointer translate-y-12"
                        >
                            <img src={img2} alt="Clay hands" loading="lazy" className="w-full h-full object-cover scale-110" />
                        </motion.div>

                        {/* Bottom Left Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -50, rotate: -15 }}
                            animate={{ opacity: 1, x: 0, rotate: -8 }}
                            transition={{ delay: 1.2, duration: 0.7, type: "spring" }}
                            className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-white shadow-xl hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 cursor-pointer -translate-y-8"
                        >
                            <img src={img3} alt="Workshop group" loading="lazy" className="w-full h-full object-cover" />
                        </motion.div>

                        {/* Bottom Right Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, rotate: 10 }}
                            animate={{ opacity: 1, y: 0, rotate: 3 }}
                            transition={{ delay: 1.4, duration: 0.7, type: "spring" }}
                            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border-[6px] border-white shadow-2xl hover:rotate-0 hover:scale-105 hover:z-30 transition-all duration-500 cursor-pointer -translate-y-16"
                        >
                            <img src={img4} alt="Painted pottery" loading="lazy" className="w-full h-full object-cover scale-110" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
