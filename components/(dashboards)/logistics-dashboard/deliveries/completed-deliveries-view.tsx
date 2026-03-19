"use client"
import { MapPin, Phone, User, Package, Navigation, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDeliveries } from "@/hooks/useLogistics"

export function CompletedDeliveriesView() {
  const { data, isLoading } = useDeliveries("delivered");
  const completedDeliveries = data?.data || [];

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading deliveries...</div>;
  if (!completedDeliveries.length) return <div className="p-8 text-center text-muted-foreground">No completed deliveries.</div>;

  return (
    <div className="space-y-4">
      {completedDeliveries.map((delivery: any, index: number) => (
        <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{delivery._id.substring(0, 8)}...</h3>
              <Badge className="bg-[#2ba570] text-white hover:bg-[#2ba570] capitalize">
                {delivery.status.replace("_", " ")}
              </Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Earned</div>
              <div className="text-xl font-bold text-foreground">
                ₦{((delivery.total_amount || 0) * 0.1).toLocaleString()}
              </div>
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
        </div>
      ))}
    </div>
  )
}
