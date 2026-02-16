"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Download } from "lucide-react";

export function BillingTab() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Payment Methods */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Payment Methods
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-[#F9FAFB] border border-[#F2F4F7] flex items-center justify-center text-[#667185] group-hover:bg-white transition-colors">
                <CreditCard className="size-5" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">
                  Visa ending in 4242
                </h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  Expires 12/2025
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF0F6] text-[#E6007A] text-[12px] font-bold">
              <span className="size-1.5 rounded-full bg-[#E6007A]" />
              Default
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full h-12 rounded-xl bg-[#F9FAFB] border border-[#F2F4F7] text-[#101828] hover:bg-[#F2F4F7] transition-all font-bold text-[15px]"
          >
            Add Payment Method
          </Button>
        </div>
      </section>

      {/* Billing History */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Billing History
        </h2>
        <div className="space-y-3">
          {[
            { date: "Jan 15, 2025", amount: "$29.99", status: "Paid" },
            { date: "Dec 15, 2024", amount: "$29.99", status: "Paid" },
            { date: "Nov 15, 2024", amount: "$29.99", status: "Paid" },
          ].map((invoice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 border border-[#F2F4F7] rounded-xl hover:bg-[#F9FAFB] transition-colors group"
            >
              <div>
                <h3 className="text-[15px] font-bold text-[#101828]">
                  {invoice.date}
                </h3>
                <p className="text-[13px] font-medium text-[#667185]">
                  Premium Membership
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-[16px] font-bold text-[#101828]">
                  {invoice.amount}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-lg text-[#667185] hover:text-[#101828] hover:bg-white transition-all"
                >
                  <Download className="size-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-8">
          Current Subscription
        </h2>
        <div className="p-8 bg-[#F9FAFB] border border-[#F2F4F7] rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[20px] font-bold text-[#101828]">
                Premium Plan
              </h3>
              <p className="text-[14px] font-medium text-[#667185] mt-1">
                Billed monthly
              </p>
            </div>
            <span className="text-[28px] font-bold text-[#101828]">$29.99</span>
          </div>
          <p className="text-[14px] font-medium text-[#667185] mb-8">
            Next billing date:{" "}
            <span className="text-[#101828] font-bold">February 15, 2025</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 h-12 rounded-xl bg-[#E6007A] text-white hover:bg-[#d0006e] shadow-md shadow-[#E6007A]/20 transition-all font-bold text-[15px]">
              Change Plan
            </Button>
            <Button
              variant="ghost"
              className="flex-1 h-12 rounded-xl bg-white border border-[#F2F4F7] text-[#F04438] hover:bg-[#FEF3F2] transition-all font-bold text-[15px]"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
