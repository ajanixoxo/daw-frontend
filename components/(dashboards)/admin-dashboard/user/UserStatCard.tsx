"use client"

import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UserStatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: ReactNode;
  className?: string;
}

export function UserStatCard({ icon, label, value, subtitle, className }: UserStatCardProps) {
  return (
    <Card className={cn("bg-user-mgmt-bg border-none shadow-none p-4 flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="user-mgmt-stat-label text-user-mgmt-stat-text">{label}</span>
      </div>
      <div className="user-mgmt-stat-value text-user-mgmt-header-text">{value}</div>
      {subtitle && <div className="user-mgmt-stat-change">{subtitle}</div>}
    </Card>
  );
}