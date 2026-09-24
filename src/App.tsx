import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { BookingProvider } from './context/BookingContext';
import { LoaderSequence } from './components/LoaderSequence';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ServicesSection } from './components/ServicesSection';
import { HowWeWork } from './components/HowWeWork';
import { Stylists } from './components/Stylists';
import { TimingsSection } from './components/TimingsSection';
import { PricingMembership } from './components/PricingMembership';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MobileBookingBar } from './components/MobileBookingBar';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const handleReplay = () => setIsLoading(true);
    window.addEventListener('replay-loader-intro', handleReplay);
    return () => window.removeEventListener('replay-loader-intro', handleReplay);
  }, []);

  return (
    <ThemeProvider>
      <BookingProvider>
        {/* Page Load Sequence Animation (Skippable) */}
        {isLoading && (
          <LoaderSequence onComplete={() => setIsLoading(false)} />
        )}

        <div className="relative min-h-screen bg-[#FAFAFA] text-zinc-900 selection:bg-zinc-900 selection:text-white transition-colors duration-300 overflow-x-hidden">
          {/* Sticky Frosted Glass Navigation Bar */}
          <Navbar />

          {/* Main Website Sections */}
          <main className="relative">
            {/* A. Hero Section */}
            <Hero />

            {/* B. About Section */}
            <About />

            {/* C. Services Section */}
            <ServicesSection />

            {/* D. How We Work 4-Step Process */}
            <HowWeWork />

            {/* E. Stylists / Staff */}
            <Stylists />

            {/* F. Timings & Live Open Status */}
            <TimingsSection />

            {/* G. Pricing & VIP Membership Plans */}
            <PricingMembership />

            {/* H. Reviews & Testimonials */}
            <ReviewsSection />

            {/* I. Gallery & Lightbox */}
            <GallerySection />

            {/* J. FAQ Section */}
            <FAQSection />

            {/* K & L. Contact Us & Map */}
            <ContactSection />
          </main>

          {/* M. Footer */}
          <Footer />

          {/* Interactive Booking Modal (Triggered across all sections) */}
          <BookingModal />

          {/* Mobile Sticky Booking Bar */}
          <MobileBookingBar />
        </div>
      </BookingProvider>
    </ThemeProvider>
  );
}
