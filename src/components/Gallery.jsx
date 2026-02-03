import React from 'react';
import { motion } from 'framer-motion';
import img1 from '../assets/uploaded_media_0_1770125106261.png';
import img2 from '../assets/uploaded_media_1_1770125106261.png';
import img3 from '../assets/uploaded_media_2_1770125106261.png';
import img4 from '../assets/uploaded_media_3_1770125106261.png';
import img5 from '../assets/uploaded_media_4_1770125106261.png';

const Gallery = () => {
    const images = [
        { src: img3, height: 'h-[500px]', caption: 'Moodboard Vibes' }, // moodboard
        { src: img2, height: 'h-[350px]', caption: 'Typography' },
        { src: img1, height: 'h-[400px]', caption: 'Colors & Palette' },
        { src: img4, height: 'h-[450px]', caption: 'Social Guidelines' },
        { src: img5, height: 'h-[350px]', caption: 'Core Values' },
        // Repeat for masonry fill
        { src: img3, height: 'h-[300px]', caption: 'Inspiration' },
    ];

    return (
        <section id="gallery" className="py-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-serif text-green-deep text-center mb-16">
                    The <span className="text-pink-soft">Gallery</span>
                </h2>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-2xl overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative group`}
                        >
                            <img src={img.src} alt="Gallery Item" loading="lazy" className="w-full object-cover" />
                            <div className="absolute inset-0 bg-green-deep/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="font-serif text-2xl text-background">{img.caption}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
