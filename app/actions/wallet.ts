"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "./auth";
import type { IActionResponse } from "@/types/auth.types";
import type {
    ICreateStaticAccountRequest,
    IWalletBankAccount,
    IWalletResponse,
    IBank,
    IWithdrawRequest,
    ILedgerEntry,
} from "@/types/wallet.types";

export async function createStaticAccount(
    data: ICreateStaticAccountRequest
): Promise<IActionResponse<IWalletBankAccount>> {
    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.post<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.CREATE_STATIC,
            data,
            { token: session.accessToken }
        );

        // Backend returns data directly or in responseData
        const walletData = response.data || response.responseData || response;

        return {
            success: true,
            message: response.message || "Wallet created successfully",
            data: {
                accountId: walletData.accountId,
                accountNo: walletData.accountNo,
                accountName: walletData.accountName,
                bankName: walletData.bankName,
                bankCode: walletData.bankCode,
            },
        };
    } catch (error) {
        console.error("Create static account error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create wallet",
        };
    }
}

export async function getWalletAccount(): Promise<IActionResponse<IWalletBankAccount>> {
    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.get<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.GET_ACCOUNT,
            { token: session.accessToken }
        );
        const profileResponse = await apiClient.get<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.PROFILE,
            { token: session.accessToken }
        );
        console.log("response to get balance", response);
        const walletData = response.response || response.responseData || response.data || response;
        const profileData = profileResponse.response || profileResponse.responseData || profileResponse.data || profileResponse;

        // Extract the user object if it exists (for auth/profile response)
        const userObj = profileData.user || profileData;

        console.log("profile data extracted userObj", userObj);

        return {
            success: true,
            message: response.message || "Wallet fetched successfully",
            data: {
                accountId: walletData.accountId,
                accountNo: walletData.accountNo,
                accountName: walletData.accountName,
                bankName: walletData.bankName,
                bankCode: walletData.bankCode,
                accountBalance: userObj.account_Balance || userObj.accountBalance || walletData.account_Balance || walletData.accountBalance || 0,
                pendingAmount: userObj.pending_amount || userObj.pendingAmount || walletData.pending_amount || walletData.pendingAmount || 0,
                walletBalance: userObj.wallet_balance || userObj.walletBalance || walletData.wallet_balance || walletData.walletBalance || 0,
            },
        };



    } catch (error) {
        console.error("Get wallet account error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch wallet",
        };
    }
}

export async function getBanks(): Promise<IActionResponse<IBank[]>> {
    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.get<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.GET_BANKS,
            { token: session.accessToken }
        );

        // Debug logging on server
        console.log("Raw Banks Response:", JSON.stringify(response).substring(0, 500));

        const rawBanks = response.responseData || response.data || response;
        const banksArray = Array.isArray(rawBanks) ? rawBanks : [];

        const mappedBanks: IBank[] = banksArray.map((b: any) => ({
            bankName: b.bankName || b.name || b.bank_name || "Unknown Bank",
            bankCode: b.bankCode || b.code || b.bank_code || "",
        })).filter(b => b.bankCode);

        return {
            success: true,
            message: response.message || "Banks fetched successfully",
            data: mappedBanks,
        };
    } catch (error) {
        console.error("Get banks error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch banks",
        };
    }
}


export async function withdrawFunds(
    data: IWithdrawRequest
): Promise<IActionResponse> {
    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.post<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.PAYOUT,
            data,
            { token: session.accessToken }
        );

        return {
            success: true,
            message: response.message || "Withdrawal successful",
        };
    } catch (error) {
        console.error("Withdraw funds error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Withdrawal failed",
        };
    }
}

export async function accountLookup(
    bankCode: string,
    accNumber: string
): Promise<IActionResponse<{ accountName: string }>> {
    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.post<IWalletResponse<any>>(
            API_ENDPOINTS.WALLET.ACCOUNT_LOOKUP,
            { bankCode, accNumber },
            { token: session.accessToken }
        );

        const lookupData = response.responseData || response.data || response;

        return {
            success: true,
            message: response.message || "Account verified",
            data: {
                accountName: lookupData.accountName || lookupData.account_name || "Unknown Account",
            },
        };
    } catch (error) {
        console.error("Account lookup error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Account verification failed",
        };
    }
}

export async function getLedger(): Promise<IActionResponse<ILedgerEntry[]>> {

    try {
        const session = await getServerSession();
        if (!session?.accessToken) throw new Error("Authentication required");

        const response = await apiClient.get<IWalletResponse<ILedgerEntry[]>>(
            API_ENDPOINTS.WALLET.LEDGER,
            { token: session.accessToken }
        );

        const ledger = response.walletLedger || response.data || response;

        return {
            success: true,
            message: response.message || "Ledger fetched successfully",
            data: Array.isArray(ledger) ? ledger : [],
        };
    } catch (error) {
        console.error("Get ledger error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch ledger",
        };
    }
}
