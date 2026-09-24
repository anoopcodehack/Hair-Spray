import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, ArrowRight, Scissors, ChevronDown, ChevronUp, Layers, UserCheck } from 'lucide-react';
import { SERVICES_LIST } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { useBooking } from '../context/BookingContext';
import { AudienceFilter, isServiceForAudience, getAudienceBadge, getServiceAudience } from '../utils/serviceAudience';

const INITIAL_ITEMS = 6;
const BATCH_SIZE = 6;

export const ServicesSection: React.FC = () => {
  const { openBooking } = useBooking();
  const [audience, setAudience] = useState<AudienceFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);

  // Pre-calculate audience totals
  const womenCount = useMemo(() => SERVICES_LIST.filter((s) => isServiceForAudience(s, 'women')).length, []);
  const menCount = useMemo(() => SERVICES_LIST.filter((s) => isServiceForAudience(s, 'men')).length, []);

  // Services matching selected audience
  const audienceServices = useMemo(() => {
    return SERVICES_LIST.filter((service) => isServiceForAudience(service, audience));
  }, [audience]);

  const categories: { label: ServiceCategory; count: number }[] = useMemo(() => {
    const list = [
      { label: 'All' as ServiceCategory, count: audienceServices.length },
      { label: 'Hair Care' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Hair Care').length },
      { label: 'Facial & Skin' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Facial & Skin' || s.category === 'Facial').length },
      { label: 'Bridal & Makeup' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Bridal & Makeup' || s.category === 'Makeup').length },
      { label: 'Waxing' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Waxing' || s.category === 'Hair Removal').length },
      { label: 'Pedicure & Manicure' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Pedicure & Manicure' || s.category === 'Nails').length },
      { label: 'De-Tan & Bleach' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'De-Tan & Bleach').length },
      { label: 'Specialty & Spa' as ServiceCategory, count: audienceServices.filter((s) => s.category === 'Specialty & Spa').length },
    ];
    // Filter out categories that have 0 services under this audience filter, keep 'All'
    return list.filter((c) => c.count > 0 || c.label === 'All');
  }, [audienceServices]);

  const handleAudienceSelect = (targetAudience: AudienceFilter) => {
    setAudience(targetAudience);
    setSelectedCategory('All');
    setVisibleCount(INITIAL_ITEMS);
  };

  const handleCategorySelect = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setVisibleCount(INITIAL_ITEMS);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(INITIAL_ITEMS);
  };

  const filteredServices = useMemo(() => {
    return audienceServices.filter((service) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        service.category === selectedCategory ||
        (selectedCategory === 'Facial & Skin' && service.category === 'Facial') ||
        (selectedCategory === 'Bridal & Makeup' && service.category === 'Makeup') ||
        (selectedCategory === 'Waxing' && service.category === 'Hair Removal') ||
        (selectedCategory === 'Pedicure & Manicure' && service.category === 'Nails');

      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.brochureSection?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.subServices?.some((sub) => sub.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [audienceServices, selectedCategory, searchQuery]);

  const visibleServices = useMemo(() => {
    return filteredServices.slice(0, visibleCount);
  }, [filteredServices, visibleCount]);

  const hasMore = visibleCount < filteredServices.length;
  const remainingCount = Math.max(0, filteredServices.length - visibleCount);
  const nextBatchCount = Math.min(BATCH_SIZE, remainingCount);
  const isExpanded = visibleCount > INITIAL_ITEMS;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredServices.length));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredServices.length);
  };

  const handleShowLess = () => {
    setVisibleCount(INITIAL_ITEMS);
    const sectionElement = document.getElementById('services-grid-top');
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Signature Treatment Menu</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Engineered Formulations & Salon Artistry
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            From world-class Keratin Cysteine smoothing to clinical skin therapies and grand bridal artistry — explore our transparent, fixed-price unisex catalog.
          </p>
        </div>

        {/* Gender / Audience Segment Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-3 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-xs font-sans uppercase tracking-wider text-zinc-400 font-semibold px-2 hidden sm:inline-block">
              Filter by:
            </span>
            <button
              type="button"
              id="audience-filter-all"
              onClick={() => handleAudienceSelect('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                audience === 'all'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Services</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                audience === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600'
              }`}>
                {SERVICES_LIST.length}
              </span>
            </button>

            <button
              type="button"
              id="audience-filter-women"
              onClick={() => handleAudienceSelect('women')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                audience === 'women'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-rose-900 hover:bg-rose-50'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Women & Girls</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                audience === 'women' ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-800'
              }`}>
                {womenCount}
              </span>
            </button>

            <button
              type="button"
              id="audience-filter-men"
              onClick={() => handleAudienceSelect('men')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                audience === 'men'
                  ? 'bg-zinc-900 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-sky-400" />
              <span>Men & Boys</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                audience === 'men' ? 'bg-white/20 text-white' : 'bg-sky-100 text-sky-900'
              }`}>
                {menCount}
              </span>
            </button>
          </div>

          <div className="text-[11px] font-sans text-zinc-500 font-medium px-2">
            {audience === 'women' && '🌸 Showing all services available for Women & Girls'}
            {audience === 'men' && '✂️ Showing all services available for Men & Boys'}
            {audience === 'all' && '✨ Complete Unisex Salon Catalog (89 Services)'}
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-zinc-200">
          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  id={`service-cat-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleCategorySelect(cat.label)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                      : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 shadow-2xs'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="services-search-input"
              type="text"
              placeholder="Search Keratin, Facials, Waxing..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-full bg-white border border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Anchor for smooth scroll on collapse */}
        <div id="services-grid-top" className="scroll-mt-28" />

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {visibleServices.map((service, idx) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (idx % BATCH_SIZE) * 0.04 }}
                className="rounded-[24px] overflow-hidden bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md flex flex-col group transition-all duration-300 relative shadow-xs"
              >
                {/* Popular / Featured Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-[#9E6868] text-white text-[11px] font-sans font-medium shadow-sm flex items-center gap-1">
                    <span>Featured</span>
                  </div>
                )}

                {/* Service Card Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Category, Audience, & Duration Pills on Image */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2 font-sans text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/95 border border-white/15 font-medium">
                        {service.category}
                      </span>
                      {(() => {
                        const aud = getAudienceBadge(service);
                        return (
                          <span
                            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-semibold backdrop-blur-md ${
                              aud.gender === 'women'
                                ? 'bg-rose-950/85 text-rose-200 border-rose-400/30'
                                : aud.gender === 'men'
                                ? 'bg-sky-950/85 text-sky-200 border-sky-400/30'
                                : 'bg-zinc-900/80 text-zinc-200 border-zinc-500/30'
                            }`}
                          >
                            {aud.shortLabel}
                          </span>
                        );
                      })()}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/15 flex items-center gap-1 font-medium shrink-0">
                      <Clock className="w-3 h-3 text-[#9E6868]" />
                      {service.durationMin}m
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-zinc-950 mb-2 group-hover:text-black transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Sub-services pills */}
                    {service.subServices && service.subServices.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.subServices.slice(0, 3).map((sub, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-zinc-600 font-sans font-medium"
                          >
                            + {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing & Booking CTA Footer */}
                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-sans tracking-wider text-zinc-400 block font-medium">
                        {service.priceNote ? service.priceNote : 'Rate'}
                      </span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
                          ₹{service.price.toLocaleString()}
                        </span>
                        {service.priceSecondary && (
                          <span className="text-xs font-sans text-[#9E6868] font-semibold">
                            / ₹{service.priceSecondary.toLocaleString()} <span className="text-[10px] opacity-80">{service.secondaryLabel ? `(${service.secondaryLabel})` : ''}</span>
                          </span>
                        )}
                        {service.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            ₹{service.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      id={`book-service-${service.id}`}
                      onClick={() => openBooking(service)}
                      className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-xs"
                    >
                      <span>Book</span>
                      <span className="text-[11px] text-zinc-300">↗</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View More / Load More Section (Appears in all categories if count exceeds initial limit) */}
        {filteredServices.length > 0 && (hasMore || isExpanded) && (
          <div className="mt-14 flex flex-col items-center justify-center pt-8 border-t border-zinc-200">
            {/* Progress counter & bar */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <span className="text-xs font-sans font-medium text-zinc-600 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#9E6868]" />
                <span>
                  Showing <strong className="text-zinc-950 font-semibold">{visibleServices.length}</strong> of{' '}
                  <strong className="text-zinc-950 font-semibold">{filteredServices.length}</strong> treatments
                  {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                </span>
              </span>

              <div className="w-48 sm:w-64 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <div
                  className="h-full bg-zinc-900 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (visibleServices.length / filteredServices.length) * 100)}%` }}
                />
              </div>
            </div>

            {/* Action Buttons: View More / View All / Show Less */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {hasMore && (
                <button
                  id="services-view-more-btn"
                  onClick={handleLoadMore}
                  className="px-7 py-3 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                >
                  <span>View More Services</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                    +{nextBatchCount}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}

              {hasMore && remainingCount > nextBatchCount && (
                <button
                  id="services-view-all-btn"
                  onClick={handleShowAll}
                  className="px-5 py-3 rounded-full border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 text-xs font-sans uppercase tracking-wider transition-all hover:scale-105 cursor-pointer bg-white shadow-2xs font-semibold"
                >
                  View All ({filteredServices.length})
                </button>
              )}

              {isExpanded && (
                <button
                  id="services-show-less-btn"
                  onClick={handleShowLess}
                  className="px-5 py-3 rounded-full border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer bg-white shadow-2xs font-semibold"
                >
                  <span>Show Less</span>
                  <ChevronUp className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Empty Search Fallback */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 rounded-[24px] bg-white border border-zinc-200 p-8 max-w-lg mx-auto shadow-xs">
            <Scissors className="w-10 h-10 text-[#9E6868] mx-auto mb-3 opacity-60" />
            <h4 className="text-lg font-serif font-bold text-zinc-950 mb-1">
              No services found for "{searchQuery}"
            </h4>
            <p className="text-xs text-zinc-500 mb-4">
              Try searching for "Keratin", "Facial", "Haircut", or clear your filter.
            </p>
            <button
              onClick={() => {
                handleCategorySelect('All');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 rounded-full bg-zinc-900 text-white text-xs font-sans uppercase tracking-wider font-semibold cursor-pointer hover:bg-black"
            >
              Show All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

