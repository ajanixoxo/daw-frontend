export function AccountStatusSection() {
  return (
    <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
      <h2 className="text-[18px] font-bold text-[#101828] mb-8">
        Account Status
      </h2>

      <div className="space-y-1">
        {/* Verification */}
        <div className="flex items-center justify-between py-4 border-b border-[#F2F4F7]">
          <span className="text-[14px] font-medium text-[#667085]">
            Verification
          </span>
          <span className="text-[14px] font-bold text-[#101828]">Verified</span>
        </div>

        {/* Membership */}
        <div className="flex items-center justify-between py-4 border-b border-[#F2F4F7]">
          <span className="text-[14px] font-medium text-[#667085]">
            Membership
          </span>
          <span className="text-[14px] font-bold text-[#101828]">Premium</span>
        </div>

        {/* Tier */}
        <div className="flex items-center justify-between py-4">
          <span className="text-[14px] font-medium text-[#667085]">Tier</span>
          <span className="text-[14px] font-bold text-[#101828]">Silver</span>
        </div>
      </div>
    </div>
  );
}
