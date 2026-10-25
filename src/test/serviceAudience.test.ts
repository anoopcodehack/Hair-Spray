import { describe, it, expect } from 'vitest';
import { getServiceAudience, isServiceForAudience, getAudienceBadge } from '../utils/serviceAudience';
import { ServiceItem } from '../types';

describe('Audience Categorization & Filtering Suite', () => {
  const dummyService = (overrides: Partial<ServiceItem>): ServiceItem => ({
    id: 'test-id',
    name: 'Standard Hair Cut',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 150,
    durationMin: 30,
    description: 'Professional precision cut',
    image: '',
    ...overrides,
  });

  describe('getServiceAudience', () => {
    it('should prioritize explicit gender field when present', () => {
      expect(getServiceAudience(dummyService({ gender: 'women', name: 'Groom Shave' }))).toBe('women');
      expect(getServiceAudience(dummyService({ gender: 'men', name: 'Bridal Saree Draping' }))).toBe('men');
      expect(getServiceAudience(dummyService({ gender: 'unisex' }))).toBe('unisex');
    });

    it('should classify Men specific terms as men', () => {
      expect(getServiceAudience(dummyService({ name: 'Beard Trim & Shape' }))).toBe('men');
      expect(getServiceAudience(dummyService({ name: 'Royal Shave' }))).toBe('men');
      expect(getServiceAudience(dummyService({ name: 'Groom Luxury Package' }))).toBe('men');
      expect(getServiceAudience(dummyService({ name: 'Men’s Hair Cut' }))).toBe('men');
      expect(getServiceAudience(dummyService({ brochureSection: 'Groom Special' }))).toBe('men');
    });

    it('should classify Women specific terms as women', () => {
      expect(getServiceAudience(dummyService({ name: 'Bridal Makeup' }))).toBe('women');
      expect(getServiceAudience(dummyService({ name: 'Saree Draping Elegance' }))).toBe('women');
      expect(getServiceAudience(dummyService({ name: 'Threading Eyebrows' }))).toBe('women');
      expect(getServiceAudience(dummyService({ name: 'Full Legs Waxing', category: 'Waxing' }))).toBe('women');
      expect(getServiceAudience(dummyService({ brochureSection: 'Peel Waxing' }))).toBe('women');
      expect(getServiceAudience(dummyService({ name: 'Bridal Mehandi' }))).toBe('women');
    });

    it('should classify general hair, skin, spa, and tattoo services as unisex', () => {
      expect(getServiceAudience(dummyService({ name: 'Hair Wash & Conditioning' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'Keratin Smoothing' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'Head Massage with Herbal Oil' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'Gold Radiance Facial' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'Fish Spa Experience' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'Permanent Body Tattoo' }))).toBe('unisex');
      expect(getServiceAudience(dummyService({ name: 'De-Tan Face & Neck' }))).toBe('unisex');
    });
  });

  describe('isServiceForAudience filter logic', () => {
    const womenService = dummyService({ name: 'Bridal Makeup' });
    const menService = dummyService({ name: 'Beard Styling' });
    const unisexService = dummyService({ name: 'Hair Spa Intense' });

    it('filter "all" should include all services regardless of gender', () => {
      expect(isServiceForAudience(womenService, 'all')).toBe(true);
      expect(isServiceForAudience(menService, 'all')).toBe(true);
      expect(isServiceForAudience(unisexService, 'all')).toBe(true);
    });

    it('filter "women" should include women exclusive and unisex services, but not men exclusive', () => {
      expect(isServiceForAudience(womenService, 'women')).toBe(true);
      expect(isServiceForAudience(unisexService, 'women')).toBe(true);
      expect(isServiceForAudience(menService, 'women')).toBe(false);
    });

    it('filter "men" should include men exclusive and unisex services, but not women exclusive', () => {
      expect(isServiceForAudience(menService, 'men')).toBe(true);
      expect(isServiceForAudience(unisexService, 'men')).toBe(true);
      expect(isServiceForAudience(womenService, 'men')).toBe(false);
    });
  });

  describe('getAudienceBadge', () => {
    it('returns proper badge styling and labels for women services', () => {
      const badge = getAudienceBadge(dummyService({ name: 'Bridal Package' }));
      expect(badge.gender).toBe('women');
      expect(badge.shortLabel).toBe('Women');
      expect(badge.label).toContain('Women');
      expect(badge.badgeClass).toContain('rose');
    });

    it('returns proper badge styling and labels for men services', () => {
      const badge = getAudienceBadge(dummyService({ name: 'Beard Trim' }));
      expect(badge.gender).toBe('men');
      expect(badge.shortLabel).toBe('Men');
      expect(badge.label).toContain('Men');
      expect(badge.badgeClass).toContain('sky');
    });

    it('returns proper badge styling and labels for unisex services', () => {
      const badge = getAudienceBadge(dummyService({ name: 'Hair Color' }));
      expect(badge.gender).toBe('unisex');
      expect(badge.shortLabel).toBe('Unisex');
      expect(badge.label).toContain('Unisex');
      expect(badge.badgeClass).toContain('zinc');
    });
  });
});
