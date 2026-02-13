"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchMembers } from "@/hooks/useMember";

const members = [
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Shipped",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Cancelled",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Pending",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Shipped",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Pending",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Shipped",
  },
  {
    id: "DAW001",
    name: "Amina Hassan",
    email: "princewillfavour17@gmail.com",
    role: "Seller",
    regDate: "7 Apr, 2025",
    totalSales: "$127.70",
    status: "Pending",
  },
  {
    id: "20",
    name: "Lagos Artisan Network",
    description: "Supporting local artisans...",
    email: "Favour Princewill",
    emailSecondary: "princewillfavour17@gmail.com",
    role: "Lagos, NG",
    regDate: "$120,000.00",
    totalSales: "Shirt",
    status: "Cancelled",
  },
  {
    id: "20",
    name: "Lagos Artisan Network",
    description: "Supporting local artisans...",
    email: "Favour Princewill",
    emailSecondary: "princewillfavour17@gmail.com",
    role: "Lagos, NG",
    regDate: "$120,000.00",
    totalSales: "Shirt",
    status: "Shipped",
  },
  {
    id: "20",
    name: "Lagos Artisan Network",
    description: "Supporting local artisans...",
    email: "Favour Princewill",
    emailSecondary: "princewillfavour17@gmail.com",
    role: "Lagos, NG",
    regDate: "$120,000.00",
    totalSales: "Shirt",
    status: "Pending",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Shipped":
      return "bg-[#e7f6ec] text-[#009a49]";
    case "Cancelled":
      return "bg-[#ffeaea] text-[#d92d20]";
    case "Pending":
      return "bg-[#fff4e6] text-[#f5b546]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function ContributionList({ memberId }: { memberId?: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      if (!memberId) return;
      try {
        setLoading(true);
        // Dynamically import to avoid circular dependencies if any, though likely safe
        const { getMemberContributions } = await import("@/app/actions/contributions");
        const result = await getMemberContributions(memberId);
        if (result.success && result.data) {
          setContributions(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch member contributions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, [memberId]);

  const filteredContributions = contributions.filter((c) =>
    c.type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="border-b border-[#e4e7ec] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold text-[#1d1d2a]">
            Contribution History
          </CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#838794]" />
              <Input
                type="text"
                placeholder="Search type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-[#e4e7ec] pl-10 focus-visible:ring-[#f10e7c]"
              />
            </div>
            <Button
              variant="outline"
              className="border-[#e4e7ec] bg-white hover:bg-[#f5f5f5]"
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="border-b border-[#e4e7ec] bg-[#f9fafb]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">Type</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">Date</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center">Loading...</td>
                </tr>
              ) : filteredContributions.length > 0 ? (
                filteredContributions.map((contribution, index) => (
                  <tr key={index} className="hover:bg-[#f9fafb]">
                     <td className="px-6 py-4 text-sm text-[#1d1d2a]">{contribution.type}</td>
                     <td className="px-6 py-4 text-sm font-medium text-[#1d1d2a]">₦{contribution.amount?.toLocaleString()}</td>
                     <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                       {new Date(contribution.date).toLocaleDateString()}
                     </td>
                     <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(contribution.status)}`}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        {contribution.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-[#838794]">No Contributions Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile View */}
        <div className="divide-y divide-[#e4e7ec] lg:hidden">
          {loading ? (
             <div className="p-4 text-center">Loading...</div>
          ) : filteredContributions.length > 0 ? (
            filteredContributions.map((contribution, index) => (
              <div key={index} className="p-4">
                 <div className="flex justify-between mb-2">
                    <span className="font-medium text-[#1d1d2a]">{contribution.type}</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(contribution.status)}`}>
                        {contribution.status}
                    </span>
                 </div>
                 <div className="flex justify-between text-sm text-[#838794]">
                    <span>₦{contribution.amount?.toLocaleString()}</span>
                    <span>{new Date(contribution.date).toLocaleDateString()}</span>
                 </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-[#838794]">No Contributions Found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
