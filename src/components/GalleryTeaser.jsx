import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/Products/AP-166.jpg';
import img2 from '../assets/Products/AP-180.jpg';
import img3 from '../assets/Workshops/IMG_6871.PNG';
import img4 from '../assets/Products/AP-192.jpg';

// Assuming we can re-use some assets or use a placeholder if needed, 
// but styling it as a text-heavy or mix section.
const GalleryTeaser = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 px-6 bg-green-deep text-background overflow-hidden relative">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-hot/10 rounded-full blur-[100px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-light/10 rounded-full blur-[80px] pointer-events-none transform -translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="font-disco text-pink-pale text-xl tracking-widest block mb-4"
                    >
                        Our Portfolio
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif mb-8 leading-tight"
                    >
                        Come see what<br /> we've done.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-green-light/80 text-xl font-sans max-w-md mb-10"
                    >
                        A curated collection of our best messes and masterpieces. From the kiln straight to your screen.
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        onClick={() => navigate('/gallery')}
                        className="group flex items-center gap-4 text-pink-pale text-2xl font-serif hover:text-white transition-colors"
                    >
                        Explore the Gallery
                        <span className="bg-pink-pale p-3 rounded-full text-green-deep group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                            <ArrowRight size={24} />
                        </span>
                    </motion.button>
                </div>

                {/* Visual side - abstract representation of gallery items */}
                <div className="md:w-1/2 grid grid-cols-2 gap-4 opacity-80 mix-blend-overlay">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="aspect-square rounded-[2rem] overflow-hidden"
                    >
                        <img src={img1} alt="Pottery Masterpiece" loading="lazy" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="aspect-video rounded-[2rem] mt-12 overflow-hidden"
                    >
                        <img src={img3} alt="Workshop Vibes" loading="lazy" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="aspect-[3/4] rounded-[2rem] -mt-12 overflow-hidden"
                    >
                        <img src={img2} alt="Product Shot" loading="lazy" className="w-full h-full object-cover" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="aspect-square rounded-[2rem] overflow-hidden"
                    >
                        <img src={img4} alt="Detailed Pottery" loading="lazy" className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GalleryTeaser;
