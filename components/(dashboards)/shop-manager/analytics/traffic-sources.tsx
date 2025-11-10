import { FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const trafficData = [
  { source: "Direct", percentage: "41%", count: "1,234" },
  { source: "Direct", percentage: "41%", count: "1,234" },
  { source: "Direct", percentage: "41%", count: "1,234" },
  { source: "Direct", percentage: "41%", count: "1,234" },
  { source: "Direct", percentage: "41%", count: "1,234" },
]

export default function TrafficSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-semibold">
          <FileText className="h-5 w-5" />
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trafficData.map((item, index) => (
            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
              <span className="text-sm text-muted-foreground">{item.source}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{item.percentage}</span>
                <span className="text-base font-semibold">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
