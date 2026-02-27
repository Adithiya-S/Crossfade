// src/services/api.js
// This service seamlessly switches between LocalStorage mock data (for npm run dev) 
// and the actual PHP backend (when deployed on Hostinger)

const IS_PROD = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const API_BASE = '/api';

// --- Helper for Mock Data ---
import wheelImg from '../assets/Workshops/IMG_5876.webp';
import handImg from '../assets/Workshops/IMG_4553.webp';
import partyImg from '../assets/Workshops/IMG_5830.webp';
import paintImg from '../assets/Workshops/IMG_5909.webp';

const SEED_DATA = {
    mock_workshops: [
        { id: 1, title: "Introduction to Wheel Throwing", category: "Beginner Friendly", description: "Experience the magic of the wheel. Learn the basics of centering, opening, and pulling walls to create your very first cylinder or bowl.", duration: "2.5 Hours", groupSize: "Max 4 People", price: "3000", image_url: wheelImg, features: ["One-on-one guidance", "All materials included", "Take home 2 fired pieces"], active: true },
        { id: 2, title: "Hand-Building Basics", category: "Relaxing & Sculptural", description: "Slow down and sculpt with your hands. pinch, coil, and slab your way to a unique mug, vase, or planter. No machinery, just you and the clay.", duration: "3 Hours", groupSize: "Max 8 People", price: "2500", image_url: handImg, features: ["Learn 3 distinct techniques", "Texture & pattern tools", "Your choice of glaze"], active: true },
        { id: 3, title: "Paint & Glaze", category: "Creative & Chill", description: "Skip the messy part and get straight to decorating. Choose from our pre-fired bisque ware and paint your own designs with professional glazes.", duration: "2 Hours", groupSize: "Max 10 People", price: "1200", image_url: paintImg, features: ["Wide selection of bisque", "Food-safe glazes", "Relaxing atmosphere"], active: true },
        { id: 4, title: "Private Parties & Events", category: "Groups", description: "Birthdays, team bonding, or just a fun Sunday with the girls. We bring the studio to you, or host you at our partner venues.", duration: "Custom", groupSize: "10+ People", price: "Custom", image_url: partyImg, features: ["Customized theme", "Music & vibes", "Catering add-ons available"], active: true }
    ],
    mock_blogs: [
        { id: 1, title: "Starting Pottery for the First Time", excerpt: "Working with clay is both simple and unexpectedly absorbing. You do not need artistic training to begin.", content: `<p class="lead text-xl mb-8 leading-relaxed">Working with clay is both simple and unexpectedly absorbing. You do not need artistic training or prior experience to begin. What matters most is a willingness to try, observe, and enjoy the process.</p><p class="mb-12">Here are a few things that can help you feel prepared for your first session.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">1.</span> You do not need any experience</h3><p class="mb-6">Most participants are complete beginners. Sessions are guided step by step, with demonstrations and individual support throughout. There is no expectation to produce a perfect piece on your first attempt.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">2.</span> Clay behaves differently than you expect</h3><p class="mb-6">It is soft, responsive, and sometimes unpredictable. Pieces may lean, collapse, or change shape as you work. This is part of the material’s nature and often where the most interesting forms emerge.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">3.</span> The process is slower than most creative activities</h3><p class="mb-6">Pottery rewards patience. Shaping, refining, and finishing each stage takes time. Many people find this pace calming and immersive, offering a rare pause from fast daily routines.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">4.</span> Breakage can happen</h3><p class="mb-6">Clay remains fragile until it has been fired in the kiln. Occasionally, pieces may crack, warp, or break during drying or firing due to natural stresses in the material. While every effort is made to handle work carefully, this is an inherent part of ceramics and cannot always be predicted or prevented.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">5.</span> You will get a little messy</h3><p class="mb-6">Working with clay is a tactile experience. Hands, tools, and surfaces will carry traces of it. Aprons are provided, but comfortable clothing is recommended.</p><h3 class="text-2xl font-serif text-green-deep mt-10 mb-4 flex items-center gap-3"><span class="text-pink-hot">6.</span> The experience matters more than the outcome</h3><p class="mb-12">Your first piece may not be perfectly symmetrical or polished, and that is entirely normal. What most people remember is the quiet satisfaction of making something with their own hands.</p><div class="bg-green-light/10 p-8 rounded-2xl border border-green-light/30 text-center mt-12"><p class="text-xl font-serif text-green-deep italic">Arrive with curiosity. Leave with a deeper appreciation for the process of making.</p></div>`, image_url: wheelImg, created_at: "2024-03-01 10:00:00" }
    ],
    mock_comments: [
        { id: 1, blog_id: 1, author_name: "Sarah G.", content: "This guide was so helpful! I was nervous about breaking things but now I know it's normal.", is_approved: true, created_at: "2024-03-02 14:30:00" },
        { id: 2, blog_id: 1, author_name: "Mike T.", content: "Can't wait for my first workshop this weekend.", is_approved: true, created_at: "2024-03-03 09:15:00" }
    ]
};

const DATA_VERSION = 'v3';

const getMockData = (key, defaultData) => {
    if (localStorage.getItem('mock_data_version') !== DATA_VERSION) {
        localStorage.removeItem('mock_workshops');
        localStorage.removeItem('mock_blogs');
        localStorage.removeItem('mock_comments');
        localStorage.setItem('mock_data_version', DATA_VERSION);
    }

    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);

    // If no data exists, seed it to prevent empty sites
    if (SEED_DATA[key]) {
        localStorage.setItem(key, JSON.stringify(SEED_DATA[key]));
        return SEED_DATA[key];
    }
    return defaultData;
};

const setMockData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// --- API Service ---
const api = {
    // ---- AUTH ----
    login: async (username, password) => {
        if (!IS_PROD) {
            // Mock Login (admin/admin123)
            if (username === 'admin' && password === 'admin123') {
                const token = 'mock-jwt-token-123';
                localStorage.setItem('adminToken', token);
                return { success: true, token };
            }
            throw new Error('Invalid credentials');
        }

        const res = await fetch(`${API_BASE}/login.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        localStorage.setItem('adminToken', data.token);
        return data;
    },

    logout: () => {
        localStorage.removeItem('adminToken');
    },

    getToken: () => localStorage.getItem('adminToken'),

    getHeaders: () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }),

    // ---- WORKSHOPS ----
    getWorkshops: async () => {
        if (!IS_PROD) return getMockData('mock_workshops', []);
        const res = await fetch(`${API_BASE}/workshops.php`);
        return await res.json();
    },

    saveWorkshop: async (workshop) => {
        if (!IS_PROD) {
            let workshops = getMockData('mock_workshops', []);
            if (workshop.id && workshops.find(w => w.id === workshop.id)) {
                workshops = workshops.map(w => w.id === workshop.id ? workshop : w);
            } else {
                workshop.id = Date.now();
                workshops.push(workshop);
            }
            setMockData('mock_workshops', workshops);
            return { success: true };
        }

        const isUpdate = workshop.id && typeof workshop.id === 'number';
        const url = isUpdate ? `${API_BASE}/workshops.php?id=${workshop.id}` : `${API_BASE}/workshops.php`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: api.getHeaders(),
            body: JSON.stringify(workshop)
        });
        return await res.json();
    },

    deleteWorkshop: async (id) => {
        if (!IS_PROD) {
            let workshops = getMockData('mock_workshops', []);
            setMockData('mock_workshops', workshops.filter(w => w.id !== id));
            return { success: true };
        }
        const res = await fetch(`${API_BASE}/workshops.php?id=${id}`, {
            method: 'DELETE',
            headers: api.getHeaders()
        });
        return await res.json();
    },

    // ---- BLOGS ----
    getBlogs: async () => {
        if (!IS_PROD) return getMockData('mock_blogs', []);
        const res = await fetch(`${API_BASE}/blogs.php`);
        return await res.json();
    },

    saveBlog: async (blog) => {
        if (!IS_PROD) {
            let blogs = getMockData('mock_blogs', []);
            if (blog.id && blogs.find(b => b.id === blog.id)) {
                blogs = blogs.map(b => b.id === blog.id ? blog : b);
            } else {
                blog.id = Date.now();
                blogs.push(blog);
            }
            setMockData('mock_blogs', blogs);
            return { success: true };
        }

        const isUpdate = blog.id && typeof blog.id === 'number';
        const url = isUpdate ? `${API_BASE}/blogs.php?id=${blog.id}` : `${API_BASE}/blogs.php`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: api.getHeaders(),
            body: JSON.stringify(blog)
        });
        return await res.json();
    },

    deleteBlog: async (id) => {
        if (!IS_PROD) {
            let blogs = getMockData('mock_blogs', []);
            setMockData('mock_blogs', blogs.filter(b => b.id !== id));
            return { success: true };
        }
        const res = await fetch(`${API_BASE}/blogs.php?id=${id}`, {
            method: 'DELETE',
            headers: api.getHeaders()
        });
        return await res.json();
    },

    // ---- COMMENTS ----
    getComments: async (blogId = null, viewAsAdmin = false) => {
        if (!IS_PROD) {
            let comments = getMockData('mock_comments', []);
            if (blogId) comments = comments.filter(c => c.blog_id == blogId);
            if (!viewAsAdmin) comments = comments.filter(c => c.is_approved);
            return comments;
        }

        const params = new URLSearchParams();
        if (blogId) params.append('blog_id', blogId);
        if (viewAsAdmin) params.append('admin', 'true');

        const headers = viewAsAdmin ? api.getHeaders() : {};
        const res = await fetch(`${API_BASE}/comments.php?${params.toString()}`, { headers });
        return await res.json();
    },

    saveComment: async (comment) => {
        if (!IS_PROD) {
            let comments = getMockData('mock_comments', []);
            comment.id = Date.now();
            comment.is_approved = false;
            comments.push(comment);
            setMockData('mock_comments', comments);
            return { success: true };
        }
        const res = await fetch(`${API_BASE}/comments.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comment)
        });
        return await res.json();
    },

    approveComment: async (id, isApproved) => {
        if (!IS_PROD) {
            let comments = getMockData('mock_comments', []);
            comments = comments.map(c => c.id === id ? { ...c, is_approved: isApproved } : c);
            setMockData('mock_comments', comments);
            return { success: true };
        }
        const res = await fetch(`${API_BASE}/comments.php?id=${id}`, {
            method: 'PUT',
            headers: api.getHeaders(),
            body: JSON.stringify({ is_approved: isApproved })
        });
        return await res.json();
    },

    deleteComment: async (id) => {
        if (!IS_PROD) {
            let comments = getMockData('mock_comments', []);
            setMockData('mock_comments', comments.filter(c => c.id !== id));
            return { success: true };
        }
        const res = await fetch(`${API_BASE}/comments.php?id=${id}`, {
            method: 'DELETE',
            headers: api.getHeaders()
        });
        return await res.json();
    },

    // ---- UPLOADS ----
    uploadImage: async (file) => {
        if (!IS_PROD) {
            // Mock upload by converting to Base64 and storing
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({ success: true, url: reader.result });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch(`${API_BASE}/upload.php`, {
            method: 'POST',
            // Fetch handles multipart boundaries automatically when given FormData
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: formData
        });
        return await res.json();
    }
};

export default api;
