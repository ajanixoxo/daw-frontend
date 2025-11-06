'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormProps {
  onSubmit?: (email: string, password: string) => void | Promise<void>;
}

const SignInForm: FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

      {/* Submit Button */}
      <Button
        type="submit"
        className="h-12 rounded-[40px] bg-(--brand-pink) hover:bg-(--brand-pink)/90 text-white font-semibold text-base mt-5"
        style={{ letterSpacing: '-0.64px' }}
      >
        Login
      </Button>
    </form>
  );
};

export default SignInForm;