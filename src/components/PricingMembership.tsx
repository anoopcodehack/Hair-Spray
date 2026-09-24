import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Check, Crown, Zap, Shield, ArrowRight, Star, ChevronDown, ChevronUp, Layers, Scissors } from 'lucide-react';
import { MEMBERSHIP_PLANS, SERVICES_LIST } from '../data/salonData';
import { ServiceCategory } from '../types';
import { useBooking } from '../context/BookingContext';
import { AudienceFilter, isServiceForAudience, getAudienceBadge } from '../utils/serviceAudience';

const INITIAL_SINGLE_ITEMS = 6;
const BATCH_SIZE = 6;

export const PricingMembership: React.FC = () => {
  const { openBooking } = useBooking();
  const [activeTab, setActiveTab] = useState<'single' | 'membership'>('membership');
  const [audience, setAudience] = useState<AudienceFilter>('all');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_SINGLE_ITEMS);

  // Audience filtered list
  const audienceServices = useMemo(() => {
    return SERVICES_LIST.filter((s) => isServiceForAudience(s, audience));
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
    return list.filter((c) => c.count > 0 || c.label === 'All');
  }, [audienceServices]);

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') return audienceServices;
    return audienceServices.filter((s) => {
      if (selectedCategory === 'Facial & Skin') return s.category === 'Facial & Skin' || s.category === 'Facial';
      if (selectedCategory === 'Bridal & Makeup') return s.category === 'Bridal & Makeup' || s.category === 'Makeup';
      if (selectedCategory === 'Waxing') return s.category === 'Waxing' || s.category === 'Hair Removal';
      if (selectedCategory === 'Pedicure & Manicure') return s.category === 'Pedicure & Manicure' || s.category === 'Nails';
      return s.category === selectedCategory;
    });
  }, [audienceServices, selectedCategory]);

  const visibleServices = useMemo(() => {
    return filteredServices.slice(0, visibleCount);
  }, [filteredServices, visibleCount]);

  const hasMore = visibleCount < filteredServices.length;
  const remainingCount = Math.max(0, filteredServices.length - visibleCount);
  const nextBatch = Math.min(BATCH_SIZE, remainingCount);
  const isExpanded = visibleCount > INITIAL_SINGLE_ITEMS;

  const handleAudienceChange = (targetAudience: AudienceFilter) => {
    setAudience(targetAudience);
    setSelectedCategory('All');
    setVisibleCount(INITIAL_SINGLE_ITEMS);
  };

  const handleCategoryChange = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    setVisibleCount(INITIAL_SINGLE_ITEMS);
  };


  return (
    <section id="pricing" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Transparent Rates & Privilege</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              VIP Memberships & Individual Services Pricing
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            Choose single transparent services or join our exclusive VIP Memberships to receive dedicated appointments and up to 40% privilege savings.
          </p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 rounded-full bg-zinc-200/70 border border-zinc-300">
            <button
              id="pricing-tab-membership"
              onClick={() => setActiveTab('membership')}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'membership'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              VIP Membership Plans
            </button>
            <button
              id="pricing-tab-single"
              onClick={() => setActiveTab('single')}
              className={`px-6 py-2.5 rounded-full text-xs font-sans font-medium transition-all duration-200 cursor-pointer ${
                activeTab === 'single'
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              Individual Services Menu
            </button>
          </div>
        </div>

        {/* Tab 1: VIP Membership Plans */}
        {activeTab === 'membership' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {MEMBERSHIP_PLANS.map((plan, idx) => {
              const isPopular = plan.popular;
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className={`rounded-[28px] p-8 sm:p-10 flex flex-col justify-between relative transition-all duration-300 ${
                    isPopular
                      ? 'bg-white border-2 border-zinc-900 shadow-xl lg:-translate-y-2'
                      : 'bg-white border border-zinc-200 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Popular Ribbon */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-zinc-900 text-white text-[11px] font-sans font-semibold shadow-md flex items-center gap-1.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>Most Popular VIP</span>
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-zinc-950">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 font-sans font-medium">
                          {plan.tagline}
                        </p>
                      </div>
                      <span className={`p-2.5 rounded-2xl ${isPopular ? 'bg-zinc-100 text-zinc-900' : 'bg-zinc-100 text-zinc-500'}`}>
                        <Crown className="w-5 h-5" />
                      </span>
                    </div>

                    {/* Price Block */}
                    <div className="mb-8 pb-6 border-b border-zinc-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950">
                          ₹{plan.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-zinc-500 font-sans">
                          / {plan.billingPeriod}
                        </span>
                      </div>
                      <span className="inline-block mt-3 text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-[#9E6868]/10 text-[#9E6868]">
                        {plan.discounts}
                      </span>
                    </div>

                    {/* Features Checklist */}
                    <div className="space-y-3.5 mb-10">
                      <p className="text-xs font-sans uppercase tracking-wider text-zinc-400 font-semibold">
                        Included Privileges:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#9E6868]" />
                          <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Choose Plan CTA */}
                  <button
                    id={`select-plan-${plan.id}`}
                    onClick={() => {
                      openBooking(null, null);
                    }}
                    className={`w-full py-4 rounded-full text-xs font-sans uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPopular
                        ? 'bg-zinc-900 text-white hover:bg-black shadow-md hover:scale-105 active:scale-95'
                        : 'border border-zinc-300 text-zinc-800 hover:bg-zinc-100 font-semibold'
                    }`}
                  >
                    <span>Join {plan.name}</span>
                    <span>↗</span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Single Service Menu Summary */}
        {activeTab === 'single' && (
          <div className="flex flex-col">
            {/* Gender / Audience Segment Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 p-1.5 bg-zinc-100 rounded-2xl w-fit mx-auto border border-zinc-200">
              <button
                type="button"
                onClick={() => handleAudienceChange('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                  audience === 'all'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Services</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${audience === 'all' ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-700'}`}>
                  {SERVICES_LIST.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleAudienceChange('women')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                  audience === 'women'
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-rose-900 hover:bg-rose-50'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Women & Girls</span>
              </button>

              <button
                type="button"
                onClick={() => handleAudienceChange('men')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-semibold transition-all cursor-pointer ${
                  audience === 'men'
                    ? 'bg-zinc-900 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <Scissors className="w-3.5 h-3.5 text-sky-400" />
                <span>Men & Boys</span>
              </button>
            </div>

            {/* Category Selector Chips */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryChange(cat.label)}
                    className={`px-4 py-2 rounded-full text-xs font-sans font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                        : 'border border-zinc-200 bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white font-semibold' : 'bg-zinc-100 text-zinc-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Anchor for smooth scroll on collapse */}
            <div id="pricing-single-top" className="scroll-mt-28" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleServices.map((service) => {
                const aud = getAudienceBadge(service);
                return (
                <div
                  key={service.id}
                  className="p-6 rounded-[24px] bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-md flex flex-col justify-between transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 font-sans text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#9E6868] font-bold">
                          {service.category}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${aud.badgeClass}`}>
                          {aud.shortLabel}
                        </span>
                      </div>
                      <span className="text-zinc-500 font-medium">
                        {service.durationMin}m
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-zinc-950 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-xs text-zinc-600 mb-4 line-clamp-2 leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xl font-serif font-bold text-zinc-950">
                          ₹{service.price.toLocaleString()}
                        </span>
                        {service.priceSecondary && (
                          <span className="text-xs font-sans text-[#9E6868] font-semibold">
                            / ₹{service.priceSecondary.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {service.priceNote && (
                        <span className="text-[10px] font-sans text-zinc-400 block mt-0.5">
                          {service.priceNote}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => openBooking(service)}
                      className="px-4 py-2 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-sans uppercase tracking-wider font-semibold hover:scale-105 transition-transform shrink-0 cursor-pointer shadow-2xs"
                    >
                      Book ↗
                    </button>
                  </div>
                </div>
                );
              })}
            </div>

            {/* View More / Load More Section */}
            {(hasMore || isExpanded) && (
              <div className="mt-12 flex flex-col items-center justify-center pt-8 border-t border-zinc-200">
                <div className="flex flex-col items-center gap-2 mb-5">
                  <span className="text-xs font-sans text-zinc-600 flex items-center gap-2 font-medium">
                    <Layers className="w-3.5 h-3.5 text-[#9E6868]" />
                    <span>
                      Showing <strong className="text-zinc-950 font-semibold">{visibleServices.length}</strong> of{' '}
                      <strong className="text-zinc-950 font-semibold">{filteredServices.length}</strong> services
                      {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                    </span>
                  </span>
                  <div className="w-48 h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (visibleServices.length / filteredServices.length) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {hasMore && (
                    <button
                      id="pricing-view-more-btn"
                      onClick={() => setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredServices.length))}
                      className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
                    >
                      <span>View More Services</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px]">
                        +{nextBatch}
                      </span>
                      <ChevronDown className="w-4 h-4 animate-bounce" />
                    </button>
                  )}

                  {isExpanded && (
                    <button
                      id="pricing-show-less-btn"
                      onClick={() => {
                        setVisibleCount(INITIAL_SINGLE_ITEMS);
                        const el = document.getElementById('pricing-single-top');
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="px-5 py-3 rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-800 hover:text-black text-xs font-sans uppercase tracking-wider flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer bg-white font-semibold"
                    >
                      <span>Show Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
