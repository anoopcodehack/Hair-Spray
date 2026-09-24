import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { SALON_INFO } from '../data/salonData';

export const MobileBookingBar: React.FC = () => {
  const { openBooking } = useBooking();

  return (
    <div
      id="mobile-sticky-booking-bar"
      className="lg:hidden fixed bottom-3 inset-x-3 z-30 pointer-events-auto"
    >
      <div className="p-3 rounded-2xl border border-zinc-200 shadow-xl backdrop-blur-md bg-white/95 flex items-center justify-between gap-3 text-zinc-900">
        <a
          id="mobile-quick-call-btn"
          href={`tel:${SALON_INFO.phoneClean}`}
          className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center shrink-0 transition-colors"
          aria-label="Call Salon"
        >
          <Phone className="w-4 h-4 text-[#9E6868]" />
        </a>

        <div className="flex-1 min-w-0 px-1">
          <p className="text-xs font-serif font-bold text-zinc-950 truncate">
            Hair Spray Unisex Salon
          </p>
          <p className="text-[10px] font-sans text-zinc-500 truncate font-medium">
            4.7 ★ (301 Reviews) · Kavoor, Mangalore
          </p>
        </div>

        <button
          id="mobile-sticky-book-btn"
          onClick={() => openBooking()}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-sans uppercase tracking-wider font-semibold flex items-center gap-1.5 shadow-xs shrink-0 active:scale-95 transition-transform cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Reserve</span>
        </button>
      </div>
    </div>
  );
};
