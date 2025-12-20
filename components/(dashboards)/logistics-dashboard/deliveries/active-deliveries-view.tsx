import { MapPin, Phone, User, Package, Navigation, PhoneCall, RefreshCw, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const activeDeliveries = [
  {
    id: "LN-0333",
    status: "In transit",
    progress: 40,
    progressText: "Picked Up from Store",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
    isActive: true,
  },
  {
    id: "LN-0333",
    status: "In transit",
    progress: 40,
    progressText: "Picked Up from Store",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
    isActive: true,
  },
  {
    id: "LN-0333",
    status: "In transit",
    progress: 40,
    progressText: "Picked Up from Store",
    customer: "Sarah Johnson",
    phone: "+234 801 234 5678",
    pickup: "Tech Store, 123 Digital Ave",
    dropoff: "456 Consumer St, Ikeja",
    product: "Electronics Package",
    isActive: true,
  },
]

export function ActiveDeliveriesView() {
  return (
    <div className="space-y-4">
      {activeDeliveries.map((delivery, index) => (
        <div key={index} className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-foreground">{delivery.id}</h3>
              <Badge className="bg-primary text-primary-foreground hover:bg-primary">{delivery.status}</Badge>
            </div>
            {delivery.isActive && (
              <div className="flex items-center gap-2 text-sm text-[#2ba570]">
                <div className="h-2 w-2 rounded-full bg-[#2ba570] animate-pulse" />
                Active
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-6 space-y-2">
            <div className="text-sm text-muted-foreground">{delivery.progressText}</div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full bg-gradient-to-r from-primary to-[#ff1499]"
                style={{ width: `${delivery.progress}%` }}
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
            <Button variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Update Status
            </Button>
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 ml-auto">
              <CheckCircle2 className="h-4 w-4" />
              Complete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
