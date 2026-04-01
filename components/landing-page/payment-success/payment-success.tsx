"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment, verifyPaystackPayment, capturePaypalOrder } from "@/app/actions/checkout";
import { verifyContribution } from "@/app/actions/contributions";
import { getOrder } from "@/app/actions/order";
import { Loader2, Check, Download, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

// Normalised shape used by the UI regardless of provider
interface NormalizedPayment {
  orderId: string;
  channel: string;
  transactionReference: string;
  amount: number;
}

export function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Detect which provider returned based on URL params
  const vigipayRef   = searchParams.get("ref");          // Vigipay
  const paystackRef  = searchParams.get("reference") || searchParams.get("trxref");    // Paystack (appended by Paystack)
  const paypalToken  = searchParams.get("token");        // PayPal order id (appended by PayPal)
  const orderId      = searchParams.get("orderId");      // Paystack + PayPal pass this for orders
  const type         = searchParams.get("type");         // contribution vs order

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<NormalizedPayment | null>(null);
  const [orderData, setOrderData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        // ── Cooperative Contribution ────────────────────────────────────────
        if (type === "contribution" && paystackRef) {
          const result = await verifyContribution(paystackRef);
          if (!result.success || !result.data) {
            setError(result.error || "Failed to verify contribution payment");
            return;
          }
          
          // Normalized for contributions
          const contrib = result.data.data || result.data;
          setPayment({
            orderId: contrib._id || "contribution",
            channel: "Paystack",
            transactionReference: paystackRef,
            amount: contrib.amount || 0,
          });
          
          setOrderData({
            isContribution: true,
            month: contrib.month || "N/A"
          });
          return;
        }

        // ── Vigipay ──────────────────────────────────────────────────────────
        if (vigipayRef) {
          const result = await verifyPayment(vigipayRef);
          if (!result.success || !result.data) {
            setError(result.error || "Failed to verify payment");
            return;
          }
          const p = result.data.payment;
          setPayment({
            orderId: p.orderId,
            channel: p.channel || "Vigipay",
            transactionReference: p.transactionReference,
            amount: p.amount,
          });
          const orderResult = await getOrder(p.orderId);
          if (orderResult.success) setOrderData(orderResult.data);
          return;
        }

        // ── Paystack ─────────────────────────────────────────────────────────
        if (paystackRef && orderId) {
          const result = await verifyPaystackPayment(paystackRef);
          if (!result.success || !result.data) {
            setError(result.error || "Failed to verify Paystack payment");
            return;
          }
          const orderResult = await getOrder(orderId);
          const amount = orderResult.success ? (orderResult.data as any)?.order?.total_amount ?? 0 : 0;
          setPayment({
            orderId,
            channel: "Paystack",
            transactionReference: result.data.reference,
            amount,
          });
          if (orderResult.success) setOrderData(orderResult.data);
          return;
        }

        // ── PayPal ───────────────────────────────────────────────────────────
        if (paypalToken && orderId) {
          const result = await capturePaypalOrder(paypalToken);
          if (!result.success || !result.data) {
            setError(result.error || "Failed to capture PayPal payment");
            return;
          }
          const orderResult = await getOrder(orderId);
          const amount = orderResult.success ? (orderResult.data as any)?.order?.total_amount ?? 0 : 0;
          setPayment({
            orderId,
            channel: "PayPal",
            transactionReference: paypalToken,
            amount,
          });
          if (orderResult.success) setOrderData(orderResult.data);
          return;
        }

        setError("No payment reference found. Please contact support.");
      } catch {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-[#F10E7C] mb-4" />
        <p className="text-gray-500 font-medium">Verifying your payment...</p>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-600 mb-8">
            {error || "We couldn't verify your payment."}
          </p>
          <Button
            onClick={() => router.push(type === "contribution" ? "/cooperative/dashboard" : "/marketplace")}
            className="w-full bg-[#222] hover:bg-[#333] text-white rounded-full py-6"
          >
            Back to {type === "contribution" ? "Dashboard" : "Marketplace"}
          </Button>
        </div>
      </div>
    );
  }

  const orderItems = (orderData as any)?.orderItems || [];

  return (
    <div className="w-full max-w-5xl mx-auto  bg-white rounded-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden my-18">
      <div className="p-8 md:p-16">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-8">
            {/* Scalloped Circle */}
            <div className="w-24 h-24 bg-[#F10E7C] rounded-full flex items-center justify-center shadow-xl shadow-[#F10E7C]/20 relative z-10">
              <Check className="w-12 h-12 text-white stroke-[3px]" />
            </div>
            {/* Decorative scalloped edge effect using absolute elements if needed, but a clean circle is often better for premium feel unless using a specific SVG */}
            <div className="absolute inset-0 w-24 h-24 bg-[#F10E7C]/10 rounded-full scale-125 -z-0 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#222] mb-4 tracking-tight">
            {orderData?.isContribution ? "Contribution Successful" : "Order Completed"}
          </h1>
          <p className="text-gray-400 text-xl font-medium">
            {orderData?.isContribution 
              ? `Thank you. Your contribution for ${orderData.month} has been received`
              : "Thank you. Your Order has been received"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          <InfoBox
            label={orderData?.isContribution ? "Type" : "Order ID"}
            value={orderData?.isContribution ? "Cooperative Contribution" : `ORD-${payment.orderId.slice(-6).toUpperCase()}`}
          />
          <InfoBox label="Payment Method" value={payment.channel || "Card"} />
          <InfoBox
            label="Transaction ID"
            value={payment.transactionReference.slice(0, 12).toUpperCase()}
          />
          <InfoBox
            label="Est. Delivery Date"
            value={format(
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              "dd MMM yyyy"
            )}
          />
          <div className="lg:col-span-1">
            <Button className="w-full h-full bg-[#222] hover:bg-[#333] text-white rounded-2xl py-6 flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02]">
              <Download className="w-6 h-6" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Download Invoice
              </span>
            </Button>
          </div>
        </div>

        {/* Order Details Section */}
        <div className="bg-[#FAFAFA] rounded-[32px] border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-gray-200/50 bg-white">
            <h2 className="text-3xl font-bold text-[#222]">
              {orderData?.isContribution ? "Contribution Details" : "Order Details"}
            </h2>
          </div>

          <div className="p-8 md:p-10">
            {/* Table Header */}
            <div className="flex justify-between mb-8 text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
              <span>Products</span>
              <span>Sub Total</span>
            </div>

            {/* Product List */}
            <div className="space-y-8 mb-12">
              {orderItems.length > 0 ? (
                orderItems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-24 bg-white rounded-3xl overflow-hidden relative flex-shrink-0 shadow-sm border border-gray-100">
                        {item.product_id?.images?.[0] ? (
                          <Image
                            src={item.product_id.images[0]}
                            alt={item.product_id.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <Package className="w-10 h-10" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-[#222] mb-2">
                          {item.product_id?.name || "Premium Product"}
                        </h3>
                        <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#F10E7C] text-2xl">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-[#F10E7C]/10 border border-gray-100 shadow-sm">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-[#222] mb-2">
                        Order Items
                      </h3>
                      <p className="text-gray-400 font-bold text-sm uppercase tracking-wide">
                        Order #{payment.orderId.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#F10E7C] text-2xl">
                    ₦{payment.amount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-5 pt-10 border-t border-gray-200/50">
              <h3 className="text-xl font-black text-[#222] mb-6 uppercase tracking-wider">
                {orderData?.isContribution ? "Contribution Summary" : "Order Summary"}
              </h3>

              <SummaryRow
                label="Subtotal"
                value={`₦${payment.amount.toLocaleString()}`}
              />
              <SummaryRow label="Shipping" value="₦0.00" />
              <SummaryRow label="Tax" value="₦0.00" />
              <SummaryRow label="Store Views" value="1,234" />
              <SummaryRow label="Coupon Discount" value="-₦0.00" isDiscount />

              <div className="flex justify-between items-center pt-8 mt-8 border-t-2 border-dashed border-gray-200">
                <span className="text-2xl font-black text-[#222] uppercase tracking-tighter">
                  Total
                </span>
                <span className="text-4xl font-black text-[#F10E7C]">
                  ₦{payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => router.push(orderData?.isContribution ? "/cooperative/dashboard" : "/marketplace")}
            variant="outline"
            className="rounded-full px-12 py-6 border-gray-200 text-gray-600 font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
          >
            {orderData?.isContribution ? "Return to Dashboard" : "Continue Shopping"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center min-h-[100px] transition-all hover:border-[#F10E7C]/30">
      <span className="text-[10px] text-gray-400 uppercase font-black tracking-[0.15em] mb-2">
        {label}
      </span>
      <span className="text-base font-bold text-[#222] truncate">{value}</span>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  isDiscount,
}: {
  label: string;
  value: string;
  isDiscount?: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400 font-bold text-sm uppercase tracking-wide">
        {label}
      </span>
      <span
        className={`font-bold text-lg ${
          isDiscount ? "text-green-500" : "text-[#222]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
