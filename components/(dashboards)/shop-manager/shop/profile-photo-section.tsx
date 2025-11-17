"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, ExternalLink, Palette } from "lucide-react"
import { useState } from "react"

export function ProfilePhotoSection() {
  const [copied, setCopied] = useState(false)
  const storeUrl = `https://daw.app/fayes-complex`

  const handleCopy = () => {
    navigator.clipboard.writeText(storeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold text-[#1c1c1c]">Profile Photo</h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#667185]">Store URL</Label>
          <div className="flex gap-2">
            <Input value={storeUrl} readOnly className="border-[#e4e7ec] bg-[#f9f9f9]" />
            <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0 bg-transparent">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          {copied && <p className="text-xs text-green-600">Copied to clipboard!</p>}
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={() => window.open(storeUrl, "_blank")}>
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            <Palette className="mr-2 h-4 w-4" />
            Customize
          </Button>
        </div>
      </div>
    </div>
  )
}
