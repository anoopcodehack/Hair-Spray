import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { BookingProvider, useBooking } from '../context/BookingContext';
import { SERVICES_LIST, STYLISTS_LIST } from '../data/salonData';
import { BookingConfirmation } from '../types';

describe('BookingContext State Management Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <BookingProvider>{children}</BookingProvider>
  );

  it('initializes with default values and modal closed', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    expect(result.current.isBookingOpen).toBe(false);
    expect(result.current.selectedService).toBeDefined();
    expect(result.current.selectedStylist).toBeNull();
    expect(result.current.selectedDate).toBeTruthy();
    expect(result.current.savedBookings).toEqual([]);
    expect(result.current.latestConfirmedBooking).toBeNull();
  });

  it('opens and closes booking modal with openBooking and closeBooking', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.openBooking();
    });
    expect(result.current.isBookingOpen).toBe(true);

    act(() => {
      result.current.closeBooking();
    });
    expect(result.current.isBookingOpen).toBe(false);
  });

  it('can open booking pre-populated with a specific service and stylist', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });
    const targetService = SERVICES_LIST[3];
    const targetStylist = STYLISTS_LIST[0];

    act(() => {
      result.current.openBooking(targetService, targetStylist);
    });

    expect(result.current.isBookingOpen).toBe(true);
    expect(result.current.selectedService?.id).toBe(targetService.id);
    expect(result.current.selectedStylist?.id).toBe(targetStylist.id);
  });

  it('updates selectedDate', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    act(() => {
      result.current.setSelectedDate('2025-08-20');
    });

    expect(result.current.selectedDate).toBe('2025-08-20');
  });

  it('adds booking confirmation, updates latest booking, and persists to localStorage', () => {
    const { result } = renderHook(() => useBooking(), { wrapper });

    const newBooking: BookingConfirmation = {
      bookingId: 'HS-TEST-001',
      service: SERVICES_LIST[0],
      totalPrice: 1999,
      customerName: 'Rahul Rai',
      customerPhone: '9845012345',
      date: '2025-08-20',
      createdAt: new Date().toISOString(),
    };

    act(() => {
      result.current.addBooking(newBooking);
    });

    expect(result.current.savedBookings).toHaveLength(1);
    expect(result.current.savedBookings[0].bookingId).toBe('HS-TEST-001');
    expect(result.current.latestConfirmedBooking?.bookingId).toBe('HS-TEST-001');

    // Verify localStorage persistence
    const saved = JSON.parse(localStorage.getItem('hair_spray_bookings') || '[]');
    expect(saved).toHaveLength(1);
    expect(saved[0].bookingId).toBe('HS-TEST-001');
  });
});
