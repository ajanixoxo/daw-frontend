"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, Users, Building2 } from "lucide-react";
import Link from "next/link";

const cooperatives = [
  {
    id: 1,
    name: "Lagos Fashion Collective",
    description:
      "Empowering women through sustainable fashion and traditional textiles",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 45,
    location: "Lagos, Nigeria",
    verified: true,
  },
  {
    id: 2,
    name: "Nairobi Artisans Guild",
    description:
      "Handcrafted jewelry and accessories celebrating African heritage",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 38,
    location: "Nairobi, Kenya",
    verified: true,
  },
  {
    id: 3,
    name: "Accra Weavers Union",
    description:
      "Traditional kente weaving preserved through community cooperation",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 52,
    location: "Accra, Ghana",
    verified: true,
  },
  {
    id: 4,
    name: "Cape Town Creatives",
    description: "Contemporary African fashion with sustainable practices",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 67,
    location: "Cape Town, South Africa",
    verified: true,
  },
  {
    id: 5,
    name: "Addis Ababa Textiles",
    description:
      "Ethiopian cotton and traditional fabric production collective",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 41,
    location: "Addis Ababa, Ethiopia",
    verified: true,
  },
  {
    id: 6,
    name: "Dakar Design Collective",
    description: "Modern African designs blending tradition with innovation",
    image: "/pillow.png",
    categories: ["Fashion", "Textiles", "Accessories"],
    members: 33,
    location: "Dakar, Senegal",
    verified: true,
  },
];

const categories = [
  "All Categories",
  "Fashion",
  "Textiles",
  "Accessories",
  "Agriculture",
  "Beauty",
  "Home Decor",
];

export function CooperativesContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredCooperatives = cooperatives.filter((coop) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      coop.categories.includes(selectedCategory);
    const matchesSearch =
      coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-32 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#222222] mb-4">
          Join Our Cooperative Network
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Connect with women-led cooperatives across Africa and build a stronger
          community together
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4" />
          </button>
          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl ${
                    selectedCategory === category
                      ? "bg-gray-50 font-medium"
                      : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-auto sm:min-w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cooperatives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f10e7c]/20"
          />
        </div>
      </div>

      {/* Cooperatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCooperatives.map((coop) => (
          <div key={coop.id} className="flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
              <Image
                src={coop.image || "/placeholder.svg"}
                alt={coop.name}
                fill
                className="object-cover"
              />
              {coop.verified && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full text-xs font-medium text-green-500">
                  Verified
                </span>
              )}
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {coop.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Content */}
            <h3 className="font-semibold text-[#222222] mb-1">{coop.name}</h3>
            <p className="text-gray-500 text-sm mb-4 leading-relaxed">
              {coop.description}
            </p>

            {/* Members & Location */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{coop.members} Members</span>
              </div>
              <span>{coop.location}</span>
            </div>

            {/* Join Button */}

            <Link href="/cooperatives/join">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#333333] text-white rounded-full text-sm font-medium hover:bg-[#222222] transition-colors">
                <Building2 className="w-4 h-4" />
                Join Cooperative
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCooperatives.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">
            No cooperatives found matching your criteria.
          </p>
        </div>
      )}
    </section>
  );
}
