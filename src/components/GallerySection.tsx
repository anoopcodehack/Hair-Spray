import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight, Sliders, ArrowLeftRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/salonData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  // Interactive Before/After Slider position (0 - 100)
  const [sliderPosition, setSliderPosition] = useState(50);

  const categories = ['All', 'Hair', 'Bridal', 'Salon Interior', 'Facials & Nails'];

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

  return (
    <section id="gallery" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Visual Archive</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Hair & Aesthetic Archive
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed md:text-right">
              Authentic client makeovers, bridal creations, and interiors from our central Kavoor salon.
            </p>
            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full font-sans">
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
        </div>

        {/* Featured Interactive Before / After Comparison Widget */}
        <div className="mb-14 max-w-4xl mx-auto">
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 shadow-xs">
            <div className="flex items-center justify-between mb-5 font-sans">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-xl bg-zinc-100 border border-zinc-200 text-[#9E6868] shadow-2xs">
                  <ArrowLeftRight className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-serif font-bold text-zinc-950">
                    Keratin Cysteine Restorative Therapy
                  </h3>
                  <p className="text-xs text-zinc-500 font-sans">
                    Drag the center handle horizontally to observe real outcome
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-sans">
                Zero Frizz Guaranteed
              </span>
            </div>

            {/* Slider Container */}
            <div
              className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden select-none cursor-ew-resize group shadow-inner border border-zinc-200"
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
              {/* After Image (Full width background) */}
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80"
                alt="After Treatment - Silky Smooth Mirror Shine"
                className="absolute inset-0 w-full h-full object-cover filter brightness-95"
              />
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold">
                After (Keratin Cysteine)
              </div>

              {/* Before Image (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1200&auto=format&fit=crop&q=80"
                  alt="Before Treatment - Frizzy Damaged Hair"
                  className="absolute inset-0 w-full h-full object-cover max-w-none filter brightness-90"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-sans text-xs font-semibold">
                  Before (Frizzy Texture)
                </div>
              </div>

              {/* Center Divider Handle */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-white shadow-2xl z-30"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-zinc-900 shadow-xl flex items-center justify-center border border-zinc-300">
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Masonry / Grid of Gallery Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => setSelectedImageIndex(idx)}
              className="rounded-[24px] overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md group cursor-pointer transition-all relative aspect-[4/3] shadow-xs"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white font-sans">
                <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h4 className="text-base font-serif font-bold leading-snug mb-1 text-white">
                  {item.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-white/80">
                  <Eye className="w-3.5 h-3.5 text-[#9E6868]" />
                  <span>Inspect in Lightbox</span>
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
                <div className="px-2 flex items-center justify-between font-sans">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9E6868] block font-bold">
                      {filteredGallery[selectedImageIndex].category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-zinc-950">
                      {filteredGallery[selectedImageIndex].title}
                    </h3>
                    <p className="text-xs text-zinc-600 font-sans font-normal">
                      {filteredGallery[selectedImageIndex].description}
                    </p>
                  </div>
                  <span className="text-xs text-zinc-400 font-medium">
                    {selectedImageIndex + 1} / {filteredGallery.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
