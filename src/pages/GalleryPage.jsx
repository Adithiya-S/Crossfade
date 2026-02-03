import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const GalleryPage = () => {
    // Dynamically import images from assets folders using Vite's glob import
    // Excluding HEIC files as they aren't supported in browsers by default
    const potteryImages = import.meta.glob('../assets/pottery/*.{png,jpg,jpeg,webp}', { eager: true });
    const productImages = import.meta.glob('../assets/products/*.{png,jpg,jpeg,webp}', { eager: true });
    const workshopImages = import.meta.glob('../assets/workshops/*.{png,jpg,jpeg,webp}', { eager: true });

    // Helper to extract values
    const getImages = (glob) => Object.values(glob).map((mod) => mod.default);

    const allImages = useMemo(() => [
        ...getImages(potteryImages),
        ...getImages(productImages),
        ...getImages(workshopImages)
    ], []);

    // Shuffle images slightly or just use them as is. 
    // For a moodboard feel, we might want to mix them, but strictly ordering by folder is fine too.

    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Visual Diary</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-green-deep">
                        The <span className="text-pink-soft">Gallery</span>
                    </h1>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {allImages.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.1 }}
                            transition={{ delay: (i % 3) * 0.1 }}
                            className="rounded-2xl overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02] relative group bg-green-light/20"
                        >
                            <img
                                src={src}
                                alt={`Gallery Item ${i}`}
                                loading="lazy"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-green-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                {allImages.length === 0 && (
                    <div className="text-center text-green-mid py-20 font-serif text-xl">
                        No images found. Please check asset folders (Pottery, Products, Workshops) and ensure they are jpg/png.
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryPage;
