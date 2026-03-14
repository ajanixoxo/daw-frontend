import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useMutation } from '@tanstack/react-query';
import {
  placeOrder,
  initiatePayment,
  initiatePaystackPayment,
  initiatePaypalOrder,
} from '@/app/actions/checkout';
import {
  IPlaceOrderRequest,
  IPaymentInitiateRequest,
  IPlaceOrderResponse,
  IPaystackInitiateRequest,
  IPaypalCreateOrderRequest,
} from '@/types/checkout.types';

interface CheckoutState {
  orderData: IPlaceOrderResponse | null;
  setOrderData: (data: IPlaceOrderResponse | null) => void;
  clearOrderData: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      orderData: null,
      setOrderData: (data) => set({ orderData: data }),
      clearOrderData: () => set({ orderData: null }),
    }),
    {
      name: 'checkout-storage',
      storage: createJSONStorage(() => sessionStorage), // Use session storage to clear on tab close
    }
  )
);

export function usePlaceOrder() {
  const { setOrderData } = useCheckoutStore();

  return useMutation({
    mutationFn: async (data: IPlaceOrderRequest) => {
      const result = await placeOrder(data);
      if (!result.success) {
        throw new Error(result.error || "Failed to place order");
      }
      return result.data!;
    },
    onSuccess: (data) => {
      setOrderData(data);
    },
  });
}

export function useInitiatePayment() {
  return useMutation({
    mutationFn: async (data: IPaymentInitiateRequest) => {
      const result = await initiatePayment(data);
      if (!result.success) throw new Error(result.error || "Failed to initiate payment");
      return result.data!;
    },
  });
}

export function useInitiatePaystackPayment() {
  return useMutation({
    mutationFn: async (data: IPaystackInitiateRequest) => {
      const result = await initiatePaystackPayment(data);
      if (!result.success) throw new Error(result.error || "Failed to initiate Paystack payment");
      return result.data!;
    },
  });
}

export function useInitiatePaypalOrder() {
  return useMutation({
    mutationFn: async (data: IPaypalCreateOrderRequest) => {
      const result = await initiatePaypalOrder(data);
      if (!result.success) throw new Error(result.error || "Failed to create PayPal order");
      return result.data!;
    },
  });
}
