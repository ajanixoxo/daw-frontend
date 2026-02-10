"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getTopMembers } from "@/app/actions/cooperative-dashboard";

interface TopMember {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  totalContributed: number;
  contributionCount: number;
}

export function TopMembers() {
  const router = useRouter();
  const [members, setMembers] = useState<TopMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopMembers = async () => {
      try {
        setLoading(true);
        const result = await getTopMembers();
        
        if (result.success && result.data) {
          setMembers(result.data);
        } else {
          throw new Error(result.error || "Failed to fetch top members");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchTopMembers();
  }, []);

  if (error) {
    return (
      <Card className="border-[#e4e7ec] bg-white">
        <CardContent className="p-6">
          <p className="text-sm text-red-600">Error loading top members: {error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#e4e7ec] bg-white">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#1d1d2a]">
          <Users className="h-5 w-5" />
          Top Members
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <p className="text-sm text-[#838794] text-center py-8">
            No members found
          </p>
        ) : (
          <div className="space-y-4">
            {members.map((member, index) => {
              const initials = `${member.firstName?.[0] || ""}${member.lastName?.[0] || ""}`.toUpperCase();
              
              return (
                <div key={member.userId} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-[#838794] w-4">
                    {index + 1}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffedf6] text-sm font-medium text-[#f10e7c]"
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#1d1d2a] truncate">
                      {member.firstName} {member.lastName}
                    </p>
                    <p className="text-xs text-[#838794] truncate">
                      {member.contributionCount} contribution{member.contributionCount !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#1d1d2a]">
                      ₦{member.totalContributed.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-[#009a49]">
                      <TrendingUp className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button
          variant="link"
          className="mt-4 w-full text-[#1d1d2a]"
          onClick={() => router.push("/cooperative/members")}
        >
          View All Members
        </Button>
      </CardContent>
    </Card>
  );
}
