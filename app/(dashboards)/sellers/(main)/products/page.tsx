"use client";

import type React from "react";
import { useState } from "react";

import {
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Loader2,
  Package,
  CircleCheck,
  TriangleAlert,
  PackageX,
} from "lucide-react";
import { useSellerProducts, useDeleteProduct } from "@/hooks/useSellerProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddCategoryModal } from "@/components/(dashboards)/sellers-dashboard/products/add-category-modal";
import { AddProductDrawer } from "@/components/(dashboards)/sellers-dashboard/products/add-product-drawer";
import type { IProduct } from "@/types/product.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

function StatCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  trend = "none",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeLabel?: string;
  trend?: "up" | "down" | "none";
}) {
  return (
    <div className="bg-white rounded-none border border-[#F2F4F7] p-5 h-[120px] flex flex-col justify-between transition-colors hover:border-[#E6007A]/20">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#FEEBF6] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <span className="text-[14px] font-medium text-[#667185] tracking-tight">
          {label}
        </span>
      </div>

      <div className="mt-auto">
        <h3 className="text-[28px] font-bold text-[#101828] leading-none mb-2.5">
          {value}
        </h3>

        <div className="flex items-center gap-1.5 flex-wrap">
          {trend === "up" && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#12B76A]"
            >
              <path
                d="M7 11.6667V2.33334M7 2.33334L2.33334 7M7 2.33334L11.6667 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          <p className="text-[12px] font-medium">
            {change && <span className="text-[#12B76A] mr-1">{change}</span>}
            <span
              className={
                trend === "up" && !change ? "text-[#12B76A]" : "text-[#98A2B3]"
              }
            >
              {changeLabel}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const { data: productsData, isLoading: productsLoading } =
    useSellerProducts();
  const products = productsData?.products || [];
  const deleteProductMutation = useDeleteProduct();

  // Edit drawer state
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  // Delete confirmation state
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Calculate statistics
  const totalProducts = products.length;
  const activeProducts = products.filter(
    (p) => p.status === "available",
  ).length;
  const lowStockProducts = products.filter(
    (p) => p.quantity < 10 && p.quantity > 0,
  ).length;
  const outOfStockProducts = products.filter((p) => p.quantity === 0).length;

  const handleEdit = (product: IProduct) => {
    setEditProduct(product);
    setEditDrawerOpen(true);
  };

  const handleEditDrawerChange = (open: boolean) => {
    setEditDrawerOpen(open);
    if (!open) {
      setEditProduct(null);
    }
  };

  const handleDeleteClick = (product: IProduct) => {
    setDeleteTarget(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteProductMutation.mutateAsync(deleteTarget._id);
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch {
      // Error handled by hook
    }
  };

  return (
    <main className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#101828] leading-tight tracking-tight">
            Product Management
          </h1>
          <p className="text-[14px] text-[#667085] mt-1 font-medium">
            Get an Overview of your store activity here
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AddCategoryModal />
          <AddProductDrawer />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard
          icon={<Package className="size-4 text-[#E6007A]" />}
          label="Total Products"
          value={productsLoading ? "..." : `₦${totalProducts * 10}`}
          change="10%"
          changeLabel="More than Previous"
          trend="up"
        />
        <StatCard
          icon={<CircleCheck className="size-4 text-[#E6007A]" />}
          label="Active Products"
          value={productsLoading ? "..." : activeProducts.toString()}
          changeLabel="Cards Issued"
          trend="up"
        />
        <StatCard
          icon={<TriangleAlert className="size-4 text-[#E6007A]" />}
          label="Low Stock"
          value={productsLoading ? "..." : lowStockProducts.toString()}
          changeLabel="Requires Attention"
        />
        <StatCard
          icon={<PackageX className="size-4 text-[#E6007A]" />}
          label="Out of Stock"
          value={productsLoading ? "..." : outOfStockProducts.toString()}
          changeLabel="Requires Attention"
        />
      </div>

      {/* Product Inventory */}
      <div className="bg-white rounded-none border border-[#F2F4F7] overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <h2 className="text-[20px] font-bold text-[#101828] tracking-tight">
              Product Inventory
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial sm:w-[320px]">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
                <Input
                  placeholder="Search here..."
                  className="pl-10 h-11 border-[#E4E7EC] rounded-xl focus:border-[#E6007A] focus:ring-[#E6007A] bg-white text-[14px]"
                />
              </div>
              <Button
                variant="outline"
                className="h-11 px-4 border-[#E4E7EC] rounded-xl bg-white hover:bg-[#F9FAFB] text-[#344054] font-medium text-[14px]"
              >
                <SlidersHorizontal className="size-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="hidden lg:block overflow-hidden rounded-xl border border-[#F2F4F7]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#F9FAFB] border-b border-[#F2F4F7]">
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Store
                  </th>
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-left py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Stauts
                  </th>
                  <th className="text-right py-4 px-6 text-[13px] font-bold text-[#667185] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productsLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-[#f10e7c]" />
                        <span className="text-[#667185]">
                          Loading products...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-[#667185]"
                    >
                      <p className="text-lg font-medium mb-2">
                        No products found
                      </p>
                      <p className="text-sm">
                        Add your first product to get started
                      </p>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-[#F2F4F7] hover:bg-[#F9FAFB] transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              product.images && product.images.length > 0
                                ? product.images[0]
                                : "/placeholder.svg"
                            }
                            alt={product.name}
                            className="size-10 rounded-xl object-cover shrink-0 border border-[#F2F4F7]"
                          />
                          <span className="text-[14px] font-bold text-[#1D2939]">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[#667185]">
                        {product.category || "Shirt"}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-[#667185]">
                        Faye&apos;s Complex
                      </td>
                      <td className="py-4 px-6 text-[14px] font-bold text-[#1D2939]">
                        ${product.price?.toFixed(2) || "17.84"}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-bold text-[#1D2939]">
                        {product.quantity || 20}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold ${
                            product.status === "available"
                              ? "bg-[#ECFDF3] text-[#12B76A]"
                              : product.status === "unavailable"
                                ? "bg-[#FEF3F2] text-[#F04438]"
                                : product.status === "draft"
                                  ? "bg-[#F9FAFB] text-[#667185]"
                                  : "bg-[#FFFAEB] text-[#F79009]"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              product.status === "available"
                                ? "bg-[#12B76A]"
                                : product.status === "unavailable"
                                  ? "bg-[#F04438]"
                                  : product.status === "draft"
                                    ? "bg-[#667185]"
                                    : "bg-[#F79009]"
                            }`}
                          />
                          {product.status === "available"
                            ? "Shipped"
                            : product.status === "unavailable"
                              ? "Cancelled"
                              : product.status === "draft"
                                ? "Draft"
                                : "Pending"}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-3.5">
                          <button
                            className="text-[#667185] hover:text-[#292d32] transition-colors"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="size-[18px]" strokeWidth={2.5} />
                          </button>
                          <button
                            className="text-[#667185] hover:text-[#F04438] transition-colors"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="size-[18px]" strokeWidth={2.5} />
                          </button>
                          <button className="text-[#667185] hover:text-[#E6007A] transition-colors">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.42 2.58a4.5 4.5 0 0 0-6.36 0l-.06.06-.06-.06a4.5 4.5 0 0 0-6.36 6.36l.06.06L9 15.42l6.36-6.36.06-.06a4.5 4.5 0 0 0 0-6.36z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <button className="text-[#667185] hover:text-[#E6007A] transition-colors">
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15.42 2.58a4.5 4.5 0 0 0-6.36 0l-.06.06-.06-.06a4.5 4.5 0 0 0-6.36 6.36l.06.06L9 15.42l6.36-6.36.06-.06a4.5 4.5 0 0 0 0-6.36z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          <div className="lg:hidden space-y-4">
            {productsLoading ? (
              <div className="py-12 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-6 w-6 animate-spin text-[#f10e7c]" />
                  <span className="text-[#667185]">Loading products...</span>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="py-12 text-center text-[#667185]">
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Add your first product to get started</p>
              </div>
            ) : (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border border-[#e7e8e9] rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      className="size-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#292d32] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#667185]">
                        {product.category || "-"}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.status === "available"
                          ? "bg-[#e5f8ed] text-[#009a49]"
                          : product.status === "unavailable"
                            ? "bg-[#ffe7cc] text-[#ad3307]"
                            : product.status === "draft"
                              ? "bg-[#f0f0f5] text-[#667185]"
                              : "bg-[#fff8e5] text-[#f1a20e]"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          product.status === "available"
                            ? "bg-[#009a49]"
                            : product.status === "unavailable"
                              ? "bg-[#ad3307]"
                              : product.status === "draft"
                                ? "bg-[#667185]"
                                : "bg-[#f1a20e]"
                        }`}
                      />
                      {product.status === "available"
                        ? "Available"
                        : product.status === "unavailable"
                          ? "Unavailable"
                          : product.status === "draft"
                            ? "Draft"
                            : "Out of Stock"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div>
                      <span className="text-[#667185]">Price:</span>
                      <span className="ml-1 text-[#292d32] font-medium">
                        ₦{product.price?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#667185]">Stock:</span>
                      <span className="ml-1 text-[#292d32]">
                        {product.quantity || 0}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-[#e7e8e9]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-[#667185] hover:text-[#292d32]"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="size-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-[#667185] hover:text-[#ad3307]"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <Trash2 className="size-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Product Drawer */}
      <AddProductDrawer
        product={editProduct}
        open={editDrawerOpen}
        onOpenChange={handleEditDrawerChange}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#292d32]">
              Delete Product
            </DialogTitle>
            <DialogDescription className="text-sm text-[#667185] mt-2">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#292d32]">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 border-[#e7e8e9]"
              onClick={() => {
                setDeleteDialogOpen(false);
                setDeleteTarget(null);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-[#ad3307] hover:bg-[#8a2906] text-white"
              onClick={handleDeleteConfirm}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
