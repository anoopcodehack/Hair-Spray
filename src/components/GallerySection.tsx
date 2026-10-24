import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight, ArrowLeftRight, ArrowUpRight, MessageCircle, Check } from 'lucide-react';
import { GALLERY_ITEMS, hair7, SALON_INFO } from '../data/salonData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Interactive Before/After Slider position (0 - 100)
  const [sliderPosition, setSliderPosition] = useState(50);

  const categories = ['All', 'Salon Interior', 'Styling Stations', 'Spa & Massage', 'Reception'];

  const filteredGallery = GALLERY_ITEMS.filter((item) =>
    activeCategory === 'All' ? true : item.category === activeCategory
  );

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? filteredGallery.length - 1 : (prev ?? 0) - 1
    );
  };

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev === filteredGallery.length - 1 ? 0 : (prev ?? 0) + 1
    );
  };

  React.useEffect(() => {
    if (selectedImageIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedImageIndex, filteredGallery.length]);

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12"
        >
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868] animate-pulse" />
              <span>Visual Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Salon & Ambience Archive
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed md:text-right">
              Explore our modern styling bays, luxury massage loungers, kids haircut station, and reception at our Kavoor salon.
            </p>
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full font-sans no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs transition-all duration-200 cursor-pointer whitespace-nowrap font-medium ${
                    activeCategory === cat
                      ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                      : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Interactive Before / After Comparison Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-4xl mx-auto"
        >
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 hover:border-zinc-300 transition-colors shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 font-sans">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-[#9E6868] shadow-2xs">
                  <ArrowLeftRight className="w-4 h-4" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-serif font-bold text-zinc-950">
                      Keratin Cysteine Restorative Therapy
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-sans">
                      Real Client Result
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-sans mt-0.5">
                    Drag slider horizontally to compare coastal humidity frizz vs mirror gloss
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 px-3 py-1.5 rounded-full shadow-2xs self-start sm:self-auto">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Frizz Guaranteed</span>
              </div>
            </div>

            {/* Slider Container */}
            <div
              className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden select-none cursor-ew-resize group shadow-inner border border-zinc-200 bg-zinc-900"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
              onTouchMove={(e) => {
                const touch = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                setSliderPosition((x / rect.width) * 100);
              }}
            >
              {/* Layer 1: After Image (Glossy Blowout) */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={hair7}
                  alt="After Keratin Cysteine - Silky Mirror Gloss Finish"
                  className="absolute top-0 -left-[100%] w-[200%] h-full object-cover object-right pointer-events-none select-none max-w-none"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold shadow-sm">
                  After: Cysteine Mirror Gloss
                </div>
              </div>

              {/* Layer 2: Before Image (Frizzy Texture, clipped by sliderPosition) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img
                  src={hair7}
                  alt="Before Keratin Cysteine - Frizzy Damaged Texture"
                  className="absolute top-0 left-0 w-[200%] h-full object-cover object-left pointer-events-none select-none max-w-none"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-950/75 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold shadow-sm">
                  Before: Coastal Humidity Frizz
                </div>
              </div>

              {/* Center Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center border border-zinc-300">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-zinc-700" />
                </div>
              </div>
            </div>

            {/* Case Study Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-zinc-200">
              <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Hair Profile
                </span>
                <span className="text-xs font-semibold text-zinc-900 mt-0.5 block">
                  Dense Frizzy Waves
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Treatment
                </span>
                <span className="text-xs font-semibold text-zinc-900 mt-0.5 block">
                  Cysteine Bond Infusion
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Service Time
                </span>
                <span className="text-xs font-semibold text-zinc-900 mt-0.5 block">
                  120 Minutes
                </span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-zinc-200 shadow-2xs">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block">
                  Retention
                </span>
                <span className="text-xs font-semibold text-zinc-900 mt-0.5 block">
                  3 – 5 Months
                </span>
              </div>
            </div>

            {/* Direct Booking Call-To-Action */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <p className="text-xs text-zinc-500 font-sans">
                Complimentary strand analysis included with every Keratin Cysteine consultation.
              </p>
              <a
                href={`https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(
                  'Hi Hair Spray! I saw the Keratin Cysteine before/after transformation on your website and would like to book a consultation at your Kavoor salon.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold tracking-wide transition-colors shadow-2xs whitespace-nowrap self-stretch sm:self-auto cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Book This Treatment via WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Masonry / Grid of Gallery Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: 'easeOut' } }}
              transition={{ duration: 0.4, delay: (idx % 6) * 0.06 }}
              onClick={() => setSelectedImageIndex(idx)}
              className="rounded-[24px] overflow-hidden bg-zinc-950 border border-zinc-200 hover:border-[#9E6868]/60 hover:shadow-2xl group cursor-pointer transition-all duration-300 relative min-h-[340px] sm:min-h-[360px] aspect-[4/3] shadow-xs"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-108 group-hover:brightness-50 transition-all duration-500 ease-out"
              />

              {/* Default subtle title bar (visible when NOT hovered) */}
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-0 flex flex-col justify-end pointer-events-none">
                <span className="text-[10px] font-medium text-zinc-300 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif font-semibold text-white line-clamp-1">
                  {item.title}
                </h4>
              </div>

              {/* Full Detailed Info Overlay (Revealed on HOVER - Soft Dev Style) */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/75 to-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 sm:p-6 text-white font-sans">
                {/* Header: Clean Category Pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/10 backdrop-blur-md border border-white/15 text-zinc-200">
                    {item.category}
                  </span>
                </div>

                {/* Body: Clean Title & Direct Photo Info */}
                <div className="my-auto py-2">
                  {item.highlight && (
                    <div className="text-[11px] font-medium text-[#D1A8A8] tracking-wide mb-1.5">
                      {item.highlight}
                    </div>
                  )}
                  <h4 className="text-base sm:text-lg font-serif font-semibold leading-snug text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans line-clamp-3 mb-3 font-normal">
                    {item.description}
                  </p>

                  {/* Clean Feature Pills (No tacky hashtags, soft dev borders) */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-normal px-2.5 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer: Soft Stylist Attribution + Clean View Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-zinc-400">
                    {item.stylist || 'Kavoor Salon'}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 group-hover:text-white transition-colors font-medium">
                    <span>View photo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImageIndex !== null && filteredGallery[selectedImageIndex] && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedImageIndex(null)}
            >
              <div
                className="relative max-w-4xl w-full p-4 sm:p-6 rounded-[28px] border border-zinc-200 bg-white text-zinc-900 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="absolute top-5 right-5 z-30 p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer border border-zinc-200"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Main Lightbox Image */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-zinc-100 border border-zinc-200">
                  <img
                    src={filteredGallery[selectedImageIndex].imageUrl}
                    alt={filteredGallery[selectedImageIndex].title}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation buttons */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Lightbox Footer Info */}
                <div className="px-2 pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-medium tracking-wide text-zinc-700 px-3 py-0.5 bg-zinc-100 rounded-full border border-zinc-200">
                        {filteredGallery[selectedImageIndex].category}
                      </span>
                      {filteredGallery[selectedImageIndex].duration && (
                        <span className="text-[11px] text-zinc-500 font-medium">
                          {filteredGallery[selectedImageIndex].duration}
                        </span>
                      )}
                      {filteredGallery[selectedImageIndex].highlight && (
                        <span className="text-[11px] font-medium text-zinc-600 bg-zinc-50 px-2.5 py-0.5 rounded-full border border-zinc-200">
                          {filteredGallery[selectedImageIndex].highlight}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-serif font-semibold text-zinc-950 mb-1">
                      {filteredGallery[selectedImageIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-sans font-normal leading-relaxed mb-2.5">
                      {filteredGallery[selectedImageIndex].description}
                    </p>
                    {filteredGallery[selectedImageIndex].tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {filteredGallery[selectedImageIndex].tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] font-normal px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-100">
                    {filteredGallery[selectedImageIndex].stylist && (
                      <div className="text-xs text-zinc-500">
                        {filteredGallery[selectedImageIndex].stylist}
                      </div>
                    )}
                    <span className="text-xs text-zinc-400 font-medium">
                      {selectedImageIndex + 1} / {filteredGallery.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
