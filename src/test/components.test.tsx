import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BookingProvider, useBooking } from '../context/BookingContext';
import { SalonLogo } from '../components/SalonLogo';
import { MobileBookingBar } from '../components/MobileBookingBar';
import { Hero } from '../components/Hero';
import { PricingMembership } from '../components/PricingMembership';
import { BookingModal } from '../components/BookingModal';
import { SALON_COMBOS } from '../data/salonData';

describe('Component Testing Suite (React Testing Library)', () => {
  describe('SalonLogo Component', () => {
    it('renders the official salon logo with accessible alt text', () => {
      render(<SalonLogo />);
      const logoImg = screen.getByAltText(/Hair Spray Unisex Salon Official Logo/i);
      expect(logoImg).toBeInTheDocument();
    });

    it('renders text with location when showText is true', () => {
      render(<SalonLogo showText={true} />);
      expect(screen.getByText('Hair Spray')).toBeInTheDocument();
      expect(screen.getByText(/Kavoor, Mangalore/i)).toBeInTheDocument();
      expect(screen.getByText('Unisex')).toBeInTheDocument();
    });
  });

  describe('MobileBookingBar Component', () => {
    it('renders Quick Call, WhatsApp, Directions, and Book Appointment actions', () => {
      render(
        <BookingProvider>
          <MobileBookingBar />
        </BookingProvider>
      );

      const callLink = screen.getByLabelText(/Call salon/i);
      expect(callLink).toHaveAttribute('href', 'tel:917760468902');

      const waLink = screen.getByLabelText(/Chat on WhatsApp/i);
      expect(waLink).toHaveAttribute('href', expect.stringContaining('wa.me/917760468902'));

      const dirLink = screen.getByLabelText(/Get directions to Kavoor salon/i);
      expect(dirLink).toHaveAttribute('href', expect.stringContaining('google.com/maps'));

      const bookBtn = screen.getByRole('button', { name: /open booking modal/i });
      expect(bookBtn).toBeInTheDocument();
    });
  });

  describe('Hero Component', () => {
    it('renders salon brand title, Kavoor location, and booking CTAs', () => {
      render(
        <BookingProvider>
          <Hero />
        </BookingProvider>
      );

      expect(screen.getAllByText(/Kavoor, Mangalore/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/4.7/i).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/301 Reviews/i).length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('PricingMembership Component', () => {
    it('renders trending combos and combo packages with transparent prices', () => {
      render(
        <BookingProvider>
          <PricingMembership />
        </BookingProvider>
      );

      // Verify combo packages appear
      const firstCombo = SALON_COMBOS[0];
      expect(screen.getByText(firstCombo.name)).toBeInTheDocument();
      expect(screen.getAllByText(new RegExp(`₹${firstCombo.price}`, 'i')).length).toBeGreaterThan(0);
    });
  });

  describe('BookingModal Component & Strict User Specifications', () => {
    // Helper to render open modal
    const ModalTestContainer = () => {
      const { openBooking } = useBooking();
      return (
        <div>
          <button onClick={() => openBooking()} data-testid="open-modal-trigger">
            Open Modal
          </button>
          <BookingModal />
        </div>
      );
    };

    it('modal opens and renders booking form fields', () => {
      render(
        <BookingProvider>
          <ModalTestContainer />
        </BookingProvider>
      );

      fireEvent.click(screen.getByTestId('open-modal-trigger'));

      expect(screen.getByPlaceholderText(/Full Name \*/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Phone \/ WhatsApp Number \*/i)).toBeInTheDocument();
    });

    it('CRITICAL TEST: verifies NO time slot buttons or timing grids exist in BookingModal (per user request)', () => {
      render(
        <BookingProvider>
          <ModalTestContainer />
        </BookingProvider>
      );

      fireEvent.click(screen.getByTestId('open-modal-trigger'));

      // Ensure no "Select Time Slot" or timing buttons exist
      expect(screen.queryByText(/Select Time Slot/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Choose Time Slot/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Available Timings/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/10:00 AM/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/02:00 PM/i)).not.toBeInTheDocument();
    });

    it('promo code application works with FIRSTGLAM and gives discount confirmation', () => {
      render(
        <BookingProvider>
          <ModalTestContainer />
        </BookingProvider>
      );

      fireEvent.click(screen.getByTestId('open-modal-trigger'));

      const promoInput = screen.getByPlaceholderText(/Promo code \(FIRSTGLAM\)/i);
      const applyBtn = screen.getByRole('button', { name: /Apply/i });

      // Apply valid code
      fireEvent.change(promoInput, { target: { value: 'FIRSTGLAM' } });
      fireEvent.click(applyBtn);

      expect(screen.getByText(/FIRSTGLAM coupon applied!/i)).toBeInTheDocument();
    });

    it('shows error for invalid coupon code', () => {
      render(
        <BookingProvider>
          <ModalTestContainer />
        </BookingProvider>
      );

      fireEvent.click(screen.getByTestId('open-modal-trigger'));

      const promoInput = screen.getByPlaceholderText(/Promo code \(FIRSTGLAM\)/i);
      const applyBtn = screen.getByRole('button', { name: /Apply/i });

      fireEvent.change(promoInput, { target: { value: 'WRONGCODE' } });
      fireEvent.click(applyBtn);

      expect(screen.getByText(/Invalid code. Try "FIRSTGLAM" for 15% off./i)).toBeInTheDocument();
    });
  });
});
