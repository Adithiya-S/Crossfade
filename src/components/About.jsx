import React from 'react';
import { motion } from 'framer-motion';
import potteryImg from '../assets/Pottery/AP-9.jpg';
// Import some images if available, for now using placeholders or we can try to use the copied assets
// import aboutImg from '../assets/uploaded_media_0_....png' 
// Since filenames are dynamic, we will use placeholders or generic refs if we knew them. 
// For now, I will use a placeholder colored div or generic image logic.

const About = () => {
    const values = [
        {
            icon: <div className="w-8 h-8 text-pink-hot">🌍</div>, // Placeholder for Globe
            title: "Nomadic Spirit",
            desc: "No fixed address. We pop up at cafes, studios, and your backyard."
        },
        {
            icon: <div className="w-8 h-8 text-pink-hot">❤️</div>, // Placeholder for Heart
            title: "Warmth & Community",
            desc: "We treat everyone like friends. Encouragement over perfection."
        },
        {
            icon: <div className="w-8 h-8 text-pink-hot">✨</div>, // Placeholder for Sparkles
            title: "Imperfect Beauty",
            desc: "Wobbly edges welcome. We celebrate the unique quirks of handmade."
        }
    ];

    return (
        <section id="about" className="py-24 bg-background px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-5xl md:text-6xl font-serif text-green-deep mb-8">
                            We Are <span className="italic text-pink-hot">Nomadic.</span>
                        </h2>
                        <p className="text-xl font-sans text-green-mid mb-6 leading-relaxed">
                            Crossfade Art House isn't stuck in one place. We are an artist-led pottery and art brand that moves with the unique energy of the city.
                        </p>
                        <p className="text-lg font-sans text-green-mid/80 mb-8 italic">
                            "Give us a bit. We're probably covered in clay."
                        </p>
                        <p className="text-lg font-sans text-green-mid mb-8">
                            Without a fixed physical studio, we create on order and conduct hands-on workshops at client venues, private spaces, event locations, and curated pop-ups.
                        </p>

                        {/* Values */}
                        <div className="grid gap-8">
                            {values.map((val, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                    className="flex gap-4 items-start"
                                >
                                    <div className="bg-pink-pale/30 p-3 rounded-2xl rounded-tl-none">
                                        {val.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-serif text-green-deep mb-2">{val.title}</h3>
                                        <p className="text-green-mid">{val.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Minimal Visual/Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-green-light/20 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                            <img
                                src={potteryImg}
                                alt="Crossfade Pottery"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            {/* Decorative Elements */}
                            <div className="absolute top-10 right-10 w-20 h-20 bg-pink-hot/20 rounded-full blur-xl animate-pulse"></div>
                        </div>
                        {/* Sticker/Badge */}
                        <div className="absolute -bottom-10 -left-10 bg-pink-pale text-green-deep p-6 rounded-full font-serif text-center shadow-lg rotate-12">
                            <span className="block text-3xl font-bold">100%</span>
                            <span className="text-sm">Handmade</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
