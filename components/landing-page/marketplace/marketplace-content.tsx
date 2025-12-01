"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Adire Throw Pillow Set",
    price: 85.0,
    category: "HOME DECOR",
    description:
      "Set of 4 handcrafted throw pillows with traditional Adire patterns",
    image: "/pillow.png",
  },
  {
    id: 2,
    name: "Whipped Shea Butter (8oz)",
    price: 18.5,
    category: "BEAUTY",
    description: "Premium raw shea butter whipped with essential oils",
    image: "/shea.png",
  },
  {
    id: 3,
    name: "Modern Kitenge Blazer",
    price: 95.0,
    category: "CLOTHING",
    description: "Tailored blazer in vibrant Kitenge fabric",
    image: "/bash.png",
  },


  
  {
    id: 4,
    name: "Decorative Carved Calabash Bowl",
    price: 39.99,
    category: "HOME DECOR",
    description: "Hand-carved calabash bowl with intricate designs",
    image: "/suit.png",
  },
  {
    id: 5,
    name: "Adire Throw Pillow Set",
    price: 85.0,
    category: "HOME DECOR",
    description:
      "Set of 4 handcrafted throw pillows with traditional Adire patterns",
    image: "/pillow.png",
  },
  {
    id: 6,
    name: "Whipped Shea Butter (8oz)",
    price: 18.5,
    category: "BEAUTY",
    description: "Premium raw shea butter whipped with essential oils",
    image: "/shea.png",
  },
  {
    id: 7,
    name: "Modern Kitenge Blazer",
    price: 95.0,
    category: "CLOTHING",
    description: "Tailored blazer in vibrant Kitenge fabric",
    image: "/bash.png",
  },
  {
    id: 8,
    name: "Decorative Carved Calabash Bowl",
    price: 39.99,
    category: "HOME DECOR",
    description: "Hand-carved calabash bowl with intricate designs",
    image: "/suit.png",
  },
  {
    id: 9,
    name: "Adire Throw Pillow Set",
    price: 85.0,
    category: "HOME DECOR",
    description:
      "Set of 4 handcrafted throw pillows with traditional Adire patterns",
    image: "/pillow.png",
  },
  {
    id: 10,
    name: "Whipped Shea Butter (8oz)",
    price: 18.5,
    category: "BEAUTY",
    description: "Premium raw shea butter whipped with essential oils",
    image: "/shea.png",
  },
  {
    id: 11,
    name: "Modern Kitenge Blazer",
    price: 95.0,
    category: "CLOTHING",
    description: "Tailored blazer in vibrant Kitenge fabric",
    image: "/bash.png",
  },
  {
    id: 12,
    name: "Decorative Carved Calabash Bowl",
    price: 39.99,
    category: "HOME DECOR",
    description: "Hand-carved calabash bowl with intricate designs",
    image: "/suit.png",
  },
];

const categories = ["All Categories", "HOME DECOR", "BEAUTY", "CLOTHING"];

export function MarketplaceContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16 lg:my-18 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
          African Women Marketplace
        </h1>
        <p className="text-[#6b6b6b] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Discover authentic handcrafted products made by talented women
          entrepreneurs from across Africa.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-5 py-3 bg-white border border-[#e5e5e5] rounded-full text-sm font-medium text-[#222222] hover:border-[#d2d2d2] transition-colors"
          >
            {selectedCategory}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e5e5e5] rounded-xl shadow-lg z-10 overflow-hidden">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-[#f5f5f5] transition-colors ${
                    selectedCategory === category
                      ? "bg-[#f5f5f5] font-medium"
                      : "text-[#222222]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 pl-11 pr-4 py-3 bg-[#f5f5f5] rounded-full text-sm text-[#222222] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-[#f5f5f5]">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Category */}
              <span className="text-[10px] font-medium text-[#6b6b6b] tracking-wider mb-2">
                {product.category}
              </span>

              {/* Name and Price Row */}
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-sm text-[#222222] leading-tight">
                  {product.name}
                </h3>
                <span className="text-[#f10e7c] font-semibold text-sm whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#6b6b6b] text-xs leading-relaxed mb-4 flex-grow">
                {product.description}
              </p>

              {/* View Product Button */}
              <Link
                href={`/marketplace/${product.id}`}
                className="w-full py-3 bg-[#222222] text-white text-sm font-medium rounded-full hover:bg-[#333333] transition-colors text-center block"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-[#6b6b6b] text-lg">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              setSearchQuery("");
            }}
            className="mt-4 text-[#f10e7c] font-medium hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </section>
  );
}
