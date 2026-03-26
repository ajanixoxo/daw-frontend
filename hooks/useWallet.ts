import { useQuery } from "@tanstack/react-query";
import { getLedger, getWalletAccount } from "@/app/actions/wallet";

export function useLedger() {
  return useQuery({
    queryKey: ["ledger"],
    queryFn: async () => {
      const response = await getLedger();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data || [];
    },
  });
}

export function useWallet() {
  return useQuery({
    queryKey: ["wallet-account"],
    queryFn: async () => {
      const response = await getWalletAccount();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });
}
