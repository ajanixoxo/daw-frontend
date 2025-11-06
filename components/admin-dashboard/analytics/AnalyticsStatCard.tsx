"use client"

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: ReactNode;
  className?: string;
}

export function AnalyticsStatCard({ icon, label, value, subtitle, className }: AnalyticsStatCardProps) {
  return (
    <Card className={cn("bg-analytics-bg border-none shadow-none p-4 flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="analytics-stat-label text-analytics-stat-text">{label}</span>
      </div>
      <div className="analytics-stat-value text-analytics-header-text">{value}</div>
      {subtitle && <div className="analytics-stat-change">{subtitle}</div>}
    </Card>
  );
}