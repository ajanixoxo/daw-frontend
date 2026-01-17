import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  businessName: string;
  country: string;
  currency: string;
  password: string;
  confirmPassword: string;
  document: File | null;
}

interface SignupState {
  currentStep: number;
  formData: {
    personalInfo: PersonalInfo;
    membershipTier: number | null; // 1, 2, or 3
  };
  setStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  setMembershipTier: (tier: number) => void;
  reset: () => void;
}

export const useCooperativeSignupStore = create<SignupState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {
        personalInfo: {
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          businessName: '',
          country: '',
          currency: '',
          password: '',
          confirmPassword: '',
          document: null,
        },
        membershipTier: null,
      },
      setStep: (step) => set({ currentStep: step }),
      updatePersonalInfo: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personalInfo: { ...state.formData.personalInfo, ...data },
          },
        })),
      setMembershipTier: (tier) =>
        set((state) => ({
          formData: { ...state.formData, membershipTier: tier },
        })),
      reset: () =>
        set({
          currentStep: 1,
          formData: {
            personalInfo: {
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              businessName: '',
              country: '',
              currency: '',
              password: '',
              confirmPassword: '',
              document: null,
            },
            membershipTier: null,
          },
        }),
    }),
    {
      name: 'cooperative-signup-storage',
      // skip hydration for `document` field as File objects don't persist well in localStorage. 
      // Actually, persist can handle simple objects, but Files are tricky. 
      // For now, simple persistence is fine, understanding document might be lost on refresh.
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: {
            ...state.formData,
            personalInfo: {
                ...state.formData.personalInfo,
                document: null // Avoid persisting File object
            }
        } 
      }),
    }
  )
);
