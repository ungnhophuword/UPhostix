import React, { useState } from 'react';
import { Project, BlogPost } from '../types';
import { motion } from 'motion/react';
import { 
  Lock, KeyRound, Sparkles, Plus, Trash2, BookOpen, 
  Briefcase, ArrowRight, Layout, Heading, Image as ImageIcon, 
  Tag, Clock, User, LogOut, CheckCircle, FileText, AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AdminViewProps {
  projects: Project[];
  onAddProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  blogPosts: BlogPost[];
  onAddBlogPost: (b: BlogPost) => void;
  onDeleteBlogPost: (id: string) => void;
}

export default function AdminView({
  projects,
  onAddProject,
  onDeleteProject,
  blogPosts,
  onAddBlogPost,
  onDeleteBlogPost
}: AdminViewProps) {
  // Authentication states
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('uphostix_admin_auth') === 'true';
  });

  // Current active sub-tab inside admin panel
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'blogs' | 'messages'>('projects');

  // Contact messages submitted (loaded from localStorage)
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('uphostix_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  // Project item form states
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'Web' | 'Mobile' | 'Branding' | 'SEO'>('Web');
  const [projDescription, setProjDescription] = useState('');
  const [projImage, setProjImage] = useState('');
  const [projTags, setProjTags] = useState('');
  const [projLink, setProjLink] = useState('#');
  const [projStatLabel, setProjStatLabel] = useState('Hiệu năng');
  const [projStatVal, setProjStatVal] = useState('99%');
  const [projClient, setProjClient] = useState('');
  const [projDuration, setProjDuration] = useState('2 tháng');
  const [projChallenge, setProjChallenge] = useState('');
  const [projSolution, setProjSolution] = useState('');
  const [projResults, setProjResults] = useState('');

  // Blog post form states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogCategory, setBlogCategory] = useState<'Tech' | 'SEO' | 'Design' | 'Marketing'>('Tech');
  const [blogImage, setBlogImage] = useState('');
  const [blogReadTime, setBlogReadTime] = useState('5 phút đọc');
  const [blogTags, setBlogTags] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogAuthorName, setBlogAuthorName] = useState('Trần Minh Anh');
  const [blogAuthorRole, setBlogAuthorRole] = useState('CEO & Founder');
  const [blogAuthorAvatar, setBlogAuthorAvatar] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDKRCEUr1kxfPWBX44cc9DY72QmGOpqTv1oKQCUp5opUN0zXexKHSRTGLjsItyQfDhT28xAsqZRfNM9GwXpgLDFDB5Wc1q4mabrdnVVBb9hanvJIn0F98gITBAvq1h5cI3FtpRqJXMDZoaNafjnD9r3SVv450X39alKJ8orRl6jcwwIKuaF3A09s4c2awia-pSkfqGUEgUI7-ucT06aZmGQtycsLeXmKIt51ihFmBn12x7ml2nP9wz7y1YGplWDtNj5h1dPeQ2j2MAu');

  // Static preset premium backgrounds for quick image filling
  const presetImages = [
    { name: 'Công nghệ cao', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { name: 'Kinh doanh tối giản', url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { name: 'Thiết kế sáng tạo', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80' },
    { name: 'SEO & Phân tích', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
  ];

  // Preset authors
  const presetAuthors = [
    {
      name: 'Trần Minh Anh',
      role: 'CEO & Founder',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRCEUr1kxfPWBX44cc9DY72QmGOpqTv1oKQCUp5opUN0zXexKHSRTGLjsItyQfDhT28xAsqZRfNM9GwXpgLDFDB5Wc1q4mabrdnVVBb9hanvJIn0F98gITBAvq1h5cI3FtpRqJXMDZoaNafjnD9r3SVv450X39alKJ8orRl6jcwwIKuaF3A09s4c2awia-pSkfqGUEgUI7-ucT06aZmGQtycsLeXmKIt51ihFmBn12x7ml2nP9wz7y1YGplWDtNj5h1dPeQ2j2MAu'
    },
    {
      name: 'Lê Phương Thảo',
      role: 'Creative Director',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6st9GcZbD36SKwpOI3KSMcuWU3NEDXE_pLdKopHYuJjOduzoeVHDqzT4uMWpEmNaEfVftfoTSyo6b9J0xJ3sFonutZ4kD1S5hzY5wSY3MLAuxe01KTWybGBhariOmTxcDCR1UKNba5yJjIgRjt7qkQdHYi2uveNUgzCxyKqNkab_xoolE3auCdWUsUm4d-9DQPvjyhry8YqI-JXDnb2IeQOqlOnVI-gfS6kqE_610buvh6IPGZP_TYJkRM0CyiTSrMD-syFlB-YjN'
    },
    {
      name: 'Nguyễn Đức Việt',
      role: 'Technical Lead',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCyUn4WbQRkkX346g89mt1exTx5Ynp0Htb7V18sftLGmoduMsVSoFUf1qmqnRLVX0a4H7pwCtdp9CTu3vyvxhTYcMFj7ajrOA9WdY8Ab_dp2nB8lJ1lMtmlvg_q4Ii0KCmYEhJvXXAdsY4cy4pp6O6jTx8je4PVCbNBFK5K5xjjxjwjjd96R9LDlzJiwLrus2kA_cysLyxO6uOqHLFcftyyhrxUTln0azmZLsYGCB1mNLDe1o8tGzT-UMNb3hHgq4gAFWDbo05Vm21'
    }
  ];

  // Handle submit authentication passkey
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'uphostix2026') {
      setIsAuthenticated(true);
      localStorage.setItem('uphostix_admin_auth', 'true');
      toast.success('Mã thông hành hợp lệ! Chào mừng trở lại Quản trị viên.');
    } else {
      toast.error('Mã Pin/Mật khẩu không chính xác. Thử lại hoặc dùng: uphostix2026');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('uphostix_admin_auth');
    toast.success('Bạn đã đăng xuất khỏi hệ quản trị.');
  };

  // Handle Create New Project
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDescription.trim()) {
      toast.error('Vui lòng điền đủ Tiêu đề và Mô tả dự án.');
      return;
    }

    const defaultImg = projImage.trim() || presetImages[0].url;

    const newProj: Project = {
      id: 'proj_' + Date.now(),
      title: projTitle.trim(),
      category: projCategory,
      description: projDescription.trim(),
      image: defaultImg,
      tags: projTags ? projTags.split(',').map(t => t.trim()).filter(Boolean) : ['Next.js', 'TailwindCSS'],
      link: projLink.trim() || '#',
      stats: {
        label: projStatLabel.trim() || 'Tốc độ',
        value: projStatVal.trim() || '0.5s'
      },
      client: projClient.trim() || 'Khách hàng đối tác',
      duration: projDuration.trim() || '2 tháng',
      challenge: projChallenge.trim() || 'Đặt ra bài toán tối ưu hạ tầng bền vững, cải thiện đáng kể tốc độ tải trang Core Web Vitals tối ưu SEO.',
      solution: projSolution.trim() || 'Cấu trúc hệ thống website tĩnh React + Next.js kết hợp với CDN Cloudflare bảo mật.',
      results: projResults 
        ? projResults.split('\n').map(r => r.trim()).filter(Boolean)
        : [
            'Nâng mức điểm Google Lighthouse đạt 100/100.',
            'Tăng tỷ lệ giữ chân khách hàng tự nhiên hơn 35%.',
            'Giảm chi phí vận hành máy chủ định kỳ xuống mức tối ưu.'
          ]
    };

    onAddProject(newProj);
    toast.success(`Dự án "${projTitle}" đã được tạo và hiển thị lên danh sách!`);

    // Reset Form
    setProjTitle('');
    setProjDescription('');
    setProjImage('');
    setProjTags('');
    setProjLink('#');
    setProjChallenge('');
    setProjSolution('');
    setProjResults('');
  };

  // Handle Create Blog Post
  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogExcerpt.trim() || !blogContent.trim()) {
      toast.error('Vui lòng điền đầy đủ Tiêu đề, Tóm tắt và Nội dung bài viết.');
      return;
    }

    const defaultImg = blogImage.trim() || presetImages[2].url;
    const author = presetAuthors.find(a => a.name === blogAuthorName) || presetAuthors[0];

    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

    const newBlog: BlogPost = {
      id: 'blog_' + Date.now(),
      title: blogTitle.trim(),
      excerpt: blogExcerpt.trim(),
      content: blogContent.trim(),
      category: blogCategory,
      image: defaultImg,
      readTime: blogReadTime.trim() || '5 phút đọc',
      tags: blogTags ? blogTags.split(',').map(t => t.trim()).filter(Boolean) : ['SEO', 'Design'],
      author: {
        name: author.name,
        role: author.role,
        avatar: author.avatar
      },
      date: formattedDate
    };

    onAddBlogPost(newBlog);
    toast.success(`Bài viết "${blogTitle}" đã xuất bản thành công!`);

    // Reset Form
    setBlogTitle('');
    setBlogExcerpt('');
    setBlogContent('');
    setBlogTags('');
    setBlogImage('');
  };

  // Delete message
  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter((m: any) => m.id !== id);
    setMessages(updated);
    localStorage.setItem('uphostix_contacts', JSON.stringify(updated));
    toast.success('Đã xóa thông tin liên hệ được chọn.');
  };

  // ------------------- RENDERING LOGIN VIEW -------------------
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-28 sm:py-36 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/65 backdrop-blur-md rounded-3xl border border-slate-800/90 p-8 shadow-2xl relative"
        >
          {/* Cyber accents decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-6 text-blue-400">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>

          <h1 className="text-2xl font-bold font-display text-white tracking-tight leading-none mb-2">
            Hệ Thống Quản Trị
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mb-6">
            Nhập mã bảo mật để tiếp tục thay đổi nội dung dự án thực chiến và xuất bản Blog.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Mã Pin / Mật Khẩu</label>
              <div className="relative">
                <input
                  required
                  type="password"
                  placeholder="••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/90 border border-slate-800/80 focus:outline-none focus:border-blue-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white tracking-widest placeholder-slate-600 transition-colors"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Note of easy password testing */}
            <div className="bg-blue-500/5 rounded-xl border border-blue-500/10 p-3.5 text-left text-xs text-blue-400/90 flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-slate-200 mb-0.5">Mật khẩu thử nghiệm nhanh:</span>
                Nhập <strong className="text-white font-mono bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/30">uphostix2026</strong> để bẻ khóa trực tiếp.
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all text-center cursor-pointer"
            >
              Tiến Vào Bảng Điều Khiển
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ------------------- RENDERING DASHBOARD VIEW -------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 min-h-[85vh]">
      {/* Admin header information bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <CheckCircle className="w-3 h-3" />
            Đã đăng nhập: Quản Trị Viên
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
            UPhostix Control Hub
          </h1>
          <p className="text-slate-400 text-sm mt-1">Toàn quyền thêm mới, xóa và lưu trữ dữ liệu dự án, blog ngay trên thiết bị của bạn.</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/30 text-slate-400 hover:text-red-400 transition-all text-sm font-medium cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Đăng xuất
        </button>
      </div>

      {/* Dashboard tab selectors */}
      <div className="flex items-center gap-2 border-b border-slate-900 pb-4 mb-8 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('projects')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'projects'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Dự Án Thực Chiến ({projects.length})
        </button>
        <button
          onClick={() => setActiveSubTab('blogs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'blogs'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Nội Dung Blog ({blogPosts.length})
        </button>
        <button
          onClick={() => setActiveSubTab('messages')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
            activeSubTab === 'messages'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
              : 'bg-slate-900/60 text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          Hồ Sơ Yêu Cầu Tư Vấn ({messages.length})
        </button>
      </div>

      {/* ------------------- SECTION 1: PROJECT CONFIGS ------------------- */}
      {activeSubTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* New Project Form */}
          <div className="lg:col-span-5 bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-white text-lg font-bold font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Thêm Dự Án Mới
              </h3>
              <p className="text-slate-400 text-xs mt-1">Dữ liệu sau khi thêm sẽ lập tức hiển thị trên mục "Dự án" của website.</p>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4 text-left text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Tiêu Đề Dự Án *</label>
                  <input
                    required
                    type="text"
                    placeholder="VD: App Sức Khỏe Care"
                    value={projTitle}
                    onChange={(e) => setProjTitle(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Phân Loại *</label>
                  <select
                    value={projCategory}
                    onChange={(e: any) => setProjCategory(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors cursor-pointer"
                  >
                    <option value="Web">Thiết Kế Web</option>
                    <option value="Mobile">Ứng Dụng Di Động</option>
                    <option value="Branding">Thương Hiệu Số</option>
                    <option value="SEO">Tối Ưu SEO/Marketing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Mô Tả Ngắn Dự Án *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Tóm tắt ngắn gọn các nét đặc sắc hữu ích về dự án..."
                  value={projDescription}
                  onChange={(e) => setProjDescription(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                />
              </div>

              {/* Cover URL with fast presets helper */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Ảnh Nền (URL) *</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={projImage}
                  onChange={(e) => setProjImage(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                />
                {/* Fast fill suggestion */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {presetImages.map(img => (
                    <button
                      key={img.name}
                      type="button"
                      onClick={() => setProjImage(img.url)}
                      className="px-2 py-1 rounded bg-slate-950 hover:bg-blue-600/20 hover:text-blue-400 border border-slate-800 text-[10px] text-slate-400 transition-all cursor-pointer"
                    >
                      {img.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Tags / Công Nghệ</label>
                  <input
                    type="text"
                    placeholder="Next.js, React, SEO"
                    value={projTags}
                    onChange={(e) => setProjTags(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                  <p className="text-[10px] text-slate-500">Phân cách nhau bằng dấu phẩy</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Đường dẫn Demo</label>
                  <input
                    type="text"
                    placeholder="#"
                    value={projLink}
                    onChange={(e) => setProjLink(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Tên tag chỉ số</label>
                  <input
                    type="text"
                    placeholder="VD: Tốc độ"
                    value={projStatLabel}
                    onChange={(e) => setProjStatLabel(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-300 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Số liệu đo lường</label>
                  <input
                    type="text"
                    placeholder="VD: 0.4s"
                    value={projStatVal}
                    onChange={(e) => setProjStatVal(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-300 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Tên Khách Hàng</label>
                  <input
                    type="text"
                    placeholder="Vinamilk Corp"
                    value={projClient}
                    onChange={(e) => setProjClient(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-300 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Thời Gian Thực Hiện</label>
                  <input
                    type="text"
                    placeholder="3 tháng"
                    value={projDuration}
                    onChange={(e) => setProjDuration(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-300 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Dòng kết quả đạt được</label>
                <textarea
                  rows={2}
                  placeholder="Tăng 100% tốc độ tải trang&#10;Tiết kiệm 50% chi phí"
                  value={projResults}
                  onChange={(e) => setProjResults(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-xs text-slate-300 placeholder-slate-700 transition-colors"
                />
                <p className="text-[10px] text-slate-500">Mỗi dòng ứng với một gạch đầu dòng kết quả</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Xuất Bản Dự Án Ngay
              </button>
            </form>
          </div>

          {/* Current Projects Table */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-white text-lg font-bold font-display flex items-center gap-2">
              <Layout className="w-5 h-5 text-blue-400" />
              Công Phục Dự Án Hiện Tại ({projects.length})
            </h3>
            <div className="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 uppercase font-mono text-[10px]">
                      <th className="px-4 py-3 font-semibold">Dự án</th>
                      <th className="px-4 py-3 font-semibold">Nhãn loại</th>
                      <th className="px-4 py-3 font-semibold">Khách hàng</th>
                      <th className="px-4 py-3 font-semibold text-right">Lựa chọn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {projects.map((proj) => (
                      <tr key={proj.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-3">
                            <img src={proj.image} className="w-8 h-8 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0" referrerPolicy="no-referrer" />
                            <div className="max-w-[150px] sm:max-w-[200px] truncate">
                              <span className="text-white font-bold block truncate">{proj.title}</span>
                              <span className="text-slate-500 text-[10px] truncate block">ID: {proj.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/15">
                            {proj.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 truncate max-w-[100px]">
                          {proj.client || 'N/A'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Bạn thật sự có chắc muốn xóa dự án "${proj.title}"?`)) {
                                onDeleteProject(proj.id);
                              }
                            }}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg hover:text-red-400 text-slate-500 transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Xóa dự án"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- SECTION 2: BLOG CONFIGS ------------------- */}
      {activeSubTab === 'blogs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Write Blog Form */}
          <div className="lg:col-span-6 bg-slate-900/40 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6">
            <div>
              <h3 className="text-white text-lg font-bold font-display flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-400" />
                Viết Bài Viết Mới
              </h3>
              <p className="text-slate-400 text-xs mt-1">Sử dụng định dạng tóm gọn có hỗ trợ thẻ tiêu đề (###) và bôi đậm (**chữ**) để hiển thị nội dung tuyệt đẹp.</p>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-4 text-left text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Tiêu Đề Bài Viết *</label>
                  <input
                    required
                    type="text"
                    placeholder="VD: Cấu hình SEO 2026"
                    value={blogTitle}
                    onChange={(e) => setBlogTitle(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Chủ Đề *</label>
                  <select
                    value={blogCategory}
                    onChange={(e: any) => setBlogCategory(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors cursor-pointer"
                  >
                    <option value="Tech">Lập Trình & Công Nghệ</option>
                    <option value="SEO">SEO & Marketing</option>
                    <option value="Design">Thiết Kế UI/UX</option>
                    <option value="Marketing">Tin tức Marketing</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Mô Tả Tóm Tắt (Excerpt) *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Viết một tóm tắt ngắn cuốn hút xuất hiện trên danh mục bài viết..."
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Ảnh Thumbnail (URL)</label>
                  <input
                    type="text"
                    placeholder="Link ảnh Unsplash..."
                    value={blogImage}
                    onChange={(e) => setBlogImage(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                  {/* Fill suggestions */}
                  <div className="flex gap-2 pt-1 text-[10px]">
                    <button type="button" onClick={() => setBlogImage(presetImages[0].url)} className="text-blue-400 hover:underline cursor-pointer">Unsplash Tech</button>
                    <button type="button" onClick={() => setBlogImage(presetImages[2].url)} className="text-blue-400 hover:underline cursor-pointer">Unsplash UI</button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Thời gian đọc</label>
                  <input
                    type="text"
                    placeholder="5 phút đọc"
                    value={blogReadTime}
                    onChange={(e) => setBlogReadTime(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Tags liên hệ (nhiều)</label>
                  <input
                    type="text"
                    placeholder="React, Tech, SEO"
                    value={blogTags}
                    onChange={(e) => setBlogTags(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Quản Trị Tác Giả</label>
                  <select
                    value={blogAuthorName}
                    onChange={(e) => {
                      const sel = presetAuthors.find(a => a.name === e.target.value);
                      if (sel) {
                        setBlogAuthorName(sel.name);
                        setBlogAuthorRole(sel.role);
                        setBlogAuthorAvatar(sel.avatar);
                      }
                    }}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-300 transition-colors cursor-pointer"
                  >
                    {presetAuthors.map(a => (
                      <option key={a.name} value={a.name}>{a.name} ({a.role})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">Nội Dung Bài Viết * (Nhập Markdown cơ bản)</label>
                <textarea
                  required
                  rows={8}
                  placeholder={`Hãy viết bất kỳ thông tin bài viết ở đây.&#10;&#10;### 1. Đặt Tiêu Đề Mục Nhỏ Sử Dụng "###" ở đầu dòng.&#10;&#10;Có thể in đậm bằng **chữ muốn in đậm** để tạo sự thu hút chuyên nghiệp.`}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2 text-slate-350 font-mono text-xs transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 text-white font-bold rounded-xl shadow-lg transition-all text-center cursor-pointer"
              >
                Xuất Bản Bài Viết
              </button>
            </form>
          </div>

          {/* Current Blog Posts Table */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-white text-lg font-bold font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Bài Viết Hiện Tại ({blogPosts.length})
            </h3>
            <div className="bg-slate-900/25 border border-slate-800/80 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400 uppercase font-mono text-[10px]">
                      <th className="px-4 py-3 font-semibold">Bài Viết</th>
                      <th className="px-4 py-3 font-semibold">Chủ đề</th>
                      <th className="px-4 py-3 font-semibold">Ngày Đăng</th>
                      <th className="px-4 py-3 font-semibold text-right">Tùy Chọn</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50">
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-4 py-3 font-medium">
                          <div className="flex items-center gap-3">
                            <img src={post.image} className="w-8 h-8 rounded-lg object-cover bg-slate-950 border border-slate-800 shrink-0" referrerPolicy="no-referrer" />
                            <div className="max-w-[140px] sm:max-w-[180px] truncate">
                              <span className="text-white font-bold block truncate">{post.title}</span>
                              <span className="text-slate-500 text-[10px] block">Tác giả: {post.author.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15">
                            {post.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs">
                          {post.date}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Bạn thật sự có chắc muốn xóa bài viết "${post.title}"?`)) {
                                onDeleteBlogPost(post.id);
                              }
                            }}
                            className="p-1.5 hover:bg-red-500/10 rounded-lg hover:text-red-400 text-slate-500 transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Xóa bài viết"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- SECTION 3: REQUEST MESSAGES ------------------- */}
      {activeSubTab === 'messages' && (
        <div className="space-y-6 text-left">
          <div className="flex items-center justify-between">
            <h3 className="text-white text-lg font-bold font-display flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" />
              Tổng Hợp Đơn Đăng Ký Tư Vấn ({messages.length})
            </h3>
            <p className="text-xs text-slate-400">Tự động thu thập từ biểu mẫu Liên Hệ của người dùng</p>
          </div>

          {messages.length === 0 ? (
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-8 text-center text-slate-500">
              <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              Chưa tiếp nhận bất kỳ thông tin liên hệ nào từ khách hàng.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {messages.map((msg: any) => (
                <div key={msg.id} className="bg-slate-900/50 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 space-y-4 relative flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="text-white font-bold text-base leading-tight">{msg.fullName}</h4>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">{msg.createdAt || 'Nửa vừa qua'}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="p-1 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Xóa thông tin"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-slate-800/55 text-xs text-slate-400">
                      <p><strong>Dịch vụ yêu cầu:</strong> <span className="text-blue-400">{msg.serviceType}</span></p>
                      <p><strong>Ngân sách dự kiến:</strong> <span className="text-emerald-400">{msg.budget}</span></p>
                      <p><strong>Số điện thoại:</strong> {msg.phone}</p>
                      <p><strong>Email chính thức:</strong> {msg.email}</p>
                    </div>

                    <div className="bg-slate-950/80 rounded-xl border border-slate-800/60 p-3 mt-2 text-xs leading-relaxed text-slate-300 italic">
                      "{msg.message}"
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
