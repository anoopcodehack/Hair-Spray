import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Calendar, Star, Phone, Instagram, Check } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO } from '../data/salonData';

export const Hero: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <section
      id="home"
      className="relative min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 architectural-grid overflow-hidden flex flex-col justify-between"
    >
      {/* 1. Top Architectural Showcase Bar */}
      <div className="max-w-[1400px] mx-auto w-full flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-200 mb-6 sm:mb-8 text-xs">
        {/* Left Meta Pills */}
        <div className="flex items-center gap-2.5">
          <span className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-800 font-sans font-medium text-xs tracking-normal shadow-xs">
            hairspray.salon
          </span>
          <a
            href={`https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(SALON_INFO.whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-950 transition-colors flex items-center gap-1.5 shadow-xs font-sans text-xs font-medium"
          >
            <span>WhatsApp Consultation</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

        {/* Right Editorial Section Tag */}
        <div className="hidden sm:flex items-center gap-4 text-right">
          <div className="font-sans text-[11px] uppercase tracking-wider text-zinc-500 font-semibold">
            Precision Styling
          </div>
          <div className="text-xs text-zinc-700 font-medium">
            Hair & Beauty Salon · Kavoor, Mangalore
          </div>
        </div>
      </div>

      {/* 2. Main Hero Centerpiece Editorial Canvas */}
      <div className="max-w-[1400px] mx-auto w-full relative">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-white text-zinc-900 shadow-xl shadow-zinc-900/5 overflow-hidden p-6 sm:p-10 lg:p-14 min-h-[580px] lg:min-h-[640px] flex flex-col justify-between border border-zinc-200/90"
        >
          {/* Subtle Typographic Watermark running in the background */}
          <div className="absolute -bottom-6 left-0 right-0 pointer-events-none select-none overflow-hidden opacity-[0.03] whitespace-nowrap z-0">
            <span className="font-serif font-black text-[110px] sm:text-[180px] lg:text-[230px] tracking-tighter uppercase block leading-none text-zinc-900">
              HAIR SPRAY
            </span>
          </div>

          {/* Top Bar inside the Hero Canvas */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            {/* Left Location & Year Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-800">
                <MapPin className="w-3.5 h-3.5 text-[#9E6868]" />
                <span>Kavoor, Mangalore</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-zinc-800">
                <Calendar className="w-3.5 h-3.5 text-[#9E6868]" />
                <span>Est. 2017 · 9 Years Excellence</span>
              </div>
            </div>

            {/* Right Social & Action Circular Pills */}
            <div className="flex items-center gap-2">
              <a
                href={SALON_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 hover:scale-105 transition-all text-xs font-semibold shadow-xs"
              >
                In
              </a>
              <a
                href={`https://wa.me/${SALON_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 hover:scale-105 transition-all text-xs font-semibold shadow-xs"
              >
                Wa
              </a>
              <button
                onClick={() => openBooking()}
                aria-label="Menu and VIP Booking"
                className="w-9 h-9 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black hover:scale-105 transition-all shadow-sm cursor-pointer"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Central Model Photography Layer */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-full max-w-[720px] h-full flex items-end justify-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1600&auto=format&fit=crop&q=85"
                alt="Hair Spray Signature Hair Styling Model"
                className="h-[105%] max-w-none sm:h-[110%] object-cover object-top filter contrast-[1.02] opacity-85 sm:opacity-90"
              />
              {/* Soft radial vignette to ensure text contrast */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white/90 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Content Layout Over the Model */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8 sm:py-12">
            {/* Left Headline & Action Button */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[58px] font-serif font-bold text-zinc-950 leading-[1.06] tracking-tight mb-4">
                Signature Hair <br />
                <span className="font-normal italic text-zinc-700">In 2–3 Hours</span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mb-8 leading-relaxed font-normal">
                Signature <strong>Keratin & Cysteine Bond Repair</strong> — visible transformation without damage or compromise, tailored precisely to your hair texture.
              </p>

              {/* High-Contrast Obsidian Pill Button */}
              <button
                id="hero-main-cta-btn"
                onClick={() => openBooking()}
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg shadow-zinc-900/15 hover:scale-105 active:scale-98 cursor-pointer"
              >
                <span>Book VIP Appointment</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>

            {/* Right Editorial Headline */}
            <div className="lg:col-span-6 flex flex-col items-start lg:items-end text-left lg:text-right">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-zinc-950 tracking-tight leading-[1.08]">
                Natural Finish
              </h2>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal italic text-[#9E6868] tracking-tight leading-[1.08] mb-6">
                Without Compromise
              </h2>
            </div>
          </div>

          {/* Bottom Floating Feature Card (Bottom-Right Positioned) */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4">
            {/* Left Micro Summary */}
            <div className="hidden md:flex items-center gap-3 text-xs text-zinc-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Kavoor Junction · Airport Road · Open Today 9:00 AM – 8:00 PM</span>
            </div>

            {/* Right Floating Frosted Glass Card */}
            <div className="ml-auto w-full sm:w-auto max-w-sm rounded-2xl bg-white/90 backdrop-blur-xl border border-zinc-200 p-4 sm:p-5 shadow-lg text-zinc-900">
              {/* Bullet Points with Star/Asterisk Glyph */}
              <ul className="space-y-2 text-xs font-medium text-zinc-700 mb-4">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E6868] mt-1.5 shrink-0" />
                  <span>Results visible from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E6868] mt-1.5 shrink-0" />
                  <span>Natural healthy hair — zero damage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E6868] mt-1.5 shrink-0" />
                  <span>Custom formulation for your texture</span>
                </li>
              </ul>

              {/* Happy Clients Pill at the Bottom */}
              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                      alt="Client review"
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                      alt="Client review"
                    />
                    <img
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                      alt="Client review"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-bold block text-zinc-900">
                      5,000+ Happy Clients
                    </span>
                    <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      4.7 Google Rating (301 Reviews)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openBooking()}
                  aria-label="Book now"
                  className="w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-black hover:scale-110 transition-transform shrink-0 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Editorial Architectural Strip (OUR SERVICES) */}
      <div className="max-w-[1400px] mx-auto w-full pt-8 sm:pt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-zinc-200 mt-8 text-xs text-zinc-500">
        <div>
          <span className="font-sans text-[11px] uppercase tracking-wider text-zinc-500 font-semibold block mb-1">
            Our Key Services
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-zinc-800 font-medium">
            <a href="#services" className="hover:text-zinc-950 transition-colors">Keratin Cysteine Therapy</a>
            <span className="text-zinc-300">/</span>
            <a href="#services" className="hover:text-zinc-950 transition-colors">HD Bridal Make Up</a>
            <span className="text-zinc-300">/</span>
            <a href="#services" className="hover:text-zinc-950 transition-colors">Radiant Organic Facials</a>
            <span className="text-zinc-300">/</span>
            <a href="#services" className="hover:text-zinc-950 transition-colors">RICA Waxing & Spa</a>
          </div>
        </div>

        <div className="flex items-center gap-6 font-sans text-xs text-zinc-600 font-medium">
          <span>Kavoor Tower, 1st Floor</span>
          <span>Airport Road</span>
          <a
            href={`tel:${SALON_INFO.phone}`}
            className="text-zinc-900 hover:text-black transition-colors font-sans font-semibold flex items-center gap-1.5"
          >
            <Phone className="w-3 h-3 text-[#9E6868]" />
            <span>{SALON_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
