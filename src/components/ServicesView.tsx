import React, { useState } from 'react';
import { SERVICES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Laptop, Search, Palette, Shield, Check, Cpu, ArrowRight, Sparkles, Calculator, Zap } from 'lucide-react';

interface ServicesViewProps {
  setCurrentTab: (tab: string) => void;
  setSelectedQuotation?: (data: { serviceType: string; budget: string; message: string }) => void;
}

export default function ServicesView({ setCurrentTab, setSelectedQuotation }: ServicesViewProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('web');

  // Interactive Calculator State
  const [projectType, setProjectType] = useState<string>('corporate');
  const [pagesCount, setPagesCount] = useState<number>(5);
  const [includeSEO, setIncludeSEO] = useState<boolean>(true);
  const [includeBranding, setIncludeBranding] = useState<boolean>(false);
  const [supportLevel, setSupportLevel] = useState<string>('none');
  const [calculatorSubmitted, setCalculatorSubmitted] = useState<boolean>(false);

  // Map icon strings to Lucide JSXs
  const renderIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'Laptop': return <Laptop className={className} />;
      case 'Search': return <Search className={className} />;
      case 'Palette': return <Palette className={className} />;
      case 'Shield': return <Shield className={className} />;
      default: return <Laptop className={className} />;
    }
  };

  // Cost calculation engine
  const calculateEstimate = () => {
    let basePrice = 0;
    let pricePerPage = 800000; // 800k VNĐ mỗi trang
    let duration = 10; // ngày mặc định

    switch (projectType) {
      case 'landing':
        basePrice = 8000000;
        pricePerPage = 1200000;
        duration = 7;
        break;
      case 'corporate':
        basePrice = 15000000;
        pricePerPage = 900000;
        duration = 15;
        break;
      case 'ecommerce':
        basePrice = 25000000;
        pricePerPage = 1500000;
        duration = 25;
        break;
      case 'custom':
        basePrice = 45000000;
        pricePerPage = 2000000;
        duration = 35;
        break;
      default:
        basePrice = 15000000;
    }

    let pageCost = pagesCount * pricePerPage;
    let total = basePrice + pageCost;
    let calculatedDuration = duration + Math.ceil(pagesCount * 0.5);

    if (includeSEO) {
      total += 5000000; // +5tr SEO
      calculatedDuration += 3;
    }
    if (includeBranding) {
      total += 6000000; // +6tr logo branding
      calculatedDuration += 4;
    }

    if (supportLevel === 'basic') {
      total += 1500000; // phí vận hành hàng tháng cộng dồn đợt đầu
    } else if (supportLevel === 'gold') {
      total += 3500000;
    }

    return {
      price: total.toLocaleString('vi-VN') + 'đ',
      rawPriceNum: total,
      days: calculatedDuration
    };
  };

  const estimateResult = calculateEstimate();

  const handleApplyEstimateToForm = () => {
    if (setSelectedQuotation) {
      let typeLabel = '';
      if (projectType === 'landing') typeLabel = 'Báo Giá Landing Page Đơn';
      else if (projectType === 'corporate') typeLabel = 'Báo Giá Web Doanh Nghiệp';
      else if (projectType === 'ecommerce') typeLabel = 'Báo Giá Web Bán Hàng E-commerce';
      else typeLabel = 'Báo Giá Custom Web App Cao Cấp';

      const customMessage = `Chào UPhostix! Tôi sử dụng bộ ước tính giá tự động và muốn triển khai: 
- Thể loại dự án: ${typeLabel}
- Quy mô trang: ${pagesCount} trang.
- Tối ưu SEO: ${includeSEO ? 'CÓ' : 'KHÔNG'}.
- Nhận diện thương hiệu: ${includeBranding ? 'CÓ' : 'KHÔNG'}.
- Gói vận hành: ${supportLevel === 'none' ? 'Không yêu cầu' : supportLevel === 'basic' ? 'Cơ bản' : 'Nâng cấp Gold'}.
- Dự kiến hoàn thành: khoảng ${estimateResult.days} ngày.`;

      setSelectedQuotation({
        serviceType: typeLabel,
        budget: estimateResult.price,
        message: customMessage
      });

      setCalculatorSubmitted(true);
      setTimeout(() => {
        setCurrentTab('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1000);
    }
  };

  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  return (
    <div id="services-view" className="space-y-24 pt-32 pb-20 bg-transparent">
      {/* 🚀 SERVICES HEADER */}
      <section id="services-hero-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/40 border border-blue-800/45 rounded-full text-xs text-blue-300 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Giải pháp dịch vụ tiên phong</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Dịch Vụ Số Đẳng Cấp Cho{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            Doanh Nghiệp Tương Lai
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Chúng tôi trang bị trọn vẹn sức mạnh chuyển đổi số cho mô hình kinh doanh của bạn bằng sự kết hợp chuẩn mực của thẩm mỹ thiết kế và lập trình cao cấp.
        </motion.p>
      </section>

      {/* 💼 DETAIL INTERACTIVE SERVICES */}
      <section id="services-selector-tabs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation tabs for services */}
        <div className="flex flex-wrap gap-2.5 justify-center mb-12 border-b border-slate-900 pb-6">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              id={`service-tab-btn-${s.id}`}
              onClick={() => setSelectedServiceId(s.id)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                selectedServiceId === s.id
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/10'
                  : 'bg-slate-900/55 border border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {renderIcon(s.iconName, "w-4 h-4")}
              {s.title}
            </button>
          ))}
        </div>

        {/* Selected Service Detailed View with AnimatePresence */}
        <div id="service-focused-box" className="bg-slate-900 border border-slate-800/85 rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden shadow-xl shadow-blue-950/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedServiceId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12"
            >
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                    {renderIcon(activeService.iconName, "w-7 h-7")}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
                    {activeService.title}
                  </h2>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">
                    Bộ Công Nghệ Đột Phá Áp Dụng
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {activeService.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-lg bg-slate-950 font-mono text-xs text-white border border-slate-850 whitespace-nowrap"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Core Features list */}
                <div className="space-y-3 pt-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold font-display">
                    Giá Trị Đặc Quyền Nhận Được
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-sm">
                        <Check className="w-4.5 h-4.5 text-emerald-450 shrink-0 mt-0.5" />
                        <span className="text-slate-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side Pricing Card Matrix */}
              <div className="lg:col-span-12 xl:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-white text-base font-bold font-display tracking-wide border-b border-slate-900 pb-3">
                    Bản Phác Thảo Báo Giá Tham Khảo
                  </h3>

                  <div className="space-y-4 text-sm mt-4">
                    <div className="flex justify-between items-center p-3 bg-slate-900/40 hover:bg-slate-900 border border-slate-800/50 rounded-xl transition duration-150">
                      <span className="font-semibold text-slate-300">Gói Cơ Bản (Basic)</span>
                      <span className="font-bold font-display text-emerald-400 text-base">{activeService.pricing.basic}</span>
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-blue-600/10 hover:bg-blue-600/15 border border-blue-500/20 rounded-xl transition duration-150 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 bg-blue-600 text-[9px] text-white font-extrabold uppercase px-2.5 py-0.5 rounded-bl-lg">
                        Đề xuất
                      </div>
                      <span className="font-semibold text-blue-300">Gói Nâng Cao (Premium)</span>
                      <span className="font-bold font-display text-blue-400 text-base">{activeService.pricing.premium}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-900/40 hover:bg-slate-900 border border-slate-800/50 rounded-xl transition duration-150">
                      <span className="font-semibold text-slate-300">Doanh Nghiệp (Enterprise)</span>
                      <span className="font-bold font-display text-emerald-400 text-base">{activeService.pricing.enterprise}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setCurrentTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-xs font-semibold active:scale-95 transition-all cursor-pointer"
                  >
                    Đăng Ký Tư Vấn Gói Này
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 🚀 DIGITAL INNOVATION SPOTLIGHT */}
      <section id="digital-spotlight-section" className="bg-transparent py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Image */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-sky-500 rounded-2xl blur opacity-20"></div>
              <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-xl">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7xKkF5hHFERNM5czVRKin_KB3b10d8i7NPdaFMQoSpJ-b1hQOAag_39996h-rgyyE609v5YMtViMG17dzmLiVQK-4YqtzbFEo9DHHC_P9kC9Z1JsY0OmzqwoXLAaOryabq3tMqglFI-qSzXyNqvPmaiecO1J_rpKSV6mSRH9Wuq2VzuhUj1FT6mIvefX3aI90SfcIB8BDIlEi7kxvc0G-X09VXkkr14AgvNsgyYzNqf3CF4lTQbBMVoVV9bu1WkHinQPLy-I0eC7s"
                  alt="UPhostix Digital Technology Performance"
                  className="w-full object-cover aspect-[4/3] group-hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Column Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300">
                <Cpu className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                <span>Tiêu chuẩn công nghệ thế hệ mới</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
                Kiến Trúc Đa Máy Chủ & Tốc Độ Siêu Tốc
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Chúng tôi không chấp nhận những website tải chậm chạp và bảo mật kém. Với hạ tầng thiết kế mượt mà, UPhostix đưa mô hình sản phẩm của bạn lên các dịch vụ máy chủ đám mây siêu phân tán, bảo vệ tối đa dữ liệu và giải quyết triệt để trải nghiệm tiếp cận của người dùng.
              </p>

              {/* Stats benchmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl">
                  <p className="text-blue-400 font-bold text-2xl font-display">99.99%</p>
                  <p className="text-slate-300 text-xs font-semibold mt-1">Uptime Khả Dụng</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Hạ tầng đám mây phân tán đa điểm</p>
                </div>
                <div className="p-4 bg-slate-900 border border-slate-800/80 rounded-xl">
                  <p className="text-emerald-450 font-bold text-2xl font-display">&lt; 0.5s</p>
                  <p className="text-slate-300 text-xs font-semibold mt-1">Nút Tương Tác Đầu Tiên (FID)</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Tốc độ chuyển động mượt mà tức thì</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 WIDGET ESTIMATOR / PROJECT COST CALCULATOR */}
      <section id="cost-calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl shadow-blue-950/5">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left panel - Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5">
                <Calculator className="w-5 h-5 text-blue-450" />
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  Tự Tính Báo Giá Dự Án Hoàn Hảo
                </h2>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">
                Hãy lựa chọn các thông số dự án mong muốn bên dưới. Hệ thống ước tính thông minh của chúng tôi sẽ tính toán chi phí trung bình và số ngày thực hiện tương ứng ngay lập tức!
              </p>

              <div className="space-y-6 pt-4 border-t border-slate-850">
                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Thể Loại Thiết Kế
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'landing', label: 'Landing Page Đơn' },
                      { id: 'corporate', label: 'Web Doanh Nghiệp' },
                      { id: 'ecommerce', label: 'Web Bán Hàng (E-commerce)' },
                      { id: 'custom', label: 'Web Custom App cao cấp' }
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setProjectType(t.id)}
                        className={`p-3 text-left rounded-xl text-xs sm:text-sm font-medium border transition-all duration-150 cursor-pointer ${
                          projectType === t.id
                            ? 'bg-blue-600/10 border-blue-500 text-blue-300'
                            : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slides for pages */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span>Quy Mô Số Trang Web:</span>
                    <span className="text-blue-400 text-sm font-bold font-mono">{pagesCount} Trang</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-[10px] text-slate-505">
                    <span>1 trang đơn</span>
                    <span>15 trang trung bình</span>
                    <span>40 trang quy mô lớn</span>
                  </div>
                </div>

                {/* Optional options */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Tùy Chọn Bổ Sung
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl cursor-pointer border border-slate-850 hover:border-slate-800 transition">
                      <input
                        type="checkbox"
                        checked={includeSEO}
                        onChange={(e) => setIncludeSEO(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-500 focus:ring-opacity-0 focus:outline-none"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Yêu cầu Tối ưu SEO chi tiết</p>
                        <p className="text-[10px] text-slate-500">Tìm từ khoá, cấu trúc Onpage</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl cursor-pointer border border-slate-850 hover:border-slate-800 transition">
                      <input
                        type="checkbox"
                        checked={includeBranding}
                        onChange={(e) => setIncludeBranding(e.target.checked)}
                        className="w-4 h-4 rounded text-blue-600 accent-blue-500 focus:ring-opacity-0 focus:outline-none"
                      />
                      <div>
                        <p className="text-xs font-bold text-white">Đi kèm Logo & Nhận diện số</p>
                        <p className="text-[10px] text-slate-500">Tặng bộ typography & brand guideline</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* support / operation tier */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Gói Chăm Sóc Vận Hành Định Kỳ
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'none', label: 'Không yêu cầu' },
                      { id: 'basic', label: 'Bảo Trì Cơ Bản' },
                      { id: 'gold', label: 'Super Gold 24/7' }
                    ].map((op) => (
                      <button
                        key={op.id}
                        onClick={() => setSupportLevel(op.id)}
                        className={`py-2 px-1 text-center rounded-lg text-[11px] font-medium border transition-all cursor-pointer ${
                          supportLevel === op.id
                            ? 'bg-emerald-600/15 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white'
                        }`}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel - Result view */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-850 rounded-2xl p-6 sm:p-8 flex flex-col justify-between self-stretch">
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded-md">
                  <Zap className="w-3 h-3 shrink-0 text-emerald-400" />
                  Tính tương thích chuẩn
                </span>

                <div className="space-y-1">
                  <p className="text-slate-500 text-sm font-semibold">Ước tính chi phí đầu tư:</p>
                  <p className="text-white text-3xl sm:text-4xl font-extrabold font-display bg-gradient-to-r from-emerald-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
                    {estimateResult.price}
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-850 rounded-xl space-y-2">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Thời gian thiết kế hoàn thiện:</span>
                    <span className="text-white font-bold font-mono">{estimateResult.days} ngày</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Bảo hành và đào tạo trọn gói:</span>
                    <span className="text-emerald-400 font-bold uppercase text-[10px]">CÓ SẴN (FREE)</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-520 leading-normal">
                  * Ghi chú: Chi phí trên mang tính định hướng tối ưu ban đầu. Để nhận phân tích từ khóa và phác thảo wireframe sơ bộ miễn phí, vui lòng áp dụng thông số này trực tiếp vào yêu cầu khởi tạo bên dưới.
                </p>
              </div>

              <div className="pt-8">
                {calculatorSubmitted ? (
                  <button
                    disabled
                    className="w-full py-4 bg-emerald-600 text-white font-bold font-display rounded-xl text-sm flex items-center justify-center gap-2 animate-pulse"
                  >
                    Đang Áp Dụng Thành Công...
                  </button>
                ) : (
                  <button
                    id="quote-apply-btn"
                    onClick={handleApplyEstimateToForm}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold font-display rounded-xl text-sm active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 cursor-pointer"
                  >
                    Áp Dụng Cho Bản Liên Hệ
                    <ArrowRight className="w-4.5 h-4.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
