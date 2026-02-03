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
                <span className="font-disco text-pink-hot tracking-widest text-xl mb-6 block text-center">The Clay Journal</span>
                <h1 className="text-4xl md:text-6xl font-serif text-green-deep mb-12 text-center leading-tight">
                    5 Things Beginners Should Know Before Starting a Class
                </h1>

                <div className="prose prose-lg mx-auto text-green-deep/80 font-sans">
                    <p className="lead text-xl mb-8">
                        So you've decided to get your hands dirty? Welcome to the club! Pottery is one of the most rewarding (and humbling) hobbies you can pick up. Here are a few things we wish we knew when we started.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-8 mb-4">1. You will fail. A lot.</h3>
                    <p className="mb-6">
                        And that's okay! Clay has a mind of its own. Your first bowl might look like a potato, and your first mug might not have a handle. Embrace the wobble.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-8 mb-4">2. Centering is everything.</h3>
                    <p className="mb-6">
                        If you're on the wheel, 90% of the battle is centering the clay. Don't rush this step. If it's not centered, nothing else will be.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-8 mb-4">3. Short nails help.</h3>
                    <p className="mb-6">
                        Long nails can gouge the clay while you're working. It's not impossible, but trimming them down makes life a lot easier.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-8 mb-4">4. It's a waiting game.</h3>
                    <p className="mb-6">
                        Pottery teaches patience. Throwing, trimming, drying, bisque firing, glazing, glaze firing... a finished piece can take weeks.
                    </p>

                    <h3 className="text-2xl font-serif text-green-deep mt-8 mb-4">5. Have fun!</h3>
                    <p className="mb-6">
                        Don't get too caught up in making things perfect. The best pieces often come from happy accidents.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPage;
