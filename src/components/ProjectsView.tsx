import React, { useState } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import ProjectDetailView from './ProjectDetailView';

interface ProjectsViewProps {
  projects?: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
  setCurrentTab: (tab: string) => void;
}

export default function ProjectsView({
  projects = PROJECTS,
  selectedProjectId,
  onSelectProject,
  setCurrentTab
}: ProjectsViewProps) {
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả Dự Án' },
    { id: 'Web', label: 'Thiết Kế Web' },
    { id: 'Mobile', label: 'Ứng Dụng Di Động' },
    { id: 'Branding', label: 'Thương Hiệu Số' },
    { id: 'SEO', label: 'Tối Ưu SEO/Marketing' }
  ];

  const techOptions = ['all', 'Next.js', 'React', 'SEO', 'TailwindCSS', 'Motion', 'GraphQL', 'Brand Identity', 'Content Strategy'];

  // Logic filter & search
  const filteredProjects = projects.filter((proj) => {
    const matchesCategory = filter === 'all' || proj.category === filter;
    
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech = selectedTech === 'all' || proj.tags.includes(selectedTech);

    let matchesDuration = true;
    if (durationFilter !== 'all') {
      const months = parseFloat(proj.duration || '0');
      if (durationFilter === 'short') {
        matchesDuration = months < 2;
      } else if (durationFilter === 'medium') {
        matchesDuration = months >= 2 && months <= 3;
      } else if (durationFilter === 'long') {
        matchesDuration = months > 3;
      }
    }

    return matchesCategory && matchesSearch && matchesTech && matchesDuration;
  });

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // If a project is selected, render its detail page
  if (selectedProject) {
    return (
      <ProjectDetailView
        project={selectedProject}
        onBack={() => onSelectProject(null)}
        onContactClick={() => {
          onSelectProject(null);
          setCurrentTab('contact');
        }}
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
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          Chứng Chỉ Chất Lượng Đỉnh Cao
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight mb-4"
        >
          Kho Dự Án <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">Thực Chiến</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-lg sm:text-xl"
        >
          Khám phá cách chúng tôi đồng hành giúp các đối tác bứt phá lưu lượng truy cập, tạo ấn tượng nhận diện thương hiệu số độc nhất vô nhị.
        </motion.p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12 border-b border-slate-800/80 pb-8 space-y-4 lg:space-y-0">
        {/* Horizontal scrollable buttons and sub-filters */}
        <div className="flex flex-col gap-3.5 w-full lg:w-auto text-left">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none w-full">
            <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0 mr-1 hidden sm:block" />
            <div className="flex items-center gap-2">
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
          </div>

          {/* Sub-filters for Tech and Duration */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            {/* Tech filter dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl text-left">
              <span className="text-slate-500 font-medium">Công Nghệ:</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-950">Tất cả mẫu</option>
                {techOptions.map(t => (
                  <option key={t} value={t} className="bg-slate-950 text-left">{t === 'all' ? 'Tất cả' : t}</option>
                ))}
              </select>
            </div>

            {/* Duration filter dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-xl text-left">
              <span className="text-slate-500 font-medium">Thời Gian:</span>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="bg-transparent text-slate-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-slate-950">Mọi độ dài</option>
                <option value="short" className="bg-slate-950">Dưới 2 tháng</option>
                <option value="medium" className="bg-slate-950">Từ 2 đến 3 tháng</option>
                <option value="long" className="bg-slate-950">Trên 3 tháng</option>
              </select>
            </div>

            {/* Clear Filters Button if any is non-default */}
            {(selectedTech !== 'all' || durationFilter !== 'all' || filter !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setFilter('all');
                  setSelectedTech('all');
                  setDurationFilter('all');
                  setSearchQuery('');
                }}
                className="text-blue-400 hover:text-blue-300 font-bold ml-1 transition-colors cursor-pointer"
              >
                Xóa tất cả bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Live Search block */}
        <div className="relative w-full lg:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên, công nghệ, tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500/80 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-300 placeholder-slate-500 transition-colors"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {/* Grid of Results */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredProjects.map((proj, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={proj.id}
                id={`project-card-${proj.id}`}
                onClick={() => onSelectProject(proj.id)}
                className="group bg-slate-900/40 rounded-3xl border border-slate-800/80 overflow-hidden cursor-pointer hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300"
              >
                {/* Image top card with dark shade overlay */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                  {/* Left bottom badge stats */}
                  {proj.stats && (
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-slate-900/95 border border-slate-800 backdrop-blur-md">
                      <span className="text-xs text-slate-400 font-medium mr-1.5">{proj.stats.label}:</span>
                      <span className="text-sm font-bold text-white font-display">{proj.stats.value}</span>
                    </div>
                  )}

                  {/* Right bottom Category badge */}
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 backdrop-blur-sm">
                    {proj.category}
                  </div>
                </div>

                {/* Info block bottom card */}
                <div className="p-6">
                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-900 text-xs text-slate-400 border border-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-blue-400 transition-colors mb-2 leading-tight">
                    {proj.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
                    {proj.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-blue-400 font-semibold group-hover:text-blue-300">
                    <span className="inline-flex items-center gap-1">
                      Xem chi tiết dự án thực tế
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            <p className="text-slate-400 text-lg mb-2">Không tìm thấy dự án nào tương thích.</p>
            <p className="text-sm text-slate-500">Thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
