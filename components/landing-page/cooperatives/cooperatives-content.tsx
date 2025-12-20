"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Search, Users, Building2, X } from "lucide-react";
import { useCooperative } from "@/hooks/useJoinCooperative";

const categories = [
  "All Categories",
  "Fashion",
  "Textiles",
  "Accessories",
  "Agriculture",
  "Beauty",
  "Home Decor",
  "DAW",
];

export function CooperativesContent() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCooperative, setSelectedCooperative] = useState<any | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    join,
    isJoining,
    joinError,
    cooperatives,
    loadCooperatives,
    isLoadingCooperatives,
    cooperativesError,
  } = useCooperative();

  useEffect(() => {
    loadCooperatives();
  }, []);

  const filteredCooperatives = cooperatives.filter((coop: any) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      coop.category === selectedCategory;

    const matchesSearch =
      coop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coop.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleJoinClick = (coop: any) => {
    setSelectedCooperative(coop);
    setIsModalOpen(true);
  };

  const handleTierSelect = async (tierId: string) => {
    if (!selectedCooperative) return;

    await join({
      cooperativeId: selectedCooperative._id,
      subscriptionTierId: tierId,
    });

    setIsModalOpen(false);
    setSelectedCooperative(null);
  };

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
            className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50"
          >
            {selectedCategory}
            <ChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 ${
                    selectedCategory === category ? "font-medium" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full sm:min-w-[400px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cooperatives..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#f5f5f5] rounded-full text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Loading & Error */}
      {isLoadingCooperatives && (
        <p className="text-center text-gray-500">Loading cooperatives...</p>
      )}

      {cooperativesError && (
        <p className="text-center text-red-500">{cooperativesError}</p>
      )}

      {/* Cooperatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCooperatives.map((coop: any) => (
          <div key={coop._id} className="flex flex-col">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
              <Image
                src="/pillow.png"
                alt={coop.name}
                fill
                className="object-cover"
              />
            </div>

            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs w-fit mb-2">
              {coop.category}
            </span>

            <h3 className="font-semibold text-[#222222] mb-1">{coop.name}</h3>

            <p className="text-gray-500 text-sm mb-4">{coop.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{coop.members?.length || 0} Members</span>
              </div>
            </div>

            <button
              onClick={() => handleJoinClick(coop)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#333333] text-white rounded-full hover:bg-[#222222]"
            >
              <Building2 className="w-4 h-4" />
              Join Cooperative
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCooperatives.length === 0 && !isLoadingCooperatives && (
        <div className="text-center py-16 text-gray-500">
          No cooperatives found
        </div>
      )}

      {isModalOpen && selectedCooperative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-5xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Select Subscription Tier
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
              {selectedCooperative.subscriptionTiers.map((tierId: string) => (
                <div
                  key={tierId}
                  onClick={() => handleTierSelect(tierId)}
                  className="flex-1 border rounded-2xl p-4 cursor-pointer hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg">Tier</h3>
                  <p className="text-sm text-gray-500 break-all mt-1">
                    {tierId}
                  </p>

                  <button
                    disabled={isJoining}
                    className="mt-6 w-full bg-[#333333] text-white py-2 rounded-full hover:bg-[#222222]"
                  >
                    {isJoining ? "Joining..." : "Select Tier"}
                  </button>
                </div>
              ))}
            </div>

            {joinError && (
              <p className="text-center text-red-500 mt-4">{joinError}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
