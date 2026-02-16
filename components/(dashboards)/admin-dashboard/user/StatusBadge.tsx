"use client"

import { UserStatus, UserStatusColor } from "./enums";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

// Map string status to UserStatus enum
const mapToUserStatus = (status: string): UserStatus => {
  const normalized = status.toLowerCase();
  if (normalized === 'shipped' || normalized === 'active') return UserStatus.SHIPPED;
  if (normalized === 'cancelled' || normalized === 'inactive') return UserStatus.CANCELLED;
  return UserStatus.PENDING;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const userStatus = mapToUserStatus(status);

  const getStatusColor = (s: UserStatus): string => {
    switch (s) {
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

  const getStatusBgColor = (s: UserStatus): string => {
    switch (s) {
      case UserStatus.SHIPPED:
        return "bg-user-mgmt-status-shipped-bg";
      case UserStatus.PENDING:
        return "bg-user-mgmt-status-pending-bg";
      default:
        return "bg-transparent";
    }
  };

  const statusColor = getStatusColor(userStatus);

  return (
    <div className={cn("inline-flex items-center gap-1 px-2 py-1 rounded-[72px]", getStatusBgColor(userStatus), className)}>
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: statusColor }}
      />
      <span className="user-mgmt-status-text capitalize" style={{ color: statusColor }}>
        {status}
      </span>
    </div>
  );
}