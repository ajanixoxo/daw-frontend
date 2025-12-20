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

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square md:aspect-auto md:h-[600px] bg-[#f5f5f5] rounded-2xl flex items-center justify-center text-gray-400">
        No images
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails - Vertical on Desktop, Horizontal on Mobile */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all",
              selectedImage === image
                ? "border-[#f10e7c]"
                : "border-transparent hover:border-gray-200"
            )}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square md:aspect-auto md:h-[600px] bg-[#f5f5f5] rounded-2xl overflow-hidden">
        <Image
          src={selectedImage || images[0]}
          alt="Product main image"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
