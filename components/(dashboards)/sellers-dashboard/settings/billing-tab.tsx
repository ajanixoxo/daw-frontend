"use client";

import Link from "next/link";
import { HandCoins, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillingTabProps {
  isMember: boolean;
}

export function BillingTab({ isMember }: BillingTabProps) {
  // Cooperative members pay monthly contributions, not subscriptions.
  // Show them a redirect to the contribution page.
  if (isMember) {
    return (
      <div className="animate-in fade-in duration-500">
        <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <div className="flex flex-col items-center text-center gap-6 py-8">
            <div className="w-16 h-16 rounded-2xl bg-[#FEEBF6] flex items-center justify-center">
              <HandCoins className="w-8 h-8 text-[#E6007A]" />
            </div>

            <div className="space-y-2 max-w-md">
              <h2 className="text-[18px] font-bold text-[#101828]">
                You&apos;re a Cooperative Member
              </h2>
              <p className="text-[14px] text-[#667085] leading-relaxed">
                As a DAW cooperative member, your monthly payments are managed
                as <strong className="text-[#101828]">contributions</strong>,
                not subscriptions. Use the Contribution page to make and track
                your monthly payments.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 w-full max-w-xs">
              <div className="flex items-center gap-2 text-[13px] text-[#475467]">
                <CheckCircle className="w-4 h-4 text-[#12B76A] shrink-0" />
                <span>No subscription fee required for members</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#475467]">
                <CheckCircle className="w-4 h-4 text-[#12B76A] shrink-0" />
                <span>Monthly contribution covers your membership</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#475467]">
                <CheckCircle className="w-4 h-4 text-[#12B76A] shrink-0" />
                <span>Contribution history tracked on the Contribution page</span>
              </div>
            </div>

            <Link href="/sellers/contribution">
              <Button className="bg-[#E6007A] hover:bg-[#d0006e] text-white gap-2 h-11 px-6">
                Go to Contribution Page
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Regular sellers pay a monthly subscription.
  // Subscription payment backend is not yet available — show plan info with clear status.
  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <h2 className="text-[18px] font-bold text-[#101828] mb-2">
          Seller Subscription
        </h2>
        <p className="text-[14px] text-[#667085] mb-8">
          Your monthly subscription gives you full access to all seller features
          on the DAW marketplace.
        </p>

        <div className="p-7 bg-[#F9FAFB] border border-[#F2F4F7] rounded-2xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[17px] font-bold text-[#101828]">
                Standard Seller Plan
              </h3>
              <p className="text-[13px] text-[#667085] mt-1">
                Access to all marketplace seller features
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[#98A2B3] uppercase tracking-widest mb-1">
                Billed monthly
              </p>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "List and manage products on the marketplace",
              "Process and fulfil customer orders",
              "Wallet & payout access",
              "Sales analytics dashboard",
              "Customer support",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-[13px] text-[#475467]"
              >
                <CheckCircle className="w-4 h-4 text-[#12B76A] shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#F2F4F7] text-center">
            <p className="text-[13px] font-medium text-[#667085]">
              Subscription payments coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
