import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const deliveries = [
  {
    id: "LN-0333",
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
    id: "LN-0333",
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
    id: "LN-0333",
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
    id: "LN-0333",
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
    id: "LN-0333",
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "1$127",
    timeline: "3",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "completed",
  },
  {
    id: "LN-0333",
    name: "Samuel Uche",
    shipmentId: "SHP-2024-8472",
    cost: "127",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "2025-10-16",
    status: "completed",
  },
  {
    id: "LN-0333",
    name: "Samuel Uche",
    description: "Supporting",
    shipmentId: "Lagos, NG",
    cost: "127",
    timeline: "5",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
  {
    id: "LN-0333",
    name: "Samuel Uche",
    description: "Supporting",
    shipmentId: "Lagos, NG",
    cost: "127",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
  {
    id: "LN-0333",
    name: "Samuel Uche",
    description: "Supporting..",
    shipmentId: "Lagos, NG",
    cost: "127",
    timeline: "e",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
  {
    id: "LN-0333",
    name: "Samuel Uche",
    description: "Supporting",
    shipmentId: "Lagos, NG",
    cost: "127",
    timeline: "4",
    from: "Lagos, NG",
    to: "LA, USA",
    date: "LA, USA",
    status: "completed",
  },
]

export function AllDeliveriesView() {
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
              {deliveries.map((delivery, index) => (
                <tr key={index} className="hover:bg-secondary/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#e9d5ff] text-[#7c3aed] font-semibold">M</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{delivery.name}</div>
                        {delivery.description && (
                          <div className="text-sm text-muted-foreground">{delivery.description}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.shipmentId}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.cost}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.timeline}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.from}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.to}</td>
                  <td className="px-6 py-4 text-sm text-foreground">{delivery.date}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={delivery.status === "completed" ? "default" : "secondary"}
                      className={
                        delivery.status === "completed"
                          ? "bg-[#d1fae5] text-[#065f46] hover:bg-[#d1fae5]"
                          : "bg-[#fed7aa] text-[#9a3412] hover:bg-[#fed7aa]"
                      }
                    >
                      {delivery.status === "completed" ? "Completed" : "Active"}
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
        {deliveries.map((delivery, index) => (
          <div key={index} className="rounded-lg border border-border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-[#e9d5ff] text-[#7c3aed] font-semibold">M</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-foreground">{delivery.name}</div>
                  {delivery.description && <div className="text-sm text-muted-foreground">{delivery.description}</div>}
                </div>
              </div>
              <Badge
                variant={delivery.status === "completed" ? "default" : "secondary"}
                className={
                  delivery.status === "completed"
                    ? "bg-[#d1fae5] text-[#065f46] hover:bg-[#d1fae5]"
                    : "bg-[#fed7aa] text-[#9a3412] hover:bg-[#fed7aa]"
                }
              >
                {delivery.status === "completed" ? "Completed" : "Active"}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Shipment ID:</span>
                <div className="font-medium">{delivery.shipmentId}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cost:</span>
                <div className="font-medium">{delivery.cost}</div>
              </div>
              <div>
                <span className="text-muted-foreground">From:</span>
                <div className="font-medium">{delivery.from}</div>
              </div>
              <div>
                <span className="text-muted-foreground">To:</span>
                <div className="font-medium">{delivery.to}</div>
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
