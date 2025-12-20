"use client"

import { useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Bell } from "lucide-react"

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
    <div className="space-y-8">
      {/* Order Notifications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Notifications</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">New Orders</h3>
              <p className="text-sm text-gray-500 mt-0.5">Get notified when you receive new orders</p>
            </div>
            <Switch checked={newOrders} onCheckedChange={setNewOrders} className="data-[state=checked]:bg-[#f10e7c]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Order Updates</h3>
              <p className="text-sm text-gray-500 mt-0.5">Updates on order status changes</p>
            </div>
            <Switch
              checked={orderUpdates}
              onCheckedChange={setOrderUpdates}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
        </div>
      </section>

      {/* Financial Notifications */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Financial Notifications</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Payment Received</h3>
              <p className="text-sm text-gray-500 mt-0.5">Notifications for successful payments</p>
            </div>
            <Switch
              checked={paymentReceived}
              onCheckedChange={setPaymentReceived}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Loan Updates</h3>
              <p className="text-sm text-gray-500 mt-0.5">Loan application and repayment reminders</p>
            </div>
            <Switch
              checked={loanUpdates}
              onCheckedChange={setLoanUpdates}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
        </div>
      </section>

      {/* Marketing & Updates */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Marketing & Updates</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Platform Updates</h3>
              <p className="text-sm text-gray-500 mt-0.5">New features and announcements</p>
            </div>
            <Switch
              checked={platformUpdates}
              onCheckedChange={setPlatformUpdates}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Tips & Tutorials</h3>
              <p className="text-sm text-gray-500 mt-0.5">Business tips and educational content</p>
            </div>
            <Switch
              checked={tipsTutorials}
              onCheckedChange={setTipsTutorials}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
        </div>
      </section>

      {/* Notification Channels */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Channels</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">princewillfavour17@gmail.com</p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Bell className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">SMS</h3>
                <p className="text-sm text-gray-500">+234 9032353555</p>
              </div>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
              className="data-[state=checked]:bg-[#f10e7c]"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
