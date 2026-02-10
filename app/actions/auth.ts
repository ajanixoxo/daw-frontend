"use server";

import { cookies } from "next/headers";
import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import type {
  ISessionData,
  ILoginRequest,
  ISignupRequest,
  ILoginResponse,
  ISignupResponse,
  IActionResponse,
  IOtpRequest,
  IOtpResponse,
  IVerifyEmailResponse,
  IUser,
  IRefreshTokenRequest,
  IRefreshTokenResponse,
} from "@/types/auth.types";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function createServerSession(
  data: ISessionData
): Promise<IActionResponse> {
  try {
    const cookieStore = await cookies();

    console.log("Setting cookies for user:", data.userId, "role:", data.role, "isVerified:", data.isVerified);

    cookieStore.set("userId", data.userId || "", {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("email", data.email || "", {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("role", data.role || "buyer", {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("isVerified", String(data.isVerified), {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("accessToken", data.accessToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24, // 1 day
    });

    cookieStore.set("refreshToken", data.refreshToken || "", {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log("Cookies set successfully");
    return { success: true };
  } catch (error) {
    console.error("Session creation error:", error);
    return { success: false, error: "Failed to create session" };
  }
}

export async function getServerSession(): Promise<ISessionData | null> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("userId")?.value;
    const email = cookieStore.get("email")?.value;
    const role = cookieStore.get("role")?.value;
    const isVerified = cookieStore.get("isVerified")?.value;
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    console.log("Cookie values:", {
      userId: !!userId,
      email: !!email,
      role: !!role,
      isVerified: isVerified !== undefined,
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      isVerifiedValue: isVerified,
      actualRole: role
    });


    if (userId === undefined || email === undefined || role === undefined || accessToken === undefined || refreshToken === undefined || isVerified === undefined) {
      console.log("Missing required cookie values - role:", role, "refreshToken:", refreshToken);
      return null;
    }

    const session = {
      userId,
      email,
      role,
      isVerified: isVerified === "true",
      accessToken,
      refreshToken
    };

    console.log("Session created successfully:", { userId: session.userId, email: session.email, role: session.role, isVerified: session.isVerified });
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

export async function destroyServerSession(): Promise<IActionResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("userId");
    cookieStore.delete("email");
    cookieStore.delete("role");
    cookieStore.delete("isVerified");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return { success: true };
  } catch (error) {
    console.error("Session destruction error:", error);
    return { success: false, error: "Failed to destroy session" };
  }
}

export async function loginUser(
  credentials: ILoginRequest
): Promise<IActionResponse<ISessionData>> {
  try {
    const response = await apiClient.post<ILoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (!response.user || !response.token) {
      throw new Error("Invalid response format from server");
    }

    const { user, token } = response;

    let accessToken = "";
    let refreshToken = "";

    if (typeof token === "string") {
      accessToken = token;
      refreshToken = "";
    } else {
      accessToken = token.accessToken;
      refreshToken = token.refreshToken;
    }

    const sessionData: ISessionData = {
      userId: user._id,
      email: user.email,
      role: user.roles && user.roles.length > 0 ? user.roles[0] : "buyer",
      isVerified: typeof token === "string" ? false : user.isVerified,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    const sessionResult = await createServerSession(sessionData);
    if (!sessionResult.success) {
      throw new Error(sessionResult.error || "Failed to create session");
    }

    return {
      success: true,
      data: sessionData,
      user: user,
      message: response.message
    };
  } catch (error) {
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : "Failed to login";
    return { success: false, error: message };
  }
}

export async function signupUser(
  userData: ISignupRequest
): Promise<IActionResponse<ISessionData>> {
  try {
    // Backend defaults role (e.g. buyer) when roles not sent
    const payload: Record<string, unknown> = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
      phone: userData.phone,
    };
    if (userData.roles != null) {
      payload.roles = [userData.roles];
    }
    const response = await apiClient.post<ISignupResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload
    );

    if (!response.user || !response.token) {
      throw new Error("Invalid response format from server");
    }

    const { user, token } = response;

    const sessionData: ISessionData = {
      userId: user._id,
      email: user.email,
      role: user.roles && user.roles.length > 0 ? user.roles[0] : "buyer",
      isVerified: false,
      accessToken: token,
      refreshToken: "",
    };

    const sessionResult = await createServerSession(sessionData);
    if (!sessionResult.success) {
      throw new Error(sessionResult.error || "Failed to create session");
    }

    return {
      success: true,
      data: sessionData,
      message: response.message
    };
  } catch (error) {
    console.error("Signup error:", error);
    const message = error instanceof Error ? error.message : "Failed to sign up";
    return { success: false, error: message };
  }
}

export async function verifyEmail(
  data: IOtpRequest
): Promise<IActionResponse<ISessionData | void>> {
  try {
    const session = await getServerSession();
    const tempToken = session?.accessToken;

    if (!tempToken || !session) {
      throw new Error("Authentication required");
    }


    const payload = { otp: data.otp };

    const response = await apiClient.post<IVerifyEmailResponse>(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      payload,
      { token: tempToken }
    );

    if (!response.success) {
      throw new Error(response.message || "Verification failed");
    }

    // For sellers, keep the session so they can proceed to KYC
    // For other users, destroy the session (they need to log in)
    const isSeller = session.role === "seller";
    
    if (isSeller) {
      // Update session to mark as verified but keep the token
      const updatedSession: ISessionData = {
        ...session,
        isVerified: true,
      };
      await createServerSession(updatedSession);
      
      return { 
        success: true, 
        message: response.message || "Email verified successfully",
        data: updatedSession
      };
    } else {
      // For non-sellers, destroy session (they need to log in)
      await destroyServerSession();
      return { success: true, message: response.message || "Email verified successfully" };
    }
  } catch (error) {
    console.error("Email Verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify email";
    return { success: false, error: message };
  }
}

export async function verifyLoginOtp(
  data: IOtpRequest
): Promise<IActionResponse<ISessionData>> {
  try {
    const session = await getServerSession();
    const tempToken = session?.accessToken;

    if (!tempToken) {
      throw new Error("Authentication required");
    }

    const payload = { otp: data.otp };

    const response = await apiClient.post<IOtpResponse>(
      API_ENDPOINTS.AUTH.LOGIN_OTP,
      payload,
      { token: tempToken }
    );

    if (!response.token || !response.user) {
      throw new Error("Invalid response from server");
    }

  
    const updatedSessionData: ISessionData = {
      ...session,
      isVerified: true,
      accessToken: response.token.accessToken,
      refreshToken: response.token.refreshToken,
      role: response.user.roles && response.user.roles.length > 0 ? response.user.roles[0] : session.role,
    };

    if (session) {
      await createServerSession(updatedSessionData);
    }

    // Convert IOtpResponse user to IUser format
    const user: IUser = {
      _id: response.user._id,
      firstName: response.user.firstName,
      lastName: response.user.lastName,
      email: response.user.email,
      phone: response.user.phone,
      isVerified: response.user.isVerified,
      kyc_status: response.user.kyc_status,
      roles: response.user.roles,
      status: response.user.status,
      createdAt: response.user.createdAt,
      updatedAt: response.user.updatedAt,
    };

    return { 
      success: true, 
      message: response.message || "Login verified successfully",
      user: user,
      data: updatedSessionData
    };
  } catch (error) {
    console.error("Login OTP Verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify OTP";
    return { success: false, error: message };
  }
}

export async function resendOtp(): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const email = session?.email;

    if (!email) {
      throw new Error("Email not found in session");
    }

    const response = await apiClient.post<{ success: boolean; message: string }>(
      API_ENDPOINTS.AUTH.RESEND_VERIFICATION,
      { email }
    );

    return { success: true, message: response.message || "OTP resent successfully" };
  } catch (error) {
    console.error("Resend OTP error:", error);
    const message = error instanceof Error ? error.message : "Failed to resend OTP";
    return { success: false, error: message };
  }
}

export async function logoutUser(): Promise<IActionResponse> {
  try {
    const session = await getServerSession();

    if (session?.accessToken) {
      try {
        await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, undefined, {
          token: session.accessToken,
        });
      } catch (error) {
        console.error("Logout API error:", error);
      }
    }

    return await destroyServerSession();
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, error: "Failed to logout" };
  }
}

export async function refreshAccessToken(): Promise<IActionResponse<ISessionData>> {
  try {
    const session = await getServerSession();
    const refreshToken = session?.refreshToken;

    if (!refreshToken) {
      return { success: false, error: "No refresh token available" };
    }

    const payload: IRefreshTokenRequest = {
      refreshToken,
    };

    const response = await apiClient.post<IRefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      payload
    );

    if (!response.success || !response.token) {
      throw new Error(response.message || "Failed to refresh token");
    }

    const { token } = response;

    // Update session with new tokens
    const updatedSessionData: ISessionData = {
      ...session!,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };

    // Update cookies with new tokens
    const sessionResult = await createServerSession(updatedSessionData);
    if (!sessionResult.success) {
      throw new Error(sessionResult.error || "Failed to update session");
    }

    return {
      success: true,
      data: updatedSessionData,
      message: response.message || "Token refreshed successfully",
    };
  } catch (error) {
    console.error("Refresh token error:", error);
    const message = error instanceof Error ? error.message : "Failed to refresh token";
    return { success: false, error: message };
  }
}

export async function checkVerificationStatus(): Promise<{
  isAuthenticated: boolean;
  isVerified: boolean;
  session: ISessionData | null;
}> {
  const session = await getServerSession();

  const result = {
    isAuthenticated: session !== null,
    isVerified: session?.isVerified || false,
    session,
  };

  console.log("checkVerificationStatus result:", result);

  return result;
}