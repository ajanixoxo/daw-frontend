"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getRecentMembers } from "@/app/actions/cooperative-dashboard";

interface RecentMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  subscriptionTier: string;
  status: string;
}

export function RecentSignins() {
  const [members, setMembers] = useState<RecentMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentMembers = async () => {
      try {
        setLoading(true);
        const result = await getRecentMembers();
        
        if (result.success && result.data) {
          setMembers(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch recent members");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentMembers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export clicked");
  };

  if (error) {
    return (
      <Card className="mt-6 border-[#e4e7ec] bg-white">
        <CardContent className="p-6">
          <p className="text-sm text-red-600">Error loading recent sign-ins: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-[#e4e7ec] bg-white">
      <CardHeader className="flex flex-row items-center justify-between p-6">
        <CardTitle className="text-lg font-bold text-[#1d1d2a]">
          Recent Sign-ins (4 Most Recent)
        </CardTitle>
        {/* <Button
          variant="outline"
          size="sm"
          className="gap-2 border-[#e4e7ec] bg-transparent"
          onClick={handleExport}
        >
          <Download className="h-4 w-4" />
          Export
        </Button> */}
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table View */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full">
            <thead className="bg-[#f7f7f7]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">
                  Member Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">
                  Subscription Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#838794]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e7ec]">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 w-32 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 w-20 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    </td>
                  </tr>
                ))
              ) : members.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-sm text-[#838794]">
                    No members found
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.userId} className="hover:bg-[#f9f9f9]">
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.firstName} {member.lastName}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {formatDate(member.joinDate)}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#1d1d2a]">
                      {member.subscriptionTier}
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-[#d4f4dd] text-[#009a49] hover:bg-[#d4f4dd]">
                        {member.status}
                      </Badge>
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
            [...Array(4)].map((_, i) => (
              <div key={i} className="rounded-lg border border-[#e4e7ec] p-4 animate-pulse">
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            ))
          ) : members.length === 0 ? (
            <div className="text-center py-8 text-sm text-[#838794]">
              No members found
            </div>
          ) : (
            members.map((member) => (
              <div
                key={member.userId}
                className="rounded-lg border border-[#e4e7ec] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1d1d2a]">
                    {member.firstName} {member.lastName}
                  </span>
                  <Badge className="bg-[#d4f4dd] text-[#009a49] hover:bg-[#d4f4dd]">
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
                    <span className="text-[#838794]">Join Date:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      {formatDate(member.joinDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#838794]">Tier:</span>
                    <span className="font-medium text-[#1d1d2a]">
                      {member.subscriptionTier}
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
