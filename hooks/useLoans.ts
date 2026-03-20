import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getLoanProducts, 
  checkLoanEligibilityAction, 
  applyForLoanAction, 
  getMyLoans, 
  getCooperativeLoans, 
  updateLoanStatus,
  getLoanStats
} from "@/app/actions/loans";
import { ILoanApplication } from "@/types/loan.types";
import { toast } from "sonner";

export const useLoanProducts = () => {
  return useQuery({
    queryKey: ["loan-products"],
    queryFn: async () => {
      const response = await getLoanProducts();
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useLoanEligibility = () => {
  return useMutation({
    mutationFn: async (loanProductId: string) => {
      const response = await checkLoanEligibilityAction(loanProductId);
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useApplyLoan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ILoanApplication) => {
      const response = await applyForLoanAction(data);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-loans"] });
      toast.success("Loan application submitted correctly!");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit loan application");
    }
  });
};

export const useMyLoans = () => {
  return useQuery({
    queryKey: ["my-loans"],
    queryFn: async () => {
      const response = await getMyLoans();
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useCooperativeLoans = (status?: string) => {
  return useQuery({
    queryKey: ["cooperative-loans", status],
    queryFn: async () => {
      const response = await getCooperativeLoans(status);
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};

export const useUpdateLoanStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, action, payload }: { id: string, action: "review" | "approve" | "reject" | "disburse", payload?: any }) => {
      const response = await updateLoanStatus(id, action, payload);
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["cooperative-loans"] });
      queryClient.invalidateQueries({ queryKey: ["loan-stats"] });
      toast.success(`Loan ${variables.action}d successfully`);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update loan status");
    }
  });
};

export const useLoanStats = () => {
  return useQuery({
    queryKey: ["loan-stats"],
    queryFn: async () => {
      const response = await getLoanStats();
      if (!response.success) throw new Error(response.error);
      return response.data;
    }
  });
};
