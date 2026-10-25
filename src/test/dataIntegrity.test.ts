import { describe, it, expect } from 'vitest';
import { SALON_INFO, SALON_TIMINGS, SALON_COMBOS, FAQS_LIST, STYLISTS_LIST } from '../data/salonData';
import { SERVICES_LIST } from '../data/servicesData';

describe('Enterprise Data Integrity Suite - Hair Spray Unisex Salon', () => {
  describe('Salon Information & Metadata', () => {
    it('should have exact verified business branding', () => {
      expect(SALON_INFO.name).toBe('Hair Spray Unisex Salon');
      expect(SALON_INFO.shortName).toBe('Hair Spray');
      expect(SALON_INFO.city).toBe('Mangalore');
      expect(SALON_INFO.pincode).toBe('575015');
      expect(SALON_INFO.address).toContain('Kavoor');
    });

    it('should have a clean sanitized phone number for direct calling & WhatsApp', () => {
      expect(SALON_INFO.phoneClean).toBe('917760468902');
      expect(SALON_INFO.phoneClean).not.toMatch(/\s|\+|-/);
      expect(SALON_INFO.phone).toContain('77604 68902');
    });

    it('should have authentic rating and review counts', () => {
      expect(SALON_INFO.rating).toBeGreaterThanOrEqual(4.5);
      expect(SALON_INFO.reviewsCount).toBeGreaterThanOrEqual(300);
      expect(SALON_INFO.yearsInBusiness).toBeGreaterThanOrEqual(8);
      expect(SALON_INFO.establishedYear).toBe(2017);
    });

    it('should have complete payment modes and salon amenities', () => {
      expect(SALON_INFO.paymentModes.length).toBeGreaterThanOrEqual(4);
      expect(SALON_INFO.paymentModes).toContain('Cash');
      expect(SALON_INFO.amenities.length).toBeGreaterThanOrEqual(5);
      expect(SALON_INFO.amenities.some(a => a.toLowerCase().includes('air-conditioned') || a.toLowerCase().includes('ac'))).toBe(true);
    });
  });

  describe('Service Catalog Integrity (Brochure & Price List)', () => {
    it('should contain a comprehensive list of catalog services', () => {
      expect(SERVICES_LIST.length).toBeGreaterThan(20);
    });

    it('every service must have unique non-empty ID, name, category, and valid price', () => {
      const ids = new Set<string>();

      SERVICES_LIST.forEach((service) => {
        expect(service.id, `Service ID missing in: ${JSON.stringify(service)}`).toBeTruthy();
        expect(ids.has(service.id), `Duplicate ID found: ${service.id}`).toBe(false);
        ids.add(service.id);

        expect(service.name).toBeTruthy();
        expect(service.category).toBeTruthy();
        expect(service.price).toBeGreaterThanOrEqual(0);
        expect(Number.isFinite(service.price)).toBe(true);

        // If price is 0 (variable length treatments like smoothing/nanoplastia), priceNote must specify Onwards
        if (service.price === 0) {
          expect(service.priceNote).toBe('Onwards');
        }

        if (service.originalPrice) {
          expect(service.originalPrice).toBeGreaterThanOrEqual(service.price);
        }
      });
    });

    it('every service duration must be a realistic number of minutes (10 to 360 mins)', () => {
      SERVICES_LIST.forEach((service) => {
        expect(service.durationMin).toBeGreaterThanOrEqual(10);
        expect(service.durationMin).toBeLessThanOrEqual(360);
      });
    });
  });

  describe('Trending Combos & Package Mathematics', () => {
    it('should have curated salon combo packages', () => {
      expect(SALON_COMBOS.length).toBeGreaterThanOrEqual(3);
    });

    it('all combos must offer genuine savings (price < originalPrice and savings = original - price)', () => {
      SALON_COMBOS.forEach((combo) => {
        expect(combo.price).toBeLessThan(combo.originalPrice);
        const expectedSavings = combo.originalPrice - combo.price;
        expect(combo.savings).toBe(expectedSavings);
        expect(combo.inclusions.length).toBeGreaterThanOrEqual(2);
        expect(combo.name).toBeTruthy();
      });
    });
  });

  describe('Weekly Timings Schedule', () => {
    it('must have entries for all 7 days of the week', () => {
      expect(SALON_TIMINGS).toHaveLength(7);
      const days = SALON_TIMINGS.map((t) => t.day);
      expect(days).toEqual([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]);
    });

    it('Tuesday opens at 10:00, all other days open at 09:00, and all close at 20:00', () => {
      SALON_TIMINGS.forEach((timing) => {
        if (timing.day === 'Tuesday') {
          expect(timing.open).toBe('10:00');
        } else {
          expect(timing.open).toBe('09:00');
        }
        expect(timing.close).toBe('20:00');
      });
    });
  });

  describe('Stylists and FAQs', () => {
    it('should have verified stylist profiles with roles and bios', () => {
      expect(STYLISTS_LIST.length).toBeGreaterThanOrEqual(3);
      STYLISTS_LIST.forEach((stylist) => {
        expect(stylist.id).toBeTruthy();
        expect(stylist.name).toBeTruthy();
        expect(stylist.role).toBeTruthy();
        expect(stylist.bio).toBeTruthy();
      });
    });

    it('should have helpful FAQs answering key customer questions', () => {
      expect(FAQS_LIST.length).toBeGreaterThanOrEqual(5);
      FAQS_LIST.forEach((faq) => {
        expect(faq.question).toBeTruthy();
        expect(faq.answer).toBeTruthy();
      });
    });
  });
});
