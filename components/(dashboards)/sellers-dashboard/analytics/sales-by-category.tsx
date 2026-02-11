"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, Package } from "lucide-react"
import { IProduct } from "@/types/product.types"

// Palette for the pie slices
const COLORS = ["#f10e7c", "#f76eb0", "#973bfe", "#07dbfa", "#000000", "#FDB022", "#12B76A"]

interface SalesByCategoryProps {
  products: IProduct[]
}

export function SalesByCategory({ products }: SalesByCategoryProps) {
  // Group products by category and count
  const chartData = useMemo(() => {
    const categoryMap: Record<string, number> = {}
    products.forEach((p) => {
      const cat = p.category || "Uncategorized"
      categoryMap[cat] = (categoryMap[cat] || 0) + 1
    })

    return Object.entries(categoryMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7) // max 7 slices
      .map(([name, value], i) => ({
        name,
        value,
        color: COLORS[i % COLORS.length],
      }))
  }, [products])

  // Empty state
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="h-5 w-5" />
            Products by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[250px] text-center">
            <Package className="w-10 h-10 text-[#98A2B3] mb-3" />
            <p className="text-sm text-muted-foreground">No products yet</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <FileText className="h-5 w-5" />
          Products by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <ChartContainer
            config={{
              value: {
                label: "Products",
              },
            }}
            className="h-[250px] w-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="flex flex-col gap-3">
            {chartData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">
                  {item.name} ({item.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
