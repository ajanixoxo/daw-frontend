"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

export function NotificationsTab() {
  const [newOrders, setNewOrders] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(true);
  const [loanUpdates, setLoanUpdates] = useState(false);
  const [platformUpdates, setPlatformUpdates] = useState(true);
  const [tipsTutorials, setTipsTutorials] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Order Notifications */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Order Notifications
        </h2>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                New Orders
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Get notified when you receive new orders
              </p>
            </div>
            <Switch
              checked={newOrders}
              onCheckedChange={setNewOrders}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Order Updates
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Updates on order status changes
              </p>
            </div>
            <Switch
              checked={orderUpdates}
              onCheckedChange={setOrderUpdates}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
        </div>
      </section>

      {/* Financial Notifications */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Financial Notifications
        </h2>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Payment Received
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Notifications for successful payments
              </p>
            </div>
            <Switch
              checked={paymentReceived}
              onCheckedChange={setPaymentReceived}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Loan Updates
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Loan application and repayment reminders
              </p>
            </div>
            <Switch
              checked={loanUpdates}
              onCheckedChange={setLoanUpdates}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
        </div>
      </section>

      {/* Marketing & Updates (Toggles) */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Marketing & Updates
        </h2>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Platform Updates
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                New features and announcements
              </p>
            </div>
            <Switch
              checked={platformUpdates}
              onCheckedChange={setPlatformUpdates}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-[15px] font-bold text-[#101828]">
                Tips & Tutorials
              </h3>
              <p className="text-[13px] font-medium text-[#667185]">
                Business tips and educational content
              </p>
            </div>
            <Switch
              checked={tipsTutorials}
              onCheckedChange={setTipsTutorials}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
        </div>
      </section>

      {/* Marketing & Updates (Channels) */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Marketing & Updates
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center text-[#667185] group-hover:bg-white transition-colors">
                <Bell className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">Email</h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  princewillfavour17@gmail.com
                </p>
              </div>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
          <div className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center text-[#667185] group-hover:bg-white transition-colors">
                <Bell className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">SMS</h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  +234 9032353555
                </p>
              </div>
            </div>
            <Switch
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
              className="data-[state=checked]:bg-[#E6007A]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
