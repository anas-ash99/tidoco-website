import { Appointment, BusinessService, Salon, ClientBooking } from '../types';

export const INITIAL_BUSINESS_SERVICES: BusinessService[] = [
  {
    id: 'srv-1',
    name: 'Classic Precision Haircut',
    durationMinutes: 30,
    price: 25,
    category: 'Haircut',
  },
  {
    id: 'srv-2',
    name: 'Skin Fade & Haircut',
    durationMinutes: 45,
    price: 25,
    category: 'Haircut',
  },
  {
    id: 'srv-3',
    name: 'Hot Towel Beard Trim & Shave',
    durationMinutes: 25,
    price: 20,
    category: 'Grooming',
  },
  {
    id: 'srv-4',
    name: 'Signature Complete Grooming',
    durationMinutes: 60,
    price: 50,
    category: 'Package',
  },
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    clientName: 'Daniel Alon',
    service: 'Classic Precision Haircut',
    time: '10:00–10:30',
    status: 'pending',
    price: 25,
    date: 'Today',
  },
  {
    id: 'apt-2',
    clientName: 'Sarah Goldstein',
    service: 'Skin Fade & Haircut',
    time: '11:30–12:15',
    status: 'confirmed',
    price: 25,
    date: 'Today',
  },
  {
    id: 'apt-3',
    clientName: 'Michael Ben-Ami',
    service: 'Signature Complete Grooming',
    time: '14:00–15:00',
    status: 'confirmed',
    price: 25,
    date: 'Today',
  },
];

export const CATEGORIES = [
  { id: 'Haircut', label: 'Haircut', icon: '✂', bg: '#e6f8f8', color: '#1498a7' },
  { id: 'Nails', label: 'Nails', icon: '♥', bg: '#fbedf3', color: '#e45b91' },
  { id: 'Facial', label: 'Facial', icon: '☻', bg: '#f3edfc', color: '#9b5be0' },
  { id: 'Spa', label: 'Spa', icon: '♨', bg: '#fff5e9', color: '#ff791b' },
  { id: 'Massage', label: 'Massage', icon: '♥', bg: '#eaf8ed', color: '#20bd65' },
] as const;

export const INITIAL_SALONS: Salon[] = [
  {
    id: 'salon-ink-craft',
    name: 'Ink & Craft Tattoo Atelier',
    category: 'Haircut',
    rating: 4.9,
    distanceKm: 4.8,
    address: 'Dizengoff 142, Tel Aviv',
    services: [
      { name: 'Custom Fine-Line Tattoo Consultation', price: 40, duration: '30 min' },
      { name: 'Small Flash Tattoo (Up to 5cm)', price: 75, duration: '45 min' },
      { name: 'Medium Custom Piece Session', price: 150, duration: '90 min' },
      { name: 'Touch-up & Line Enhancement', price: 35, duration: '30 min' },
    ],
  },
  {
    id: 'salon-lev-barber',
    name: 'Lev Barber & Grooming Studio',
    category: 'Haircut',
    rating: 5.0,
    distanceKm: 1.2,
    address: 'Rothschild Blvd 32, Tel Aviv',
    services: [
      { name: 'Skin Fade & Precision Scissor Cut', price: 35, duration: '40 min' },
      { name: 'Traditional Hot Towel Wet Shave', price: 25, duration: '30 min' },
      { name: 'Beard Reshape & Conditioning', price: 20, duration: '25 min' },
      { name: 'Full Grooming & Scalp Detox', price: 60, duration: '60 min' },
    ],
  },
  {
    id: 'salon-neve-nails',
    name: 'Neve Tzedek Nail Lounge',
    category: 'Nails',
    rating: 4.8,
    distanceKm: 2.1,
    address: 'Shabazi 18, Tel Aviv',
    services: [
      { name: 'Russian Gel Manicure with Apex', price: 45, duration: '50 min' },
      { name: 'Signature Spa Pedicure', price: 55, duration: '60 min' },
      { name: 'BIAB Natural Nail Overlay', price: 50, duration: '55 min' },
      { name: 'Express Shape & Gel Polish', price: 30, duration: '30 min' },
    ],
  },
  {
    id: 'salon-sheinkin-facial',
    name: 'Sheinkin Glow & Facial Bar',
    category: 'Facial',
    rating: 4.9,
    distanceKm: 1.8,
    address: 'Sheinkin 44, Tel Aviv',
    services: [
      { name: 'Deep Cleanse Hydro-Facial', price: 85, duration: '60 min' },
      { name: 'Collagen & Peptide Brightening', price: 95, duration: '65 min' },
      { name: 'Lymphatic Face Sculpting Massage', price: 65, duration: '45 min' },
      { name: 'Express Calming Skin Detox', price: 50, duration: '35 min' },
    ],
  },
  {
    id: 'salon-yam-spa',
    name: 'Yam Waterfront Spa & Sanctuary',
    category: 'Spa',
    rating: 4.7,
    distanceKm: 3.4,
    address: 'HaYarkon 95, Tel Aviv',
    services: [
      { name: 'Deep Tissue Recovery Session', price: 90, duration: '60 min' },
      { name: 'Swedish Relaxation Full-Body Ritual', price: 85, duration: '60 min' },
      { name: 'Dead Sea Salt Exfoliation & Steam', price: 70, duration: '45 min' },
      { name: 'Targeted Neck & Shoulder Relief', price: 45, duration: '30 min' },
    ],
  },
  {
    id: 'salon-zen-massage',
    name: 'Zen Urban Massage Lab',
    category: 'Massage',
    rating: 4.9,
    distanceKm: 2.6,
    address: 'Bograshov 28, Tel Aviv',
    services: [
      { name: 'Aromatherapy Calming Massage', price: 80, duration: '60 min' },
      { name: 'Sports Therapy & Stretch', price: 95, duration: '60 min' },
      { name: 'Hot Basalt Stone Massage', price: 110, duration: '75 min' },
      { name: 'Express Back & Tension Release', price: 45, duration: '30 min' },
    ],
  },
];

export const INITIAL_CLIENT_BOOKINGS: ClientBooking[] = [
  {
    id: 'bk-1',
    salonId: 'salon-ink-craft',
    salonName: 'Ink & Craft Tattoo Atelier',
    serviceName: 'Custom Fine-Line Tattoo Consultation',
    price: 40,
    date: 'Tomorrow, Nov 7',
    timeSlot: '14:30',
    clientName: 'Demo Client',
    clientPhone: '+972 50-123-4567',
    createdAt: 'Just now',
  },
];
