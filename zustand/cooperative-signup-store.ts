import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface DAWTier {
  _id: string;
  name: string;
  monthlyContribution: number;
}

/** Shop info for 5-step flow (buyer/guest upgrading to seller + joining cooperative). */
export interface CooperativeShopInfo {
  shopName: string;
  description: string;
  category: string;
  contactNumber: string;
  businessAddress: string;
  shopLogo: File | null;
  shopBanner: File | null;
}

/** Documents for 5-step flow (buyer/guest). NIN for KYC, passport required, CAC optional. */
export interface CooperativeDocumentsInfo {
  nin: string;
  passportPhotograph: File | null;
  businessCac: File | null;
}

type PrefilledFields = Partial<Record<keyof PersonalInfo, boolean>>;

interface SignupState {
  currentStep: number;
  formData: {
    personalInfo: PersonalInfo;
    membershipTier: number | null; // 1, 2, or 3
    shopInfo: CooperativeShopInfo;
    documents: CooperativeDocumentsInfo;
  };
  /** Fields that were prefilled from profile; should be disabled in the form */
  prefilledFields: PrefilledFields;
  /** True if user already has seller documents (e.g. from seller onboarding); hide ID document upload */
  hasSellerDocuments: boolean;
  /** DAW cooperative id and tiers from GET /api/cooperatives/daw */
  dawCooperativeId: string | null;
  dawTiers: DAWTier[];
  setStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateShopInfo: (data: Partial<CooperativeShopInfo>) => void;
  updateDocuments: (data: Partial<CooperativeDocumentsInfo>) => void;
  setMembershipTier: (tier: number) => void;
  /** Prefill personal info from profile; marks those fields as prefilled so they can be disabled */
  setPreloadedPersonalInfo: (profile: { firstName?: string; lastName?: string; email?: string; phone?: string }) => void;
  setHasSellerDocuments: (value: boolean) => void;
  setDAWCooperative: (cooperativeId: string, tiers: DAWTier[]) => void;
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
          phone: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        membershipTier: null,
        shopInfo: {
          shopName: '',
          description: '',
          category: '',
          contactNumber: '',
          businessAddress: '',
          shopLogo: null,
          shopBanner: null,
        },
        documents: {
          nin: '',
          passportPhotograph: null,
          businessCac: null,
        },
      },
      prefilledFields: {},
      hasSellerDocuments: false,
      dawCooperativeId: null,
      dawTiers: [],
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
      updateShopInfo: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            shopInfo: { ...state.formData.shopInfo, ...data },
          },
        })),
      updateDocuments: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            documents: { ...state.formData.documents, ...data },
          },
        })),
      setPreloadedPersonalInfo: (profile) =>
        set((state) => {
          const updates: Partial<PersonalInfo> = {};
          const prefilled: PrefilledFields = {};
          if (profile.firstName != null && profile.firstName !== '') {
            updates.firstName = profile.firstName;
            prefilled.firstName = true;
          }
          if (profile.lastName != null && profile.lastName !== '') {
            updates.lastName = profile.lastName;
            prefilled.lastName = true;
          }
          if (profile.email != null && profile.email !== '') {
            updates.email = profile.email;
            prefilled.email = true;
          }
          if (profile.phone != null && profile.phone !== '') {
            updates.phone = profile.phone;
            prefilled.phone = true;
          }
          return {
            formData: {
              ...state.formData,
              personalInfo: { ...state.formData.personalInfo, ...updates },
            },
            prefilledFields: { ...state.prefilledFields, ...prefilled },
          };
        }),
      setHasSellerDocuments: (value) => set({ hasSellerDocuments: value }),
      setDAWCooperative: (cooperativeId, tiers) =>
        set({ dawCooperativeId: cooperativeId, dawTiers: tiers }),
      reset: () =>
        set({
          currentStep: 1,
          formData: {
            personalInfo: {
              firstName: '',
              lastName: '',
              phone: '',
              email: '',
              password: '',
              confirmPassword: '',
            },
            membershipTier: null,
            shopInfo: {
              shopName: '',
              description: '',
              category: '',
              contactNumber: '',
              businessAddress: '',
              shopLogo: null,
              shopBanner: null,
            },
            documents: {
              nin: '',
              passportPhotograph: null,
              businessCac: null,
            },
          },
          prefilledFields: {},
          hasSellerDocuments: false,
          dawCooperativeId: null,
          dawTiers: [],
        }),
    }),
    {
      name: 'cooperative-signup-storage',
      // File objects don't persist well in localStorage — null them out in partialize.
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: {
          ...state.formData,
          personalInfo: state.formData.personalInfo,
          shopInfo: {
            ...state.formData.shopInfo,
            shopLogo: null,
            shopBanner: null,
          },
          documents: {
            nin: state.formData.documents.nin,
            passportPhotograph: null,
            businessCac: null,
          },
        },
      }),
    }
  )
);
