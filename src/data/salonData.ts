import { ServiceItem, Stylist, ReviewItem, FAQItem, GalleryItem, MembershipPlan, DayTiming, SalonCombo } from '../types';
import ashwalImage from '../assets/images/ashwal.jpg';
import abhishekImage from '../assets/images/abhishek.jpg';
import vedaImage from '../assets/images/veda.jpg';
import ashaImage from '../assets/images/asha.jpg';
import aliImage from '../assets/images/ali.jpg';
import sandhyaImage from '../assets/images/sandhya.jpg';
import hair1 from '../assets/images/hair1.png';
import hair2 from '../assets/images/hair2.png';
import hair3 from '../assets/images/hair3.png';
import hair4 from '../assets/images/hair4.png';
import hair5 from '../assets/images/hair5.png';
import hair6 from '../assets/images/hair6.png';

import hair7 from '../assets/images/hair7.png';
import hair8 from '../assets/images/hair8.png';
import hair9 from '../assets/images/hair9.png';
import hairSprayLogo from '../assets/images/hairlogo.jpeg';

export { hair1, hair2, hair3, hair4, hair5, hair6, hair7, hair8, hair9, hairSprayLogo };

export const SALON_INFO = {
  name: 'Hair Spray Unisex Salon',
  shortName: 'Hair Spray',
  logo: hairSprayLogo,
  tagline: 'Look Great, Feel Confident',
  subheading: 'Kavoor’s premier unisex salon & academy delivering precision hair styling, advanced hair treatments, bridal packages, skin facials, de-tan, and luxury grooming since 2017.',
  brochureHighlights: [
    'Hair Cutting',
    'Facial',
    'Pedicure',
    'Manicure',
    'Tattoo',
    'Mehandi',
    'Bridal Make Up',
    'Fish Spa'
  ],
  establishedDate: 'January 2017',
  establishedYear: 2017,
  yearsInBusiness: 9,
  rating: 4.7,
  reviewsCount: 301,
  justdialId: '0824PX824-X824-210330131122-S6V1_BZDET',
  justdialUrl: 'https://www.justdial.com/Mangalore/Hair-Spray-Unisex-Salon-Near-Union-Bank-Kavoor/0824PX824-X824-210330131122-S6V1_BZDET',
  phone: '+91 77604 68902',
  phoneSecondary: '+91 82772 99541',
  phoneLandline: '+91 74879 68588',
  phoneClean: '917760468902',
  whatsappMessage: 'Hi Hair Spray Unisex Salon! I would like to book an appointment at your Kavoor salon.',
  website: 'www.hairspraysalon.com',
  instagram: 'https://instagram.com/hair_spray_salon_unisex',
  instagramHandle: '@hair_spray_salon_unisex',
  email: 'info@hairspraysalon.com',
  address: 'Kavoor Tower, Above Union Bank, Airport Road, Kavoor, Mangalore - 575015, Karnataka',
  shortAddress: 'Kavoor Tower, Above Union Bank, Kavoor, Mangalore 575015',
  landmark: '1st Floor, Above Union Bank, Kavoor Junction, Airport Road',
  city: 'Mangalore',
  pincode: '575015',
  paymentModes: [
    'UPI (Google Pay, PhonePe, Paytm)',
    'Credit Cards & Debit Cards',
    'Cash',
    'Net Banking'
  ],
  amenities: [
    'Fully Air-Conditioned (AC) Salon',
    'Certified Senior Stylists & Beauticians',
    '100% Autoclaved & Sanitized Equipment',
    'Convenient Parking (Bike & Car)',
    'High-Speed Free Guest Wi-Fi',
    'UPI, Cards & Cash Accepted',
    'Complimentary Lounge & Beverages',
    'Private Unisex Styling Zones'
  ],
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.751614272488!2d74.8519139750756!3d12.923696887387346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a0928929007%3A0x6b63d9196b27076a!2sKavoor%20Towers%2C%20Airport%20Rd%2C%20Kavoor%2C%20Mangaluru%2C%20Karnataka%20575015!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsDirectionsUrl: 'https://maps.google.com/?q=Kavoor+Towers+Airport+Road+Kavoor+Mangalore+575015'
};

export const SALON_TIMINGS: DayTiming[] = [
  { day: 'Monday', dayShort: 'Mon', open: '09:00', close: '20:00' },
  { day: 'Tuesday', dayShort: 'Tue', open: '10:00', close: '20:00' },
  { day: 'Wednesday', dayShort: 'Wed', open: '09:00', close: '20:00' },
  { day: 'Thursday', dayShort: 'Thu', open: '09:00', close: '20:00' },
  { day: 'Friday', dayShort: 'Fri', open: '09:00', close: '20:00' },
  { day: 'Saturday', dayShort: 'Sat', open: '09:00', close: '20:00' },
  { day: 'Sunday', dayShort: 'Sun', open: '09:00', close: '20:00' }
];


export function getSalonCurrentStatus(): {
  isOpen: boolean;
  todayName: string;
  openHourStr: string;
  closeHourStr: string;
  statusLabel: string;
} {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
  const dayIndex = istDate.getDay();
  const hour = istDate.getHours();
  const minute = istDate.getMinutes();
  const timeNum = hour + minute / 60;

  const dayMap = [6, 0, 1, 2, 3, 4, 5];
  const todayTimingIndex = dayMap[dayIndex];
  const todayTiming = SALON_TIMINGS[todayTimingIndex];

  const openHour = todayTiming.day === 'Tuesday' ? 10 : 9;
  const closeHour = 20;

  const isOpen = timeNum >= openHour && timeNum < closeHour;
  const openHourStr = todayTiming.day === 'Tuesday' ? '10:00 AM' : '9:00 AM';
  const closeHourStr = '8:00 PM';

  return {
    isOpen,
    todayName: todayTiming.day,
    openHourStr,
    closeHourStr,
    statusLabel: isOpen
      ? `Open Now · Closes at ${closeHourStr}`
      : `Closed · Opens at ${openHourStr}`
  };
}

export { SERVICES_LIST } from './servicesData';

// Legacy services archive
const _LEGACY_SERVICES: ServiceItem[] = [
  // Hair Care
  {
    id: 'keratin-cysteine',
    name: 'Keratin Cysteine Treatment',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 3499,
    originalPrice: 4500,
    durationMin: 120,
    description: 'Transform frizzy, unmanageable hair into silky, mirror-shine smooth locks. Infused with natural cysteine proteins and botanical extracts for intense rejuvenation.',
    popular: true,
    featured: true,
    subServices: ['Deep Cleansing Wash', 'Protein Infusion', 'Thermo-Seal Locking', 'Serum Coating'],
    benefits: ['Zero Frizz for up to 4 Months', '95% Less Breakage', 'Ultra Glossy Texture'],
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cysteine-hair-treatment',
    name: 'Cysteine Hair Treatment',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 2999,
    originalPrice: 3800,
    durationMin: 90,
    description: 'Formaldehyde-free gentle smoothing and strengthening therapy that revitalizes damaged hair fibers, restoring elasticity and natural bounce.',
    popular: false,
    subServices: ['Damage Repair Mask', 'Cysteine Bond Repair', 'Hydrating Blow Dry'],
    benefits: ['Chemical-free smoothing', 'Strengthens weak shafts', 'Safe for colored hair'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bridal-hair-do',
    name: 'Bridal Hair Do & Styling',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 2499,
    originalPrice: 3200,
    durationMin: 75,
    description: 'Bespoke bridal hairdressing featuring traditional jasmine flower settings, modern textured buns, regal waves, and crystal accessory placement.',
    popular: true,
    subServices: ['Custom Hair Architecture', 'Extensions Setting', 'Accessory & Floral Pinning', 'Long-lasting Setting Mist'],
    benefits: ['12+ Hour Hold Guarantee', 'Customized to Face Contour', 'Photogenic Elegance'],
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'classic-haircut-styling',
    name: 'Precision Haircut & Styling',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 499,
    originalPrice: 650,
    durationMin: 40,
    description: 'Tailored hair architecture with thorough scalp cleansing, textured layering or clean fade, and professional blowout styling.',
    popular: true,
    subServices: ['Consultation', 'Scalp Wash', 'Textured Scissors/Fade Cut', 'Matte/Gloss Finish'],
    benefits: ['Flattering to face shape', 'Easy home maintenance'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'deep-hair-spa',
    name: 'Intense Hair Spa & Scalp Detox',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 999,
    originalPrice: 1400,
    durationMin: 60,
    description: 'Deep nourishing argan oil and peptide mask with micro-mist ozone steaming and 20-minute acupressure head massage.',
    subServices: ['Ozone Steaming', 'Aromatherapy Scalp Massage', 'Hydration Rinse'],
    benefits: ['Relieves tension & stress', 'Fights dandruff', 'Boosts follicle health'],
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=80'
  },

  // Nails
  {
    id: 'luxury-manicure',
    name: 'Spa Deluxe Manicure',
    category: 'Nails',
    categoryName: 'Nails',
    price: 599,
    originalPrice: 800,
    durationMin: 45,
    description: 'Exfoliating rose-salt scrub, cuticle therapy, hand massage with shea butter, nail shaping, and long-wear chip-resistant polish.',
    popular: false,
    subServices: ['Dead Skin Exfoliation', 'Cuticle Grooming', 'Thermal Hand Massage', 'Gel/Gloss Polish'],
    benefits: ['Velvety soft hands', 'Strengthened nail beds'],
    image: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'spa-pedicure',
    name: 'Herbal Hydrotherapy Pedicure',
    category: 'Nails',
    categoryName: 'Nails',
    price: 799,
    originalPrice: 1100,
    durationMin: 55,
    description: 'Warm jacuzzi foot bath with essential oils, callus smoothing, detoxifying marine mud wrap, and revitalizing foot massage.',
    popular: true,
    subServices: ['Herbal Bubble Soak', 'Pumice Heel Buffing', 'Marine Clay Mask', 'Reflexology Massage'],
    benefits: ['Smooth cracked heels', 'Improves circulation', 'Total leg relaxation'],
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&auto=format&fit=crop&q=80'
  },

  // Hair Removal
  {
    id: 'body-waxing',
    name: 'Full Body Waxing Package',
    category: 'Hair Removal',
    categoryName: 'Hair Removal',
    price: 1599,
    originalPrice: 2200,
    durationMin: 70,
    description: 'Gentle, hygienic full body hair removal using soothing aloe vera and lipo-soluble waxes for zero irritation and ultra-smooth skin.',
    popular: true,
    subServices: ['Full Arms & Legs', 'Underarms', 'Post-wax Soothing Gel', 'Ingrown Hair Defense'],
    benefits: ['4+ weeks smooth skin', 'Finer regrowth', 'Hygienic single-use strips'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'honey-wax-underarms',
    name: 'Honey Wax (Under Arms)',
    category: 'Hair Removal',
    categoryName: 'Hair Removal',
    price: 199,
    originalPrice: 300,
    durationMin: 15,
    description: 'Natural honey-based warm wax designed for delicate skin, providing quick, painless removal and brightening tone.',
    subServices: ['Antiseptic Prep', 'Honey Wax Pull', 'Cooling Chamomile Lotion'],
    benefits: ['Minimizes skin darkening', 'Swift & gentle'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80'
  },

  // Makeup
  {
    id: 'bridal-package',
    name: 'Grand Bridal HD Makeup Package',
    category: 'Makeup',
    categoryName: 'Makeup',
    price: 8999,
    originalPrice: 12500,
    durationMin: 180,
    description: 'Complete high-definition bridal transformation: pre-bridal skin prep, long-stay waterproof HD makeup, saree draping, floral hair do, and eyelash styling.',
    popular: true,
    featured: true,
    subServices: ['HD Base & Contouring', '3D Mink Eyelashes', 'Bridal Hair Architecture', 'Jewelry & Saree Draping', 'Touch-up Kit'],
    benefits: ['Flawless on 4K Camera & Flash', 'Sweat & Tear Resistant', 'Bespoke Luxury Look'],
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'basic-party-makeup',
    name: 'Basic & Glam Party Makeup',
    category: 'Makeup',
    categoryName: 'Makeup',
    price: 1899,
    originalPrice: 2500,
    durationMin: 60,
    description: 'Stunning glowy skin finish, defined eye makeup, customized lip shade, and sleek hair styling for receptions, parties, and events.',
    subServices: ['Skin Priming', 'Custom Eye Shadow & Liner', 'Highlighter & Lips', 'Quick Hair Setting'],
    benefits: ['Radiant festive glow', 'Lightweight comfortable wear'],
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=800&auto=format&fit=crop&q=80'
  },

  // Facial
  {
    id: 'herbal-facial',
    name: 'Herbal Radiance Facial',
    category: 'Facial',
    categoryName: 'Facial',
    price: 899,
    originalPrice: 1200,
    durationMin: 50,
    description: 'Pure Ayurvedic botanicals, sandalwood, and neem extracts to deep cleanse pores, reduce oiliness, and impart natural glow.',
    popular: false,
    subServices: ['Neem Scrub', 'Herbal Steam & Blackhead Extraction', 'Sandalwood Clay Mask', 'Rose Water Tone'],
    benefits: ['100% Organic active herbs', 'Calms acne & redness'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'brightening-facial',
    name: 'Brightening Vitamin C Glow Facial',
    category: 'Facial',
    categoryName: 'Facial',
    price: 1499,
    originalPrice: 2000,
    durationMin: 60,
    description: 'Potent 20% Vitamin C serum infusion and enzymatic peel targeting tanning, sun damage, and dark spots for illuminated glass skin.',
    popular: true,
    subServices: ['Enzyme Exfoliation', 'Ultrasonic Serum Infusion', 'Vitamin C Peel-off Rubber Mask', 'Glow Booster'],
    benefits: ['Instant brightness', 'Fades hyperpigmentation', 'Even skin texture'],
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'aroma-therapy-facial',
    name: 'Aroma Therapy Relaxing Facial',
    category: 'Facial',
    categoryName: 'Facial',
    price: 1299,
    originalPrice: 1700,
    durationMin: 60,
    description: 'Holistic facial utilizing pure lavender, chamomile, and frankincense essential oils combined with lymphatic drainage pressure points.',
    subServices: ['Aromatherapy Inhalation', 'Essential Oil Massage', 'Calming Algae Mask'],
    benefits: ['Deep stress relief', 'Nourishes dry skin', 'Promotes collagen synthesis'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'anti-ageing-facial',
    name: 'Anti-Ageing 24K Gold Lift Facial',
    category: 'Facial',
    categoryName: 'Facial',
    price: 2199,
    originalPrice: 2900,
    durationMin: 75,
    description: 'Luxurious collagen peptide matrix and 24K gold foil therapy that firms skin contours, softens fine lines, and restores youthful resilience.',
    popular: true,
    featured: true,
    subServices: ['Collagen Boost Cleanser', 'Micro-current Firming Massage', '24K Gold Leaf Application', 'Peptide Sealing Elixir'],
    benefits: ['Firms sagging skin', 'Cellular renewal', 'Youthful radiant glow'],
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'hair-rebonding-smoothening',
    name: 'Hair Rebonding & Permanent Straightening',
    category: 'Hair Care',
    categoryName: 'Hair Care',
    price: 3999,
    originalPrice: 5200,
    durationMin: 180,
    description: 'Get pin-straight, ultra-sleek, and glossy hair with professional salon rebonding and deep conditioning neutralizer therapy.',
    popular: true,
    subServices: ['Hair Analysis', 'Structure Bond Breaking Cream', 'Precision Ceramic Ironing', 'Nutrient Neutralizer'],
    benefits: ['Permanent sleek straight look', 'Tames extreme wave & curl', 'Intense mirror shine'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'eyebrow-facial-threading',
    name: 'Eyebrow Shaping & Facial Threading',
    category: 'Hair Removal',
    categoryName: 'Hair Removal',
    price: 149,
    originalPrice: 200,
    durationMin: 20,
    description: 'High-precision organic cotton threading for crisp eyebrow arches, upper lip, chin, and full facial contouring with soothing rose gel.',
    subServices: ['Skin Prep', 'Arch Shaping', 'Full Face Threading', 'Cooling Aloe Gel'],
    benefits: ['Clean sharp arches', 'Gentle on skin', 'Long lasting neatness'],
    image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&auto=format&fit=crop&q=80'
  }
];

export const STYLISTS_LIST: Stylist[] = [
  {
    id: 'ashwal',
    name: 'Ashwal',
    role: 'Hairstylist',
    bio: 'Precision styling expert skilled in custom haircuts, smooth finishes, and tailored daily looks.',
    image: ashwalImage
  },
  {
    id: 'abhishek',
    name: 'Abhishek',
    role: 'Hairstylist',
    bio: 'Creative hairstylist focused on versatile cuts, trending styles, and healthy hair transformations.',
    image: abhishekImage
  },
  {
    id: 'veda',
    name: 'Veda',
    role: 'Skin & Hair Care Therapist',
    bio: 'Blending advanced skin treatments with restorative hair care to rejuvenate and revive your natural glow.',
    image: vedaImage
  },
  {
    id: 'asha',
    name: 'Asha',
    role: 'Skin & Hair Care Therapist',
    bio: 'Expert in customized facial therapies and deep hair conditioning treatments designed for total care and relaxation.',
    image: ashaImage
  },
  {
    id: 'ali',
    name: 'Ali',
    role: 'Men’s Hairstylist',
    bio: 'Specializing in modern fades, precision cuts, and sharp grooming tailored to every client’s style.',
    image: aliImage
  },
  {
    id: 'sandhya',
    name: 'Sandhya',
    role: 'Skin Care Therapist',
    bio: 'Dedicated to health-driven skincare, offering tailored facials, exfoliation, and soothing skin treatments.',
    image: sandhyaImage
  }
];

export const REVIEWS_LIST: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Ananya Rao',
    rating: 5,
    date: '2 weeks ago',
    service: 'Keratin Cysteine Treatment',
    treatmentTag: 'Keratin Cysteine',
    comment: 'Got my Keratin Cysteine treatment done here in Kavoor. The frizz from Mangalore humidity is completely gone! My hair feels silky smooth even after multiple washes. The air conditioned salon is so peaceful and clean.',
    verified: true,
    avatar: 'AR'
  },
  {
    id: 'rev-2',
    name: 'Deepak Bhandary',
    rating: 5,
    date: '1 month ago',
    service: 'Precision Haircut & Styling',
    treatmentTag: 'Men’s Styling',
    comment: 'I’ve been coming to Hair Spray for 4 years now. Rohan and team are absolute professionals. Great attention to detail on the fade and beard grooming. 10/10 recommend!',
    verified: true,
    avatar: 'DB'
  },
  {
    id: 'rev-3',
    name: 'Sneha Fernandes',
    rating: 5,
    date: '3 weeks ago',
    service: 'Grand Bridal HD Makeup Package',
    treatmentTag: 'Bridal Package',
    comment: 'Pooja did my bridal makeup and hair do for my church wedding and reception. It stayed flawless throughout the 14-hour celebration with zero touch-ups needed. Everyone complimented the look!',
    verified: true,
    avatar: 'SF'
  },
  {
    id: 'rev-4',
    name: 'Manjunath Kamath',
    rating: 4,
    date: '2 months ago',
    service: 'Brightening Vitamin C Glow Facial',
    treatmentTag: 'Facial',
    comment: 'Very relaxing facial experience. The massage was therapeutic and my skin had an instant visible glow for a family event next day. Convenient parking near Union Bank.',
    verified: true,
    avatar: 'MK'
  },
  {
    id: 'rev-5',
    name: 'Priyanka Kulal',
    rating: 5,
    date: '1 month ago',
    service: 'Herbal Hydrotherapy Pedicure & Manicure',
    treatmentTag: 'Nail Spa',
    comment: 'Cleanest salon in Kavoor! Everything is sterilized and the staff is extremely courteous. The pedicure foot bath and massage was heaven after a long week.',
    verified: true,
    avatar: 'PK'
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: 'silver-glow',
    name: 'Silver Glow',
    tier: 'Silver',
    price: 1499,
    billingPeriod: 'per month',
    tagline: 'Essential maintenance for effortless routine grooming',
    popular: false,
    features: [
      '2 Precision Haircuts & Styling / month',
      '1 Relaxing Hair Spa or Deluxe Manicure',
      '10% Flat Discount on all Advanced Treatments',
      'Complimentary Scalp & Skin Analysis',
      'Priority Weekend Slot Booking'
    ],
    discounts: '10% off all services',
    freeServicesPerMonth: '3 services included'
  },
  {
    id: 'gold-luxe',
    name: 'Gold Luxe',
    tier: 'Gold',
    price: 2999,
    billingPeriod: 'per month',
    tagline: 'Our most loved package for complete hair & skin pampering',
    popular: true,
    features: [
      'Unlimited Haircuts & Beard/Blowout Styling',
      '1 Brightening / Herbal Facial per month',
      '1 Hydrotherapy Spa Pedicure + Manicure',
      '20% Flat Discount on Keratin & Cysteine',
      'Free VIP beverage bar & priority master stylist access',
      '1 Free Guest Pass per quarter'
    ],
    discounts: '20% off all services',
    freeServicesPerMonth: '5 services included'
  },
  {
    id: 'platinum-royale',
    name: 'Platinum Royale',
    tier: 'Platinum',
    price: 4999,
    billingPeriod: 'per month',
    tagline: 'Ultimate luxury with all-inclusive premium beauty care',
    popular: false,
    features: [
      'All Gold Luxe benefits included',
      '1 Anti-Ageing 24K Gold or Hydra Facial / month',
      '1 Full Body Honey / Rica Waxing session',
      '30% Flat Discount on Keratin & Bridal Packages',
      'Personal dedicated stylist reservation',
      'Complimentary home styling kit on signup'
    ],
    discounts: '30% off all services',
    freeServicesPerMonth: 'Unlimited styling + 4 luxury services'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Salon Panorama & Kids Styling Car',
    category: 'Salon Interior',
    imageUrl: hair1,
    beforeImageUrl: hair1,
    description: 'Spacious panoramic interior of Hair Spray salon featuring grooming bays, fish spa tank, and our playful red sports car styling chair for kids haircuts.',
    duration: 'Full Salon Facility',
    stylist: 'Kavoor Main Floor',
    highlight: 'Kids Car Chair & Fish Spa',
    tags: ['Salon Panorama', 'Kids Haircuts', 'Fish Spa Tank', 'Central AC']
  },
  {
    id: 'gal-2',
    title: 'Executive Styling Bay & Vanity Mirrors',
    category: 'Styling Stations',
    imageUrl: hair2,
    description: 'Modern hair styling stations equipped with backlit circular LED vanity mirrors, ergonomic hydraulic reclining chairs, and professional styling carts.',
    duration: 'Men & Women Styling',
    stylist: 'Styling Bay',
    highlight: 'LED Halo Vanity Mirrors',
    tags: ['Hydraulic Chairs', 'Halo Mirrors', 'Precision Cut', 'VIP Ambience']
  },
  {
    id: 'gal-3',
    title: 'Product Display & Hair Wash Station',
    category: 'Styling Stations',
    imageUrl: hair3,
    description: 'Organized salon partition showcasing professional hair colors and treatments, leading to the air-conditioned deep-cleansing hair wash basin.',
    duration: 'Wash & Color Area',
    stylist: 'Hair Wash Station',
    highlight: 'Professional Care Products',
    tags: ['Shampoo Basin', 'Color Showcase', 'Matrix & Loreal', 'Hygienic Care']
  },
  {
    id: 'gal-4',
    title: 'Lounge Entrance & Glass Showcase',
    category: 'Salon Interior',
    imageUrl: hair4,
    description: 'Welcoming salon entry featuring wooden partition with glass shelves displaying genuine styling waxes, serums, and central tiled corridor.',
    duration: 'Reception Walkway',
    stylist: 'Salon Entryway',
    highlight: 'Premium Product Showcase',
    tags: ['Lounge Entrance', 'Product Display', 'Central Walkway', 'Modern Decor']
  },
  {
    id: 'gal-5',
    title: 'Luxury Full-Body Reclining Massage Chair',
    category: 'Spa & Massage',
    imageUrl: hair5,
    description: 'Zero-gravity electronic massage recliner with automated multi-point body therapy and handheld remote control overlooking Kavoor junction.',
    duration: '15 - 30 min Sessions',
    stylist: 'Wellness Lounge',
    highlight: 'Zero-Gravity Massage',
    tags: ['Full Body Massage', 'Acupressure Relief', 'Luxury Recliner', 'Relaxation']
  },
  {
    id: 'gal-6',
    title: 'Hair Spray Reception & Front Desk',
    category: 'Reception',
    imageUrl: hair6,
    description: 'Warm welcome desk featuring the official 3D embossed "Hair Spray For You" counter, digital instant payments, and client consultation.',
    duration: 'Customer Support',
    stylist: 'Front Office Team',
    highlight: 'Official Reception Desk',
    tags: ['Hair Spray For You', 'Reception Desk', 'Instant Billing', 'Friendly Staff']
  }
];

export const FAQS_LIST: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is the difference between Keratin and Cysteine hair treatments?',
    answer: 'Keratin treatment primarily coats the outer cuticle with keratin protein to eliminate frizz and provide a straighter, sleek finish. Cysteine treatment is 100% formaldehyde-free and works by penetrating inside the hair shaft to soften natural curl bonds while repairing structural damage. Both give smooth, glossy hair lasting 3 to 5 months.',
    category: 'Hair Treatments'
  },
  {
    id: 'faq-2',
    question: 'Where in Kavoor, Mangalore is Hair Spray located?',
    answer: 'We are located conveniently in Kavoor, right near Union Bank of India (Kavoor Junction). We have convenient parking and are easily accessible from Airport Road, Bondel, and Bejai.',
    category: 'Salon & Booking'
  },
  {
    id: 'faq-3',
    question: 'What are your salon opening and closing hours?',
    answer: 'We are open 7 days a week! Monday: 9:00 am – 8:00 pm, Tuesday: 10:00 am – 8:00 pm, and Wednesday through Sunday: 9:00 am – 8:00 pm.',
    category: 'Salon & Booking'
  },
  {
    id: 'faq-4',
    question: 'How far in advance should I book bridal makeup & hair styling?',
    answer: 'For wedding season, we recommend reserving your bridal dates 2 to 4 months in advance. We offer a pre-bridal trial consultation to test hairstyles and makeup tones against your attire and jewelry.',
    category: 'Bridal & Makeup'
  },
  {
    id: 'faq-5',
    question: 'Is the salon unisex and fully air-conditioned?',
    answer: 'Yes! Hair Spray is a 100% unisex salon with dedicated, private styling and treatment zones. The entire salon is centrally air conditioned with sterile hygiene standards.',
    category: 'General'
  },
  {
    id: 'faq-6',
    question: 'Which facial is best suited for dull skin or pre-events?',
    answer: 'For instant glow before a party or wedding, our Brightening Vitamin C Glow Facial or 24K Gold Lift Facial are most popular. For sensitive or acne-prone skin, our Herbal Radiance Facial or Aroma Therapy are ideal.',
    category: 'Hair Treatments'
  },
  {
    id: 'faq-7',
    question: 'How long has Hair Spray been operating?',
    answer: 'Hair Spray was established in 2017 and is proud to celebrate 9 continuous years of excellence serving over 5,000+ happy clients in Mangalore with a 4.7-star rating across 301 verified reviews.',
    category: 'General'
  }
];

export const TIME_SLOTS = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:30 PM',
  '02:30 PM',
  '03:30 PM',
  '04:30 PM',
  '05:30 PM',
  '06:30 PM',
  '07:00 PM'
];

export const SALON_COMBOS: SalonCombo[] = [
  {
    id: 'combo-men-essentials',
    name: 'Men’s Grooming Essentials',
    target: 'Men',
    tagline: 'Complete head-to-neck refresh with precision hair cut and clean beard contouring.',
    price: 649,
    originalPrice: 850,
    savings: 201,
    durationMin: 45,
    popular: true,
    inclusions: [
      'Precision Cut tailored to face shape',
      'Beard Sculpting & Razor Neck Line',
      'Invigorating Scalp Shampoo & Conditioning',
      'De-Tan Organic Face Pack & Cooling Mist'
    ]
  },
  {
    id: 'combo-humidity-defense',
    name: 'Coastal Humidity Defense Ritual',
    target: 'Unisex',
    tagline: 'Our signature zero-frizz cysteine therapy engineered for Mangalore’s coastal humidity.',
    price: 2599,
    originalPrice: 3200,
    savings: 601,
    durationMin: 120,
    popular: true,
    inclusions: [
      'Formaldehyde-Free Cysteine Bond Infusion',
      'Intense Deep Conditioning Moisture Rinse',
      'Thermal Shield Protection Blowdry',
      'Mirror Gloss Argan Finishing Touch'
    ]
  },
  {
    id: 'combo-bridal-radiance',
    name: 'Bridal Radiance & Glow Ritual',
    target: 'Women',
    tagline: 'Comprehensive pre-wedding aesthetic indulgence for brides and bridesmaids.',
    price: 3499,
    originalPrice: 4500,
    savings: 1001,
    durationMin: 150,
    inclusions: [
      'O3+ Professional Skin Brightening Facial',
      'Full Arms & Legs Rica Waxing',
      'Deluxe Rose Spa Pedicure & Manicure',
      'Full Face Threading & Anti-Tan Clarifying Pack'
    ]
  },
  {
    id: 'combo-detox-spa',
    name: 'Rejuvenating Detoxing Spa Session',
    target: 'Unisex',
    tagline: 'Melt everyday fatigue with natural herbal hair therapy and gentle fish reflexology.',
    price: 999,
    originalPrice: 1400,
    savings: 401,
    durationMin: 60,
    inclusions: [
      'Nourishing Herbal Hair Spa Cream Bath',
      'Relaxing Acupressure Scalp & Neck Massage',
      'Signature 20-Minute Fish Spa Pedicure',
      'Hydrating Steam & Gloss Blowout'
    ]
  }
];
