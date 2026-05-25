import React, { useState, useEffect } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Trang Chủ" },
    { id: "services", label: "Dịch Vụ Số" },
    { id: "projects", label: "Dự Án" },
    { id: "blog", label: "Blog" },
    { id: "about", label: "Về Chúng Tôi" },
    { id: "contact", label: "Liên Hệ" },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      id="main-navbar"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-slate-800/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <span className="flex items-center gap-2 text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              <span className="bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent">
                UP
              </span>
              hostix
              <div className="w-2 h-2 rounded-full bg-sky-450 animate-pulse"></div>
            </span>
          </div>

          {/* Desktop Nav Items with slide layoutId indicator */}
          <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/30 px-2 py-1 rounded-xl border border-slate-900/40 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg relative transition-colors duration-300 cursor-pointer ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-350 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-blue-550/15 border border-blue-500/25 rounded-lg -z-10 shadow-[0_0_12px_rgba(59,130,246,0.12)]"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 25,
                      }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right action button */}
          <div className="hidden md:flex items-center">
            <button
              id="nav-consultation-btn"
              onClick={() => handleNavClick("contact")}
              className="flex items-center gap-2 px-4.5 py-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-450 hover:scale-[1.02] text-white text-sm font-semibold rounded-xl shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Tư Vấn Miễn Phí
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all cursor-pointer ${
                      isActive
                        ? "text-white bg-blue-550/15 border-l-2 border-blue-500 pl-3.5"
                        : "text-slate-350 hover:text-white hover:bg-slate-900/50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-slate-850/80 px-4">
                <button
                  id="mobile-nav-consultation-btn"
                  onClick={() => handleNavClick("contact")}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-450 text-white rounded-xl font-bold tracking-wide active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Tư Vấn Miễn Phí
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
