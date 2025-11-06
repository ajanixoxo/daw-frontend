// Props types (data passed to components)
export interface UserManagementProps {
  stats: StatsData;
  users: UserData[];
}

export interface StatsData {
  totalUser: {
    value: number;
    percentageChange: number;
  };
  numberOfSellers: {
    value: number;
    subtitle: "Cards Issued";
  };
  numberOfCategories: {
    value: number;
    subtitle: "Requires Attention";
  };
}

export interface UserData {
  id: string;
  name: string;
  description: string;
  avatar: string;
  avatarColor: string;
  admin: {
    name: string;
    email: string;
  };
  location: string;
  members: number;
  products: number;
  totalSales: number | string;
  regDate: Date;
  status: import("./enums").UserStatus;
  totalSalesAmount?: number;
}