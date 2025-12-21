"use client";

import { useState } from "react";
import type { FC, ReactNode } from "react";
import PromoSection from "./PromoSection";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

type AuthMode = "signin" | "signup";

interface AuthLayoutProps {
  initialMode?: AuthMode;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

const AuthLayout: FC<AuthLayoutProps> = ({
  initialMode = "signin",
  children,
  title,
  subtitle,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-white">
      <div className="w-full lg:w-[550px] flex flex-col items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[406px] flex flex-col gap-10">
          <div className="flex items-center gap-3">
            <img src="/logo-full.png" alt="Logo" className="h-6" />
          </div>

          {children ? (
            <div className="flex flex-col gap-8">
              {(title || subtitle) && (
                <div className="text-center space-y-2">
                  {title && (
                    <h1 className="text-2xl font-bold text-[#1a1a1a]">
                      {title}
                    </h1>
                  )}
                  {subtitle && <p className="text-gray-500">{subtitle}</p>}
                </div>
              )}
              {children}
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-0 bg-[#f5f5f5] rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className={`flex-1 auth-tab py-3 px-6 rounded-lg transition-all duration-300 ${
                    mode === "signin"
                      ? "bg-white text-[#1a1a1a] shadow-sm"
                      : "text-gray-500 hover:text-[#1a1a1a]"
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className={`flex-1 auth-tab py-3 px-6 rounded-lg transition-all duration-300 ${
                    mode === "signup"
                      ? "bg-white text-[#1a1a1a] shadow-sm"
                      : "text-gray-500 hover:text-[#1a1a1a]"
                  }`}
                >
                  Sign up
                </button>
              </div>

              <div className="relative overflow-hidden">
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform:
                      mode === "signin" ? "translateX(0)" : "translateX(-100%)",
                    opacity: mode === "signin" ? 1 : 0,
                    position: mode === "signin" ? "relative" : "absolute",
                    width: "100%",
                  }}
                >
                  <SignInForm />
                </div>

                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform:
                      mode === "signup" ? "translateX(0)" : "translateX(100%)",
                    opacity: mode === "signup" ? 1 : 0,
                    position: mode === "signup" ? "relative" : "absolute",
                    width: "100%",
                    top: 0,
                  }}
                >
                  <SignUpForm />
                </div>
              </div>

              <div className="text-center">
                <span className="auth-label text-gray-500">
                  {mode === "signin"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() =>
                      setMode(mode === "signin" ? "signup" : "signin")
                    }
                    className="text-[#F10E7C] hover:underline font-medium"
                  >
                    {mode === "signin" ? "Sign up" : "Sign in"}
                  </button>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 hidden lg:flex p-4">
        <PromoSection />
      </div>
    </div>
  );
};

export default AuthLayout;
