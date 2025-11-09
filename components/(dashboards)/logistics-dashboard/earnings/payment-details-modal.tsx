"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PaymentDetailsModalProps {
  paymentId: string | null
  onClose: () => void
}

export function PaymentDetailsModal({ paymentId, onClose }: PaymentDetailsModalProps) {
  if (!paymentId) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-in fade-in-0" onClick={onClose} />

      {/* Modal */}
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200">
        <div className="mx-4 rounded-xl border bg-card shadow-lg">
          {/* Header */}
          <div className="relative border-b bg-muted/30 p-6 md:p-8">
            <div className="space-y-1.5">
              <h2 className="text-3xl font-bold tracking-tight">Payment Details</h2>
              <p className="text-muted-foreground">Detailed breakdown for payment PAY001</p>
            </div>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground md:right-6 md:top-6"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Content */}
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6 md:p-8">
            <div className="space-y-6">
              {/* Payment Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Payment ID</span>
                  <span className="text-xl font-semibold">PAY001</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Payment Date</span>
                  <span className="text-xl font-semibold">1/15/2025</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className="border-success/20 bg-success/10 text-success hover:bg-success/10">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-success" />
                    Paid
                  </Badge>
                </div>
              </div>

              {/* Delivery Summary */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Delivery Summary</h3>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Total Deliveries</span>
                  <span className="text-xl font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Average per Delivery</span>
                  <span className="text-xl font-semibold">₦1,489</span>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Gross Earnings</span>
                  <span className="text-xl font-semibold">₦67,000</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-muted-foreground">Platform Fee (10%)</span>
                  <span className="text-xl font-semibold text-destructive">-₦6,700</span>
                </div>
              </div>

              {/* Net Payment */}
              <div className="flex items-center justify-between py-4">
                <span className="text-2xl font-bold">Net Payment</span>
                <span className="text-2xl font-bold">₦60,300</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t p-6 md:flex-row md:p-8">
            <Button
              size="lg"
              className="flex-1 bg-[#f10e7c] text-primary-foreground hover:bg-primary/90 text-base font-semibold"
            >
              Download Invoice
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onClose}
              className="flex-1 text-base font-semibold bg-transparent"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
