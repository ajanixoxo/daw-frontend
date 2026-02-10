export function ProfileForm() {
  return (
    <div className="space-y-8">
      {/* Cooperative Profile Section */}
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Cooperative Profile
        </h2>

        <div className="space-y-6">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue="Princewill"
                placeholder="Enter First Name"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue="Favour"
                placeholder="Enter Last Name"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="princewillfavour17@gmail.com"
              placeholder="Enter Email Address"
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
            />
          </div>

          {/* Phone Number & DAW ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue="+234 9032235555"
                placeholder="Enter Phone Number"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
            <div>
              <label
                htmlFor="dawId"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                DAW ID
              </label>
              <input
                type="text"
                id="dawId"
                defaultValue="DAW-2025-001"
                placeholder="Enter DAW ID"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label
              htmlFor="bio"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              defaultValue="Passionate entrepreneur specializing in authentic African crafts and textiles. Member of Lagos Women's Cooperative since 2023."
              placeholder="Tell us about yourself..."
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium resize-none"
            />
          </div>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Business Information
        </h2>

        <div className="space-y-6">
          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              defaultValue="Faye's Complex"
              placeholder="Enter Business Name"
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
            />
          </div>

          {/* Business Type & Cooperative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="businessType"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                Business Type
              </label>
              <input
                type="text"
                id="businessType"
                defaultValue="Clothing & Jewellery"
                placeholder="Enter Business Type"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
            <div>
              <label
                htmlFor="cooperative"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                Cooperative
              </label>
              <input
                type="text"
                id="cooperative"
                defaultValue="Lagos Women's Cooperatives"
                placeholder="Search Cooperatives..."
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium"
              />
            </div>
          </div>

          {/* Business Address */}
          <div>
            <label
              htmlFor="businessAddress"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Business Address
            </label>
            <textarea
              id="businessAddress"
              rows={4}
              defaultValue="123 Market Street, Victoria Island, Lagos, Nigeria"
              placeholder="Enter Business Address"
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
