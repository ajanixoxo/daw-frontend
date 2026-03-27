"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  HandCoins,
  CheckCircle,
  Loader2,
  X,
  CreditCard,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getMySummary,
  getMyHistory,
  initiatePayment,
  getAvailableTiers,
  requestTierChange,
  cancelTierChange,
} from "@/app/actions/contributions";
import type {
  ContributionSummary,
  ContributionHistoryItem,
  PaymentPlatform,
  TierOption,
} from "@/app/actions/contributions";
import { toast } from "sonner";
import { format } from "date-fns";

// ── Constants ─────────────────────────────────────────────────────────────────

const SELLER_SUBSCRIPTION_NGN = 20000;
const SELLER_SUBSCRIPTION_USD = 20;

const ALL_PLATFORMS: {
  id: PaymentPlatform;
  name: string;
  description: string;
  color: string;
  currencies: ("NGN" | "USD")[];
}[] = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Pay with card or bank transfer via Paystack",
    color: "#00C3F7",
    currencies: ["NGN"],
  },
  {
    id: "paypal",
    name: "PayPal",
    description: "Pay in USD via PayPal",
    color: "#003087",
    currencies: ["NGN", "USD"],
  },
  {
    id: "vigipay",
    name: "VígiPay",
    description: "Pay via VígiPay wallet",
    color: "#f10e7c",
    currencies: ["NGN"],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatAmount(amount: number, currency: "NGN" | "USD") {
  return new Intl.NumberFormat(currency === "USD" ? "en-US" : "en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: currency === "USD" ? 2 : 0,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(amount);
}

function formatDate(d: string | null | undefined) {
  if (!d) return "—";
  try {
    return format(new Date(d), "dd MMM yyyy");
  } catch {
    return "—";
  }
}

function currentMonthLabel() {
  return new Date().toLocaleString("en-US", { month: "long", year: "numeric" });
}

// ── Props ─────────────────────────────────────────────────────────────────────

interface BillingTabProps {
  isMember: boolean;
  currency: "NGN" | "USD";
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BillingTab({ isMember, currency }: BillingTabProps) {
  if (isMember) {
    return <CooperativeMemberBillingPanel currency={currency} />;
  }

  return <SellerBillingPanel currency={currency} />;
}

// ── Cooperative member billing panel ──────────────────────────────────────────

const TIER_USD_MAP: Record<number, number> = { 20000: 25, 50000: 50, 120000: 120 };

function CooperativeMemberBillingPanel({ currency }: { currency: "NGN" | "USD" }) {
  const [summary, setSummary] = useState<ContributionSummary | null>(null);
  const [tiers, setTiers] = useState<TierOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTierModal, setShowTierModal] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [sumRes, tiersRes] = await Promise.all([getMySummary(), getAvailableTiers()]);
        if (sumRes.success && sumRes.data) setSummary(sumRes.data);
        if (tiersRes.success && tiersRes.data) setTiers(tiersRes.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleRequestChange = async () => {
    if (!selectedTierId) return;
    setSubmitting(true);
    try {
      const result = await requestTierChange(selectedTierId);
      if (result.success && result.data) {
        toast.success(result.message || "Tier change scheduled");
        setShowTierModal(false);
        setSelectedTierId(null);
        // Refresh summary
        const sumRes = await getMySummary();
        if (sumRes.success && sumRes.data) setSummary(sumRes.data);
      } else {
        toast.error(result.error || "Failed to schedule tier change");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelChange = async () => {
    setCancelling(true);
    try {
      const result = await cancelTierChange();
      if (result.success) {
        toast.success("Pending tier change cancelled");
        const sumRes = await getMySummary();
        if (sumRes.success && sumRes.data) setSummary(sumRes.data);
      } else {
        toast.error(result.error || "Failed to cancel tier change");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#E6007A]" />
      </div>
    );
  }

  const displayAmount = (ngnAmount: number) =>
    currency === "USD"
      ? formatAmount(TIER_USD_MAP[ngnAmount] ?? ngnAmount, "USD")
      : formatAmount(ngnAmount, "NGN");

  // Sort tiers by monthly contribution ascending
  const sortedTiers = [...tiers].sort((a, b) => a.monthlyContribution - b.monthlyContribution);

  return (
    <div className="animate-in fade-in duration-500 space-y-6">

      {/* Tier change modal */}
      {showTierModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-[#101828]">Change Contribution Tier</h3>
              <button
                onClick={() => { setShowTierModal(false); setSelectedTierId(null); }}
                className="size-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] text-[#667085]"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="text-sm text-[#667085] mb-5">
              Your new tier will take effect from your <strong>next billing cycle</strong>. Your current tier remains active until then.
            </p>

            <div className="space-y-3 mb-6">
              {sortedTiers.map((tier) => {
                const isCurrent = tier._id === summary?.currentTierId;
                const isSelected = tier._id === selectedTierId;
                return (
                  <button
                    key={tier._id}
                    disabled={isCurrent}
                    onClick={() => setSelectedTierId(tier._id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      isCurrent
                        ? "border-[#d0d5dd] bg-[#f9fafb] opacity-60 cursor-not-allowed"
                        : isSelected
                        ? "border-[#E6007A] bg-[#fff5f9]"
                        : "border-[#e4e7ec] hover:border-[#E6007A]/40 hover:bg-[#fafafa]"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[#101828]">{tier.name}</p>
                        {isCurrent && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#e7f6ec] text-[#009a49]">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#667085] mt-0.5">
                        {displayAmount(tier.monthlyContribution)} / month
                      </p>
                    </div>
                    <span
                      className={`size-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                        isSelected && !isCurrent
                          ? "border-[#E6007A] bg-[#E6007A]"
                          : "border-[#d0d5dd]"
                      }`}
                    >
                      {isSelected && !isCurrent && (
                        <span className="size-2 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            <Button
              onClick={handleRequestChange}
              disabled={!selectedTierId || submitting}
              className="w-full bg-[#E6007A] hover:bg-[#d0006e] text-white h-12 text-sm font-medium disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                "Confirm Tier Change"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#F2F4F7] p-8 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-[#FEEBF6] flex items-center justify-center">
            <HandCoins className="w-5 h-5 text-[#E6007A]" />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#101828]">Cooperative Membership</h2>
            <p className="text-[13px] text-[#667085]">DAW Cooperative Member</p>
          </div>
        </div>

        {summary?.pendingTier && (
          <div className="mt-5 flex items-start gap-3 p-4 bg-[#fffbeb] border border-[#fde68a] rounded-xl">
            <AlertCircle className="w-4 h-4 text-[#d97706] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#92400e]">
                Tier change scheduled — {summary.pendingTier.name} from {summary.pendingTierEffectiveMonth}
              </p>
              <p className="text-xs text-[#92400e]/80 mt-0.5">
                Your contribution will be{" "}
                {currency === "USD"
                  ? formatAmount(summary.pendingTier.usdAmount ?? summary.pendingTier.monthlyContribution, "USD")
                  : formatAmount(summary.pendingTier.monthlyContribution, "NGN")}{" "}
                per month starting that cycle.
              </p>
            </div>
            <button
              onClick={handleCancelChange}
              disabled={cancelling}
              className="text-xs text-[#d97706] font-medium hover:underline shrink-0 disabled:opacity-50"
            >
              {cancelling ? "Cancelling..." : "Cancel change"}
            </button>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[14px] text-[#667085]">
            Manage your monthly contribution tier below.
          </p>
          <Link href="/sellers/contribution" className="flex items-center gap-1 text-[13px] text-[#E6007A] font-medium hover:underline">
            View contributions
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {sortedTiers.map((tier) => {
          const isCurrent = tier._id === summary?.currentTierId;
          const isPending = tier._id === summary?.pendingTier?._id;
          const usdAmt = TIER_USD_MAP[tier.monthlyContribution] ?? null;

          return (
            <div
              key={tier._id}
              className={`relative rounded-2xl border-2 p-6 transition-all ${
                isCurrent
                  ? "border-[#E6007A] bg-[#fff5f9] shadow-md"
                  : isPending
                  ? "border-[#f59e0b] bg-[#fffbeb]"
                  : "border-[#F2F4F7] bg-white"
              }`}
            >
              {isCurrent && (
                <span className="absolute -top-3 left-4 bg-[#E6007A] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Current Plan
                </span>
              )}
              {isPending && !isCurrent && (
                <span className="absolute -top-3 left-4 bg-[#f59e0b] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Scheduled from {summary?.pendingTierEffectiveMonth}
                </span>
              )}

              <h3 className="text-[15px] font-bold text-[#101828] mb-1">{tier.name}</h3>

              <div className="mb-4">
                <p className="text-[22px] font-bold text-[#101828]">
                  {currency === "USD" && usdAmt
                    ? formatAmount(usdAmt, "USD")
                    : formatAmount(tier.monthlyContribution, "NGN")}
                </p>
                {currency === "NGN" && usdAmt && (
                  <p className="text-[12px] text-[#98A2B3]">≈ {formatAmount(usdAmt, "USD")}</p>
                )}
                <p className="text-[12px] text-[#667085]">/ month</p>
              </div>

              <div className="space-y-2 mb-5">
                {tier.benefits?.marketplaceDiscount != null && (
                  <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#12B76A] shrink-0" />
                    <span>{tier.benefits.marketplaceDiscount}% marketplace discount</span>
                  </div>
                )}
                {tier.benefits?.masterclassAccess && (
                  <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#12B76A] shrink-0" />
                    <span>Masterclass access</span>
                  </div>
                )}
                {tier.benefits?.prioritySupport && (
                  <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#12B76A] shrink-0" />
                    <span>Priority support</span>
                  </div>
                )}
                {tier.benefits?.businessConsultation && (
                  <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#12B76A] shrink-0" />
                    <span>Business consultation</span>
                  </div>
                )}
                {tier.loanSettings?.maxAmount != null && (
                  <div className="flex items-center gap-2 text-[12px] text-[#475467]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#12B76A] shrink-0" />
                    <span>Loan up to {formatAmount(tier.loanSettings.maxAmount, "NGN")}</span>
                  </div>
                )}
              </div>

              {isCurrent ? (
                <div className="flex items-center gap-1.5 text-[12px] text-[#E6007A] font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Active plan
                </div>
              ) : (
                <button
                  onClick={() => { setSelectedTierId(tier._id); setShowTierModal(true); }}
                  className="text-[12px] font-medium text-[#E6007A] hover:underline"
                >
                  {isPending ? "Change selection" : "Switch to this tier →"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {sortedTiers.length === 0 && (
        <p className="text-center text-[13px] text-[#667085] py-8">No tiers available.</p>
      )}
    </div>
  );
}

// ── Seller billing panel (non-member sellers) ─────────────────────────────────

function SellerBillingPanel({ currency }: { currency: "NGN" | "USD" }) {
  const [summary, setSummary] = useState<ContributionSummary | null>(null);
  const [history, setHistory] = useState<ContributionHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PaymentPlatform | null>(null);

  const month = currentMonthLabel();
  const subscriptionAmount =
    currency === "USD" ? SELLER_SUBSCRIPTION_USD : SELLER_SUBSCRIPTION_NGN;
  const availablePlatforms = ALL_PLATFORMS.filter((p) =>
    p.currencies.includes(currency)
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [sumRes, histRes] = await Promise.all([getMySummary(), getMyHistory()]);
        if (sumRes.success && sumRes.data) setSummary(sumRes.data);
        if (histRes.success && histRes.data) setHistory(histRes.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const alreadyPaidThisMonth = history.some(
    (h) => h.month === month && h.status === "paid"
  );

  const handleProceed = async () => {
    if (!selectedPlatform) return;
    setShowModal(false);
    setPaying(true);
    try {
      const result = await initiatePayment(subscriptionAmount, month, selectedPlatform);
      if (result.success && result.data?.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      } else {
        toast.error(result.error || "Failed to initiate payment");
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setPaying(false);
      setSelectedPlatform(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#E6007A]" />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500 space-y-6">

      {/* Platform selection modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-semibold text-[#101828]">Choose Payment Method</h3>
                <p className="text-sm text-[#667085] mt-0.5">
                  Paying {formatAmount(subscriptionAmount, currency)} for {month}
                </p>
              </div>
              <button
                onClick={() => { setShowModal(false); setSelectedPlatform(null); }}
                className="size-8 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] text-[#667085]"
              >
                <X className="size-4" />
              </button>
            </div>

            {currency === "USD" && (
              <p className="text-xs text-[#667085] bg-[#f5f5f5] rounded-lg px-3 py-2 mb-4">
                USD accounts are billed via PayPal only.
              </p>
            )}

            <div className="space-y-3 mb-6">
              {availablePlatforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                    selectedPlatform === platform.id
                      ? "border-[#E6007A] bg-[#fff5f9]"
                      : "border-[#e4e7ec] hover:border-[#E6007A]/40 hover:bg-[#fafafa]"
                  }`}
                >
                  <span
                    className="size-10 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold"
                    style={{ backgroundColor: platform.color }}
                  >
                    {platform.name.slice(0, 2).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#101828]">{platform.name}</p>
                    <p className="text-xs text-[#667085]">{platform.description}</p>
                  </div>
                  <span
                    className={`size-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      selectedPlatform === platform.id
                        ? "border-[#E6007A] bg-[#E6007A]"
                        : "border-[#d0d5dd]"
                    }`}
                  >
                    {selectedPlatform === platform.id && (
                      <span className="size-2 rounded-full bg-white" />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <Button
              onClick={handleProceed}
              disabled={!selectedPlatform || paying}
              className="w-full bg-[#E6007A] hover:bg-[#d0006e] text-white h-12 text-sm font-medium disabled:opacity-50"
            >
              {paying ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Initiating Payment...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Plan card */}
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
              <p className="text-[24px] font-bold text-[#101828]">
                {formatAmount(subscriptionAmount, currency)}
              </p>
              <p className="text-[12px] text-[#667085]">/ month</p>
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
              <div key={benefit} className="flex items-center gap-2 text-[13px] text-[#475467]">
                <CheckCircle className="w-4 h-4 text-[#12B76A] shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-[#F2F4F7]">
            {alreadyPaidThisMonth ? (
              <div className="flex items-center gap-3 p-4 bg-[#e7f6ec] rounded-xl">
                <CheckCircle className="h-5 w-5 text-[#009a49] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#009a49]">
                    Subscription active for {month}
                  </p>
                  <p className="text-xs text-[#009a49]/80">
                    Your payment has been received.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[13px] text-[#667085]">
                  <Clock className="w-4 h-4 text-[#F56630]" />
                  <span>Payment due for {month}</span>
                </div>
                <Button
                  onClick={() => setShowModal(true)}
                  disabled={paying}
                  className="bg-[#E6007A] hover:bg-[#d0006e] text-white h-11 px-6 gap-2"
                >
                  {paying ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4" />
                      Pay {formatAmount(subscriptionAmount, currency)}
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment history */}
      {history.length > 0 && (
        <div className="bg-white rounded-2xl border border-[#F2F4F7] p-6 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
          <h3 className="text-[15px] font-semibold text-[#101828] mb-4">
            Payment History
          </h3>
          <div className="space-y-3">
            {history.map((item, i) => {
              const isPaid = item.status === "paid";
              return (
                <div
                  key={item._id || i}
                  className="flex items-center justify-between py-3 border-b border-[#F2F4F7] last:border-0"
                >
                  <div>
                    <p className="text-[13px] font-medium text-[#101828]">{item.month}</p>
                    <p className="text-[12px] text-[#667085]">
                      {isPaid ? `Paid on ${formatDate(item.paidAt)}` : "Pending"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[13px] font-semibold text-[#101828]">
                      {formatAmount(item.amount, currency)}
                    </p>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                        isPaid
                          ? "bg-[#e7f6ec] text-[#009a49]"
                          : item.status === "missed"
                          ? "bg-[#ffece5] text-[#ad3307]"
                          : "bg-[#ffe7cc] text-[#f56630]"
                      }`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
