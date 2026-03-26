"use client"
import { MapPin, User, Package, Navigation, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDeliveries, useUpdateDeliveryStatus } from "@/hooks/useLogistics"
import { toast } from "sonner"

export function NewDeliveriesView() {
  const { data, isLoading } = useDeliveries("processing"); // Backend: 'processing' = new paid orders
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateDeliveryStatus();
  const newDeliveries = data?.data || [];

  const handlePickup = (orderId: string) => {
    updateStatus(
      { orderId, status: "in_transit" },
      {
        onSuccess: () => {
          toast.success("Delivery picked up successfully. It is now in transit.");
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to pickup delivery");
        }
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading new orders...</div>;
  if (!newDeliveries.length) return <div className="p-8 text-center text-muted-foreground">No new orders found.</div>;

  return (
    <div className="space-y-4">
      {newDeliveries.map((delivery: any, index: number) => (
        <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{delivery._id.substring(0, 8)}...</h3>
              <Badge className="bg-[#fb923c] text-white hover:bg-[#fb923c] capitalize">
                New Order
              </Badge>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              Ready for Pickup
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
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Pickup Location</div>
                  <div className="font-medium text-foreground">{delivery.shop_id?.name || "Vendor Store"}</div>
                  <div className="text-xs text-muted-foreground">{delivery.shop_id?.business_address}</div>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Items</div>
                  <div className="font-medium text-foreground">{delivery.items?.length || 0} items</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Navigation className="h-4 w-4" />
              View Map
            </Button>
            <Button 
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 ml-auto"
              disabled={isUpdating}
              onClick={() => handlePickup(delivery._id)}
            >
              <CheckCircle2 className="h-4 w-4" />
              Pickup Delivery
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
