export type ServiceCategory =
  | 'All'
  | 'Hair Care'
  | 'Facial & Skin'
  | 'Facial'
  | 'Bridal & Makeup'
  | 'Makeup'
  | 'Waxing'
  | 'Hair Removal'
  | 'Pedicure & Manicure'
  | 'Nails'
  | 'De-Tan & Bleach'
  | 'Specialty & Spa';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  priceNote?: string;
  priceSecondary?: number;
  secondaryLabel?: string;
  durationMin: number;
  description: string;
  popular?: boolean;
  featured?: boolean;
  subServices?: string[];
  image: string;
  benefits?: string[];
  brochureSection?: string;
  gender?: 'women' | 'men' | 'unisex';
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  experienceYears?: number;
  specialties?: string[];
  rating?: number;
  reviewsCount?: number;
  instagramHandle?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  date: string;
  service: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  treatmentTag?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Hair Treatments' | 'Bridal & Makeup' | 'Salon & Booking';
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  beforeImageUrl?: string;
  description: string;
  duration?: string;
  stylist?: string;
  highlight?: string;
  tags?: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  tier: 'Silver' | 'Gold' | 'Platinum';
  price: number;
  billingPeriod: string;
  tagline: string;
  popular?: boolean;
  features: string[];
  discounts: string;
  freeServicesPerMonth: string;
}

export interface DayTiming {
  day: string;
  dayShort: string;
  open: string;
  close: string;
  isOpenToday?: boolean;
}

export interface BookingFormState {
  serviceId: string;
  stylistId: string;
  date: string;
  timeSlot?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes: string;
  promoCode?: string;
  discountAmount?: number;
}

export interface BookingConfirmation {
  bookingId: string;
  service: ServiceItem;
  stylist?: Stylist;
  date: string;
  timeSlot?: string;
  customerName: string;
  customerPhone: string;
  totalPrice: number;
  createdAt: string;
}

export interface SalonCombo {
  id: string;
  name: string;
  target: 'Men' | 'Women' | 'Unisex';
  tagline: string;
  price: number;
  originalPrice: number;
  savings: number;
  durationMin: number;
  popular?: boolean;
  inclusions: string[];
}
