import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MessageCircle, MessageSquare, Plus, X } from 'lucide-react';

export default function ContactWidgets() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      id: 'phone',
      label: 'Gọi Điện Ngay',
      color: 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/10 hover:shadow-emerald-500/30',
      icon: <Phone className="w-5 h-5 text-white" />,
      link: 'tel:0901234567',
      tooltip: 'Hotline: 090.123.4567'
    },
    {
      id: 'zalo',
      label: 'Nhắn Qua Zalo',
      color: 'bg-blue-500 hover:bg-blue-400 shadow-blue-500/10 hover:shadow-blue-500/30',
      icon: (
        // Zalo Vector Logo or styled text
        <span className="font-extrabold text-xs text-white tracking-widest">Zalo</span>
      ),
      link: 'https://zalo.me/0901234567',
      tooltip: 'Zalo: 090.123.4567'
    },
    {
      id: 'messenger',
      label: 'Chat Messenger',
      color: 'bg-blue-650 hover:bg-blue-600 shadow-blue-650/10 hover:shadow-blue-650/30',
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      link: 'https://m.me/uphostix',
      tooltip: 'Messenger: m.me/uphostix'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-45 flex flex-col items-end gap-3.5 select-none">
      {/* Expanded list of items */}
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3.5 mb-2">
            {contacts.map((contact, idx) => (
              <motion.a
                key={contact.id}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.7, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: 15 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="group relative flex items-center justify-end"
              >
                {/* Tooltip prompt label */}
                <span className="absolute right-14 pr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
                  <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-white shadow-xl whitespace-nowrap block">
                    {contact.tooltip}
                  </span>
                </span>

                {/* Floating Contact Round button */}
                <div className={`w-11 h-11 flex items-center justify-center rounded-full shadow-lg ${contact.color} transition-all duration-300 transform group-hover:scale-110 active:scale-95`}>
                  {contact.icon}
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main trigger button */}
      <div className="relative">
        {/* Radar wave backdrop effect for hotline */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-500/25 animate-ping opacity-60"></div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 flex items-center justify-center rounded-full shadow-xl text-white transition-all duration-300 active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-slate-800 hover:bg-slate-700 shadow-slate-950/40 rotate-90'
              : 'bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 shadow-blue-500/20'
          }`}
          title="Liên hệ tư vấn"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Phone className="w-6 h-6 text-white animate-bounce" />
          )}
        </button>
      </div>
    </div>
  );
}
