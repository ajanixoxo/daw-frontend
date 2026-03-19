"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileDown } from "lucide-react"

import { useDeliveries } from "@/hooks/useLogistics"

interface PaymentsTableProps {
  onViewDetails: (paymentId: string) => void
}

export function PaymentsTable({ onViewDetails }: PaymentsTableProps) {
  const { data, isLoading } = useDeliveries("all");
  const deliveries = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Payments History</CardTitle>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <FileDown className="h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Earnings</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      Loading payment history...
                    </td>
                  </tr>
              ) : deliveries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      No payment history found.
                    </td>
                  </tr>
              ) : (
                deliveries.map((delivery: any) => (
                  <tr key={delivery._id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                          {(delivery.buyer_id?.firstName?.[0] || 'U').toUpperCase()}
                        </div>
                        <span className="font-medium">{delivery._id.substring(0, 8)}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">
                      {delivery.buyer_id?.firstName} {delivery.buyer_id?.lastName}
                    </td>
                    <td className="p-4 font-medium">₦{delivery.delivery_fee?.toLocaleString() || "0"}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(delivery.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      {delivery.status === "delivered" ? (
                        <Badge
                          variant="outline"
                          className="border-success/20 bg-success/10 text-success hover:bg-success/10"
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                          Paid
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-warning/20 bg-warning/10 text-warning hover:bg-warning/10"
                        >
                          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
                          Pending
                        </Badge>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => onViewDetails && onViewDetails(delivery._id)}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {isLoading ? (
             <div className="text-center py-4 text-muted-foreground">Loading payment history...</div>
          ) : deliveries.length === 0 ? (
             <div className="text-center py-4 text-muted-foreground">No payment history found.</div>
          ) : (
            deliveries.map((delivery: any) => (
              <div key={delivery._id} className="rounded-lg border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {(delivery.buyer_id?.firstName?.[0] || 'U').toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">Order #{delivery._id.substring(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">{delivery.buyer_id?.firstName} {delivery.buyer_id?.lastName}</p>
                    </div>
                  </div>
                  {delivery.status === "delivered" ? (
                    <Badge variant="outline" className="border-success/20 bg-success/10 text-success">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                      Paid
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning/20 bg-warning/10 text-warning">
                      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
                      Pending
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Amount</p>
                    <p className="font-medium">₦{delivery.delivery_fee?.toLocaleString() || "0"}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(delivery.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => onViewDetails && onViewDetails(delivery._id)}
                >
                  View Details
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
