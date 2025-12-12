"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/auth/AuthLayout";
import { useResetPassword } from "@/hooks/usePasswordReset";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      toast.error("Please enter your new password");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    resetPassword({
      otp,
      newPassword,
      confirmNewPassword,
    });
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter the code sent to your email and your new password"
    >
      <div className="w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1a1a1a]">
              Verification Code
            </label>
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1a1a1a]">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-12 rounded-xl bg-[#fbfbfb] border-[#e7e8e9] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {newPassword && (
              <div className="space-y-1">
                <div className="flex gap-1 h-1">
                  <div
                    className={`flex-1 rounded-full ${
                      newPassword.length >= 8 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      /[A-Z]/.test(newPassword) ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      /[0-9]/.test(newPassword) ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`flex-1 rounded-full ${
                      /[^A-Za-z0-9]/.test(newPassword)
                        ? "bg-green-500"
                        : "bg-gray-200"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Must contain: 8+ chars, uppercase, number, special char
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-[#1a1a1a]">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="h-12 rounded-xl bg-[#fbfbfb] border-[#e7e8e9] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-12 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white font-medium transition-all"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
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
