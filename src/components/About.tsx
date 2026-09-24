import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Check, ArrowUpRight, Shield, Award, Star, Users } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const About: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const stats = [
    {
      num: '09+',
      label: 'Years in Business',
      desc: 'Established 2017 in Kavoor'
    },
    {
      num: '4.7★',
      label: 'Google Rating',
      desc: 'Based on 301 verified reviews'
    },
    {
      num: '5,000+',
      label: 'Clients Served',
      desc: 'Across Mangalore & Udupi'
    },
    {
      num: '100%',
      label: 'Formaldehyde Free',
      desc: 'Safe & certified formulations'
    }
  ];

  const highlights = [
    'Formaldehyde-Free & Premium Imported Keratin & Cysteine Formulations',
    'Dedicated Air Conditioned Comfort with Private Bridal & Skin Suites',
    'Customized Scalp, Hair Texture, and Skin Consultation Before Every Service',
    '100% Hospital-Grade Sanitized & Autoclaved Tools for Each Guest'
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-16">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Our Legacy & Philosophy</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Crafting Timeless Hair & Skin Artistry in Kavoor
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            9 years of unwavering commitment to personalized styling, scientific bond repair therapy, and luxury unisex beauty care in Mangalore.
          </p>
        </div>

        {/* Two-Column About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-16">
          {/* Left Column: Salon Story */}
          <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-10 rounded-[28px] bg-[#FAFAFA] border border-zinc-200">
            <div>
              <span className="font-sans text-xs uppercase tracking-wider text-zinc-500 font-semibold block mb-4">
                Since 2017 · Mangalore
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mb-5 leading-snug">
                The Hair Spray Standard
              </h3>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-4">
                Located near Union Bank in the vibrant heart of Kavoor, Mangalore, <strong>Hair Spray Unisex Salon</strong> was founded with a singular purpose: to deliver salon-grade hair science and luxury skincare without compromise.
              </p>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed mb-8">
                We specialize in tackling coastal humidity with advanced <strong>Keratin Cysteine</strong> and <strong>Cysteine Bond therapies</strong> that protect your natural hair fiber while creating mirror-like gloss and effortless daily movement.
              </p>
            </div>

            {/* Highlights List */}
            <div className="space-y-3.5 pt-6 border-t border-zinc-200">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-zinc-100 border border-zinc-200 text-[#9E6868] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-800 font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Showcase Player */}
          <div className="lg:col-span-6 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 p-4 sm:p-5 flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/90 group">
              <video
                id="salon-experience-video"
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80"
                playsInline
                loop
                muted={isMuted}
                src="https://assets.mixkit.co/videos/preview/mixkit-hairdresser-brushing-a-womans-hair-41270-large.mp4"
                ref={(el) => {
                  if (el) {
                    if (isPlaying) {
                      el.play().catch(() => {});
                    } else {
                      el.pause();
                    }
                  }
                }}
              />

              {/* Ambient overlay */}
              <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isPlaying ? 'opacity-10 hover:opacity-30' : 'opacity-50'}`} />

              {/* Central Play/Pause Button */}
              <button
                id="video-play-toggle-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause Salon Video' : 'Play Salon Video'}
                className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 hover:bg-white/30 border border-white/50 backdrop-blur-md flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-white" />
                ) : (
                  <Play className="w-6 h-6 fill-white ml-1 text-white" />
                )}
              </button>

              {/* Bottom Video Controls Strip */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-sans text-xs text-white/90 font-medium">
                    Inside Hair Spray Studio · 4K Tour
                  </span>
                </div>

                <button
                  id="video-mute-toggle-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                  aria-label="Toggle Audio"
                  className="p-1.5 rounded-lg hover:bg-white/15 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="mt-4 px-2 flex items-center justify-between text-xs text-zinc-600 font-sans font-medium">
              <span>Air Conditioned Private Suites</span>
              <span className="text-[#9E6868] font-bold">Kavoor Junction</span>
            </div>
          </div>
        </div>

        {/* Precision Architectural Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-200 rounded-[24px] bg-white divide-y md:divide-y-0 md:divide-x divide-zinc-200 overflow-hidden shadow-xs">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-zinc-50/50 transition-colors">
              <span className="font-sans text-xs text-stone-400 mb-3 font-bold">0{idx + 1}</span>
              <div>
                <span className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 block mb-1">
                  {stat.num}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 block">
                  {stat.label}
                </span>
                <span className="text-[11px] text-zinc-500 mt-1 block">
                  {stat.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
