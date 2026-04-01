import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser, logoutUser, resendOtp } from "@/app/actions/auth";
import { getUserProfile } from "@/app/actions/profile";
import type { ILoginRequest, ISignupRequest, ISessionData, IUser } from "@/types/auth.types";
import { useAuthStore } from "@/zustand/store";
import { useSellerSignupStore } from "@/zustand/seller-signup-store";
import { useCooperativeSignupStore } from "@/zustand/cooperative-signup-store";
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

          // If we have tokens, we are authenticated - redirect to dashboard
          if (result.data.accessToken && result.data.refreshToken) {
            // Check user role and redirect accordingly
            const userRoles = result.user?.roles || [];
            const isSeller = userRoles.includes("seller") || userRoles.includes("member");
            const isCooperativeAdmin = userRoles.includes("cooperative_admin");
            const isAdmin = userRoles.includes("admin") || userRoles.includes("support-admin");
            const isLogistics = userRoles.includes("logistics_provider");
            
            if (isAdmin) {
              // Redirect admin to admin dashboard
              window.location.href = "/admin/dashboard";
              return;
            } else if (isCooperativeAdmin) {
              // Redirect cooperative admin to cooperative dashboard
              window.location.href = "/cooperative/dashboard";
              return;
            } else if (isSeller) {
              // Fetch profile to check shop and KYC status
              try {
                const profileResponse = await getUserProfile();
                if (profileResponse.success && profileResponse.data) {
                  const user = profileResponse.data;
                  
                  // Check if user has shops
                  const hasShops = user.shop && Array.isArray(user.shop) && user.shop.length > 0;
                  
                  if (hasShops) {
                    // User has shops, redirect to dashboard
                    window.location.href = "/sellers/dashboard";
                    return;
                  } else {
                    // Bypass KYC check, redirect directly to create shop
                    window.location.href = "/sellers/shop/create";
                    return;
                  }
                } else {
                  // If profile fetch fails, redirect to dashboard to be safe
                  router.push("/sellers/dashboard");
                }
              } catch (error) {
                console.error("Error checking profile:", error);
                // On error, redirect to dashboard
                window.location.href = "/sellers/dashboard";
                return;
              }
            } else if (isLogistics) {
              // Redirect logistics provider to logistics dashboard
              window.location.href = "/logistics/dashboard";
              return;
            } else {
              window.location.href = "/";
              return;
            }
          } else if (!result.data.isVerified) {
            window.location.href = "/otp?mode=login";
            return;
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
          
          // Store role in sessionStorage for seller onboarding flow
          if (userData.roles === "seller") {
            sessionStorage.setItem("signupRole", "seller");
          }
          
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
  const { reset: resetSellerSignup } = useSellerSignupStore();
  const { reset: resetCooperativeSignup } = useCooperativeSignupStore();

  const logout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Attempt server-side logout but don't let it block client-side clearing
      await logoutUser();
    } catch (err) {
      console.error("Server logout failed, proceeding with client-side clear:", err);
    } finally {
      // PERMANENTLY clear all client-side state
      clearAuthData();
      resetSellerSignup();
      resetCooperativeSignup();
      
      // Clear all storage
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear all cookies
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }

        // Dispatch logout event for React Query cache clearing
        window.dispatchEvent(new CustomEvent('auth:logout'));
        
        // Final heavy-duty redirect
        window.location.href = "/auth";
      }

      setIsLoading(false);
    }
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

        if (result.data) {
          // Store tokens in localStorage for client-side API client
          if (result.data.accessToken && result.data.refreshToken) {
            tokenManager.setTokens(result.data.accessToken, result.data.refreshToken);
          }
          
          if (result.user) {
            setAuthData(result.user, result.data);
          } else {
            // Fallback for signup verification which might not return a full user object initially
            const partialUser = {
              _id: result.data.userId,
              email: result.data.email,
              roles: result.data.roles || ["buyer"],
              isVerified: true,
              status: "active",
              firstName: "",
              lastName: "",
              phone: ""
            } as any;
            setAuthData(partialUser, result.data);
          }
          
          // Check user role and redirect accordingly
          const userRoles = result.user?.roles || result.data.roles || ["buyer"];
          const isSeller = userRoles.includes("seller") || userRoles.includes("member");
          const isCooperativeAdmin = userRoles.includes("cooperative_admin");
          const isAdmin = userRoles.includes("admin") || userRoles.includes("support-admin");
          const isLogistics = userRoles.includes("logistics_provider");
          
          if (isAdmin) {
            // Redirect admin to admin dashboard
            setIsLoading(false);
            window.location.href = "/admin/dashboard";
          } else if (isCooperativeAdmin) {
            // Redirect cooperative admin to cooperative dashboard
            setIsLoading(false);
            window.location.href = "/cooperative/dashboard";
          } else if (isLogistics) {
            // Redirect logistics provider to logistics dashboard
            setIsLoading(false);
            window.location.href = "/logistics/dashboard";
          } else if (isSeller) {
            // Fetch profile to check shop and KYC status
            try {
              const profileResponse = await getUserProfile();
              
              // Determine redirect path based on shop and KYC status
              let redirectPath = "/sellers/kyc"; // Default to KYC
              
              if (profileResponse.success && profileResponse.data) {
                const user = profileResponse.data;
                
                // Check if user has shops
                const hasShops = user.shop && Array.isArray(user.shop) && user.shop.length > 0;
                
                if (hasShops) {
                  // User has shops, redirect to dashboard
                  redirectPath = "/sellers/dashboard";
                } else {
                  // Bypass KYC check, redirect directly to create shop
                  redirectPath = "/sellers/shop/create";
                }
              }
              
              // Clear loading state and redirect immediately
              setIsLoading(false);
              window.location.href = redirectPath;
            } catch (error) {
              console.error("Error checking profile:", error);
              // On error, redirect to dashboard
              setIsLoading(false);
              window.location.href = "/sellers/dashboard";
            }
          } else {
            // For standard buyers — check if they had a pending guest checkout
            setIsLoading(false);
            try {
              const { getPendingCheckoutCart } = await import("@/lib/guest-cart");
              const pending = getPendingCheckoutCart();
              if (pending.length > 0) {
                // Redirect to cart; the ShoppingCart component handles the merge
                window.location.href = "/cart";
                return;
              }
            } catch {
              // ignore — just do normal redirect
            }
            router.push("/");
            router.refresh();
          }
        } else {
          setAuthStatus(false, true);
          setIsLoading(false);
        }
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