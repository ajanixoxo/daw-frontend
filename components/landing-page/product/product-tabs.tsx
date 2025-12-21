"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star, CheckCircle2, Play, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import { toast } from "sonner";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
}

interface ProductTabsProps {
  description?: string;
  productId: string;
}

export function ProductTabs({ description, productId }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "feedback">(
    "description"
  );
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useReviews(productId);
  const { mutate: createReview, isPending: isSubmitting } = useCreateReview();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a review comment");
      return;
    }

    const finalComment = title ? `${title}\n\n${comment}` : comment;

    createReview(
      {
        product_id: productId,
        rating,
        comment: finalComment,
      },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
          setTitle("");
          setHoverRating(0);
        },
      }
    );
  };

  return (
    <div className="mt-16 md:p-20 p-8">
      {/* Tab Headers */}
      <div className="flex justify-center border-b border-gray-100 mb-8">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={cn(
              "pb-4 text-sm font-medium transition-all relative px-4",
              activeTab === "description"
                ? "text-[#222] font-semibold"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            Descriptions
            {activeTab === "description" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F10E7C]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={cn(
              "pb-4 text-sm font-medium transition-all relative px-4",
              activeTab === "feedback"
                ? "text-[#222] font-semibold"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            Customer Feedback
            {activeTab === "feedback" && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F10E7C]" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {activeTab === "description" ? (
          <>
            <div className="space-y-6">
              <p className="text-gray-600 text-sm leading-relaxed">
                {description || "No description available."}
              </p>

              <ul className="space-y-3">
                {[
                  "100 g of fresh leaves provides.",
                  "Aliquam ac est at augue volutpat elementum.",
                  "Quisque nec enim eget sapien molestie.",
                  "Proin convallis odio volutpat finibus posuere.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#F10E7C]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-gray-900 font-medium">Weight:</div>
                <div className="text-gray-600">20</div>

                <div className="text-gray-900 font-medium">Color:</div>
                <div className="text-gray-600">White</div>

                <div className="text-gray-900 font-medium">Type:</div>
                <div className="text-gray-600">Handcrafted</div>

                <div className="text-gray-900 font-medium">Category:</div>
                <div className="text-gray-600">Home decor</div>

                <div className="text-gray-900 font-medium">Stock Status:</div>
                <div className="text-gray-600">Available</div>

                <div className="text-gray-900 font-medium">Tags:</div>
                <div className="text-gray-600">
                  Pillow, Home, <span className="underline">Chinese</span>,
                  Sitting Room, White.
                </div>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer">
                <Image
                  src="/placeholder-video-thumb.jpg"
                  alt="Product Video"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#009a49] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2 max-w-3xl mx-auto w-full">
            <div className="space-y-8">
              {/* Reviews List */}
              {isLoadingReviews ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F10E7C]" />
                </div>
              ) : reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
                <div className="space-y-12">
                  {/* Rating Summary */}
                  <div className="flex flex-col md:flex-row gap-8 items-center bg-gray-50 p-8 rounded-3xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[#222] mb-2">
                        {(
                          Object.entries(
                            reviewsData.rating_distribution
                          ).reduce(
                            (acc, [rating, count]) =>
                              acc + Number(rating) * count,
                            0
                          ) / reviewsData.pagination.total || 0
                        ).toFixed(1)}
                      </div>
                      <div className="flex gap-1 justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i <
                                Math.round(
                                  Object.entries(
                                    reviewsData.rating_distribution
                                  ).reduce(
                                    (acc, [rating, count]) =>
                                      acc + Number(rating) * count,
                                    0
                                  ) / reviewsData.pagination.total || 0
                                )
                                ? "fill-[#F10E7C] text-[#F10E7C]"
                                : "text-gray-300"
                            )}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reviewsData.pagination.total} Reviews
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count =
                          reviewsData.rating_distribution[star] || 0;
                        const percentage =
                          (count / reviewsData.pagination.total) * 100 || 0;
                        return (
                          <div
                            key={star}
                            className="flex items-center gap-4 text-sm"
                          >
                            <div className="flex items-center gap-1 w-12">
                              <span className="font-medium">{star}</span>
                              <Star className="w-3 h-3 fill-gray-400 text-gray-400" />
                            </div>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#F10E7C]"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <div className="w-10 text-right text-gray-500">
                              {count}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-8">
                    {reviewsData.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                              {/* Avatar placeholder */}
                              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm font-medium uppercase">
                                {review.user_id?.firstName?.charAt(0) || "U"}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-[#222]">
                                {review.user_id?.firstName}{" "}
                                {review.user_id?.lastName}
                              </h4>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "w-3 h-3",
                                      i < review.rating
                                        ? "fill-[#F10E7C] text-[#F10E7C]"
                                        : "text-gray-300"
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">
                            {timeAgo(review.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews yet. Be the first to review this product!
                </div>
              )}

              {/* Add Review Form */}
              <div className="pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-[#222] mb-1">
                  Add A Review
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  Your email address will not be published.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222]">
                      Your Rating :
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-5 h-5 cursor-pointer transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-[#F10E7C] text-[#F10E7C]"
                              : "text-gray-300"
                          )}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222]">
                      Add Review Title
                    </label>
                    <Input
                      placeholder="Write Title here"
                      className="bg-gray-50 border-gray-100 rounded-xl h-12"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#222]">
                      Your Review
                    </label>
                    <Textarea
                      placeholder="Enter your review"
                      className="bg-gray-50 border-gray-100 rounded-xl min-h-[150px] resize-none"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#222] hover:bg-[#333] text-white rounded-full px-8 h-12 w-full md:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
