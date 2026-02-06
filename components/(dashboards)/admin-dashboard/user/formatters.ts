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

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(dateObj);
};

export const formatPercentageChange = (value: number): string => {
  return `${value}% More than Previous`;
};

export const formatStatusText = (status: UserStatus): string => {
  return status;
};