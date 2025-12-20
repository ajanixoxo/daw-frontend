import Link from "next/link"
import { MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShopCardProps {
  shop: {
    id: string
    name: string
    url: string
    products: number
    orders: number
    revenue: number
    status: "active" | "inactive"
  }
}

export function ShopCard({ shop }: ShopCardProps) {
  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#1c1c1c]">{shop.name}</h3>
          <p className="mt-1 text-sm text-[#667185]">{shop.url}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full bg-[#e7f6ec] px-3 py-1">
            <div className="h-2 w-2 rounded-full bg-[#009a49]" />
            <span className="text-sm font-medium text-[#009a49]">Active</span>
          </div>
          <button className="rounded-lg p-1 hover:bg-[#f5f5f5]">
            <MoreVertical className="h-5 w-5 text-[#667185]" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-[#1c1c1c]">{shop.products}</div>
          <div className="mt-1 text-sm text-[#667185]">Products</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#1c1c1c]">{shop.orders}</div>
          <div className="mt-1 text-sm text-[#667185]">Orders</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-[#1c1c1c]">₦{shop.revenue.toLocaleString()}</div>
          <div className="mt-1 text-sm text-[#667185]">Total Revenue</div>
        </div>
      </div>

      {/* Manage Button */}
      <Link href={`/shop-manager/shop/${shop.id}`}>
        <Button variant="outline" className="w-full border-[#e4e7ec] hover:bg-[#f9f9f9] bg-transparent">
          Manage
        </Button>
      </Link>
    </div>
  )
}
