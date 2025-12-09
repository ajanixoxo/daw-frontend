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

    cookieStore.set("userId", data.userId, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("email", data.email, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("role", data.role, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("isVerified", String(data.isVerified), {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("accessToken", data.accessToken, {
      ...COOKIE_CONFIG,
      maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set("refreshToken", data.refreshToken, {
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


    if (!userId || !email || role === undefined || role === null || !accessToken || refreshToken === undefined || refreshToken === null || isVerified === undefined) {
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
): Promise<IActionResponse> {
  try {
    const session = await getServerSession();
    const tempToken = session?.accessToken;

    if (!tempToken) {
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

    await destroyServerSession();

    return { success: true, message: response.message || "Email verified successfully" };
  } catch (error) {
    console.error("Email Verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify email";
    return { success: false, error: message };
  }
}

export async function verifyLoginOtp(
  data: IOtpRequest
): Promise<IActionResponse> {
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

  
    if (session) {
      await createServerSession({
        ...session,
        isVerified: true,
        accessToken: response.token.accessToken,
        refreshToken: response.token.refreshToken,
        role: response.user.roles && response.user.roles.length > 0 ? response.user.roles[0] : session.role,
      });
    }

    return { success: true, message: response.message || "Login verified successfully" };
  } catch (error) {
    console.error("Login OTP Verification error:", error);
    const message = error instanceof Error ? error.message : "Failed to verify OTP";
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

  const result = {
    isAuthenticated: session !== null,
    isVerified: session?.isVerified || false,
    session,
  };

  console.log("checkVerificationStatus result:", result);

  return result;
}