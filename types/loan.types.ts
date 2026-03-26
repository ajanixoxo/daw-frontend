export type LoanStatus = "pending" | "under_review" | "approved" | "rejected" | "disbursed" | "repaid";

export interface ILoanProduct {
  _id: string;
  name: string;
  amount: number;
  interestRate: number;
  repaymentTerm: number;
  monthlyPayment: number;
  tier: "Basic" | "Standard" | "Premium" | "Tier 1" | "Tier 2" | "Tier 3";
  purpose?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ILoanGuarantor {
  fullName: string;
  memberId: string; // Member ID
  relationship: string;
  phone: string;
  email: string;
  status: "pending" | "accepted" | "declined";
  acceptedAt?: string;
}

export interface ILoanBusinessInfo {
  useCase: string;
  businessImpact: string;
  expectedSalesImpact: string;
}

export interface ILoanApplication {
  loanProductId: string;
  location: string;
  businessInfo: ILoanBusinessInfo;
  documents?: string[];
  guarantor?: Partial<ILoanGuarantor>;
}

export interface ILoan {
  _id: string;
  memberId: string;
  cooperativeId: string;
  loanProductId: ILoanProduct | string;
  amount: number;
  interestRate: number;
  durationMonths: number;
  monthlyPayment: number;
  location: string;
  purpose: string;
  businessInfo: ILoanBusinessInfo;
  documents: string[];
  guarantor?: ILoanGuarantor;
  status: LoanStatus;
  eligibilityReport?: any;
  repayments: any[];
  disbursedAt?: string;
  approvedAt?: string;
  rejectedReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEligibilityCheck {
  id: number;
  title: string;
  passed: boolean;
  message: string;
}

export interface IEligibilityResponse {
  eligible: boolean;
  checks: IEligibilityCheck[];
  tierLimit: number;
  activeTotal: number;
  requestedAmount: number;
  tierName: string;
}
export interface ILoanAdminRecord {
  _id: string;
  member: string;
  email: string;
  loanProduct: string;
  amount: number;
  outstanding: number;
  interestRate: number;
  purpose: string;
  durationMonths: number;
  status: LoanStatus;
  createdAt: string;
  dueDate: string | null;
  repayments: any[];
}
