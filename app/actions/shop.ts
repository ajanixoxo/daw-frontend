"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { ICreateShopRequest, ICreateShopResponse, IGetShopResponse, IEditShopResponse } from "@/types/shop.types";
import { revalidatePath } from "next/cache";

export async function createShop(data: ICreateShopRequest): Promise<IActionResponse<ICreateShopResponse>> {
  try {
    await refreshAccessToken();

    const session = await getServerSession();
    const token = session?.accessToken;

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

export async function getMyShop(): Promise<IActionResponse<IGetShopResponse>> {
  try {
    await refreshAccessToken();

    const session = await getServerSession();
    const token = session?.accessToken;

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

export async function editShop(shopId: string, formData: FormData): Promise<IActionResponse<IEditShopResponse>> {
  try {
    await refreshAccessToken();

    const session = await getServerSession();
    const token = session?.accessToken;

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
