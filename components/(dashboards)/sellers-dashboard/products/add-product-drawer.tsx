"use client";

import type React from "react";
import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useAddProduct } from "@/hooks/useSellerProducts";
import { useSellerProfile, getShopId } from "@/hooks/useSellerProfile";
import { useShopCategories } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddProductDrawer() {
  const [open, setOpen] = useState(false);
  const [productStatus, setProductStatus] = useState("Active");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productFeatures, setProductFeatures] = useState("");
  const [careInstruction, setCareInstruction] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");

  const addProductMutation = useAddProduct();
  const { data: profile, isLoading: profileLoading } = useSellerProfile();
  const { data: categoriesData, isLoading: categoriesLoading } = useShopCategories();
  const categories = categoriesData?.categories || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !quantity) {
      return;
    }

    const shopId = getShopId();
    if (!shopId || shopId.includes("[object Object]")) {
      alert(
        "Shop ID not found or invalid. Please refresh the page and try again."
      );
      return;
    }

    try {
      await addProductMutation.mutateAsync({
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        description: description || undefined,
        category: category || undefined,
        status: productStatus === "Active" ? "available" : "unavailable",
      });

      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setProductFeatures("");
      setCareInstruction("");
      setReturnPolicy("");
      setProductStatus("Active");
      setOpen(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2 bg-[#292d32] hover:bg-[#1d2739] text-white">
          <Plus className="size-4" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[580px] overflow-y-auto p-0"
      >
        {/* Header with back arrow and status */}
        <div className="sticky top-0 bg-white border-b border-[#e7e8e9] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 -ml-2"
              onClick={() => setOpen(false)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#292d32]"
              >
                <path
                  d="M12.5 5L7.5 10L12.5 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <div>
              <h2 className="text-xl font-bold text-[#292d32]">Add Products</h2>
              <p className="text-sm text-[#667185] mt-0.5">
                Follow the steps to create a new Product
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-xs text-[#667185]">Status</span>
            <Select value={productStatus} onValueChange={setProductStatus}>
              <SelectTrigger className="w-[120px] h-9 border-[#e7e8e9]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-[#e7e8e9] rounded-lg bg-[#f9f9f9] p-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="size-12 rounded-full bg-white flex items-center justify-center border border-[#e7e8e9]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#667185]"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-[#667185]">
                  Drag & drop your image or{" "}
                  <button
                    type="button"
                    className="text-[#292d32] font-medium underline"
                  >
                    Browse
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Title and Category Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-[#292d32]"
              >
                Product Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-[#e7e8e9] h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="category-select"
                className="text-sm font-medium text-[#292d32]"
              >
                Category
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="border-[#e7e8e9] h-11">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value="_loading" disabled>
                      Loading...
                    </SelectItem>
                  ) : categories.length === 0 ? (
                    <SelectItem value="_empty" disabled>
                      No categories yet. Create one first.
                    </SelectItem>
                  ) : (
                    categories.map((cat) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        <div className="flex items-center gap-2">
                          <span
                            className="size-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: cat.color }}
                          />
                          {cat.name}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-[#292d32]"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Write here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[#e7e8e9] min-h-[120px] resize-none"
            />
          </div>

          {/* Price and Quantity Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-sm font-medium text-[#292d32]"
              >
                Price *
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-[#e7e8e9] h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="quantity"
                className="text-sm font-medium text-[#292d32]"
              >
                Quantity *
              </Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="Enter Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border-[#e7e8e9] h-11"
                required
              />
            </div>
          </div>

          {/* Variants Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#292d32]">
              Variants
            </Label>
            <div className="flex items-center justify-between p-4 border border-[#e7e8e9] rounded-lg bg-white">
              <div className="flex items-center gap-2">
                <Plus className="size-5 text-[#292d32]" />
                <span className="text-sm text-[#292d32]">
                  Add variants like color or size
                </span>
              </div>
              <span className="px-3 py-1 bg-[#f9f9f9] text-[#292d32] text-sm rounded-md border border-[#e7e8e9]">
                Small
              </span>
            </div>
          </div>

          {/* Product Features */}
          <div className="space-y-2">
            <Label
              htmlFor="product-features"
              className="text-sm font-medium text-[#292d32]"
            >
              Product Features
            </Label>
            <Textarea
              id="product-features"
              placeholder="Write here..."
              value={productFeatures}
              onChange={(e) => setProductFeatures(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Care Instruction */}
          <div className="space-y-2">
            <Label
              htmlFor="care-instruction"
              className="text-sm font-medium text-[#292d32]"
            >
              Care Instruction
            </Label>
            <Textarea
              id="care-instruction"
              placeholder="Write here..."
              value={careInstruction}
              onChange={(e) => setCareInstruction(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Return Policy */}
          <div className="space-y-2">
            <Label
              htmlFor="return-policy"
              className="text-sm font-medium text-[#292d32]"
            >
              Return Policy
            </Label>
            <Textarea
              id="return-policy"
              placeholder="Write here..."
              value={returnPolicy}
              onChange={(e) => setReturnPolicy(e.target.value)}
              className="border-[#e7e8e9] min-h-[100px] resize-none"
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            disabled={addProductMutation.isPending}
            className="w-full bg-[#f10e7c] hover:bg-[#d00c6a] text-white h-12 text-base font-medium disabled:opacity-50"
          >
            {addProductMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
