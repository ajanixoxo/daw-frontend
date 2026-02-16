"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import { apiClient } from "@/lib/api/client";

interface InviteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
}

function SignUpPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Fetch invite data if token is present
  const {
    data: inviteData,
    isLoading,
    error,
  } = useQuery<{ success: boolean; data: InviteData }>({
    queryKey: ["invite", token],
    queryFn: async () => {
      return await apiClient.get<{ success: boolean; data: InviteData }>(
        `/api/users/invite/validate/${token}`
      );
    },
    enabled: !!token,
  });

  if (token && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f10e7c] mx-auto mb-4"></div>
          <p className="text-gray-600">Validating invitation...</p>
        </div>
      </div>
    );
  }

  if (token && error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Invalid Invitation</h2>
          <p>{(error as Error).message || "This invitation link is invalid or has expired."}</p>
          <a href="/signup" className="text-[#f10e7c] hover:underline mt-4 inline-block">
            Sign up instead →
          </a>
        </div>
      </div>
    );
  }

  return (
    <AuthLayout
      initialMode="signup"
      inviteData={inviteData?.data || null}
      inviteToken={token}
    />
  );
}

export default function SignUpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f10e7c]"></div>
        </div>
      }
    >
      <SignUpPageContent />
    </Suspense>
  );
}