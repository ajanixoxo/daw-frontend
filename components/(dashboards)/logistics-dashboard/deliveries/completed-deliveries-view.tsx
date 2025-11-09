import { MapPin, Phone, User, Package, Navigation, PhoneCall } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const completedDeliveries = [
  {
    id: "LN-0333",
    status: "Completed",
    earned: "₦3900",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
  },
  {
    id: "LN-0333",
    status: "Completed",
    earned: "₦3900",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
  },
  {
    id: "LN-0333",
    status: "Completed",
    earned: "₦3900",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
  },
]

export function CompletedDeliveriesView() {
  return (
    <div className="space-y-4">
      {completedDeliveries.map((delivery, index) => (
        <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{delivery.id}</h3>
              <Badge className="bg-[#2ba570] text-white hover:bg-[#2ba570]">{delivery.status}</Badge>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Earned</div>
              <div className="text-xl font-bold text-foreground">{delivery.earned}</div>
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
                  <div className="font-medium text-foreground">{delivery.customer}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="font-medium text-foreground">{delivery.phone}</div>
                </div>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Pickup</div>
                  <div className="font-medium text-foreground">{delivery.pickup}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Dropoff</div>
                  <div className="font-medium text-foreground">{delivery.dropoff}</div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Package className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm text-muted-foreground">Product</div>
                  <div className="font-medium text-foreground">{delivery.product}</div>
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
          </div>
        </div>
      ))}
    </div>
  )
}
