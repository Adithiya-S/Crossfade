import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Gift, Building, ArrowRight, CheckCircle2, Check, X } from 'lucide-react';

// Images - Using a mix of pottery and product shots to showcase variety
import dinnerwareImg from '../assets/Pottery/AP-10.webp';
import giftingImg from '../assets/Products/AP-166.webp';
import restaurantImg from '../assets/Pottery/AP-16.webp'; // Placeholder for bulk/restaurant

const services = [
    {
        id: 'dinnerware',
        title: "Bespoke Dinnerware",
        category: "Home & Living",
        description: "Elevate your daily rituals. We design and craft complete dinner sets, serving platters, and tea services tailored to your aesthetic and table dimensions.",
        timeline: "4-6 Weeks",
        minOrder: "No Minimum",
        image: dinnerwareImg,
        icon: <Palette className="text-pink-hot" size={24} />,
        features: ["Custom glaze matching", "Dishwasher safe options", "Personalized engravings"]
    },
    {
        id: 'gifting',
        title: "Personalized Gifting",
        category: "Events & Weddings",
        description: "Give a gift that actually means something. From wedding favors to housewarming sets, we create thoughtful, handmade pieces that tell a story.",
        timeline: "3-5 Weeks",
        minOrder: "15+ for Bulk Pricing",
        image: giftingImg,
        icon: <Gift className="text-pink-hot" size={24} />,
        features: ["Custom packaging available", "Date/Name stamping", "Volume discounts"]
    },
    {
        id: 'corporate',
        title: "Restaurant & Corporate",
        category: "B2B & Hospitality",
        description: "For cafes, restaurants, and offices. We provide durable, high-quality ceramicware that aligns with your brand identity and withstands commercial use.",
        timeline: "6-8 Weeks",
        minOrder: "20+ Pieces",
        image: restaurantImg,
        icon: <Building className="text-pink-hot" size={24} />,
        features: ["High-durability firing", "Logo integration", "Consistent reproduction"]
    },
];

const CustomOrdersPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [formState, setFormState] = useState('idle'); // idle, submitting, success

    const handleCommissionClick = (service) => {
        setSelectedService(service);
        setFormState('idle');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    return (
        <div className="pt-32 pb-24 bg-background min-h-screen">
            {/* Hero Section */}
            <div className="px-6 mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Commission Us</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-green-deep mb-8">
                        Made For <span className="italic text-pink-hot">You.</span>
                    </h1>
                    <p className="text-xl text-green-mid font-sans max-w-2xl mx-auto">
                        We love turning your ideas into tangible, functional art. Whether it's a single mug or tableware for a new restaurant, let's create something special.
                    </p>
                </motion.div>
            </div>

            {/* Service Viewer List */}
            <div className="max-w-7xl mx-auto px-6 space-y-32">
                {services.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                    >
                        {/* Image Side - Creative Shape */}
                        <div className="w-full lg:w-1/2 relative">
                            {/* Abstract blobs behind */}
                            <div className={`absolute -top-10 ${index % 2 === 0 ? '-left-10' : '-right-10'} w-2/3 h-2/3 bg-pink-pale/40 rounded-full blur-3xl -z-10`}></div>
                            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 aspect-[4/3]"
                                />

                                {/* Floating Badge */}
                                <div className={`absolute bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} bg-white/95 backdrop-blur shadow-lg px-6 py-4 rounded-2xl flex flex-col gap-1`}>
                                    <span className="text-xs font-bold tracking-widest text-green-mid uppercase">Timeline</span>
                                    <span className="font-serif text-xl text-green-deep">{service.timeline}</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-pink-pale rounded-full">
                                    {service.icon}
                                </div>
                                <span className="font-disco text-green-mid tracking-wide text-lg">{service.category}</span>
                            </div>

                            <h2 className="text-5xl font-serif text-green-deep mb-6 leading-tight">{service.title}</h2>
                            <p className="text-lg text-green-mid/90 mb-10 leading-relaxed text-balance">
                                {service.description}
                            </p>

                            {/* Features List */}
                            <div className="bg-white p-8 rounded-3xl border border-green-light/20 shadow-sm mb-10">
                                <h4 className="font-serif text-xl text-green-deep mb-4">What's included?</h4>
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3 text-green-mid">
                                            <CheckCircle2 size={18} className="text-green-light flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 pt-6 border-t border-green-light/10 flex justify-between items-center">
                                    <span className="text-sm font-medium text-green-mid/70">Minimum Order</span>
                                    <span className="font-serif text-lg text-green-deep">{service.minOrder}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => handleCommissionClick(service)}
                                className="group inline-flex items-center gap-3 text-xl font-serif text-pink-hot hover:text-green-deep transition-colors"
                            >
                                Start a Commission
                                <span className="p-2 bg-pink-hot rounded-full text-white group-hover:bg-green-deep transition-colors">
                                    <ArrowRight size={20} />
                                </span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Process Steps */}
            <div className="mt-40 bg-green-deep text-background py-24 px-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-hot rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-light rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif mb-6">How it Works</h2>
                        <p className="text-green-light/80 text-lg max-w-2xl mx-auto">From a vague idea to a delivered masterpiece. Here is our process.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { num: "01", title: "Idea", desc: "You share your moodboard, references, or just a rough sketch." },
                            { num: "02", title: "Quote", desc: "We discuss feasibility, timelines, and pricing." },
                            { num: "03", title: "Making", desc: "We throw, trim, glaze, and fire. You get progress updates." },
                            { num: "04", title: "Delivery", desc: "Safe packaging and shipping to your doorstep." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <span className="text-6xl font-disco text-pink-hot/20 absolute top-4 right-6">{step.num}</span>
                                <h3 className="text-2xl font-serif mb-4 relative z-10">{step.title}</h3>
                                <p className="text-green-light/70 relative z-10">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Commission Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedService(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {formState === 'success' ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Check size={40} />
                                    </div>
                                    <h3 className="text-3xl font-serif text-green-deep mb-4">Inquiry Received!</h3>
                                    <p className="text-green-mid mb-8">Thanks for your interest in <strong>{selectedService.title}</strong>. We'll review your details and get back to you with a quote/timeline.</p>
                                    <button
                                        onClick={() => setSelectedService(null)}
                                        className="px-8 py-3 bg-green-deep text-white rounded-full font-serif"
                                    >
                                        Close
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-serif text-green-deep mb-2">Commission Inquiry</h2>
                                    <p className="text-green-mid mb-6">for {selectedService.title}</p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Your Name</label>
                                            <input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="Jane Doe" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Email Address</label>
                                            <input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="jane@example.com" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Approx Budget (₹)</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="e.g. 15,000" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Brief Description</label>
                                            <textarea rows="3" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none resize-none" placeholder="What do you have in mind? Quantity, colors, timeline..."></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={formState === 'submitting'}
                                            className="w-full mt-4 py-4 bg-green-deep text-white rounded-full font-serif text-lg hover:bg-pink-hot transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {formState === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CustomOrdersPage;
