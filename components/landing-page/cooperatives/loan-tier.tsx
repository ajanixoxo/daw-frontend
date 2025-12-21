"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const loanTiers = {
  "Tier 1": [
    {
      name: "Tier 1",
      description: "Community access with basic features",
      priceUSD: 15.0,
      priceNGN: 12000,
      isPopular: false,
      features: [
        "All shopper permissions",
        "Join existing cooperatives",
        "Access to member dashboard",
        "View contributions",
        "2% discount on marketplace purchases",
        "Access to select free masterclasses",
      ],
    },
    {
      name: "Tier 2",
      description: "Enhanced access with moderate benefits",
      priceUSD: 25.0,
      priceNGN: 20000,
      isPopular: true,
      features: [
        "All Tier 1 member permissions",
        "5% discount on marketplace purchases",
        "Access to more free masterclasses",
        "Priority customer support",
      ],
    },
    {
      name: "Tier 3",
      description: "Enhanced access with premium features",
      priceUSD: 15.0,
      priceNGN: 12000,
      isPopular: false,
      features: [
        "All Tier 2 member permissions",
        "7.5% discount on marketplace purchases",
        "All masterclasses free or heavily discounted",
        "Business consultation access",
        "Featured shop placement (if seller)",
        "Access to select free masterclasses",
      ],
    },
  ],
  "Tier 2": [
    {
      name: "Tier 1",
      description: "Community access with basic features",
      priceUSD: 25.0,
      priceNGN: 20000,
      isPopular: false,
      features: [
        "All shopper permissions",
        "Join existing cooperatives",
        "Access to member dashboard",
        "View contributions",
        "3% discount on marketplace purchases",
        "Access to select free masterclasses",
      ],
    },
    {
      name: "Tier 2",
      description: "Enhanced access with moderate benefits",
      priceUSD: 45.0,
      priceNGN: 36000,
      isPopular: true,
      features: [
        "All Tier 1 member permissions",
        "7% discount on marketplace purchases",
        "Access to more free masterclasses",
        "Priority customer support",
      ],
    },
    {
      name: "Tier 3",
      description: "Enhanced access with premium features",
      priceUSD: 75.0,
      priceNGN: 60000,
      isPopular: false,
      features: [
        "All Tier 2 member permissions",
        "10% discount on marketplace purchases",
        "All masterclasses free or heavily discounted",
        "Business consultation access",
        "Featured shop placement (if seller)",
        "Access to select free masterclasses",
      ],
    },
  ],
  "Tier 3": [
    {
      name: "Tier 1",
      description: "Community access with basic features",
      priceUSD: 50.0,
      priceNGN: 40000,
      isPopular: false,
      features: [
        "All shopper permissions",
        "Join existing cooperatives",
        "Access to member dashboard",
        "View contributions",
        "5% discount on marketplace purchases",
        "Access to select free masterclasses",
      ],
    },
    {
      name: "Tier 2",
      description: "Enhanced access with moderate benefits",
      priceUSD: 85.0,
      priceNGN: 68000,
      isPopular: true,
      features: [
        "All Tier 1 member permissions",
        "10% discount on marketplace purchases",
        "Access to more free masterclasses",
        "Priority customer support",
      ],
    },
    {
      name: "Tier 3",
      description: "Enhanced access with premium features",
      priceUSD: 150.0,
      priceNGN: 120000,
      isPopular: false,
      features: [
        "All Tier 2 member permissions",
        "15% discount on marketplace purchases",
        "All masterclasses free or heavily discounted",
        "Business consultation access",
        "Featured shop placement (if seller)",
        "Access to select free masterclasses",
      ],
    },
  ],
}

const tierTabs = ["Tier 1", "Tier 2", "Tier 3"] as const

export function LoanTierPricing() {
  const [activeTier, setActiveTier] = useState<keyof typeof loanTiers>("Tier 1")
  const [currency, setCurrency] = useState<"USD" | "NGN">("NGN")

  const currentPlans = loanTiers[activeTier]

  return (
    <section className="py-16 md:py-24 bg-[#f5f5f5]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="mb-10">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#222222] mb-4">
            Choose Your Loan Tier
          </h2>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl">
            Choose from our flexible loan options designed to meet every stage of your entrepreneurial journey.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-10">
          {/* Tier Tabs */}
          <div className="flex items-center gap-0">
            {tierTabs.map((tier) => (
              <button
                key={tier}
                onClick={() => setActiveTier(tier)}
                className={`px-6 py-2.5 text-sm font-medium rounded-full transition-colors ${
                  activeTier === tier
                    ? "bg-[#222222] text-white"
                    : "bg-white text-[#222222] border border-[#e0e0e0] hover:bg-gray-50"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-3">
            <span className={`text-sm ${currency === "USD" ? "text-[#222222]" : "text-[#999999]"}`}>
              International ($)
            </span>
            <button
              onClick={() => setCurrency(currency === "USD" ? "NGN" : "USD")}
              className="relative w-14 h-7 bg-[#e0e0e0] rounded-full transition-colors"
            >
              <span
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${
                  currency === "NGN" ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${currency === "NGN" ? "text-[#222222]" : "text-[#999999]"}`}>
              Nigerian (₦)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentPlans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden">
              {/* Inner Card */}
              <div className={`m-2 rounded-xl p-6 ${plan.isPopular ? "bg-[#f10e7c]" : "bg-[#f5f5f5]"}`}>
                {/* Plan Name & Badge */}
                <div className="flex items-center gap-3 mb-2">
                  <h3 className={`text-lg font-semibold ${plan.isPopular ? "text-white" : "text-[#222222]"}`}>
                    {plan.name}
                  </h3>
                  {plan.isPopular && (
                    <span className="px-2.5 py-0.5 bg-[#d4e157] text-[#222222] text-xs font-semibold rounded-full uppercase">
                      Popular
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className={`text-sm mb-6 ${plan.isPopular ? "text-white/90" : "text-[#666666]"}`}>
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.isPopular ? "text-white" : "text-[#222222]"}`}>
                    {currency === "USD" ? `$${plan.priceUSD.toFixed(2)}` : `₦${plan.priceNGN.toLocaleString()}`}
                  </span>
                  <span className={`text-sm ml-1 ${plan.isPopular ? "text-white/80" : "text-[#666666]"}`}>/month</span>
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-3 rounded-full font-medium transition-colors ${
                    plan.isPopular
                      ? "bg-white text-[#f10e7c] hover:bg-gray-100"
                      : "bg-white text-[#222222] border border-[#e0e0e0] hover:bg-gray-50"
                  }`}
                >
                  Select
                </button>
              </div>

              {/* Features */}
              <div className="p-6 pt-4">
                <p className="text-xs font-semibold text-[#f10e7c] uppercase tracking-wide mb-4">Plan Includes:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#e8f5e9] flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-[#4caf50]" />
                      </span>
                      <span className="text-sm text-[#444444]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
