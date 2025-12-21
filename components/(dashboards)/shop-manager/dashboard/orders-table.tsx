"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

const ordersData = [
  {
    orderId: 1,
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    orderId: 2,
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Cancelled",
  },
  {
    orderId: 3,
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Pending",
  },
  {
    orderId: 4,
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "7 Apr, 2025",
    store: "Faye's Complex",
    item: "Turtleneck",
    amount: "$17.84",
    status: "Shipped",
  },
  {
    orderId: 5,
    orderItemId: "96003321",
    userName: "Marvin McKinney",
    orderDate: "Apr 12, 2023 | 09:24AM",
    store: "Faye's Complex",
    item: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    status: "Label",
  },
]

export function OrdersTable() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order Item ID</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">User Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Order Date</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Store</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Item</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.map((order) => (
                <tr key={order.orderId} className="border-b border-border transition-colors hover:bg-muted/50">
                  <td className="px-4 py-4 text-sm text-foreground">{order.orderId}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{order.orderItemId}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{order.userName}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{order.orderDate}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{order.store}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{order.item}</td>
                  <td className="px-4 py-4 text-sm font-medium text-foreground">{order.amount}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "Shipped"
                          ? "bg-success/10 text-success"
                          : order.status === "Pending"
                            ? "bg-warning/10 text-warning"
                            : order.status === "Cancelled"
                              ? "bg-destructive/10 text-destructive"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {ordersData.map((order) => (
            <div key={order.orderId} className="rounded-lg border border-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Order #{order.orderId}</span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    order.status === "Shipped"
                      ? "bg-success/10 text-success"
                      : order.status === "Pending"
                        ? "bg-warning/10 text-warning"
                        : order.status === "Cancelled"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Order ID</div>
                  <div className="font-medium text-foreground">{order.orderItemId}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Amount</div>
                  <div className="font-medium text-foreground">{order.amount}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Customer</div>
                  <div className="text-foreground">{order.userName}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Date</div>
                  <div className="text-foreground">{order.orderDate}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-muted-foreground">Store / Item</div>
                  <div className="text-foreground">
                    {order.store} - {order.item}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
