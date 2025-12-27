import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser, logoutUser, resendOtp } from "@/app/actions/auth";
import { getUserProfile } from "@/app/actions/profile";
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
            // Check if user is a seller and verify KYC status
            const userRoles = result.user?.roles || [];
            const isSeller = userRoles.includes("seller") || result.data.role === "seller";
            
            if (isSeller) {
              // Fetch profile to check shop and KYC status
              try {
                const profileResponse = await getUserProfile();
                if (profileResponse.success && profileResponse.data) {
                  const user = profileResponse.data;
                  
                  // Check if user has shops
                  const hasShops = user.shop && Array.isArray(user.shop) && user.shop.length > 0;
                  
                  if (hasShops) {
                    // User has shops, redirect to dashboard
                    router.push("/sellers/dashboard");
                  } else {
                    // User has no shops, check KYC status
                    const isKycVerified = 
                      user.kyc_status === "verified" || 
                      (user as any).kycVerified === true;
                    
                    if (!isKycVerified) {
                      // Redirect to KYC page if not verified
                      router.push("/sellers/kyc");
                    } else {
                      // KYC verified but no shops, redirect to create shop
                      router.push("/sellers/shop/create");
                    }
                  }
                } else {
                  // If profile fetch fails, redirect to KYC to be safe
                  router.push("/sellers/kyc");
                }
              } catch (error) {
                console.error("Error checking profile:", error);
                // On error, redirect to KYC page
                router.push("/sellers/kyc");
              }
            } else {
              router.push("/");
            }
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

        if (mode === "login" && result.data) {
          // Store tokens in localStorage for client-side API client
          if (result.data.accessToken && result.data.refreshToken) {
            tokenManager.setTokens(result.data.accessToken, result.data.refreshToken);
          }
          
          if (result.user) {
            setAuthData(result.user, result.data);
            
            // Check if user is a seller and verify KYC status
            const userRoles = result.user.roles || [];
            const isSeller = userRoles.includes("seller") || result.data.role === "seller";
            
            if (isSeller) {
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
                    // User has no shops, check KYC status
                    // First try from result.user (for OTP login), then use profile data
                    const userFromResult = result.user as any;
                    let isKycVerified = false;
                    
                    if (userFromResult?.kyc_status === "verified" || userFromResult?.kycVerified === true) {
                      isKycVerified = true;
                    } else if (userFromResult?.kyc_status || userFromResult?.kycVerified === false) {
                      isKycVerified = false;
                    } else {
                      // Use profile data for KYC status
                      isKycVerified = 
                        user.kyc_status === "verified" || 
                        (user as any).kycVerified === true;
                    }
                    
                    if (!isKycVerified) {
                      // Redirect to KYC page if not verified
                      redirectPath = "/sellers/kyc";
                    } else {
                      // KYC verified but no shops, redirect to create shop
                      redirectPath = "/sellers/shop/create";
                    }
                  }
                }
                
                // Clear loading state and redirect immediately
                setIsLoading(false);
                window.location.href = redirectPath;
              } catch (error) {
                console.error("Error checking profile:", error);
                // On error, redirect to KYC page
                setIsLoading(false);
                window.location.href = "/sellers/kyc";
              }
            } else {
              setIsLoading(false);
              router.push("/");
              router.refresh();
            }
          } else {
            setIsLoading(false);
            setAuthStatus(true, true);
            router.push("/");
            router.refresh();
          }
        } else if (mode === "signup") {
          // Clear the stored role if it exists
          const signupRole = sessionStorage.getItem("signupRole");
          if (signupRole) {
            sessionStorage.removeItem("signupRole");
          }
          
          // Show success message and redirect to login (same for both buyer and seller)
          setSuccess(true);
          setAuthStatus(false, true);
          setIsLoading(false);
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