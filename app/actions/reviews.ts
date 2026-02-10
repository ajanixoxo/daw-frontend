"use server";

import { apiClient, API_ENDPOINTS } from "@/lib/api/client";
import { getServerSession, refreshAccessToken } from "@/app/actions/auth";
import { IActionResponse } from "@/types/auth.types";
import { IReviewsResponse, ICreateReviewRequest, ICreateReviewResponse } from "@/types/review.types";
import { revalidatePath } from "next/cache";

export async function getReviews(productId: string): Promise<IActionResponse<IReviewsResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    const config = token ? { token } : {};

    const response = await apiClient.get<IReviewsResponse>(
      API_ENDPOINTS.REVIEWS.GET(productId),
      config
    );

    return { success: true, data: response };
  } catch (error) {
    console.error("Get reviews error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch reviews";
    return { success: false, error: message };
  }
}

export async function createReview(data: ICreateReviewRequest): Promise<IActionResponse<ICreateReviewResponse>> {
  try {
    await refreshAccessToken();
    const session = await getServerSession();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Please login to submit a review" };
    }

    const response = await apiClient.post<ICreateReviewResponse>(
      API_ENDPOINTS.REVIEWS.CREATE,
      data,
      { token }
    );

    revalidatePath(`/product/${data.product_id}`);
    return { success: true, data: response, message: "Review submitted successfully" };
  } catch (error) {
    console.error("Create review error:", error);
    const message = error instanceof Error ? error.message : "Failed to submit review";
    return { success: false, error: message };
  }
}
