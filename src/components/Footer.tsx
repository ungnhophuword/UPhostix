import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Linkedin, Github, Send, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      toast.error('Vui lòng nhập địa chỉ email của bạn.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      toast.error('Vui lòng nhập email đúng định dạng (VD: example@domain.com).');
      return;
    }

    setSubscribed(true);
    setEmail('');
    toast.success('Đăng ký nhận bản tin thành công! Bạn sẽ nhận được các thông tin tối ưu SEO & Website mới nhất.');
    setTimeout(() => setSubscribed(false), 5000); // Ẩn thông báo sau 5 giây
  };

  const handleQuickLink = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="app-footer" className="bg-slate-950 border-t border-slate-900 text-slate-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleQuickLink('home')}>
              <span className="text-2xl font-bold font-display text-white tracking-tight">
                <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">UP</span>
                hostix
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              UPhostix Agency tiên phong thiết kế giao dịch kỹ thuật số xuất sắc. Chúng tôi kết hợp chiến lược SEO chuẩn mực và công nghệ Web đỉnh cao để gia tăng vị thế số hiệu quả cho doanh nghiệp của bạn.
            </p>
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Phân Mục</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleQuickLink('home')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Trang Chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('services')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Dịch Vụ Số
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('projects')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Dự Án Thực Chiến
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('blog')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Tin Tức & Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('about')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Về Chúng Tôi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleQuickLink('contact')}
                  className="hover:text-blue-400 hover:underline transition-all text-left cursor-pointer"
                >
                  Liên Hệ Ngay
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs">Thông Tin Liên Hệ</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>Toà nhà UPhostix Space, Quận 1, Thành phố Hồ Chí Minh, Việt Nam</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="tel:0988888888" className="hover:text-white transition-colors">
                  098 888 8888 / 028 9999 9999
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <a href="mailto:contact@uphostix.com" className="hover:text-white transition-colors">
                  contact@uphostix.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4 tracking-wider uppercase text-xs font-sans">Đăng Ký Nhận Bản Tin</h3>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              Nhận ngay các xu hướng công nghệ số, chiến lược tối ưu SEO và những ưu đãi thiết kế website độc quyền hàng tháng.
            </p>
            {subscribed ? (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-bounce shrink-0" />
                <span>Cảm ơn bạn đã đăng ký theo dõi!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Email của bạn..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-1 px-4 py-2 border border-slate-800 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl active:scale-95 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Powered and copyright info */}
        <div className="mt-12 pt-8 border-t border-slate-900 text-center flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            <span>© 2026 UPhostix Agency. Toàn bộ quyền được bảo lưu.</span>
            <span className="text-slate-800">•</span>
            <button 
              onClick={() => setCurrentTab('admin')} 
              className="text-slate-500 hover:text-blue-400 transition-colors uppercase tracking-wider font-semibold text-[10px]"
            >
              Cổng Quản Trị
            </button>
          </p>
          <p>
            Thiết kế và lập trình bởi{' '}
            <span className="text-white font-medium hover:text-blue-400 transition-colors cursor-pointer">
              UPhostix Senior Engineers
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
