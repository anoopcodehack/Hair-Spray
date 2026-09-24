import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, Stylist, BookingConfirmation } from '../types';
import { SERVICES_LIST, STYLISTS_LIST } from '../data/salonData';

interface BookingContextType {
  isBookingOpen: boolean;
  selectedService: ServiceItem | null;
  selectedStylist: Stylist | null;
  selectedDate: string;
  selectedTime: string;
  openBooking: (service?: ServiceItem | null, stylist?: Stylist | null) => void;
  closeBooking: () => void;
  setSelectedService: (service: ServiceItem | null) => void;
  setSelectedStylist: (stylist: Stylist | null) => void;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  savedBookings: BookingConfirmation[];
  addBooking: (booking: BookingConfirmation) => void;
  latestConfirmedBooking: BookingConfirmation | null;
  setLatestConfirmedBooking: (booking: BookingConfirmation | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(SERVICES_LIST[0]);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  
  // Default to tomorrow or today's date formatted YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [latestConfirmedBooking, setLatestConfirmedBooking] = useState<BookingConfirmation | null>(null);

  const [savedBookings, setSavedBookings] = useState<BookingConfirmation[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem('hair_spray_bookings') || localStorage.getItem('hair_spraay_bookings');
        return local ? JSON.parse(local) : [];
      } catch (e) {
        console.error('Failed to parse saved bookings', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('hair_spray_bookings', JSON.stringify(savedBookings));
    } catch (e) {
      console.error('Failed to save bookings', e);
    }
  }, [savedBookings]);

  const openBooking = (service?: ServiceItem | null, stylist?: Stylist | null) => {
    if (service) {
      setSelectedService(service);
    } else if (!selectedService) {
      setSelectedService(SERVICES_LIST[0]);
    }
    if (stylist !== undefined) {
      setSelectedStylist(stylist);
    }
    setIsBookingOpen(true);
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
  };

  const addBooking = (booking: BookingConfirmation) => {
    setSavedBookings((prev) => [booking, ...prev]);
    setLatestConfirmedBooking(booking);
  };

  return (
    <BookingContext.Provider
      value={{
        isBookingOpen,
        selectedService,
        selectedStylist,
        selectedDate,
        selectedTime,
        openBooking,
        closeBooking,
        setSelectedService,
        setSelectedStylist,
        setSelectedDate,
        setSelectedTime,
        savedBookings,
        addBooking,
        latestConfirmedBooking,
        setLatestConfirmedBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
