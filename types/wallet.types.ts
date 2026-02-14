export interface ICreateStaticAccountRequest {
    bvn: string;
    dateOfBirth: string;
}

export interface IWalletBankAccount {
    accountId: string;
    accountNo: string;
    accountName: string;
    bankName: string;
    bankCode: string;
    accountBalance?: number;
    pendingAmount?: number;
    walletBalance?: number;
    walletId?: string;
}

export interface IAdminWalletResponse {
    walletID: string;
    currentBalance: number;
    availableBalance?: number;
}


export interface IWalletResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    responseData?: T;
    response?: T;
    walletLedger?: T;
}


export interface IBank {
    bankName: string;
    bankCode: string;
}

export interface IWithdrawRequest {
    recipient_account_number: string;
    recipient_account_name: string;
    recipient_bank_code: string;
    amount: number;
    narration: string;
}

export interface IAdminPayoutRequest {
    pin: string;
    amount: number;
    bankCode: string;
    accountNumber: string;
    accountName: string;
}

export interface ILedgerEntry {
    _id: string;
    userId: string;
    reference: string;
    type: "DEBIT" | "CREDIT";
    amount: number;
    status: "PENDING" | "SUCCESS" | "FAILED";
    beneficiaryAccount?: string;
    channel: string;
    narration?: string;
    transactionDate: string;
    entryDate?: string;
    createdAt: string;
}

export interface IWalletStats {
    totalBalance: number;
    availableBalance: number;
    pendingBalance: number;
    accountNo?: string;
    bankName?: string;
}

