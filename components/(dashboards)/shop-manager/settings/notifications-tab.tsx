"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Mail, Smartphone } from "lucide-react"

export function NotificationsTab() {
  const [newOrders, setNewOrders] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(false)
  const [paymentReceived, setPaymentReceived] = useState(true)
  const [loanUpdates, setLoanUpdates] = useState(false)
  const [platformUpdates, setPlatformUpdates] = useState(true)
  const [tipsTutorials, setTipsTutorials] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  return (
    <div className="space-y-12">
      {/* Order Notifications */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Order Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">New Orders</div>
              <div className="text-sm text-muted-foreground">Get notified when you receive new orders</div>
            </div>
            <Switch checked={newOrders} onCheckedChange={setNewOrders} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Order Updates</div>
              <div className="text-sm text-muted-foreground">Updates on order status changes</div>
            </div>
            <Switch checked={orderUpdates} onCheckedChange={setOrderUpdates} />
          </div>
        </div>
      </div>

      {/* Financial Notifications */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Financial Notifications</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Payment Received</div>
              <div className="text-sm text-muted-foreground">Notifications for successful payments</div>
            </div>
            <Switch checked={paymentReceived} onCheckedChange={setPaymentReceived} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Loan Updates</div>
              <div className="text-sm text-muted-foreground">Loan application and repayment reminders</div>
            </div>
            <Switch checked={loanUpdates} onCheckedChange={setLoanUpdates} />
          </div>
        </div>
      </div>

      {/* Marketing & Updates */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Marketing & Updates</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Platform Updates</div>
              <div className="text-sm text-muted-foreground">New features and announcements</div>
            </div>
            <Switch checked={platformUpdates} onCheckedChange={setPlatformUpdates} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Tips & Tutorials</div>
              <div className="text-sm text-muted-foreground">Business tips and educational content</div>
            </div>
            <Switch checked={tipsTutorials} onCheckedChange={setTipsTutorials} />
          </div>
        </div>
      </div>

      {/* Communication Channels */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Communication Channels</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-muted-foreground">princewillfavour17@gmail.com</div>
              </div>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-2">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <div className="font-medium">SMS</div>
                <div className="text-sm text-muted-foreground">+234 90322353555</div>
              </div>
            </div>
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>
        </div>
      </div>
    </div>
  )
}
