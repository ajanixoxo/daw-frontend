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

// --- Users Analytics ---
export interface UserAnalyticsResponse {
    success: boolean;
    data: {
        summary: {
            totalUsers: number;
            verifiedUsers: number;
            unverifiedUsers: number;
            thisMonthRegistrations: number;
            lastMonthRegistrations: number;
            growthRate: number;
        };
        roleBreakdown: { _id: string; count: number }[];
        kycBreakdown: { _id: string; count: number }[];
        statusBreakdown: { _id: string; count: number }[];
        registrationTrend: GrowthDataPoint[];
        recentUsers: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            roles: string[];
            status: string;
            createdAt: string;
            isVerified: boolean;
        }[];
    };
}

// --- Cooperative Analytics ---
export interface CooperativeAnalyticsResponse {
    success: boolean;
    data: {
        summary: {
            totalCooperatives: number;
            totalMembers: number;
            activeMembers: number;
            avgMembersPerCoop: number;
            totalContributions: number;
            totalContributionCount: number;
        };
        statusBreakdown: { _id: string; count: number }[];
        coopGrowthTrend: GrowthDataPoint[];
        contributionTrend: { _id: { month: number; year: number }; total: number; count: number }[];
        loanStats: { _id: string; count: number; totalAmount: number }[];
        topCoopsByContributions: {
            _id: string;
            name: string;
            logoUrl?: string;
            status: string;
            totalContributions: number;
            count: number;
        }[];
        topCoopsByMembers: {
            _id: string;
            name: string;
            logoUrl?: string;
            status: string;
            memberCount: number;
        }[];
    };
}

// --- Revenue Analytics ---
export interface RevenueAnalyticsResponse {
    success: boolean;
    data: {
        summary: {
            totalMarketplaceRevenue: number;
            totalContributionRevenue: number;
            totalCombinedRevenue: number;
            totalOrders: number;
            avgOrderValue: number;
            thisMonthRevenue: number;
            lastMonthRevenue: number;
            revenueGrowthRate: number;
        };
        revenueTrend: { _id: { month: number; year: number }; total: number; count: number }[];
        escrowBreakdown: { _id: string; count: number; total: number }[];
        orderStats: { _id: string; count: number }[];
        paymentStats: { _id: string; count: number; total: number }[];
        topShopsByRevenue: {
            _id: string;
            name: string;
            logoUrl?: string;
            totalRevenue: number;
            orderCount: number;
        }[];
    };
}
