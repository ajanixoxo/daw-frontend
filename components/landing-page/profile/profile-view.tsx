"use client";

import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function ProfileView() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#1a1a1a]">
        Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-[#e7e8e9] p-6 md:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-[#f5f5f5]">
            <Image
              src="/african-woman-with-glasses-smiling-professional-he.jpg"
              alt="Profile"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-medium text-[#1a1a1a]">Hello Favour</h2>
        </div>

        {/* Personal Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-[#1a1a1a]">
            Personal Details
          </h3>
          <div className="bg-[#fbfbfb] rounded-xl p-4 md:p-6 border border-[#e7e8e9]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">Full Name</p>
                <p className="font-medium text-[#1a1a1a]">Favour Princewill</p>
              </div>
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">Email Address</p>
                <p className="font-medium text-[#1a1a1a]">
                  ololodaniel444@gmail.com
                </p>
              </div>
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">Phone Number</p>
                <p className="font-medium text-[#1a1a1a]">08028685210</p>
              </div>
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">DAW ID</p>
                <p className="font-medium text-[#1a1a1a]">DAW-2025-003</p>
              </div>
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">Location</p>
                <p className="font-medium text-[#1a1a1a]">Lagos, Nigeria</p>
              </div>
              <div>
                <p className="text-sm text-[#6b6b6b] mb-1">Cooperative</p>
                <p className="font-medium text-[#1a1a1a]">
                  Lagos Fashion Collective
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#1a1a1a]">Addresses</h3>

        <div className="space-y-4">
          <AddressCard
            name="Daniel Ololo"
            address="17b, David Robinson Avenue"
            city="Lagos - LEKKI IKATE ELEGUSHI"
            phone="+234 812 345 6789"
            isDefault={true}
          />
          <AddressCard
            name="Daniel Preye"
            address="17b, David Robinson Avenue"
            city="Lagos - LEKKI IKATE ELEGUSHI"
            phone="+234 812 345 6789"
            isDefault={true}
          />
        </div>
      </div>
    </div>
  );
}

interface AddressCardProps {
  name: string;
  address: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

function AddressCard({
  name,
  address,
  city,
  phone,
  isDefault,
}: AddressCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#e7e8e9] p-4 md:p-6">
      <p className="text-[#6b6b6b] text-sm mb-2">{name}</p>
      <p className="text-[#1a1a1a] font-medium mb-4">
        {address} | {city} | {phone}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#6b6b6b]">Set as Default</span>
          <Switch
            checked={isDefault}
            className="data-[state=checked]:bg-[#f10e7c]"
          />
        </div>
        <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
          <Pencil className="w-4 h-4 text-[#6b6b6b]" />
        </button>
        <button className="p-2 hover:bg-[#f5f5f5] rounded-lg transition-colors">
          <Trash2 className="w-4 h-4 text-[#6b6b6b]" />
        </button>
      </div>
    </div>
  );
}
