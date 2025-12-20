import type { UserStatus } from "./enums";

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatNaira = (amount: number): string => {
  return `₦${amount}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const formatPercentageChange = (value: number): string => {
  return `${value}% More than Previous`;
};

export const formatStatusText = (status: UserStatus): string => {
  return status;
};