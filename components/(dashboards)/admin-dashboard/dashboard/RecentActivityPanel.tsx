"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { ActivityItem as ActivityItemType } from "./schema";
import { ActivityItem } from "./ActivityItem";
import Link from "next/link";
interface RecentActivityPanelProps {
  activities: ActivityItemType[];
}

export function RecentActivityPanel({ activities }: RecentActivityPanelProps) {
  return (
    <Card className="rounded-xl shadow-[0px_2px_4px_rgba(29,40,58,0.06),0px_4px_6px_rgba(29,40,58,0.10)] border-none p-6 gap-4.5" style={{ background: "linear-gradient(145.52deg, #ffffff 0%, #f9fafb 100%)" }}>
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-activity-text-primary" />
        <h2 className="activity-title text-activity-text-primary">Recent Activity</h2>
      </div>
      
      <div className="flex flex-col gap-4.5">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      <Link href="/admin/wallet">
      <Button 
        variant="outline" 
        className="w-full view-all-button text-activity-text-primary hover:bg-activity-text-primary/5 mt-2"
      >
        View All Activity
      </Button>
      </Link>
    </Card>
  );
}