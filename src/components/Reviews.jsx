import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
    {
        name: "Sarah Jenkins",
        text: "The workshop was absolutely magical! I've never touched clay before, but the instructors made me feel so comfortable. Plus, the vibe was immaculate.",
        color: "bg-pink-pale"
    },
    {
        name: "Arjun Mehta",
        text: "Commissioned a set of dinner plates for my wife's birthday. They are stunning. Imperfectly perfect, just like the brand promises.",
        color: "bg-green-light"
    },
    {
        name: "Elena Rodriguez",
        text: "A hidden gem. The 'nomadic' concept is cool—caught them at a pop-up in Bandra and ended up buying half the stock!",
        color: "bg-pink-soft"
    }
];

const Reviews = () => {
    return (
        <section className="py-24 px-6 bg-background border-t border-green-light/20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-serif text-green-deep mb-16 text-center"
                >
                    Kind Words
                </motion.h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white p-8 rounded-[2rem] shadow-lg relative"
                        >
                            <div className="flex gap-1 mb-6 text-pink-hot">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={20} fill="currentColor" />
                                ))}
                            </div>
                            <p className="font-sans text-green-deep/80 text-lg mb-8 leading-relaxed italic">
                                "{review.text}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full ${review.color} flex items-center justify-center font-serif text-xl text-green-deep font-bold`}>
                                    {review.name[0]}
                                </div>
                                <span className="font-serif text-green-deep text-lg">{review.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
