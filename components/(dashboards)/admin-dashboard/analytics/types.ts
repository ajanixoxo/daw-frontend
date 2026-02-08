export interface GrowthDataPoint {
    _id: { month: number; year: number };
    count: number;
}

export interface SalesDataPoint {
    _id: { month: number; year: number };
    totalSales: number;
    orderCount: number;
}

export interface TopCooperative {
    _id: string;
    name: string;
    logoUrl?: string;
    memberCount: number;
    status: string;
}

export interface TopProduct {
    _id: string; // Product ID
    name: string;
    price: number;
    image?: string;
    category: string;
    totalSold: number;
    totalRevenue: number;
}

export interface AnalyticsResponse {
    success: boolean;
    data: {
        growth: {
            user: GrowthDataPoint[];
            coop: GrowthDataPoint[];
            product: GrowthDataPoint[];
        };
        sales: SalesDataPoint[];
        topCooperatives: TopCooperative[];
        topProducts: TopProduct[];
    };
}
