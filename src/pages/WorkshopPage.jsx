import React from 'react';
import { motion } from 'framer-motion';
import workshopImg from '../assets/Pottery/AP-13.jpg';

const WorkshopPage = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full text-center"
            >
                <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Get Dirty</span>
                <h1 className="text-5xl md:text-7xl font-serif text-green-deep mb-8 relative inline-block">
                    Workshops
                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-hot/30 rounded-full"></span>
                </h1>

                <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl border-4 border-white">
                    <img
                        src={workshopImg}
                        alt="Workshop vibe"
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-green-deep/10"></div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-lg border border-green-light/20 text-left mx-auto max-w-2xl">
                    <h3 className="text-3xl font-serif text-green-deep mb-6">Upcoming Sessions</h3>
                    <p className="font-sans text-green-mid text-lg mb-8 leading-relaxed">
                        We host pop-up workshops at various cafes and studios. We also do private events for birthdays, team building, or just a chill Sunday.
                    </p>
                    <ul className="space-y-4 mb-8 text-green-deep font-medium">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                            Hand-building basics (Pinch & Coil)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                            Wheel throwing intro
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-pink-hot rounded-full"></span>
                            Painting & Glazing
                        </li>
                    </ul>
                    <div className="text-center">
                        <a
                            href="https://wa.me/918825836031"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-pink-hot text-background px-8 py-3 rounded-full font-serif text-lg hover:bg-green-deep transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Enquire for Dates
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WorkshopPage;
