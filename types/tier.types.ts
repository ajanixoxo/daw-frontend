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
