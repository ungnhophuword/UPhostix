import React, { useState, useEffect } from 'react';
import { FAQS } from '../data';
import { ContactMessage } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MessageSquare, Trash2, Calendar, Send, ShieldAlert } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ContactViewProps {
  initialQuotationData?: {
    serviceType: string;
    budget: string;
    message: string;
  } | null;
  clearInitialQuotation?: () => void;
}

export default function ContactView({ initialQuotationData, clearInitialQuotation }: ContactViewProps) {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('web');
  const [budget, setBudget] = useState('medium');
  const [message, setMessage] = useState('');

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [faqTab, setFaqTab] = useState<'all' | 'general' | 'technical' | 'pricing'>('all');
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);

  // Apply quote estimator values if exists
  useEffect(() => {
    if (initialQuotationData) {
      setFullName('Khách Hàng Trải Nghiệm');
      setPhone('090 1234 567');
      setEmail('customer@example.com');
      setServiceType(initialQuotationData.serviceType);
      setBudget(initialQuotationData.budget);
      setMessage(initialQuotationData.message);
    }
  }, [initialQuotationData]);

  // Load registered messages from local storage
  useEffect(() => {
    const historical = localStorage.getItem('uphostix_contacts');
    if (historical) {
      try {
        setSavedMessages(JSON.parse(historical));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      const err = 'Vui lòng điền đầy đủ các thông tin bắt buộc trước khi gửi.';
      setErrMessage(err);
      toast.error(err);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      const err = 'Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại.';
      setErrMessage(err);
      toast.error(err);
      return;
    }

    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now(),
      fullName,
      email,
      phone,
      serviceType,
      budget,
      message,
      createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newMessage, ...savedMessages];
    setSavedMessages(updated);
    localStorage.setItem('uphostix_contacts', JSON.stringify(updated));

    setSubmitted(true);
    setErrMessage('');
    toast.success(`Yêu cầu tư vấn của anh/chị ${fullName} đã được tiếp nhận thành công!`);

    // Highlight message
    if (clearInitialQuotation) {
      clearInitialQuotation();
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setServiceType('web');
    setBudget('medium');
    setMessage('');
    setSubmitted(false);
  };

  const handleDeleteMessage = (id: string) => {
    const filtered = savedMessages.filter((m) => m.id !== id);
    setSavedMessages(filtered);
    localStorage.setItem('uphostix_contacts', JSON.stringify(filtered));
  };

  // Filter FAQs list
  const filteredFaqs = FAQS.filter((f) => {
    if (faqTab === 'all') return true;
    return f.category === faqTab;
  });

  return (
    <div id="contact-view" className="space-y-24 pt-32 pb-20 bg-transparent">
      {/* 🚀 CONTACT HEADER */}
      <section id="contact-hero-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/40 border border-blue-800/40 rounded-full text-xs text-blue-300 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Chào đón mọi ý tưởng độc đáo</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display leading-tight text-white max-w-4xl mx-auto"
        >
          Sẵn Sàng Đưa Ý Tưởng{' '}
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-sky-400 bg-clip-text text-transparent">
            Vươn Xa Đột Phá?
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Hãy để lại thông tin của bạn. Đội ngũ kỹ thuật viên cao cấp của UPhostix sẽ liên hệ lại phân tích giải pháp tối ưu SEO và cấu hình phác thảo trong vòng 2 giờ làm việc.
        </motion.p>
      </section>

      {/* 📬 MAIN CONTACT VIEW & MAP */}
      <section id="contact-details-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left panel contact info & map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <h2 className="text-white text-lg sm:text-xl font-bold font-display tracking-tight border-b border-slate-850 pb-3">
                Kênh Tiếp Nhận Khẩn Cấp
              </h2>

              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-white font-bold">Văn Phòng TP. Hồ Chí Minh</p>
                    <p className="text-slate-450 text-xs sm:text-sm">Toà nhà UPhostix Space, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-white font-bold">Đường Dây Hỗ Trợ Kỹ Thuật</p>
                    <a href="tel:0988888888" className="text-slate-450 text-xs sm:text-sm hover:text-white transition">098 888 8888 / 028 9999 9999</a>
                  </div>
                </li>
                <li className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-white font-bold">Thư Ký Đấu Thầu & Dự Án</p>
                    <a href="mailto:contact@uphostix.com" className="text-slate-450 text-xs sm:text-sm hover:text-white transition">contact@uphostix.com</a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Visual Location Map */}
            <div className="relative group rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-4 border-t border-white/5 backdrop-blur-md z-10 flex justify-between items-center text-xs">
                <div>
                  <p className="text-white font-bold">Trụ sở UPhostix Vietnam</p>
                  <p className="text-slate-400 text-[10px]">Đường Hai Bà Trưng, Phường Bến Nghé, Quận 1</p>
                </div>
                <span className="text-blue-400 font-mono text-[10px] font-bold px-2 py-0.5 bg-blue-500/10 rounded">Live Office</span>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuACVnPUXY5AQWYOUbG11scuGXutnCboGwRjNjAItU7FzE5pbyFJtDEeW1smNsIS8ruzknjL3QbVCvAGdQKy82a3-btardTeBu4bj1gCU-OZOCsohJzk-JGPtJ1YiLMRy4D_zfzg84nxq5LT6SGpq2BOsFdYqRMP8u168euBehbyVwZRxSqoLvp0rji9wdQ7OrPk2lOhB_UN_TF6UAa4G5dueCGbMoPpV4ZmhWefdteRCpqOmBJFumaWWPDiy5i49fotHX3qndLCUPfK"
                alt="UPhostix Agency Map Office"
                className="w-full object-cover aspect-[4/3] scale-100 group-hover:scale-102 transition duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right panel Contact Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl shadow-blue-950/5">
            {submitted ? (
              <div className="space-y-6 text-center py-10">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20 shadow-md">
                  <CheckCircle2 className="w-10 h-10 animate-bounce text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-white text-2xl font-bold font-display tracking-tight">Gửi Yêu Cầu Thành Công!</h3>
                  <p className="text-slate-400 text-sm max-w-md mx-auto">
                    Biểu mẫu của bạn đã được chuyển thẳng tới đội ngũ quản trị dịch vụ UPhostix. Chúng tôi sẽ gọi lại thảo luận chi tiết theo thông tin đăng ký.
                  </p>
                </div>

                {/* Promotional Code for user interactions */}
                <div className="max-w-md mx-auto p-4 bg-blue-600/10 border border-blue-500/20 rounded-xl relative overflow-hidden space-y-2">
                  <Sparkles className="w-4 h-4 text-blue-450 absolute top-2 right-2 animate-spin" />
                  <p className="text-[11px] text-blue-400 uppercase tracking-widest font-bold">Món Quà Trải Nghiệm Công Nghệ</p>
                  <p className="text-white text-sm font-semibold">Mã giảm giá 10% gói thiết kế website độc quyền:</p>
                  <p className="text-white text-lg font-bold font-mono tracking-widest bg-slate-950 py-1.5 rounded-lg border border-slate-850 select-all cursor-pointer">
                    UPHOSTIX2026
                  </p>
                  <p className="text-[10px] text-slate-500">* Áp dụng cho hợp đồng ký kết trước ngày 31/12/2026</p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={handleResetForm}
                    className="px-6 py-2.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-white rounded-xl text-xs font-semibold active:scale-95 transition cursor-pointer"
                  >
                    Gửi Yêu Cầu Khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-white text-xl sm:text-2xl font-bold font-display tracking-tight">Khởi Động Đột Phá Số</h2>
                  <p className="text-slate-400 text-xs sm:text-sm">Hãy hoàn tất ghi chú của bạn để sẵn sàng cùng UPhostix kiến tạo bệ phóng số lý tưởng.</p>
                </div>

                {errMessage && (
                  <div className="p-3.5 bg-rose-950/40 border border-rose-900/55 rounded-xl text-rose-400 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errMessage}</span>
                  </div>
                )}

                {initialQuotationData && (
                  <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-300 text-xs rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-450 shrink-0" />
                    <span>Đã nạp thông số tự tính từ bộ Calculator: <strong className="text-white">{initialQuotationData.budget}</strong></span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Fullname */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-505 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Số điện thoại <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="098 888 8888"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-505 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Email liên hệ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-505 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  {/* Service interest type */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Lĩnh Vực Quan Tâm
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-505 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="web">Thiết Kế Website & App</option>
                      <option value="seo">Tối Ưu SEO & Marketing</option>
                      <option value="branding">Thương Hiệu & Nhận Diện</option>
                      <option value="maintenance">Vận Hành & Bảo Trì Hàng Tuần</option>
                      <option value="combo">Giải pháp Combo Trọn Gói</option>
                    </select>
                  </div>
                </div>

                {/* Budget selection */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Ngân sách đầu tư dự kiến
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'low', label: 'Dưới 15tr' },
                      { id: 'medium', label: '15tr - 30tr' },
                      { id: 'high', label: '30tr - 50tr' },
                      { id: 'enterprise', label: 'Trên 50tr' }
                    ].map((bd) => (
                      <button
                        key={bd.id}
                        type="button"
                        onClick={() => setBudget(bd.label)}
                        className={`py-3 text-center border rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          budget === bd.label || budget === bd.id
                            ? 'bg-blue-600/10 border-blue-500 text-blue-350'
                            : 'bg-slate-950 border-slate-850 text-slate-500 hover:text-white hover:border-slate-800'
                        }`}
                      >
                        {bd.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* User Message context */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Nội dung lời nhắn <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Hãy mô tả chi tiết yêu cầu, mục tiêu kinh doanh hoặc liên kết website mẫu bạn mong muốn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-505 focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Submission CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold font-display rounded-xl text-sm active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 cursor-pointer"
                  >
                    Gửi Yêu Cầu Đăng Ký
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 🔮 INTERACTIVE FAQ SECTION */}
      <section id="faq-interactive-tab-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest bg-blue-950/40 px-3 py-1 rounded-full border border-blue-800/55">Hỏi Đáp Đối Tác</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">Giải Đáp Tường Tận Thắc Mắc</h2>
          <p className="text-slate-400 text-sm leading-relaxed">Chúng tôi minh bạch mọi thông tin hạ tầng, báo giá và thời gian thiết kế xây dựng sản phẩm.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column FAQ Selector tabs */}
          <div className="lg:col-span-4 space-y-2.5">
            {[
              { id: 'all', label: 'Tất Cả Thắc Mắc' },
              { id: 'general', label: 'Câu Hỏi Chung' },
              { id: 'technical', label: 'Kiến Thức Kỹ Thuật' },
              { id: 'pricing', label: 'Báo Giá & Hợp Đồng' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setFaqTab(tab.id as any);
                  setActiveFaqId(null);
                }}
                className={`w-full text-left px-5 py-4 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                  faqTab === tab.id
                    ? 'bg-blue-600/10 border-blue-500 text-blue-300'
                    : 'bg-slate-900 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Column Accordions with motion smoothness */}
          <div className="lg:col-span-8 space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base leading-snug pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-6 pb-6 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-850/60 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🕵️ ADMIN CORNER / LOCAL HISTORY INBOX */}
      {savedMessages.length > 0 && (
        <section id="demo-inbox-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 pt-16">
          <div className="bg-slate-950 border border-slate-800/80 rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-850 pb-4">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-blue-450" />
                <div>
                  <h3 className="text-white text-lg font-bold font-display tracking-tight">Hộp Thư Mô Phỏng Thực Tế (Local Storage)</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">Với tư cách Trải Nghiệm Viên Senior, bạn gửi tin nhắn trên form sẽ cập nhật lưu trữ trực tiếp vào đây.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc chắn muốn làm sạch toàn bộ hộp thư này?')) {
                    setSavedMessages([]);
                    localStorage.removeItem('uphostix_contacts');
                  }
                }}
                className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-[10px] uppercase font-bold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Làm sạch hộp thư
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[400px] overflow-y-auto pr-2">
              {savedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-slate-900 border border-slate-850 p-5 rounded-2xl relative space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-white font-bold text-sm tracking-wide">{msg.fullName}</p>
                        <p className="text-slate-500 text-[10px] sm:text-xs">ĐT: {msg.phone} | Email: {msg.email}</p>
                      </div>
                      <span className="bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold uppercase px-2 py-0.5 rounded shrink-0">
                        ĐÃ KIỂM SOÁT
                      </span>
                    </div>

                    <div className="p-3 bg-slate-950 border border-slate-850/80 rounded-xl space-y-1">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Lời nhắn yêu cầu:</p>
                      <p className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-850/40 text-[10px] text-slate-500 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{msg.createdAt}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-blue-400 font-semibold uppercase">{msg.serviceType}</span> | <span>Ngân sách: {msg.budget}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="absolute top-2 right-2 p-1 text-slate-600 hover:text-rose-450 rounded transition cursor-pointer"
                    aria-label="Xoá yêu cầu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
