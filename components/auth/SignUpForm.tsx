'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, EyeOff } from 'lucide-react';

interface SignUpFormProps {
  onSubmit?: (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }) => void | Promise<void>;
}

const SignUpForm: FC<SignUpFormProps> = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
  }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      role?: string;
    } = {};

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.({ fullName, email, password, role });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Full Name Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName" className="auth-label text-(--text-dark)">
          Full Name
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <span className="text-xs text-destructive">{errors.fullName}</span>
        )}
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="auth-label text-(--text-dark)">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="hello@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base placeholder:text-(--input-placeholder)"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs text-destructive">{errors.email}</span>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="auth-label text-(--text-dark)">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 pr-12 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-dark) transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
        {errors.password && (
          <span className="text-xs text-destructive">{errors.password}</span>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="auth-label text-(--text-dark)">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 pr-12 text-base placeholder:text-(--input-placeholder)"
            aria-invalid={!!errors.confirmPassword}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-(--text-muted) hover:text-(--text-dark) transition-colors"
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-xs text-destructive">{errors.confirmPassword}</span>
        )}
      </div>

      {/* Role Selection */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="role" className="auth-label text-(--text-dark)">
          I am joining as a
        </Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger
            id="role"
            className="h-12 rounded-[40px] border border-(--input-border) bg-white px-4 text-base w-full"
            aria-invalid={!!errors.role}
          >
            <SelectValue placeholder="Community Member" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="community-member">Community Member</SelectItem>
            <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
            <SelectItem value="buyer">Buyer</SelectItem>
            <SelectItem value="mentor">Mentor</SelectItem>
          </SelectContent>
        </Select>
        {errors.role && (
          <span className="text-xs text-destructive">{errors.role}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="h-12 rounded-[40px] bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-semibold text-base mt-5"
        style={{ letterSpacing: '-0.64px' }}
      >
        Create Account
      </Button>
    </form>
  );
};

export default SignUpForm;