import React from 'react';
import { motion } from 'framer-motion';

const BlogPage = () => {
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl w-full"
            >
                <span className="font-disco text-pink-hot tracking-widest text-xl mb-6 block text-center uppercase">Beginner Guide</span>
                <h1 className="text-4xl md:text-6xl font-serif text-green-deep mb-12 text-center leading-tight">
                    Starting Pottery for the First Time
                </h1>

                <div className="prose prose-lg mx-auto text-green-deep/90 font-sans">
                    <p className="lead text-xl mb-8 leading-relaxed">
                        Working with clay is both simple and unexpectedly absorbing. You do not need artistic training or prior experience to begin. What matters most is a willingness to try, observe, and enjoy the process.
                    </p>
                    <p className="mb-12">
                        Here are a few things that can help you feel prepared for your first session.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">1.</span> You do not need any experience
                    </h3>
                    <p className="mb-6">
                        Most participants are complete beginners. Sessions are guided step by step, with demonstrations and individual support throughout. There is no expectation to produce a perfect piece on your first attempt.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">2.</span> Clay behaves differently than you expect
                    </h3>
                    <p className="mb-6">
                        It is soft, responsive, and sometimes unpredictable. Pieces may lean, collapse, or change shape as you work. This is part of the material’s nature and often where the most interesting forms emerge.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">3.</span> The process is slower than most creative activities
                    </h3>
                    <p className="mb-6">
                        Pottery rewards patience. Shaping, refining, and finishing each stage takes time. Many people find this pace calming and immersive, offering a rare pause from fast daily routines.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">4.</span> Breakage can happen
                    </h3>
                    <p className="mb-6">
                        Clay remains fragile until it has been fired in the kiln. Occasionally, pieces may crack, warp, or break during drying or firing due to natural stresses in the material. While every effort is made to handle work carefully, this is an inherent part of ceramics and cannot always be predicted or prevented.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">5.</span> You will get a little messy
                    </h3>
                    <p className="mb-6">
                        Working with clay is a tactile experience. Hands, tools, and surfaces will carry traces of it. Aprons are provided, but comfortable clothing is recommended.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3">
                        <span className="text-pink-hot">6.</span> The experience matters more than the outcome
                    </h3>
                    <p className="mb-12">
                        Your first piece may not be perfectly symmetrical or polished, and that is entirely normal. What most people remember is the quiet satisfaction of making something with their own hands.
                    </p>

                    <div className="bg-green-light/10 p-8 rounded-2xl border border-green-light/30 text-center mt-12">
                        <p className="text-xl font-serif text-green-deep italic">
                            Arrive with curiosity. Leave with a deeper appreciation for the process of making.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPage;
