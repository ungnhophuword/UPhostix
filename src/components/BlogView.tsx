import React, { useState } from 'react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Clock, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import BlogPostDetailView from './BlogPostDetailView';

interface BlogViewProps {
  posts?: BlogPost[];
  selectedBlogPostId: string | null;
  onSelectBlogPost: (id: string | null) => void;
}

export default function BlogView({ posts = BLOG_POSTS, selectedBlogPostId, onSelectBlogPost }: BlogViewProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'Tất Cả Bài Viết' },
    { id: 'Design', label: 'Thiết Kế UI/UX' },
    { id: 'SEO', label: 'SEO & Marketing' },
    { id: 'Tech', label: 'Lập Trình & Công Nghệ' }
  ];

  // Filter & Search logic.
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = filter === 'all' || post.category === filter;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const selectedPost = posts.find((p) => p.id === selectedBlogPostId);

  // If a post is selected, render the detail view
  if (selectedPost) {
    return (
      <BlogPostDetailView
        post={selectedPost}
        onBack={() => onSelectBlogPost(null)}
        onPostClick={(id) => onSelectBlogPost(id)}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 min-h-[80vh]">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4"
        >
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          Kiến Thức Số Thực Chiến
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4"
        >
          Blog & <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">Xu Hướng Số</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl"
        >
          Nơi chia sẻ góc nhìn chuyên môn, cẩm nang SEO, bí kíp xây dựng hạ tầng web đỉnh cao từ các Senior Developer và Creative Director của UPhostix.
        </motion.p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 border-b border-slate-800/80 pb-8">
        {/* Horizontal categories list */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-3 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer ${
                filter === cat.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/15'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search block */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Tìm bài viết, chủ đề, mảng..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-300 placeholder-slate-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Grid List */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={post.id}
                id={`blog-card-${post.id}`}
                onClick={() => onSelectBlogPost(post.id)}
                className="group bg-slate-900/40 rounded-3xl border border-slate-800/80 overflow-hidden cursor-pointer hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 flex flex-col h-full"
              >
                {/* Image header */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  {/* Left bottom badge */}
                  <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 backdrop-blur-sm">
                    {post.category}
                  </div>
                </div>

                {/* Body Content info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Date/Read time specs */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold font-display text-white group-hover:text-blue-400 transition-colors mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Author & click actions */}
                  <div className="pt-4 border-t border-slate-850/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover border border-slate-800"
                      />
                      <span className="text-xs text-slate-300 font-medium">
                        {post.author.name}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs text-blue-400 font-bold group-hover:text-blue-300 transition-colors">
                      Đọc tiếp
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-slate-900/20 rounded-2xl border border-slate-800/60"
          >
            <p className="text-slate-400 text-lg mb-2">Không tìm thấy bài viết nào phù hợp.</p>
            <p className="text-sm text-slate-500">Mời bạn nhập từ khóa khác hoặc điều chỉnh bộ lọc.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
