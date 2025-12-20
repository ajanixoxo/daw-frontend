"use client"

import { useState } from "react"
import { Check } from "lucide-react"

type TierType = "regular" | "tier1" | "tier2" | "tier3"
type CurrencyType = "usd" | "ngn"

interface PlanFeature {
  text: string
}

interface Plan {
  name: string
  description: string
  priceUSD: number
  priceNGN: number
  features: PlanFeature[]
  isPopular?: boolean
}

const tierPlans: Record<TierType, Plan[]> = {
  regular: [
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 5,
      priceNGN: 5000,
      features: [
        { text: "Community forum access" },
        { text: "Basic support" },
        { text: "Digital marketplace browsing" },
      ],
    },
    {
      name: "Standard",
      description: "Enhanced access with moderate benefits",
      priceUSD: 25,
      priceNGN: 25000,
      isPopular: true,
      features: [
        { text: "5% transaction fee discount" },
        { text: "Access to standard masterclasses" },
        { text: "Priority support" },
        { text: "All Basic features" },
        { text: "Up to 10 product listing" },
      ],
    },
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 60,
      priceNGN: 60000,
      features: [
        { text: "Preferred loan consideration" },
        { text: "15% transaction fee discount" },
        { text: "Access to all masterclasses" },
        { text: "Dedicated agent support" },
        { text: "All Standard features" },
        { text: "Unlimited product listings" },
      ],
    },
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 120,
      priceNGN: 120000,
      features: [
        { text: "Featured store placement" },
        { text: "25% transaction fee discount" },
        { text: "All Premium features" },
        { text: "Business growth consulting" },
        { text: "Export assistance" },
      ],
    },
  ],
  tier1: [
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 10,
      priceNGN: 10000,
      features: [
        { text: "Community forum access" },
        { text: "Basic support" },
        { text: "Digital marketplace browsing" },
      ],
    },
    {
      name: "Standard",
      description: "Enhanced access with moderate benefits",
      priceUSD: 50,
      priceNGN: 50000,
      isPopular: true,
      features: [
        { text: "5% transaction fee discount" },
        { text: "Access to standard masterclasses" },
        { text: "Priority support" },
        { text: "All Basic features" },
        { text: "Up to 10 product listing" },
      ],
    },
    {
      name: "Premium",
      description: "Full access with premium benefits",
      priceUSD: 100,
      priceNGN: 100000,
      features: [
        { text: "Preferred loan consideration" },
        { text: "15% transaction fee discount" },
        { text: "Access to all masterclasses" },
        { text: "Dedicated agent support" },
        { text: "All Standard features" },
        { text: "Unlimited product listings" },
      ],
    },
    {
      name: "Enterprise",
      description: "Complete solution for large businesses",
      priceUSD: 200,
      priceNGN: 200000,
      features: [
        { text: "Featured store placement" },
        { text: "25% transaction fee discount" },
        { text: "All Premium features" },
        { text: "Business growth consulting" },
        { text: "Export assistance" },
      ],
    },
  ],
  tier2: [
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 15,
      priceNGN: 15000,
      features: [
        { text: "Community forum access" },
        { text: "Basic support" },
        { text: "Digital marketplace browsing" },
      ],
    },
    {
      name: "Standard",
      description: "Enhanced access with moderate benefits",
      priceUSD: 75,
      priceNGN: 75000,
      isPopular: true,
      features: [
        { text: "5% transaction fee discount" },
        { text: "Access to standard masterclasses" },
        { text: "Priority support" },
        { text: "All Basic features" },
        { text: "Up to 10 product listing" },
      ],
    },
    {
      name: "Premium",
      description: "Full access with premium benefits",
      priceUSD: 150,
      priceNGN: 150000,
      features: [
        { text: "Preferred loan consideration" },
        { text: "15% transaction fee discount" },
        { text: "Access to all masterclasses" },
        { text: "Dedicated agent support" },
        { text: "All Standard features" },
        { text: "Unlimited product listings" },
      ],
    },
    {
      name: "Enterprise",
      description: "Complete solution for large businesses",
      priceUSD: 300,
      priceNGN: 300000,
      features: [
        { text: "Featured store placement" },
        { text: "25% transaction fee discount" },
        { text: "All Premium features" },
        { text: "Business growth consulting" },
        { text: "Export assistance" },
      ],
    },
  ],
  tier3: [
    {
      name: "Basic",
      description: "Community access with basic features",
      priceUSD: 20,
      priceNGN: 20000,
      features: [
        { text: "Community forum access" },
        { text: "Basic support" },
        { text: "Digital marketplace browsing" },
      ],
    },
    {
      name: "Standard",
      description: "Enhanced access with moderate benefits",
      priceUSD: 100,
      priceNGN: 100000,
      isPopular: true,
      features: [
        { text: "5% transaction fee discount" },
        { text: "Access to standard masterclasses" },
        { text: "Priority support" },
        { text: "All Basic features" },
        { text: "Up to 10 product listing" },
      ],
    },
    {
      name: "Premium",
      description: "Full access with premium benefits",
      priceUSD: 200,
      priceNGN: 200000,
      features: [
        { text: "Preferred loan consideration" },
        { text: "15% transaction fee discount" },
        { text: "Access to all masterclasses" },
        { text: "Dedicated agent support" },
        { text: "All Standard features" },
        { text: "Unlimited product listings" },
      ],
    },
    {
      name: "Enterprise",
      description: "Complete solution for large businesses",
      priceUSD: 400,
      priceNGN: 400000,
      features: [
        { text: "Featured store placement" },
        { text: "25% transaction fee discount" },
        { text: "All Premium features" },
        { text: "Business growth consulting" },
        { text: "Export assistance" },
      ],
    },
  ],
}

const tierLabels: { key: TierType; label: string }[] = [
  { key: "regular", label: "Regular" },
  { key: "tier1", label: "Tier 1" },
  { key: "tier2", label: "Tier 2" },
  { key: "tier3", label: "Tier 3" },
]

export function MembershipPricing() {
  const [selectedTier, setSelectedTier] = useState<TierType>("regular")
  const [currency, setCurrency] = useState<CurrencyType>("ngn")

  const plans = tierPlans[selectedTier]

  const formatPrice = (priceUSD: number, priceNGN: number) => {
    if (currency === "usd") {
      return `$${priceUSD.toFixed(2)}`
    }
    return `₦${priceNGN.toLocaleString()}`
  }

  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-[#222222] mb-4">
            Choose Your Membership Tier
          </h2>
          <p className="text-[#6b6b6b] text-base md:text-lg max-w-xl leading-relaxed">
            Select a membership tier that fits your business needs and budget.
            <br />
            Upgrade anytime as your business grows.
          </p>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          {/* Tier Tabs */}
          <div className="flex items-center gap-0">
            {tierLabels.map((tier, index) => (
              <button
                key={tier.key}
                onClick={() => setSelectedTier(tier.key)}
                className={`px-5 md:px-6 py-2.5 text-sm font-medium transition-all ${
                  selectedTier === tier.key
                    ? "bg-[#222222] text-white rounded-full"
                    : "bg-white text-[#222222] border border-[#d2d2d2] hover:border-[#222222]"
                } ${
                  selectedTier !== tier.key && index === 0
                    ? "rounded-l-full border-r-0"
                    : selectedTier !== tier.key && index === tierLabels.length - 1
                      ? "rounded-r-full border-l-0"
                      : selectedTier !== tier.key
                        ? "border-x-0"
                        : ""
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-3">
            <span className={`text-sm ${currency === "usd" ? "text-[#222222] font-medium" : "text-[#999999]"}`}>
              International ($)
            </span>
            <button
              onClick={() => setCurrency(currency === "usd" ? "ngn" : "usd")}
              className="relative w-14 h-7 rounded-full bg-[#e0e0e0] transition-colors"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-[#222222] transition-all duration-200 ${
                  currency === "ngn" ? "left-8" : "left-1"
                }`}
              />
            </button>
            <span className={`text-sm ${currency === "ngn" ? "text-[#222222] font-medium" : "text-[#999999]"}`}>
              Nigerian (₦)
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {plans.map((plan, index) => (
            <div key={index} className="bg-white rounded-2xl border border-[#e8e8e8] overflow-hidden flex flex-col">
              {/* Inner Card - contains plan details and button */}
              <div className={`p-5 rounded-xl m-2 ${plan.isPopular ? "bg-[#f10e7c]" : "bg-[#f5f5f5]"}`}>
                {/* Plan Header */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-lg font-semibold ${plan.isPopular ? "text-white" : "text-[#222222]"}`}>
                      {plan.name}
                    </h3>
                    {plan.isPopular && (
                      <span className="bg-[#d4e157] text-[#644d01] text-[10px] font-bold px-2 py-0.5 rounded">
                        POPULAR
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.isPopular ? "text-white/90" : "text-[#6b6b6b]"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <span className={`text-4xl font-bold ${plan.isPopular ? "text-white" : "text-[#222222]"}`}>
                    {formatPrice(plan.priceUSD, plan.priceNGN)}
                  </span>
                  <span className={`text-sm ml-1 ${plan.isPopular ? "text-white/80" : "text-[#6b6b6b]"}`}>/month</span>
                </div>

                {/* Select Button */}
                <button
                  className={`w-full py-3 rounded-full font-medium text-sm transition-all ${
                    plan.isPopular
                      ? "bg-white text-[#f10e7c] hover:bg-white/90"
                      : "bg-white text-[#222222] border border-[#e0e0e0] hover:border-[#222222]"
                  }`}
                >
                  Select
                </button>
              </div>

              {/* Features - Outside inner card, on white background */}
              <div className="px-4 pb-6 pt-4 flex-1">
                <p className="text-[#f10e7c] text-xs font-bold tracking-wide mb-4">PLAN INCLUDES:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#e8f5e9] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-[#2ba570]" strokeWidth={3} />
                      </span>
                      <span className="text-sm text-[#444444] leading-relaxed">{feature.text}</span>
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
