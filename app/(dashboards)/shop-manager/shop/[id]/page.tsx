import { ArrowLeft, Edit, Heart, Share2, Star, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShopOrderStats } from "@/components/(dashboards)/shop-manager/shop/shop-order-stats"
import { ShopOrdersTable } from "@/components/(dashboards)/shop-manager/shop/shop-orders-table"
import { ShopTabs } from "@/components/(dashboards)/shop-manager/shop/shop-tabs"

export default function ShopDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Header */}
      <div className="border-b border-[#e4e7ec] bg-white px-4 py-4 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/shop">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1c1c1c] md:text-3xl">Faye&apos;s Complex Orders</h1>
              <p className="mt-1 text-sm text-[#667185]">Track and manage customer orders</p>
            </div>
          </div>
          <Link href={`/shop-manager/shop/${params.id}/edit`}>
            <Button className="bg-[#1c1c1c] text-white hover:bg-[#292d32]">
              <Edit className="mr-2 h-4 w-4" />
              Edit Shop
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden md:h-64">

        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Digital_African_Women-z1BmsUYjV92g31E8hHTTY6ZKtS2GR7.png"
          alt="Shop interior"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {/* Shop Profile Card */}
        <div className="mb-8 flex flex-col gap-6 rounded-xl border border-[#e4e7ec] bg-white p-6 md:flex-row md:items-center">
          <div className="h-32 w-32 shrink-0 rounded-2xl bg-[#f10e7c]" />
          <div className="flex-1">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#1c1c1c]">Faye&apos;s Complex</h2>
                <p className="mt-1 text-[#667185]">Quality African fashion and accessories</p>
              </div>
              <span className="rounded-full bg-[#fccfe5] px-3 py-1 text-sm font-medium text-[#f10e7c]">Verified</span>
            </div>
            <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-[#667185]">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-[#eec200] text-[#eec200]" />
                <span className="font-medium text-[#1c1c1c]">4.6</span>
                <span>/5.0</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Member since Jan 2020</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="rounded bg-[#fccfe5] p-1">
                  <div className="h-4 w-4" />
                </div>
                <span className="font-medium text-[#1c1c1c]">2000</span>
                <span className="text-[#667185]">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded bg-[#fccfe5] p-1">
                  <div className="h-4 w-4" />
                </div>
                <span className="font-medium text-[#1c1c1c]">45</span>
                <span className="text-[#667185]">Products</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 md:flex-col">
            <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <ShopTabs />

        {/* Order Stats */}
        <ShopOrderStats />

        {/* Orders Table */}
        <ShopOrdersTable />
      </div>
    </div>
  )
}
