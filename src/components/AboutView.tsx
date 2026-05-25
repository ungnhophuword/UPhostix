import React, { useState } from 'react';
import { TEAM, TIMELINE } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Users, Target, Github, Linkedin, Facebook, Sparkles, TrendingUp } from 'lucide-react';

export default function AboutView() {
  const [selectedYear, setSelectedYear] = useState<string>('2026');

  const coreValues = [
    {
      icon: <Award className="w-6 h-6 text-blue-450" />,
      title: 'Sáng Tạo Độc Bản',
      desc: 'Chúng tôi từ chối những khuôn mẫu rập khuôn. Mỗi website hay giải pháp số của UPhostix đều là một tác phẩm được thiết kế hoàn thiện độc quyền theo đúng cá tính của thương hiệu.'
    },
    {
      icon: <Target className="w-6 h-6 text-sky-400" />,
      title: 'Mục Tiêu Hiệu Suất',
      desc: 'Hết lòng vì KPI của đối tác. Sản phẩm cuối cùng luôn được đo lường cụ thể bằng tốc độ Core Web Vitals, tỷ lệ truy cập tự nhiên và khả năng gia tăng chuyển đổi kinh doanh.'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      title: 'Đồng Hành Trọn Đời',
      desc: 'UPhostix không coi giao dịch là điểm kết thúc. Chúng tôi xem mỗi lần phát triển sản phẩm là một mối liên kết lâu dài, đồng hành cùng nâng cấp và giải quyết rào cản kỹ thuật khó khăn.'
    }
  ];

  return (
    <div id="about-view" className="space-y-24 pt-32 pb-20 bg-transparent">
      {/* 🚀 ABOUT HEADER */}
      <section id="about-hero" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-800/40 rounded-full text-xs text-blue-300 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Về Câu Chuyện Của UPhostix</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight text-white max-w-4xl mx-auto"
        >
          Kiến Tạo Tương Lai Số Với{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            UPhostix Agency
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Chúng tôi quy tụ những bộ óc lập trình kiêm chuyên nghiệp thiết kế sáng tạo nhằm đưa sản phẩm kinh doanh Việt Nam vững bước số hóa hoàn hảo.
        </motion.p>
      </section>

      {/* 📖 STORY SECTION */}
      <section id="our-story-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/50">Khát Vọng Số</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white tracking-tight">
              Bắt Đầu Từ Trăn Trở Về Những Website Tải Chậm
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Mỗi giây chờ đợi tải trang là một cơ hội kinh doanh trôi xa. Nhận thấy vô vàn thương hiệu sở hữu giao diện đồ hoạ thiếu chuẩn mực và cấu trúc viết mã lỗi thời kìm hãm SEO, UPhostix được định chế để thay đổi hoàn toàn điều đó.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Trải qua những năm tháng bền bỉ chứng minh thực lực qua hàng trăm sản phẩm thương mại điện tử lẫn các kiến trúc phân tán nâng cấp, chúng tôi đã vươn mình trở thành đối tác tin cậy của nhiều tập đoàn công nghệ năng động tại Việt Nam.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-900">
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-display">TẦM NHÌN CHIẾN LƯỢC</p>
                <p className="text-xs text-slate-500 leading-relaxed">Hội nhập quốc tế hóa mọi cấu trúc giao thức của doanh nghiệp thông qua mã lập trình chuẩn mực.</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-white font-display">SỨ MỆNH ĐỒNG HÀNH</p>
                <p className="text-xs text-slate-500 leading-relaxed">Trao trọn giải pháp tối ưu SEO onpage cùng trải nghiệm mượt mà bậc nhất cho khách hàng.</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl blur opacity-25"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqVkKoFBoIiNZs6bLQSaUom-ntjv0oKCR24RJC1c3fkX-SXjVvxhh9g54MA683EQXE81ptoQ3dc-bWznUH4oS4iTJwN7_bUJhp1DV_cCFISBTZz16E3R4w-460FZFoe-a2N3JRVBtcP896gE-EcjZk4e8x0-LPUuBbcCOudr92ySxLakkmXiDMqzm9FENg_yyUpnhCXi9KwtlScl4A-5Wrc3pfb-2sXKJQP-O22YVRpzsG4-bS3A7uNcM51wtMNctLK2VwhtowkCQr"
                alt="UPhostix Agency Team Story"
                className="w-full object-cover aspect-[4/3] group-hover:scale-102 transition duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🌿 CORE VALUES */}
      <section id="core-values-section" className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/50">Giá Trị Gốc Rễ</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Kỷ Luật Trong Từng Dòng Lệnh</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">Chúng tôi xây dựng văn hóa làm việc chặt chẽ nhằm giữ đúng lời cam kết về thời gian và độ bảo mật tuyệt hảo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800/80 p-6 sm:p-8 rounded-2xl space-y-4 hover:border-blue-500/20 hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center border border-slate-800">
                  {value.icon}
                </div>
                <h3 className="text-white text-lg font-bold font-display tracking-tight">{value.title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 CREATIVE TEAMS */}
      <section id="creative-team-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/50">Đội Ngũ Nhân Sự</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Chuyên Gia Đồng Hành Sáng Tạo</h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">Quy tụ những cá nhân ưu việt cùng chung tầm nhìn đột phá giá trị số bền vững.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member) => (
            <div
              key={member.id}
              id={`team-member-${member.id}`}
              className="bg-slate-900 border border-slate-800/90 hover:border-blue-500/20 rounded-2xl overflow-hidden group flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300"
            >
              {/* Profile Image with subtle gradients */}
              <div className="relative overflow-hidden aspect-[4/5] bg-slate-950">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85"></div>

                {/* Info Text positioning within the image gradient */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg sm:text-xl font-bold font-display tracking-wide">{member.name}</p>
                  <p className="text-blue-400 font-mono text-xs mt-1 font-semibold uppercase">{member.role}</p>
                </div>
              </div>

              {/* Bio & Social links */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-slate-900/40">
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{member.bio}</p>

                <div className="flex gap-3 pt-3 border-t border-slate-850">
                  {member.socials.facebook && (
                    <a
                      href={member.socials.facebook}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-950 text-slate-400 hover:text-white hover:border-blue-500 border border-slate-850 transition cursor-pointer"
                      aria-label={`${member.name} Facebook`}
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-950 text-slate-400 hover:text-white hover:border-blue-500 border border-slate-850 transition cursor-pointer"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a
                      href={member.socials.github}
                      className="w-8 h-8 flex items-center justify-center rounded bg-slate-950 text-slate-400 hover:text-white hover:border-blue-500 border border-slate-850 transition cursor-pointer"
                      aria-label={`${member.name} GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ⏳ INTERACTIVE TIMELINE */}
      <section id="interactive-timeline-section" className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/50">Quá Trình Trưởng Thành</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Cột Mốc Phát Triển Của Chúng Tôi</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Nhấp vào từng năm bên dưới để theo sát chặng đường đổi mới công nghệ và phát triển bền vững cùng các cộng sự.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10">
            {/* Buttons Row */}
            <div className="flex justify-between items-center relative pb-4 border-b border-slate-800">
              {TIMELINE.map((ev) => (
                <button
                  key={ev.year}
                  onClick={() => setSelectedYear(ev.year)}
                  className={`flex-1 text-center py-3.5 relative font-display font-bold text-base sm:text-xl transition-all cursor-pointer ${
                    selectedYear === ev.year
                      ? 'text-blue-400 border-b-2 border-blue-500 -mb-4.5 z-10'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {ev.year}
                </button>
              ))}
            </div>

            {/* Displaying story context details with animating fade-in placeholder */}
            <div className="min-h-[140px] flex items-center">
              <AnimatePresence mode="wait">
                {TIMELINE.map((ev) => {
                  if (ev.year !== selectedYear) return null;
                  return (
                    <motion.div
                      key={ev.year}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-2 w-full"
                    >
                      <div className="md:col-span-4 text-center md:text-left space-y-1">
                        <span className="text-xs font-bold font-mono text-blue-400 uppercase tracking-widest">Năm Đầy Ý Nghĩa</span>
                        <p className="text-white text-5xl sm:text-6xl font-extrabold font-display">{ev.year}</p>
                      </div>
                      <div className="md:col-span-8 space-y-3 border-l-0 md:border-l border-slate-800 md:pl-8">
                        <h3 className="text-white text-lg sm:text-2xl font-bold font-display tracking-tight flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                          {ev.title}
                        </h3>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                          {ev.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
