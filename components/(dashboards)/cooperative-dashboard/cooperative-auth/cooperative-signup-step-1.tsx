"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check } from "lucide-react";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";

export function CooperativeSignupStep1() {
  const router = useRouter();
  const {
    formData,
    prefilledFields,
    updatePersonalInfo,
    setStep,
  } = useCooperativeSignupStore();
  const { data: profile } = useProfile();
  const { personalInfo } = formData;
  const isLoggedIn = !!profile;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof personalInfo, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof typeof personalInfo, string>> = {};

    if (!personalInfo.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!personalInfo.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!personalInfo.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(personalInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!personalInfo.phone) {
      newErrors.phone = "Phone number is required";
    }

    if (!isLoggedIn) {
      if (!personalInfo.password) {
        newErrors.password = "Password is required";
      } else if (personalInfo.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }

      if (!personalInfo.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (personalInfo.password !== personalInfo.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    }
  };

  return (
    <div className="w-full max-w-[600px]">
      <div className="mb-8">
        <h2
          className="text-2xl font-medium text-[#1a1a1a] mb-2"
          style={{ letterSpacing: "-0.96px" }}
        >
          Personal Information
        </h2>
        <p className="text-sm text-[#6b6b6b]">
          Create your account to get started
        </p>
      </div>

      <form onSubmit={handleNext} className="flex flex-col gap-5">
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="firstName" className="auth-label text-text-dark">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={personalInfo.firstName}
              onChange={handleChange}
              disabled={!!prefilledFields.firstName}
              className="h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:opacity-90"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && (
              <span className="text-xs text-destructive">
                {errors.firstName}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="lastName" className="auth-label text-text-dark">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={personalInfo.lastName}
              onChange={handleChange}
              disabled={!!prefilledFields.lastName}
              className="h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:opacity-90"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && (
              <span className="text-xs text-destructive">
                {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="auth-label text-text-dark">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="hello@example.com"
            value={personalInfo.email}
            onChange={handleChange}
            disabled={!!prefilledFields.email}
            className="h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:opacity-90"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <span className="text-xs text-destructive">{errors.email}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="auth-label text-text-dark">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="23409099987"
            value={personalInfo.phone}
            onChange={handleChange}
            disabled={!!prefilledFields.phone}
            className="h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder disabled:cursor-not-allowed disabled:opacity-90"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && (
            <span className="text-xs text-destructive">{errors.phone}</span>
          )}
        </div>

        {/* Password fields - only for guests (not logged in) */}
        {!isLoggedIn && (
          <>
            {/* Password */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="auth-label text-text-dark">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={personalInfo.password}
                  onChange={handleChange}
                  className="h-12 rounded-[40px] border border-input-border bg-white px-4 pr-12 text-base placeholder:text-input-placeholder"
                  aria-invalid={!!errors.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b6b8c0] hover:text-[#1a1a1a] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {personalInfo.password && (
                <div className="mt-3 space-y-3">
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((level) => {
                      const score = [
                        personalInfo.password.length >= 8,
                        /[A-Z]/.test(personalInfo.password),
                        /[0-9]/.test(personalInfo.password),
                        /[^A-Za-z0-9]/.test(personalInfo.password),
                      ].filter(Boolean).length;

                      let color = "bg-gray-200";
                      if (score >= level) {
                        if (score <= 1) color = "bg-red-500";
                        else if (score <= 3) color = "bg-yellow-500";
                        else color = "bg-green-500";
                      }

                      return (
                        <div
                          key={level}
                          className={`flex-1 rounded-full transition-colors duration-300 ${color}`}
                        />
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        label: "At least 8 chars",
                        met: personalInfo.password.length >= 8,
                      },
                      {
                        label: "One uppercase",
                        met: /[A-Z]/.test(personalInfo.password),
                      },
                      {
                        label: "One number",
                        met: /[0-9]/.test(personalInfo.password),
                      },
                      {
                        label: "One special char",
                        met: /[^A-Za-z0-9]/.test(personalInfo.password),
                      },
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs">
                        {req.met ? (
                          <Check size={12} className="text-green-500" />
                        ) : (
                          <div className="w-3 h-3 rounded-full border border-gray-300" />
                        )}
                        <span
                          className={
                            req.met
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.password && (
                <span className="text-xs text-destructive mt-1">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="auth-label text-text-dark"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={personalInfo.confirmPassword}
                  onChange={handleChange}
                  className="h-12 rounded-[40px] border border-input-border bg-white px-4 pr-12 text-base placeholder:text-input-placeholder"
                  aria-invalid={!!errors.confirmPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b6b8c0] hover:text-[#1a1a1a] transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-xs text-destructive">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/")}
            className="flex-1 h-12 rounded-[40px] border-2 border-gray-100 bg-white text-[#b6b8c0] font-semibold text-base hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 rounded-[40px] bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold text-base"
            style={{ letterSpacing: "-0.64px" }}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
