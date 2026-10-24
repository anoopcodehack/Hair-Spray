import React from 'react';
import { Calendar, Phone, MessageCircle, MapPin } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO } from '../data/salonData';

export const MobileBookingBar: React.FC = () => {
  const { openBooking } = useBooking();

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Hair Spray Unisex Salon Near Union Bank Kavoor Airport Road Mangalore'
  )}`;

  return (
    <div
      id="mobile-sticky-booking-bar"
      className="lg:hidden fixed bottom-3 inset-x-3 z-30 pointer-events-auto"
    >
      <div className="p-1.5 sm:p-2 rounded-2xl border border-zinc-200/90 shadow-2xl backdrop-blur-xl bg-white/95 flex items-center justify-between gap-1.5 text-zinc-900">
        {/* Quick Call */}
        <a
          id="mobile-bar-call"
          href={`tel:${SALON_INFO.phoneClean}`}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 text-zinc-800 transition-colors"
          aria-label="Call salon"
        >
          <Phone className="w-4 h-4 text-zinc-900 mb-0.5" />
          <span className="text-[10px] font-sans font-semibold">Call</span>
        </a>

        {/* WhatsApp Direct */}
        <a
          id="mobile-bar-whatsapp"
          href={`https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(SALON_INFO.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[10px] font-sans font-semibold">WhatsApp</span>
        </a>

        {/* Directions / Map */}
        <a
          id="mobile-bar-directions"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/60 text-zinc-800 transition-colors"
          aria-label="Get directions to Kavoor salon"
        >
          <MapPin className="w-4 h-4 text-[#9E6868] mb-0.5" />
          <span className="text-[10px] font-sans font-semibold">Directions</span>
        </a>

        {/* Book Now (Primary CTA) */}
        <button
          id="mobile-bar-book-btn"
          onClick={() => openBooking()}
          className="flex-[1.4] py-2 px-3 rounded-xl bg-zinc-900 hover:bg-black text-white flex flex-col items-center justify-center shadow-xs active:scale-95 transition-transform cursor-pointer"
          aria-label="Open booking modal"
        >
          <Calendar className="w-4 h-4 text-zinc-200 mb-0.5" />
          <span className="text-[10px] font-sans uppercase font-bold tracking-wider">Book Now</span>
        </button>
      </div>
    </div>
  );
};
