"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { IUser } from "@/types/auth.types";
import { IShop } from "@/types/shop.types";

interface ProfileFormProps {
  user?: IUser & {
    phone?: string;
    member?: any[];
    country?: string;
    currency?: string;
  };
  shop?: IShop | null;
}

export function ProfileForm({ user, shop }: ProfileFormProps) {
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [country, setCountry] = useState(user?.country || "");
  const [currency, setCurrency] = useState(user?.currency || "");

  const handlePhoneChange = (value: string, data: any) => {
    const countryName = data.name || "";
    const isNigeria = countryName.toLowerCase() === "nigeria";

    setPhoneNumber(value);
    setCountry(countryName);
    setCurrency(isNigeria ? "NGN" : "USD");
  };

  return (
    <div className="space-y-8">
      {shop && <input type="hidden" name="shopId" value={shop._id} />}
      <input type="hidden" name="country" value={country} />
      <input type="hidden" name="currency" value={currency} />

      {/* Cooperative Profile Section */}
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Personal Profile
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
                name="firstName"
                defaultValue={user?.firstName}
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
                name="lastName"
                defaultValue={user?.lastName}
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
              disabled
              defaultValue={user?.email}
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] bg-gray-50 focus:outline-none text-[#101828] font-medium cursor-not-allowed"
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
              <PhoneInput
                country={"ng"}
                value={phoneNumber}
                onChange={handlePhoneChange}
                inputProps={{
                  name: "phone_display",
                  id: "phone",
                  required: true,
                }}
                containerClass="w-full"
                inputClass="!w-full !px-4 !py-3 !h-auto !rounded-xl !border !border-[#D0D5DD] focus:!outline-none focus:!ring-4 focus:!ring-[#E6007A]/5 focus:!border-[#E6007A] !transition-all !placeholder:text-[#667085] !text-[#101828] !font-medium !pl-10"
                buttonClass="!rounded-l-xl !border-y !border-l !border-[#D0D5DD] !bg-white !pl-2"
                countryCodeEditable={false}
                enableSearch={true}
              />
              <input
                type="hidden"
                name="phone"
                value={phoneNumber.replace(/\D/g, "")}
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
                disabled
                defaultValue={user?._id?.toString().slice(-6).toUpperCase()} // Fallback generate ID lookalike
                placeholder="DAW ID"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] bg-gray-50 focus:outline-none text-[#101828] font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* Country & Currency (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[14px] font-bold text-[#344054] mb-2">
                Country
              </label>
              <input
                type="text"
                value={country}
                disabled
                placeholder="Country Name"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] bg-gray-50 text-[#101828] font-medium cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[14px] font-bold text-[#344054] mb-2">
                Currency
              </label>
              <input
                type="text"
                value={currency}
                disabled
                placeholder="Currency"
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] bg-gray-50 text-[#101828] font-medium cursor-not-allowed"
              />
            </div>
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
              name="businessName"
              defaultValue={shop?.name}
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
                name="businessType"
                defaultValue={shop?.category}
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
              {/* Display Cooperative Name from Membership data if available, otherwise input */}
              <input
                type="text"
                id="cooperative"
                disabled
                defaultValue={
                  user?.member &&
                  user.member.length > 0 &&
                  typeof user.member[0].cooperativeId === "object" &&
                  "name" in user.member[0].cooperativeId
                    ? (user.member[0].cooperativeId as any).name
                    : "Not in a cooperative"
                }
                className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] bg-gray-50 focus:outline-none text-[#101828] font-medium cursor-not-allowed"
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
              name="businessAddress"
              rows={4}
              defaultValue={shop?.business_address || shop?.description} // Fallback to description if no address
              placeholder="Enter Business Address"
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium resize-none"
            />
          </div>

          {/* Description - Added missing field mapped in action */}
          <div>
            <label
              htmlFor="description"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Shop Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={shop?.description}
              placeholder="Tell us about your shop..."
              className="w-full px-4 py-3 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all placeholder:text-[#667085] text-[#101828] font-medium resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
