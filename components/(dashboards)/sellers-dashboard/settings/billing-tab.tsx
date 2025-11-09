"use client"

import { Button } from "@/components/ui/button"
import { CreditCard, Download } from "lucide-react"

export function BillingTab() {
  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">Visa ending in 4242</h3>
                <p className="text-sm text-gray-500">Expires 12/2025</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-[#f10e7c] text-white text-xs font-medium rounded-full">Default</span>
          </div>
          <Button variant="outline" className="w-full border-gray-300 bg-transparent">
            Add Payment Method
          </Button>
        </div>
      </section>

      {/* Billing History */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Billing History</h2>
        <div className="space-y-3">
          {[
            { date: "Jan 15, 2025", amount: "$29.99", status: "Paid" },
            { date: "Dec 15, 2024", amount: "$29.99", status: "Paid" },
            { date: "Nov 15, 2024", amount: "$29.99", status: "Paid" },
          ].map((invoice, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-base font-medium text-gray-900">{invoice.date}</h3>
                <p className="text-sm text-gray-500">Premium Membership</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-base font-semibold text-gray-900">{invoice.amount}</span>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Current Subscription</h2>
        <div className="p-6 border border-gray-200 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Premium Plan</h3>
              <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
            </div>
            <span className="text-2xl font-bold text-gray-900">$29.99</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Next billing date: February 15, 2025</p>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 border-gray-300 bg-transparent">
              Change Plan
            </Button>
            <Button variant="outline" className="flex-1 border-gray-300 text-red-600 hover:text-red-700 bg-transparent">
              Cancel Subscription
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
