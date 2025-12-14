import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser, logoutUser, resendOtp } from "@/app/actions/auth";
import type { ILoginRequest, ISignupRequest, ISessionData, IUser } from "@/types/auth.types";
import { useAuthStore } from "@/zustand/store";
import { tokenManager } from "@/lib/api/client-client";

interface UseLoginReturn {
  login: (credentials: ILoginRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  data: ISessionData | null;
}

export function useLogin(): UseLoginReturn {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ISessionData | null>(null);
  const { login: setAuthData } = useAuthStore();

  const login = async (credentials: ILoginRequest) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    startTransition(async () => {
      try {
        const result = await loginUser(credentials);

        if (!result.success) {
          setError(result.error || "Login failed");
          setIsLoading(false);
          return;
        }

        if (result.data) {
          setData(result.data);
          
          // Store tokens in localStorage for client-side API client
          if (result.data.accessToken && result.data.refreshToken) {
            tokenManager.setTokens(result.data.accessToken, result.data.refreshToken);
          }
          
          if (result.user) {
            setAuthData(result.user, result.data);
          }

          if (result.data.isVerified) {
            router.push("/");
            router.refresh();
          } else {
            router.push("/otp?mode=login");
          }
        }

        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        setIsLoading(false);
      }
    });
  };

  return {
    login,
    isLoading: isLoading || isPending,
    error,
    data,
  };
}

interface UseSignupReturn {
  signup: (data: ISignupRequest) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  data: ISessionData | null;
}

export function useSignup(): UseSignupReturn {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ISessionData | null>(null);
  const { setSessionData } = useAuthStore();

  const signup = async (userData: ISignupRequest) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    if (userData.password !== userData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    startTransition(async () => {
      try {
        const result = await signupUser(userData);

        if (!result.success) {
          setError(result.error || "Signup failed");
          setIsLoading(false);
          return;
        }

        if (result.data) {
          setData(result.data);
          
          // Store tokens in localStorage for client-side API client
          if (result.data.accessToken && result.data.refreshToken) {
            tokenManager.setTokens(result.data.accessToken, result.data.refreshToken);
          }
          
          setSessionData(result.data);
          
          router.push("/otp?mode=signup");
        }

        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        setIsLoading(false);
      }
    });
  };

  return {
    signup,
    isLoading: isLoading || isPending,
    error,
    data,
  };
}

interface UseLogoutReturn {
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function useLogout(): UseLogoutReturn {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout: clearAuthData } = useAuthStore();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    startTransition(async () => {
      try {
        const result = await logoutUser();

        if (!result.success) {
          setError(result.error || "Logout failed");
          setIsLoading(false);
          return;
        }

        clearAuthData();
        
        // Clear tokens from localStorage
        tokenManager.clearTokens();

        router.push("/");
        router.refresh();
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        setIsLoading(false);
      }
    });
  };

  return {
    logout,
    isLoading: isLoading || isPending,
    error,
  };
}

interface UseVerifyOtpReturn {
  verifyOtp: (otp: string, mode: "signup" | "login") => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export function useVerifyOtp(): UseVerifyOtpReturn {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { login: setAuthData, setAuthStatus } = useAuthStore();

  const verify = async (otp: string, mode: "signup" | "login") => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        const { verifyEmail, verifyLoginOtp } = await import("@/app/actions/auth");

        let result;
        if (mode === "signup") {
          result = await verifyEmail({ otp });
        } else {
          result = await verifyLoginOtp({ otp });
        }

        if (!result.success) {
          setError(result.error || "Verification failed");
          setIsLoading(false);
          return;
        }

        setSuccess(true);

        if (mode === "login" && result.data) {
          // Store tokens in localStorage for client-side API client
          if (result.data.accessToken && result.data.refreshToken) {
            tokenManager.setTokens(result.data.accessToken, result.data.refreshToken);
          }
          
          if (result.user) {
            setAuthData(result.user, result.data);
          } else {
            setAuthStatus(true, true);
          }
          router.push("/");
          router.refresh();
        } else {
          setAuthStatus(false, true);
        }

        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        setIsLoading(false);
      }
    });
  };

  return {
    verifyOtp: verify,
    isLoading: isLoading || isPending,
    error,
    success,
  };
}

interface UseResendOtpReturn {
  resend: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  success: string | null;
}

export function useResendOtp(): UseResendOtpReturn {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const resend = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const result = await resendOtp();

        if (!result.success) {
          setError(result.error || "Failed to resend OTP");
          setIsLoading(false);
          return;
        }

        setSuccess(result.message || "OTP resent successfully");
        setIsLoading(false);
      } catch (err) {
        const message = err instanceof Error ? err.message : "An error occurred";
        setError(message);
        setIsLoading(false);
      }
    });
  };

  return {
    resend,
    isLoading: isLoading || isPending,
    error,
    success,
  };
}