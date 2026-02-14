import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface ShopInfo {
  shopName: string;
  description: string;
  category: string;
  contactNumber: string;
  businessAddress: string;
  shopLogo: File | null;
  shopBanner: File | null;
}

interface DocumentsInfo {
  nin: string;
  passportPhotograph: File | null;
  businessCac: File | null;
}

interface SellerSignupState {
  currentStep: number;
  formData: {
    personalInfo: PersonalInfo;
    shopInfo: ShopInfo;
    documents: DocumentsInfo;
  };
  setStep: (step: number) => void;
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateShopInfo: (data: Partial<ShopInfo>) => void;
  updateDocuments: (data: Partial<DocumentsInfo>) => void;
  reset: () => void;
}

const initialPersonalInfo: PersonalInfo = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

const initialShopInfo: ShopInfo = {
  shopName: '',
  description: '',
  category: '',
  contactNumber: '',
  businessAddress: '',
  shopLogo: null,
  shopBanner: null,
};

const initialDocuments: DocumentsInfo = {
  nin: '',
  passportPhotograph: null,
  businessCac: null,
};

export const useSellerSignupStore = create<SellerSignupState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {
        personalInfo: { ...initialPersonalInfo },
        shopInfo: { ...initialShopInfo },
        documents: { ...initialDocuments },
      },
      setStep: (step) => set({ currentStep: step }),
      updatePersonalInfo: (data) =>
        set((state) => ({
          formData: {
            ...state.formData,
            personalInfo: { ...state.formData.personalInfo, ...data },
          },
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
      reset: () =>
        set({
          currentStep: 1,
          formData: {
            personalInfo: { ...initialPersonalInfo },
            shopInfo: { ...initialShopInfo },
            documents: { ...initialDocuments },
          },
        }),
    }),
    {
      name: 'seller-signup-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: {
          personalInfo: {
            ...state.formData.personalInfo,
            password: '',
            confirmPassword: '',
          },
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
