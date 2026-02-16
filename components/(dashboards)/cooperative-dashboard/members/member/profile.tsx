"use client";

import { Heart, Share2, Star, Mail, Phone } from "lucide-react";

type MemberProfileProps = {
  name: string;
  description: string;
  rating: number;
  location: string;
  memberSince: string;
  email: string;
  phone: string;
  status: string;
};

export function MemberProfile({
  name,
  description,
  rating,
  location,
  memberSince,
  email,
  phone,
  status,
}: MemberProfileProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#e4e7ec] bg-white p-6 shadow-sm my-4">
      {/* LEFT */}
      <div className="flex items-center gap-6">
        {/* Avatar */}
        <div className="h-25 w-25 rounded-2xl bg-[#f10e7c]" />

        {/* Info */}
        <div>
          <h2 className="text-xl font-semibold text-[#1d1d2a]">{name}</h2>
          <p className="mt-1 text-sm text-[#838794]">{description}</p>

          {/* Meta */}
          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-[#475467]">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-[#838794]">/ 5.0</span>
            </div>

            <span>• {location}</span>
            <span>• Member since {memberSince}</span>
          </div>

          {/* Contact */}
          <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-[#475467]">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{email}</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col  items-center gap-8">
        {/* Status */}
        <span className="rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
          {status} Seller
        </span>

{/* <div className="space-x-3"> 
  
        <button className="rounded-lg border border-[#e4e7ec] p-2 hover:bg-[#f9fafb]">
          <Heart className="h-5 w-5 text-[#475467]" />
        </button>

        <button className="rounded-lg border border-[#e4e7ec] p-2 hover:bg-[#f9fafb]">
          <Share2 className="h-5 w-5 text-[#475467]" />
        </button>
        
        </div>
        */}
      </div>
    </div>
  );
}
