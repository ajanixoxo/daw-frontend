"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, getFreshToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { ICreateShopRequest, ICreateShopResponse, IGetShopResponse, IEditShopResponse, IShop } from "@/types/shop.types";
import { revalidatePath } from "next/cache";

export async function createShop(data: ICreateShopRequest): Promise<IActionResponse<ICreateShopResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.post<ICreateShopResponse>(
      API_ENDPOINTS.SHOPS.CREATE,
      data,
      { token }
    );

    revalidatePath("/sellers/shop");
    return { success: true, data: response, message: "Shop created successfully" };
  } catch (error) {
    console.error("Create shop error:", error);
    let message = "Failed to create shop";
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    return { success: false, error: message };
  }
}

export async function getShop(shopId: string): Promise<IActionResponse<IGetShopResponse>> {
  try {
    const session = await getServerSession();
    const token = session?.accessToken;

    const response = await apiClient.get<IGetShopResponse>(
      API_ENDPOINTS.SHOPS.GET_SHOP(shopId),
      token ? { token } : undefined
    );

    if (!response.success || !response.shop) {
      return { success: false, error: "Shop not found" };
    }

    return { success: true, data: response };
  } catch (error) {
    console.error("Get shop error:", error);
    const message = error instanceof Error ? error.message : "Failed to get shop";
    return { success: false, error: message };
  }
}

export async function getMyShop(): Promise<IActionResponse<IGetShopResponse>> {
  try {
    const token = await getFreshToken();
    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IGetShopResponse>(
      API_ENDPOINTS.SHOPS.MY_SHOP,
      { token }
    );

    if (!response.success || !response.shop) {
      return { success: false, error: "Shop not found" };
    }

    return { success: true, data: response };
  } catch (error) {
    console.error("Get my shop error:", error);
    const message = error instanceof Error ? error.message : "Failed to get shop";
    return { success: false, error: message };
  }
}

export interface IGetAllShopsResponse {
  success: boolean;
  shops: IShop[];
  totalShops: number;
}


export async function getAllShops(): Promise<IActionResponse<IGetAllShopsResponse>> {
  try {
    // Public endpoint — no auth required, no token refresh needed.
    // Passing a token if we happen to have one is fine but not mandatory.
    const session = await getServerSession();
    const token = session?.accessToken;

    const response = await apiClient.get<IGetAllShopsResponse>(
      API_ENDPOINTS.SHOPS.GET_ALL_SHOPS,
      token ? { token } : undefined
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get all shops error:", error);
    const message = error instanceof Error ? error.message : "Failed to get shops";
    return { success: false, error: message };
  }
}

export interface IGetShopStatsResponse {
  success: boolean;
  viewCount: number;
}

export async function getShopStats(shopId: string): Promise<IActionResponse<IGetShopStatsResponse>> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const response = await apiClient.get<IGetShopStatsResponse>(
      API_ENDPOINTS.SHOPS.GET_STATS(shopId),
      { token }
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get shop stats error:", error);
    const message = error instanceof Error ? error.message : "Failed to get shop stats";
    return { success: false, error: message };
  }
}

export async function editShop(shopId: string, formData: FormData): Promise<IActionResponse<IEditShopResponse>> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Authentication required" };
    }

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";
    const url = `${API_BASE_URL}${API_ENDPOINTS.SHOPS.EDIT_SHOP(shopId)}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || `Request failed with status ${res.status}`);
    }

    revalidatePath("/sellers/shop");
    revalidatePath("/sellers/shop/edit");
    return { success: true, data: response, message: "Shop updated successfully" };
  } catch (error) {
    console.error("Edit shop error:", error);
    const message = error instanceof Error ? error.message : "Failed to update shop";
    return { success: false, error: message };
  }
}
