import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function StoreInfoForm() {
  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold text-[#1c1c1c]">Store Information</h2>

      <div className="space-y-6">
        {/* Store Name and URL */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="storeName" className="text-sm font-medium text-[#1c1c1c]">
              Store Name
            </Label>
            <Input id="storeName" defaultValue="Faye's Complex" className="border-[#e4e7ec]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeUrl" className="text-sm font-medium text-[#1c1c1c]">
              Store URL
            </Label>
            <div className="flex">
              <div className="flex items-center rounded-l-md border border-r-0 border-[#e4e7ec] bg-[#f9f9f9] px-3 text-sm text-[#667185]">
                daw.app/
              </div>
              <Input id="storeUrl" defaultValue="fayes-complex" className="rounded-l-none border-[#e4e7ec]" />
            </div>
          </div>
        </div>

        {/* Store Description */}
        <div className="space-y-2">
          <Label htmlFor="storeDescription" className="text-sm font-medium text-[#1c1c1c]">
            Store Description
          </Label>
          <Textarea
            id="storeDescription"
            defaultValue="Authentic African handcrafted items including clothings, jewelry, and home décor. Empowering women artisans across Nigeria."
            className="min-h-24 resize-none border-[#e4e7ec]"
          />
        </div>

        {/* Phone and Email */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-sm font-medium text-[#1c1c1c]">
              Phone Number
            </Label>
            <Input id="phoneNumber" type="tel" defaultValue="+234 90322353555" className="border-[#e4e7ec]" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-[#1c1c1c]">
              Email
            </Label>
            <Input id="email" type="email" defaultValue="princewillfavour17@gmail.com" className="border-[#e4e7ec]" />
          </div>
        </div>
      </div>
    </div>
  )
}
