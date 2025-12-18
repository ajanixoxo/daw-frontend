"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";

interface IJoinCooperativeRequest {
  userId: string;
  cooperativeId: string;
  subscriptionTierId: string;
}

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
    const userId = session?.userId;

    if (!token || !userId) {
      return { success: false, error: "Authentication required" };
    }

    const payload: IJoinCooperativeRequest = {
      userId,
      cooperativeId: data.cooperativeId,
      subscriptionTierId: data.subscriptionTierId,
    };
    console.log("payload to join", payload);
    const response = await apiClient.post<IJoinCooperativeResponse>(
      API_ENDPOINTS.COOPERATIVES.JOIN,
      payload,
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
