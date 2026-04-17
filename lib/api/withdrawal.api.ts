import { apiClient, API_ENDPOINTS } from "./client";
import { IActionResponse } from "@/types/product.types";

export interface IWithdrawalRequest {
  amount: number;
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
  saveBankDetails?: boolean;
}

export interface IWithdrawal {
  _id: string;
  userId: any;
  amount: number;
  currency: string;
  status: "pending" | "approved" | "rejected";
  bankDetails: {
    accountNumber: string;
    bankName: string;
    accountName: string;
  };
  adminNote?: string;
  processedAt?: string;
  createdAt: string;
}

export const withdrawalApi = {
  requestWithdrawal: async (token: string, data: IWithdrawalRequest): Promise<IActionResponse<IWithdrawal>> => {
    try {
      const response = await apiClient.post<IWithdrawal>(API_ENDPOINTS.WITHDRAWALS.REQUEST, data, { token });
      return { success: true, data: response as any };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  getWithdrawals: async (token: string, status?: string): Promise<IActionResponse<IWithdrawal[]>> => {
    try {
      const endpoint = status ? `${API_ENDPOINTS.WITHDRAWALS.GET_ALL}?status=${status}` : API_ENDPOINTS.WITHDRAWALS.GET_ALL;
      const response = await apiClient.get<{ withdrawals: IWithdrawal[] }>(endpoint, { token });
      return { success: true, data: response.withdrawals };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  approveWithdrawal: async (token: string, id: string, adminNote?: string): Promise<IActionResponse<void>> => {
    try {
      await apiClient.patch(API_ENDPOINTS.WITHDRAWALS.APPROVE(id), { adminNote }, { token });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },

  rejectWithdrawal: async (token: string, id: string, adminNote?: string): Promise<IActionResponse<void>> => {
    try {
      await apiClient.patch(API_ENDPOINTS.WITHDRAWALS.REJECT(id), { adminNote }, { token });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};
