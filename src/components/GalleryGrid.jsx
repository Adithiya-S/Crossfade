import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';

const GalleryGrid = ({ category, title }) => {
    const navigate = useNavigate();

    // Dynamically import images based on category
    // Note: Vite's import.meta.glob must be static string literals usually.
    // We'll import all and filter, or use specific globs if we can.
    // To keep it simple and dynamic, we'll import all and map them here.

    // We use the local file system as a "manifest" to know which files exist.
    // We strictly take the filename and folder to construct the Cloudinary URL.

    // Non-eager glob just to get keys (paths) without loading modules
    const potteryGlob = import.meta.glob('../assets/Pottery/*.{png,jpg,jpeg,webp}');
    const productGlob = import.meta.glob('../assets/Products/*.{png,jpg,jpeg,webp}');
    const workshopGlob = import.meta.glob('../assets/Workshops/*.{png,jpg,jpeg,webp}');

    const getCdnUrls = (glob, folderName) => {
        return Object.keys(glob).map((path) => {
            // path is like "../assets/Pottery/image.jpg"
            const filename = path.split('/').pop(); // "image.jpg"
            return getCloudinaryUrl(`${folderName}/${filename}`);
        });
    };

    const potteryImages = useMemo(() => getCdnUrls(potteryGlob, 'Pottery'), []);
    const productImages = useMemo(() => getCdnUrls(productGlob, 'Products'), []);
    const workshopImages = useMemo(() => getCdnUrls(workshopGlob, 'Workshops'), []);

    const images = useMemo(() => {
        if (category === 'pottery') return potteryImages;
        if (category === 'products') return productImages;
        if (category === 'workshops') return workshopImages;
        return [
            ...potteryImages,
            ...productImages,
            ...workshopImages
        ];
    }, [category]);

    // State for lightbox
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    const openLightbox = (index) => setSelectedImageIndex(index);
    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = useCallback((e) => {
        e?.stopPropagation();
        setSelectedImageIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e) => {
        e?.stopPropagation();
        setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (selectedImageIndex === null) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex, nextImage, prevImage]);

    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen">
            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
                        >
                            <ChevronLeft size={40} />
                        </button>

                        <motion.img
                            key={selectedImageIndex}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={images[selectedImageIndex]}
                            alt="Full screen view"
                            className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            onClick={nextImage}
                            className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors z-50 p-2 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md"
                        >
                            <ChevronRight size={40} />
                        </button>

                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm">
                            {selectedImageIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/gallery')}
                        className="flex items-center gap-2 text-green-mid hover:text-green-deep transition-colors mb-4 font-serif"
                    >
                        <ArrowLeft size={20} />
                        Back to Categories
                    </button>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Visual Diary</span>
                        <h1 className="text-5xl md:text-7xl font-serif text-green-deep capitalize">
                            {category} <span className="text-pink-soft">Gallery</span>
                        </h1>
                    </motion.div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {images.map((src, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ delay: (i % 3) * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => openLightbox(i)}
                            className="rounded-2xl overflow-hidden break-inside-avoid shadow-md hover:shadow-xl transition-all duration-300 relative group bg-green-light/20 cursor-zoom-in"
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

                {images.length === 0 && (
                    <div className="text-center text-green-mid py-20 font-serif text-xl">
                        No images found for this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default GalleryGrid;
