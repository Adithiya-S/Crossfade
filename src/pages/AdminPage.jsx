import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, MapPin, Calendar, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

// Mock Initial Data (matching the structure we want)
const initialWorkshops = [
    {
        id: 1,
        title: "Introduction to Wheel Throwing",
        category: "Beginner",
        date: "2024-03-15",
        location: "Koramangala Studio",
        image: "/src/assets/Workshops/IMG_6872.webp", // Using path we know exists
        active: true,
        spots: 4,
        price: "3000"
    },
    {
        id: 2,
        title: "Hand-Building Basics",
        category: "Relaxing",
        date: "2024-03-20",
        location: "Indiranagar Cafe",
        image: "/src/assets/Workshops/IMG_4553.webp",
        active: true,
        spots: 8,
        price: "2500"
    },
    {
        id: 3,
        title: "Sunset Glazing",
        category: "Advanced",
        date: "2024-03-25",
        location: "Rooftop Garden",
        image: "/src/assets/Workshops/IMG_5909.webp",
        active: false,
        spots: 10,
        price: "1200"
    }
];

// Mock Applications Data
const mockApplications = [
    { id: 1, workshopId: 1, workshopTitle: "Introduction to Wheel Throwing", applicant: "Sarah Jenkins", email: "sarah@example.com", phone: "+91 98765 43210", spots: 2, status: "Pending", date: "2024-02-10" },
    { id: 2, workshopId: 2, workshopTitle: "Hand-Building Basics", applicant: "Rahul Verma", email: "rahul@example.com", phone: "+91 98765 43211", spots: 1, status: "Confirmed", date: "2024-02-11" },
];

// Mock Custom Orders Data
const mockCustomOrders = [
    { id: 1, type: "Bespoke Dinnerware", applicant: "Priya Singh", email: "priya@example.com", phone: "+91 98765 43212", budget: "₹15,000", description: "Set of 6 dinner plates and bowls in matte black.", status: "New", date: "2024-02-12" },
    { id: 2, type: "Gifting", applicant: "Tech Corp Inc.", email: "hr@techcorp.com", phone: "+91 98765 43213", budget: "₹50,000", description: "50 custom mugs for employee onboarding kits.", status: "In Progress", date: "2024-02-08" },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('workshops'); // 'workshops', 'applications', 'orders'
    const [workshops, setWorkshops] = useState(initialWorkshops);
    const [applications, setApplications] = useState(mockApplications);
    const [customOrders, setCustomOrders] = useState(mockCustomOrders);

    const [isEditing, setIsEditing] = useState(false);
    const [currentWorkshop, setCurrentWorkshop] = useState(null);

    // Form Handling
    const handleEdit = (workshop) => {
        setCurrentWorkshop(workshop);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentWorkshop({
            id: Date.now(), // Temp ID
            title: "",
            category: "",
            date: "",
            location: "",
            image: "",
            active: true,
            spots: "",
            price: ""
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this workshop?")) {
            setWorkshops(workshops.filter(w => w.id !== id));
        }
    };

    const handleSave = (e) => {
        e.preventDefault();

        if (workshops.find(w => w.id === currentWorkshop.id)) {
            // Update existing
            setWorkshops(workshops.map(w => w.id === currentWorkshop.id ? currentWorkshop : w));
        } else {
            // Add new
            setWorkshops([...workshops, currentWorkshop]);
        }
        setIsEditing(false);
        setCurrentWorkshop(null);
    };

    const toggleStatus = (id) => {
        setWorkshops(workshops.map(w => {
            if (w.id === id) return { ...w, active: !w.active };
            return w;
        }));
    };

    return (
        <div className="min-h-screen bg-background pt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <span className="font-disco text-pink-hot tracking-widest text-lg mb-2 block">Admin Panel</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-green-deep">Dashboard</h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {['workshops', 'applications', 'orders'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-serif text-lg whitespace-nowrap transition-colors ${activeTab === tab
                                    ? 'bg-green-deep text-white'
                                    : 'bg-white text-green-mid hover:bg-green-light/20'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Workshops Tab */}
                {activeTab === 'workshops' && (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-serif text-green-deep">Manage Workshops</h2>
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 bg-green-deep text-background px-6 py-3 rounded-full font-serif hover:bg-pink-hot transition-colors shadow-lg"
                            >
                                <Plus size={20} />
                                New Workshop
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {workshops.map((workshop) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={workshop.id}
                                        className={`relative bg-white rounded-3xl p-4 shadow-sm border ${workshop.active ? 'border-green-light/20' : 'border-gray-200 opacity-70'} hover:shadow-md transition-all`}
                                    >
                                        {/* Image Area */}
                                        <div className="h-48 rounded-2xl overflow-hidden bg-gray-100 relative mb-4">
                                            {workshop.image ? (
                                                <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-300">
                                                    <ImageIcon size={40} />
                                                </div>
                                            )}
                                            <div className="absolute top-3 right-3 flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(workshop)}
                                                    className="p-2 bg-white/90 backdrop-blur rounded-full text-green-deep hover:text-pink-hot transition-colors shadow-sm"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(workshop.id)}
                                                    className="p-2 bg-white/90 backdrop-blur rounded-full text-red-500 hover:text-red-600 transition-colors shadow-sm"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${workshop.active ? 'bg-green-500/20 text-green-800' : 'bg-gray-500/20 text-gray-700'}`}>
                                                    {workshop.active ? 'Active' : 'Draft'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-2">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-xl font-serif text-green-deep leading-tight">{workshop.title}</h3>
                                            </div>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-sm text-green-mid">
                                                    <Calendar size={14} />
                                                    {workshop.date || 'No Date Set'}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-green-mid">
                                                    <MapPin size={14} />
                                                    {workshop.location || 'No Location'}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-green-mid">
                                                    <Users size={14} />
                                                    {workshop.spots ? `${workshop.spots} Spots` : 'Capacity Not Set'}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                <span className="font-serif text-green-deep">₹{workshop.price}</span>
                                                <button
                                                    onClick={() => toggleStatus(workshop.id)}
                                                    className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${workshop.active ? 'bg-pink-pale text-pink-hot hover:bg-pink-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                                                >
                                                    {workshop.active ? 'Deactivate' : 'Publish'}
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* Applications Tab */}
                {activeTab === 'applications' && (
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-green-light/20">
                        <h2 className="text-2xl font-serif text-green-deep mb-6">Workshop Applications</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 text-green-mid/70 text-sm">
                                        <th className="pb-4 font-medium pl-4">Applicant</th>
                                        <th className="pb-4 font-medium">Workshop</th>
                                        <th className="pb-4 font-medium">Contact</th>
                                        <th className="pb-4 font-medium">Slots</th>
                                        <th className="pb-4 font-medium">Status</th>
                                        <th className="pb-4 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-green-deep">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 pl-4 font-serif text-lg">{app.applicant}</td>
                                            <td className="py-4 text-sm">{app.workshopTitle}</td>
                                            <td className="py-4">
                                                <div className="flex flex-col text-sm text-green-mid">
                                                    <span>{app.email}</span>
                                                    <span>{app.phone}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center">{app.spots}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-green-mid">{app.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Custom Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-green-light/20">
                        <h2 className="text-2xl font-serif text-green-deep mb-6">Custom Order Requests</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-gray-100 text-green-mid/70 text-sm">
                                        <th className="pb-4 font-medium pl-4">Client</th>
                                        <th className="pb-4 font-medium">Type</th>
                                        <th className="pb-4 font-medium w-1/3">Description</th>
                                        <th className="pb-4 font-medium">Budget</th>
                                        <th className="pb-4 font-medium">Status</th>
                                        <th className="pb-4 font-medium">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-green-deep">
                                    {customOrders.map((order) => (
                                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 pl-4">
                                                <div className="font-serif text-lg">{order.applicant}</div>
                                                <div className="text-xs text-green-mid">{order.email}</div>
                                            </td>
                                            <td className="py-4 text-sm font-medium">{order.type}</td>
                                            <td className="py-4 text-sm text-green-mid">{order.description}</td>
                                            <td className="py-4 text-sm font-mono">{order.budget}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${order.status === 'New' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-green-mid">{order.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                <AnimatePresence>
                    {isEditing && (
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
                                className="bg-white rounded-[2rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-3xl font-serif text-green-deep">
                                        {currentWorkshop.id && workshops.find(w => w.id === currentWorkshop.id) ? 'Edit Workshop' : 'Create Workshop'}
                                    </h2>
                                    <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSave} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-green-mid mb-2">Workshop Title</label>
                                            <input
                                                type="text"
                                                required
                                                value={currentWorkshop.title}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, title: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                placeholder="e.g. Sunset Pottery Session"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Date</label>
                                            <input
                                                type="date"
                                                required
                                                value={currentWorkshop.date}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, date: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Category</label>
                                            <input
                                                type="text"
                                                value={currentWorkshop.category}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, category: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                placeholder="e.g. Beginner"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Location</label>
                                            <input
                                                type="text"
                                                value={currentWorkshop.location}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, location: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                placeholder="e.g. ECR"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Group Size</label>
                                            <input
                                                type="number"
                                                value={currentWorkshop.spots}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, spots: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                placeholder="Max attendees"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-green-mid mb-2">Price (₹)</label>
                                            <input
                                                type="number"
                                                value={currentWorkshop.price}
                                                onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, price: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                placeholder="Cost per person"
                                            />
                                        </div>

                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-green-mid mb-2">Image URL</label>
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={currentWorkshop.image}
                                                    onChange={(e) => setCurrentWorkshop({ ...currentWorkshop, image: e.target.value })}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot focus:ring-0 outline-none transition-all"
                                                    placeholder="/src/assets/..."
                                                />
                                                <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                                    {currentWorkshop.image && (
                                                        <img src={currentWorkshop.image} alt="Preview" className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-2">Paste a local path or URL.</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-100 mt-8">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-3 rounded-full text-green-mid hover:bg-gray-100 transition-colors font-sans"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-green-deep text-white rounded-full font-serif shadow-lg hover:bg-pink-hot transition-colors flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            Save Workshop
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AdminPage;
