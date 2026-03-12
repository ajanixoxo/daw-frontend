"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, Lock } from "lucide-react";
import { useSignup } from "@/hooks/useAuth";
import type { ISignupRequest } from "@/types/auth.types";
import { apiClient } from "@/lib/api/client";
import { useAuthStore } from "@/zustand/store";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InviteData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roles: string[];
}

interface SignUpFormProps {
  inviteData?: InviteData | null;
  inviteToken?: string | null;
}

const SignUpForm: FC<SignUpFormProps> = ({ inviteData, inviteToken }) => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isInviteMode = !!inviteData && !!inviteToken;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // signup hook
  const { signup, isLoading, error } = useSignup();

  const [formData, setFormData] = useState<ISignupRequest>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    country: "",
    currency: "USD", // Default to USD
  });

  // Pre-fill form data from invite
  useEffect(() => {
    if (inviteData) {
      setFormData((prev) => ({
        ...prev,
        firstName: inviteData.firstName || "",
        lastName: inviteData.lastName || "",
        email: inviteData.email || "",
        phone: inviteData.phone || "",
      }));
    }
  }, [inviteData]);

  // Complete registration mutation
  const completeRegistrationMutation = useMutation({
    mutationFn: async (data: {
      token: string;
      password: string;
      phone?: string;
    }) => {
      return await apiClient.post<{
        success: boolean;
        message: string;
        data: {
          user: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string;
            roles: string[];
            isVerified: boolean;
            status: string;
          };
          accessToken: string;
          refreshToken: string;
        };
      }>("/api/users/invite/complete", data);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Registration completed successfully!");
      // Auto-login user using the store's login function
      if (response.data) {
        const userData = response.data.user;
        const sessionData = {
          userId: userData._id,
          role: userData.roles[0] || "buyer",
          email: userData.email,
          isVerified: userData.isVerified,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
        login(
          {
            _id: userData._id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            roles: userData.roles,
            isVerified: userData.isVerified,
            status: userData.status,
          },
          sessionData,
        );

        // Redirect based on role
        const roles = userData.roles || [];
        if (roles.includes("seller")) {
          router.push("/sellers/dashboard");
        } else if (roles.includes("member") || roles.includes("cooperative")) {
          router.push("/cooperative/shop");
        } else {
          router.push("/marketplace");
        }
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to complete registration.");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (value: string, data: any) => {
    const countryName = data.name || "";
    const isNigeria = countryName.toLowerCase() === "nigeria";

    setFormData((prev) => ({
      ...prev,
      phone: value,
      country: countryName,
      currency: isNigeria ? "NGN" : "USD",
    }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!isInviteMode) {
      // Standard signup validation
      if (!formData.firstName) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (isInviteMode && inviteToken) {
        // Complete registration flow
        completeRegistrationMutation.mutate({
          token: inviteToken,
          password: formData.password,
          phone: formData.phone || undefined,
        });
      } else {
        // Standard signup flow
        await signup(formData);
      }
    }
  };

  const isSubmitting = isLoading || completeRegistrationMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {isInviteMode && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
          Complete your registration by setting a password.
        </div>
      )}

      {(error || completeRegistrationMutation.error) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error || completeRegistrationMutation.error?.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="auth-label text-text-dark">
            First Name
          </Label>
          <div className="relative">
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isSubmitting || isInviteMode}
              className={`h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder ${
                isInviteMode ? "bg-gray-100 text-gray-600" : ""
              }`}
              aria-invalid={!!errors.firstName}
            />
            {isInviteMode && (
              <Lock
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            )}
          </div>
          {errors.firstName && (
            <span className="text-xs text-destructive">{errors.firstName}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="auth-label text-text-dark">
            Last Name
          </Label>
          <div className="relative">
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isSubmitting || isInviteMode}
              className={`h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder ${
                isInviteMode ? "bg-gray-100 text-gray-600" : ""
              }`}
              aria-invalid={!!errors.lastName}
            />
            {isInviteMode && (
              <Lock
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            )}
          </div>
          {errors.lastName && (
            <span className="text-xs text-destructive">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="auth-label text-text-dark">
          Email
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="hello@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting || isInviteMode}
            className={`h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder ${
              isInviteMode ? "bg-gray-100 text-gray-600" : ""
            }`}
            aria-invalid={!!errors.email}
          />
          {isInviteMode && (
            <Lock
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          )}
        </div>
        {errors.email && (
          <span className="text-xs text-destructive">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="auth-label text-text-dark">
          Phone Number
        </Label>
        <PhoneInput
          country={"ng"}
          value={formData.phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
          containerClass="w-full"
          inputClass="!w-full !h-12 !rounded-[40px] !border !border-input-border !bg-white !px-4 !pl-12 !text-base !placeholder:text-input-placeholder"
          buttonClass="!border-none !bg-transparent !pl-4"
          dropdownClass="!rounded-xl !shadow-lg"
          placeholder="Enter phone number"
        />
        {errors.phone && (
          <span className="text-xs text-destructive">{errors.phone}</span>
        )}
      </div>

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
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-12 rounded-[40px] border border-input-border bg-white px-4 pr-12 text-base placeholder:text-input-placeholder"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark transition-colors disabled:opacity-50"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="mt-3 space-y-3">
            <div className="flex gap-1 h-1.5">
              {[1, 2, 3, 4].map((level) => {
                const score = [
                  formData.password.length >= 8,
                  /[A-Z]/.test(formData.password),
                  /[0-9]/.test(formData.password),
                  /[^A-Za-z0-9]/.test(formData.password),
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
                  met: formData.password.length >= 8,
                },
                {
                  label: "One uppercase",
                  met: /[A-Z]/.test(formData.password),
                },
                { label: "One number", met: /[0-9]/.test(formData.password) },
                {
                  label: "One special char",
                  met: /[^A-Za-z0-9]/.test(formData.password),
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
                      req.met ? "text-green-600 font-medium" : "text-gray-500"
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="auth-label text-text-dark">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
            className="h-12 rounded-[40px] border border-input-border bg-white px-4 pr-12 text-base placeholder:text-input-placeholder"
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isSubmitting}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-dark transition-colors disabled:opacity-50"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-xs text-destructive">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 rounded-[40px] bg-brand-pink hover:bg-brand-pink/90 text-white font-semibold text-base mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: "-0.64px" }}
      >
        {isSubmitting
          ? isInviteMode
            ? "Completing Registration..."
            : "Creating Account..."
          : isInviteMode
            ? "Complete Registration"
            : "Create Account"}
      </Button>
    </form>
  );
};

export default SignUpForm;
