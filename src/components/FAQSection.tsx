import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { FAQS_LIST, SALON_INFO } from '../data/salonData';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_LIST[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Inquiries & Clarifications</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 leading-[1.1]">
              Frequently Addressed Inquiries
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-sm font-normal leading-relaxed">
            Direct guidance regarding our texturizing therapies, bridal regimes, hygiene standards, and appointments.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-[20px] bg-white border border-zinc-200 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 text-[#9E6868] flex items-center justify-center shrink-0 shadow-2xs">
                      <MessageCircleQuestion className="w-4 h-4" />
                    </span>
                    <span className="text-base font-serif font-bold text-zinc-950">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-zinc-900 text-white border-zinc-900' : 'hover:border-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-zinc-100 text-xs sm:text-sm text-zinc-600 font-normal leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Call / WhatsApp Help Card */}
        <div className="mt-12 p-8 rounded-[24px] bg-white border border-zinc-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-serif font-bold text-zinc-950 mb-1">
              Require a personalized hair or bridal consultation?
            </h4>
            <p className="text-xs text-zinc-500 font-sans font-normal">
              Our styling consultants are available on WhatsApp or direct cellular line.
            </p>
          </div>
          <a
            href={`https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(SALON_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 shadow-xs hover:scale-105 transition-all whitespace-nowrap cursor-pointer"
          >
            <span>Ask on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
