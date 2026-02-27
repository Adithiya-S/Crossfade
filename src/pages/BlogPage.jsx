import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, Send } from 'lucide-react';
import api from '../services/api';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Single Blog State
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ author_name: '', content: '' });
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    const [commentSuccess, setCommentSuccess] = useState(false);

    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await api.getBlogs();
                setBlogs(data);

                if (blogId) {
                    const found = data.find(b => b.id == blogId);
                    setSelectedBlog(found);
                    if (found) {
                        const fetchedComments = await api.getComments(found.id);
                        setComments(fetchedComments);
                    }
                }
            } catch (err) {
                console.error("Failed to load blogs", err);
            }
            setIsLoading(false);
        };
        fetchBlogs();
    }, [blogId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmittingComment(true);
        try {
            await api.saveComment({
                blog_id: selectedBlog.id,
                author_name: newComment.author_name,
                content: newComment.content
            });
            setCommentSuccess(true);
            setNewComment({ author_name: '', content: '' });
            setTimeout(() => setCommentSuccess(false), 5000);
        } catch (err) {
            alert("Failed to post comment. Please try again.");
        }
        setIsSubmittingComment(false);
    };

    if (isLoading) {
        return <div className="pt-40 min-h-screen text-center font-serif text-2xl text-green-mid">Loading...</div>;
    }

    // --- LIST VIEW ---
    if (!blogId || !selectedBlog) {
        return (
            <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full">
                    <span className="font-disco text-pink-hot tracking-widest text-xl mb-6 block text-center uppercase">Journal</span>
                    <h1 className="text-4xl md:text-6xl font-serif text-green-deep mb-16 text-center leading-tight">
                        Studio Notes
                    </h1>

                    {blogs.length === 0 ? (
                        <div className="text-center text-green-mid font-serif">No articles published yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <a key={blog.id} href={`/blog?id=${blog.id}`} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col h-full">
                                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                                        {blog.image_url ? (
                                            <img src={blog.image_url} alt="" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full bg-green-light/20 flex items-center justify-center text-green-mid">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <h2 className="text-2xl font-serif text-green-deep mb-3 group-hover:text-pink-hot transition-colors">{blog.title}</h2>
                                        <p className="text-green-mid text-sm mb-6 flex-grow">{blog.excerpt}</p>
                                        <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Read Article →</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        );
    }

    // --- SINGLE BLOG VIEW ---
    return (
        <div className="pt-32 pb-24 px-6 bg-background min-h-screen flex flex-col items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full">
                <a href="/blog" className="inline-flex items-center gap-2 text-green-mid hover:text-pink-hot transition-colors mb-10 font-medium">
                    <ArrowLeft size={16} /> Back to Journal
                </a>

                <h1 className="text-4xl md:text-6xl font-serif text-green-deep mb-6 leading-tight">
                    {selectedBlog.title}
                </h1>

                {selectedBlog.image_url && (
                    <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-md">
                        <img src={selectedBlog.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="prose prose-lg mx-auto text-green-deep/90 font-sans mb-20" dangerouslySetInnerHTML={{ __html: selectedBlog.content }}></div>

                {/* --- COMMENTS SECTION --- */}
                <div className="border-t border-gray-200 pt-16">
                    <h3 className="text-3xl font-serif text-green-deep mb-10 flex items-center gap-3">
                        <MessageSquare className="text-pink-hot" /> Comments ({comments.length})
                    </h3>

                    {/* Comment List */}
                    <div className="space-y-6 mb-12">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                        ) : (
                            comments.map((comment) => (
                                <div key={comment.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between items-baseline mb-3">
                                        <h4 className="font-serif text-lg text-green-deep">{comment.author_name}</h4>
                                        <span className="text-xs text-gray-400">{new Date(comment.created_at || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <p className="text-green-mid">{comment.content}</p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Leave a Comment Form */}
                    <div className="bg-green-light/10 p-8 rounded-3xl border border-green-light/30">
                        <h4 className="text-2xl font-serif text-green-deep mb-6">Leave a Reply</h4>
                        {commentSuccess ? (
                            <div className="bg-green-100 text-green-800 p-4 rounded-xl flex items-center gap-3">
                                <span>🎉</span> Your comment was submitted successfully and is awaiting moderation!
                            </div>
                        ) : (
                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-green-mid mb-2">Your Name</label>
                                    <input
                                        required type="text"
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-pink-hot outline-none"
                                        placeholder="Jane Doe"
                                        value={newComment.author_name}
                                        onChange={e => setNewComment({ ...newComment, author_name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-green-mid mb-2">Comment</label>
                                    <textarea
                                        required rows="4"
                                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-pink-hot outline-none"
                                        placeholder="What are your thoughts?"
                                        value={newComment.content}
                                        onChange={e => setNewComment({ ...newComment, content: e.target.value })}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingComment}
                                    className="px-8 py-3 bg-green-deep text-white rounded-full font-serif text-lg hover:bg-pink-hot transition-colors disabled:opacity-70 flex items-center gap-2"
                                >
                                    <Send size={18} /> {isSubmittingComment ? 'Sending...' : 'Post Comment'}
                                </button>
                                <p className="text-xs text-gray-500 mt-2">Note: Comments are moderated and may take a moment to appear publicly.</p>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPage;
