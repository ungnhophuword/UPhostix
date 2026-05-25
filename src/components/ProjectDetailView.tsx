import React from 'react';
import { Project } from '../types';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, ExternalLink, Briefcase, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onContactClick: () => void;
}

export default function ProjectDetailView({ project, onBack, onContactClick }: ProjectDetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-slate-400 hover:text-white mb-8 px-4 py-2 rounded-xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 transition-all active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Quay lại danh sách</span>
      </button>

      {/* Header Profile Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
        <div className="lg:col-span-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4 animate-pulse">
            <Tag className="w-3 h-3" />
            {project.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight leading-tight mb-6">
            {project.title}
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        {/* Floating parameters card */}
        <div className="bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-4">
            <h3 className="text-white font-semibold font-display pb-3 border-b border-slate-800">Thông tin dự án</h3>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-blue-400" /> Khách hàng</span>
              <span className="font-medium text-slate-200">{project.client || 'UPhostix Client'}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400" /> Thời gian</span>
              <span className="font-medium text-slate-200">{project.duration || '2 tháng'}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-blue-400" /> Phân khúc</span>
              <span className="font-medium text-slate-200">{project.category} Marketing</span>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6 flex flex-col gap-3">
            {project.stats && (
              <div className="flex items-center gap-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-400">{project.stats.label}</div>
                  <div className="text-lg font-bold text-white font-display">{project.stats.value}</div>
                </div>
              </div>
            )}
            <button
              onClick={onContactClick}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-sm font-medium transition-all active:scale-95 shadow-md shadow-blue-500/10"
            >
              Hợp tác dự án tương tự
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Image display */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 mb-16 shadow-2xl group">
        <img
          src={project.image}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="w-full h-[300px] sm:h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
      </div>

      {/* Challenge, Solution, Results sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-10">
          {/* Challenge Box */}
          <div className="bg-slate-900/30 rounded-2xl border border-slate-800/80 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-6 bg-red-400 rounded-full"></span>
              Thử Thách & Yêu Cầu
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {project.challenge || 'UPhostix nhận được yêu cầu phát triển giải pháp tối ưu mới từ đối tác.'}
            </p>
          </div>

          {/* Solution Box */}
          <div className="bg-slate-900/30 rounded-2xl border border-slate-800/80 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-4 flex items-center gap-3">
              <span className="w-2 h-6 bg-blue-400 rounded-full"></span>
              Giải Pháp Từ UPhostix
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {project.solution || 'Đội ngũ kỹ sư, nghiên cứu và thiết kế đã áp dụng công nghệ mới nhất để mang lại hiệu năng cao.'}
            </p>
          </div>
        </div>

        {/* Results Container card */}
        <div>
          <div className="bg-gradient-to-b from-blue-950/20 to-slate-950 rounded-2xl border border-blue-500/20 p-6 sm:p-8 h-full shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-blue-400" />
              Kết Quả Đạt Được
            </h2>
            <ul className="space-y-4">
              {project.results ? (
                project.results.map((result, idx) => (
                  <li key={idx} className="flex gap-3 text-sm sm:text-base text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{result}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Tốc độ tải trang cải thiện vượt bậc dưới 1 giây.</span>
                  </li>
                  <li className="flex gap-3 text-slate-300">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>Chỉ số tin cậy đo lường của khách hàng tăng trưởng mạnh mẽ.</span>
                  </li>
                </>
              )}
            </ul>

            {/* Bottom Tech Badge tag cloud */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <h4 className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-3">Công nghệ áp dụng</h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
