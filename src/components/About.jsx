import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Heart, Sparkles } from 'lucide-react';
import potteryImg from '../assets/Pottery/AP-9.webp';
import workshopImg from '../assets/Workshops/IMG_5872.webp';

const About = () => {
    return (
        <section id="about" className="py-24 bg-background px-6">
            <div className="max-w-7xl mx-auto space-y-24">
                {/* About The Founder Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
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
                                alt="Crossfade Pottery Founder"
                                loading="lazy"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-10 left-10 w-20 h-20 bg-pink-hot/20 rounded-full blur-xl animate-pulse"></div>
                        </div>
                        {/* Decorative Badge */}
                        <div className="absolute -bottom-6 -left-6 bg-pink-hot text-background p-4 rounded-full font-serif text-center shadow-xl rotate-12 border-2 border-background">
                            <span className="block text-xl font-bold font-disco">The</span>
                            <span className="text-sm uppercase tracking-widest">Founder</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="font-disco text-pink-hot text-xl tracking-widest block mb-4 uppercase">✦ About the Founder</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-green-deep mb-8 leading-tight">
                            My academic background is in banking, though my instincts have always leaned toward the arts.
                        </h2>
                        <div className="space-y-6 text-lg font-sans text-green-mid leading-relaxed">
                            <p>
                                I went on to work as a professional makeup artist in the film industry, where I developed a deep sensitivity to colour, texture, and transformation. Alongside that work, I continued creating independently—paintings, textile pieces, resin objects, and small handmade works that moved quietly through personal commissions and word of mouth.
                            </p>
                            <p>
                                A later formal study of ceramics became a turning point. Clay introduced a slower, more tactile way of working, one that values patience, presence, and process over speed or perfection.
                            </p>
                            <p>
                                The idea for Crossfade Art House grew from simple gatherings with friends. We would sit together for hours making things, talking, sharing space, losing track of time. The atmosphere was calm, grounding, unexpectedly joyful and increasingly rare in everyday life.
                            </p>
                            <p>
                                This studio was created to hold that experience and make it accessible to others. Not as a traditional classroom, but as a thoughtfully designed space where people can create, unwind, and reconnect with the pleasure of working with their hands.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* About The Studio Section */}
                <div className="border-t border-green-light/30 pt-24 space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="font-disco text-pink-hot text-xl tracking-widest block mb-4 uppercase">✦ About the Studio</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-green-deep mb-8 leading-tight">
                                Crossfade Art House currently operates as a series of curated pop-up experiences rather than a permanent studio.
                            </h2>
                            <div className="space-y-6 text-lg font-sans text-green-mid leading-relaxed mb-12">
                                <p>
                                    Each session is hosted in carefully selected spaces, transformed temporarily into an intimate environment for hands-on making. This format allows the experience to remain flexible, personal, and deliberately small prioritising atmosphere over scale.
                                </p>
                                <p>
                                    Every pop-up is designed as a complete creative setting: materials prepared, tools in place, guidance available, and time structured so participants can settle into the process without hurry.
                                </p>
                                <p>
                                    The absence of a fixed location is intentional for now. It allows Crossfade Art House to evolve organically while building a community around shared creative experiences.
                                </p>
                                <p className="font-medium text-green-deep">
                                    A permanent studio space is currently in development.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative lg:mt-12"
                        >
                            <div className="aspect-[4/3] bg-green-deep/10 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative rotate-2">
                                <img
                                    src={workshopImg}
                                    alt="Crossfade Art House Workshop"
                                    loading="lazy"
                                    className="w-full h-full object-cover rounded-[3rem]"
                                />
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-hot/30 rounded-full blur-2xl animate-pulse"></div>
                            </div>
                            {/* Decorative Badge */}
                            <div className="absolute top-10 -right-8 bg-green-deep text-pink-pale p-4 rounded-full font-serif text-center shadow-xl -rotate-12 border-2 border-pink-pale">
                                <span className="block text-2xl font-bold font-disco">Immersive</span>
                                <span className="text-xs uppercase tracking-widest">Experiences</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Values - Full Width 4 Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {[
                            { title: "All tools and materials provided", desc: "Everything needed for the session is prepared in advance — no need to bring anything." },
                            { title: "No prior experience required", desc: "Sessions are beginner-friendly and fully guided, suitable for first-time participants." },
                            { title: "Small, intimate groups", desc: "Limited seats ensure personal attention and a calm, unhurried atmosphere." },
                            { title: "Take home what you create", desc: "Leave with your handmade piece (or collect it after finishing, if applicable)." }
                        ].map((val, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-green-light/10 p-6 xl:p-8 rounded-2xl border border-green-light/30 hover:bg-green-light/20 transition-colors flex flex-col h-full"
                            >
                                <h3 className="text-xl font-serif text-green-deep mb-4 flex items-start gap-2">
                                    <span className="text-pink-hot text-2xl leading-none mt-1">*</span>
                                    {val.title}
                                </h3>
                                <p className="text-green-mid text-base leading-relaxed mt-auto">{val.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
