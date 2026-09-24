import React from 'react';
import { Phone, MapPin, Instagram, MessageCircle, ArrowUp, Heart, ShieldCheck } from 'lucide-react';
import { SALON_INFO, SERVICES_LIST } from '../data/salonData';
import { useBooking } from '../context/BookingContext';
import { SalonLogo } from './SalonLogo';

export const Footer: React.FC = () => {
  const { openBooking } = useBooking();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Salon Menu', href: '#services' },
    { label: '4-Step Process', href: '#how-we-work' },
    { label: 'Master Stylists', href: '#stylists' },
    { label: 'Weekly Timings', href: '#timings' },
    { label: 'VIP Memberships', href: '#pricing' },
    { label: 'Client Reviews', href: '#reviews' },
    { label: 'Gallery Portfolio', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact & Map', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="relative z-10 pt-20 pb-28 sm:pb-16 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 border-t border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-200">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#home" className="flex items-center gap-3 mb-5 group cursor-pointer">
              <SalonLogo size="md" />
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-zinc-950 block">
                  Hair Spray
                </span>
                <p className="text-[10px] tracking-widest uppercase font-sans text-[#9E6868] font-bold">
                  Unisex Salon & Academy · Kavoor
                </p>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6 max-w-sm font-normal">
              Kavoor’s flagship unisex salon for precision cuts, Keratin & Nanoplastia, bridal & groom packages, clinical O+3 facials, and grooming mastery since 2017.
            </p>

            <div className="flex items-center gap-2 font-sans text-xs">
              <div className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9E6868]" />
                <span>9 Years (Est. 2017)</span>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold">
                4.7 ★ (301 Reviews)
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-zinc-500 mb-5 font-bold">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2.5 text-xs font-sans">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Signature Treatments */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-sans uppercase tracking-widest text-zinc-500 mb-5 font-bold">
              Signature Menu
            </h4>
            <ul className="space-y-2.5 text-xs font-sans">
              <li>
                <button
                  onClick={() => openBooking(SERVICES_LIST[0])}
                  className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-left cursor-pointer"
                >
                  Bridal Package
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBooking(SERVICES_LIST[1])}
                  className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-left cursor-pointer"
                >
                  Groom Package
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBooking(SERVICES_LIST.find(s => s.id === 'keratin-treatment') || SERVICES_LIST[0])}
                  className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-left cursor-pointer"
                >
                  Keratin Treatment
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBooking(SERVICES_LIST.find(s => s.id === 'o3-facial') || SERVICES_LIST[0])}
                  className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-left cursor-pointer"
                >
                  O+3 Clinical Facial
                </button>
              </li>
              <li>
                <button
                  onClick={() => openBooking(SERVICES_LIST.find(s => s.id === 'fish-spa') || SERVICES_LIST[0])}
                  className="text-zinc-600 hover:text-zinc-950 font-medium transition-colors text-left cursor-pointer"
                >
                  Garra Rufa Fish Spa
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-sans uppercase tracking-widest text-zinc-500 mb-5 font-bold">
              Salon & Hours
            </h4>
            <div className="space-y-3 text-xs text-zinc-600 font-sans">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#9E6868] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{SALON_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9E6868] shrink-0" />
                <a href={`tel:${SALON_INFO.phoneClean}`} className="text-zinc-950 font-bold hover:underline">
                  {SALON_INFO.phone}
                </a>
              </p>
              <div className="pt-2 border-t border-zinc-100 mt-3">
                <p className="font-bold text-zinc-800 mb-1">
                  Operating Hours:
                </p>
                <p className="text-zinc-500">Mon: 9:00am–8:00pm</p>
                <p className="text-zinc-500">Tue: 10:00am–8:00pm</p>
                <p className="text-zinc-500">Wed–Sun: 9:00am–8:00pm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-500">
          <p>
            © 2017–{new Date().getFullYear()} Hair Spray Unisex Salon · Kavoor, Mangalore. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('replay-loader-intro'));
              }}
              className="px-3 py-1.5 rounded-full border border-zinc-200 text-[11px] font-sans text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-pointer flex items-center gap-1.5"
              title="Replay intro animation"
            >
              <span>Replay Intro Animation ↺</span>
            </button>

            <button
              onClick={scrollToTop}
              aria-label="Back to Top"
              className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-50 transition-all cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
