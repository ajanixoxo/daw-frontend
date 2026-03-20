import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { logisticsApi } from "@/lib/api/logistics.api";
import { useAuthStore } from "@/zustand/store";

export const useDeliveries = (status: string = "all") => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

  return useQuery({
    queryKey: ["logistics", "deliveries", status],
    queryFn: () => logisticsApi.getDeliveries(accessToken!, status),
    enabled: !!accessToken,
  });
};

export const useUpdateDeliveryStatus = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: "in_transit" | "delivered" }) =>
      logisticsApi.updateDeliveryStatus(accessToken!, orderId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logistics", "deliveries"] });
      queryClient.invalidateQueries({ queryKey: ["logistics", "stats"] });
    },
  });
};

export const useLogisticsEarnings = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

  return useQuery({
    queryKey: ["logistics", "earnings"],
    queryFn: () => logisticsApi.getEarnings(accessToken!),
    enabled: !!accessToken,
  });
};

export const useLogisticsStats = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

  return useQuery({
    queryKey: ["logistics", "stats"],
    queryFn: () => logisticsApi.getStats(accessToken!),
    enabled: !!accessToken,
  });
};
