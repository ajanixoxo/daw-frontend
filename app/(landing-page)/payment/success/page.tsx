"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPayment } from "@/app/actions/checkout";
import { getOrder } from "@/app/actions/order";
import { IPaymentVerifyResponse } from "@/types/checkout.types";
import { IOrder } from "@/types/order.types";
import { Loader2, Check, Download, Package, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("ref");
  const [loading, setLoading] = useState(true);
  const [paymentData, setPaymentData] = useState<IPaymentVerifyResponse | null>(
    null
  );
  const [orderData, setOrderData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setError("No reference found");
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const result = await verifyPayment(reference);
        if (result.success && result.data) {
          setPaymentData(result.data);

          // Try to fetch order details to get items
          if (result.data.payment.orderId) {
            const orderResult = await getOrder(result.data.payment.orderId);
            if (orderResult.success) {
              setOrderData(orderResult.data);
            }
          }
        } else {
          setError(result.error || "Failed to verify payment");
        }
      } catch (err) {
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [reference]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD]">
        <Loader2 className="w-10 h-10 animate-spin text-[#F10E7C] mb-4" />
        <p className="text-gray-500 font-medium">Verifying your payment...</p>
      </div>
    );
  }

  if (error || !paymentData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] px-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Failed
          </h1>
          <p className="text-gray-600 mb-8">
            {error ||
              "We couldn't verify your payment. Please contact support if you were charged."}
          </p>
          <Button
            onClick={() => router.push("/marketplace")}
            className="w-full bg-[#222] hover:bg-[#333] text-white rounded-full py-6"
          >
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const { payment } = paymentData;
  // Use orderItems if available in orderData (some APIs return it even if not in type)
  const orderItems = (orderData as any)?.orderItems || [];

  return (
    <main className="min-h-screen bg-[#FDFDFD] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="relative mb-6">
            {/* Scalloped Circle SVG */}
            <div className="w-20 h-20 bg-[#F10E7C] rounded-full flex items-center justify-center shadow-lg shadow-[#F10E7C]/20 relative">
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-ping" />
              <Check className="w-10 h-10 text-white stroke-[3px]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#222] mb-3">
            Order Completed
          </h1>
          <p className="text-gray-500 text-lg">
            Thank you. Your Order has been received
          </p>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <InfoBox
            label="Order ID"
            value={`ORD-${payment.orderId.slice(-4).toUpperCase()}`}
          />
          <InfoBox label="Payment Method" value={payment.channel || "Card"} />
          <InfoBox
            label="Transaction ID"
            value={payment.transactionReference.slice(0, 10).toUpperCase()}
          />
          <InfoBox
            label="Est. Delivery Date"
            value={format(
              new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              "dd MMM yyyy"
            )}
          />
          <div className="col-span-2 md:col-span-1 flex items-end">
            <Button className="w-full bg-[#222] hover:bg-[#333] text-white rounded-xl h-[72px] flex flex-col items-center justify-center gap-1">
              <Download className="w-5 h-5" />
              <span className="text-[10px] font-medium">Download Invoice</span>
            </Button>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-50">
            <h2 className="text-2xl font-bold text-[#222]">Order Details</h2>
          </div>

          <div className="p-6 md:p-8">
            {/* Products Header */}
            <div className="flex justify-between mb-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
              <span>Products</span>
              <span>Sub Total</span>
            </div>

            {/* Product List */}
            <div className="space-y-6 mb-10">
              {orderItems.length > 0 ? (
                orderItems.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
                        {item.product_id?.images?.[0] ? (
                          <Image
                            src={item.product_id.images[0]}
                            alt={item.product_id.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#222] mb-1">
                          {item.product_id?.name || "Product"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-bold text-[#F10E7C] text-lg">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-[#F10E7C]/20">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#222] mb-1">
                        Order Items
                      </h3>
                      <p className="text-sm text-gray-500">
                        Order #{payment.orderId.slice(-6).toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-[#F10E7C] text-lg">
                    ₦{payment.amount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="space-y-4 pt-8 border-t border-gray-50">
              <h3 className="text-lg font-bold text-[#222] mb-4">
                Order Summary
              </h3>

              <SummaryRow
                label="Subtotal"
                value={`₦${payment.amount.toLocaleString()}`}
              />
              <SummaryRow label="Shipping" value="₦0.00" />
              <SummaryRow label="Tax" value="₦0.00" />
              <SummaryRow label="Store Views" value="1,234" />
              <SummaryRow label="Coupon Discount" value="-₦0.00" isDiscount />

              <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-50">
                <span className="text-xl font-bold text-[#222]">Total</span>
                <span className="text-2xl font-bold text-[#F10E7C]">
                  ₦{payment.amount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/marketplace">
            <Button
              variant="outline"
              className="rounded-full px-10 py-6 border-gray-200 text-gray-600 hover:bg-gray-50"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-center min-h-[72px]">
      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">
        {label}
      </span>
      <span className="text-sm font-bold text-[#222] truncate">{value}</span>
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
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span
        className={`font-semibold ${
          isDiscount ? "text-green-500" : "text-[#222]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FDFDFD]">
          <Loader2 className="w-10 h-10 animate-spin text-[#F10E7C]" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
