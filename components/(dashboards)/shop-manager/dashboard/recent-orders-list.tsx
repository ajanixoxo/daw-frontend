import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const recentOrders = [
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Shipped", amount: "$17.84" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Pending", amount: "$17.84" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Cancelled", amount: "$17.84" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Shipped", amount: "$17.84" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Pending", amount: "$17.84" },
  { id: "#321", name: "Turtle Neck", customer: "Marvin McKinney", status: "Cancelled", amount: "$17.84" },
]

export function RecentOrdersList() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-none pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3 overflow-auto">
        {recentOrders.map((order, idx) => (
          <div key={idx} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
            <div className="flex gap-3">
              <div className="text-sm font-medium text-muted-foreground">{order.id}</div>
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-foreground">{order.name}</div>
                <div className="text-xs text-muted-foreground">{order.customer}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                  order.status === "Shipped"
                    ? "bg-success/10 text-success"
                    : order.status === "Pending"
                      ? "bg-warning/10 text-warning"
                      : "bg-destructive/10 text-destructive"
                }`}
              >
                {order.status}
              </span>
              <div className="text-sm font-semibold text-foreground">{order.amount}</div>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full text-primary hover:bg-primary/5 hover:text-primary bg-transparent">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
