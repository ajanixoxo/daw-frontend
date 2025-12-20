import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const shipments = [
  {
    id: 1,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$127",
    timeline: "3 Days",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "active",
  },
  {
    id: 2,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$127",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "active",
  },
  {
    id: 3,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$127",
    timeline: "3",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "active",
  },
  {
    id: 4,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$127",
    timeline: "2",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "active",
  },
  {
    id: 5,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$127",
    timeline: "3",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "completed",
  },
  {
    id: 6,
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "$27",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "completed",
  },
  {
    id: 7,
    name: "Samuel Uche",
    subtitle: "Supporting",
    shipmentId: "Lagos, NG",
    cost: "$27",
    timeline: "5",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
  {
    id: 8,
    name: "Samuel Uche",
    subtitle: "Supporting",
    shipmentId: "Lagos, NG",
    cost: "$27",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
]

export function RecentsTable() {
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
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 bg-[#f5ebff] text-[#973bfe] font-semibold">
                          <AvatarFallback className="bg-[#f5ebff] text-[#973bfe]">M</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{shipment.name}</span>
                          {shipment.subtitle && (
                            <span className="text-xs text-muted-foreground">{shipment.subtitle}</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground">{shipment.shipmentId}</TableCell>
                    <TableCell className="text-foreground">{shipment.cost}</TableCell>
                    <TableCell className="text-foreground">{shipment.timeline}</TableCell>
                    <TableCell className="text-foreground">{shipment.from}</TableCell>
                    <TableCell className="text-foreground">{shipment.to}</TableCell>
                    <TableCell className="text-foreground">{shipment.date}</TableCell>
                    <TableCell>
                      {shipment.status === "active" ? (
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
                      <Button className="bg-[#f10e7c] text-white hover:bg-[#f10e7c]/90">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
