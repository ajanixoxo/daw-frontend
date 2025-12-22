"use client";

import { useState } from "react";
import type { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import type { ILoginRequest } from "@/types/auth.types";

const SignInForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { login, isLoading, error } = useLogin();

  const [formData, setFormData] = useState<ILoginRequest>({
    email: "",
    password: "",
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
    const newErrors: { email?: string; password?: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await login(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="auth-label text-text-dark">
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
          className="h-12 rounded-[40px] border border-input-border bg-white px-4 text-base placeholder:text-input-placeholder"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-destructive">{errors.email}</span>
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
        {errors.password && (
          <span className="text-xs text-destructive">{errors.password}</span>
        )}
        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm font-medium text-[#1a1a1a] hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-[40px] bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-semibold text-base mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ letterSpacing: "-0.64px" }}
      >
        {isLoading ? "Signing in..." : "Login"}
      </Button>
    </form>
  );
};

export default SignInForm;
