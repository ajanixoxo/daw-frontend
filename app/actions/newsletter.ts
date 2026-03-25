import { apiClient, API_ENDPOINTS } from "@/lib/api/client";

export interface INewsletterResponse {
  success: boolean;
  message: string;
}

export async function subscribeToNewsletter(email: string): Promise<INewsletterResponse> {
  try {
    const response = await apiClient.post<any>("/api/newsletter/subscribe", { email });
    return {
      success: true,
      message: response.message || "Successfully subscribed to our newsletter!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Failed to subscribe. Please try again later.",
    };
  }
}
