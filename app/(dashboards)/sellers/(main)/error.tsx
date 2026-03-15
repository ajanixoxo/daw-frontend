"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SellersDashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Seller dashboard error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-[#e7e8e9] bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-semibold text-[#1d1d2a]">Seller dashboard error</h1>
        <p className="mt-3 text-sm text-[#667185]">
          We hit a temporary issue while loading this dashboard view.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button onClick={reset} className="bg-[#f10e7c] text-white hover:bg-[#d80d6f]">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button asChild variant="outline">
            <Link href="/sellers/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
