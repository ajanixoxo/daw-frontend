import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

const sources = [
  { name: "Direct", percentage: "41%", count: "1,234" },
  { name: "Direct", percentage: "41%", count: "1,234" },
  { name: "Direct", percentage: "41%", count: "1,234" },
  { name: "Direct", percentage: "41%", count: "1,234" },
  { name: "Direct", percentage: "41%", count: "1,234" },
]

export function TrafficSources() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <BarChart3 className="h-5 w-5" />
          Traffic Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sources.map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
            >
              <span className="text-sm text-foreground">{source.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">{source.percentage}</span>
                <span className="text-sm font-semibold text-foreground">{source.count}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
