"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function SettingsView() {
  const [accountForm, setAccountForm] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [billingForm, setBillingForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-6 md:p-8">
        <h2 className="  text-2xl md:text-3xl text-[#1a1a1a] mb-6">
          Account Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={accountForm.fullName}
              onChange={(e) =>
                setAccountForm({ ...accountForm, fullName: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                value={accountForm.email}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Number"
                value={accountForm.phone}
                onChange={(e) =>
                  setAccountForm({ ...accountForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
          </div>

          <button className="px-6 py-2.5 bg-[#ec008c] text-white rounded-full font-medium hover:bg-[#d4007d] transition-colors mt-2">
            Save Changes
          </button>
        </div>
      </div>

      {/* Billing Address */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-6 md:p-8">
        <h2 className="  text-2xl md:text-3xl text-[#1a1a1a] mb-6">
          Billing Address
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={billingForm.fullName}
              onChange={(e) =>
                setBillingForm({ ...billingForm, fullName: e.target.value })
              }
              className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="hello@example.com"
                value={billingForm.email}
                onChange={(e) =>
                  setBillingForm({ ...billingForm, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter Number"
                value={billingForm.phone}
                onChange={(e) =>
                  setBillingForm({ ...billingForm, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Street Address
            </label>
            <input
              type="text"
              placeholder="Enter Street Address"
              value={billingForm.streetAddress}
              onChange={(e) =>
                setBillingForm({
                  ...billingForm,
                  streetAddress: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  value={billingForm.country}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, country: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="nigeria">Nigeria</option>
                  <option value="ghana">Ghana</option>
                  <option value="kenya">Kenya</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                State
              </label>
              <div className="relative">
                <select
                  value={billingForm.state}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, state: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select State
                  </option>
                  <option value="lagos">Lagos</option>
                  <option value="abuja">Abuja</option>
                  <option value="rivers">Rivers</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                City
              </label>
              <div className="relative">
                <select
                  value={billingForm.city}
                  onChange={(e) =>
                    setBillingForm({ ...billingForm, city: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20 appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  <option value="ikeja">Ikeja</option>
                  <option value="lekki">Lekki</option>
                  <option value="victoria-island">Victoria Island</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b6b6b] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Zip Code
              </label>
              <input
                type="text"
                placeholder="Enter Zip Code"
                value={billingForm.zipCode}
                onChange={(e) =>
                  setBillingForm({ ...billingForm, zipCode: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
          </div>

          <button className="px-6 py-2.5 bg-[#ec008c] text-white rounded-full font-medium hover:bg-[#d4007d] transition-colors mt-2">
            Save Changes
          </button>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-6 md:p-8">
        <h2 className="  text-2xl md:text-3xl text-[#1a1a1a] mb-6">
          Change password
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Current Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={passwordForm.currentPassword}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  currentPassword: e.target.value,
                })
              }
              className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-[#f5f5f5] rounded-full text-[#1a1a1a] placeholder-[#a1a1a1] outline-none focus:ring-2 focus:ring-[#ec008c]/20"
              />
            </div>
          </div>

          <button className="px-6 py-2.5 bg-[#ec008c] text-white rounded-full font-medium hover:bg-[#d4007d] transition-colors mt-2">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
