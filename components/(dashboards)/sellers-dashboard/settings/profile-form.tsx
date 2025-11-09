export function ProfileForm() {
  return (
    <div className="space-y-8">
      {/* Cooperative Profile Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Cooperative Profile</h2>

        <div className="space-y-5">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                defaultValue="Princewill"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                defaultValue="Favour"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue="princewillfavour17@gmail.com"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Phone Number & DAW ID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                defaultValue="+234 9032235555"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="dawId" className="block text-sm font-medium text-gray-700 mb-2">
                DAW ID
              </label>
              <input
                type="text"
                id="dawId"
                defaultValue="DAW-2025-001"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              defaultValue="Passionate entrepreneur specializing in authentic African crafts and textiles. Member of Lagos Women's Cooperative since 2023."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Business Information Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-6">Business Information</h2>

        <div className="space-y-5">
          {/* Business Name */}
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              defaultValue="Faye's Complex"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>

          {/* Business Type & Cooperative */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <input
                type="text"
                id="businessType"
                defaultValue="Clothing & Jewellery"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label htmlFor="cooperative" className="block text-sm font-medium text-gray-700 mb-2">
                Cooperative
              </label>
              <input
                type="text"
                id="cooperative"
                defaultValue="Lagos Women's Cooperatives"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Business Address */}
          <div>
            <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Business Address
            </label>
            <textarea
              id="businessAddress"
              rows={3}
              defaultValue="123 Market Street, Victoria Island, Lagos, Nigeria"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
