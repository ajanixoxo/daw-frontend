"use client"

import { UserStatus, UserStatusColor } from "./enums";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: UserStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusColor = (status: UserStatus): string => {
    switch (status) {
      case UserStatus.SHIPPED:
        return UserStatusColor.SHIPPED;
      case UserStatus.CANCELLED:
        return UserStatusColor.CANCELLED;
      case UserStatus.PENDING:
        return UserStatusColor.PENDING;
      default:
        return UserStatusColor.PENDING;
    }
  };

  const getStatusBgColor = (status: UserStatus): string => {
    switch (status) {
      case UserStatus.SHIPPED:
        return "bg-user-mgmt-status-shipped-bg";
      case UserStatus.PENDING:
        return "bg-user-mgmt-status-pending-bg";
      default:
        return "bg-transparent";
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <div className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-[72px]", getStatusBgColor(status), className)}>
      <div 
        className="w-2 h-2 rounded-full" 
        style={{ backgroundColor: statusColor }}
      />
      <span className="user-mgmt-status-text" style={{ color: statusColor }}>
        {status}
      </span>
    </div>
  );
}