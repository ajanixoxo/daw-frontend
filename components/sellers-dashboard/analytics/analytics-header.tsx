import { Calendar, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AnalyticsHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">Analytics</h1>
        <p className="text-sm text-muted-foreground lg:text-base">
          Comprehensive insights into platform performance and user activity
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Calendar className="h-4 w-4" />
          <span>Last 30 days</span>
        </Button>
        <Button className="gap-2 bg-[#00000a] text-white hover:bg-[#00000a]/90">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </Button>
      </div>
    </div>
  )
}
