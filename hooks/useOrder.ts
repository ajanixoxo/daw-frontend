import { useQuery } from "@tanstack/react-query";
import { getAllOrders, getOrder, getOrderStatus } from "@/app/actions/order";
import { clientApiClient, API_ENDPOINTS } from "@/lib/api/client-client";
import { IGetOrderStatusResponse } from "@/types/order.types";

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await getAllOrders();
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch orders");
      }
      return result.data!;
    },
  });
}

export function useOrder(orderId: string | null) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("Order ID is required");
      const result = await getOrder(orderId);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch order");
      }
      return result.data!;
    },
    enabled: !!orderId,
  });
}

export function useOrderStatus(orderId: string | null) {
  return useQuery({
    queryKey: ["orderStatus", orderId],
    queryFn: async () => {
      if (!orderId) throw new Error("Order ID is required");
      const result = await getOrderStatus(orderId);
      if (!result.success) {
        throw new Error(result.error || "Failed to fetch order status");
      }
      return result.data!;
    },
    enabled: !!orderId,
  });
}
