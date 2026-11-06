export type AppointmentStatus = 'pending' | 'confirmed' | 'declined';

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  status: AppointmentStatus;
  price: number;
  date?: string;
}

export interface BusinessService {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
  category: string;
}

export interface SalonService {
  name: string;
  price: number;
  duration: string;
}

export interface Salon {
  id: string;
  name: string;
  category: 'Haircut' | 'Nails' | 'Facial' | 'Spa' | 'Massage';
  rating: number;
  distanceKm: number;
  address: string;
  services: SalonService[];
  accentColor?: string;
}

export interface ClientBooking {
  id: string;
  salonId: string;
  salonName: string;
  serviceName: string;
  price: number;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
}

export type ClientBottomTab = 'home' | 'bookings' | 'favorites' | 'profile';
export type BusinessDashboardTab = 'dashboard' | 'calendar' | 'services' | 'profile';

export interface FilterState {
  category: string | null;
  maxDistanceKm: number;
  searchQuery: string;
  minRating: number;
}

