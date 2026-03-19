import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


import { useDeliveries } from "@/hooks/useLogistics"

export function AllDeliveriesView() {
  const { data, isLoading } = useDeliveries("all");
  const deliveries = data?.data || [];

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading deliveries...</div>;
  if (!deliveries.length) return <div className="p-8 text-center text-muted-foreground">No deliveries found.</div>;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Table for larger screens */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Shipment ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Timeline</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">From</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">To</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deliveries.map((delivery: any, index: number) => (
                <tr key={index} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#e9d5ff] text-[#7c3aed] font-semibold">
                          {(delivery.buyer_id?.firstName?.[0] || "U").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">
                          {delivery.buyer_id?.firstName} {delivery.buyer_id?.lastName}
                        </div>
                        {delivery.items?.[0] && (
                          <div className="text-sm text-muted-foreground">
                            {delivery.items[0].product_id?.name || "Product"}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery._id.substring(0, 8)}...</td>
                  <td className="px-6 py-4 text-sm text-foreground">₦{delivery.total_amount?.toLocaleString() || "0"}</td>
                  <td className="px-6 py-4 text-sm text-foreground">-</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.shop_id?.name || "Store"}</td>
                  <td className="px-6 py-4 text-sm text-foreground truncate max-w-[150px]">
                    {delivery.shipping_address?.street || "Destination"}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {new Date(delivery.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={delivery.status === "delivered" ? "default" : "secondary"}
                      className={
                        delivery.status === "delivered"
                          ? "bg-[#d1fae5] text-[#065f46] hover:bg-[#d1fae5]"
                          : "bg-[#fed7aa] text-[#9a3412] hover:bg-[#fed7aa]"
                      }
                    >
                      <span className="capitalize">{delivery.status.replace("_", " ")}</span>
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card layout for mobile screens */}
      <div className="md:hidden space-y-4 p-4">
        {deliveries.map((delivery: any, index: number) => (
          <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#e9d5ff] text-[#7c3aed] font-semibold">
                    {(delivery.buyer_id?.firstName?.[0] || "U").toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">
                    {delivery.buyer_id?.firstName} {delivery.buyer_id?.lastName}
                  </div>
                  {delivery.items?.[0] && (
                    <div className="text-sm text-muted-foreground">
                      {delivery.items[0].product_id?.name || "Product"}
                    </div>
                  )}
                </div>
              </div>
              <Badge
                variant={delivery.status === "delivered" ? "default" : "secondary"}
                className={
                  delivery.status === "delivered"
                    ? "bg-[#d1fae5] text-[#065f46] hover:bg-[#d1fae5]"
                    : "bg-[#fed7aa] text-[#9a3412] hover:bg-[#fed7aa]"
                }
              >
                <span className="capitalize">{delivery.status.replace("_", " ")}</span>
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Shipment ID:</span>
                <div className="font-medium">{delivery._id.substring(0, 8)}...</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <div className="font-medium">₦{delivery.total_amount?.toLocaleString() || "0"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">From:</span>
                <div className="font-medium">{delivery.shop_id?.name || "Store"}</div>
              </div>
              <div>
                <span className="text-muted-foreground">To:</span>
                <div className="font-medium truncate">{delivery.shipping_address?.street || "Destination"}</div>
              </div>
            </div>
            <Button size="sm" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
