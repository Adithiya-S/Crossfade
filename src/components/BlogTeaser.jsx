import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const BlogTeaser = () => {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-green-deep mb-4"
                >
                    6 things beginners should know before starting
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-green-deep/80 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
                >
                    Every maker starts somewhere. Our workshops are structured to support first time participants with clear instruction, prepared materials, and a relaxed pace.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <a
                        href="/blog"
                        className="inline-flex items-center gap-2 border-2 border-green-deep text-green-deep px-8 py-3 rounded-full font-serif text-lg hover:bg-green-deep hover:text-white transition-all duration-300"
                    >
                        Read beginner guide
                        <ChevronRight size={20} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogTeaser;
