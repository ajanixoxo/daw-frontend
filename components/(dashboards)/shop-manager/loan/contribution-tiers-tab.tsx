import { Check } from "lucide-react"

export default function ContributionTiersTab() {
  const tiers = [
    {
      name: "Basic",
      description: "Community access with basic features",
      price: 5.0,
      isCurrent: false,
      features: ["Community forum access", "Basic support", "Digital marketplace browsing"],
    },
    {
      name: "Standard",
      description: "Enhanced access with moderate benefits",
      price: 25.0,
      isCurrent: true,
      features: [
        "5% transaction fee discount",
        "Access to standard masterclasses",
        "Priority support",
        "All Basic features",
        "Up to 10 product listing",
      ],
    },
    {
      name: "Basic",
      description: "Community access with basic features",
      price: 60.0,
      isCurrent: false,
      features: [
        "Preferred loan consideration",
        "15% transaction fee discount",
        "Access to all masterclasses",
        "Dedicated agent support",
        "All Standard features",
        "Unlimited product listings",
      ],
    },
    {
      name: "Basic",
      description: "Community access with basic features",
      price: 120.0,
      isCurrent: false,
      features: [
        "Featured store placement",
        "25% transaction fee discount",
        "All Premium features",
        "Business growth consulting",
        "Export assistance",
      ],
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={`relative rounded-xl p-6 shadow-md ${
            tier.isCurrent ? "bg-[#f10e7c] text-white" : "bg-white text-gray-900"
          }`}
        >
          {tier.isCurrent && (
            <div className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-gray-900">
              CURRENT
            </div>
          )}

          <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
          <p className={`mb-6 text-sm ${tier.isCurrent ? "text-white/90" : "text-gray-600"}`}>{tier.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-bold">${tier.price.toFixed(2)}</span>
            <span className={`ml-1 text-sm ${tier.isCurrent ? "text-white/80" : "text-gray-600"}`}>/month</span>
          </div>

          <button
            className={`mb-6 w-full rounded-lg py-3 font-medium transition-colors ${
              tier.isCurrent
                ? "bg-white/20 text-white hover:bg-white/30"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
          >
            {tier.isCurrent ? "Select" : index > 1 ? "Upgrade" : "Select"}
          </button>

          <div>
            <h4 className={`mb-3 text-sm font-bold ${tier.isCurrent ? "text-white" : "text-[#f10e7c]"}`}>
              PLAN INCLUDES:
            </h4>
            <ul className="space-y-2">
              {tier.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <Check
                    className={`mt-0.5 h-5 w-5 flex-shrink-0 ${tier.isCurrent ? "text-white" : "text-green-600"}`}
                  />
                  <span className={`text-sm ${tier.isCurrent ? "text-white" : "text-gray-700"}`}>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
