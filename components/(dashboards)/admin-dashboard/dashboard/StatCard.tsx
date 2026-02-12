"use client"

import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtitle?: ReactNode;
  className?: string;
}

export function StatCard({ icon, label, value, subtitle }: StatCardProps) {
  return (
    <div className="bg-white border border-[#F0F2F5] flex flex-col justify-between h-[120px] w-full p-4 transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0 bg-[#E6007A]/[0.07]">
          {icon}
        </div>
        <span className="text-[13px] font-medium text-[#667185] tracking-tight">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[26px] font-bold text-[#101828] leading-none tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <div className="text-[10px] font-medium">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
