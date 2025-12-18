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

export function LoanList() {
  const [searchQuery, setSearchQuery] = useState("");

  // const { members, fetchAllMembers, loading, error } = useFetchMembers();

  // useEffect(() => {
  //   fetchAllMembers("6940311dd9b9141819c58938");
  // }, []);
  // console.log("members", members);
  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="border-b border-[#e4e7ec] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold text-[#1d1d2a]">
            Loan List
          </CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#838794]" />
              <Input
                type="text"
                placeholder="Search here..."
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
        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="border-b border-[#e4e7ec] bg-[#f9fafb]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  DAW-ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Reg. Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Total Sales
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {members.length > 0 ? (
                members.map((member, index) => (
                  <tr key={index} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-sm font-medium text-[#973bfe]">
                          M
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#1d1d2a]">
                            {member.name}
                          </p>
                          {member.description && (
                            <p className="text-xs text-[#838794]">
                              {member.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm text-[#1d1d2a]">{member.email}</p>
                        {member.emailSecondary && (
                          <p className="text-xs text-[#838794]">
                            {member.emailSecondary}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.role}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.regDate}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1d1d2a]">
                      {member.totalSales}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                          member.status
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Member</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-sm text-[#838794]"
                  >
                    No Members Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="divide-y divide-[#e4e7ec] lg:hidden">
          {members.map((member, index) => (
            <div key={index} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5e7eb] text-sm font-medium text-[#973bfe]">
                    M
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1d1d2a]">
                      {member.name}
                    </p>
                    {member.description && (
                      <p className="text-xs text-[#838794]">
                        {member.description}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-[#838794]">
                      {member.email}
                    </p>
                    {member.emailSecondary && (
                      <p className="text-xs text-[#838794]">
                        {member.emailSecondary}
                      </p>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Member</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[#838794]">ID: </span>
                  <span className="text-[#1d1d2a]">{member.id}</span>
                </div>
                <div>
                  <span className="text-[#838794]">Role: </span>
                  <span className="text-[#1d1d2a]">{member.role}</span>
                </div>
                <div>
                  <span className="text-[#838794]">Date: </span>
                  <span className="text-[#1d1d2a]">{member.regDate}</span>
                </div>
                <div>
                  <span className="text-[#838794]">Sales: </span>
                  <span className="font-medium text-[#1d1d2a]">
                    {member.totalSales}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                    member.status
                  )}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current"></span>
                  {member.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
