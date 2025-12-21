"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileDown } from "lucide-react"

interface Payment {
  orderId: number
  paymentId: string
  deliveries: string
  amount: string
  orderDate: string
  status: "paid" | "pending"
}

const payments: Payment[] = [
  {
    orderId: 1,
    paymentId: "96003321",
    deliveries: "Marvin McKinney",
    amount: "$17.84",
    orderDate: "7 Apr, 2025",
    status: "paid",
  },
  {
    orderId: 2,
    paymentId: "96003321",
    deliveries: "Marvin McKinney",
    amount: "$17.84",
    orderDate: "7 Apr, 2025",
    status: "pending",
  },
  {
    orderId: 3,
    paymentId: "96003321",
    deliveries: "Marvin McKinney",
    amount: "$17.84",
    orderDate: "7 Apr, 2025",
    status: "pending",
  },
  {
    orderId: 4,
    paymentId: "96003321",
    deliveries: "Marvin McKinney",
    amount: "$17.84",
    orderDate: "7 Apr, 2025",
    status: "paid",
  },
  {
    orderId: 5,
    paymentId: "96003321",
    deliveries: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    orderDate: "Apr 12, 2023 | 09:24",
    status: "paid",
  },
  {
    orderId: 6,
    paymentId: "96003321",
    deliveries: "Apr 12, 2023 | 09:24AM",
    amount: "$120,000.00",
    orderDate: "Apr 12, 2023 | 09:24",
    status: "paid",
  },
]

interface PaymentsTableProps {
  onViewDetails: (paymentId: string) => void
}

export function PaymentsTable({ onViewDetails }: PaymentsTableProps) {
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
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Payment ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Deliveries</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order Date</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.orderId} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        M
                      </div>
                      <span className="font-medium">{payment.orderId}</span>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{payment.paymentId}</td>
                  <td className="p-4">{payment.deliveries}</td>
                  <td className="p-4 font-medium">{payment.amount}</td>
                  <td className="p-4 text-muted-foreground">{payment.orderDate}</td>
                  <td className="p-4">
                    {payment.status === "paid" ? (
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
                      onClick={() => onViewDetails(payment.paymentId)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 md:hidden">
          {payments.map((payment) => (
            <div key={payment.orderId} className="rounded-lg border bg-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    M
                  </div>
                  <div>
                    <p className="font-medium">Order #{payment.orderId}</p>
                    <p className="text-sm text-muted-foreground">{payment.paymentId}</p>
                  </div>
                </div>
                {payment.status === "paid" ? (
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
                  <p className="font-medium">{payment.amount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{payment.orderDate}</p>
                </div>
              </div>
              <Button
                size="sm"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => onViewDetails(payment.paymentId)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
