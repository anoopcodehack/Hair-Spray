import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Calendar,
  Clock,
  User,
  Scissors,
  CheckCircle2,
  Phone,
  Tag,
  ArrowRight,
  Share2,
  MessageSquare,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking } from '../context/BookingContext';
import { SERVICES_LIST, STYLISTS_LIST, TIME_SLOTS, SALON_INFO } from '../data/salonData';
import { AudienceFilter, isServiceForAudience, getAudienceBadge } from '../utils/serviceAudience';

export const BookingModal: React.FC = () => {
  const {
    isBookingOpen,
    closeBooking,
    selectedService,
    setSelectedService,
    selectedStylist,
    setSelectedStylist,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    addBooking,
  } = useBooking();

  const [bookingAudience, setBookingAudience] = useState<AudienceFilter>('all');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');
  const [whatsAppUrl, setWhatsAppUrl] = useState('');

  // 14-day booking window
  const dateStrip = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      dates.push({ iso, dayName, dayNum, monthName });
    }
    return dates;
  }, []);

  // Filter available treatments by audience (All / Women / Men)
  const filteredServicesList = useMemo(() => {
    return SERVICES_LIST.filter((s) => isServiceForAudience(s, bookingAudience));
  }, [bookingAudience]);

  // Calculate pricing
  const basePrice = selectedService ? selectedService.price : 0;
  const discountRate = promoApplied ? 0.15 : 0;
  const discountAmount = Math.round(basePrice * discountRate);
  const finalPrice = Math.max(0, basePrice - discountAmount);

  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (clean === 'FIRSTGLAM' || clean === 'HAIRSPRAY10' || clean === 'HAIRSPRAAY10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "FIRSTGLAM" for 15% off.');
    }
  };

  const generateWhatsAppMessage = (bId: string) => {
    const srvName = selectedService?.name || 'Salon Consultation';
    const srvPrice = `₹${finalPrice.toLocaleString()}`;
    const stylistName = selectedStylist ? selectedStylist.name : 'Next Available Specialist';
    const noteText = customerNotes.trim() ? `\n📝 *Notes:* ${customerNotes.trim()}` : '';
    const couponText = promoApplied ? `\n🏷️ *Promo:* FIRSTGLAM (15% OFF applied)` : '';

    return `*Hair Spray Unisex Salon — Appointment Booking* ✂️✨

👤 *Client:* ${customerName.trim()}
📞 *Phone:* ${customerPhone.trim()}
💇 *Treatment:* ${srvName} (${srvPrice})
📅 *Date:* ${selectedDate}
⏰ *Time:* ${selectedTime}
💈 *Stylist:* ${stylistName}${noteText}${couponText}
🔖 *Ref ID:* #${bId}

_Hello Hair Spray Salon! Please confirm my booking at your Kavoor branch._`;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !customerName.trim() || !customerPhone.trim()) return;

    const bId = `HS-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(bId);

    const bookingPayload = {
      bookingId: bId,
      service: selectedService,
      stylist: selectedStylist || undefined,
      date: selectedDate,
      timeSlot: selectedTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      totalPrice: finalPrice,
      createdAt: new Date().toISOString(),
    };

    // Save purely on the client side in state
    addBooking(bookingPayload);

    // Build WhatsApp URL
    const message = generateWhatsAppMessage(bId);
    const waLink = `https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(message)}`;
    setWhatsAppUrl(waLink);

    // Open WhatsApp directly
    try {
      window.open(waLink, '_blank', 'noopener,noreferrer');
    } catch (err) {
      // safe fallback if popup was blocked
    }

    setIsConfirmed(true);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10B981', '#9E6868', '#18181B']
      });
    } catch {
      // confetti fallback
    }
  };

  const handleResetAndClose = () => {
    setIsConfirmed(false);
    setPromoApplied(false);
    setPromoCode('');
    setCustomerNotes('');
    closeBooking();
  };

  React.useEffect(() => {
    if (!isBookingOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleResetAndClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBookingOpen]);

  if (!isBookingOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={handleResetAndClose}
    >
      <motion.div
        id="booking-modal-card"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl bg-white border border-zinc-200 p-6 sm:p-8 rounded-[28px] text-zinc-900 shadow-2xl relative my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-booking-modal-btn"
          onClick={handleResetAndClose}
          aria-label="Cancel and close booking modal"
          className="absolute top-6 right-6 p-2 rounded-full border border-zinc-200 hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {isConfirmed ? (
          /* Confirmation View with WhatsApp and Direct Call */
          <div className="text-center py-6 sm:py-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="font-sans text-xs uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Details Prepared For WhatsApp
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950 mt-3 mb-2">
              Ready to Send, {customerName.split(' ')[0]}!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto mb-6 font-normal">
              WhatsApp has been triggered with your pre-filled reservation details. Send the message on WhatsApp to confirm with our reception immediately.
            </p>

            {/* Booking Summary Pass */}
            <div className="w-full rounded-2xl p-5 text-left mb-6 border border-zinc-200 bg-zinc-50 shadow-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-200">
                <span className="font-sans text-xs font-bold text-zinc-950">
                  Booking Reference: #{confirmedBookingId}
                </span>
                <span className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Ready to Dispatch
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                <div>
                  <p className="text-zinc-500 font-medium">Treatment</p>
                  <p className="font-bold text-sm text-zinc-950 font-serif">
                    {selectedService?.name}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 font-medium">Stylist</p>
                  <p className="font-bold text-sm text-zinc-950 font-serif">
                    {selectedStylist ? selectedStylist.name : 'Next Available Expert'}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 font-medium">Date & Time</p>
                  <p className="font-bold text-sm text-zinc-950 font-serif">
                    {selectedDate} at {selectedTime}
                  </p>
                </div>

                <div>
                  <p className="text-zinc-500 font-medium">Payable at Salon</p>
                  <p className="font-bold text-sm text-emerald-800 font-serif">
                    ₹{finalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Action Options */}
            <div className="flex flex-col sm:flex-row gap-3 w-full font-sans text-xs">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-xs transition-transform hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Open WhatsApp Chat</span>
              </a>

              <a
                href={`tel:${SALON_INFO.phoneClean}`}
                className="flex-1 py-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Salon: {SALON_INFO.phone}</span>
              </a>
            </div>

            <button
              onClick={handleResetAndClose}
              className="mt-4 text-xs text-zinc-500 hover:text-zinc-900 underline font-sans cursor-pointer"
            >
              Done & Close Window
            </button>
          </div>
        ) : (
          /* Client-Side Booking Form */
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Modal Header */}
            <div>
              <div className="font-sans text-xs uppercase tracking-widest text-emerald-700 mb-1 font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Direct WhatsApp & Call Booking</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-950">
                Book Your Appointment
              </h3>
              <p className="text-xs text-zinc-500 mt-1 font-sans font-medium">
                Kavoor, Mangalore · No advance payment needed · Chat or call directly to confirm
              </p>
            </div>

            {/* Step 1: Select Service with Gender Quick Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-sans uppercase tracking-wider text-zinc-700 font-semibold">
                  1. Select Treatment ({filteredServicesList.length} options)
                </label>

                {/* Audience filter tabs */}
                <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
                  <button
                    type="button"
                    onClick={() => setBookingAudience('all')}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-sans transition-colors cursor-pointer ${
                      bookingAudience === 'all'
                        ? 'bg-zinc-900 text-white font-semibold'
                        : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingAudience('women')}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-sans transition-colors cursor-pointer ${
                      bookingAudience === 'women'
                        ? 'bg-rose-900 text-white font-semibold'
                        : 'text-zinc-600 hover:text-rose-900'
                    }`}
                  >
                    Women
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingAudience('men')}
                    className={`px-2.5 py-1 text-[11px] rounded-md font-sans transition-colors cursor-pointer ${
                      bookingAudience === 'men'
                        ? 'bg-sky-900 text-white font-semibold'
                        : 'text-zinc-600 hover:text-sky-900'
                    }`}
                  >
                    Men
                  </button>
                </div>
              </div>

              <select
                id="booking-service-dropdown"
                value={selectedService?.id || ''}
                onChange={(e) => {
                  const s = SERVICES_LIST.find((item) => item.id === e.target.value);
                  setSelectedService(s || null);
                }}
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-300 text-xs sm:text-sm font-serif font-semibold text-zinc-950 focus:outline-none focus:border-zinc-900 focus:bg-white"
              >
                {filteredServicesList.map((srv) => {
                  const aud = getAudienceBadge(srv);
                  return (
                    <option key={srv.id} value={srv.id} className="bg-white text-zinc-950">
                      [{aud.shortLabel}] {srv.name} — ₹{srv.price.toLocaleString()} ({srv.durationMin} mins)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Step 2: Preferred Stylist (Optional) */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 mb-2 font-semibold">
                2. Preferred Specialist (Optional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStylist(null)}
                  className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                    selectedStylist === null
                      ? 'border-zinc-900 bg-zinc-900 text-white font-bold shadow-xs'
                      : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                  }`}
                >
                  <p className={`font-serif font-semibold text-xs ${selectedStylist === null ? 'text-white' : 'text-zinc-950'}`}>Any Expert</p>
                  <p className={`text-[10px] font-sans font-medium ${selectedStylist === null ? 'text-white/70' : 'text-zinc-400'}`}>Next available</p>
                </button>

                {STYLISTS_LIST.map((stylist) => (
                  <button
                    type="button"
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      selectedStylist?.id === stylist.id
                        ? 'border-zinc-900 bg-zinc-900 text-white font-bold shadow-xs'
                        : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
                    }`}
                  >
                    <p className={`font-serif font-semibold text-xs truncate ${selectedStylist?.id === stylist.id ? 'text-white' : 'text-zinc-950'}`}>
                      {stylist.name.split(' ')[0]}
                    </p>
                    <p className={`text-[10px] font-sans font-medium truncate ${selectedStylist?.id === stylist.id ? 'text-white/70' : 'text-zinc-400'}`}>
                      {stylist.role.split('&')[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Date Strip */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-sans uppercase tracking-wider text-zinc-700 font-semibold">
                  3. Select Date
                </label>
                <span className="text-xs font-sans text-emerald-800 font-bold">
                  {selectedDate}
                </span>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {dateStrip.map((item) => {
                  const isSelected = selectedDate === item.iso;
                  return (
                    <button
                      type="button"
                      key={item.iso}
                      id={`date-pill-${item.iso}`}
                      onClick={() => setSelectedDate(item.iso)}
                      className={`flex flex-col items-center justify-center min-w-[62px] py-3 rounded-xl transition-all cursor-pointer font-sans ${
                        isSelected
                          ? 'bg-zinc-900 text-white font-bold scale-105 shadow-xs'
                          : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider font-semibold">{item.dayName}</span>
                      <span className="text-base font-serif font-bold">{item.dayNum}</span>
                      <span className="text-[9px] opacity-70 font-medium">{item.monthName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Time Slot Matrix */}
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 mb-2 font-semibold">
                4. Select Time Slot
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 font-sans">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      id={`time-slot-${slot.replace(/\s+|:/g, '')}`}
                      onClick={() => setSelectedTime(slot)}
                      className={`py-2 px-3 rounded-xl text-xs transition-all cursor-pointer font-medium ${
                        isSelected
                          ? 'bg-zinc-900 text-white font-bold shadow-xs'
                          : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:border-zinc-300'
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Guest Details */}
            <div className="space-y-3 pt-2 border-t border-zinc-200">
              <label className="block text-xs font-sans uppercase tracking-wider text-zinc-700 font-semibold">
                5. Guest Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    id="booking-name-input"
                    placeholder="Full Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    id="booking-phone-input"
                    placeholder="Phone / WhatsApp Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Requests / Notes (Optional) */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Special requests or questions (optional)"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs focus:outline-none focus:border-zinc-900 focus:bg-white"
                />
              </div>

              {/* Promo Code Strip */}
              <div className="flex gap-2 pt-1 font-sans text-xs">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Promo code (FIRSTGLAM)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-300 text-zinc-950 placeholder:text-zinc-400 text-xs uppercase focus:outline-none focus:border-zinc-900"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="px-4 py-2 rounded-xl border border-zinc-300 bg-zinc-100 hover:bg-zinc-200 text-xs text-zinc-800 font-semibold cursor-pointer transition-colors"
                >
                  {promoApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] font-sans text-emerald-700 font-semibold">
                  ✓ FIRSTGLAM coupon applied! You saved ₹{discountAmount}.
                </p>
              )}
              {promoError && (
                <p className="text-[11px] font-sans text-rose-600 font-semibold">
                  {promoError}
                </p>
              )}
            </div>

            {/* Bottom Action Strip: WhatsApp primary, Direct call secondary */}
            <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-sans uppercase text-zinc-500 font-semibold block">
                  Estimated at Salon
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-serif font-bold text-zinc-950">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                  {promoApplied && (
                    <span className="text-xs font-sans text-zinc-400 line-through">
                      ₹{basePrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                {/* Direct Phone Call Button */}
                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="px-4 py-3 rounded-full border border-zinc-300 text-zinc-800 hover:bg-zinc-100 font-sans text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Call reception directly"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Call Us</span>
                </a>

                {/* Primary WhatsApp Booking Button */}
                <button
                  type="submit"
                  id="submit-booking-form-btn"
                  className="flex-1 sm:flex-none px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Send via WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
