"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0);

  // Default images if empty/provided
  const defaultImages =
    images.length > 0 ? images : ["/placeholder-product.jpg"];
  const displayImages = defaultImages;
  const maxVisible = 4;

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      Math.min(displayImages.length - maxVisible, prev + 1),
    );
  };

  const visibleImages = displayImages.slice(
    startIndex,
    startIndex + maxVisible,
  );

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 lg:gap-8 w-full">
      {/* Thumbnails Column (Desktop) */}
      <div className="hidden md:flex flex-col items-center gap-4 min-w-[100px]">
        {/* Up Arrow */}
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={cn(
            "p-1 text-gray-400 transition-colors",
            startIndex === 0
              ? "opacity-30 cursor-not-allowed"
              : "hover:text-black cursor-pointer",
          )}
        >
          <ChevronUp className="w-6 h-6" strokeWidth={1.5} />
        </button>

        <div className="flex flex-col gap-4">
          {visibleImages.map((image, index) => {
            const actualIndex = startIndex + index;
            return (
              <button
                key={actualIndex}
                onClick={() => setSelectedImage(image)}
                className={cn(
                  "relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden transition-all border-2",
                  selectedImage === image ||
                    (index === 0 && !selectedImage && actualIndex === 0)
                    ? "border-black/5 shadow-sm opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0",
                )}
              >
                <Image
                  src={image}
                  alt={`Product thumbnail ${actualIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            );
          })}
          {/* Space Fills for consistent height if fewer images */}
          {visibleImages.length < maxVisible &&
            Array.from({ length: maxVisible - visibleImages.length }).map(
              (_, i) => (
                <div key={`empty-${i}`} className="w-24 h-24 bg-transparent" />
              ),
            )}
        </div>

        {/* Down Arrow */}
        <button
          onClick={handleNext}
          disabled={startIndex >= displayImages.length - maxVisible}
          className={cn(
            "p-1 text-gray-400 transition-colors",
            startIndex >= displayImages.length - maxVisible
              ? "opacity-30 cursor-not-allowed"
              : "hover:text-black cursor-pointer",
          )}
        >
          <ChevronDown className="w-6 h-6" strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square md:aspect-[4/3] lg:aspect-square bg-[#f5f5f5] rounded-[32px] overflow-hidden shadow-sm">
        <Image
          src={selectedImage || displayImages[0]}
          alt="Product main image"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Mobile Thumbnails Row (Visible only on mobile) */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-4 scrollbar-hide px-1">
        {displayImages.map((image, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative w-20 h-20 shrink-0 rounded-xl overflow-hidden transition-all border-2",
              selectedImage === image
                ? "border-black shadow-sm"
                : "border-transparent opacity-80",
            )}
          >
            <Image
              src={image}
              alt={`Thumb ${i}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
