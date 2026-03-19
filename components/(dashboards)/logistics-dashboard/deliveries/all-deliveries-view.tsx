import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDeliveries, useUpdateDeliveryStatus } from "@/hooks/useLogistics"
import { toast } from "sonner"

export function AllDeliveriesView() {
  const { data, isLoading } = useDeliveries("all");
  const { mutate: updateStatus, isPending: isUpdating } = useUpdateDeliveryStatus();
  const [selectedDelivery, setSelectedDelivery] = useState<any | null>(null);

  const deliveries = data?.data || [];

  const handleUpdateStatus = (newStatus: "in_transit" | "delivered") => {
    if (!selectedDelivery) return;
    updateStatus(
      { orderId: selectedDelivery._id, status: newStatus },
      {
        onSuccess: () => {
          toast.success("Delivery status updated successfully");
          // Update local state temporarily for immediate UI feedback in the dialog
          setSelectedDelivery({ ...selectedDelivery, status: newStatus });
        },
        onError: (err: any) => {
          toast.error(err.message || "Failed to update delivery status");
        }
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading deliveries...</div>;
  if (!deliveries.length) return <div className="p-8 text-center text-muted-foreground">No deliveries found.</div>;

  return (
    <>
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
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => setSelectedDelivery(delivery)}
                    >
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
            <Button 
              size="sm" 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setSelectedDelivery(delivery)}
            >
              View Details
            </Button>
          </div>
        ))}
      </div>
    </div>

    {/* Delivery Details Dialog */}
    <Dialog open={!!selectedDelivery} onOpenChange={(open) => !open && setSelectedDelivery(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delivery Details</DialogTitle>
        </DialogHeader>
        {selectedDelivery && (
          <div className="space-y-6 mt-4">
            {/* Customer Details */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-[#e9d5ff] text-[#7c3aed] text-lg font-semibold">
                  {(selectedDelivery.buyer_id?.firstName?.[0] || "U").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium text-foreground text-lg">
                  {selectedDelivery.buyer_id?.firstName} {selectedDelivery.buyer_id?.lastName}
                </h4>
                <p className="text-sm text-muted-foreground">{selectedDelivery.buyer_id?.phone || "No phone provided"}</p>
                <p className="text-sm text-muted-foreground">{selectedDelivery.buyer_id?.email || "No email provided"}</p>
              </div>
            </div>

            {/* Shipment Information */}
            <div className="rounded-lg border bg-secondary/20 p-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Shipment ID</span>
                  <span className="font-medium">{selectedDelivery._id}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Date Created</span>
                  <span className="font-medium">{new Date(selectedDelivery.createdAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Total Order Value</span>
                  <span className="font-medium">₦{selectedDelivery.total_amount?.toLocaleString() || "0"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Delivery Cost</span>
                  <span className="font-medium">₦{selectedDelivery.delivery_fee?.toLocaleString() || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Logistics Route */}
            <div className="space-y-4">
              <div className="relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {/* Origin */}
                <div className="relative mb-6">
                  <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <h5 className="font-medium text-sm text-foreground mb-1">Pickup From</h5>
                  <p className="text-sm text-muted-foreground font-medium">{selectedDelivery.shop_id?.name || "Vendor Store"}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{selectedDelivery.shop_id?.business_address || "Store Address Not Provided"}</p>
                </div>
                {/* Destination */}
                <div className="relative">
                  <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <h5 className="font-medium text-sm text-foreground mb-1">Deliver To</h5>
                  <p className="text-sm text-muted-foreground max-w-xs">{selectedDelivery.shipping_address?.street || "No destination address"}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {selectedDelivery.shipping_address?.city}{selectedDelivery.shipping_address?.city && ","} {selectedDelivery.shipping_address?.state}{selectedDelivery.shipping_address?.state && ","} {selectedDelivery.shipping_address?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            {selectedDelivery.items && selectedDelivery.items.length > 0 && (
              <div className="space-y-2">
                <h5 className="font-medium text-sm">Items in Order</h5>
                <ul className="text-sm space-y-1 text-muted-foreground list-disc list-inside">
                  {selectedDelivery.items.map((item: any, i: number) => (
                    <li key={i}>{item.quantity}x {item.product_id?.name || "Product"}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Status Update */}
            <div className="pt-4 border-t border-border space-y-3">
              <h5 className="font-medium text-sm">Update Delivery Status</h5>
              <Select 
                value={selectedDelivery.status} 
                onValueChange={(val: "in_transit" | "delivered") => handleUpdateStatus(val)}
                disabled={isUpdating}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending" disabled>Pending</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
    </>
  )
}
