"use client";

import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { PaymentSuccess } from "@/components/landing-page/payment-success/payment-success";
import { Loader2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD]">
      <Header />
      <main className="flex-1 mt-12 flex items-center justify-center p-4 md:p-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-[#F10E7C]" />
            </div>
          }
        >
          <PaymentSuccess />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
