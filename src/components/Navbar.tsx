import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO } from '../data/salonData';
import { SalonLogo } from './SalonLogo';

export const Navbar: React.FC = () => {
  const { openBooking } = useBooking();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = [
        'home',
        'about',
        'services',
        'how-we-work',
        'stylists',
        'timings',
        'pricing',
        'reviews',
        'gallery',
        'faq',
        'contact'
      ];

      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Process', href: '#how-we-work', id: 'how-we-work' },
    { label: 'Stylists', href: '#stylists', id: 'stylists' },
    { label: 'Timings', href: '#timings', id: 'timings' },
    { label: 'Pricing', href: '#pricing', id: 'pricing' },
    { label: 'Reviews', href: '#reviews', id: 'reviews' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'py-3 px-3 sm:px-6 lg:px-10' : 'py-4 px-3 sm:px-6 lg:px-10'
      }`}
    >
      <div
        id="navbar-glass-container"
        className={`max-w-[1400px] mx-auto rounded-2xl sm:rounded-full bg-white/95 text-zinc-900 border border-zinc-200/90 backdrop-blur-xl transition-all duration-300 flex items-center justify-between px-4 sm:px-6 ${
          isScrolled ? 'py-2.5 shadow-md shadow-zinc-900/5' : 'py-3 shadow-xs'
        }`}
      >
        {/* Brand Logo with Official Unisex Emblem */}
        <a
          id="navbar-brand-logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#home');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <SalonLogo size="md" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-zinc-950">
                Hair Spray
              </span>
              <span className="text-[10px] font-sans px-1.5 py-0.5 rounded-full bg-stone-100 border border-stone-200 text-stone-700 font-semibold tracking-wider uppercase">
                Unisex
              </span>
            </div>
            <span className="text-[11px] font-sans tracking-wide text-zinc-500 font-normal">
              Kavoor, Mangalore · Est. 2017
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-link-${link.id}`}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`text-xs font-sans font-medium tracking-normal px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Dark/Light Toggle + Book Now CTA + Mobile Toggle */}
        <div id="navbar-actions" className="flex items-center gap-2 sm:gap-3">
          {/* Quick Call Button (Tablet & Desktop) */}
          <a
            id="nav-quick-call"
            href={`tel:${SALON_INFO.phoneClean}`}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 rounded-full border border-zinc-200 hover:border-zinc-300 transition-all hover:bg-zinc-50"
          >
            <Phone className="w-3.5 h-3.5 text-[#9E6868]" />
            <span>Call</span>
          </a>

          {/* Book Now Button */}
          <button
            id="nav-book-now-btn"
            onClick={() => openBooking()}
            className="flex items-center gap-2 bg-zinc-900 text-white hover:bg-black px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
          >
            <span>Book Now</span>
            <span className="text-[11px] text-zinc-300">↗</span>
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open Mobile Menu"
            className="lg:hidden w-9 h-9 rounded-full border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 flex items-center justify-center text-zinc-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-zinc-700" />}
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Glass Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-white/95 text-zinc-900 border border-zinc-200 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <span className="text-xs font-sans font-medium uppercase tracking-wider text-zinc-500">
                  Salon Navigation
                </span>
                <span className="text-xs font-sans font-semibold text-zinc-800">
                  4.7 Rating (301 Reviews)
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 my-2">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="p-2.5 rounded-xl hover:bg-zinc-100 text-xs font-sans font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center gap-3">
                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="flex-1 py-3 text-center rounded-xl border border-zinc-200 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
                >
                  Call Reception
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBooking();
                  }}
                  className="flex-1 py-3 text-center rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider"
                >
                  Book Online ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
