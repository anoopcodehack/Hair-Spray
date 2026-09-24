import { ServiceItem } from '../types';

export type AudienceFilter = 'all' | 'women' | 'men';

/**
 * Determines the primary audience for each salon service:
 * - 'men': Services specifically curated for men & boys (grooming, beard styles, shaves, groom packages)
 * - 'women': Services specifically curated for women & girls (bridal packages, bridal makeup, saree draping, updos, waxing, peel wax, threading, mehandi)
 * - 'unisex': Suitable and actively booked by both men and women (hair cuts, hair spa, anti-dandruff, nanoplastia, keratin, botox, smoothing, hair colouring, oil head massages, skin facials, cleanups, de-tan, bleach, pedicure, manicure, fish spa, tattoos)
 */
export function getServiceAudience(service: ServiceItem): 'women' | 'men' | 'unisex' {
  if (service.gender) {
    return service.gender;
  }

  const name = (service.name || '').toLowerCase();
  const cat = (service.category || '').toLowerCase();
  const section = (service.brochureSection || '').toLowerCase();

  // Men exclusive
  if (
    name.includes('groom') ||
    name.includes('beard') ||
    name.includes('shave') ||
    name.includes('men’s') ||
    name.includes('mens') ||
    section.includes('groom')
  ) {
    return 'men';
  }

  // Women exclusive
  if (
    name.includes('bridal') ||
    name.includes('saree') ||
    name.includes('updo') ||
    name.includes('makeup') ||
    cat.includes('waxing') ||
    section.includes('waxing') ||
    section.includes('peel wax') ||
    name.includes('threading') ||
    name.includes('mehandi') ||
    name.includes('bikini') ||
    name.includes('nail polish')
  ) {
    return 'women';
  }

  return 'unisex';
}

/**
 * Returns whether a service matches the chosen audience filter.
 * - 'all': matches every service
 * - 'women': matches services for women or unisex
 * - 'men': matches services for men or unisex
 */
export function isServiceForAudience(service: ServiceItem, audience: AudienceFilter): boolean {
  if (audience === 'all') return true;
  const target = getServiceAudience(service);
  if (audience === 'women') {
    return target === 'women' || target === 'unisex';
  }
  if (audience === 'men') {
    return target === 'men' || target === 'unisex';
  }
  return true;
}

export function getAudienceBadge(service: ServiceItem): {
  label: string;
  shortLabel: string;
  badgeClass: string;
  gender: 'women' | 'men' | 'unisex';
} {
  const g = getServiceAudience(service);
  if (g === 'women') {
    return {
      label: 'Women & Girls',
      shortLabel: 'Women',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      gender: 'women',
    };
  }
  if (g === 'men') {
    return {
      label: 'Men & Boys',
      shortLabel: 'Men',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      gender: 'men',
    };
  }
  return {
    label: 'Unisex (Men & Women)',
    shortLabel: 'Unisex',
    badgeClass: 'bg-zinc-100 text-zinc-700 border-zinc-200',
    gender: 'unisex',
  };
}
