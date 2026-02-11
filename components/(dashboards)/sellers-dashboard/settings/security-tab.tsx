"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Smartphone } from "lucide-react";

export function SecurityTab() {
  const [smsAuth, setSmsAuth] = useState(true);
  const [emailAuth, setEmailAuth] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password & Authentication */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Password & Authentication
        </h2>

        <div className="space-y-6">
          <div>
            <Label
              htmlFor="current-password"
              className="block text-[14px] font-bold text-[#344054] mb-2"
            >
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter current password"
              className="w-full h-12 px-4 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label
                htmlFor="new-password"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
                className="w-full h-12 px-4 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all"
              />
            </div>
            <div>
              <Label
                htmlFor="confirm-password"
                className="block text-[14px] font-bold text-[#344054] mb-2"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="Confirm new password"
                className="w-full h-12 px-4 rounded-xl border border-[#D0D5DD] focus:outline-none focus:ring-4 focus:ring-[#E6007A]/5 focus:border-[#E6007A] transition-all"
              />
            </div>
          </div>

          <Button className="bg-[#E6007A] hover:bg-[#d0006e] text-white h-11 px-6 rounded-lg font-bold text-[14px] transition-all shadow-sm shadow-[#E6007A]/20">
            Update Password
          </Button>
        </div>
      </section>

      {/* Two-Factor Authentication */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Two-Factor Authentication
        </h2>

        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                SMS Authentication
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Receive codes via SMS
              </p>
            </div>
            <Switch
              checked={smsAuth}
              onCheckedChange={setSmsAuth}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Email Authentication
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Receive codes via email
              </p>
            </div>
            <Switch
              checked={emailAuth}
              onCheckedChange={setEmailAuth}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
        </div>
      </section>

      {/* Active Sessions */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Active Sessions
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center text-[#667185] group-hover:bg-white transition-colors">
                <Smartphone className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">
                  Mobile App - iOS
                </h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  Last active: 2 hours ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F6] text-[#E6007A] text-[12px] font-bold">
              <span className="size-1.5 rounded-full bg-[#E6007A]" />
              Current
            </div>
          </div>

          <div className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center text-[#667185] group-hover:bg-white transition-colors">
                <Bell className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">
                  Chrome Browser
                </h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  Lagos, Nigeria - 1 day ago
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="h-10 px-6 rounded-lg bg-[#F2F4F7] text-[#1D2939] hover:bg-[#E4E7EC] font-bold text-[13px] transition-all"
            >
              Revoke
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
