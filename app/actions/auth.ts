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
} from "@/types/auth.types";

const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function createServerSession(
  data: ISessionData
): Promise<IActionResponse> {
  try {
    const cookieStore = await cookies();

    await cookieStore.set("userId", data.userId, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    await cookieStore.set("email", data.email, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    await cookieStore.set("role", data.role, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    await cookieStore.set("isVerified", String(data.isVerified), {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    await cookieStore.set("accessToken", data.accessToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    await cookieStore.set("refreshToken", data.refreshToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

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

    if (!userId || !email || !role || !accessToken || !refreshToken || isVerified === undefined) {
      return null;
    }

    return { 
      userId, 
      email,
      role, 
      isVerified: isVerified === "true",
      accessToken, 
      refreshToken 
    };
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
    const sessionData: ISessionData = {
      userId: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
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
    console.error("Login error:", error);
    const message = error instanceof Error ? error.message : "Failed to login";
    return { success: false, error: message };
  }
}

export async function signupUser(
  userData: ISignupRequest
): Promise<IActionResponse<ISessionData>> {
  try {
    const response = await apiClient.post<ISignupResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );

    if (!response.user || !response.token) {
      throw new Error("Invalid response format from server");
    }

    const { user, token } = response;
    const sessionData: ISessionData = {
      userId: user._id,
      email: user.email,
      role: user.role,
      isVerified: user.verified || false,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
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

export async function checkVerificationStatus(): Promise<{
  isAuthenticated: boolean;
  isVerified: boolean;
  session: ISessionData | null;
}> {
  const session = await getServerSession();
  
  return {
    isAuthenticated: session !== null,
    isVerified: session?.isVerified || false,
    session,
  };
}