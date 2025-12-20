import { CheckCircle, AlertCircle, UserCircle } from "lucide-react"

export default function ApplyForLoanTab() {
  const eligibilityCriteria = [
    {
      icon: UserCircle,
      title: "Active Cooperative Member",
      description: "Member for 6+ months",
      status: "passed" as const,
    },
    {
      icon: CheckCircle,
      title: "Minimum Contribution",
      description: "$35,000 contributed (Silver tier)",
      status: "passed" as const,
    },
    {
      icon: CheckCircle,
      title: "No Active Default",
      description: "Clean repayment history",
      status: "passed" as const,
    },
    {
      icon: AlertCircle,
      title: "Business Registration",
      description: "CAC registration recommended",
      status: "advisory" as const,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Loan Eligibility Assessment */}
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-[#f10e7c] p-2">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Loan Eligibility Assessment</h2>
            <p className="text-gray-600">Based on your profile and contribution history</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Eligibility Score */}
          <div className="rounded-xl bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <div className="text-5xl font-bold text-[#f10e7c]">85%</div>
              <p className="text-gray-600">ELIGIBILITY SCORE</p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div className="h-full w-[85%] rounded-full bg-[#f10e7c]"></div>
            </div>
          </div>

          {/* Maximum Loan */}
          <div className="flex items-center justify-center rounded-xl bg-pink-50 p-8 shadow-sm">
            <div className="text-center">
              <div className="text-5xl font-bold">$75.00</div>
              <p className="text-gray-600">MAXIMUM LOAN</p>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Criteria */}
      <div>
        <h3 className="mb-6 text-xl font-bold">Eligibility Criteria</h3>
        <div className="space-y-4">
          {eligibilityCriteria.map((criteria, index) => (
            <div key={index} className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-3">
                  <criteria.icon className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{criteria.title}</h4>
                  <p className="text-sm text-gray-600">{criteria.description}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${
                  criteria.status === "passed" ? "bg-pink-50 text-[#f10e7c]" : "bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${criteria.status === "passed" ? "bg-[#f10e7c]" : "bg-gray-600"}`}
                ></span>
                {criteria.status === "passed" ? "Passed" : "Advisory"}
              </span>
            </div>
          ))}

          {/* Improve Your Profile */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-4">
              <div className="rounded-full bg-gray-100 p-3">
                <AlertCircle className="h-6 w-6 text-gray-600" />
              </div>
              <h4 className="font-semibold">Improve Your Profile</h4>
            </div>
            <ul className="ml-16 space-y-2 text-sm text-gray-600">
              <li>• Complete business registration to access higher loan amounts</li>
              <li>• Increase contributions to unlock Gold tier benefits</li>
              <li>• Maintain consistent repayment history</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
