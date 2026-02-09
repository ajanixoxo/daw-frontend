"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useAddCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const categoryColors = [
  { name: "Pink", value: "#f10e7c" },
  { name: "Black", value: "#000000" },
  { name: "Dark Green", value: "#035638" },
  { name: "Yellow", value: "#fccd35" },
  { name: "Blue", value: "#375dfb" },
  { name: "Teal", value: "#2ba570" },
  { name: "Light Pink", value: "#fccfe5" },
  { name: "Orange", value: "#f1a20e" },
  { name: "Cyan", value: "#0ea5f1" },
  { name: "Gray", value: "#e9e9e9" },
  { name: "Light Green", value: "#0ef187" },
  { name: "Red", value: "#f10e12" },
];

interface AddCategoryModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function AddCategoryModal({ open: controlledOpen, onOpenChange, trigger }: AddCategoryModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#f10e7c");
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? (onOpenChange || (() => {})) : setInternalOpen;

  const addCategoryMutation = useAddCategory();

  const handleSubmit = async () => {
    if (!categoryName.trim()) return;

    try {
      await addCategoryMutation.mutateAsync({
        name: categoryName.trim(),
        description: description.trim() || undefined,
        color: selectedColor,
      });

      setCategoryName("");
      setDescription("");
      setSelectedColor("#f10e7c");
      setOpen(false);
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const defaultTrigger = (
    <Button
      variant="outline"
      className="gap-2 border-[#e7e8e9] text-[#292d32] hover:bg-[#f9f9f9] bg-transparent"
    >
      <Plus className="size-4" />
      Add Category
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger || defaultTrigger}
        </DialogTrigger>
      )}
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#292d32]">
            Add New Category
          </DialogTitle>
          <p className="text-sm text-[#667185] mt-1">
            Create a new product category to organize your inventory better.
          </p>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label
              htmlFor="category-name"
              className="text-sm font-medium text-[#292d32]"
            >
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="e.g., Electronics, Clothing, Books"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="border-[#e7e8e9]"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="cat-description"
              className="text-sm font-medium text-[#292d32]"
            >
              Description
            </Label>
            <Textarea
              id="cat-description"
              placeholder="Brief description of this category..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-[#e7e8e9] min-h-[120px] resize-none"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#292d32]">
              Category Color
            </Label>
            <div className="grid grid-cols-6 gap-3">
              {categoryColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`size-10 rounded-full transition-all ${
                    selectedColor === color.value
                      ? "ring-2 ring-offset-2 ring-[#f10e7c]"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={addCategoryMutation.isPending || !categoryName.trim()}
            className="w-full bg-[#f10e7c] hover:bg-[#d00c6a] text-white h-12 text-base font-medium disabled:opacity-50"
          >
            {addCategoryMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Category"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
