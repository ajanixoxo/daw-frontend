"use client";

import type React from "react";
import { useState } from "react";

import {
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Loader2,
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
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change?: string;
  changeLabel?: string;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#e7e8e9] p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="size-8 rounded-lg bg-[#ffe7cc] flex items-center justify-center">
          {icon}
        </div>
        <span className="text-sm text-[#667185]">{label}</span>
      </div>
      <div className="text-2xl lg:text-3xl font-bold text-[#292d32] mb-2">
        {value}
      </div>
      {change && changeLabel && (
        <div className="flex items-center gap-1 text-sm">
          <span
            className={
              change.startsWith("+") ? "text-[#009a49]" : "text-[#667185]"
            }
          >
            {change.startsWith("+") && "↑"} {change} {changeLabel}
          </span>
        </div>
      )}
      {changeLabel && !change && (
        <div className="text-sm text-[#667185]">{changeLabel}</div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  const { data: productsData, isLoading: productsLoading } = useSellerProducts();
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
  const activeProducts = products.filter(p => p.status === 'available').length;
  const lowStockProducts = products.filter(p => p.quantity < 10 && p.quantity > 0).length;
  const outOfStockProducts = products.filter(p => p.quantity === 0).length;

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 lg:mb-8">
        <div>
          <h1 className="text-2xl lg:text-[32px] font-bold text-[#1d1d2a] leading-tight">
            Product Management
          </h1>
          <p className="text-sm text-[#667185] mt-1">
            Get an Overview of your store activity here
          </p>
        </div>
        <div className="flex items-center gap-3">
          <AddCategoryModal />
          <AddProductDrawer />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        <StatCard
          icon={<div className="size-4 bg-[#f10e7c] rounded" />}
          label="Total Products"
          value={productsLoading ? "..." : totalProducts.toString()}
          changeLabel={productsLoading ? "Loading..." : "All products"}
        />
        <StatCard
          icon={<div className="size-4 bg-[#f10e7c] rounded" />}
          label="Active Products"
          value={productsLoading ? "..." : activeProducts.toString()}
          changeLabel={productsLoading ? "Loading..." : "Available now"}
        />
        <StatCard
          icon={<div className="size-4 bg-[#f10e7c] rounded" />}
          label="Low Stock"
          value={productsLoading ? "..." : lowStockProducts.toString()}
          changeLabel={productsLoading ? "Loading..." : "Requires Attention"}
        />
        <StatCard
          icon={<div className="size-4 bg-[#f10e7c] rounded" />}
          label="Out of Stock"
          value={productsLoading ? "..." : outOfStockProducts.toString()}
          changeLabel={productsLoading ? "Loading..." : "Requires Attention"}
        />
      </div>

      {/* Product Inventory */}
      <div className="bg-white rounded-lg border border-[#e7e8e9]">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-[#292d32]">
              Product Inventory
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#667185]" />
                <Input
                  placeholder="Search here..."
                  className="pl-9 border-[#e7e8e9]"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-[#e7e8e9] shrink-0 bg-transparent"
              >
                <SlidersHorizontal className="size-4" />
              </Button>
            </div>
          </div>

          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e7e8e9]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Item Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Store
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Stock
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#667185]">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-[#667185]">
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
                        <span className="text-[#667185]">Loading products...</span>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#667185]">
                      <p className="text-lg font-medium mb-2">No products found</p>
                      <p className="text-sm">Add your first product to get started</p>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-b border-[#e7e8e9] hover:bg-[#f9f9f9]"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                            alt={product.name}
                            className="size-10 rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium text-[#292d32]">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-[#667185]">
                        {product.category || "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#667185]">
                        Shop
                      </td>
                      <td className="py-3 px-4 text-sm text-[#292d32]">
                        ₦{product.price?.toLocaleString() || "0"}
                      </td>
                      <td className="py-3 px-4 text-sm text-[#667185]">
                        {product.quantity || 0}
                      </td>
                      <td className="py-3 px-4">
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
                          {product.status === "available" ? "Available" : product.status === "unavailable" ? "Unavailable" : product.status === "draft" ? "Draft" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-[#667185] hover:text-[#292d32]"
                            onClick={() => handleEdit(product)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 text-[#667185] hover:text-[#ad3307]"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
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
                      src={product.images && product.images.length > 0 ? product.images[0] : "/placeholder.svg"}
                      alt={product.name}
                      className="size-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-[#292d32] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#667185]">{product.category || "-"}</p>
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
                      {product.status === "available" ? "Available" : product.status === "unavailable" ? "Unavailable" : product.status === "draft" ? "Draft" : "Out of Stock"}
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
                      <span className="ml-1 text-[#292d32]">{product.quantity || 0}</span>
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
