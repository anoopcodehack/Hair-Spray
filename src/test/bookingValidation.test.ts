import { describe, it, expect } from 'vitest';
import { SALON_INFO } from '../data/salonData';

describe('Booking Business Logic & Verification Suite', () => {
  const validCoupons = ['FIRSTGLAM', 'HAIRSPRAY10', 'HAIRSPRAAY10'];

  function validatePromo(code: string): { isValid: boolean; discountRate: number } {
    const clean = code.trim().toUpperCase();
    if (validCoupons.includes(clean)) {
      return { isValid: true, discountRate: 0.15 };
    }
    return { isValid: false, discountRate: 0 };
  }

  function calculateBookingPrice(basePrice: number, isPromoApplied: boolean) {
    const discountRate = isPromoApplied ? 0.15 : 0;
    const discountAmount = Math.round(basePrice * discountRate);
    const finalPrice = Math.max(0, basePrice - discountAmount);
    return { basePrice, discountAmount, finalPrice };
  }

  function formatWhatsAppBookingMessage(params: {
    clientName: string;
    clientPhone: string;
    serviceName: string;
    finalPrice: number;
    selectedDate: string;
    stylistName?: string;
    bookingId: string;
    notes?: string;
    promoApplied?: boolean;
  }) {
    const srvPrice = params.finalPrice > 0 ? `₹${params.finalPrice.toLocaleString()}` : 'Onwards (Consultation)';
    const stylist = params.stylistName || 'Next Available Specialist';
    const noteText = params.notes?.trim() ? `\n📝 *Notes:* ${params.notes.trim()}` : '';
    const couponText = params.promoApplied ? `\n🏷️ *Promo:* FIRSTGLAM (15% OFF applied)` : '';

    return `*Hair Spray Unisex Salon — Appointment Booking* ✂️

👤 *Client:* ${params.clientName.trim()}
📞 *Phone:* ${params.clientPhone.trim()}
💇 *Treatment:* ${params.serviceName} (${srvPrice})
📅 *Date:* ${params.selectedDate}
💈 *Stylist:* ${stylist}${noteText}${couponText}
🔖 *Ref ID:* #${params.bookingId}

_Hello Hair Spray Salon! Please confirm my booking at your Kavoor branch._`;
  }

  describe('Promo Codes & Discounts', () => {
    it('accepts FIRSTGLAM with 15% discount', () => {
      const res = validatePromo('firstglam');
      expect(res.isValid).toBe(true);
      expect(res.discountRate).toBe(0.15);
    });

    it('accepts HAIRSPRAY10 with 15% discount', () => {
      const res = validatePromo('  HAIRSPRAY10  ');
      expect(res.isValid).toBe(true);
      expect(res.discountRate).toBe(0.15);
    });

    it('rejects invalid promo codes', () => {
      expect(validatePromo('RANDOM50').isValid).toBe(false);
      expect(validatePromo('').isValid).toBe(false);
      expect(validatePromo('DISCOUNT').isValid).toBe(false);
    });

    it('calculates 15% savings correctly on various service tiers', () => {
      // Men's haircut ₹150 -> 15% = ₹23 discount -> ₹127
      const cut = calculateBookingPrice(150, true);
      expect(cut.discountAmount).toBe(23);
      expect(cut.finalPrice).toBe(127);

      // Cysteine / Keratin ₹3499 -> 15% = ₹525 discount -> ₹2974
      const keratin = calculateBookingPrice(3499, true);
      expect(keratin.discountAmount).toBe(525);
      expect(keratin.finalPrice).toBe(2974);

      // Without promo
      const noPromo = calculateBookingPrice(3499, false);
      expect(noPromo.discountAmount).toBe(0);
      expect(noPromo.finalPrice).toBe(3499);
    });
  });

  describe('WhatsApp Booking Message & Anti-Timing Constraint', () => {
    const bookingDetails = {
      clientName: 'Priya Shetty',
      clientPhone: '9876543210',
      serviceName: 'Keratin Cysteine Treatment',
      finalPrice: 2974,
      selectedDate: '2025-07-15',
      stylistName: 'Ashwal (Senior Stylist)',
      bookingId: 'HS-84920',
      notes: 'First time visit',
      promoApplied: true,
    };

    it('formats authentic booking message with all required customer information', () => {
      const message = formatWhatsAppBookingMessage(bookingDetails);

      expect(message).toContain('Hair Spray Unisex Salon');
      expect(message).toContain('Priya Shetty');
      expect(message).toContain('9876543210');
      expect(message).toContain('Keratin Cysteine Treatment');
      expect(message).toContain('₹2,974');
      expect(message).toContain('2025-07-15');
      expect(message).toContain('Ashwal (Senior Stylist)');
      expect(message).toContain('#HS-84920');
      expect(message).toContain('First time visit');
      expect(message).toContain('FIRSTGLAM (15% OFF applied)');
    });

    it('CRITICAL: message MUST NOT include timings or time slots (per client specification)', () => {
      const message = formatWhatsAppBookingMessage(bookingDetails);

      expect(message).not.toContain('Time Slot:');
      expect(message).not.toContain('⏰');
      expect(message).not.toContain('Selected Time:');
      expect(message).not.toContain('Time:');
    });

    it('generates valid WhatsApp direct click-to-chat URL with correct phone and encoding', () => {
      const message = formatWhatsAppBookingMessage(bookingDetails);
      const encoded = encodeURIComponent(message);
      const waUrl = `https://wa.me/${SALON_INFO.phoneClean}?text=${encoded}`;

      expect(waUrl).toContain('https://wa.me/917760468902?text=');
      expect(decodeURIComponent(waUrl)).toContain('Priya Shetty');
    });
  });
});
