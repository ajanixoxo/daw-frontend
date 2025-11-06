"use client"

import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

export default function BillingSettings() {
  return (
    <div className="space-y-8">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Billing & Subscription</h2>

        <div className="rounded-lg bg-pink-50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Premium Plan</h3>
              <p className="text-sm text-gray-600">Active until March 15, 2025</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-gray-900">$49</p>
              <p className="text-sm text-gray-600">Per month</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Payment Method</h2>

        <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-16 items-center justify-center rounded bg-gray-100">
              <CreditCard className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
          <Button variant="outline" className="px-6 bg-transparent">
            Update
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">Billing Address</h2>

        <div className="rounded-lg border border-gray-200 p-4">
          <p className="text-gray-900">123 Innovation Street</p>
          <p className="text-gray-900">Lagos, Portugal</p>
          <p className="text-gray-900">100001</p>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" className="px-6 bg-transparent">
          Download Invoice
        </Button>
        <Button className="bg-[#f10e7c] px-6 hover:bg-[#d00c6a]">Cancel Subscription</Button>
      </div>
    </div>
  )
}
