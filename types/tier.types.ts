import { Key, ReactNode } from "react";

export interface CreateTierPayload {
  cooperativeId: string;
  name: string;
  monthlyContribution: number;
  benefits: {
    marketplaceDiscount: number;
  };
  loanSettings: {
    maxAmount: number;
    interestRate: number;
    maxDurationMonths: number;
    eligibilityCriteria: {
      minPaidMonths: number;
    };
  };
}

export interface Tier {
  _id: string;
  benefits: any;
  monthlyContribution: number;
  loanSettings: any;
  id: string;
  name: string;
  price: number;
}
