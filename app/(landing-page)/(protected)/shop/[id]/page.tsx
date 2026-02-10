"use client";

import { useGetShop } from "@/hooks/useShop";
import { useProductsByShop } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  Store,
  MapPin,
  Calendar,
  Star,
  Heart,
  Share2,
  Package,
  ShoppingCart,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAddToCart } from "@/hooks/useCart";
import { clientApiClient, API_ENDPOINTS } from "@/lib/api/client-client";
import Header from "@/components/Header";
import Footer from "@/components/landing-page/cooperatives/Footer";

export default function ShopDetailsPage() {
  const params = useParams();
  const shopId = params.id as string;

  const { data: shop, isLoading: isShopLoading } = useGetShop(shopId);
  const { data: products, isLoading: isProductsLoading } =
    useProductsByShop(shopId);

  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("products");

  // Track shop view on mount (fire-and-forget)
  useEffect(() => {
    if (shopId) {
      clientApiClient.post(API_ENDPOINTS.SHOPS.TRACK_VIEW(shopId)).catch(() => {});
    }
  }, [shopId]);

  if (isShopLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] pt-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
        </div>
        <Footer />
      </>
    );
  }

  if (!shop) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] pt-24 text-center">
          <Store className="w-12 h-12 text-[#98A2B3] mb-4" />
          <h2 className="text-xl font-semibold text-[#101828]">Shop Not Found</h2>
          <Link href="/all-shops">
            <Button className="mt-4 bg-[#f10e7c] hover:bg-[#d90d6a]">
              Back to Shops
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const memberSince = new Date(shop.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const productCount = products?.length || 0;

  const handleAddToCart = (productId: string) => {
    setAddingProductId(productId);
    addToCart(
      { productId, quantity: 1 },
      {
        onSettled: () => setAddingProductId(null),
      },
    );
  };

  const filteredProducts =
    products?.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  return (
    <>
    <Header />
    <main className="min-h-screen bg-[#F9FAFB] pt-24 pb-20">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[84px] py-8 space-y-8">
        {/* Banner Section */}
        <div className="relative h-[240px] md:h-[320px] w-full rounded-2xl overflow-hidden shadow-sm bg-[#f2e8ed]">
          {shop.banner_url ? (
            <Image
              src={shop.banner_url}
              alt="Shop Banner"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-[#f10e7c]/20 to-[#f10e7c]/5 flex items-center justify-center">
              <Store className="w-12 h-12 text-[#f10e7c]/30" />
            </div>
          )}
        </div>

        {/* Shop Profile Card */}
        <div className="bg-white rounded-2xl border border-[#EAECF0] p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-2xl bg-[#f2e8ed] flex items-center justify-center overflow-hidden border border-[#EAECF0]">
                {shop.logo_url ? (
                  <Image
                    src={shop.logo_url}
                    alt="Shop Logo"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Store className="w-12 h-12 text-[#f10e7c]" />
                )}
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 w-full pt-1">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#101828]">
                      {shop.name}
                    </h1>
                    {shop.status === "active" && (
                      // Assuming verified badge logic, mimicking the screenshot
                      <Badge
                        variant="secondary"
                        className="bg-[#fcebf5] text-[#f10e7c] hover:bg-[#fcebf5] border-none font-medium px-2.5 py-0.5 rounded-full text-xs"
                      >
                        Verified
                      </Badge>
                    )}
                  </div>

                  <p className="text-[#475467] text-[15px] max-w-2xl">
                    {shop.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#475467]">
                    {/* Mock Rating if unavailable */}
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-[#FDB022] fill-[#FDB022]" />
                      <span className="font-semibold text-[#101828]">4.6</span>
                      <span className="text-[#98A2B3]">/5.0</span>
                    </div>
                    {shop.business_address && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-[#98A2B3]" />
                        <span>{shop.business_address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#98A2B3]" />
                      <span>Member since {memberSince}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <div className="flex items-center gap-2">
                      {/* Mock Sales Data if not available logic */}
                      <span className="font-bold text-[#f10e7c] flex items-center gap-1">
                        <div className="h-4 w-1 bg-[#f10e7c] rounded-full" />
                        2000
                      </span>
                      <span className="text-[#475467] text-sm">Sales</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#f10e7c]" />
                      <span className="font-bold text-[#101828]">
                        {productCount}
                      </span>
                      <span className="text-[#475467] text-sm">Products</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-1 self-start">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-transparent border border-[#EAECF0] hover:bg-[#fff5f9] text-[#667085] hover:text-[#f10e7c] rounded-full h-11 w-11"
                  >
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-transparent border border-[#EAECF0] hover:bg-[#fff5f9] text-[#667085] hover:text-[#f10e7c] rounded-full h-11 w-11"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-[#EAECF0]">
            <button
              onClick={() => setActiveTab("products")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "products" ? "border-[#f10e7c] text-[#f10e7c]" : "border-transparent text-[#667085] hover:text-[#344054]"}`}
            >
              Products{" "}
              <Badge className="ml-1 bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-2 py-0.5 text-xs">
                {productCount}
              </Badge>
            </button>
            <button
              onClick={() => setActiveTab("about")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "about" ? "border-[#f10e7c] text-[#f10e7c]" : "border-transparent text-[#667085] hover:text-[#344054]"}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "reviews" ? "border-[#f10e7c] text-[#f10e7c]" : "border-transparent text-[#667085] hover:text-[#344054]"}`}
            >
              Reviews{" "}
              <Badge className="ml-1 bg-[#F2F4F7] text-[#344054] hover:bg-[#F2F4F7] rounded-full px-2 py-0.5 text-xs">
                127
              </Badge>
            </button>
          </div>

          {activeTab === "products" && (
            <div className="space-y-6">
              {/* Search Row */}
              <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Left Filters */}
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    className="rounded-full border-[#D0D5DD] text-[#344054] h-9 text-sm px-4 whitespace-nowrap gap-2"
                  >
                    <span className="rotate-90 text-xs">I I I</span> All Filter
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#D0D5DD] text-[#344054] h-9 text-sm px-4 whitespace-nowrap gap-2"
                  >
                    Price <span className="text-[10px]">▼</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#D0D5DD] text-[#344054] h-9 text-sm px-4 whitespace-nowrap gap-2"
                  >
                    Shop <span className="text-[10px]">▼</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-[#D0D5DD] text-[#344054] h-9 text-sm px-4 whitespace-nowrap gap-2"
                  >
                    Cooperative <span className="text-[10px]">▼</span>
                  </Button>
                </div>

                {/* Right Controls */}
                <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-[280px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
                    <Input
                      placeholder="Search products..."
                      className="pl-9 bg-[#F9FAFB] border-[#EAECF0] rounded-full h-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[160px] rounded-full border-[#EAECF0] h-10">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="fashion">Fashion</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="secondary"
                    className="bg-[#fcebf5] text-[#344054] hover:bg-[#fcebf5] rounded-full px-3 py-1 font-normal text-xs gap-1 cursor-pointer"
                  >
                    Handcrafted Goods{" "}
                    <span className="text-[#98A2B3] ml-1">×</span>
                  </Badge>
                  <span className="text-[#667085] hidden sm:inline-block">
                    {filteredProducts.length} results Found
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[#667085]">Sort By</span>
                  <div className="flex bg-white border border-[#D0D5DD] rounded-full p-1">
                    <button className="px-3 py-1 bg-[#fcebf5] text-[#f10e7c] rounded-full text-xs font-medium">
                      Best Match
                    </button>
                    <button className="px-3 py-1 text-[#667085] hover:text-[#344054] rounded-full text-xs font-medium">
                      Orders
                    </button>
                    <button className="px-3 py-1 text-[#667085] hover:text-[#344054] rounded-full text-xs font-medium">
                      Price
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {isProductsLoading ? (
                <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-[#f10e7c]" />
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white rounded-2xl p-4 border border-[#F2F4F7] hover:shadow-lg transition-shadow group"
                    >
                      <div className="relative aspect-square rounded-xl bg-[#F2F4F7] mb-3 overflow-hidden">
                        {product.images?.[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-[#98A2B3]">
                            <Package className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1 mb-3">
                        <p className="text-[10px] uppercase font-semibold text-[#98A2B3]">
                          {product.category || "FASHION"}
                        </p>
                        <h3 className="text-sm font-semibold text-[#101828] line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#667085] line-clamp-2 min-h-[32px]">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#f10e7c] text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <Button
                        className="w-full mt-3 bg-[#101828] hover:bg-[#2d3a4f] text-white rounded-full h-10 text-xs font-medium"
                        onClick={() => handleAddToCart(product._id)}
                        disabled={
                          isAddingToCart && addingProductId === product._id
                        }
                      >
                        {isAddingToCart && addingProductId === product._id ? (
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                        ) : (
                          <ShoppingCart className="w-3 h-3 mr-2" />
                        )}
                        Add to Cart
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl border border-[#EAECF0] border-dashed">
                  <Package className="w-12 h-12 text-[#98A2B3] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-[#101828]">
                    No products found
                  </h3>
                  <p className="text-[#667085]">
                    Try adjusting your search filters
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="bg-white rounded-2xl p-8 border border-[#EAECF0] text-center text-[#667085]">
              <Store className="w-12 h-12 text-[#98A2B3] mx-auto mb-4" />
              <p>About section content coming soon...</p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white rounded-2xl p-8 border border-[#EAECF0] text-center text-[#667085]">
              <Star className="w-12 h-12 text-[#98A2B3] mx-auto mb-4" />
              <p>Reviews section content coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
