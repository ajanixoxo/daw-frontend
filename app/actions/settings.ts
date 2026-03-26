"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getFreshToken } from "@/app/actions/auth";
import { IActionResponse, IUser } from "@/types/auth.types";
import { IGetShopResponse, IEditShopResponse, IShop } from "@/types/shop.types";
import { revalidatePath } from "next/cache";

interface ISellerSettingsData {
  user: IUser & { 
    profilePicture?: string; 
    phone?: string; 
  };
  shop: IShop | null; 
}

interface IGetSellerSettingsResponse {
    success: boolean;
    user: IUser & {
        profilePicture?: string;
        phone?: string;
        shop?: IShop[]; // The backend returns shop array in user object sometimes
    };
}


export async function getSellerSettings(): Promise<IActionResponse<ISellerSettingsData>> {
  try {
    const token = await getFreshToken();

    if (!token) {
      return { success: false, error: "Please login to view settings" };
    }

    const response = await apiClient.get<IGetSellerSettingsResponse>(
      API_ENDPOINTS.AUTH.PROFILE,
      { token }
    );

    
    if (!response.success || !response.user) {
        return { success: false, error: "Failed to fetch profile settings" };
    }
    
    // Extract shop from user object if available (it comes as an array from backend)
    // We'll take the first shop as the "primary" shop for now
    const shop = response.user.shop && response.user.shop.length > 0 ? response.user.shop[0] : null;

    return { 
        success: true, 
        data: {
            user: response.user,
            shop: shop
        } 
    };

  } catch (error) {
    console.error("Get seller settings error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch settings";
    return { success: false, error: message };
  }
}

export async function updateSellerProfile(prevState: any, formData: FormData): Promise<IActionResponse<any>> {
    try {
        const token = await getFreshToken();

        if (!token) {
            return { success: false, error: "Authentication required" };
        }

        // 1. Update User Profile
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const rawPhone = formData.get("phone") as string;
        const country = formData.get("country") as string;
        const currency = formData.get("currency") as string;
        const profilePicture = formData.get("profilePicture") as File;

        // Strip non-digits from phone number
        const phone = rawPhone ? rawPhone.replace(/\D/g, "") : rawPhone;

        // Only call user update if there are user fields
        if (firstName || lastName || phone || country || currency || (profilePicture && profilePicture.size > 0)) {
             const userFormData = new FormData();
             if (firstName) userFormData.append("firstName", firstName);
             if (lastName) userFormData.append("lastName", lastName);
             if (phone) userFormData.append("phone", phone);
             if (country) userFormData.append("country", country);
             if (currency) userFormData.append("currency", currency);
             if (profilePicture && profilePicture.size > 0) userFormData.append("profilePicture", profilePicture);

             const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";
             const userUpdateUrl = `${API_BASE_URL}/auth/profile`;
             
             const userRes = await fetch(userUpdateUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: userFormData,
            });

             if (!userRes.ok) {
                 const errorData = await userRes.json();
                 throw new Error(errorData.message || "Failed to update user profile");
             }
        }


        // 2. Update Shop Profile
        const shopId = formData.get("shopId") as string;
        if (shopId) {
            const businessName = formData.get("businessName") as string;
            // const businessType = formData.get("businessType") as string; // Not in IEditShopResponse? Check backend
            const businessAddress = formData.get("businessAddress") as string;
            const description = formData.get("description") as string;
            // Cooperative is likely read-only or handled separately

            const shopFormData = new FormData();
            if (businessName) shopFormData.append("name", businessName);
            if (businessAddress) shopFormData.append("business_address", businessAddress);
            if (description) shopFormData.append("description", description);
            // Add other shop fields as needed based on backend support

            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dawbackend.funtech.dev";
            const shopUpdateUrl = `${API_BASE_URL}${API_ENDPOINTS.SHOPS.EDIT_SHOP(shopId)}`;

            const shopRes = await fetch(shopUpdateUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: shopFormData,
            });

             if (!shopRes.ok) {
                 const errorData = await shopRes.json();
                 throw new Error(errorData.message || "Failed to update shop profile");
             }
        }

        revalidatePath("/sellers/settings");
        return { success: true, message: "Profile updated successfully" };

    } catch (error) {
        console.error("Update seller profile error:", error);
        return { success: false, error: error instanceof Error ? error.message : "Failed to update profile" };
    }
}

export async function updateSellerPassword(prevState: any, formData: FormData): Promise<IActionResponse<any>> {
    try {
        const token = await getFreshToken();

        if (!token) {
            return { success: false, error: "Authentication required" };
        }

        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmNewPassword = formData.get("confirmNewPassword") as string;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return { success: false, error: "All fields are required" };
        }

        if (newPassword !== confirmNewPassword) {
            return { success: false, error: "New passwords do not match" };
        }

        const response = await apiClient.put(
            API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
            { currentPassword, newPassword, confirmNewPassword },
            { token }
        );

        return { success: true, message: "Password updated successfully" };

    } catch (error) {
        console.error("Update password error:", error);
        const message = error instanceof Error ? error.message : "Failed to update password";
        return { success: false, error: message };
    }
}
