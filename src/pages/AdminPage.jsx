import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon, CheckCircle, AlertCircle, LogOut, MessageSquare } from 'lucide-react';
import api from '../services/api';

const AdminPage = () => {
    // --- Auth State ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [loginError, setLoginError] = useState('');

    // --- Dashboard State ---
    const [activeTab, setActiveTab] = useState('workshops'); // 'workshops', 'blogs', 'comments'
    const [workshops, setWorkshops] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editingType, setEditingType] = useState('workshop'); // 'workshop' or 'blog'
    const [currentData, setCurrentData] = useState({});

    // --- Password Change State ---
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [newPassword, setNewPassword] = useState('');

    // Check auth on mount
    useEffect(() => {
        if (api.getToken()) setIsAuthenticated(true);
    }, []);

    // Load data when tab changes
    useEffect(() => {
        if (!isAuthenticated) return;

        const loadData = async () => {
            setIsLoading(true);
            try {
                if (activeTab === 'workshops') setWorkshops(await api.getWorkshops());
                if (activeTab === 'blogs') setBlogs(await api.getBlogs());
                if (activeTab === 'comments') setComments(await api.getComments(null, true));
            } catch (err) {
                console.error("Failed to fetch data:", err);
            }
            setIsLoading(false);
        };
        loadData();
    }, [activeTab, isAuthenticated]);

    // --- Auth Handlers ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        try {
            await api.login(loginForm.username, loginForm.password);
            setIsAuthenticated(true);
        } catch (err) {
            setLoginError(err.message || 'Login failed');
        }
    };

    const handleLogout = () => {
        api.logout();
        setIsAuthenticated(false);
        setLoginForm({ username: '', password: '' });
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        try {
            const res = await api.updatePassword(newPassword);
            if (res.success) {
                alert("Password changed successfully! You will need to log in again.");
                setIsChangingPassword(false);
                setNewPassword('');
                handleLogout(); // Force regular re-login using the new pass
            } else {
                alert(res.error || "Failed to change password.");
            }
        } catch (error) {
            alert("Error changing password.");
        }
    };

    // --- Generic Modal Handlers ---
    const handleEdit = (type, item) => {
        setEditingType(type);
        setCurrentData(item);
        setIsEditing(true);
    };

    const handleCreate = (type) => {
        setEditingType(type);
        if (type === 'workshop') {
            setCurrentData({ title: '', category: '', date: '', location: '', image: '', desc: '', spots: '', price: '' });
        } else {
            setCurrentData({ title: '', excerpt: '', content: '', image_url: '' });
        }
        setIsEditing(true);
    };

    const handleDelete = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;

        try {
            if (type === 'workshop') {
                await api.deleteWorkshop(id);
                setWorkshops(workshops.filter(w => w.id !== id));
            } else if (type === 'blog') {
                await api.deleteBlog(id);
                setBlogs(blogs.filter(b => b.id !== id));
            } else if (type === 'comment') {
                await api.deleteComment(id);
                setComments(comments.filter(c => c.id !== id));
            }
        } catch (err) {
            alert('Failed to delete item.');
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            if (editingType === 'workshop') {
                await api.saveWorkshop(currentData);
                setWorkshops(await api.getWorkshops()); // refresh
            } else {
                await api.saveBlog(currentData);
                setBlogs(await api.getBlogs()); // refresh
            }
            setIsEditing(false);
        } catch (err) {
            alert("Failed to save changes.");
        }
    };

    const toggleCommentApproval = async (comment) => {
        try {
            await api.approveComment(comment.id, !comment.is_approved);
            setComments(await api.getComments(null, true)); // refresh
        } catch (err) {
            alert("Failed to update status");
        }
    };

    // --- Login Screen ---
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-pink-pale/10 flex items-center justify-center p-6 pt-32">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-10 rounded-[2rem] shadow-xl w-full max-w-md border border-green-light/20">
                    <h1 className="text-3xl font-serif text-green-deep text-center mb-2">Admin Login</h1>
                    <p className="text-center text-green-mid mb-8 font-sans">Enter your credentials to access the dashboard.</p>

                    {loginError && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-xl mb-6 text-sm flex items-center gap-2">
                            <AlertCircle size={16} /> {loginError}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-green-mid mb-1">Username</label>
                            <input
                                type="text" required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none"
                                value={loginForm.username} onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-mid mb-1">Password</label>
                            <input
                                type="password" required
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-pink-hot outline-none"
                                value={loginForm.password} onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="w-full py-3 mt-6 bg-green-deep text-white rounded-full font-serif text-lg hover:bg-pink-hot transition-colors shadow-lg">
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // --- Dashboard Screen ---
    return (
        <div className="min-h-screen bg-background pt-32 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
                    <div>
                        <span className="font-disco text-pink-hot tracking-widest text-lg mb-2 block">Admin Panel</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-green-deep">Dashboard</h1>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setIsChangingPassword(true)} className="flex items-center gap-2 px-4 py-2 text-green-deep hover:text-pink-hot transition-colors bg-white rounded-full shadow-sm">
                            Change Password
                        </button>
                        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-green-mid hover:text-red-500 transition-colors bg-white rounded-full shadow-sm">
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                    {['workshops', 'blogs', 'comments'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full font-serif text-lg capitalize whitespace-nowrap transition-colors ${activeTab === tab
                                ? 'bg-green-deep text-white'
                                : 'bg-white text-green-mid hover:bg-green-light/20 shadow-sm'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="py-20 text-center text-green-mid animate-pulse font-serif">Loading data...</div>
                ) : (
                    <>
                        {/* Workshops Tab */}
                        {activeTab === 'workshops' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-serif text-green-deep">Manage Workshops</h2>
                                    <button onClick={() => handleCreate('workshop')} className="flex items-center gap-2 bg-green-deep text-white px-6 py-3 rounded-full font-serif hover:bg-pink-hot shadow-lg transition-colors">
                                        <Plus size={20} /> New Workshop
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {workshops.map(workshop => (
                                        <div key={workshop.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                                            <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden relative mb-4">
                                                {workshop.image_url ? <img src={workshop.image_url} alt="" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-gray-300"><ImageIcon size={30} /></div>}
                                            </div>
                                            <h3 className="font-serif text-xl text-green-deep mb-2">{workshop.title}</h3>
                                            <p className="text-sm text-green-mid mb-4 flex-grow">{workshop.category} • ₹{workshop.price} • {workshop.spots || '0'} spots</p>
                                            <div className="flex gap-2">
                                                <button onClick={() => handleEdit('workshop', workshop)} className="flex-1 py-2 bg-pink-pale/30 text-green-deep rounded-full text-sm font-medium hover:bg-pink-pale transition">Edit</button>
                                                <button onClick={() => handleDelete('workshop', workshop.id)} className="px-4 py-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Blogs Tab */}
                        {activeTab === 'blogs' && (
                            <div className="space-y-8">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-serif text-green-deep">Manage Blogs</h2>
                                    <button onClick={() => handleCreate('blog')} className="flex items-center gap-2 bg-green-deep text-white px-6 py-3 rounded-full font-serif hover:bg-pink-hot shadow-lg transition-colors">
                                        <Plus size={20} /> New Blog Post
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {blogs.map(blog => (
                                        <div key={blog.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
                                            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden">
                                                {blog.image_url && <img src={blog.image_url} alt="" className="w-full h-full object-cover" />}
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-serif text-lg text-green-deep">{blog.title}</h3>
                                                <p className="text-sm text-green-mid mt-1 line-clamp-2">{blog.excerpt}</p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <button onClick={() => handleEdit('blog', blog)} className="p-2 bg-pink-pale/30 text-green-deep rounded-full hover:bg-pink-pale transition"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete('blog', blog.id)} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Comments Tab */}
                        {activeTab === 'comments' && (
                            <div className="space-y-8">
                                <h2 className="text-2xl font-serif text-green-deep mb-6">Comment Moderation</h2>
                                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                    {comments.length === 0 ? (
                                        <div className="p-8 text-center text-green-mid font-serif">No comments to display.</div>
                                    ) : (
                                        <div className="divide-y divide-gray-100">
                                            {comments.map(comment => (
                                                <div key={comment.id} className="p-6 flex flex-col md:flex-row justify-between gap-6 hover:bg-gray-50/50 transition-colors">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="font-serif text-lg text-green-deep">{comment.author_name}</span>
                                                            <span className="text-xs text-gray-400">on Blog #{comment.blog_id}</span>
                                                            <span className={`px-2 py-0.5 text-xs rounded-full font-bold uppercase ${comment.is_approved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                                {comment.is_approved ? 'Approved' : 'Pending'}
                                                            </span>
                                                        </div>
                                                        <p className="text-green-mid text-sm bg-gray-50 p-4 rounded-2xl">{comment.content}</p>
                                                    </div>
                                                    <div className="flex items-start gap-2 flex-shrink-0 mt-2 md:mt-0">
                                                        <button
                                                            onClick={() => toggleCommentApproval(comment)}
                                                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${comment.is_approved ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-green-deep hover:bg-green-800 text-white'}`}
                                                        >
                                                            {comment.is_approved ? 'Unapprove' : 'Approve'}
                                                        </button>
                                                        <button onClick={() => handleDelete('comment', comment.id)} className="p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Password Change Modal */}
            <AnimatePresence>
                {isChangingPassword && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif text-green-deep">Change Password</h2>
                                <button onClick={() => setIsChangingPassword(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
                            </div>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1 text-green-mid">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        className="w-full px-4 py-2 rounded-xl border bg-gray-50 outline-none focus:border-pink-hot transition"
                                        placeholder="Minimum 6 characters"
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                    <button type="button" onClick={() => setIsChangingPassword(false)} className="px-5 py-2 rounded-full text-green-mid hover:bg-gray-100">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-green-deep text-white rounded-full hover:bg-pink-hot">Update</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Universal Edit/Create Form Modal */}
            <AnimatePresence>
                {isEditing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="bg-white rounded-[2rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif text-green-deep capitalize">{currentData.id ? 'Edit' : 'Create'} {editingType}</h2>
                                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 transition"><X size={24} /></button>
                            </div>

                            <form onSubmit={handleSave} className="space-y-5">
                                {/* -- Image Uploader -- */}
                                <div className="mb-4">
                                    <label className="block text-sm mb-1 text-green-mid font-medium">Cover Image</label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative flex-shrink-0">
                                            {(currentData.image_url || currentData.image) ? (
                                                <img src={currentData.image_url || currentData.image} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <ImageIcon size={24} className="text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex-grow">
                                            <input
                                                type="file"
                                                accept="image/webp"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;

                                                    if (file.type !== 'image/webp') {
                                                        alert('Error: Please upload images in WEBP format only to ensure fast loading times.');
                                                        e.target.value = ''; // Reset input
                                                        return;
                                                    }

                                                    try {
                                                        const res = await api.uploadImage(file);
                                                        if (res.url) {
                                                            setCurrentData({
                                                                ...currentData,
                                                                image_url: res.url,
                                                                image: res.url // Workshop compatibility
                                                            });
                                                        }
                                                    } catch (err) {
                                                        alert("Failed to upload image. " + (err.message || ''));
                                                    }
                                                }}
                                                className="w-full px-4 py-2 rounded-xl border bg-gray-50 text-sm outline-none focus:border-pink-hot transition"
                                            />
                                            <p className="text-xs text-gray-500 mt-2">Max 2MB. WEBP format only.</p>
                                        </div>
                                    </div>
                                </div>

                                {editingType === 'workshop' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="col-span-2"><label className="block text-sm mb-1 text-green-mid">Title</label><input type="text" required value={currentData.title || ''} onChange={e => setCurrentData({ ...currentData, title: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50" /></div>
                                            <div><label className="block text-sm mb-1">Category</label><input type="text" value={currentData.category || ''} onChange={e => setCurrentData({ ...currentData, category: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50" /></div>
                                            <div><label className="block text-sm mb-1">Price</label><input type="text" value={currentData.price || ''} onChange={e => setCurrentData({ ...currentData, price: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50" /></div>
                                            <div><label className="block text-sm mb-1">Spots / Group Size</label><input type="text" value={currentData.spots || currentData.group_size || ''} onChange={e => setCurrentData({ ...currentData, spots: e.target.value, group_size: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50" /></div>
                                            <div className="col-span-2"><label className="block text-sm mb-1">Description</label><textarea rows={3} value={currentData.description || ''} onChange={e => setCurrentData({ ...currentData, description: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50 resize-none" /></div>
                                        </div>
                                    </>
                                )}

                                {editingType === 'blog' && (
                                    <>
                                        <div className="space-y-4">
                                            <div><label className="block text-sm mb-1 text-green-mid">Title</label><input type="text" required value={currentData.title || ''} onChange={e => setCurrentData({ ...currentData, title: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50" /></div>
                                            <div><label className="block text-sm mb-1 text-green-mid">Excerpt</label><textarea rows={2} required value={currentData.excerpt || ''} onChange={e => setCurrentData({ ...currentData, excerpt: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50 resize-none" /></div>
                                            <div>
                                                <label className="block text-sm mb-1 text-green-mid">Full Content (Supports HTML/Text)</label>
                                                <textarea rows={8} required value={currentData.content || ''} onChange={e => setCurrentData({ ...currentData, content: e.target.value })} className="w-full px-4 py-2 rounded-xl border bg-gray-50 font-mono text-sm" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                                    <button type="button" onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-full text-green-mid hover:bg-gray-100">Cancel</button>
                                    <button type="submit" className="px-6 py-2 bg-green-deep text-white rounded-full flex items-center gap-2 hover:bg-pink-hot"><Save size={16} /> Save Changes</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminPage;
