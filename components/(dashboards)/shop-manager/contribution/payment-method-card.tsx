"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

export function PaymentMethodCard() {
  const [selectedMethod, setSelectedMethod] = useState("")

  return (
    <div className="bg-white rounded-xl p-6 md:p-8 border border-[#e4e7ec] space-y-6">
      <h3 className="text-lg font-semibold text-[#0f0f0f]">Payment Method</h3>

      <div className="space-y-4">
        <div className="relative">
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full appearance-none px-4 py-3 border border-[#e4e7ec] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f10e7c] focus:border-transparent text-[#667185] bg-white cursor-pointer"
          >
            <option value="">Select payment method</option>
            <option value="mobile-money">Mobile Money</option>
            <option value="card">Card</option>
            <option value="bank-transfer">Bank Transfer</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#667185] pointer-events-none" />
        </div>

        <button className="w-full py-3 bg-[#f10e7c] text-white rounded-lg font-medium hover:bg-[#d00c6a] transition-colors">
          Proceed to Payment
        </button>
      </div>
    </div>
  )
}
