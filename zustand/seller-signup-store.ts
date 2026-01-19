import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  idDocument: File | null;
  proofOfResidence: File | null;
  businessCac: File | null;
  passportPhotograph: File | null;
}

interface SellerSignupState {
  currentStep: number;
  formData: {
    shopInfo: ShopInfo;
    documents: DocumentsInfo;
  };
  setStep: (step: number) => void;
  updateShopInfo: (data: Partial<ShopInfo>) => void;
  updateDocuments: (data: Partial<DocumentsInfo>) => void;
  reset: () => void;
}

export const useSellerSignupStore = create<SellerSignupState>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {
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
          idDocument: null,
          proofOfResidence: null,
          businessCac: null,
          passportPhotograph: null,
        },
      },
      setStep: (step) => set({ currentStep: step }),
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
              idDocument: null,
              proofOfResidence: null,
              businessCac: null,
              passportPhotograph: null,
            },
          },
        }),
    }),
    {
      name: 'seller-signup-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        formData: {
          shopInfo: {
            ...state.formData.shopInfo,
            shopLogo: null,
            shopBanner: null,
          },
          documents: {
            idDocument: null,
            proofOfResidence: null,
            businessCac: null,
            passportPhotograph: null,
          },
        },
      }),
    }
  )
);
