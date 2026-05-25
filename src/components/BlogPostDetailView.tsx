import React from 'react';
import { BlogPost } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Send } from 'lucide-react';
import { BLOG_POSTS } from '../data';

interface BlogPostDetailViewProps {
  post: BlogPost;
  onBack: () => void;
  onPostClick: (id: string) => void;
}

export default function BlogPostDetailView({ post, onBack, onPostClick }: BlogPostDetailViewProps) {
  // Gợi ý những bài viết khác liên quan
  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  // Helper function để hiển thị văn bản có định dạng cơ bản của Markdown mà không cần dùng thư viện ngoài lo lắng lỗi build
  const renderFormattedContent = (txt: string) => {
    return txt.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-2xl font-bold text-white font-display mt-8 mb-4 tracking-tight leading-snug">
            {paragraph.replace('### ', '')}
          </h3>
        );
      }
      if (paragraph.startsWith('- ')) {
        return (
          <ul key={index} className="list-disc pl-6 space-y-1 my-4 text-slate-300">
            {paragraph.split('\n').map((li, liIdx) => (
              <li key={liIdx}>{li.replace('- ', '')}</li>
            ))}
          </ul>
        );
      }
      // Thay thế **text** bằng <strong>text</strong>
      const boldRegex = /\*\*(.*?)\*\*/g;
      let htmlContent = paragraph;
      let match;
      const parts = [];
      let lastIndex = 0;

      while ((match = boldRegex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          parts.push(paragraph.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index} className="text-white font-semibold">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }
      if (lastIndex < paragraph.length) {
        parts.push(paragraph.substring(lastIndex));
      }

      return (
        <p key={index} className="text-slate-300 text-lg leading-relaxed mb-6">
          {parts.length > 0 ? parts : paragraph}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 px-4 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 transition-all active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Quay lại mục Blog</span>
      </button>

      {/* Hero Category & Title */}
      <div className="max-w-4xl mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 animate-pulse">
          <Tag className="w-3 h-3" />
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author metadata information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-slate-800"
            />
            <div>
              <div className="text-slate-200 font-medium">{post.author.name}</div>
              <div className="text-xs text-slate-500">{post.author.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column content body */}
        <div className="lg:col-span-8">
          {/* Cover image banner */}
          <div className="rounded-3xl overflow-hidden border border-slate-800 mb-10 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-[320px] sm:h-[420px] object-cover"
            />
          </div>

          {/* Formatted body content */}
          <article className="prose prose-invert max-w-none mb-12">
            {renderFormattedContent(post.content)}
          </article>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-900 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-xl text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column sidebar info & related items */}
        <div className="lg:col-span-4 space-y-8">
          {/* Share widget */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/85 p-6">
            <h4 className="text-sm font-semibold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-blue-400" />
              Chia sẻ bài viết này
            </h4>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:text-blue-400 text-sm font-medium transition-all active:scale-95 cursor-pointer">
                <Facebook className="w-4 h-4 text-blue-500" />
                Facebook
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800/80 hover:text-blue-400 text-sm font-medium transition-all active:scale-95 cursor-pointer">
                <Linkedin className="w-4 h-4 text-blue-500" />
                LinkedIn
              </button>
            </div>
          </div>

          {/* Author detailed box */}
          <div className="bg-slate-900/40 rounded-2xl border border-slate-800/85 p-6">
            <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-4">
              Người thực hiện bài viết
            </h4>
            <div className="flex items-start gap-4 mb-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border border-slate-800 flex-shrink-0"
              />
              <div>
                <h5 className="font-bold text-white text-base leading-snug">{post.author.name}</h5>
                <p className="text-xs text-blue-400">{post.author.role}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Trang thông tin tổng hợp kiến thức chuyên sâu dưới sự phản biện và biên tập của ban chỉ đạo chuyển đổi số UPhostix.
            </p>
          </div>

          {/* Related blog posts section */}
          <div className="bg-slate-900/20 rounded-2xl border border-slate-800/85 p-6 space-y-4">
            <h4 className="text-sm font-semibold uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-800">
              Bài viết nổi bật khác
            </h4>
            <div className="space-y-4">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.id}
                  onClick={() => {
                    onPostClick(rPost.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex gap-4 items-center cursor-pointer pb-4 border-b border-slate-800/60 last:border-0 last:pb-0"
                >
                  <img
                    src={rPost.image}
                    alt={rPost.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-slate-800 flex-shrink-0 group-hover:scale-102 transition-transform"
                  />
                  <div>
                    <h5 className="text-white text-xs font-bold leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                      {rPost.title}
                    </h5>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      {rPost.date} • {rPost.readTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
