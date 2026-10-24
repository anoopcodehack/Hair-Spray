import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, MapPin, Calendar, Star, Phone, Instagram, MessageCircle, Scissors } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO, hair1 } from '../data/salonData';

export const Hero: React.FC = () => {
  const { openBooking } = useBooking();
  const liveStatus = useMemo(() => getSalonCurrentStatus(), []);

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
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 hover:scale-105 transition-all shadow-xs"
              >
                <Instagram className="w-4 h-4 text-zinc-800" />
              </a>
              <a
                href={`https://wa.me/${SALON_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Chat"
                className="w-9 h-9 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-800 hover:scale-105 transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-zinc-800" />
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

          {/* Authentic Salon Photography Layer (Real Salon Interior & Styling Stations) */}
          <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none overflow-hidden">
            <div className="relative w-full lg:w-3/5 h-full flex items-center justify-end">
              <img
                src={hair1}
                alt="Hair Spray Unisex Salon Panorama & Interior - Kavoor Mangalore"
                className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-95 opacity-80 sm:opacity-85 transition-opacity"
              />
              {/* Soft progressive gradient ensuring left text stays pristine and readable */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Content Layout Over the Salon Photography */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8 sm:py-12">
            {/* Left Headline & Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col items-start text-left"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[58px] font-serif font-bold text-zinc-950 leading-[1.06] tracking-tight mb-4">
                Signature Hair <br />
                <span className="font-normal italic text-zinc-700">In 2–3 Hours</span>
              </h1>

              <p className="text-xs sm:text-sm text-zinc-600 max-w-md mb-8 leading-relaxed font-normal">
                Signature <strong>Keratin & Cysteine Bond Repair</strong> — visible transformation without damage or compromise, tailored precisely to your hair texture.
              </p>

              {/* Primary Actions & Google Rating Social Proof */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  id="hero-main-cta-btn"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openBooking()}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-lg shadow-zinc-900/15 cursor-pointer"
                >
                  <span>Book VIP Appointment</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </motion.button>

                <a
                  href={SALON_INFO.justdialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-4 py-3 sm:py-3.5 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 hover:border-zinc-300 text-zinc-800 text-xs font-semibold shadow-xs hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-zinc-950 font-bold">4.7 / 5.0</span>
                  <span className="text-zinc-500 font-normal">· 301 Reviews</span>
                  <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                </a>
              </div>
            </motion.div>

            {/* Right Editorial Headline & Salon Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 flex flex-col items-start lg:items-end text-left lg:text-right"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-zinc-200 shadow-xs text-xs font-semibold text-zinc-800 mb-3 cursor-default"
              >
                <Scissors className="w-3.5 h-3.5 text-[#9E6868]" />
                <span>Modern Unisex Salon & Spa · Kavoor</span>
              </motion.div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-zinc-950 tracking-tight leading-[1.08]">
                Natural Finish
              </h2>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal italic text-[#9E6868] tracking-tight leading-[1.08] mb-4">
                Without Compromise
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 max-w-sm font-medium leading-relaxed hidden sm:block">
                Dedicated air-conditioned styling stations, hospital-grade sanitized tools, and scientific formaldehyde-free bond repair therapies.
              </p>
            </motion.div>
          </div>

          {/* Bottom Floating Feature Card (Bottom-Right Positioned) */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4">
            {/* Left Micro Summary */}
            <div className="hidden md:flex items-center gap-2.5 text-xs text-zinc-600 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  liveStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'
                }`}
              />
              <span className="font-semibold text-zinc-900">
                {liveStatus.isOpen ? 'Open Now' : 'Currently Closed'}
              </span>
              <span className="text-zinc-400">·</span>
              <span>
                {liveStatus.isOpen
                  ? `Closes today at ${liveStatus.closeHourStr}`
                  : `Opens at ${liveStatus.openHourStr}`}
              </span>
              <span className="text-zinc-400">·</span>
              <span>Kavoor Junction, Airport Rd</span>
            </div>

            {/* Right Floating Frosted Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="ml-auto w-full sm:w-auto max-w-sm rounded-2xl bg-white/90 backdrop-blur-xl border border-zinc-200 hover:border-zinc-300 p-4 sm:p-5 shadow-lg text-zinc-900 cursor-default"
            >
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
            </motion.div>
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
