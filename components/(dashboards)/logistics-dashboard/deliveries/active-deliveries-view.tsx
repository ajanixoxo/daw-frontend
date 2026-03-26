"use client"
import { MapPin, Phone, User, Package, Navigation, PhoneCall, RefreshCw, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDeliveries, useUpdateDeliveryStatus } from "@/hooks/useLogistics"

export function ActiveDeliveriesView() {
  const { data, isLoading } = useDeliveries("in_transit");
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateDeliveryStatus();
  const activeDeliveries = data?.data || [];

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading deliveries...</div>;
  if (!activeDeliveries.length) return <div className="p-8 text-center text-muted-foreground">No active deliveries.</div>;

  return (
    <div className="space-y-4">
      {activeDeliveries.map((delivery: any, index: number) => (
        <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{delivery._id.substring(0, 8)}...</h3>
              <Badge className="bg-primary text-primary-foreground hover:bg-primary capitalize">
                {delivery.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#2ba570]">
              <div className="h-2 w-2 rounded-full bg-[#2ba570] animate-pulse" />
              Active
            </div>
          </div>

          {/* Progress Bar placeholder */}
          <div className="mb-6 space-y-2">
            <div className="text-sm text-muted-foreground">In Transit</div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-to-r from-primary to-[#ff1499]"
                style={{ width: `50%` }}
              />
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Customer Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Customer</div>
                  <div className="font-medium text-foreground">
                    {delivery.buyer_id?.firstName} {delivery.buyer_id?.lastName}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium text-foreground">{delivery.buyer_id?.phone || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Pickup</div>
                  <div className="font-medium text-foreground">{delivery.shop_id?.name || "Store"}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Dropoff</div>
                  <div className="font-medium text-foreground">{delivery.shipping_address?.street || "Destination"}</div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Product</div>
                  <div className="font-medium text-foreground">{delivery.items?.[0]?.product_id?.name || "Items"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Navigation className="h-4 w-4" />
              Get Directions
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <PhoneCall className="h-4 w-4" />
              Call Customer
            </Button>
            <Button 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
              disabled={isUpdating}
              onClick={() => updateStatus({ orderId: delivery._id, status: "delivered" })}
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Delivered
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
