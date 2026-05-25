import React, { useState } from "react";
import { SERVICES, PROJECTS, TESTIMONIALS, BLOG_POSTS } from "../data";
import { motion } from "motion/react";
import { toast } from "react-hot-toast";
import {
  ArrowUpRight,
  ArrowRight,
  Laptop,
  Search,
  Palette,
  Shield,
  Sparkles,
  CheckCircle2,
  Star,
  Award,
  Zap,
  BookOpen,
  Calendar,
  Clock,
} from "lucide-react";
import logo from "../IMG/logo.png";
interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onSelectProject: (id: string) => void;
  onSelectBlogPost: (id: string) => void;
}

export default function HomeView({
  setCurrentTab,
  onSelectProject,
  onSelectBlogPost,
}: HomeViewProps) {
  const [testimonialsList, setTestimonialsList] = useState(() => {
    const saved = localStorage.getItem("uphostix_testimonials");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return TESTIMONIALS;
  });

  // Feedback form states
  const [newFeedbackName, setNewFeedbackName] = useState("");
  const [newFeedbackRole, setNewFeedbackRole] = useState("");
  const [newFeedbackCompany, setNewFeedbackCompany] = useState("");
  const [newFeedbackRating, setNewFeedbackRating] = useState(5);
  const [newFeedbackHoverRating, setNewFeedbackHoverRating] = useState<
    number | null
  >(null);
  const [newFeedbackContent, setNewFeedbackContent] = useState("");

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedbackName.trim() || !newFeedbackContent.trim()) {
      toast.error("Vui lòng điền Họ tên và Nội dung nhận xét trước khi gửi.");
      return;
    }

    // Choose a random cute avatar to make the UI look gorgeous
    const avatars = [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDKRCEUr1kxfPWBX44cc9DY72QmGOpqTv1oKQCUp5opUN0zXexKHSRTGLjsItyQfDhT28xAsqZRfNM9GwXpgLDFDB5Wc1q4mabrdnVVBb9hanvJIn0F98gITBAvq1h5cI3FtpRqJXMDZoaNafjnD9r3SVv450X39alKJ8orRl6jcwwIKuaF3A09s4c2awia-pSkfqGUEgUI7-ucT06aZmGQtycsLeXmKIt51ihFmBn12x7ml2nP9wz7y1YGplWDtNj5h1dPeQ2j2MAu",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6st9GcZbD36SKwpOI3KSMcuWU3NEDXE_pLdKopHYuJjOduzoeVHDqzT4uMWpEmNaEfVftfoTSyo6b9J0xJ3sFonutZ4kD1S5hzY5wSY3MLAuxe01KTWybGBhariOmTxcDCR1UKNba5yJjIgRjt7qkQdHYi2uveNUgzCxyKqNkab_xoolE3auCdWUsUm4d-9DQPvjyhry8YqI-JXDnb2IeQOqlOnVI-gfS6kqE_610buvh6IPGZP_TYJkRM0CyiTSrMD-syFlB-YjN",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCCyUn4WbQRkkX346g89mt1exTx5Ynp0Htb7V18sftLGmoduMsVSoFUf1qmqnRLVX0a4H7pwCtdp9CTu3vyvxhTYcMFj7ajrOA9WdY8Ab_dp2nB8lJ1lMtmlvg_q4Ii0KCmYEhJvXXAdsY4cy4pp6O6jTx8je4PVCbNBFK5K5xjjxjwjjd96R9LDlzJiwLrus2kA_cysLyxO6uOqHLFcftyyhrxUTln0azmZLsYGCB1mNLDe1o8tGzT-UMNb3hHgq4gAFWDbo05Vm21",
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newTest = {
      id: "test_" + Date.now(),
      name: newFeedbackName.trim(),
      role: newFeedbackRole.trim() || "Giám đốc Marketing",
      company: newFeedbackCompany.trim() || "Đối Tác Kỹ Thuật Số",
      avatar: randomAvatar,
      content: newFeedbackContent.trim(),
      rating: newFeedbackRating,
    };

    const updated = [newTest, ...testimonialsList];
    setTestimonialsList(updated);
    localStorage.setItem("uphostix_testimonials", JSON.stringify(updated));

    setNewFeedbackName("");
    setNewFeedbackRole("");
    setNewFeedbackCompany("");
    setNewFeedbackRating(5);
    setNewFeedbackContent("");
    toast.success(
      `Cảm ơn anh/chị ${newFeedbackName} đã gửi phản hồi và chấm điểm ${newFeedbackRating} sao cho UPhostix!`,
    );
  };

  // Map icons from string to Lucide JSX elements
  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case "Laptop":
        return <Laptop className={className} />;
      case "Search":
        return <Search className={className} />;
      case "Palette":
        return <Palette className={className} />;
      case "Shield":
        return <Shield className={className} />;
      default:
        return <Laptop className={className} />;
    }
  };

  const handleStartProject = () => {
    setCurrentTab("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div id="home-view" className="space-y-32 pb-24 overflow-hidden">
      {/* 🚀 HERO SECTION */}
      <section
        id="hero-section"
        className="relative pt-36 lg:pt-44 bg-transparent"
      >
        {/* Background ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl -z-10 animate-pulse bg-emerald-600/5"></div>

        {/* Floating tech nodes with high quality styles */}
        <div className="absolute top-1/3 left-[15%] w-34 h-34 rounded-full border border-blue-500/10 pointer-events-none -z-10 animate-float">
          <div className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-blue-500/35"></div>
        </div>
        <div className="absolute top-[20%] right-[25%] w-24 h-24 rounded-full border border-sky-400/10 pointer-events-none -z-10 animate-float-delayed">
          <div className="absolute bottom-0 right-1/2 w-1.5 h-1.5 rounded-full bg-sky-400/30"></div>
        </div>
        <div
          className="absolute bottom-[10%] left-[45%] w-16 h-16 rounded-full border border-emerald-400/10 pointer-events-none -z-10 animate-float"
          style={{ animationDuration: "7s" }}
        >
          <div className="absolute top-0 left-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Col - Typography & CTA */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300 font-medium"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>UPhostix Agency - Màu sắc mới, Tầm nhìn mới</span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4.5xl sm:text-5.5xl md:text-6.5xl font-extrabold font-display leading-[1.08] tracking-tight text-white"
              >
                Thiết Kế{" "}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                  Website
                </span>{" "}
                & Tối Ưu SEO
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Chúng tôi tạo ra những website tốc độ tải trang thần tốc, trải
                nghiệm giao diện số lộng lẫy kết hợp chiến lược SEO bền vững đưa
                doanh nghiệp dẫn đầu thứ hạng tìm kiếm.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <button
                  id="hero-cta-contact"
                  onClick={handleStartProject}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-medium rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-base font-display cursor-pointer"
                >
                  Bắt Đầu Dự Án
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  id="hero-cta-services"
                  onClick={() => {
                    setCurrentTab("services");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-white font-medium rounded-xl active:scale-95 transition-all text-base cursor-pointer"
                >
                  Khám Phá Dịch Vụ
                </button>
              </motion.div>

              {/* Tiny Stats */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900 text-center lg:text-left"
              >
                <div>
                  <p className="text-3xl font-bold text-white font-display">
                    150+
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    Dự Án Đỉnh Cao
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white font-display">
                    99%
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    Khách Hàng Hài Lòng
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white font-display">
                    &lt; 0.5s
                  </p>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                    Tốc Độ Tải Bàn Giao
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Col - Large Image Artifact */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 to-sky-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-700"></div>
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-32 h-auto"
                  alt="UPhostix Agency Website SEO Design"
                  className="w-full object-cover aspect-[4/3] scale-100 group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        Tối Ưu SEO Hoàn Hảo
                      </p>
                      <p className="text-slate-400 text-[10px]">
                        Google Core Web Vitals 100/100
                      </p>
                    </div>
                  </div>
                  <span className="text-blue-400 font-mono text-xs font-semibold px-2 py-1 bg-blue-500/10 rounded-md">
                    Responsive
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 💼 COMPREHENSIVE SOLUTIONS */}
      <section
        id="features-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-800/40">
            Dịch Vụ Kinh Điển
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Giải Pháp Toàn Diện Cho Chuyển Đổi Số
          </h2>
          <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
            Chúng tôi thiết kế những trải nghiệm sản phẩm số mượt mà, định chuẩn
            tối giản sang trọng đem lại chuyển đổi tối đa.
          </p>
        </div>

        {/* Staggered cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((serv) => (
            <motion.div
              variants={fadeInUp}
              key={serv.id}
              id={`service-card-${serv.id}`}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/30 p-6 rounded-2xl flex flex-col justify-between scale-on-hover hover:shadow-xl hover:shadow-blue-950/15 transition-all duration-300 h-full"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-600/10">
                  {renderIcon(serv.iconName)}
                </div>
                <h3 className="text-white text-lg font-bold font-display tracking-tight">
                  {serv.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {serv.description}
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-xs text-slate-500">Báo giá</span>
                <button
                  onClick={() => {
                    setCurrentTab("services");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="text-blue-400 hover:text-sky-300 text-xs font-semibold flex items-center gap-1 group/btn cursor-pointer"
                >
                  Xem chi tiết
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 🛠️ WORKFLOW SECTION */}
      <section id="workflow-section" className="bg-transparent relative py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/50">
              Quy Trình Chuẩn
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Vận Hành Chuyên Nghiệp Trong Từng Dự Án
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Chúng tôi phân phối khối lượng công việc thành các cột mốc chi
              tiết để đảm bảo tỷ lệ phản hồi dự án luôn đạt đỉnh cao.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          >
            {/* Connection line for large design desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-500 to-sky-400 opacity-20 -z-10"></div>

            {[
              {
                step: "01",
                title: "Phân Tích & Định Hướng",
                desc: "Nghiên cứu thị trường cạnh tranh, lập bảng từ khóa chuẩn SEO onpage giải quyết trọn nỗi lo quảng cáo tốn kém.",
              },
              {
                step: "02",
                title: "Thiết Kế UI/UX Độc Bản",
                desc: "Kiến tạo layout tinh tế, không gian âm mở rộng tạo sự thông thoáng, phản chiếu đúng đẳng cấp thương hiệu.",
              },
              {
                step: "03",
                title: "Phát Triển & SEO On-page",
                desc: "Code tối ưu tốc độ nhanh dưới 0.5 giây, tự động nén dữ liệu, dọn sạch code thừa cho bot bò tiện lợi.",
              },
              {
                step: "04",
                title: "Bàn Giao & Bảo Trì Trọn Đời",
                desc: "Lớp tường rào bảo vệ vững bền, hướng dẫn trực quan 1-1 hỗ trợ bảo trì, nâng cấp cấu trúc lâu dài.",
              },
            ].map((wf, idx) => (
              <motion.div
                variants={fadeInUp}
                key={idx}
                className="relative space-y-4 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800/80 group-hover:border-blue-550 group-hover:bg-blue-550/5 flex items-center justify-center font-display text-lg font-bold text-blue-400 shadow-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:translate-y-[-4px] transition-all duration-300">
                  {wf.step}
                </div>
                <h3 className="text-white text-base sm:text-lg font-bold font-display tracking-tight group-hover:text-blue-400 transition-colors">
                  {wf.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {wf.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 🖼 * BENTO GRID PROJECTS */}
      <section
        id="portfolio-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/40">
              Dự Án Tiêu Biểu
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Ký Sự Thiết Kế & Số Hóa Thương Hiệu
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Khám phá kho dự án thiết kế và bứt phá doanh số chúng tôi đã trực
              tiếp vận hành cho các tổng đối tác.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentTab("projects");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-blue-400 hover:text-white group font-medium text-sm border border-slate-800 bg-slate-900/50 px-5 py-2.5 rounded-xl hover:border-blue-500 transition-all duration-250 hover:bg-slate-900 cursor-pointer"
          >
            Tất Cả Dự Án
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        {/* Bento Grid layout with animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
        >
          {PROJECTS.map((proj, idx) => {
            const colSpanClass =
              idx === 0 || idx === 3 ? "lg:col-span-7" : "lg:col-span-5";
            return (
              <motion.div
                variants={fadeInUp}
                key={proj.id}
                id={`project-card-${proj.id}`}
                onClick={() => onSelectProject(proj.id)}
                className={`${colSpanClass} bg-slate-900 border border-slate-800 hover:border-blue-500/30 rounded-2xl overflow-hidden group flex flex-col justify-between cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl shadow-blue-500/5`}
              >
                {/* Visual wrap with image and hover effect */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60"></div>
                  {proj.stats && (
                    <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/5 text-xs text-white flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                      <span className="font-semibold text-slate-300">
                        {proj.stats.label}:
                      </span>
                      <span className="font-bold text-blue-400 font-display text-sm">
                        {proj.stats.value}
                      </span>
                    </div>
                  )}
                  <span className="absolute top-4 right-4 bg-blue-600/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-white font-bold uppercase tracking-wider border border-blue-500/20 animate-pulse">
                    {proj.category}
                  </span>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white text-lg sm:text-xl font-bold font-display tracking-tight group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mt-2 line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 justify-between items-center">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tg, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-950/80 text-slate-400 border border-slate-850 px-2 py-0.5 rounded-md"
                        >
                          {tg}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Xem chi tiết <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 📖 TIN TỨC & BLOG MỚI NHẤT */}
      <section
        id="recent-blog-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4 max-w-2xl">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3.5 py-1.5 rounded-full border border-blue-800/40">
              Góc Chia Sẻ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Bài Viết & Ý Tưởng Mới Nhất
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cập nhật xu thế thiết kế và tối ưu On-page từ các chuyên gia hàng
              đầu trong lĩnh vực kỹ thuật số.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentTab("blog");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-blue-400 hover:text-white group font-medium text-sm border border-slate-800 bg-slate-900/50 px-5 py-2.5 rounded-xl hover:border-blue-500 transition-all duration-250 hover:bg-slate-900 cursor-pointer"
          >
            Xem Tất Cả Bài Viết
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </button>
        </div>

        {/* Blog layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <motion.div
              variants={fadeInUp}
              key={post.id}
              onClick={() => onSelectBlogPost(post.id)}
              className="group bg-slate-900/40 rounded-3xl border border-slate-800/80 overflow-hidden cursor-pointer hover:border-blue-500/30 hover:bg-slate-900/65 transition-all duration-300 flex flex-col h-full hover:scale-[1.01] hover:shadow-2xl hover:shadow-blue-950/10"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-750 ease-in-out group-hover:scale-104"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm px-2.5 py-0.5 rounded-lg text-[10px] font-bold text-blue-400">
                  {post.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>
                  <h4 className="text-white font-bold font-display text-base group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-slate-850/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      referrerPolicy="no-referrer"
                      className="w-6 h-6 rounded-full object-cover border border-slate-800"
                    />
                    <span className="text-[11px] text-slate-400">
                      {post.author.name}
                    </span>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Đọc tiếp <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 💬 TESTIMONIALS */}
      <section id="testimonials-section" className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-850/30">
              Phản Hồi Đồng Hành
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
              Ý Kiến Thực Tế Từ Khách Hàng
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Chúng tôi duy trì cam kết và giữ trọn chữ tín cao nhất trên mỗi
              website xuất xưởng.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left side: Testimonial Grid Cards */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {testimonialsList.map((test) => (
                  <motion.div
                    variants={fadeInUp}
                    key={test.id}
                    id={`testimonial-${test.id}`}
                    className="bg-slate-900/50 backdrop-blur-xs border border-slate-800/85 p-6 rounded-2xl flex flex-col justify-between scale-on-hover hover:border-blue-500/25 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="space-y-4">
                      {/* Stars */}
                      <div className="flex gap-1">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        "{test.content}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-6 mt-6 border-t border-slate-800/60 w-full overflow-hidden">
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className="w-10 h-10 rounded-full border border-slate-700 object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-white text-sm font-bold tracking-wide truncate">
                          {test.name}
                        </h4>
                        <p className="text-slate-500 text-xs truncate">
                          {test.role} -{" "}
                          <span className="text-blue-400/80">
                            {test.company}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right side: Dynamic Interactive Star Rating Widget Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800/80 p-6 sm:p-8 hover:border-blue-500/20 transition-all duration-300 space-y-6">
                <div>
                  <h3 className="text-white text-xl font-bold font-display tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                    Chia Sẻ Trải Nghiệm
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm mt-1">
                    Đánh giá sao động thực quản và đóng góp phản hồi quý báu cho
                    đội ngũ kỹ sư UPhostix.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmitFeedback}
                  className="space-y-4 text-left"
                >
                  {/* Interactive Dynamic Star Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                      Đánh Giá Sao Động
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((starVal) => {
                        const isLit =
                          newFeedbackHoverRating !== null
                            ? starVal <= newFeedbackHoverRating
                            : starVal <= newFeedbackRating;
                        return (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setNewFeedbackRating(starVal)}
                            onMouseEnter={() =>
                              setNewFeedbackHoverRating(starVal)
                            }
                            onMouseLeave={() => setNewFeedbackHoverRating(null)}
                            className="focus:outline-none transition-transform duration-100 hover:scale-125 cursor-pointer"
                          >
                            <Star
                              className={`w-7 h-7 transition-colors duration-100 ${
                                isLit
                                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                  : "text-slate-700 hover:text-slate-500"
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="text-xs text-slate-400 ml-2 font-mono font-bold">
                        ({newFeedbackHoverRating || newFeedbackRating} / 5)
                      </span>
                    </div>
                  </div>

                  {/* Feedback Text Area */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                      Nội Dung Nhận Xét *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Trải nghiệm của bạn về tốc độ web, giao diện UX hoặc chiến dịch SEO..."
                      value={newFeedbackContent}
                      onChange={(e) => setNewFeedbackContent(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800/80 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm text-slate-300 placeholder-slate-600 transition-colors"
                    />
                  </div>

                  {/* Personal details */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block uppercase tracking-wider">
                      Họ & Tên *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="VD: Nguyễn Văn A"
                      value={newFeedbackName}
                      onChange={(e) => setNewFeedbackName(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800/80 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2.5 text-sm text-slate-300 placeholder-slate-600 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                        Chức Vụ
                      </label>
                      <input
                        type="text"
                        placeholder="VD: CEO"
                        value={newFeedbackRole}
                        onChange={(e) => setNewFeedbackRole(e.target.value)}
                        className="w-full bg-slate-950/60 border border-slate-800/80 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-slate-300 placeholder-slate-600 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold text-slate-400 block uppercase tracking-wider">
                        Doanh Nghiệp
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Vinamilk"
                        value={newFeedbackCompany}
                        onChange={(e) => setNewFeedbackCompany(e.target.value)}
                        className="w-full bg-slate-950/60 border border-slate-800/80 focus:outline-none focus:border-blue-500 rounded-xl px-3 py-2.5 text-xs text-slate-300 placeholder-slate-600 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    Gửi Đánh Giá Ngay
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 CALL TO ACTION */}
      <section
        id="cta-footer-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-950 border border-blue-500/10 rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6">
          {/* Neon overlays */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl -z-10 bg-emerald-500/3"></div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-blue-400 font-semibold tracking-wide uppercase animate-pulse">
            Đặt Lịch Khảo Sát SEO & WEB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-white max-w-3xl mx-auto">
            Sẵn Sàng Phát Triển Dự Án Của Bạn Ngay Hôm Nay?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            Hãy kết nối với các kiến trúc sư giải pháp của UPhostix để nhận tư
            vấn cấu trúc nâng cấp web, phân tích SEO độc quyền hoàn toàn miễn
            phí.
          </p>

          <div className="pt-4">
            <button
              id="cta-bottom"
              onClick={handleStartProject}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 font-bold font-display text-base rounded-xl active:scale-95 shadow-xl hover:shadow-white/10 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              Yêu Cầu Báo Giá
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
