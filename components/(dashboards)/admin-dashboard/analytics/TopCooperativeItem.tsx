"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import { formatCurrency, formatPercentage } from "./formatters";
import { TopCooperative } from "@/components/(dashboards)/admin-dashboard/analytics/types";

interface TopCooperativeItemProps {
  cooperative: TopCooperative;
  rank: number;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getRandomColor(name: string) {
  const colors = ["#F9F5FF", "#EFF8FF", "#FEF3F2", "#FFFAEB", "#ECFDF3", "#FDF2FA"];
  const textColors = ["#6941C6", "#175CD3", "#B42318", "#B54708", "#027A48", "#C11574"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return { bg: colors[index], text: textColors[index] };
}

export function TopCooperativeItem({ cooperative, rank }: TopCooperativeItemProps) {
  const { bg, text } = getRandomColor(cooperative.name);
  const initials = getInitials(cooperative.name);

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">
          {rank}
        </span>
        <Avatar className="h-10 w-10 flex-shrink-0" style={{ backgroundColor: cooperative.logoUrl ? 'transparent' : bg }}>
          {cooperative.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cooperative.logoUrl} alt={cooperative.name} className="h-full w-full object-cover rounded-full" />
          ) : (
            <AvatarFallback
              className="analytics-avatar-text bg-transparent"
              style={{ color: text }}
            >
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="analytics-item-name text-analytics-list-title truncate">
            {cooperative.name}
          </div>
          <div className="analytics-item-subtitle text-analytics-list-subtitle truncate">
            {/* Location not in API yet, skipping or could add if needed */}
            {cooperative.memberCount} members
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1">
          {/* Growth not in API yet, showing placeholder or removing */}
          {/* <ArrowUpIcon width={12} height={12} color="#676767" />
          <span className="analytics-stat-change text-analytics-growth-text">
            {formatPercentage(cooperative.growthPercentage)}
          </span> */}
        </div>
        {/* Revenue not in Coop API yet */}
        {/* <div className="analytics-revenue-text text-analytics-revenue-text">
          {formatCurrency(cooperative.revenue)}
        </div> */}
        <div className="analytics-revenue-text text-analytics-revenue-text text-sm">
          {/* Fallback to status or something else */}
          {cooperative.status}
        </div>
      </div>
    </div>
  );
}