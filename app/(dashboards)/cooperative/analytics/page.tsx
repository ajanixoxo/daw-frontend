// "use client";

// import React, { useState } from 'react';
// import { TrendingUp } from 'lucide-react';

// const Analytics = () => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const stats = [
//     {
//       icon: '💰',
//       label: 'Monthly Revenue',
//       value: '$7,200',
//       change: '10% from last month',
//       isPositive: true
//     },
//     {
//       icon: '📈',
//       label: 'Growth Rate',
//       value: '18.5%',
//       change: 'Monthly growth',
//       isPositive: null
//     },
//     {
//       icon: '👥',
//       label: 'Active Members',
//       value: '26',
//       change: '10% this month',
//       isPositive: true
//     },
//     {
//       icon: '📦',
//       label: 'Product Sold',
//       value: '190',
//       change: 'This month',
//       isPositive: null
//     },
//     {
//       icon: '🎯',
//       label: 'Goal Progress',
//       value: '72%',
//       change: 'Requires Attention',
//       isPositive: null
//     }
//   ];

//   const chartData = [
//     { month: 'January', height: 64 },
//     { month: 'February', height: 90 },
//     { month: 'March', height: 56 },
//     { month: 'April', height: 78 },
//     { month: 'May', height: 56 },
//     { month: 'July', height: 76 },
//     { month: 'August', height: 88 },
//     { month: 'Septem', height: 95 }
//   ];

//   const cooperatives = [
//     { rank: 1, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' },
//     { rank: 2, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' },
//     { rank: 3, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' },
//     { rank: 4, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' },
//     { rank: 5, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' },
//     { rank: 5, name: 'Lagos Artisan Network', location: 'Lagos', members: 45, growth: 10, revenue: '$125,000' }
//   ];

//   const topMembers = [
//     { rank: 1, name: 'Lagos Artisan Network', sales: '$3,240 Total Sales', growth: 10, revenue: '$125,000' },
//     { rank: 2, name: 'Lagos Artisan Network', sales: '$3,240 Total Sales', growth: 10, revenue: '$125,000' },
//     { rank: 3, name: 'Lagos Artisan Network', sales: '$3,240 Total Sales', growth: 10, revenue: '$125,000' },
//     { rank: 4, name: 'Lagos Artisan Network', sales: '$3,240 Total Sales', growth: 10, revenue: '$125,000' },
//     { rank: 5, name: 'Lagos Artisan Network', sales: '$3,240 Total Sales', growth: 10, revenue: '$125,000' }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-1">Analytics</h1>
//           <p className="text-sm text-gray-500">Comprehensive insights into platform performance and user activity</p>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
//           {stats.map((stat, index) => (
//             <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-xl">{stat.icon}</span>
//                 <span className="text-xs text-gray-500">{stat.label}</span>
//               </div>
//               <div className="text-2xl font-semibold text-gray-900 mb-1">{stat.value}</div>
//               <div className="flex items-center gap-1 text-xs">
//                 {stat.isPositive && <TrendingUp className="w-3 h-3 text-emerald-500" />}
//                 <span className={stat.isPositive ? "text-emerald-500" : "text-gray-500"}>
//                   {stat.change}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-0 mb-6">
//           <button
//             onClick={() => setActiveTab('overview')}
//             className={`flex-1 max-w-[368px] py-3.5 text-sm font-medium transition-colors ${
//               activeTab === 'overview'
//                 ? 'bg-pink-600 text-white rounded-xl'
//                 : 'bg-white text-gray-500'
//             }`}
//           >
//             Overview
//           </button>
//           <button
//             onClick={() => setActiveTab('revenue')}
//             className={`flex-1 max-w-[368px] py-3.5 text-sm font-medium transition-colors ${
//               activeTab === 'revenue'
//                 ? 'bg-pink-600 text-white rounded-xl'
//                 : 'bg-white text-gray-500'
//             }`}
//           >
//             Revenue
//           </button>
//           <button
//             onClick={() => setActiveTab('members')}
//             className={`flex-1 max-w-[368px] py-3.5 text-sm font-medium transition-colors ${
//               activeTab === 'members'
//                 ? 'bg-pink-600 text-white rounded-xl'
//                 : 'bg-white text-gray-500'
//             }`}
//           >
//             Members
//           </button>
//           <button
//             onClick={() => setActiveTab('products')}
//             className={`flex-1 max-w-[368px] py-3.5 text-sm font-medium transition-colors ${
//               activeTab === 'products'
//                 ? 'bg-pink-600 text-white rounded-xl'
//                 : 'bg-white text-gray-500'
//             }`}
//           >
//             Products
//           </button>
//         </div>

//  {/* To implement a tab here*/}























































//         {/* Top Performing Members */}
//         <div className="mt-6 bg-white rounded-3xl p-8 shadow-sm">
//           <div className="flex items-center gap-2.5 mb-8">
//             <svg className="w-5 h-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//               <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
//             </svg>
//             <h2 className="text-xl font-semibold text-gray-900">Top Performing Members</h2>
//           </div>

//           <div className="space-y-5">
//             {topMembers.map((member, index) => (
//               <div key={index} className="flex items-center gap-6 bg-gray-50 rounded-3xl p-6">
//                 <span className="text-base text-gray-900 font-normal w-3">{member.rank}</span>
//                 <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center flex-shrink-0">
//                   <span className="text-purple-600 font-semibold text-lg">M</span>
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-base font-normal text-gray-900">{member.name}</h3>
//                 </div>
//                 <div className="text-base text-gray-500">{member.sales}</div>
//                 <div className="text-right w-32">
//                   <div className="flex items-center gap-1 text-emerald-500 text-sm mb-0.5 justify-end">
//                     <TrendingUp className="w-3.5 h-3.5" />
//                     <span className="font-normal">{member.growth}%</span>
//                   </div>
//                   <div className="text-base font-normal text-gray-700">{member.revenue}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;




import { AnalyticsHeader } from "@/components/(dashboards)/cooperative-dashboard/analytics/analytics-header"
import { AnalyticsStats } from "@/components/(dashboards)/cooperative-dashboard/analytics/analytics-stats"
import { AnalyticsTabs } from "@/components/(dashboards)/cooperative-dashboard/analytics/analytics-tabs"
import { PlatformGrowthChart } from "@/components/(dashboards)/cooperative-dashboard/analytics/platform-growth-chart"
import { TopCooperatives } from "@/components/(dashboards)/cooperative-dashboard/analytics/top-cooperatives"
import { TopPerformingMembers } from "@/components/(dashboards)/cooperative-dashboard/analytics/top-performing-members"

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#f9f9f9] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <AnalyticsHeader />
        <AnalyticsStats />
        <AnalyticsTabs />

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <PlatformGrowthChart />
          <TopCooperatives />
        </div>

        <div className="mt-6">
          <TopPerformingMembers />
        </div>
      </div>
    </div>
  )
}
