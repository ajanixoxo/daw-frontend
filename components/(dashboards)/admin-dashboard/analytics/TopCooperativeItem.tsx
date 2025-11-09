"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ArrowUpIcon from "@/components/icons/ArrowUpIcon";
import type { CooperativeData } from "./schema";
import { formatCurrency, formatPercentage } from "./formatters";

interface TopCooperativeItemProps {
  cooperative: CooperativeData;
}

export function TopCooperativeItem({ cooperative }: TopCooperativeItemProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        <span className="analytics-rank-text text-analytics-rank-text flex-shrink-0">
          {cooperative.rank}
        </span>
        <Avatar className="h-10 w-10 flex-shrink-0" style={{ backgroundColor: cooperative.avatarColor }}>
          <AvatarFallback
            className="analytics-avatar-text bg-transparent"
            style={{ color: cooperative.avatarColor }}
          >
            {cooperative.avatar}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="analytics-item-name text-analytics-list-title truncate">
            {cooperative.name}
          </div>
          <div className="analytics-item-subtitle text-analytics-list-subtitle truncate">
            {cooperative.location} . {cooperative.members} members
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1">
          <ArrowUpIcon width={12} height={12} color="#676767" />
          <span className="analytics-stat-change text-analytics-growth-text">
            {formatPercentage(cooperative.growthPercentage)}
          </span>
        </div>
        <div className="analytics-revenue-text text-analytics-revenue-text">
          {formatCurrency(cooperative.revenue)}
        </div>
      </div>
    </div>
  );
}