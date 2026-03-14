"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star, Check, Play, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useReviews, useCreateReview } from "@/hooks/useReviews";
import { toast } from "sonner";
import { useAuthStore } from "@/zustand/store";
import { useRouter, usePathname } from "next/navigation";

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
  image?: string;
}

export function ProductTabs({
  description,
  productId,
  image,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "feedback">(
    "description",
  );
  const { data: reviewsData, isLoading: isLoadingReviews } =
    useReviews(productId);
  const { mutate: createReview, isPending: isSubmitting } = useCreateReview();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login to submit a review");
      const loginUrl = new URL("/auth", window.location.origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      router.push(loginUrl.pathname + loginUrl.search);
      return;
    }

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
      },
    );
  };

  return (
    <div className="mt-16 bg-[#F9FAFB] rounded-[32px] p-6 md:p-12 lg:p-20">
      {/* Tab Headers - Single wide pill container */}
      <div className="bg-[#fff] rounded-xl p-1.5 inline-flex w-full mb-12 shadow-sm border border-gray-100/50">
        <button
          onClick={() => setActiveTab("description")}
          className={cn(
            "flex-1 py-3 text-base font-semibold text-center rounded-lg transition-all",
            activeTab === "description"
              ? "bg-white text-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100"
              : "text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-50",
          )}
        >
          Descriptions
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={cn(
            "flex-1 py-3 text-base font-semibold text-center rounded-lg transition-all",
            activeTab === "feedback"
              ? "bg-white text-[#222] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100"
              : "text-gray-500 hover:text-gray-900 bg-transparent hover:bg-gray-50",
          )}
        >
          Customer Feedback
        </button>
      </div>

      {/* Content - No Card Style, just direct content on the gray BG */}
      <div className="">
        {activeTab === "description" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column: Text & Bullets */}
            <div className="space-y-8">
              <div className="text-gray-500 text-sm leading-7 space-y-6">
                <p>
                  {description ||
                    "Sed commodo aliquam dui ac porta. Fusce ipsum felis, imperdiet at posuere ac, viverra at mauris. Maecenas tincidunt ligula a sem vestibulum pharetra. Maecenas auctor tortor lacus, nec laoreet nisi porttitor vel."}
                </p>
                <p>
                  Nulla mauris tellus, feugiat quis pharetra sed, gravida ac
                  dui. Sed iaculis, metus faucibus elementum tincidunt, turpis
                  mi viverra velit, pellentesque tristique neque mi eget nulla.
                  Proin luctus elementum neque et pharetra.
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-4 pt-4">
                {[
                  "100 g of fresh leaves provides.",
                  "Aliquam ac est at augue volutpat elementum.",
                  "Quisque nec enim eget sapien molestie.",
                  "Proin convallis odio volutpat finibus posuere.",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 text-sm text-gray-600"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f10e7c] flex items-center justify-center shadow-sm shadow-pink-200">
                      <Check
                        className="w-3.5 h-3.5 text-white"
                        strokeWidth={3}
                      />
                    </div>
                    <span className="leading-6 pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-500 text-sm leading-relaxed pt-2">
                Cras et diam maximus, accumsan sapien et, sollicitudin velit.
                Nulla blandit eros non turpis lobortis iaculis at ut massa.
              </p>
            </div>

            {/* Right Column: Specs Table & Video */}
            <div className="space-y-10">
              {/* Specs Table */}
              <div className="space-y-4 text-sm">
                {[
                  { label: "Weight:", value: "20" },
                  { label: "Color:", value: "White" },
                  { label: "Type:", value: "Handcrafted" },
                  { label: "Category:", value: "Home decor" },
                  { label: "Stock Status:", value: "Available (5,413)" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex justify-between md:justify-start"
                  >
                    <span className="w-32 text-[#222] font-semibold">
                      {row.label}
                    </span>
                    <span className="text-gray-500">{row.value}</span>
                  </div>
                ))}

                <div className="flex justify-between md:justify-start pt-1">
                  <span className="w-32 text-[#222] font-semibold shrink-0">
                    Tags:
                  </span>
                  <span className="text-gray-500 max-w-[calc(100%-8rem)]">
                    Pillow, Home,{" "}
                    <span className="underline decoration-1 underline-offset-2 text-[#222]">
                      Chinese
                    </span>
                    , Sitting Room, White.
                  </span>
                </div>
              </div>

              {/* Video/Image Placeholder - Rounded Corners Matches Design */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-white shadow-sm group cursor-pointer border border-gray-100">
                <div className="absolute inset-0 bg-neutral-100">
                  <Image
                    src={image || "/placeholder-video-thumb.jpg"}
                    alt="Video Thumbnail"
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#009a49] text-white flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full">
            <div className="space-y-8">
              {/* Reviews List */}
              {isLoadingReviews ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#F10E7C]" />
                </div>
              ) : reviewsData?.reviews && reviewsData.reviews.length > 0 ? (
                <div className="space-y-12 bg-white rounded-3xl p-8 border border-gray-100">
                  {/* Rating Summary Header */}
                  <div className="bg-gray-50 rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-[#222]">4.8</div>
                      <div className="text-sm text-gray-500 mt-2">
                        Overall Rating
                      </div>
                    </div>
                    {/* Bars */}
                    <div className="flex-1 w-full max-w-md space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs font-medium w-3">
                            {star}
                          </span>
                          <Star className="w-3 h-3 text-gray-300 fill-gray-300" />
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-[#F10E7C] w-[70%]" />
                          </div>
                          <span className="text-xs text-gray-400 w-8">70%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-8">
                    {reviewsData.reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 uppercase flex items-center justify-center text-gray-500 font-bold">
                            {review.user_id?.firstName?.charAt(0) || "A"}
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">
                              {review.user_id?.firstName || "Anonymous"}
                            </h4>
                            <div className="flex text-[#F10E7C] my-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-3 h-3",
                                    i < review.rating
                                      ? "fill-current"
                                      : "text-gray-300 fill-gray-300",
                                  )}
                                />
                              ))}
                            </div>
                            <p className="text-gray-600 text-sm whitespace-pre-line">
                              {review.comment}
                            </p>
                          </div>
                          <span className="ml-auto text-xs text-gray-400">
                            {timeAgo(review.createdAt)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shadow-sm">
                      <Star className="w-6 h-6 text-[#F10E7C]" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No reviews yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Be the first to review this product!
                  </p>
                </div>
              )}

              {/* Add Review Form */}
              <div className="pt-8 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold text-[#222] mb-2">
                  Add A Review
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Your email address will not be published.
                </p>

                <form onSubmit={handleSubmitReview} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222]">
                      Your Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={cn(
                            "w-6 h-6 cursor-pointer transition-colors",
                            (hoverRating || rating) >= star
                              ? "fill-[#F10E7C] text-[#F10E7C]"
                              : "text-gray-300 fill-gray-300",
                          )}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#222]">
                        Name *
                      </label>
                      <Input
                        placeholder="Your Name"
                        className="bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-[#222]">
                        Email *
                      </label>
                      <Input
                        placeholder="Your Email"
                        className="bg-white border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#222]">
                      Your Review *
                    </label>
                    <Textarea
                      placeholder="Enter your review"
                      className="bg-white border-gray-200 rounded-xl min-h-[120px] resize-none"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="save-info"
                      className="rounded border-gray-300 text-[#F10E7C] focus:ring-[#F10E7C]"
                    />
                    <label
                      htmlFor="save-info"
                      className="text-sm text-gray-600"
                    >
                      Save my name, email, and website in this browser for the
                      next time I comment.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#222] hover:bg-[#333] text-white rounded-full px-8 h-12 font-medium"
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
