import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { useDeliveries } from "@/hooks/useLogistics"

export function RecentsTable() {
  const { data, isLoading } = useDeliveries("all");
  const shipments = data?.data?.slice(0, 8) || [];

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-semibold uppercase text-muted-foreground tracking-wide">RECENTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Shipment ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Cost</TableHead>
                  <TableHead className="font-semibold text-foreground">Timeline</TableHead>
                  <TableHead className="font-semibold text-foreground">From</TableHead>
                  <TableHead className="font-semibold text-foreground">To</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="text-right font-semibold text-foreground"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Loading recent shipments...
                    </TableCell>
                  </TableRow>
                ) : shipments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No recent shipments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  shipments.map((shipment: any) => (
                    <TableRow key={shipment._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 bg-[#f5ebff] text-[#973bfe] font-semibold">
                            <AvatarFallback className="bg-[#f5ebff] text-[#973bfe]">
                              {(shipment.buyer_id?.firstName?.[0] || 'U').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">
                              {shipment.buyer_id?.firstName} {shipment.buyer_id?.lastName}
                            </span>
                            {shipment.items?.[0] && (
                              <span className="text-xs text-muted-foreground line-clamp-1 max-w-[120px]">
                                {shipment.items[0].product_id?.name || "Product"}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-foreground">{shipment._id.substring(0, 8)}</TableCell>
                      <TableCell className="text-foreground">₦{shipment.total_amount?.toLocaleString() || "0"}</TableCell>
                      <TableCell className="text-foreground">-</TableCell>
                      <TableCell className="text-foreground">{shipment.shop_id?.name || "Store"}</TableCell>
                      <TableCell className="text-foreground truncate max-w-[120px]">
                        {shipment.shipping_address?.street || "Destination"}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {shipment.status === "in_transit" || shipment.status === "pending" || shipment.status === "processing" ? (
                          <Badge className="bg-[#ff8d28] text-white hover:bg-[#ff8d28]/90 flex items-center gap-1.5 w-fit">
                            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-[#009a49] text-white hover:bg-[#009a49]/90 flex items-center gap-1.5 w-fit">
                            <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
                            Completed
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {/* We use Next.js Link or router instead of View Details dialogue here for simplicity, or just leave it since the deliveries tab handles details */}
                        <Button className="bg-[#f10e7c] text-white hover:bg-[#f10e7c]/90">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
