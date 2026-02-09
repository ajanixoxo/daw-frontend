"use client";

import type React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Plus, Loader2, X, ImageIcon } from "lucide-react";
import { useAddProduct, useEditProduct } from "@/hooks/useSellerProducts";
import { getShopId } from "@/hooks/useSellerProfile";
import { useShopCategories } from "@/hooks/useCategories";
import { AddCategoryModal } from "./add-category-modal";
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
import type { IProduct } from "@/types/product.types";

const MAX_IMAGES = 4;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const STATUS_TO_LABEL: Record<string, string> = {
  available: "Active",
  unavailable: "Inactive",
  draft: "Draft",
};

const LABEL_TO_STATUS: Record<string, "available" | "unavailable" | "draft"> = {
  Active: "available",
  Inactive: "unavailable",
  Draft: "draft",
};

interface AddProductDrawerProps {
  product?: IProduct | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddProductDrawer({
  product,
  open: controlledOpen,
  onOpenChange,
}: AddProductDrawerProps) {
  const isEditMode = !!product;
  const isControlled = controlledOpen !== undefined;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled
    ? (onOpenChange || (() => {}))
    : setInternalOpen;

  const [productStatus, setProductStatus] = useState("Active");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productFeatures, setProductFeatures] = useState("");
  const [careInstruction, setCareInstruction] = useState("");
  const [returnPolicy, setReturnPolicy] = useState("");
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Variants State
  const [variants, setVariants] = useState<
    { type: string; values: string[] }[]
  >([]);

  // Snapshot of initial values for dirty tracking (edit mode)
  const [initialValues, setInitialValues] = useState<Record<string, any>>({});

  const addProductMutation = useAddProduct();
  const editProductMutation = useEditProduct();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useShopCategories();
  const categories = categoriesData?.categories || [];

  // Populate form when editing
  useEffect(() => {
    if (isEditMode && product && open) {
      const statusLabel = STATUS_TO_LABEL[product.status] || "Active";
      setProductStatus(statusLabel);
      setName(product.name || "");
      setCategory(product.category || "");
      setDescription(product.description || "");
      setPrice(product.price?.toString() || "");
      setQuantity(product.quantity?.toString() || "");
      setProductFeatures(product.productFeatures || "");
      setCareInstruction(product.careInstruction || "");
      setReturnPolicy(product.returnPolicy || "");
      setVariants(product.variants || []);
      setExistingImages(product.images || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);

      setInitialValues({
        name: product.name || "",
        category: product.category || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        quantity: product.quantity?.toString() || "",
        status: statusLabel,
        productFeatures: product.productFeatures || "",
        careInstruction: product.careInstruction || "",
        returnPolicy: product.returnPolicy || "",
        variants: JSON.stringify(product.variants || []),
        images: JSON.stringify(product.images || []),
      });
    }
  }, [isEditMode, product, open]);

  const totalImages = existingImages.length + newImageFiles.length;

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const remaining = MAX_IMAGES - totalImages;
      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      for (let i = 0; i < Math.min(files.length, remaining); i++) {
        const file = files[i];
        if (!ACCEPTED_TYPES.includes(file.type)) continue;
        if (file.size > MAX_FILE_SIZE) continue;
        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      }

      if (newFiles.length > 0) {
        setNewImageFiles((prev) => [...prev, ...newFiles]);
        setNewImagePreviews((prev) => [...prev, ...newPreviews]);
      }
    },
    [totalImages],
  );

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    URL.revokeObjectURL(newImagePreviews[index]);
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(e.target.files);
    }
    e.target.value = "";
  };

  const handleAddVariantType = (type: string) => {
    if (!variants.find((v) => v.type === type)) {
      setVariants([...variants, { type, values: [] }]);
    }
  };

  const addVariantValue = (type: string, value: string) => {
    if (!value.trim()) return;
    setVariants(
      variants.map((v) => {
        if (v.type === type) {
          if (v.values.includes(value.trim())) return v;
          return { ...v, values: [...v.values, value.trim()] };
        }
        return v;
      }),
    );
  };

  const removeVariantValue = (type: string, valueToRemove: string) => {
    setVariants(
      variants.map((v) => {
        if (v.type === type) {
          return {
            ...v,
            values: v.values.filter((val) => val !== valueToRemove),
          };
        }
        return v;
      }),
    );
  };

  const removeVariantType = (type: string) => {
    setVariants(variants.filter((v) => v.type !== type));
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setProductFeatures("");
    setCareInstruction("");
    setReturnPolicy("");
    setVariants([]);
    setProductStatus("Active");
    setExistingImages([]);
    newImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setInitialValues({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !quantity) return;

    const statusValue = LABEL_TO_STATUS[productStatus] || "available";

    if (isEditMode && product) {
      // Build dirty fields only
      const dirty: Record<string, any> = {};

      if (name !== initialValues.name) dirty.name = name;
      if (category !== initialValues.category) dirty.category = category;
      if (description !== initialValues.description) dirty.description = description;
      if (price !== initialValues.price) dirty.price = parseFloat(price);
      if (quantity !== initialValues.quantity) dirty.quantity = parseInt(quantity, 10);
      if (productStatus !== initialValues.status) dirty.status = statusValue;
      if (productFeatures !== initialValues.productFeatures) dirty.productFeatures = productFeatures;
      if (careInstruction !== initialValues.careInstruction) dirty.careInstruction = careInstruction;
      if (returnPolicy !== initialValues.returnPolicy) dirty.returnPolicy = returnPolicy;

      const filledVariants = variants
        .filter((v) => v.values.length > 0)
        .map((v) => ({ type: v.type, values: v.values }));
      if (JSON.stringify(filledVariants) !== initialValues.variants) {
        dirty.variants = filledVariants;
      }

      // Images: always send if changed
      const currentExistingJson = JSON.stringify(existingImages);
      const imagesChanged =
        currentExistingJson !== initialValues.images || newImageFiles.length > 0;

      if (imagesChanged) {
        dirty.existingImages = existingImages;
        if (newImageFiles.length > 0) {
          dirty.images = newImageFiles;
        }
      }

      // If nothing changed, just close
      if (Object.keys(dirty).length === 0) {
        setOpen(false);
        return;
      }

      try {
        await editProductMutation.mutateAsync({
          productId: product._id,
          data: dirty,
        });
        resetForm();
        setOpen(false);
      } catch {
        // Error handled by hook
      }
    } else {
      // Add mode
      const shopId = getShopId();
      if (!shopId || shopId.includes("[object Object]")) {
        alert("Shop ID not found or invalid. Please refresh the page and try again.");
        return;
      }

      const filledVariants = variants
        .filter((v) => v.values.length > 0)
        .map((v) => ({ type: v.type, values: v.values }));

      try {
        await addProductMutation.mutateAsync({
          name,
          price: parseFloat(price),
          quantity: parseInt(quantity, 10),
          description: description || undefined,
          category: category || undefined,
          status: statusValue,
          images: newImageFiles.length > 0 ? newImageFiles : undefined,
          variants: filledVariants.length > 0 ? filledVariants : undefined,
          productFeatures: productFeatures || undefined,
          careInstruction: careInstruction || undefined,
          returnPolicy: returnPolicy || undefined,
        });
        resetForm();
        setOpen(false);
      } catch {
        // Error handled by hook
      }
    }
  };

  const isPending = isEditMode
    ? editProductMutation.isPending
    : addProductMutation.isPending;

  return (
    <>
      <AddCategoryModal
        open={categoryModalOpen}
        onOpenChange={setCategoryModalOpen}
      />
      <Sheet open={open} onOpenChange={setOpen}>
        {!isControlled && (
          <SheetTrigger asChild>
            <Button className="gap-2 bg-[#292d32] hover:bg-[#1d2739] text-white">
              <Plus className="size-4" />
              Add Product
            </Button>
          </SheetTrigger>
        )}
        <SheetContent
          side="right"
          className="w-full sm:max-w-[580px] h-full overflow-hidden p-0 flex flex-col gap-0"
        >
          {/* Header with back arrow and status */}
          <div className="bg-white border-b border-[#e7e8e9] px-6 py-4 flex items-center justify-between shrink-0">
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
                <h2 className="text-xl font-bold text-[#292d32]">
                  {isEditMode ? "Edit Product" : "Add Products"}
                </h2>
                <p className="text-sm text-[#667185] mt-0.5">
                  {isEditMode
                    ? "Update the product details below"
                    : "Follow the steps to create a new Product"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-[#667185]">Status *</span>
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
          <div className="flex-1 overflow-y-auto min-h-0">
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-[#292d32]">
                  Product Images{" "}
                  <span className="text-[#667185] font-normal">
                    ({totalImages}/{MAX_IMAGES})
                  </span>
                </Label>

                {/* Previews */}
                {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                  <div className="grid grid-cols-4 gap-3">
                    {/* Existing images (URLs from server) */}
                    {existingImages.map((src, i) => (
                      <div
                        key={`existing-${i}`}
                        className="relative aspect-square rounded-lg overflow-hidden border border-[#e7e8e9] group"
                      >
                        <img
                          src={src}
                          alt={`Image ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingImage(i)}
                          className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* New image previews */}
                    {newImagePreviews.map((src, i) => (
                      <div
                        key={`new-${i}`}
                        className="relative aspect-square rounded-lg overflow-hidden border border-[#e7e8e9] group"
                      >
                        <img
                          src={src}
                          alt={`Preview ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(i)}
                          className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Add more slot */}
                    {totalImages < MAX_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-square rounded-lg border-2 border-dashed border-[#e7e8e9] bg-[#f9f9f9] flex items-center justify-center hover:border-[#f10e7c] hover:bg-[#fff5f9] transition-colors"
                      >
                        <Plus className="size-6 text-[#667185]" />
                      </button>
                    )}
                  </div>
                )}

                {/* Drop zone (shown when no images at all) */}
                {totalImages === 0 && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors cursor-pointer ${
                      isDragging
                        ? "border-[#f10e7c] bg-[#fff5f9]"
                        : "border-[#e7e8e9] bg-[#f9f9f9]"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="size-12 rounded-full bg-white flex items-center justify-center border border-[#e7e8e9]">
                        <ImageIcon className="size-5 text-[#667185]" />
                      </div>
                      <div>
                        <p className="text-sm text-[#667185]">
                          Drag & drop your images or{" "}
                          <span className="text-[#292d32] font-medium underline">
                            Browse
                          </span>
                        </p>
                        <p className="text-xs text-[#667185] mt-1">
                          JPG, PNG, WebP, GIF. Max 10MB each. Up to {MAX_IMAGES}{" "}
                          images.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                />
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
                  <div className="flex items-center gap-2">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="border-[#e7e8e9] h-11 flex-1">
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
                            <SelectItem key={cat._id} value={cat.name}>
                              <div className="flex items-center gap-2">
                                <span
                                  className="size-3 rounded-full shrink-0"
                                  style={{ backgroundColor: cat.color }}
                                />
                                {cat.name}
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="size-11 shrink-0 border-[#e7e8e9] hover:bg-[#fff5f9] hover:border-[#f10e7c]"
                      onClick={() => setCategoryModalOpen(true)}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
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
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-[#292d32]">
                    Variants
                  </Label>
                </div>

                {/* List of active variants */}
                <div className="space-y-3">
                  {variants.map((variant) => (
                    <div
                      key={variant.type}
                      className="p-4 border border-[#e7e8e9] rounded-lg bg-white space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-[#292d32]">
                          {variant.type}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVariantType(variant.type)}
                          className="h-6 w-6 p-0 text-[#667185] hover:text-red-500"
                          type="button"
                        >
                          <X className="size-4" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {variant.values.map((val) => (
                          <div
                            key={val}
                            className="px-3 py-1 bg-[#f9f9f9] text-[#292d32] text-sm rounded-md border border-[#e7e8e9] flex items-center gap-2"
                          >
                            {val}
                            <button
                              type="button"
                              onClick={() =>
                                removeVariantValue(variant.type, val)
                              }
                              className="text-[#667185] hover:text-red-500"
                            >
                              <X className="size-3" />
                            </button>
                          </div>
                        ))}
                        <Input
                          className="h-8 w-32 border-none bg-transparent placeholder:text-gray-400 focus-visible:ring-0 p-0 text-sm shadow-none"
                          placeholder="+ Add value..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addVariantValue(
                                variant.type,
                                e.currentTarget.value,
                              );
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Variant Dropdown */}
                <Select onValueChange={handleAddVariantType} value="">
                  <SelectTrigger className="w-full h-12 border border-[#e7e8e9] bg-white rounded-lg px-4 flex items-center justify-between hover:bg-[#f9f9f9] transition-colors">
                    <div className="flex items-center gap-2 text-[#292d32]">
                      <Plus className="size-5" />
                      <span>Add variants like color or size</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Color">Color</SelectItem>
                    <SelectItem value="Size">Size</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Style">Style</SelectItem>
                  </SelectContent>
                </Select>
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
                disabled={isPending}
                className="w-full bg-[#f10e7c] hover:bg-[#d00c6a] text-white h-12 text-base font-medium disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Adding..."}
                  </>
                ) : isEditMode ? (
                  "Update Product"
                ) : (
                  "Save"
                )}
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
