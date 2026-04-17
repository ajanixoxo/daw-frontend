import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { withdrawalApi, IWithdrawalRequest } from "@/lib/api/withdrawal.api";
import { useAuthStore } from "@/zustand/store";
import { toast } from "sonner";

export const useWithdrawals = (status?: string) => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);

  return useQuery({
    queryKey: ["withdrawals", status],
    queryFn: () => withdrawalApi.getWithdrawals(accessToken!, status),
    enabled: !!accessToken,
  });
};

export const useRequestWithdrawal = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: IWithdrawalRequest) => withdrawalApi.requestWithdrawal(accessToken!, data),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Withdrawal request submitted");
        queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
        queryClient.invalidateQueries({ queryKey: ["auth"] }); // To refresh balance
      } else {
        toast.error(res.error || "Failed to submit request");
      }
    },
  });
};

export const useApproveWithdrawal = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, adminNote }: { id: string; adminNote?: string }) =>
      withdrawalApi.approveWithdrawal(accessToken!, id, adminNote),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Withdrawal approved");
        queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      } else {
        toast.error(res.error || "Failed to approve");
      }
    },
  });
};

export const useRejectWithdrawal = () => {
  const accessToken = useAuthStore((state) => state.sessionData?.accessToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, adminNote }: { id: string; adminNote?: string }) =>
      withdrawalApi.rejectWithdrawal(accessToken!, id, adminNote),
    onSuccess: (res) => {
      if (res.success) {
        toast.success("Withdrawal rejected");
        queryClient.invalidateQueries({ queryKey: ["withdrawals"] });
      } else {
        toast.error(res.error || "Failed to reject");
      }
    },
  });
};
