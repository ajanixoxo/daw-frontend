import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Package } from "lucide-react"

const activities = [
  {
    id: 1,
    title: "New Delivery Request from Lagos Women",
    subtitle: "View details",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 2,
    title: "New Delivery Request from Lagos Women",
    subtitle: "View details",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 3,
    title: "New Delivery Request from Lagos Women",
    subtitle: "View details",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 4,
    title: "New Delivery Request from Lagos Women",
    subtitle: "View details",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    id: 5,
    title: "New Delivery Request from Lagos Women",
    subtitle: "View details",
    time: "2 hours ago",
    status: "Pending",
  },
]

export function RecentActivities() {
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
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-lg bg-[#ffedf6] flex items-center justify-center">
                  <Package className="h-5 w-5 text-[#f10e7c]" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">{activity.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{activity.subtitle}</p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-1">
                <Badge className="bg-[#ff8d28] text-white hover:bg-[#ff8d28]/90 text-xs">{activity.status}</Badge>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-transparent">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
