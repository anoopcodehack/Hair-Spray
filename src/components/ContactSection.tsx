import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Instagram,
  Navigation,
  Send,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setName('');
      setPhone('');
      setMessage('');
    }, 2500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-10 bg-[#FAFAFA] text-zinc-900 relative z-10 border-b border-zinc-200">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-200 mb-12">
          <div>
            <div className="font-sans text-xs uppercase tracking-widest text-[#9E6868] mb-3 flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#9E6868]" />
              <span>Find & Inquire</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-950 max-w-2xl leading-[1.1]">
              Salon Location & Direct Channels
            </h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-md font-normal leading-relaxed">
            Conveniently situated adjacent to Union Bank at Kavoor Junction with dedicated parking, climate-controlled comfort, and hospitable staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Card */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-8 sm:p-10 rounded-[28px] bg-white border border-zinc-200 shadow-xs flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-8 flex-wrap gap-2">
                  <h3 className="text-2xl font-serif font-bold text-zinc-950">
                    Salon Headquarters
                  </h3>
                  <a
                    href={SALON_INFO.justdialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-sans font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    <span className="text-[#9E6868] font-bold">★</span>
                    <span>Justdial 4.7 (301 Reviews)</span>
                  </a>
                </div>

                <div className="space-y-6 font-sans text-xs">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 text-[#9E6868] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="uppercase text-zinc-400 tracking-wider text-[10px] mb-0.5 font-bold">
                        Address & Landmark
                      </p>
                      <p className="text-sm text-zinc-950 font-sans font-medium">
                        {SALON_INFO.address}
                      </p>
                      <p className="text-xs text-[#9E6868] mt-0.5 font-semibold">
                        {SALON_INFO.landmark}
                      </p>
                    </div>
                  </div>

                  {/* Direct Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="uppercase text-zinc-400 tracking-wider text-[10px] mb-0.5 font-bold">
                        Direct Reservation Line
                      </p>
                      <a
                        href={`tel:${SALON_INFO.phoneClean}`}
                        className="text-base font-serif font-bold text-zinc-950 hover:text-black transition-colors block"
                      >
                        {SALON_INFO.phone}
                      </a>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        Tap to initiate direct call
                      </p>
                    </div>
                  </div>

                  {/* Hours summary */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="uppercase text-zinc-400 tracking-wider text-[10px] mb-0.5 font-bold">
                        Operating Hours
                      </p>
                      <p className="text-xs text-zinc-700 font-medium">
                        Mon: 9am–8pm · Tue: 10am–8pm · Wed–Sun: 9am–8pm
                      </p>
                      <span className="inline-block text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold mt-1.5">
                        Open 7 Days a Week
                      </span>
                    </div>
                  </div>

                  {/* Payment Modes */}
                  <div className="pt-2 border-t border-zinc-100">
                    <p className="uppercase text-zinc-400 tracking-wider text-[10px] mb-2 font-bold">
                      Payment Accepted
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {SALON_INFO.paymentModes.map((mode, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 font-medium"
                        >
                          {mode}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp + Call + Instagram */}
              <div className="pt-8 mt-8 border-t border-zinc-100 flex flex-wrap gap-3 font-sans text-xs">
                <a
                  href={`https://wa.me/${SALON_INFO.phoneClean}?text=${encodeURIComponent(SALON_INFO.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 shadow-xs hover:scale-105 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>

                <a
                  href={`tel:${SALON_INFO.phoneClean}`}
                  className="flex-1 min-w-[140px] py-3.5 rounded-full bg-zinc-900 text-white hover:bg-black font-semibold flex items-center justify-center gap-2 shadow-xs hover:scale-105 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct Call</span>
                </a>

                <a
                  href={SALON_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-100 hover:scale-105 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="p-4 sm:p-6 rounded-[28px] bg-white border border-zinc-200 shadow-xs flex-1 flex flex-col justify-between overflow-hidden">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video w-full bg-zinc-100 border border-zinc-200">
                <iframe
                  title="Hair Spray Unisex Salon Kavoor Map"
                  src={SALON_INFO.googleMapsEmbedUrl}
                  className="w-full h-full border-0 filter contrast-[1.02]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200 shadow-md max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#9E6868] animate-ping" />
                    <span className="font-serif font-bold text-xs text-zinc-950">
                      Hair Spray
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-zinc-500 mt-0.5 font-medium">
                    Near Union Bank, Kavoor Junction
                  </p>
                </div>
              </div>

              {/* Get Directions CTA Strip */}
              <div className="mt-5 px-2 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-serif font-bold text-zinc-950">
                    Direct Accessibility from Airport Road & Bejai
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Kavoor, Mangalore, Karnataka 575015
                  </p>
                </div>

                <a
                  href={SALON_INFO.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-zinc-900 text-white hover:bg-black text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 whitespace-nowrap shadow-xs cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
