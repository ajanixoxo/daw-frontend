export function LoanSettings() {
  return (
    <div>
      <h2 className="mb-6 text-xl font-semibold text-[#222222]">Pending Applications</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Interest Rates Card */}
        <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
          <h3 className="mb-2 text-lg font-semibold text-[#222222]">Interest Rates</h3>
          <p className="mb-6 text-sm text-[#838794]">Configure loan interest rates by tier</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Basic Tier (0-6 months)</span>
              <span className="text-sm font-medium text-[#676767]">12% per annum</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Standard Tier (6+ months)</span>
              <span className="text-sm font-medium text-[#676767]">10% per annum</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Premium Tier (12+ months)</span>
              <span className="text-sm font-medium text-[#676767]">8% per annum</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-[#f0f2f5] py-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#e4e7ec]">
            Update Rates
          </button>
        </div>

        {/* Loan Limits Card */}
        <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
          <h3 className="mb-2 text-lg font-semibold text-[#222222]">Loan Limits</h3>
          <p className="mb-6 text-sm text-[#838794]">Maximum loan amounts by membership tier</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Basic Members</span>
              <span className="text-sm font-medium text-[#676767]">$5,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Standard Members</span>
              <span className="text-sm font-medium text-[#676767]">$10,000</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Premium Members</span>
              <span className="text-sm font-medium text-[#676767]">$15,000</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-[#f0f2f5] py-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#e4e7ec]">
            Update Limits
          </button>
        </div>

        {/* Requirements Card */}
        <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
          <h3 className="mb-2 text-lg font-semibold text-[#222222]">Requirements</h3>
          <p className="mb-6 text-sm text-[#838794]">Loan application requirements</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Minimum Guarantors</span>
              <span className="text-sm font-medium text-[#676767]">2 members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Membership Duration</span>
              <span className="text-sm font-medium text-[#676767]">3 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Contribution History</span>
              <span className="text-sm font-medium text-[#676767]">90% compliance</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-[#f0f2f5] py-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#e4e7ec]">
            Update Rates
          </button>
        </div>

        {/* Repayment Terms Card */}
        <div className="rounded-xl border border-[#e4e7ec] bg-white p-6">
          <h3 className="mb-2 text-lg font-semibold text-[#222222]">Repayment Terms</h3>
          <p className="mb-6 text-sm text-[#838794]">Configure loan repayment options</p>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Standard Period</span>
              <span className="text-sm font-medium text-[#676767]">12 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Extended Period</span>
              <span className="text-sm font-medium text-[#676767]">24 months</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#222222]">Grace Period</span>
              <span className="text-sm font-medium text-[#676767]">7 days</span>
            </div>
          </div>

          <button className="mt-6 w-full rounded-lg bg-[#f0f2f5] py-3 text-sm font-medium text-[#222222] transition-colors hover:bg-[#e4e7ec]">
            Update Terms
          </button>
        </div>
      </div>
    </div>
  )
}
