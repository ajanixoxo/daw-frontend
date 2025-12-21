export function AccountStatusSection() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Account Status</h2>

      <div className="space-y-4">
        {/* Verification */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Verification</span>
          <span className="text-sm font-semibold text-gray-900">Verified</span>
        </div>

        {/* Membership */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <span className="text-sm text-gray-600">Membership</span>
          <span className="text-sm font-semibold text-gray-900">Premium</span>
        </div>

        {/* Tier */}
        <div className="flex items-center justify-between py-3">
          <span className="text-sm text-gray-600">Tier</span>
          <span className="text-sm font-semibold text-gray-900">Silver</span>
        </div>
      </div>
    </div>
  )
}
