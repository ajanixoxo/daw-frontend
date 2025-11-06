"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function NotificationsSettings() {
  const [newMemberApps, setNewMemberApps] = useState(true)
  const [orderNotifications, setOrderNotifications] = useState(false)
  const [performanceReports, setPerformanceReports] = useState(true)
  const [systemUpdates, setSystemUpdates] = useState(true)
  const [criticalAlerts, setCriticalAlerts] = useState(true)
  const [dailySummaries, setDailySummaries] = useState(false)

  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Notification Preferences</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">New Member Applications</h3>
              <p className="text-sm text-gray-600">Get notified when someone applies to join</p>
            </div>
            <Switch checked={newMemberApps} onCheckedChange={setNewMemberApps} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Order Notifications</h3>
              <p className="text-sm text-gray-600">Receive alerts for new orders</p>
            </div>
            <Switch checked={orderNotifications} onCheckedChange={setOrderNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Performance Reports</h3>
              <p className="text-sm text-gray-600">Weekly performance summaries</p>
            </div>
            <Switch checked={performanceReports} onCheckedChange={setPerformanceReports} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">System Updates</h3>
              <p className="text-sm text-gray-600">Platform updates and maintenance notices</p>
            </div>
            <Switch checked={systemUpdates} onCheckedChange={setSystemUpdates} />
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">SMS Notifications</h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Critical Alerts</h3>
              <p className="text-sm text-gray-600">Security and urgent notifications only</p>
            </div>
            <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Daily Summaries</h3>
              <p className="text-sm text-gray-600">Daily activity summaries via SMS</p>
            </div>
            <Switch checked={dailySummaries} onCheckedChange={setDailySummaries} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Save Settings</Button>
      </div>
    </div>
  )
}
