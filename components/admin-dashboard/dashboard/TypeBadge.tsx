"use client"

import { ApprovalType, ApprovalTypeColors } from "./enums";
import { cn } from "@/lib/utils";

interface TypeBadgeProps {
  type: ApprovalType;
  className?: string;
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  const color = ApprovalTypeColors[type];
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: color }}
      />
      <span className="badge-text" style={{ color }}>
        {type}
      </span>
    </div>
  );
}