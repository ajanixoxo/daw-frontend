'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Badge } from 'lucide-react';
import PromoSection from './PromoSection';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

type AuthMode = 'signin' | 'signup';

interface AuthLayoutProps {
  initialMode?: AuthMode;
  onSignIn?: (email: string, password: string) => void | Promise<void>;
  onSignUp?: (data: {
    fullName: string;
    email: string;
    password: string;
    role: string;
  }) => void | Promise<void>;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  initialMode = 'signin',
  onSignIn,
  onSignUp,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      {/* Left Panel - Form Section */}
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[406px] flex flex-col gap-10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Badge size={24} className="text-(--brand-pink)" />
            <span className="auth-logo-text text-(--brand-pink)">
              Digital African Women
            </span>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-0 bg-(--bg-light-gray) rounded-xl p-1">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 auth-tab py-3 px-6 rounded-lg transition-all duration-300 ${
                  mode === 'signin'
                    ? 'bg-white text-(--text-dark) shadow-sm'
                    : 'text-(--text-muted) hover:text-(--text-dark)'
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 auth-tab py-3 px-6 rounded-lg transition-all duration-300 ${
                  mode === 'signup'
                    ? 'bg-white text-(--text-dark) shadow-sm'
                    : 'text-(--text-muted) hover:text-(--text-dark)'
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Form Content with Transition */}
            <div className="relative overflow-hidden">
              <div
                className="transition-all duration-500 ease-in-out"
                style={{
                  transform: mode === 'signin' ? 'translateX(0)' : 'translateX(-100%)',
                  opacity: mode === 'signin' ? 1 : 0,
                  position: mode === 'signin' ? 'relative' : 'absolute',
                  width: '100%',
                }}
              >
                <SignInForm onSubmit={onSignIn} />
              </div>

              <div
                className="transition-all duration-500 ease-in-out"
                style={{
                  transform: mode === 'signup' ? 'translateX(0)' : 'translateX(100%)',
                  opacity: mode === 'signup' ? 1 : 0,
                  position: mode === 'signup' ? 'relative' : 'absolute',
                  width: '100%',
                  top: mode === 'signup' ? 0 : 0,
                }}
              >
                <SignUpForm onSubmit={onSignUp} />
              </div>
            </div>

            {/* Footer Link */}
            <div className="text-center">
              <span className="auth-label text-(--text-light-muted)">
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="text-(--brand-pink) hover:underline font-medium"
                >
                  {mode === 'signin' ? 'Sign up' : 'Sign in'}
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Promotional Content */}
      <div className="flex-1 hidden lg:flex p-4">
        <PromoSection />
      </div>
    </div>
  );
};

export default AuthLayout;