import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';

const categories = [
    {
        id: 'pottery',
        title: 'Pottery',
        image: getCloudinaryUrl('Pottery/AP-10.jpg'),
        desc: 'Hand-thrown masterpeices.',
        color: 'bg-green-deep',
        textColor: 'text-white'
    },
    {
        id: 'products',
        title: 'Products',
        image: getCloudinaryUrl('Products/AP-166.jpg'),
        desc: 'Curated goods for your home.',
        color: 'bg-pink-pale',
        textColor: 'text-green-deep'
    },
    {
        id: 'workshops',
        title: 'Workshops',
        image: getCloudinaryUrl('Workshops/IMG_6872.jpg'),
        desc: 'Moments of creation.',
        color: 'bg-green-light',
        textColor: 'text-green-deep'
    }
];

const GalleryPage = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Collections</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-green-deep">
                        The <span className="text-pink-soft">Gallery</span>
                    </h1>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {categories.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Link
                                to={`/gallery/${cat.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`block group relative h-[500px] rounded-[3rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300`}></div>

                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent">
                                    <h3 className="text-4xl font-serif text-white mb-2">{cat.title}</h3>
                                    <p className="text-white/80 font-sans text-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        {cat.desc}
                                    </p>
                                </div>

                                <div className="absolute top-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
