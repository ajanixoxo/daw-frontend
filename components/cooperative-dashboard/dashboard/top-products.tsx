import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, TrendingUp } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
  {
    id: 2,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
  {
    id: 3,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
  {
    id: 4,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
  {
    id: 5,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
  {
    id: 6,
    name: "Turtleneck v-neck",
    category: "Lagos Artisan Network",
    price: "$125,000",
    change: "10%",
    image: "/african-woman-portrait.png",
  },
]

export function TopProducts() {
  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1d1d2a]">
          <Package className="h-5 w-5" />
          Top Product
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#838794]">{product.id}</span>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1d1d2a] truncate">{product.name}</p>
                <p className="text-xs text-[#838794] truncate">{product.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#1d1d2a]">{product.price}</span>
                <div className="flex items-center gap-1 text-xs text-[#009a49]">
                  <TrendingUp className="h-3 w-3" />
                  <span>{product.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="link" className="mt-4 w-full text-[#1d1d2a]">
          View All Activity
        </Button>
      </CardContent>
    </Card>
  )
}
