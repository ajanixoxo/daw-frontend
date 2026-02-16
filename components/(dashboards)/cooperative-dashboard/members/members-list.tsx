"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  getAllCooperativeMembers,
  CooperativeMember,
} from "@/app/actions/cooperative-dashboard";

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-[#d4f4dd] text-[#009a49]";
    case "suspended":
      return "bg-[#ffeaea] text-[#d92d20]";
    case "invited":
      return "bg-[#fff4e6] text-[#f5b546]";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function MembersList() {
  const router = useRouter();
  const [members, setMembers] = useState<CooperativeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const result = await getAllCooperativeMembers();

        if (result.success && result.data) {
          console.log("MembersList fetched members:", result.data.length);
          if (result.data.length > 0) {
            console.log("First member:", result.data[0]);
          }
          setMembers(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch members");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Filter members based on search query and status
  const filteredMembers = members.filter((member) => {
    const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
    const email = member.email.toLowerCase();
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = fullName.includes(query) || email.includes(query);
    const matchesStatus = statusFilter === "all" || member.status?.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (error) {
    return (
      <Card className="border-[#e4e7ec] bg-white">
        <CardContent className="p-6">
          <p className="text-sm text-red-600">
            Error loading members: {error}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="border-b border-[#e4e7ec] px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold text-[#1d1d2a]">
            Member List
          </CardTitle>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#838794]" />
              <Input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-[#e4e7ec] pl-10 focus-visible:ring-[#f10e7c]"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-[#e4e7ec] bg-white hover:bg-[#f5f5f5]"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={statusFilter} onValueChange={setStatusFilter}>
                  <DropdownMenuRadioItem value="all">All Statuses</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="active">Active</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="suspended">Suspended</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="invited">Invited</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Subscription Tier
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Contribution
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Reg. Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-[#838794]">
                  Status
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </td>
                    <td className="px-6 py-4" />
                  </tr>
                ))
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-12 text-center text-sm text-[#838794]"
                  >
                    No members found
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.memberId} className="hover:bg-[#f9fafb]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8f1] text-sm font-medium text-[#f10e7c]">
                          {member.firstName?.[0] || "M"}
                        </div>
                        <p className="text-sm font-medium text-[#1d1d2a]">
                          {member.firstName} {member.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.subscriptionTier}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1d1d2a]">
                      ₦{member.monthlyContribution.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {formatDate(member.joinDate)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${getStatusColor(member.status)} hover:${getStatusColor(member.status)}`}
                      >
                        {member.status}
                      </Badge>
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
                          <DropdownMenuItem
                            disabled={!member.memberId}
                            onClick={() => {
                              if (member.memberId) {
                                router.push(`/cooperative/members/${member.memberId}`);
                              } else {
                                console.error("Cannot navigate, memberId is missing", member);
                              }
                            }}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={async () => {
                              if (!member.memberId) return;
                              if (confirm("Are you sure you want to remove this member? This action cannot be undone.")) {
                                try {
                                  const { removeMemberAction } = await import("@/app/actions/cooperative-dashboard");
                                  const result = await removeMemberAction(member.memberId);
                                  if (result.success) {
                                    // Optionally refresh list or remove from state
                                    setMembers(prev => prev.filter(m => m.memberId !== member.memberId));
                                  } else {
                                    alert(result.error);
                                  }
                                } catch (err) {
                                  alert("Failed to remove member");
                                }
                              }
                            }}
                          >
                            Remove Member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="space-y-4 p-4 lg:hidden">
          {loading ? (
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-[#e4e7ec] p-4 animate-pulse"
              >
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#838794]">
              No members found
            </div>
          ) : (
            filteredMembers.map((member) => (
              <div
                key={member.memberId}
                className="rounded-lg border border-[#e4e7ec] p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                   if (member.memberId) {
                     router.push(`/cooperative/members/${member.memberId}`);
                   } else {
                     console.error("Cannot navigate, memberId is missing", member);
                   }
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fce8f1] text-sm font-medium text-[#f10e7c]">
                      {member.firstName?.[0] || "M"}
                    </div>
                    <span className="text-sm font-medium text-[#1d1d2a]">
                      {member.firstName} {member.lastName}
                    </span>
                  </div>
                  <Badge
                    className={`${getStatusColor(member.status)} hover:${getStatusColor(member.status)}`}
                  >
                    {member.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#838794]">Email:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      {member.email}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838794]">Tier:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      {member.subscriptionTier}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838794]">Contribution:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      ₦{member.monthlyContribution.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838794]">Reg. Date:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      {formatDate(member.joinDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
