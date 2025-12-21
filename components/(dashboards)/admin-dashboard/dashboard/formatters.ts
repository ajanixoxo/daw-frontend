export const formatCurrency = (amount: number): string => {
  return `₦${(amount / 1000000).toFixed(0)}M`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
};

export const formatPercentageChange = (percentage: number): string => {
  return `${percentage}% More than Previous`;
};

export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  
  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  }
};