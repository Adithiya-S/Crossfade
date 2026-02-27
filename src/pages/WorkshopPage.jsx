import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight, Sparkles, X, Check } from 'lucide-react';
import api from '../services/api';

const WorkshopPage = () => {
    const [workshops, setWorkshops] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const [bookingState, setBookingState] = useState('idle');

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                // Fetch workshops from API, then filter to show only active ones (if we implemented active flags)
                // For now, we'll just display everything fetched (our API isn't filtering by 'active' yet)
                const data = await api.getWorkshops();
                setWorkshops(data);
            } catch (err) {
                console.error("Failed to load workshops", err);
            }
            setIsLoading(false);
        };
        fetchWorkshops();
    }, []);

    const handleBookClick = (workshop) => {
        setSelectedWorkshop(workshop);
        setBookingState('idle');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBookingState('submitting');
        setTimeout(() => {
            setBookingState('success');
        }, 1500);
    };

    if (isLoading) {
        return <div className="pt-40 min-h-screen text-center font-serif text-2xl text-green-mid">Loading workshops...</div>;
    }

    return (
        <div className="pt-32 pb-24 bg-background min-h-screen">
            <div className="px-6 mb-24 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                    <span className="font-disco text-pink-hot tracking-widest text-xl mb-4 block">Workshops & Classes</span>
                    <h1 className="text-5xl md:text-7xl font-serif text-green-deep mb-8">
                        Get Your Hands <span className="italic text-pink-hot">Dirty.</span>
                    </h1>
                    <p className="text-xl text-green-mid font-sans max-w-2xl mx-auto">
                        Whether you’re a complete beginner or looking to refine your skills, we have a space for you. Join us for a session of mud, music, and mindfulness.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 space-y-24">
                {workshops.length === 0 ? (
                    <div className="text-center text-green-mid font-serif py-12">No workshops scheduled right now. Check back later!</div>
                ) : (
                    workshops.map((workshop, index) => {
                        // Safely parse features if it came raw from the DB as a string, or if it's already an array from local mock
                        let features = [];
                        try {
                            if (typeof workshop.features_json === 'string') features = JSON.parse(workshop.features_json);
                            else if (Array.isArray(workshop.features)) features = workshop.features;
                        } catch (e) { }

                        return (
                            <motion.div
                                key={workshop.id}
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                            >
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="absolute inset-0 bg-green-deep/5 rounded-[3rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                                    <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-xl bg-gray-100">
                                        {workshop.image_url && (
                                            <img src={workshop.image_url} alt={workshop.title} loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                        )}
                                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-green-deep px-4 py-2 rounded-full font-serif text-sm border border-green-light">
                                            {workshop.category || 'Workshop'}
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2">
                                    <h2 className="text-4xl md:text-5xl font-serif text-green-deep mb-6">{workshop.title}</h2>
                                    <p className="text-lg text-green-mid mb-8 leading-relaxed whitespace-pre-wrap">{workshop.description}</p>

                                    <div className="grid grid-cols-2 gap-y-6 gap-x-12 mb-10">
                                        <div className="flex items-center gap-3 text-green-deep">
                                            <Clock size={20} className="text-pink-hot" />
                                            <span className="font-sans font-medium">{workshop.duration || '2 Hours'}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-green-deep">
                                            <Users size={20} className="text-pink-hot" />
                                            <span className="font-sans font-medium">{workshop.group_size || workshop.groupSize || 'Limited Spots'}</span>
                                        </div>
                                    </div>

                                    {features.length > 0 && (
                                        <ul className="mb-10 space-y-3">
                                            {features.map((feature, i) => (
                                                <li key={i} className="flex items-center gap-3 text-green-mid">
                                                    <Sparkles size={16} className="text-green-light" /> {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    <div className="flex items-center gap-6">
                                        <span className="text-2xl font-serif text-green-deep">
                                            {isNaN(Number(workshop.price)) ? workshop.price : `₹${workshop.price}`}
                                        </span>
                                        <button onClick={() => handleBookClick(workshop)} className="group inline-flex items-center gap-3 bg-green-deep text-background px-8 py-4 rounded-full font-serif text-lg hover:bg-pink-hot transition-all duration-300 shadow-lg hover:shadow-pink-hot/30">
                                            Enquire Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>

            <div className="mt-32 px-6">
                <div className="max-w-5xl mx-auto bg-pink-pale/30 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-hot/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-4xl md:text-5xl font-serif text-green-deep mb-6 relative z-10">Don't see what you're looking for?</h2>
                    <p className="text-xl text-green-mid mb-10 max-w-2xl mx-auto relative z-10">We can customize a workshop for your specific needs. From 1-on-1 intensive courses to corporate retreats.</p>
                    <a href="https://wa.me/918825836031?text=Hi!%20I'm%20interested%20in%20a%20custom%20workshop." target="_blank" rel="noopener noreferrer" className="inline-block border-2 border-green-deep text-green-deep px-10 py-4 rounded-full font-serif text-lg hover:bg-green-deep hover:text-white transition-all duration-300 relative z-10">
                        Chat with Us
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {selectedWorkshop && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="bg-white rounded-[2rem] p-8 w-full max-w-lg shadow-2xl relative">
                            <button onClick={() => setSelectedWorkshop(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"><X size={24} /></button>
                            {bookingState === 'success' ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} /></div>
                                    <h3 className="text-3xl font-serif text-green-deep mb-4">Request Sent!</h3>
                                    <p className="text-green-mid mb-8">We've received your booking request for <strong>{selectedWorkshop.title}</strong>. We'll contact you shortly to confirm details.</p>
                                    <button onClick={() => setSelectedWorkshop(null)} className="px-8 py-3 bg-green-deep text-white rounded-full font-serif">Close</button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-3xl font-serif text-green-deep mb-2">Book a Spot</h2>
                                    <p className="text-green-mid mb-6">for {selectedWorkshop.title}</p>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div><label className="block text-sm font-medium text-green-mid mb-2">Your Name</label><input required type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="Jane Doe" /></div>
                                        <div><label className="block text-sm font-medium text-green-mid mb-2">Email Address</label><input required type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="jane@example.com" /></div>
                                        <div><label className="block text-sm font-medium text-green-mid mb-2">Phone Number</label><input required type="tel" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none" placeholder="+91 99999 99999" /></div>
                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Number of Seats</label>
                                            <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none">{[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}</select>
                                        </div>
                                        <button type="submit" disabled={bookingState === 'submitting'} className="w-full mt-4 py-4 bg-green-deep text-white rounded-full font-serif text-lg hover:bg-pink-hot transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                                            {bookingState === 'submitting' ? 'Sending...' : 'Send Request'}
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

export default WorkshopPage;
