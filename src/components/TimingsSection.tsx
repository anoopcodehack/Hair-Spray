import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Clock, CheckCircle2, Phone, MapPin, Wind, ShieldCheck, CreditCard } from 'lucide-react';
import { SALON_TIMINGS, SALON_INFO } from '../data/salonData';
import { useBooking } from '../context/BookingContext';

export const TimingsSection: React.FC = () => {
  const { openBooking } = useBooking();

  // Calculate current IST status
  const currentStatus = useMemo(() => {
    const now = new Date();
    // UTC offset for IST (+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    const dayIndex = istDate.getDay(); // 0 is Sunday, 1 is Monday ...
    const hour = istDate.getHours();
    const minute = istDate.getMinutes();
    const timeNum = hour + minute / 60;

    // Day mapping: 0 -> Sun (index 6), 1 -> Mon (index 0), 2 -> Tue (index 1)...
    const dayMap = [6, 0, 1, 2, 3, 4, 5];
    const todayTimingIndex = dayMap[dayIndex];
    const todayTiming = SALON_TIMINGS[todayTimingIndex];

    const openHour = todayTiming.day === 'Tuesday' ? 10 : 9;
    const closeHour = 20; // 8:00 PM

    const isOpen = timeNum >= openHour && timeNum < closeHour;

    return {
      todayIndex: todayTimingIndex,
      todayName: todayTiming.day,
      isOpen,
      openHourStr: todayTiming.day === 'Tuesday' ? '10:00 AM' : '09:00 AM',
      closeHourStr: '08:00 PM'
    };
  }, []);

  return (
    <section id="timings" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-white text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Heading & Live Status */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Operating Schedule</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-950 tracking-tight leading-[1.1] mb-5">
              Open 7 Days a Week to Perfect Your Look
            </h2>

            <p className="text-sm text-zinc-600 leading-relaxed mb-8 max-w-lg font-normal">
              Walk-ins and reserved slots welcomed throughout the week. Centrally situated in Kavoor with climate-controlled private grooming bays and dedicated parking.
            </p>

            {/* Live Status Badge */}
            <div className="p-6 rounded-[24px] bg-[#FAFAFA] border border-zinc-200 w-full mb-8 flex items-center justify-between flex-wrap gap-4 shadow-xs">
              <div className="flex items-center gap-3.5">
                <div className={`w-3 h-3 rounded-full ${currentStatus.isOpen ? 'bg-emerald-600 shadow-md shadow-emerald-600/30 animate-pulse' : 'bg-amber-500'}`} />
                <div>
                  <div className="flex items-center gap-2 font-sans">
                    <span className="text-sm font-serif font-bold text-zinc-950">
                      {currentStatus.isOpen ? 'Salon is Open Now' : 'Salon is Currently Closed'}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      currentStatus.isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      Live IST
                    </span>
                  </div>
                  <p className="text-xs font-sans text-zinc-500 mt-1">
                    Today ({currentStatus.todayName}): {currentStatus.openHourStr} – {currentStatus.closeHourStr}
                  </p>
                </div>
              </div>

              <button
                onClick={() => openBooking()}
                className="px-5 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-black text-xs font-sans uppercase tracking-wider font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xs"
              >
                Book Today
              </button>
            </div>

            {/* Amenities list */}
            <div className="grid grid-cols-2 gap-3 w-full font-sans text-xs">
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2.5 text-zinc-700 font-medium">
                <Wind className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>Central A/C Lounge</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2.5 text-zinc-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#9E6868] shrink-0" />
                <span>Autoclaved Utensils</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2.5 text-zinc-700 font-medium">
                <CreditCard className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>UPI & Cards Accepted</span>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center gap-2.5 text-zinc-700 font-medium">
                <Phone className="w-4 h-4 text-[#9E6868] shrink-0" />
                <span>+91 74879 68588</span>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Table Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-[28px] bg-[#FAFAFA] border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-zinc-200">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#9E6868]" />
                  <span className="font-serif text-lg font-bold text-zinc-950">
                    Weekly Operating Schedule
                  </span>
                </div>
                <span className="text-xs font-sans text-zinc-500 font-medium">
                  IST Timezone
                </span>
              </div>

              {/* Timings Rows */}
              <div className="space-y-2 font-sans text-xs">
                {SALON_TIMINGS.map((timing, idx) => {
                  const isToday = idx === currentStatus.todayIndex;
                  return (
                    <div
                      key={timing.day}
                      className={`px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                        isToday
                          ? 'bg-white border border-zinc-300 text-zinc-950 font-semibold shadow-xs'
                          : 'bg-white/60 border border-zinc-200 text-zinc-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={isToday ? 'text-zinc-950 font-semibold' : 'text-zinc-800'}>
                          {timing.day}
                        </span>
                        {isToday && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-zinc-900 text-white">
                            Today
                          </span>
                        )}
                      </div>

                      <div>
                        <span className={isToday ? 'text-zinc-950 font-bold' : 'text-zinc-600'}>
                          {timing.open === '10:00' ? '10:00 AM' : '09:00 AM'} – 08:00 PM
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Call to action note */}
              <div className="mt-6 pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
                <span className="text-zinc-500 text-center sm:left font-normal">
                  Need early bridal or late event styling?
                </span>
                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="font-semibold text-zinc-900 hover:text-black hover:underline whitespace-nowrap"
                >
                  Call +91 74879 68588 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
