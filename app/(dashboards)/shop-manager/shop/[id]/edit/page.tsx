import { ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StoreInfoForm } from "@/components/(dashboards)/shop-manager/shop/store-info-form"
import { StoreBranding } from "@/components/(dashboards)/shop-manager/shop/store-branding"
import { StoreStatus } from "@/components/(dashboards)/shop-manager/shop/store-status"
import { ProfilePhotoSection } from "@/components/(dashboards)/shop-manager/shop/profile-photo-section"

export default function EditShopPage({
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
            <Link href={`/shop/${params.id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-[#1c1c1c] md:text-3xl">Faye's Complex</h1>
              <p className="mt-1 text-sm text-[#667185]">Manage your store settings and information</p>
            </div>
          </div>
          <Button className="bg-[#1c1c1c] text-white hover:bg-[#292d32]">
            <Share2 className="mr-2 h-4 w-4" />
            Share Store
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr,400px]">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Store Information */}
            <StoreInfoForm />

            {/* Store Branding */}
            <StoreBranding />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Store Status */}
            <StoreStatus />

            {/* Profile Photo */}
            <ProfilePhotoSection shopId={params.id} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <Link href={`/shop/${params.id}`}>
            <Button variant="outline" className="min-w-24 bg-transparent">
              Cancel
            </Button>
          </Link>
          <Button className="min-w-32 bg-[#f10e7c] text-white hover:bg-[#d00c68]">Save Changes</Button>
        </div>
      </div>
    </div>
  )
}
