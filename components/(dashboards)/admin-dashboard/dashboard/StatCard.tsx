"use client"

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: ReactNode;
  className?: string;
}

export function StatCard({ icon, label, value, subtitle, className }: StatCardProps) {
  return (
    <Card className={cn("bg-stat-card-bg border-none shadow-none p-4 gap-3", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="stat-label text-stat-text-secondary">{label}</span>
      </div>
      <div className="stat-value text-stat-text-primary">{value}</div>
      {subtitle && <div className="stat-change">{subtitle}</div>}
    </Card>
  );
}