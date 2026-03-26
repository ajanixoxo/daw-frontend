"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { ProductGallery } from "@/components/landing-page/product/product-gallery";
import { ProductInfo } from "@/components/landing-page/product/product-info";
import type { IProduct } from "@/types/product.types";

interface ProductQuickViewModalProps {
  product: IProduct | null;
  onClose: () => void;
}

export function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  // Lock body scroll while open
  useEffect(() => {
    if (!product) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [product]);

  // Close on Escape key
  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Dimmed overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal panel */}
      <div
        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors shadow-sm"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Gallery */}
            <div className="w-full">
              <ProductGallery images={product.images || []} />
            </div>

            {/* Info */}
            <div className="w-full">
              <ProductInfo product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
