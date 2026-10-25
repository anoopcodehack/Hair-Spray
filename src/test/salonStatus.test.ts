import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getSalonCurrentStatus } from '../data/salonData';

describe('Salon Operational Status Suite', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return valid operational schema', () => {
    const status = getSalonCurrentStatus();
    expect(status).toHaveProperty('isOpen');
    expect(typeof status.isOpen).toBe('boolean');
    expect(status).toHaveProperty('todayName');
    expect(typeof status.todayName).toBe('string');
    expect(status).toHaveProperty('openHourStr');
    expect(status).toHaveProperty('closeHourStr');
    expect(status).toHaveProperty('statusLabel');
  });

  it('should reflect Open state when current IST time is within operational hours', () => {
    // Wednesday 2:00 PM IST (08:30 UTC)
    const midDayWednesday = new Date('2025-06-11T08:30:00Z');
    vi.setSystemTime(midDayWednesday);

    const status = getSalonCurrentStatus();
    expect(status.isOpen).toBe(true);
    expect(status.todayName).toBe('Wednesday');
    expect(status.statusLabel).toContain('Open Now');
    expect(status.statusLabel).toContain('Closes at 8:00 PM');
  });

  it('should reflect Closed state when time is late at night in IST', () => {
    // Wednesday 11:00 PM IST (17:30 UTC)
    const lateNightWednesday = new Date('2025-06-11T17:30:00Z');
    vi.setSystemTime(lateNightWednesday);

    const status = getSalonCurrentStatus();
    expect(status.isOpen).toBe(false);
    expect(status.todayName).toBe('Wednesday');
    expect(status.statusLabel).toContain('Closed');
    expect(status.statusLabel).toContain('Opens at 9:00 AM');
  });

  it('should indicate Tuesday 10:00 AM opening time on Tuesday morning before 10 AM IST', () => {
    // Tuesday 8:00 AM IST (02:30 UTC)
    const tuesdayMorning = new Date('2025-06-10T02:30:00Z');
    vi.setSystemTime(tuesdayMorning);

    const status = getSalonCurrentStatus();
    expect(status.isOpen).toBe(false);
    expect(status.todayName).toBe('Tuesday');
    expect(status.openHourStr).toBe('10:00 AM');
    expect(status.statusLabel).toContain('Opens at 10:00 AM');
  });
});
