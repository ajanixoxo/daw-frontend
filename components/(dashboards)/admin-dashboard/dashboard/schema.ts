import type { ApprovalType, ActivityStatus } from "./enums";

// Props types (data passed to components)
export interface DashboardPageProps {
  stats: StatsData;
  pendingApprovals: ApprovalItem[];
  recentActivities: ActivityItem[];
}

export interface StatsData {
  pendingApprovals: {
    value: number;
    percentageChange: number;
    isIncrease: boolean;
  };
  activeUsers: {
    value: number;
    subtitle: string;
  };
  totalLoans: {
    value: number;
    subtitle: string;
  };
  activeProducts: {
    value: number;
    subtitle: string;
  };
}

export interface ApprovalItem {
  id: string;
  type: ApprovalType;
  name: string;
  submittedBy: string;
  orderDate: Date;
  description: string;
}

export interface ActivityItem {
  id: string;
  description: string;
  status: ActivityStatus;
  timestamp: Date;
}