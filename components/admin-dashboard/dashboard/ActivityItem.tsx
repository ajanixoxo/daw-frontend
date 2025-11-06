"use client"

import type { ActivityItem as ActivityItemType } from "./schema";
import { formatTimeAgo } from "./formatters";
import CardsPinkIcon from "@/components/icons/CardsPinkIcon";

interface ActivityItemProps {
  activity: ActivityItemType;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <div className="flex items-start gap-2 flex-1">
        <CardsPinkIcon width={13} height={12} color="#f10e7c" className="mt-0.5 flex-shrink-0" />
        <p className="activity-description text-activity-text-primary flex-1">
          {activity.description}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-activity-status-pending" />
          <span className="badge-text text-activity-status-pending">{activity.status}</span>
        </div>
        <span className="activity-time text-activity-text-secondary whitespace-nowrap">
          {formatTimeAgo(activity.timestamp)}
        </span>
      </div>
    </div>
  );
}