"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";
import { ProductGallery } from "@/components/landing-page/product/product-gallery";
import { ProductInfo } from "@/components/landing-page/product/product-info";
import { ProductTabs } from "@/components/landing-page/product/product-tabs";
import { useProduct } from "@/hooks/useProducts";
import { Loader2 } from "lucide-react";
import type { IProduct } from "@/types/product.types";

// Demo data for fallback or initial render
const demoProduct: IProduct = {
  _id: "69103793e11630099f8e8f19",
  shop_id: "demo-shop",
  name: "Adire Throw Pillow Set",
  quantity: 50,
  price: 85.0,
  images: [
    "/placeholder-pillow-1.jpg",
    "/placeholder-pillow-2.jpg",
    "/placeholder-pillow-3.jpg",
    "/placeholder-pillow-4.jpg",
  ],
  status: "available",
  description:
    "Set of 4 handcrafted throw pillows with traditional Adire patterns, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.",
  category: "HOME DECOR",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, error } = useProduct(productId);

  // Use demo product if loading fails or for development
  const displayProduct = product || demoProduct;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#F10E7C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb or Back Link could go here */}

          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl font-medium text-[#222] mb-2">
              Details
            </h1>
            <p className="text-sm text-gray-500">
              Marketplace / Product Details
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            <ProductGallery
              images={
                displayProduct.images.length > 0
                  ? displayProduct.images
                  : ["/placeholder-product.jpg"]
              }
            />
            <ProductInfo product={displayProduct} />
          </div>

          <ProductTabs
            description={displayProduct.description}
            productId={displayProduct._id}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
