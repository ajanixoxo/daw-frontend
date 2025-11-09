"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function AdvancedSettings() {
  const [dataExport, setDataExport] = useState(true)
  const [analyticsTracking, setAnalyticsTracking] = useState(true)
  const [apiAccess, setApiAccess] = useState(false)
  const [webhookUrl, setWebhookUrl] = useState("https://your-webapi-url.com")

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Data & Privacy</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Data Export</h3>
              <p className="text-sm text-gray-600">Allow members to export their data</p>
            </div>
            <Switch checked={dataExport} onCheckedChange={setDataExport} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Analytics Tracking</h3>
              <p className="text-sm text-gray-600">Enable detailed analytics collection</p>
            </div>
            <Switch checked={analyticsTracking} onCheckedChange={setAnalyticsTracking} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">API & Integrations</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">API Access</h3>
              <p className="text-sm text-gray-600">Limit access to specific IP addresses</p>
            </div>
            <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-900">Webhook URL</label>
            <Input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} className="w-full" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Save Setting</Button>
      </div>
    </div>
  )
}
