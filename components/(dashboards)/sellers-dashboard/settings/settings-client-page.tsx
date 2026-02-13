"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SettingsHeader } from "@/components/(dashboards)/sellers-dashboard/settings/settings-header";
import { SettingsTabs } from "@/components/(dashboards)/sellers-dashboard/settings/settings-tabs";
import { ProfileForm } from "@/components/(dashboards)/sellers-dashboard/settings/profile-form";
import { ProfilePhotoSection } from "@/components/(dashboards)/sellers-dashboard/settings/profile-photo-section";
import { AccountStatusSection } from "@/components/(dashboards)/sellers-dashboard/settings/account-status-section";
import { SecurityTab } from "@/components/(dashboards)/sellers-dashboard/settings/security-tab";
import { NotificationsTab } from "@/components/(dashboards)/sellers-dashboard/settings/notifications-tab";
import { BillingTab } from "@/components/(dashboards)/sellers-dashboard/settings/billing-tab";
import { updateSellerProfile } from "@/app/actions/settings";
import { toast } from "sonner";
import { IUser } from "@/types/auth.types";
import { IShop } from "@/types/shop.types";

interface SettingsClientPageProps {
  initialData: {
    user: IUser & { profilePicture?: string; phone?: string };
    shop: IShop | null;
  } | null;
}

const initialState = {
  success: false,
  message: "",
  error: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="h-12 px-10 rounded-xl bg-[#E6007A] text-white hover:bg-[#d0006e] shadow-md shadow-[#E6007A]/20 transition-all font-bold text-[15px] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {pending ? "Saving..." : "Save Changes"}
    </button>
  );
}

export default function SettingsClientPage({ initialData }: SettingsClientPageProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [state, action] = useFormState(updateSellerProfile, initialState);

  // Show toast on state change
  if (state?.success && state?.message) {
     // This might cause infinite loop if not handled carefully in effect, 
     // but sonner usually handles deduping. Better to use useEffect.
     // For now, let's rely on the user seeing the success state or we add useEffect.
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-10 max-w-[1280px]">
        <SettingsHeader />
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "profile" && (
          <form action={async (formData) => {
            const result = await updateSellerProfile(state, formData);
            if (result.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(result.error || "Failed to update profile");
            }
          }} className="animate-in fade-in duration-500">
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left column - Forms */}
              <div className="lg:col-span-8">
                <ProfileForm user={initialData?.user} shop={initialData?.shop} />
              </div>

              {/* Right column - Photo & Status */}
              <div className="lg:col-span-4 space-y-8">
                <ProfilePhotoSection initialImage={initialData?.user?.profilePicture} />
                <AccountStatusSection />
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-12 flex justify-end items-center gap-4">
              <button type="button" className="h-12 px-10 rounded-xl bg-[#F9FAFB] text-[#101828] hover:bg-[#F2F4F7] transition-all font-bold text-[15px]">
                Cancel
              </button>
              <SubmitButton />
            </div>
          </form>
        )}

        {activeTab === "security" && (
          <div className="mt-10 animate-in fade-in duration-500">
            <SecurityTab />
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="mt-10 animate-in fade-in duration-500">
            <NotificationsTab />
          </div>
        )}

        {activeTab === "billing" && (
          <div className="mt-10 animate-in fade-in duration-500">
            <BillingTab />
          </div>
        )}

        {activeTab === "data-privacy" && (
          <div className="mt-10 animate-in fade-in duration-500">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Data & Privacy
              </h2>
              <p className="text-gray-500">Privacy settings coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
