import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

import { useDeliveries } from "@/hooks/useLogistics"

export function RecentActivities() {
  const { data, isLoading } = useDeliveries("all");
  const activities = data?.data?.slice(0, 5) || [];

  return (
    <Card className="border-border bg-card shadow-sm h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-foreground" />
          <CardTitle className="text-xl font-semibold">Recent Activities</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-4 flex-1">
          {isLoading ? (
             <div className="text-sm text-center text-muted-foreground py-4">Loading activities...</div>
          ) : activities.length === 0 ? (
             <div className="text-sm text-center text-muted-foreground py-4">No recent activities</div>
          ) : (
            activities.map((activity: any) => (
              <div key={activity._id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                <div className="flex-shrink-0 mt-1">
                  <div className="h-10 w-10 rounded-lg bg-[#ffedf6] flex items-center justify-center">
                    <Package className="h-5 w-5 text-[#f10e7c]" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    New Delivery Request from {activity.shop_id?.name || "Vendor"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    To: {activity.shipping_address?.city || activity.shipping_address?.street || "Customer Location"}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <Badge className="bg-[#ff8d28] text-white hover:bg-[#ff8d28]/90 text-xs capitalize">
                    {activity.status.replace("_", " ")}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
