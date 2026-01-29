"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

interface IJoinCooperativeResponse {
  id: string;
  userId: string;
  cooperativeId: string;
  subscriptionTierId: string;
  status: "active" | "pending";
  joinedAt: string;
}

interface IFetchMemberResponse {
  id: string;
  userId: string;
  cooperativeId: string;
  subscriptionTierId: string;
  status: "active" | "pending";
  joinedAt: string;
}

export interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  duration: "monthly" | "yearly";
  features: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Cooperative {
  id: string;
  name: string;
  description: string;
  image?: string;
  location?: string;
  isActive: boolean;
  createdAt: string;
}
export interface CreateCooperativePayload {
  name: string;
  description: string;
  category: string;
  countryCode: string;
  phone: string;
  email: string;
  bylaws?: string;
  logo?: File | null;
  banner?: File | null;
}

export async function joinCooperative(data: {
  cooperativeId: string;
  subscriptionTierId: string;
}): Promise<IActionResponse<IJoinCooperativeResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.post<IJoinCooperativeResponse>(
      API_ENDPOINTS.COOPERATIVES.JOIN,
      { cooperativeId: data.cooperativeId, subscriptionTierId: data.subscriptionTierId },
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Successfully joined cooperative",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to join cooperative";
    return { success: false, error: message };
  }
}

/**
 * Combined: guest/buyer → create user (if guest) + seller onboard + join DAW cooperative.
 * Client builds FormData with: personal (firstName, lastName, email, phone, password?, confirmPassword?);
 * shop (name, description, category, contactNumber, businessAddress, shopLogo?, shopBanner?);
 * documents (idDocument, proofOfResidence, businessCac, passportPhotograph); cooperativeId, subscriptionTierId.
 */
export async function cooperativeJoinWithSellerOnboard(
  formData: FormData
): Promise<
  IActionResponse<{ member: unknown; shop: unknown; message: string }>
> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";
    const url = `${baseUrl}${API_ENDPOINTS.SHOPS.COOPERATIVE_JOIN_WITH_SELLER_ONBOARD}`;
    const headers: Record<string, string> = {};
    if (token) headers.Authorization = `Bearer ${token}`;
    const res = await fetch(url, { method: "POST", body: formData, headers });
    const data = (await res.json().catch(() => ({}))) as {
      message?: string;
      error?: string;
      member?: unknown;
      shop?: unknown;
    };
    if (!res.ok) {
      const msg =
        data?.message || data?.error || `Request failed (${res.status})`;
      return { success: false, error: msg };
    }
    return {
      success: true,
      data: {
        member: data.member,
        shop: data.shop,
        message: data?.message || "Success",
      },
      message: data?.message || "Success",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Request failed";
    return { success: false, error: message };
  }
}

/** Guest join: create account and join cooperative (no auth). */
export async function guestJoinCooperative(data: {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName?: string;
  phone: string;
  cooperativeId: string;
  subscriptionTierId: string;
}): Promise<IActionResponse<IJoinCooperativeResponse>> {
  try {
    const response = await apiClient.post<IJoinCooperativeResponse>(
      API_ENDPOINTS.COOPERATIVES.JOIN_GUEST,
      data
    );

    return {
      success: true,
      data: response,
      message: "Account created and joined cooperative. Please log in.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to join cooperative";
    return { success: false, error: message };
  }
}

export async function fetchMember(
  cooperativeId: string
): Promise<IActionResponse<IFetchMemberResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;
    const userId = session?.userId;

    if (!token || !userId) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IFetchMemberResponse>(
      API_ENDPOINTS.COOPERATIVES.GET_ALL_USER(cooperativeId),
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Member fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch member";
    return { success: false, error: message };
  }
}

export async function fetchSubscriptionTiers(
  cooperativeId: string
): Promise<IActionResponse<SubscriptionTier[]>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<SubscriptionTier[]>(
      API_ENDPOINTS.SUBSCRIPTION_TIERS.GET_ALL(cooperativeId),
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Subscription tiers fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch subscription tiers";

    return { success: false, error: message };
  }
}

/** Public: fetch the single DAW cooperative and its tiers (no auth). */
export async function fetchDAWCooperative(): Promise<
  IActionResponse<{
    cooperative: { _id: string; name: string; description?: string; isActive: boolean };
    tiers: { _id: string; name: string; monthlyContribution: number }[];
  }>
> {
  try {
    const response = await apiClient.get<{
      cooperative: { _id: string; name: string; description?: string; isActive: boolean };
      tiers: { _id: string; name: string; monthlyContribution: number }[];
    }>(API_ENDPOINTS.COOPERATIVES.GET_DAW);

    return {
      success: true,
      data: response,
      message: "DAW cooperative fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch DAW cooperative";
    return { success: false, error: message };
  }
}

export async function fetchAllCooperatives(): Promise<
  IActionResponse<Cooperative[]>
> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<Cooperative[]>(
      API_ENDPOINTS.COOPERATIVES.GET_ALL,
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Cooperatives fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch cooperatives";
    return { success: false, error: message };
  }
}

export async function fetchCooperativeById(
  cooperativeId: string
): Promise<IActionResponse<Cooperative>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<Cooperative>(
      API_ENDPOINTS.COOPERATIVES.GET_BY_ID(cooperativeId),
      { token }
    );

    return {
      success: true,
      data: response,
      message: "Cooperative fetched successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch cooperative";
    return { success: false, error: message };
  }
}

export async function createCooperative(
  payload: CreateCooperativePayload
): Promise<IActionResponse<Cooperative>> {
  try {
    console.log("initial payload", payload);

    const session = await getServerSession();
    const token = session?.accessToken;
    const adminId = session?.userId;

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    // Include adminId in the payload
    const finalPayload = { ...payload, adminId };

    const formData = new FormData();
    Object.entries(finalPayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    const response = await apiClient.post<Cooperative>(
      API_ENDPOINTS.COOPERATIVES.CREATE_COOP,
      formData,
      { token }
    );

    console.log("create coop response", response);

    return {
      success: true,
      data: response,
      message: "Cooperative created successfully",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create cooperative";

    return { success: false, error: message };
  }
}
