// types/subscription.ts

export interface Tier {
  id: string;
  name: string;
  monthlyContribution: number;
  benefits?: {
    marketplaceDiscount?: number;
  };
  loanSettings?: {
    maxAmount: number;
    interestRate: number;
    maxDurationMonths: number;
    eligibilityCriteria: {
      minPaidMonths: number;
    };
  };
}

export interface ICooperative {
  _id: string;
  name: string;
  description?: string;
  adminId: string;
  subscriptionTiers?: Tier[];
  // other fields...
}

export interface JoinCooperativePayload {
  userId: string;
  cooperativeId: string;
  subscriptionTierId: string;
}
