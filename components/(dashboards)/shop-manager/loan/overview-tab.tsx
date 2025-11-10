export default function OverviewTab() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Current Loan Status */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Current Loan Status</h2>
            <p className="text-gray-600">Loan ID: LN-001</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-600"></span>
            Active
          </span>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">Repaid: ₦45,000</span>
            <span className="text-gray-600">Remaining: ₦5,000</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[90%] rounded-full bg-[#f10e7c]"></div>
          </div>
        </div>

        <div className="mb-6 flex justify-between border-t pt-4">
          <div>
            <p className="text-sm text-gray-600">Original Amount</p>
            <p className="text-xl font-bold">₦50,000</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="text-xl font-bold">July 15, 2024</p>
          </div>
        </div>

        <button className="w-full rounded-lg bg-[#f10e7c] py-3 font-medium text-white transition-colors hover:bg-[#d00c69]">
          Save
        </button>
      </div>

      {/* Contribution Summary */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Contribution Summary</h2>

        <div className="mb-6 text-center">
          <div className="text-4xl font-bold">₦35,000</div>
          <p className="text-gray-600">Total Contributions</p>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-gray-600">Current Tier: Silver</span>
          <span className="font-bold">₦35,000</span>
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">Next Tier: Gold</span>
            <span className="font-medium">₦15,000 more</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-[70%] rounded-full bg-[#f10e7c]"></div>
          </div>
        </div>

        <button className="w-full rounded-lg border-2 border-gray-200 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
          Add Contribution
        </button>
      </div>
    </div>
  )
}
