import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, Calendar, Instagram } from 'lucide-react';
import { STYLISTS_LIST } from '../data/salonData';
import { useBooking } from '../context/BookingContext';
import { Stylist } from '../types';

export const Stylists: React.FC = () => {
  const { openBooking } = useBooking();

  const handleBookWithStylist = (stylist: Stylist) => {
    openBooking(null, stylist);
  };

  return (
    <section id="stylists" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-14">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>The Master Artisans</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Resident Senior Stylists
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            Certified beauty specialists with collective decades of mastery in precision scissor architecture, color chemistry, and bridal styling.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STYLISTS_LIST.map((stylist, idx) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="rounded-[24px] overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md flex flex-col group relative transition-all shadow-xs"
            >
              {/* Photo Frame with Aspect Ratio */}
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-100">
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white font-sans text-xs font-semibold flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{stylist.rating}</span>
                </div>

                {/* Experience pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 font-sans text-[10px] uppercase flex items-center gap-1.5 font-medium">
                  <Award className="w-3 h-3 text-[#9E6868]" />
                  <span>{stylist.experienceYears} Yrs</span>
                </div>

                {/* Hover Reveal Overlay with Bio & Book CTA */}
                <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 text-zinc-900 border border-zinc-200">
                  <div>
                    <div className="flex items-center justify-between mb-3 font-sans">
                      <span className="text-[10px] uppercase tracking-wider text-[#9E6868] font-bold">
                        Master Profile
                      </span>
                      {stylist.instagramHandle && (
                        <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                          <Instagram className="w-3 h-3" />
                          {stylist.instagramHandle}
                        </span>
                      )}
                    </div>
                    <h4 className="text-lg font-serif font-bold text-zinc-950 mb-2">{stylist.name}</h4>
                    <p className="text-xs text-zinc-600 leading-relaxed font-normal mb-4">{stylist.bio}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4 font-sans">
                      {stylist.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-800 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    id={`book-with-stylist-${stylist.id}`}
                    onClick={() => handleBookWithStylist(stylist)}
                    className="w-full py-3 rounded-full bg-zinc-900 text-white hover:bg-black font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all hover:scale-105 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Reserve with {stylist.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Card Identity */}
              <div className="p-6 flex-1 flex flex-col justify-between font-sans">
                <div>
                  <h3 className="text-lg font-serif font-bold text-zinc-950 mb-1 group-hover:text-black transition-colors">
                    {stylist.name}
                  </h3>
                  <p className="text-xs text-[#9E6868] mb-3 font-semibold">
                    {stylist.role}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {stylist.specialties.slice(0, 2).map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-600 font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-medium">
                    {stylist.reviewsCount} reviews
                  </span>
                  <button
                    onClick={() => handleBookWithStylist(stylist)}
                    className="text-zinc-900 hover:text-black font-semibold cursor-pointer underline-offset-4 hover:underline"
                  >
                    Book Slot →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
