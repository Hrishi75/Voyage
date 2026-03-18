import { create } from 'zustand';
import { Package, Tier } from '../types';

interface BookingForm {
  travelDates: { from: Date | null; to: Date | null };
  travelers: number;
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface BookingState {
  selectedPackage: Package | null;
  selectedTier: Tier | null;
  currentStep: number;
  form: BookingForm;

  setPackage: (pkg: Package) => void;
  setTier: (tier: Tier) => void;
  setStep: (step: number) => void;
  updateForm: (updates: Partial<BookingForm>) => void;
  reset: () => void;
}

const initialForm: BookingForm = {
  travelDates: { from: null, to: null },
  travelers: 1,
  fullName: '',
  email: '',
  phone: '',
  specialRequests: '',
};

export const useBookingStore = create<BookingState>((set) => ({
  selectedPackage: null,
  selectedTier: null,
  currentStep: 0,
  form: { ...initialForm },

  setPackage: (pkg) => set({ selectedPackage: pkg }),
  setTier: (tier) => set({ selectedTier: tier }),
  setStep: (step) => set({ currentStep: step }),
  updateForm: (updates) =>
    set((state) => ({ form: { ...state.form, ...updates } })),
  reset: () =>
    set({
      selectedPackage: null,
      selectedTier: null,
      currentStep: 0,
      form: { ...initialForm },
    }),
}));
