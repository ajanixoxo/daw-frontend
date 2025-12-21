"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { useForgotPassword } from "@/hooks/usePasswordReset";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    forgotPassword({ email });
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to receive a reset code"
    >
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#1a1a1a]"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl bg-[#fbfbfb] border-[#e7e8e9]"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-medium transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Reset Code"
            )}
          </Button>

          <div className="text-center">
            <Link
              href="/auth"
              className="inline-flex items-center text-sm font-medium text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
