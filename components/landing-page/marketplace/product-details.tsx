"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronUp, ChevronDown, Minus, Plus, Heart, ShoppingCart, Play, Check } from "lucide-react"
import { type Product, getRelatedProducts } from "@/lib/products-data"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(5)
  const [activeTab, setActiveTab] = useState<"descriptions" | "feedback">("descriptions")

  const relatedProducts = getRelatedProducts(product.id, product.category)
  const images = product.images || [product.image]

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-8 md:py-12 lg:py-24 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#222222] mb-2">Details</h1>
        <p className="text-[#6b6b6b] text-sm">
          <Link href="/marketplace" className="hover:text-[#f10e7c]">
            Marketplace
          </Link>
          {" / "}
          <span>Product Details</span>
        </p>
      </div>

      {/* Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
        {/* Image Gallery */}
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={handlePrevImage}
              className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-[#222222] transition-colors"
            >
              <ChevronUp className="w-5 h-5" />
            </button>

            <div className="flex flex-col gap-2">
              {images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? "border-[#f10e7c]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNextImage}
              className="w-8 h-8 flex items-center justify-center text-[#6b6b6b] hover:text-[#222222] transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image */}
          <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-[#f5f5f5]">
            <Image
              src={images[selectedImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Title and Stock Badge */}
          <div className="flex items-start gap-3 mb-3">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#222222]">{product.name}</h2>
            {product.inStock && (
              <span className="px-3 py-1 bg-[#22c55e] text-white text-xs font-medium rounded-full whitespace-nowrap">
                In Stock
              </span>
            )}
          </div>

          {/* Rating and SKU */}
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < (product.rating || 0) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-[#6b6b6b] ml-1">{product.reviews} Review</span>
            </div>
            <span className="text-[#6b6b6b]">SKU: {product.sku}</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            {product.originalPrice && (
              <span className="text-[#9ca3af] line-through text-lg">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-[#f10e7c] text-2xl md:text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.discount && (
              <span className="px-2 py-1 bg-[#f10e7c] text-white text-xs font-medium rounded">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Seller and Share */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-[#6b6b6b]">
              Seller: <span className="text-[#222222]">{product.seller}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#6b6b6b]">Share Item:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-[#f10e7c] text-white flex items-center justify-center hover:bg-[#d10c6a] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#e5e5e5] text-[#222222] flex items-center justify-center hover:bg-[#d2d2d2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#e5e5e5] text-[#222222] flex items-center justify-center hover:bg-[#d2d2d2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z" />
                  </svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#e5e5e5] text-[#222222] flex items-center justify-center hover:bg-[#d2d2d2] transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Short Description */}
          <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">
            {product.description}, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et
            ipsum. Nulla varius magna a consequat pulvinar.
          </p>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center border border-[#e5e5e5] rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#6b6b6b] hover:text-[#222222] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium text-[#222222]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#6b6b6b] hover:text-[#222222] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#222222] text-white font-medium rounded-full hover:bg-[#333333] transition-colors">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>

            <button className="w-12 h-12 flex items-center justify-center bg-[#f10e7c] text-white rounded-xl hover:bg-[#d10c6a] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Category and Tags */}
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-[#6b6b6b]">Category:</span>{" "}
              <span className="text-[#222222]">{product.category}</span>
            </p>
            <p className="flex items-center gap-2 flex-wrap">
              <span className="text-[#6b6b6b]">Tag:</span>
              {product.tags?.map((tag, index) => (
                <span key={tag}>
                  <Link href="#" className={tag === "Chinese" ? "text-[#222222] underline" : "text-[#6b6b6b]"}>
                    {tag}
                  </Link>
                  {index < (product.tags?.length || 0) - 1 && " "}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-12">
        <div className="flex gap-8 border-b border-[#e5e5e5] mb-8">
          <button
            onClick={() => setActiveTab("descriptions")}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === "descriptions"
                ? "text-[#222222] border-b-2 border-[#222222]"
                : "text-[#6b6b6b] hover:text-[#222222]"
            }`}
          >
            Descriptions
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === "feedback"
                ? "text-[#222222] border-b-2 border-[#222222]"
                : "text-[#6b6b6b] hover:text-[#222222]"
            }`}
          >
            Customer Feedback
          </button>
        </div>

        {activeTab === "descriptions" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Description Text */}
            <div>
              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">{product.fullDescription}</p>
              <p className="text-[#6b6b6b] text-sm leading-relaxed mb-6">
                Nulla mauris tellus, feugiat quis pharetra sed, gravida ac dui. Sed lacus, metus faucibus elementum
                tincidunt, turpis mi viverra velit, pellentesque tristique neque mi eget nulla. Proin luctus elementum
                neque et pharetra.
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {product.features?.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                    <span className="text-[#6b6b6b] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <p className="text-[#6b6b6b] text-sm leading-relaxed">
                Cras et diam maximus, accumsan sapien et, sollicitudin velit. Nulla blandit eros non turpis lobortis
                iaculis ut ut massa.
              </p>
            </div>

            {/* Specs and Video */}
            <div>
              {/* Specs Table */}
              <div className="space-y-4 mb-8">
                <div className="flex">
                  <span className="w-28 text-[#6b6b6b] text-sm">Weight:</span>
                  <span className="text-[#222222] text-sm">{product.weight}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#6b6b6b] text-sm">Color:</span>
                  <span className="text-[#222222] text-sm">{product.color}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#6b6b6b] text-sm">Type:</span>
                  <span className="text-[#222222] text-sm">{product.type}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#6b6b6b] text-sm">Category:</span>
                  <span className="text-[#222222] text-sm">
                    {product.category === "HOME DECOR" ? "Home decor" : product.category}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#6b6b6b] text-sm">Stock Status:</span>
                  <span className="text-[#222222] text-sm">
                    {product.stockStatus} ({product.stockCount?.toLocaleString()})
                  </span>
                </div>
                <div className="flex flex-wrap">
                  <span className="w-28 text-[#6b6b6b] text-sm">Tags:</span>
                  <span className="text-sm">
                    {product.tags?.map((tag, index) => (
                      <span key={tag}>
                        <Link href="#" className={tag === "Chinese" ? "text-[#222222] underline" : "text-[#6b6b6b]"}>
                          {tag}
                        </Link>
                        {index < (product.tags?.length || 0) - 1 && ", "}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Video Thumbnail */}
              <div className="relative rounded-2xl overflow-hidden bg-[#f5f5f5] aspect-video">
                <Image src={product.image || "/placeholder.svg"} alt="Product video" fill className="object-cover" />
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#222222] ml-1" fill="currentColor" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="text-center py-12">
            <p className="text-[#6b6b6b]">No customer feedback yet. Be the first to review this product!</p>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#222222] text-center mb-8">Related Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="flex flex-col">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#f5f5f5]">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Category */}
              <span className="text-[10px] font-medium text-[#6b6b6b] tracking-wider mb-2">
                {relatedProduct.category}
              </span>

              {/* Name and Price Row */}
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-sm text-[#222222] leading-tight">{relatedProduct.name}</h3>
                <span className="text-[#f10e7c] font-semibold text-sm whitespace-nowrap">
                  ${relatedProduct.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#6b6b6b] text-xs leading-relaxed mb-4 flex-grow">{relatedProduct.description}</p>

              {/* Add to Cart Button */}
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#222222] text-white text-sm font-medium rounded-full hover:bg-[#333333] transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Explore Marketplace Link */}
        <div className="text-center">
          <Link href="/marketplace" className="text-[#f10e7c] font-medium hover:underline">
            Explore Marketplace
          </Link>
        </div>
      </div>
    </section>
  )
}
