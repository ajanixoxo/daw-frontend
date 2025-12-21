// Props types (data passed to components)


export interface AnalyticsProps {
  stats: StatsData;
  platformGrowth: PlatformGrowthData[];
  monthlySales: MonthlySalesData[];
  topCooperatives: CooperativeData[];
  topProducts: ProductData[];
}

export interface StatsData {
  activeUsers: {
    value: number;
    percentageChange: number;
  };
  cooperatives: {
    value: number;
    subtitle: "Cards Issued";
  };
  totalProducts: {
    value: number;
    subtitle: "Requires Attention";
  };
  pendingApprovals: {
    value: number;
    subtitle: "Requires Attention";
  };
}

export interface PlatformGrowthData {
  month: string;
  value: number;
}

export interface MonthlySalesData {
  month: string;
  value: number;
}

export interface CooperativeData {
  id: string;
  rank: number;
  name: string;
  location: string;
  members: number;
  avatar: string;
  avatarColor: string;
  growthPercentage: number;
  revenue: number;
}

export interface ProductData {
  id: string;
  rank: number;
  name: string;
  organization: string;
  image: string;
  growthPercentage: number;
  revenue: number;
}