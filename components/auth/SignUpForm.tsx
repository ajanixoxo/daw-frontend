"use client";

import { useState } from "react";
import type { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check } from "lucide-react";
import { useSignup } from "@/hooks/useAuth";
import type { ISignupRequest } from "@/types/auth.types";

const SignUpForm: FC = () => {
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
      await signup(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="auth-label text-(--text-dark)">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            disabled={isLoading}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.firstName}
          />
          {errors.firstName && (
            <span className="text-xs text-destructive">{errors.firstName}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="auth-label text-(--text-dark)">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            disabled={isLoading}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.lastName}
          />
          {errors.lastName && (
            <span className="text-xs text-destructive">{errors.lastName}</span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="auth-label text-(--text-dark)">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="hello@example.com"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-destructive">{errors.email}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="auth-label text-(--text-dark)">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="23409099987"
          value={formData.phone}
          onChange={handleChange}
          disabled={isLoading}
          className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <span className="text-xs text-destructive">{errors.phone}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="auth-label text-(--text-dark)">
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
            disabled={isLoading}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 pr-12 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-dark) transition-colors disabled:opacity-50"
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
        <Label
          htmlFor="confirmPassword"
          className="auth-label text-(--text-dark)"
        >
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
            disabled={isLoading}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 pr-12 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-dark) transition-colors disabled:opacity-50"
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
        disabled={isLoading}
        className="h-12 rounded-[40px] bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-semibold text-base mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: "-0.64px" }}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
};

export default SignUpForm;
