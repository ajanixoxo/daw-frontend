export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}k`;
  }
  return num.toString();
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

export const formatPercentageChange = (value: number): string => {
  return `${value}% More than Previous`;
};

export const formatMonthShort = (month: string): string => {
  return month.substring(0, 3);
};